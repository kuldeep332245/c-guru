// Vercel Serverless Function: Connect Database (1-Click MongoDB Connect)
import { resetAndReconnect } from '../../src/db/mongodb';
import { syncAllUsersToMongo } from '../../src/db/userService';
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Admin Security Authorization Check
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({
      success: false,
      error: 'सुरक्षा प्रतिबंध: डेटाबेस कनेक्शन केवल व्यवस्थापक (Admin) द्वारा ही बदला जा सकता है।'
    });
  }

  try {
    const body = sanitizeMongoInput(req.body || {});
    const { uri, dbName = 'cguru_database' } = body;
    if (!uri) {
      return res.status(400).json({ success: false, error: 'MongoDB Connection URI दर्ज करना आवश्यक है।' });
    }

    const result = await resetAndReconnect(String(uri).trim(), String(dbName).trim());
    const syncCount = await syncAllUsersToMongo();

    return res.json({
      success: true,
      message: `🎉 MongoDB डेटाबेस सफलतापूर्वक कनेक्ट हो गया! (${syncCount.syncedCount} छात्र रिकॉर्ड सिंक किए गए)`,
      pingMs: result.pingMs,
      dbName: result.dbName,
      syncedUsers: syncCount.syncedCount,
      totalUsers: syncCount.totalUsers
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message || 'डेटाबेस से कनेक्ट नहीं हो सका। कृपया URI और पासवर्ड जांचें।'
    });
  }
}
