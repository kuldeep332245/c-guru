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

    const defaultKey = '596ca2fc-c571-11f1-af74-0200cd936042';
    const key = (apiKey || process.env.VITE_SMS_API_KEY || process.env.SMS_API_KEY || defaultKey).trim();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    let isRealSms = false;
    let feedbackMsg = isHi
      ? `ओटीपी आपके नंबर (+91 ${cleanDigits}) पर भेजा गया है`
      : `OTP sent to your number (+91 ${cleanDigits})`;

    if (key) {
      const url1 = `https://2factor.in/API/V1/${encodeURIComponent(key)}/SMS/${encodeURIComponent(cleanDigits)}/${encodeURIComponent(generatedOtp)}/OTP1`;
      let r = await fetch(url1).catch(() => null);
      let data: any = null;
      if (r) {
        try {
          data = await r.json();
        } catch {}
      }

      if (data && (data.Status === 'Success' || String(data.Status).toLowerCase() === 'success')) {
        isRealSms = true;
      } else {
        const autoUrl = `https://2factor.in/API/V1/${encodeURIComponent(key)}/SMS/${encodeURIComponent(cleanDigits)}/AUTOGEN`;
        let r2 = await fetch(autoUrl).catch(() => null);
        let data2: any = null;
        if (r2) {
          try {
            data2 = await r2.json();
          } catch {}
        }
        if (data2 && (data2.Status === 'Success' || String(data2.Status).toLowerCase() === 'success')) {
          isRealSms = true;
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: feedbackMsg,
      isSimulated: !isRealSms,
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
