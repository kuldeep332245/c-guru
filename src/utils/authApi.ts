// Client-side Authentication and OTP API helpers
import { sendOtpToMobile, getSavedSmsApiKey } from './smsService';

export interface SendOtpResponse {
  success: boolean;
  message: string;
  devOtp?: string;
  isSimulated?: boolean;
  expiresIn?: number;
  verificationToken?: string;
  error?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Master bypass removed - only genuine sent OTPs are valid
export const MASTER_TEST_OTPS: string[] = [];

// In-memory fallback if server is momentarily unreachable (or serverless lambdas on Vercel)
const clientOtpFallback = new Map<string, { otp: string; token?: string; expiresAt: number }>();

export async function sendOtpApi(
  phone: string,
  mode: 'login' | 'register' = 'login'
): Promise<SendOtpResponse> {
  const cleanP = phone.replace(/\D/g, '').slice(-10);
  if (cleanP.length !== 10) {
    return {
      success: false,
      message: 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।',
      error: 'Invalid 10-digit mobile number'
    };
  }

  const savedKey = getSavedSmsApiKey();

  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanP, mode, apiKey: savedKey })
    });

    if (res.ok) {
      const data: SendOtpResponse = await res.json();
      if (data.devOtp || data.verificationToken) {
        clientOtpFallback.set(cleanP, {
          otp: data.devOtp || '',
          token: data.verificationToken,
          expiresAt: Date.now() + 10 * 60 * 1000
        });
        try {
          sessionStorage.setItem(
            `cguru_otp_${cleanP}`,
            JSON.stringify({
              otp: data.devOtp || '',
              token: data.verificationToken,
              expiresAt: Date.now() + 10 * 60 * 1000
            })
          );
        } catch {}
      }
      return data;
    } else {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error || `HTTP error ${res.status}`);
    }
  } catch (err: any) {
    console.warn('Backend /api/auth/send-otp fallback (Static/Netlify/Vercel direct mode):', err.message);
    // Offline / client-side hosting fallback: generate a 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    clientOtpFallback.set(cleanP, {
      otp: generatedOtp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });
    try {
      sessionStorage.setItem(
        `cguru_otp_${cleanP}`,
        JSON.stringify({
          otp: generatedOtp,
          expiresAt: Date.now() + 10 * 60 * 1000
        })
      );
    } catch {}

    // Real SMS Dispatch via 2Factor / Fast2SMS if API key is present!
    let isReal = false;
    let feedbackMsg = `OTP sent to your number (+91 ${cleanP})`;
    try {
      const smsRes = await sendOtpToMobile(cleanP, generatedOtp, savedKey);
      if (smsRes.isRealSms) {
        isReal = true;
        feedbackMsg = smsRes.message || `OTP sent to your number (+91 ${cleanP})`;
      }
    } catch {}

    return {
      success: true,
      message: feedbackMsg,
      isSimulated: !isReal,
      expiresIn: 600
    };
  }
}

export async function verifyOtpApi(
  phone: string,
  otp: string,
  mode: 'login' | 'register' = 'login'
): Promise<VerifyOtpResponse> {
  const cleanP = phone.replace(/\D/g, '').slice(-10);
  const trimmedOtp = (otp || '').trim();

  // Retrieve token from memory or sessionStorage
  let storedRecord = clientOtpFallback.get(cleanP);
  if (!storedRecord) {
    try {
      const raw = sessionStorage.getItem(`cguru_otp_${cleanP}`);
      if (raw) storedRecord = JSON.parse(raw);
    } catch {}
  }

  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: cleanP,
        otp: trimmedOtp,
        mode,
        verificationToken: storedRecord?.token
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const errData = await res.json().catch(() => null);

      // Fallback check: if serverless instance lost in-memory state but client knows OTP
      if (storedRecord && storedRecord.otp && storedRecord.otp === trimmedOtp && Date.now() <= storedRecord.expiresAt) {
        return {
          success: true,
          message: 'ओटीपी सत्यापन सफल!'
        };
      }

      return {
        success: false,
        message: errData?.error || 'अमान्य ओटीपी दर्ज किया गया है। कृपया सही ओटीपी दर्ज करें।',
        error: errData?.error
      };
    }
  } catch (err: any) {
    console.warn('Backend /api/auth/verify-otp fallback:', err.message);
    // Offline / client fallback check
    if (storedRecord && storedRecord.otp && storedRecord.otp === trimmedOtp && Date.now() <= storedRecord.expiresAt) {
      clientOtpFallback.delete(cleanP);
      try {
        sessionStorage.removeItem(`cguru_otp_${cleanP}`);
      } catch {}
      return {
        success: true,
        message: 'ओटीपी सत्यापन सफल!'
      };
    }

    return {
      success: false,
      message: 'गलत या अमान्य ओटीपी। कृपया अपने मोबाइल पर आया सही ओटीपी दर्ज करें।',
      error: 'Invalid OTP'
    };
  }
}
