// Vercel Serverless Function: Proxy SMS to 2Factor.in / Fast2SMS to bypass browser CORS completely
export default async function handler(req: any, res: any) {
  // Set CORS headers so client can call this from any domain
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
    const { phone, apiKey, otp = '1234', lang = 'en' } = req.body || {};
    const isHi = lang === 'hi';
    const cleanDigits = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'
      });
    }

    const defaultKey = '596ca2fc-c571-11f1-af74-0200cd936042';
    const key = (apiKey || process.env.VITE_SMS_API_KEY || process.env.SMS_API_KEY || defaultKey).trim();

    if (!key) {
      return res.status(400).json({
        success: false,
        error: isHi ? '2Factor API Key आवश्यक है।' : '2Factor API Key is required.'
      });
    }

    // Call 2Factor.in directly from server (No browser CORS!)
    const url1 = `https://2factor.in/API/V1/${encodeURIComponent(key)}/SMS/${encodeURIComponent(cleanDigits)}/${encodeURIComponent(otp)}/OTP1`;
    let response = await fetch(url1).catch(() => null);
    let rawText = '';
    let data: any = null;

    if (response) {
      rawText = await response.text();
      try {
        data = JSON.parse(rawText);
      } catch {}
    }

    let isSuccess = Boolean(data && (data.Status === 'Success' || String(data.Status).toLowerCase() === 'success'));

    // Fallback to AUTOGEN route if OTP1 template had issues
    if (!isSuccess) {
      const autoUrl = `https://2factor.in/API/V1/${encodeURIComponent(key)}/SMS/${encodeURIComponent(cleanDigits)}/AUTOGEN`;
      const autoRes = await fetch(autoUrl).catch(() => null);
      if (autoRes) {
        const autoText = await autoRes.text();
        let autoData: any = null;
        try {
          autoData = JSON.parse(autoText);
        } catch {}
        if (autoData && (autoData.Status === 'Success' || String(autoData.Status).toLowerCase() === 'success')) {
          data = autoData;
          isSuccess = true;
        }
      }
    }

    if (isSuccess) {
      return res.status(200).json({
        success: true,
        message: isHi
          ? `ओटीपी आपके नंबर (+91 ${cleanDigits}) पर भेजा गया है`
          : `OTP sent to your number (+91 ${cleanDigits})`,
        isRealSms: true,
        otp,
        provider: '2factor'
      });
    }

    let errDetail = data?.Details || rawText || 'Failed to dispatch SMS';
    if (errDetail.toLowerCase().includes('insufficient') || errDetail.toLowerCase().includes('balance')) {
      errDetail = isHi
        ? '2Factor.in खाते में SMS बैलेंस समाप्त है। कृपया 2factor.in पर बैलेंस रिचार्ज करें।'
        : '2Factor.in SMS balance is exhausted. Please recharge credits on 2factor.in.';
    } else if (errDetail.toLowerCase().includes('invalid') || errDetail.toLowerCase().includes('missing')) {
      errDetail = isHi
        ? 'अमान्य 2Factor API Key। कृपया 2Factor.in से सही Key जांचें।'
        : 'Invalid 2Factor API Key. Please verify your Key from 2Factor.in account.';
    }

    return res.status(200).json({
      success: false,
      message: `2Factor: ${errDetail}`,
      isRealSms: false,
      otp,
      provider: '2factor'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
      isRealSms: false
    });
  }
}
