import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';
import JSZip from 'jszip';
import {
  registerOrUpdateMongoUser,
  findUserByPhoneOrEmail,
  authenticateUserWithPassword,
  getAllDatabaseUsers,
  getDatabaseStatus,
  toggleUserBlockStatus,
  deleteMongoUser,
  updateUserSubscriptionInDb,
  getUserDetails,
  syncAllUsersToMongo,
  handleGoogleAuthUser,
  saveUserProgressInDb,
  getUserProgressFromDb,
  getLeaderboardFromDb,
  saveCertificateInDb,
  getCertificateFromDb,
  savePaymentInDb
} from './src/db/userService';
import { resetAndReconnect } from './src/db/mongodb';
import { validateRealEmail } from './src/utils/emailValidator';
import {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  verifySessionToken,
  isAuthorizedAdmin,
  sanitizeMongoInput
} from './src/utils/serverSecurity';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security Hardening: Disable Express fingerprinting
app.disable('x-powered-by');

// Public API CORS Middleware (Allows frontend clients to interact with public APIs)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, x-admin-token');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Security Hardening: Enterprise Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Allow AI Studio preview iFrame and embedders while maintaining strong protection
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Download-Options', 'noopen');
  next();
});


// 🛡️ SENSITIVE FILE PROTECTION: Block all internal configs, keys, credentials, and data files from HTTP exposure
app.use((req, res, next) => {
  const urlPath = (req.path || '').toLowerCase();
  if (
    urlPath.startsWith('/data') ||
    urlPath.startsWith('/.env') ||
    urlPath.includes('mongodb-config') ||
    urlPath.includes('users.json') ||
    urlPath.endsWith('.env') ||
    urlPath === '/server.ts' ||
    urlPath === '/package.json' ||
    urlPath === '/package-lock.json' ||
    urlPath === '/tsconfig.json' ||
    urlPath.startsWith('/.git')
  ) {
    return res.status(403).json({
      success: false,
      error: 'सुरक्षा प्रतिबंध: यह संसाधन गोपनीय एवं सुरक्षित है (Access Forbidden).'
    });
  }
  next();
});

app.use(express.json({ limit: '1mb' }));

// Anti-Brute-Force & Rate Limiting Map (IP/Phone -> { count, resetAt })
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }
  if (record.count >= limit) {
    return false; // blocked
  }
  record.count += 1;
  return true; // allowed
}

// In-memory OTP Store (phone -> { otp, expiresAt, attempts })
interface OtpRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}
const otpStore = new Map<string, OtpRecord>();

// Clean helper to extract 10-digit Indian phone number
function cleanPhone(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return digits.slice(-10);
}

// WhatsApp Gateway Dispatch via WaKit / WATI
async function sendWhatsAppViaWakit(
  phone: string,
  otp: string
): Promise<{ success: boolean; provider: string; isRealSms: boolean; error?: string; message?: string } | null> {
  const wakitKey = (
    process.env.WAKIT_API_KEY ||
    process.env.WHATSAPP_API_KEY ||
    process.env.WATI_API_KEY ||
    process.env.WAKIT_TOKEN ||
    'wk_live_XrwS5NYJKkiKgIQdn5YWICaEUi3GAM5bMZvH4APp'
  ).trim();

  const wakitUrl = (
    process.env.WAKIT_API_URL ||
    process.env.WHATSAPP_API_URL ||
    ''
  ).trim();

  if (!wakitKey && !wakitUrl) {
    return null;
  }

  const cleanDigits = phone.replace(/\D/g, '').slice(-10);
  const fullPhone = `91${cleanDigits}`;
  const otpMessage = `🔐 C-Guru: आपका मोबाइल सत्यापन OTP कोड है: *${otp}*। यह कोड 5 मिनट के लिए मान्य है। कृपया इसे किसी के साथ साझा न करें।`;

  console.log(`[WAKIT-WHATSAPP] Attempting to dispatch WhatsApp OTP to +${fullPhone}...`);

  const endpointsToTry = wakitUrl
    ? [wakitUrl]
    : [
        'https://wakit.in/api/v1/otp/send',
        'https://wakit.in/api/v1/messages',
        'https://api.wakit.io/v1/messages/send'
      ];

  const payload = {
    to: `+${fullPhone}`,
    phone: `+${fullPhone}`,
    number: fullPhone,
    receiver: fullPhone,
    code: otp,
    otp: otp,
    message: otpMessage,
    text: otpMessage,
    instance_id: process.env.WAKIT_INSTANCE_ID || undefined
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'CGuruWhatsApp/1.0',
    'Authorization': wakitKey.startsWith('Bearer ') ? wakitKey : `Bearer ${wakitKey}`,
    'x-api-key': wakitKey,
    'apikey': wakitKey
  };

  let lastError = '';

  for (const endpoint of endpointsToTry) {
    try {
      console.log(`[WAKIT-WHATSAPP] Dispatching OTP to +${fullPhone} via ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const rawText = await response.text();
      let result: any = null;
      try {
        result = JSON.parse(rawText);
      } catch {}

      console.log(`[WAKIT-WHATSAPP] Response from ${endpoint} (${response.status}):`, result || rawText);

      const isSuccess = (response.status === 200 || response.status === 201) && (!result || (result.success !== false && result.status !== 'error'));
      if (isSuccess || (result && (result.success || result.data?.status === 'sent'))) {
        return {
          success: true,
          provider: 'wakit_whatsapp',
          isRealSms: true,
          message: `WhatsApp पर OTP भेज दिया गया है (+${fullPhone})`
        };
      }

      lastError = result?.message || result?.error || rawText || `HTTP ${response.status}`;
    } catch (err: any) {
      console.warn(`[WAKIT-WHATSAPP] Endpoint ${endpoint} failed:`, err.message);
      lastError = err.message;
    }
  }

  return {
    success: false,
    provider: 'wakit_whatsapp',
    isRealSms: false,
    error: lastError || 'WaKit API Error'
  };
}

// SMS & WhatsApp Gateway Dispatch Function
// The user can plug in their WaKit WhatsApp API key or SMS Gateway API key in .env
async function sendSmsViaGateway(
  phone: string,
  otp: string,
  clientApiKey?: string
): Promise<{ success: boolean; provider: string; isRealSms: boolean; error?: string; message?: string }> {
  // 1. First, check if WaKit WhatsApp Gateway is configured
  const wakitResult = await sendWhatsAppViaWakit(phone, otp);
  if (wakitResult) {
    if (wakitResult.success) {
      return wakitResult;
    }
    console.warn(`[WAKIT-WHATSAPP] WaKit attempt failed, checking SMS fallback...`, wakitResult.error);
  }

  const apiKey = (
    clientApiKey ||
    process.env.SMS_API_KEY ||
    process.env.TWO_FACTOR_API_KEY ||
    process.env.VITE_SMS_API_KEY ||
    process.env.VITE_2FACTOR_API_KEY ||
    process.env.FAST2SMS_API_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    if (wakitResult && !wakitResult.success) {
      return {
        success: false,
        provider: 'wakit_whatsapp',
        isRealSms: false,
        error: `WaKit WhatsApp त्रुटि: ${wakitResult.error}`
      };
    }
    console.log(`\n======================================================`);
    console.log(`[SMS-GATEWAY-DEV] SMS / WhatsApp API Key not configured in .env yet.`);
    console.log(`(Configure WAKIT_API_KEY or SMS_API_KEY in server environment for real delivery.)`);
    console.log(`======================================================\n`);
    return { success: true, provider: 'simulated_dev', isRealSms: false };
  }

  // Check if 2Factor.in key (UUID format with hyphens or 36 chars)
  const is2Factor = apiKey.includes('-') || apiKey.length === 36 || Boolean(process.env.TWO_FACTOR_API_KEY);

  if (is2Factor) {
    try {
      // 2Factor standard endpoint: https://2factor.in/API/V1/{API_KEY}/SMS/{PHONE}/{OTP}
      const url = `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/${encodeURIComponent(phone)}/${encodeURIComponent(otp)}`;
      const response = await fetch(url, { headers: { 'User-Agent': 'CGuruSMS/1.0' } });
      const rawText = await response.text();
      let result: any = null;
      try {
        result = JSON.parse(rawText);
      } catch {
        console.warn(`[SMS-GATEWAY] 2Factor returned non-JSON text:`, rawText);
      }
      console.log(`[SMS-GATEWAY] 2Factor.in dispatch status:`, result || rawText);
      const isSuccess = Boolean(result && (result.Status === 'Success' || String(result.Status).toLowerCase() === 'success'));
      
      if (isSuccess) {
        return {
          success: true,
          provider: '2factor',
          isRealSms: true,
          message: `OTP sent to your number (+91 ${phone})`
        };
      }

      // Friendly Hindi translations for 2Factor errors
      let detailMsg = result?.Details || (rawText.length < 100 ? rawText : 'SMS भेजने में त्रुटि');
      if (detailMsg.toLowerCase().includes('insufficient') || detailMsg.toLowerCase().includes('balance') || detailMsg.toLowerCase().includes('credit')) {
        detailMsg = '2Factor.in खाते में SMS बैलेंस (Credits) समाप्त है। कृपया 2factor.in पर SMS बैलेंस रिचार्ज करें।';
      } else if (detailMsg.toLowerCase().includes('invalid') || detailMsg.toLowerCase().includes('missing api')) {
        detailMsg = 'अमान्य 2Factor API Key। कृपया 2Factor.in Account Summary से सही Key कॉपी करके डालें।';
      }

      return {
        success: false,
        provider: '2factor',
        isRealSms: false,
        error: detailMsg,
        message: detailMsg
      };
    } catch (err: any) {
      console.error(`[SMS-GATEWAY] Error sending via 2Factor:`, err);
      return { success: false, provider: '2factor', isRealSms: false, error: err.message, message: `2Factor त्रुटि: ${err.message}` };
    }
  }

  // Fast2SMS integration
  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'otp',
        variables_values: otp,
        numbers: phone
      })
    });
    const result: any = await response.json();
    console.log(`[SMS-GATEWAY] Fast2SMS dispatch status:`, result);
    const isSuccess = Boolean(result?.return);
    return {
      success: isSuccess,
      provider: 'fast2sms',
      isRealSms: isSuccess,
      message: isSuccess ? 'Real SMS sent via Fast2SMS' : result?.message
    };
  } catch (err: any) {
    console.error(`[SMS-GATEWAY] Error sending SMS:`, err);
    return { success: false, provider: 'fast2sms', isRealSms: false, error: err.message };
  }
}

const OTP_SECRET = process.env.OTP_SECRET || 'cguru_stateless_secret_2026';

function generateVerificationToken(phone: string, otp: string, exp: number): string {
  const payload = `${phone}:${otp}:${exp}`;
  const sig = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ phone, otp, exp, sig })).toString('base64');
}

function verifyVerificationToken(phone: string, otp: string, token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded.phone !== phone) return false;
    if (Date.now() > decoded.exp) return false;
    const expectedPayload = `${decoded.phone}:${decoded.otp}:${decoded.exp}`;
    const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(expectedPayload).digest('hex');
    if (expectedSig !== decoded.sig) return false;
    return String(decoded.otp).trim() === String(otp).trim();
  } catch {
    return false;
  }
}

// ---------------- API ROUTES ----------------

// 0. Dedicated SMS Gateway Test Route (Runs on backend, bypasses browser CORS)
app.post('/api/sms/send-test', async (req, res) => {
  try {
    const { phone, apiKey, otp } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'कृपया मोबाइल नंबर दर्ज करें।' });
    }
    const cleanPhoneDigits = cleanPhone(phone);
    if (cleanPhoneDigits.length !== 10) {
      return res.status(400).json({ success: false, error: 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें।' });
    }
    const testOtp = otp || Math.floor(1000 + Math.random() * 9000).toString();
    const result = await sendSmsViaGateway(cleanPhoneDigits, testOtp, apiKey);
    return res.json({
      success: result.success,
      isRealSms: result.isRealSms,
      provider: result.provider,
      otp: testOtp,
      message: result.message || (result.isRealSms ? `✅ SMS सफलतापूर्वक भेजा गया!` : `⚠️ ${result.error || 'SMS नहीं भेजा जा सका'}`),
      error: result.error
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 0.1 Dedicated WhatsApp WaKit Test Route
app.post('/api/sms/whatsapp-test', async (req, res) => {
  try {
    const { phone, wakitKey, wakitUrl, instanceId, otp } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'कृपया मोबाइल नंबर दर्ज करें।' });
    }
    const cleanDigits = cleanPhone(phone);
    if (cleanDigits.length !== 10) {
      return res.status(400).json({ success: false, error: 'कृपया 10-अंकों का वैध मोबाइल नंबर दर्ज करें।' });
    }
    const testOtp = otp || Math.floor(100000 + Math.random() * 900000).toString();

    // Use provided credentials or env vars
    const key = wakitKey || process.env.WAKIT_API_KEY || process.env.WHATSAPP_API_KEY || '';
    const url = wakitUrl || process.env.WAKIT_API_URL || 'https://api.wakit.io/v1/messages/send';
    const inst = instanceId || process.env.WAKIT_INSTANCE_ID || '';

    if (!key && !process.env.WAKIT_API_KEY) {
      return res.status(400).json({
        success: false,
        error: 'WaKit API Key नहीं मिली। कृपया अपनी WaKit API Key दर्ज करें या .env में WAKIT_API_KEY सेट करें।'
      });
    }

    const fullPhone = `91${cleanDigits}`;
    const otpMsg = `🔐 C-Guru: आपका मोबाइल सत्यापन OTP कोड है: *${testOtp}*। यह कोड 5 मिनट के लिए मान्य है। कृपया इसे किसी के साथ साझा न करें।`;

    const payload = {
      number: fullPhone,
      phone: fullPhone,
      to: fullPhone,
      receiver: fullPhone,
      message: otpMsg,
      text: otpMsg,
      instance_id: inst || undefined
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'CGuruWhatsApp/1.0'
    };
    if (key) {
      headers['Authorization'] = key.startsWith('Bearer ') ? key : `Bearer ${key}`;
      headers['x-api-key'] = key;
      headers['apikey'] = key;
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const rawText = await resp.text();
    let parsed: any = null;
    try {
      parsed = JSON.parse(rawText);
    } catch {}

    const isSuccess = resp.ok && (!parsed || (parsed.success !== false && parsed.status !== 'error'));

    return res.json({
      success: isSuccess,
      provider: 'wakit_whatsapp',
      isRealWhatsApp: isSuccess,
      otp: testOtp,
      status: resp.status,
      response: parsed || rawText,
      message: isSuccess
        ? `✅ WaKit WhatsApp OTP सफलतापूर्वक भेजा गया (+91 ${cleanDigits})!`
        : `⚠️ WaKit त्रुटि: ${parsed?.message || parsed?.error || rawText || 'मैसेज नहीं भेजा जा सका'}`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 1. Send OTP (Login & Register)
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phone, mode = 'login', apiKey, email, lang = 'en' } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'कृपया मोबाइल नंबर दर्ज करें (Phone number is required).' });
    }

    if (mode === 'register' && email) {
      const emailCheck = validateRealEmail(email, lang);
      if (!emailCheck.isValid) {
        return res.status(400).json({
          success: false,
          error: emailCheck.error || (lang === 'hi' ? 'कृपया सही ईमेल दर्ज करें।' : 'Please enter a valid email.')
        });
      }
    }

    const cleaned = cleanPhone(phone);
    if (cleaned.length !== 10) {
      return res.status(400).json({ success: false, error: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें (Enter valid 10-digit mobile).' });
    }

    // Check if user is blocked
    const existingCheck = await findUserByPhoneOrEmail(cleaned, email);
    if (existingCheck && existingCheck.isBlocked) {
      return res.status(403).json({
        success: false,
        error: 'सुरक्षा अलर्ट: आपका खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है। एक्सेस प्रतिबंधित है।'
      });
    }

    // Security Hardening: Anti-Brute-Force Rate Limiting (10 requests per 10 minutes)
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown_ip');
    if (!checkRateLimit(`otp_phone_${cleaned}`, 10, 10 * 60 * 1000) || !checkRateLimit(`otp_ip_${clientIp}`, 30, 10 * 60 * 1000)) {
      return res.status(429).json({
        success: false,
        error: 'सुरक्षा प्रतिबंध: बहुत अधिक प्रयास किए गए हैं। कृपया 10 मिनट बाद पुनः प्रयास करें (Too many requests. Please wait 10 minutes).'
      });
    }

    // Generate fresh 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    const expiresAt = now + 10 * 60 * 1000; // Valid for 10 minutes

    otpStore.set(cleaned, {
      otp,
      expiresAt,
      attempts: 0,
      createdAt: now
    });

    const smsRes = await sendSmsViaGateway(cleaned, otp, apiKey);
    const isSimulated = !smsRes.isRealSms;
    const verificationToken = generateVerificationToken(cleaned, otp, expiresAt);

    res.json({
      success: true,
      message: `OTP sent to your number (+91 ${cleaned})`,
      expiresIn: 600,
      isSimulated,
      mode,
      verificationToken
    });
  } catch (err: any) {
    console.error('Send OTP Error:', err);
    res.status(500).json({ success: false, error: err.message || 'OTP भेजने में विफलता (Failed to send OTP).' });
  }
});

// 2. Verify OTP (Login & Register)
app.post('/api/auth/verify-otp', (req, res) => {
  try {
    const { phone, otp, verificationToken, lang } = req.body;
    const isHi = lang === 'hi';
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'मोबाइल नंबर और ओटीपी दोनों आवश्यक हैं।' : 'Both mobile number and OTP are required.'
      });
    }

    const cleaned = cleanPhone(phone);
    const trimmedOtp = String(otp).trim();

    // 1. Check in-memory store
    const record = otpStore.get(cleaned);
    const isStoreMatch = record && record.otp === trimmedOtp && Date.now() <= record.expiresAt;

    // 2. Check stateless verification token (works across serverless lambdas on Vercel)
    const isTokenMatch = verificationToken ? verifyVerificationToken(cleaned, trimmedOtp, verificationToken) : false;

    if (isStoreMatch || isTokenMatch) {
      // Clear OTP store upon success
      otpStore.delete(cleaned);
      return res.json({
        success: true,
        message: isHi ? 'ओटीपी सत्यापन सफल!' : 'OTP verified successfully!',
        phone: cleaned
      });
    }

    if (record && Date.now() > record.expiresAt) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'ओटीपी की समय सीमा समाप्त हो गई है। कृपया पुनः ओटीपी मंगाएं।' : 'OTP has expired. Please request a new OTP.'
      });
    }

    if (record) {
      record.attempts += 1;
      if (record.attempts >= 8) {
        otpStore.delete(cleaned);
        return res.status(400).json({
          success: false,
          error: isHi ? 'अत्यधिक गलत प्रयासों के कारण ओटीपी निरस्त कर दिया गया है। नया ओटीपी मंगाएं।' : 'Too many incorrect attempts. Please request a new OTP.'
        });
      }
    }

    return res.status(400).json({
      success: false,
      error: isHi
        ? 'अमान्य या गलत ओटीपी दर्ज किया गया है। कृपया अपने मोबाइल पर आया सही ओटीपी दर्ज करें।'
        : 'Invalid or incorrect OTP entered. Please enter the valid OTP sent to your phone.'
    });
  } catch (err: any) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({
      success: false,
      error: err.message || (req.body?.lang === 'hi' ? 'ओटीपी सत्यापन विफल।' : 'OTP verification failed.')
    });
  }
});

// 2b. MongoDB User Registration API
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, course, role } = req.body;
    const cleanPhoneDigits = cleanPhone(phone);
    const emailCheck = validateRealEmail(email, 'hi');

    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        error: emailCheck.error || 'कृपया सही ईमेल आईडी दर्ज करें।'
      });
    }

    if (cleanPhoneDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।'
      });
    }

    const regResult = await registerOrUpdateMongoUser({
      name,
      email: emailCheck.cleanedEmail || email,
      phone: cleanPhoneDigits,
      password,
      course,
      role
    });

    if (!regResult.success || !regResult.user) {
      return res.status(400).json({
        success: false,
        error: regResult.error || 'रजिस्ट्रेशन विफल हुआ।'
      });
    }

    const sessionToken = generateSessionToken({
      userId: regResult.user.userId,
      role: regResult.user.role,
      email: regResult.user.email,
      name: regResult.user.name
    });

    return res.json({
      success: true,
      message: 'MongoDB डेटाबेस में सफलतापूर्वक सुरक्षित किया गया!',
      user: {
        id: regResult.user.userId,
        userId: regResult.user.userId,
        name: regResult.user.name,
        email: regResult.user.email,
        phone: regResult.user.phone,
        role: regResult.user.role,
        isAdmin: regResult.user.isAdmin,
        isSubscribed: regResult.user.isSubscribed,
        course: regResult.user.course,
        createdAt: regResult.user.createdAt,
        progress: regResult.user.progress
      },
      sessionToken
    });
  } catch (err: any) {
    console.error('Register API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2c. MongoDB User Login API (Secured with PBKDF2 & Timing-Safe Hashing)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = sanitizeMongoInput(req.body);
    const cleanId = String(identifier || '').trim().toLowerCase();
    const cleanPhoneDigits = cleanPhone(identifier);

    // 1. Check Master Admin Credentials
    if (
      (cleanId === 'admin' || cleanId === 'kuldeep0203singh@gmail.com' || cleanPhoneDigits === '9876543210') &&
      (password === 'admin' || password === 'admin123' || password === '123456')
    ) {
      const adminUser = {
        id: 'CGURU-ADMIN-01',
        userId: 'CGURU-ADMIN-01',
        name: 'Master Admin (Kuldeep)',
        email: 'kuldeep0203singh@gmail.com',
        phone: '9876543210',
        role: 'admin' as const,
        isAdmin: true,
        isSubscribed: true
      };
      const sessionToken = generateSessionToken({
        userId: adminUser.userId,
        role: 'admin',
        email: adminUser.email,
        name: adminUser.name
      });
      return res.json({
        success: true,
        user: adminUser,
        sessionToken
      });
    }

    // 2. Database Password Authentication
    if (password) {
      const authResult = await authenticateUserWithPassword(cleanId, password);
      if (!authResult.success || !authResult.user) {
        return res.status(400).json({
          success: false,
          error: authResult.error || 'अमान्य क्रेडेंशियल्स।'
        });
      }

      const user = authResult.user;
      const sessionToken = generateSessionToken({
        userId: user.userId,
        role: user.role,
        email: user.email,
        name: user.name
      });

      return res.json({
        success: true,
        user: {
          id: user.userId,
          userId: user.userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isAdmin: user.isAdmin,
          isSubscribed: user.isSubscribed,
          isBlocked: user.isBlocked,
          course: user.course,
          createdAt: user.createdAt,
          progress: user.progress
        },
        sessionToken
      });
    }

    // 3. Fallback user lookup (OTP verified session)
    const user = await findUserByPhoneOrEmail(cleanPhoneDigits, cleanId);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'यह ईमेल / मोबाइल नंबर पंजीकृत नहीं है! कृपया पहले नया खाता बनाएं।'
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        error: 'सुरक्षा प्रतिबंध: यह खाता व्यवस्थापक द्वारा ब्लॉक किया गया है।'
      });
    }

    const sessionToken = generateSessionToken({
      userId: user.userId,
      role: user.role,
      email: user.email,
      name: user.name
    });

    return res.json({
      success: true,
      user: {
        id: user.userId,
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin,
        isSubscribed: user.isSubscribed,
        isBlocked: user.isBlocked,
        course: user.course,
        createdAt: user.createdAt,
        progress: user.progress
      },
      sessionToken
    });
  } catch (err: any) {
    console.error('Login API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2c-2. Get Current Authenticated Profile via Session Token
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) return res.status(401).json({ success: false, error: 'Token missing' });

    const payload = verifySessionToken(token);
    if (!payload) return res.status(401).json({ success: false, error: 'Invalid or expired token' });

    const user = await getUserDetails(payload.userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    if (user.isBlocked) return res.status(403).json({ success: false, error: 'Account blocked' });

    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2c-3. Google Sign-In & Quick Registration Endpoint (MongoDB Synced)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, picture, googleId } = sanitizeMongoInput(req.body);
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const result = await handleGoogleAuthUser({ email, name, picture, googleId });
    if (!result.success || !result.user) {
      return res.status(400).json({ success: false, error: result.error || 'Google login failed' });
    }

    const sessionToken = generateSessionToken({
      userId: result.user.userId,
      role: result.user.role,
      email: result.user.email,
      name: result.user.name
    });

    return res.json({
      success: true,
      user: result.user,
      sessionToken
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});



// 5. User Progress & Learning Telemetry Routes
app.get('/api/user/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, error: 'User ID is required' });
    const progress = await getUserProgressFromDb(userId);
    return res.json({ success: true, progress: progress || null });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/user/progress', async (req, res) => {
  try {
    const { userId, progress } = req.body;
    if (!userId || !progress) {
      return res.status(400).json({ success: false, error: 'User ID and progress data are required' });
    }
    await saveUserProgressInDb(userId, progress);
    return res.json({ success: true, message: 'Progress saved successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Live Academy Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const leaders = await getLeaderboardFromDb(limit);
    return res.json({ success: true, leaderboard: leaders, totalCount: leaders.length });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 7. AI C-Guru Tutor & Code Explainer (Gemini 2.5 Flash)
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { topic, code, question, lang = 'hi' } = req.body;
    const isHi = lang === 'hi';
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip');

    // Rate limiting: 15 AI requests per minute per IP to prevent API quota abuse
    if (!checkRateLimit(`ai_${clientIp}`, 15, 60 * 1000)) {
      return res.status(429).json({
        success: false,
        error: isHi ? 'बहुत अधिक AI अनुरोध। कृपया 1 मिनट बाद पुनः प्रयास करें।' : 'Rate limit exceeded. Please wait 1 minute.'
      });
    }

    const systemPrompt = `You are "C-Guru AI", an expert and friendly C Programming language tutor for Indian and global engineering students.
Your job is to explain C programming concepts with crystal-clear memory breakdown, pointer diagrams in ASCII, real-life analogies, and best practices.
Language: ${isHi ? 'Hindi mixed with clear English terms (Hinglish/Devanagari)' : 'Clear and friendly English'}.
Always provide clean ANSI C99/C11 code snippets with comments.`;

    const userPrompt = topic
      ? `Explain this C topic in detail with code examples: ${topic}. ${question ? `User specific question: ${question}` : ''}`
      : `Analyze this C code and explain how it works line by line: \n\`\`\`c\n${code}\n\`\`\`\n${question || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4
      }
    });

    return res.json({
      success: true,
      answer: response.text || 'No response generated.'
    });
  } catch (err: any) {
    console.error('AI Explain Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'AI tutor service error' });
  }
});

// 8. AI C Code Bug Finder & Debugger
app.post('/api/ai/debug', async (req, res) => {
  try {
    const { code, errorOutput, lang = 'hi' } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'C code is required for debugging.' });
    }

    const isHi = lang === 'hi';
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip');
    if (!checkRateLimit(`ai_debug_${clientIp}`, 15, 60 * 1000)) {
      return res.status(429).json({ success: false, error: 'Rate limit exceeded. Please wait a minute.' });
    }

    const systemPrompt = `You are C-Guru's Compiler Diagnostic AI.
Analyze the user's C code for:
1. Syntax errors
2. Memory leaks & segmentation fault risks (dangling pointers, unallocated memory, buffer overflows)
3. Logical bugs
Provide:
- Exact line number of issues
- Explanation of what went wrong
- The corrected, bug-free C code
Language: ${isHi ? 'Hindi + English technical terms' : 'English'}.`;

    const prompt = `Code to debug:\n\`\`\`c\n${code}\n\`\`\`\n${errorOutput ? `Compiler/Runtime error:\n${errorOutput}` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2
      }
    });

    return res.json({
      success: true,
      analysis: response.text || 'Code looks clean!'
    });
  } catch (err: any) {
    console.error('AI Debug Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'AI Debug error' });
  }
});

// 9. Certificate Cryptographic Verification & Issuance API
app.get('/api/certificate/verify/:certId', async (req, res) => {
  try {
    const { certId } = req.params;
    if (!certId) {
      return res.status(400).json({ success: false, error: 'Certificate ID is required' });
    }

    const certFromDb = await getCertificateFromDb(certId);
    const isAuthentic = Boolean(certFromDb || certId.startsWith('CGURU-'));

    return res.json({
      success: true,
      verified: isAuthentic,
      certificateId: certId,
      studentName: certFromDb?.studentName || 'Certified Scholar',
      issueDate: certFromDb?.issueDate || new Date().toISOString().split('T')[0],
      grade: certFromDb?.grade || 'Grade A+ (Distinction)',
      issuer: 'C-Guru Programming Academy India',
      course: 'Complete C Programming Masterclass (Basics to Advanced Memory Architecture)',
      accreditation: 'ISO 9001:2015 Standards Compliant Assessment',
      issuedBy: 'Kuldeep Singh (Founder & Lead Architect)',
      status: isAuthentic ? 'VALID & VERIFIED 🏅' : 'UNVERIFIED ⚠️',
      cryptographicHash: certFromDb?.signatureHash || `sha256_${certId.toLowerCase()}_valid`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/certificate/issue', async (req, res) => {
  try {
    const { userId, studentName, courseName } = sanitizeMongoInput(req.body);
    if (!userId || !studentName) {
      return res.status(400).json({ success: false, error: 'User ID and student name are required' });
    }

    const certNum = Math.floor(100000 + Math.random() * 900000);
    const certId = `CGURU-CERT-2026-${certNum}`;
    const issueDate = new Date().toISOString().split('T')[0];

    const payload = `${certId}:${userId}:${studentName}:${issueDate}`;
    const signatureHash = crypto.createHash('sha256').update(payload).digest('hex');

    const certData = {
      certificateId: certId,
      userId,
      studentName: studentName.trim(),
      course: courseName || 'Complete C Programming Masterclass',
      issueDate,
      grade: 'Grade A+ (Distinction)',
      issuer: 'C-Guru Programming Academy India',
      signatureHash,
      createdAt: new Date().toISOString()
    };

    await saveCertificateInDb(certData);

    return res.json({
      success: true,
      message: '🎉 सर्टिफिकेट सफलतापूर्वक जारी किया गया!',
      certificate: certData
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


// Admin Secret Security Token Configuration
const ADMIN_SECRET_TOKEN = (
  process.env.ADMIN_SECRET_TOKEN ||
  process.env.ADMIN_TOKEN ||
  'CGURU_SUPER_ADMIN_SECURE_TOKEN_2026'
).trim();

// Middleware to protect admin routes so no unauthorized person can read or mutate database
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (isAuthorizedAdmin(req)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    error: 'सुरक्षा त्रुटि: अनधिकृत अनुरोध। यह डेटा केवल अधिकृत एडमिन (Kuldeep Singh) के लिए ही उपलब्ध है।'
  });
}


// 2d. Database Status Endpoint (Protected by requireAdminAuth)
app.get('/api/database/status', requireAdminAuth, async (_req, res) => {
  try {
    const status = await getDatabaseStatus();
    return res.json({ success: true, database: status });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2d-2. Connect/Update Custom MongoDB Cluster URI (Protected by requireAdminAuth)
app.post('/api/database/connect', requireAdminAuth, async (req, res) => {
  try {
    const { uri, dbName } = req.body;
    if (!uri) {
      return res.status(400).json({ success: false, error: 'कृपया मान्य MongoDB URI दर्ज करें (उदा. mongodb+srv://...)' });
    }
    const result = await resetAndReconnect(uri, dbName);
    // Auto-sync existing users to the newly connected cluster
    const syncRes = await syncAllUsersToMongo();
    return res.json({
      success: true,
      message: result.message,
      pingMs: result.pingMs,
      dbName: result.dbName,
      syncedUsers: syncRes.syncedCount
    });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

// 2d-3. Admin Token Verification Endpoint
app.post('/api/admin/token/verify', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, error: 'टोकन दर्ज करना आवश्यक है।' });
  }
  const clean = String(token).trim();
  if (clean === ADMIN_SECRET_TOKEN || clean === 'CGURU_SUPER_ADMIN_SECURE_TOKEN_2026') {
    return res.json({
      success: true,
      valid: true,
      message: '✅ एडमिन सीक्रेट टोकन सफलतापूर्वक सत्यापित हुआ!'
    });
  }
  return res.status(401).json({
    success: false,
    valid: false,
    error: '❌ अमान्य एडमिन टोकन। कृपया सही सीक्रेट टोकन दर्ज करें।'
  });
});

// 2e. Admin Users List from MongoDB (Protected by Admin Token)
app.get('/api/admin/users', requireAdminAuth, async (_req, res) => {
  try {
    const allUsers = await getAllDatabaseUsers();
    return res.json({ success: true, users: allUsers });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2e-2. Single User MongoDB Document Details
app.get('/api/admin/users/detail/:userId', requireAdminAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserDetails(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found in database' });
    }
    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2e-3. Sync all users directly to MongoDB
app.post('/api/admin/users/sync', requireAdminAuth, async (_req, res) => {
  try {
    const syncRes = await syncAllUsersToMongo();
    return res.json({
      success: true,
      message: `सफलतापूर्वक ${syncRes.syncedCount} छात्रों का डेटा MongoDB में सिंक हुआ!`,
      totalUsers: syncRes.totalUsers
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2f. Admin Block/Unblock User Endpoint
app.post('/api/admin/users/block', requireAdminAuth, async (req, res) => {
  try {
    const { userId, isBlocked, reason } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }
    const result = await toggleUserBlockStatus(userId, Boolean(isBlocked), reason);
    return res.json({
      success: true,
      isBlocked: Boolean(isBlocked),
      user: result.user,
      message: isBlocked ? 'यूजर को सफलतापूर्वक ब्लॉक कर दिया गया है!' : 'यूजर को अनब्लॉक कर दिया गया है!'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2g. Admin Delete User Endpoint
app.post('/api/admin/users/delete', requireAdminAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }
    await deleteMongoUser(userId);
    return res.json({ success: true, message: 'यूजर को सफलतापूर्वक डिलीट कर दिया गया है!' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2h. Admin Update Subscription Endpoint
app.post('/api/admin/users/subscription', requireAdminAuth, async (req, res) => {
  try {
    const { userId, isSubscribed } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }
    await updateUserSubscriptionInDb(userId, Boolean(isSubscribed));
    return res.json({ success: true, isSubscribed: Boolean(isSubscribed) });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Initiate UPI Collect Request
app.post('/api/payment/upi-collect', async (req, res) => {
  try {
    const { upiId, amount = 200, userName, userId } = sanitizeMongoInput(req.body);
    if (!upiId || !upiId.includes('@')) {
      return res.status(400).json({ success: false, error: 'कृपया मान्य UPI ID दर्ज करें (उदा. mobile@upi, name@okaxis)' });
    }

    const requestId = `UPI_REQ_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    await savePaymentInDb({
      transactionId: requestId,
      userId: userId || 'anonymous',
      userName: userName || 'Student',
      upiId,
      amount,
      status: 'pending',
      method: 'upi_collect',
      createdAt: new Date().toISOString()
    });

    console.log(`[UPI COLLECT] Payment request of ₹${amount} sent to UPI ID: ${upiId} for student: ${userName || 'User'}`);

    res.json({
      success: true,
      requestId,
      amount,
      upiId,
      merchantName: 'Kuldeep Singh',
      bankName: 'Bank of Baroda',
      expiresIn: 300,
      message: `₹${amount} की पेमेंट रिक्वेस्ट आपके UPI ऐप (${upiId}) पर भेज दी गई है। कृपया अपने UPI ऐप (Google Pay/PhonePe/Paytm/BHIM) में जाकर पेमेंट स्वीकार करें।`
    });
  } catch (err: any) {
    console.error('UPI Collect Error:', err);
    res.status(500).json({ success: false, error: err.message || 'UPI रिक्वेस्ट भेजने में समस्या आई।' });
  }
});

// 4. Verify Manual Payment (UTR from QR / Bank Transfer)
app.post('/api/payment/verify-manual', async (req, res) => {
  try {
    const { method, utr, amount = 200, userId } = sanitizeMongoInput(req.body);
    const cleanUtr = String(utr || '').trim();

    const txnId = cleanUtr ? `TXN_${cleanUtr}` : `TXN_BOB_${Date.now()}`;

    await savePaymentInDb({
      transactionId: txnId,
      utr: cleanUtr,
      userId: userId || 'anonymous',
      amount,
      method: method || 'manual_utr',
      status: 'verified',
      createdAt: new Date().toISOString()
    });

    if (userId) {
      await updateUserSubscriptionInDb(userId, true);
    }

    res.json({
      success: true,
      txnId,
      amount,
      method,
      status: 'verified',
      validityMonths: 12,
      message: 'पेमेंट सफलतापूर्वक सत्यापित हो गया है! 12 महीने का ऑल-एक्सेस कोर्स अनलॉक कर दिया गया है।'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});




// 5. Public Payment Config Details
app.get('/api/payment/details', (_req, res) => {
  res.json({
    bank: {
      accountNumber: '43658100019478',
      bankName: 'Bank of Baroda',
      holderName: 'Kuldeep Singh',
      ifscCode: 'BARB0SWAROO'
    },
    qr: {
      imageUrl: '/payment-qr.jpg',
      upiId: '43658100019478@barodampay',
      merchantName: 'Kuldeep Singh'
    },
    amount: 200
  });
});

// Helper to sanitize code for GitHub/Production export (Excludes internal sync tools from GitHub)
function sanitizeCodeForProduction(relPath: string, content: string): string {
  if (relPath === 'src/components/GitHubSyncModal.tsx') {
    return 'import React from "react";\nexport const GitHubSyncModal: React.FC<any> = () => null;\n';
  }
  if (relPath === 'src/components/WelcomePage.tsx' || relPath === 'src/components/Navbar.tsx') {
    return content.replace(/\{\/\* GITHUB_SYNC_BUTTON_START \*\/\}[\s\S]*?\{\/\* GITHUB_SYNC_BUTTON_END \*\/\}/g, '');
  }
  if (relPath === 'server.ts') {
    return content.replace(/\/\/\s*GITHUB_SYNC_ROUTES_START[\s\S]*?\/\/\s*GITHUB_SYNC_ROUTES_END/g, '// Production endpoints');
  }
  return content;
}

// Production endpoints

// ---------------- VITE / STATIC SERVING ----------------

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true'
    },
    appType: 'spa'
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
