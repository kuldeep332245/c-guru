// Vercel Serverless Function: WhatsApp & SMS OTP Dispatcher
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
    const { phone, otp = '123456', lang = 'en' } = req.body || {};
    const isHi = lang === 'hi';
    const cleanDigits = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'
      });
    }

    const fullPhone = `+91${cleanDigits}`;
    const wakitKey = (
      process.env.WAKIT_API_KEY ||
      process.env.WHATSAPP_API_KEY ||
      'wk_live_XrwS5NYJKkiKgIQdn5YWICaEUi3GAM5bMZvH4APp'
    ).trim();

    // 1. WhatsApp OTP via official Wakit.in API
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
            code: String(otp)
          })
        });

        const wData: any = await wRes.json().catch(() => null);
        if (wRes.ok && wData && (wData.success || wData.data?.status === 'sent')) {
          return res.status(200).json({
            success: true,
            message: isHi
              ? `व्हाट्सएप (WhatsApp) पर OTP भेज दिया गया है (${fullPhone})`
              : `OTP sent to your WhatsApp (${fullPhone})`,
            isRealSms: true,
            otp,
            provider: 'wakit_whatsapp'
          });
        }
      } catch (err: any) {
        console.error('[WaKit Dispatch Error]:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: isHi
        ? `ओटीपी आपके नंबर (${fullPhone}) पर भेज दिया गया है`
        : `OTP sent to your number (${fullPhone})`,
      isRealSms: false,
      otp,
      provider: 'simulation'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
