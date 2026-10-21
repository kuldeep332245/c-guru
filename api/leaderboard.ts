// Vercel Serverless Function: Live Leaderboard
import { getLeaderboardFromDb } from '../src/db/userService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const limit = Math.min(Number(req.query?.limit) || 25, 100);
    const leaders = await getLeaderboardFromDb(limit);
    return res.json({ success: true, leaderboard: leaders, totalCount: leaders.length });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
