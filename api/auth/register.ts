// Vercel Serverless Function: Register User into MongoDB
import { registerOrUpdateMongoUser } from '../../src/db/userService';
import { validateRealEmail } from '../../src/utils/emailValidator';

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
    const { name, email, phone, password, course } = req.body || {};

    // 1. Strict Real Email Check
    const emailCheck = validateRealEmail(email, 'hi');
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        error: emailCheck.error || 'कृपया असली और मान्य Gmail आईडी दर्ज करें।'
      });
    }

    // 2. Strict Phone Check
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।'
      });
    }

    // 3. Register or Update User in MongoDB
    const result = await registerOrUpdateMongoUser({
      name: (name || '').trim(),
      email: emailCheck.cleanedEmail || email.trim(),
      phone: cleanPhone,
      password: (password || '').trim(),
      course: course || 'Complete C Programming Masterclass'
    });

    if (!result.success || !result.user) {
      return res.status(400).json({
        success: false,
        error: result.error || 'रजिस्ट्रेशन विफल हुआ। कृपया पुनः प्रयास करें।'
      });
    }

    return res.json({
      success: true,
      message: 'MongoDB डेटाबेस में सफलतापूर्वक रजिस्टर हुआ!',
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
        createdAt: result.user.createdAt
      }
    });
  } catch (err: any) {
    console.error('Register API Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'रजिस्ट्रेशन के दौरान सर्वर त्रुटि हुई।'
    });
  }
}
