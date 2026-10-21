// Vercel Serverless Function: Admin Get User Detail
import { getUserDetails } from '../../../src/db/userService';
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders } from '../../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({
      success: false,
      error: 'सुरक्षा त्रुटि: अनधिकृत अनुरोध।'
    });
  }

  try {
    const userId = String(req.query?.userId || req.query?.id || '').trim();
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    const user = await getUserDetails(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
