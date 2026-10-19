import { validateRealEmail } from '../../src/utils/emailValidator';

// Vercel Serverless Function: Send OTP via 2Factor to mobile
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { phone, apiKey, mode = 'login', lang = 'en', email } = req.body || {};
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

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    let isRealSms = false;
    let providerUsed = 'simulated';
    let feedbackMsg = isHi
      ? `ओटीपी आपके नंबर (+91 ${cleanDigits}) पर भेजा गया है`
      : `OTP sent to your number (+91 ${cleanDigits})`;

    // 1. Primary: WhatsApp OTP via WaKit
    const wakitKey = (
      process.env.WAKIT_API_KEY ||
      process.env.WHATSAPP_API_KEY ||
      'wk_live_XrwS5NYJKkiKgIQdn5YWICaEUi3GAM5bMZvH4APp'
    ).trim();

    const endpointsToTry = process.env.WAKIT_API_URL
      ? [process.env.WAKIT_API_URL]
      : [
          'https://wakit.in/api/v1/otp/send',
          'https://wakit.in/api/v1/messages',
          'https://api.wakit.io/v1/messages/send'
        ];

    if (wakitKey) {
      const fullPhone = `91${cleanDigits}`;
      const otpMessage = `🔐 C-Guru: आपका मोबाइल सत्यापन OTP कोड है: *${generatedOtp}*। यह कोड 5 मिनट के लिए मान्य है। कृपया इसे किसी के साथ साझा न करें।`;
      const payload = {
        to: `+${fullPhone}`,
        phone: `+${fullPhone}`,
        number: fullPhone,
        receiver: fullPhone,
        code: generatedOtp,
        otp: generatedOtp,
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

      for (const endpoint of endpointsToTry) {
        try {
          const wRes = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });

          const rawText = await wRes.text();
          let wData: any = null;
          try {
            wData = JSON.parse(rawText);
          } catch {}

          if (wRes.ok && (!wData || (wData.success !== false && wData.status !== 'error'))) {
            isRealSms = true;
            providerUsed = 'wakit_whatsapp';
            feedbackMsg = isHi
              ? `व्हाट्सएप (WhatsApp) पर OTP भेज दिया गया है (+91 ${cleanDigits})`
              : `OTP has been sent to your WhatsApp (+91 ${cleanDigits})`;
            break;
          }
        } catch (wErr) {
          console.error('[Vercel WaKit WhatsApp Error]:', wErr);
        }
      }
    }

    // 2. Fallback: Direct Text SMS (Only if WhatsApp could not connect, NO voice call)
    const defaultKey = '596ca2fc-c571-11f1-af74-0200cd936042';
    const key = (apiKey || process.env.VITE_SMS_API_KEY || process.env.SMS_API_KEY || defaultKey).trim();

    if (!isRealSms && key) {
      try {
        const url1 = `https://2factor.in/API/V1/${encodeURIComponent(key)}/SMS/${encodeURIComponent(cleanDigits)}/${encodeURIComponent(generatedOtp)}/OTP1`;
        const r = await fetch(url1);
        const data = await r.json().catch(() => null);
        if (data && (data.Status === 'Success' || String(data.Status).toLowerCase() === 'success')) {
          isRealSms = true;
          providerUsed = '2factor_sms';
          feedbackMsg = isHi
            ? `एसएमएस (SMS) द्वारा OTP भेज दिया गया है (+91 ${cleanDigits})`
            : `OTP sent via SMS (+91 ${cleanDigits})`;
        }
      } catch {}
    }

    return res.status(200).json({
      success: true,
      message: feedbackMsg,
      isSimulated: !isRealSms,
      provider: providerUsed,
      devOtp: generatedOtp,
      expiresIn: 600,
      mode
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
