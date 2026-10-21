// Vercel Serverless Function: User Progress Sync & Retrieval
import { saveUserProgressInDb, getUserProgressFromDb } from '../../src/db/userService';
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const userId = String(req.query?.userId || req.query?.id || '').trim();
      if (!userId) return res.status(400).json({ success: false, error: 'User ID is required' });
      const progress = await getUserProgressFromDb(userId);
      return res.json({ success: true, progress });
    }

    if (req.method === 'POST') {
      const body = sanitizeMongoInput(req.body || {});
      const { userId, progress } = body;
      if (!userId || !progress) {
        return res.status(400).json({ success: false, error: 'User ID and progress data are required' });
      }
      await saveUserProgressInDb(userId, progress);
      return res.json({ success: true, message: 'Progress saved successfully' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
