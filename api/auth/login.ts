// Vercel Serverless Function: Login User via MongoDB or Credentials
import { findUserByPhoneOrEmail } from '../../src/db/userService';

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
    const { identifier, password } = req.body || {};
    const cleanId = String(identifier || '').trim().toLowerCase();
    const cleanPhone = cleanId.replace(/\D/g, '').slice(-10);

    // Look up user in MongoDB / store
    const user = await findUserByPhoneOrEmail(cleanPhone, cleanId);

    if (!user) {
      // Check admin hardcoded fallback
      if (
        (cleanId === 'admin' || cleanId === 'kuldeep0203singh@gmail.com' || cleanPhone === '9876543210') &&
        (password === 'admin' || password === 'admin123' || password === '123456')
      ) {
        return res.json({
          success: true,
          user: {
            id: 'admin_master',
            userId: 'CGURU-ADMIN-01',
            name: 'Master Admin (Kuldeep)',
            email: 'kuldeep0203singh@gmail.com',
            phone: '9876543210',
            role: 'admin',
            isAdmin: true,
            isSubscribed: true
          }
        });
      }

      return res.status(400).json({
        success: false,
        error: 'यह ईमेल / मोबाइल नंबर रजिस्टर नहीं है! कृपया पहले नया खाता बनाएं।'
      });
    }

    // Check password if set
    if (user.password && password) {
      if (user.password.trim() !== String(password).trim()) {
        return res.status(400).json({
          success: false,
          error: 'गलत पासवर्ड दर्ज किया गया है।'
        });
      }
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
        createdAt: user.createdAt
      }
    });
  } catch (err: any) {
    console.error('Login API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'लॉगिन में त्रुटि हुई।' });
  }
}
