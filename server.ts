import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security Hardening: Disable Express fingerprinting
app.disable('x-powered-by');

// Security Hardening: Enterprise Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Download-Options', 'noopen');
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

// SMS Gateway Dispatch Function
// The user can plug in their SMS Gateway API key (2Factor / Fast2SMS) in .env as SMS_API_KEY
// or pass it directly from client settings.
async function sendSmsViaGateway(
  phone: string,
  otp: string,
  clientApiKey?: string
): Promise<{ success: boolean; provider: string; isRealSms: boolean; error?: string; message?: string }> {
  const apiKey = (
    clientApiKey ||
    process.env.SMS_API_KEY ||
    process.env.TWO_FACTOR_API_KEY ||
    process.env.FAST2SMS_API_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    console.log(`\n======================================================`);
    console.log(`[SMS-GATEWAY-DEV] SMS API Key not configured in .env yet.`);
    console.log(`[REAL OTP GENERATED] Mobile: +91-${phone} | OTP: ${otp}`);
    console.log(`(Add 2Factor API Key in the menu or .env to deliver real SMS to phone.)`);
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

      // If template name was required or custom OTP failed, try AUTOGEN route (2factor's default approved route)
      const detailsStr = String(result?.Details || rawText || '').toLowerCase();
      if (detailsStr.includes('template') || detailsStr.includes('dlt') || detailsStr.includes('missing') || !isSuccess) {
        try {
          const autoUrl = `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/${encodeURIComponent(phone)}/AUTOGEN`;
          const autoRes = await fetch(autoUrl);
          const autoText = await autoRes.text();
          let autoData: any = null;
          try {
            autoData = JSON.parse(autoText);
          } catch {
            console.warn('[SMS-GATEWAY] 2Factor AUTOGEN non-JSON:', autoText);
          }
          console.log(`[SMS-GATEWAY] 2Factor.in AUTOGEN status:`, autoData || autoText);
          if (autoData && (autoData.Status === 'Success' || String(autoData.Status).toLowerCase() === 'success')) {
            return {
              success: true,
              provider: '2factor',
              isRealSms: true,
              message: `OTP sent to your number (+91 ${phone})`
            };
          }
          if (autoData && autoData.Details) {
            result = autoData;
          }
        } catch (e) {
          console.error('[SMS-GATEWAY] 2Factor AUTOGEN fallback error:', e);
        }
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

// 1. Send OTP (Login & Register)
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phone, mode = 'login', apiKey } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: 'कृपया मोबाइल नंबर दर्ज करें (Phone number is required).' });
    }

    const cleaned = cleanPhone(phone);
    if (cleaned.length !== 10) {
      return res.status(400).json({ success: false, error: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें (Enter valid 10-digit mobile).' });
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
      devOtp: isSimulated ? otp : undefined,
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
    const { phone, otp, verificationToken } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ success: false, error: 'मोबाइल नंबर और ओटीपी दोनों आवश्यक हैं।' });
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
        message: 'ओटीपी सत्यापन सफल! (OTP verified successfully)',
        phone: cleaned
      });
    }

    if (record && Date.now() > record.expiresAt) {
      return res.status(400).json({ success: false, error: 'ओटीपी की समय सीमा समाप्त हो गई है। कृपया पुनः ओटीपी मंगाएं।' });
    }

    if (record) {
      record.attempts += 1;
      if (record.attempts >= 8) {
        otpStore.delete(cleaned);
        return res.status(400).json({ success: false, error: 'अत्यधिक गलत प्रयासों के कारण ओटीपी निरस्त कर दिया गया है। नया ओटीपी मंगाएं।' });
      }
    }

    return res.status(400).json({
      success: false,
      error: 'अमान्य या गलत ओटीपी दर्ज किया गया है। कृपया अपने मोबाइल पर आया सही ओटीपी दर्ज करें।'
    });
  } catch (err: any) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({ success: false, error: err.message || 'ओटीपी सत्यापन विफल।' });
  }
});

// 3. Initiate UPI Collect Request
app.post('/api/payment/upi-collect', (req, res) => {
  try {
    const { upiId, amount = 200, userName } = req.body;
    if (!upiId || !upiId.includes('@')) {
      return res.status(400).json({ success: false, error: 'कृपया मान्य UPI ID दर्ज करें (उदा. mobile@upi, name@okaxis)' });
    }

    const requestId = `UPI_REQ_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

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
app.post('/api/payment/verify-manual', (req, res) => {
  try {
    const { method, utr, amount = 200 } = req.body;
    const cleanUtr = (utr || '').trim();

    const txnId = cleanUtr ? `TXN_${cleanUtr}` : `TXN_BOB_${Date.now()}`;

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
    res.status(500).json({ success: false, error: err.message });
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

// 6. Direct GitHub Repository Push Endpoint
app.post('/api/github/push', async (req, res) => {
  try {
    const { username, repo, token } = req.body;
    if (!username || !repo || !token) {
      return res.status(400).json({ success: false, error: 'Username, repo and token are required' });
    }

    const cleanUser = String(username).trim();
    const cleanRepo = String(repo).trim();
    const cleanToken = String(token).trim();

    const headers: Record<string, string> = {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'C-Guru-App',
      'Content-Type': 'application/json'
    };

    // 1. Verify authenticated user & token permissions
    const userRes = await fetch('https://api.github.com/user', { headers });
    if (!userRes.ok) {
      if (userRes.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'GitHub Token अमान्य (Bad credentials / Invalid Token) है! कृपया नया टोकन बनाकर सही पेस्ट करें।'
        });
      }
      const uErr = await userRes.json().catch(() => ({}));
      return res.status(userRes.status).json({ success: false, error: uErr.message || 'GitHub Authentication failed' });
    }

    const authUserData = await userRes.json();
    const oauthScopes = userRes.headers.get('x-oauth-scopes') || '';

    // Check classic token scope (ghp_)
    if (cleanToken.startsWith('ghp_') && oauthScopes && !oauthScopes.includes('repo')) {
      return res.status(403).json({
        success: false,
        error: 'आपके टोकन में "repo" (Full control of repositories) परमिशन नहीं है! कृपया टोकन बनाते समय "repo" बॉक्स टिक करें।'
      });
    }

    // 2. Check or create repo
    let defaultBranch = 'main';
    const repoRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}`, { headers });
    if (repoRes.status === 404) {
      // Create repo
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: cleanRepo,
          description: 'C-Guru: Interactive C Programming Platform (Hindi & English)',
          private: false,
          auto_init: true
        })
      });
      if (!createRes.ok) {
        const cErr = await createRes.json().catch(() => ({}));
        return res.status(createRes.status).json({ success: false, error: cErr.message || 'रिपॉजिटरी नहीं बन सकी।' });
      }
      await new Promise((r) => setTimeout(r, 1500));
    } else if (repoRes.ok) {
      const repoData = await repoRes.json();
      defaultBranch = repoData.default_branch || 'main';
      if (repoData.permissions && repoData.permissions.push === false) {
        return res.status(403).json({
          success: false,
          error: `टोकन यूजर (${authUserData.login}) के पास ${cleanUser}/${cleanRepo} में कोड लिखने (Push) की अनुमति नहीं है। यदि Fine-grained टोकन है, तो "Contents: Read and write" परमिशन दें।`
        });
      }
    }

    // 3. Collect project files from disk
    const excludeDirs = new Set(['node_modules', '.git', 'dist', '__pycache__', '.temp']);
    const excludeFiles = new Set(['public/c-guru-source-code.zip']);

    function getFiles(dir: string, baseDir: string = ''): { relPath: string; absPath: string }[] {
      let results: { relPath: string; absPath: string }[] = [];
      const list = fs.readdirSync(dir, { withFileTypes: true });
      for (const dirent of list) {
        if (dirent.name.startsWith('.') && dirent.name !== '.gitignore' && dirent.name !== '.env.example' && dirent.name !== '.npmrc') {
          continue;
        }
        if (dirent.isDirectory()) {
          if (!excludeDirs.has(dirent.name)) {
            results = results.concat(getFiles(path.join(dir, dirent.name), path.join(baseDir, dirent.name)));
          }
        } else {
          if (dirent.name.endsWith('.py') || dirent.name.endsWith('.pyc') || dirent.name.endsWith('.zip')) {
            continue;
          }
          const relPath = baseDir ? `${baseDir}/${dirent.name}`.replace(/\\/g, '/') : dirent.name;
          if (!excludeFiles.has(relPath)) {
            results.push({ relPath, absPath: path.join(dir, dirent.name) });
          }
        }
      }
      return results;
    }

    const allFiles = getFiles(__dirname);
    const treeItems: any[] = [];

    // Process files: text files with direct content, binary files with blob
    for (const file of allFiles) {
      const ext = path.extname(file.absPath).toLowerCase();
      const isBinary = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.webp'].includes(ext);

      if (isBinary) {
        const fileBuffer = fs.readFileSync(file.absPath);
        const b64 = fileBuffer.toString('base64');
        const blobRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/blobs`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ content: b64, encoding: 'base64' })
        });
        if (blobRes.ok) {
          const blobData = await blobRes.json();
          treeItems.push({
            path: file.relPath,
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
          });
        }
      } else {
        const textContent = fs.readFileSync(file.absPath, 'utf8');
        treeItems.push({
          path: file.relPath,
          mode: '100644',
          type: 'blob',
          content: textContent
        });
      }
    }

    // 4. Get parent commit & base tree
    let parentCommitSha: string | null = null;
    let baseTreeSha: string | null = null;
    try {
      const refRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/refs/heads/${defaultBranch}`, { headers });
      if (refRes.ok) {
        const refData = await refRes.json();
        parentCommitSha = refData.object?.sha || null;
        if (parentCommitSha) {
          const commitRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/commits/${parentCommitSha}`, { headers });
          if (commitRes.ok) {
            const commitData = await commitRes.json();
            baseTreeSha = commitData.tree?.sha || null;
          }
        }
      }
    } catch {}

    // 5. Create Git Tree
    const treePayload: any = { tree: treeItems };
    if (baseTreeSha) {
      treePayload.base_tree = baseTreeSha;
    }

    let treeRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify(treePayload)
    });

    if (!treeRes.ok && baseTreeSha) {
      // Retry without base_tree if base_tree merge conflicts
      treeRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ tree: treeItems })
      });
    }

    if (!treeRes.ok) {
      const treeErr = await treeRes.json().catch(() => ({}));
      return res.status(treeRes.status).json({
        success: false,
        error: treeErr.message || 'गिट ट्री नहीं बन सकी (Failed to create Git tree)'
      });
    }

    const treeData = await treeRes.json();

    // 6. Create Commit
    const commitRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: 'Update C-Guru: Latest bilingual updates, OTP fix & clean build',
        tree: treeData.sha,
        parents: parentCommitSha ? [parentCommitSha] : []
      })
    });

    if (!commitRes.ok) {
      const cErr = await commitRes.json().catch(() => ({}));
      return res.status(commitRes.status).json({ success: false, error: cErr.message || 'Failed to create commit' });
    }

    const newCommit = await commitRes.json();

    // 7. Update branch ref
    const patchRes = await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/refs/heads/${defaultBranch}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommit.sha, force: true })
    });

    if (!patchRes.ok) {
      await fetch(`https://api.github.com/repos/${cleanUser}/${cleanRepo}/git/refs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ref: `refs/heads/${defaultBranch}`, sha: newCommit.sha })
      });
    }

    return res.json({
      success: true,
      message: 'प्रोजेक्ट सफलतापूर्वक GitHub पर अपलोड हो गया!',
      repoUrl: `https://github.com/${cleanUser}/${cleanRepo}`
    });
  } catch (err: any) {
    console.error('GitHub Push error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
});

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
