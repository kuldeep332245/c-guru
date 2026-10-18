// Vercel Serverless Function: Check MongoDB Database Connection Status
import { getDatabaseStatus } from '../../src/db/userService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const status = await getDatabaseStatus();
    return res.json({
      success: true,
      database: status
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
