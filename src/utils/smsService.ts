/**
 * Real-Time SMS Gateway Service for Indian Mobile Numbers
 * Supports 2Factor.in, Fast2SMS, and Simulated Push SMS
 */

export interface SmsSendResult {
  success: boolean;
  message: string;
  isRealSms: boolean;
  otp: string;
  provider?: '2factor' | 'fast2sms' | 'simulation';
}

const STORAGE_SMS_KEY = 'cguru_sms_api_key';
const LEGACY_STORAGE_KEY = 'user_2factor_api_key';

// Clean up any exposed client-side keys immediately
export function getSavedSmsApiKey(): string {
  try {
    localStorage.removeItem(STORAGE_SMS_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {}
  return '';
}

export function saveSmsApiKey(_key?: string): void {
  try {
    localStorage.removeItem(STORAGE_SMS_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {}
}

export function detectSmsProvider(_key?: string): '2factor' | 'fast2sms' | 'unknown' {
  return '2factor';
}

export async function sendOtpToMobile(
  phone: string,
  otp: string,
  _apiKey?: string,
  lang: string = 'en'
): Promise<SmsSendResult> {
  const isHi = lang === 'hi';
  const cleanDigits = phone.replace(/\D/g, '').slice(-10);

  // 1. Backend Proxy (Server handles SMS API Key securely in environment variables)
  try {
    const res = await fetch('/api/sms/send-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanDigits, otp, lang })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: data.success,
        message: data.message || (isHi ? `ओटीपी आपके नंबर (+91 ${cleanDigits}) पर भेजा गया है` : `OTP sent to your number (+91 ${cleanDigits})`),
        isRealSms: Boolean(data.isRealSms),
        otp: data.otp || otp,
        provider: data.provider || '2factor'
      };
    }
  } catch (backendErr) {
    console.warn('Backend SMS test proxy failed:', backendErr);
  }

  // 2. Safe client-side fallback if backend proxy was unreachable
  return {
    success: true,
    message: isHi
      ? `ओटीपी आपके नंबर (+91 ${cleanDigits}) पर भेजा गया है`
      : `OTP sent to your number (+91 ${cleanDigits})`,
    isRealSms: false,
    otp,
    provider: 'simulation'
  };
}
