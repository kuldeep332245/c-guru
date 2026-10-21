// Vercel Serverless Function: Test WaKit WhatsApp Gateway
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

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
    const { phone, otp = '123456', message } = body;

    const cleanDigits = String(phone || '').replace(/\D/g, '').slice(-10);
    if (cleanDigits.length !== 10) {
      return res.status(400).json({ success: false, error: 'कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।' });
    }

    const wakitKey = (
      process.env.WAKIT_API_KEY ||
      process.env.WHATSAPP_API_KEY ||
      'wk_live_XrwS5NYJKkiKgIQdn5YWICaEUi3GAM5bMZvH4APp'
    ).trim();

    const fullPhone = `+91${cleanDigits}`;
    const otpCode = String(otp).trim();

    const response = await fetch('https://wakit.in/api/v1/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wakitKey}`
      },
      body: JSON.stringify({
        to: fullPhone,
        code: otpCode
      })
    });

    const parsed: any = await response.json().catch(() => null);
    const isSuccess = response.ok && parsed && (parsed.success || parsed.data?.status === 'sent');

    return res.json({
      success: isSuccess,
      provider: 'wakit_whatsapp',
      isRealSms: isSuccess,
      status: response.status,
      details: parsed,
      message: isSuccess
        ? `✅ WaKit WhatsApp OTP सफलतापूर्वक भेजा गया (${fullPhone})!`
        : `⚠️ WaKit त्रुटि: ${parsed?.message || parsed?.error || 'मैसेज नहीं भेजा जा सका'}`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
