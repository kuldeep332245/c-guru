// Vercel Serverless Function: Payment Configuration & Bank Details
import { applyCorsAndSecurityHeaders } from '../../src/utils/serverSecurity';

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  return res.json({
    bank: {
      accountNumber: '43658100019478',
      bankName: 'Bank of Baroda',
      holderName: 'Kuldeep Singh',
      ifscCode: 'BARB0SWAROO'
    },
    qr: {
      imageUrl: '/payment-qr.jpg',
      upiId: '43658100019478@barodampay',
      merchantName: 'Kuldeep Singh'
    },
    amount: 200
  });
}
