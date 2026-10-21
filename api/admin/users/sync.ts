// Vercel Serverless Function: 1-Click Sync Local Users to MongoDB
import { syncAllUsersToMongo } from '../../../src/db/userService';
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders } from '../../../src/utils/serverSecurity';

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
    const result = await syncAllUsersToMongo();
    return res.json({
      success: true,
      message: `🎉 ${result.syncedCount} छात्र रिकॉर्ड MongoDB Atlas क्लस्टर में सिंक कर दिए गए!`,
      syncedCount: result.syncedCount,
      totalUsers: result.totalUsers
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
