// Vercel Serverless Function: Get Current Session Profile
import { getUserDetails } from '../../src/db/userService';
import { verifySessionToken, applyCorsAndSecurityHeaders } from '../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      return res.status(401).json({ success: false, error: 'Authorization header missing.' });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
    }

    const user = await getUserDetails(payload.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found.' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ success: false, error: 'Account is blocked by Administrator.' });
    }

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
        course: user.course,
        createdAt: user.createdAt,
        progress: user.progress
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Session verification error' });
  }
}
