// Vercel Serverless Function: Initiate UPI Collect Request
import { savePaymentInDb } from '../../src/db/userService';
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
    const { upiId, amount = 200, userName, userId } = body;

    if (!upiId || !upiId.includes('@')) {
      return res.status(400).json({ success: false, error: 'कृपया मान्य UPI ID दर्ज करें (उदा. mobile@upi, name@okaxis)' });
    }

    const requestId = `UPI_REQ_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    await savePaymentInDb({
      transactionId: requestId,
      userId: userId || 'anonymous',
      userName: userName || 'Student',
      upiId,
      amount,
      status: 'pending',
      method: 'upi_collect',
      createdAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      requestId,
      amount,
      upiId,
      merchantName: 'Kuldeep Singh',
      bankName: 'Bank of Baroda',
      expiresIn: 300,
      message: `₹${amount} की पेमेंट रिक्वेस्ट आपके UPI ऐप (${upiId}) पर भेज दी गई है। कृपया अपने UPI ऐप (Google Pay/PhonePe/Paytm/BHIM) में जाकर पेमेंट स्वीकार करें।`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'UPI रिक्वेस्ट भेजने में समस्या आई।' });
  }
}
