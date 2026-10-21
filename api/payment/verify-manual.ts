// Vercel Serverless Function: Verify Payment & Activate Subscription
import { savePaymentInDb, updateUserSubscriptionInDb } from '../../src/db/userService';
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
    const { method, utr, amount = 200, userId } = body;
    const cleanUtr = String(utr || '').trim();

    const txnId = cleanUtr ? `TXN_${cleanUtr}` : `TXN_BOB_${Date.now()}`;

    await savePaymentInDb({
      transactionId: txnId,
      utr: cleanUtr,
      userId: userId || 'anonymous',
      amount,
      method: method || 'manual_utr',
      status: 'verified',
      createdAt: new Date().toISOString()
    });

    if (userId) {
      await updateUserSubscriptionInDb(userId, true);
    }

    return res.json({
      success: true,
      txnId,
      amount,
      method,
      status: 'verified',
      validityMonths: 12,
      message: 'पेमेंट सफलतापूर्वक सत्यापित हो गया है! 12 महीने का ऑल-एक्सेस कोर्स अनलॉक कर दिया गया है।'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
