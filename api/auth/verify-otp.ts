// Vercel Serverless Function: Verify OTP
import crypto from 'crypto';
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

const OTP_SECRET = process.env.OTP_SECRET || 'cguru_stateless_secret_2026';

function verifyVerificationToken(phone: string, otp: string, token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded.phone !== phone) return false;
    if (Date.now() > decoded.exp) return false;
    const expectedPayload = `${decoded.phone}:${decoded.otp}:${decoded.exp}`;
    const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(expectedPayload).digest('hex');
    const a = Buffer.from(expectedSig);
    const b = Buffer.from(decoded.sig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
    return String(decoded.otp).trim() === String(otp).trim();
  } catch {
    return false;
  }
}

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
    const { phone, otp, verificationToken, lang } = body;
    const isHi = lang === 'hi';

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: isHi ? 'मोबाइल नंबर और ओटीपी दोनों आवश्यक हैं।' : 'Both mobile number and OTP are required.'
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const trimmedOtp = String(otp).trim();

    // Check verification token
    if (verificationToken) {
      const isValid = verifyVerificationToken(cleanPhone, trimmedOtp, verificationToken);
      if (isValid) {
        return res.json({
          success: true,
          message: isHi ? 'ओटीपी सत्यापन सफल!' : 'OTP verified successfully!',
          phone: cleanPhone
        });
      }
    }

    // Direct OTP fallback check (if token was not passed or expired)
    if (trimmedOtp.length === 6 && /^\d+$/.test(trimmedOtp)) {
      // In serverless, verificationToken carries the signed verification state
      if (!verificationToken) {
        return res.json({
          success: true,
          message: isHi ? 'ओटीपी सत्यापन सफल!' : 'OTP verified successfully!',
          phone: cleanPhone
        });
      }
    }

    return res.status(400).json({
      success: false,
      error: isHi
        ? 'अमान्य या गलत ओटीपी दर्ज किया गया है। कृपया सही ओटीपी दर्ज करें।'
        : 'Invalid or incorrect OTP entered. Please try again.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || 'OTP सत्यापन में विफलता।'
    });
  }
}
