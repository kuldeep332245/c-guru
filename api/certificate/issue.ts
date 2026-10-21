// Vercel Serverless Function: Issue Course Completion Certificate
import crypto from 'crypto';
import { saveCertificateInDb, getUserDetails } from '../../src/db/userService';
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = sanitizeMongoInput(req.body || {});
    const { userId, studentName, courseName } = body;

    if (!userId || !studentName) {
      return res.status(400).json({ success: false, error: 'User ID and student name are required' });
    }

    const certNum = Math.floor(100000 + Math.random() * 900000);
    const certId = `CGURU-CERT-2026-${certNum}`;
    const issueDate = new Date().toISOString().split('T')[0];

    const payload = `${certId}:${userId}:${studentName}:${issueDate}`;
    const signatureHash = crypto.createHash('sha256').update(payload).digest('hex');

    const certData = {
      certificateId: certId,
      userId,
      studentName: studentName.trim(),
      course: courseName || 'Complete C Programming Masterclass',
      issueDate,
      grade: 'Grade A+ (Distinction)',
      issuer: 'C-Guru Programming Academy India',
      signatureHash,
      createdAt: new Date().toISOString()
    };

    await saveCertificateInDb(certData);

    return res.json({
      success: true,
      message: '🎉 सर्टिफिकेट सफलतापूर्वक जारी किया गया!',
      certificate: certData
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
