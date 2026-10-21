import crypto from 'crypto';
import { validateRealEmail } from '../../src/utils/emailValidator';
import { findUserByPhoneOrEmail } from '../../src/db/userService';
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

const OTP_SECRET = process.env.OTP_SECRET || 'cguru_stateless_secret_2026';

function generateVerificationToken(phone: string, otp: string, exp: number): string {
  const payload = `${phone}:${otp}:${exp}`;
  const sig = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ phone, otp, exp, sig })).toString('base64');
}

// Vercel Serverless Function: Send WhatsApp OTP via Wakit.in & SMS Gateway
export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = sanitizeMongoInput(req.body || {});
    const { phone, mode = 'login', lang = 'en', email, apiKey } = body;
    const isHi = lang === 'hi';

    if (mode === 'register' && email) {
      const emailCheck = validateRealEmail(email, lang);
      if (!emailCheck.isValid) {
        return res.status(400).json({
          success: false,
          error: emailCheck.error || (isHi ? 'कृपया असली और मान्य Gmail दर्ज करें।' : 'Please enter a valid Gmail address.')
        });
      }
    }

    const cleanDigits = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'
      });
    }

    // Check if user is blocked
    const existing = await findUserByPhoneOrEmail(cleanDigits, email);
    if (existing && existing.isBlocked) {
      return res.status(403).json({
        success: false,
        error: isHi
          ? 'सुरक्षा प्रतिबंध: यह खाता व्यवस्थापक (Admin) द्वारा ब्लॉक कर दिया गया है।'
          : 'Security restriction: This account is blocked by the administrator.'
      });
    }

    const fullPhone = `+91${cleanDigits}`;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const verificationToken = generateVerificationToken(cleanDigits, generatedOtp, expiresAt);

    const wakitKey = (
      process.env.WAKIT_API_KEY ||
      process.env.WHATSAPP_API_KEY ||
      'wk_live_XrwS5NYJKkiKgIQdn5YWICaEUi3GAM5bMZvH4APp'
    ).trim();

    let isRealSms = false;
    let providerUsed = 'simulation';
    let feedbackMsg = isHi
      ? `ओटीपी आपके नंबर (${fullPhone}) पर भेज दिया गया है`
      : `OTP sent to your number (${fullPhone})`;

    // 1. Primary: Official Wakit.in WhatsApp OTP API
    if (wakitKey) {
      try {
        const wRes = await fetch('https://wakit.in/api/v1/otp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${wakitKey}`
          },
          body: JSON.stringify({
            to: fullPhone,
            code: generatedOtp
          })
        });

        const wData: any = await wRes.json().catch(() => null);
        if (wRes.ok && wData && (wData.success || wData.data?.status === 'sent')) {
          isRealSms = true;
          providerUsed = 'wakit_whatsapp';
          feedbackMsg = isHi
            ? `व्हाट्सएप (WhatsApp) पर OTP भेज दिया गया है (${fullPhone})`
            : `OTP has been sent to your WhatsApp (${fullPhone})`;
        } else {
          console.error('[Wakit Vercel Error]:', wData || wRes.status);
        }
      } catch (wErr: any) {
        console.error('[Wakit Dispatch Exception]:', wErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: feedbackMsg,
      isSimulated: !isRealSms,
      provider: providerUsed,
      devOtp: generatedOtp,
      expiresIn: 600,
      mode,
      verificationToken
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || 'OTP भेजने में विफलता।'
    });
  }
}
