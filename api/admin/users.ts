// Vercel Serverless Function: Admin Users List with Search & Stats
import { getAllDatabaseUsers } from '../../src/db/userService';
import { isAuthorizedAdmin, applyCorsAndSecurityHeaders } from '../../src/utils/serverSecurity';

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
      error: 'सुरक्षा त्रुटि: अनधिकृत अनुरोध। यह डेटा केवल अधिकृत एडमिन के लिए ही उपलब्ध है।'
    });
  }

  try {
    const users = await getAllDatabaseUsers();
    const query = String(req.query?.q || '').toLowerCase().trim();

    const filtered = query
      ? users.filter(
          u =>
            (u.name && u.name.toLowerCase().includes(query)) ||
            (u.email && u.email.toLowerCase().includes(query)) ||
            (u.phone && u.phone.includes(query)) ||
            (u.userId && u.userId.toLowerCase().includes(query))
        )
      : users;

    const stats = {
      total: users.length,
      active: users.filter(u => !u.isBlocked).length,
      blocked: users.filter(u => u.isBlocked).length,
      pro: users.filter(u => u.isSubscribed).length
    };

    return res.json({
      success: true,
      users: filtered,
      stats,
      count: filtered.length
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
