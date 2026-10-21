// Vercel Serverless Function: Admin Token Verification
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../../src/utils/serverSecurity';

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
    const token = String(body.token || '').trim();

    if (!token) {
      return res.status(400).json({ success: false, error: 'एडमिन टोकन दर्ज करना आवश्यक है।' });
    }

    const authorized = isAuthorizedAdmin({ headers: { 'x-admin-token': token } });

    if (authorized) {
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
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
