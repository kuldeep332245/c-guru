// Vercel Serverless Function: Admin Delete User
import { deleteMongoUser } from '../../../src/db/userService';
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({
      success: false,
      error: 'सुरक्षा त्रुटि: अनधिकृत अनुरोध।'
    });
  }

  try {
    const body = sanitizeMongoInput(req.body || {});
    const { userId } = body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    await deleteMongoUser(userId);
    return res.json({
      success: true,
      message: 'यूज़र सफलतापूर्वक हटा दिया गया।'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
