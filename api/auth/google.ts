// Vercel Serverless Function: Google OAuth Authentication & Sync
import { handleGoogleAuthUser } from '../../src/db/userService';
import { generateSessionToken, applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

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
    const { email, name, picture, googleId } = body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required for Google Sign-In.' });
    }

    const result = await handleGoogleAuthUser({ email, name, picture, googleId });
    if (!result.success || !result.user) {
      return res.status(400).json({ success: false, error: result.error || 'Google Login failed.' });
    }

    const sessionToken = generateSessionToken({
      userId: result.user.userId,
      role: result.user.role,
      email: result.user.email,
      name: result.user.name
    });

    return res.json({
      success: true,
      user: {
        id: result.user.userId,
        userId: result.user.userId,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        role: result.user.role,
        isAdmin: result.user.isAdmin,
        isSubscribed: result.user.isSubscribed,
        course: result.user.course,
        createdAt: result.user.createdAt,
        progress: result.user.progress
      },
      sessionToken
    });
  } catch (err: any) {
    console.error('Google Auth Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Google Auth Error' });
  }
}
