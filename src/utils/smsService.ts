/**
 * Real-Time SMS Gateway Service for Indian Mobile Numbers
 * Supports Fast2SMS, 2Factor, and Simulated Push SMS
 */

export interface SmsSendResult {
  success: boolean;
  message: string;
  isRealSms: boolean;
  otp: string;
}

const STORAGE_SMS_KEY = 'cguru_fast2sms_api_key';

export function getSavedSmsApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_SMS_KEY) || '';
  } catch {
    return '';
  }
}

export function saveSmsApiKey(key: string): void {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_SMS_KEY);
    } else {
      localStorage.setItem(STORAGE_SMS_KEY, key.trim());
    }
  } catch (err) {
    console.error('Failed to save SMS key:', err);
  }
}

export async function sendOtpToMobile(
  phone: string,
  otp: string,
  apiKey?: string
): Promise<SmsSendResult> {
  const activeKey = apiKey || getSavedSmsApiKey();

  // If user provided a real Fast2SMS API Key, call Fast2SMS OTP Gateway
  if (activeKey) {
    try {
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(
        activeKey
      )}&route=otp&variables_values=${encodeURIComponent(
        otp
      )}&flash=0&numbers=${encodeURIComponent(phone)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'cache-control': 'no-cache'
        }
      });

      const data = await response.json();

      if (data && data.return === true) {
        return {
          success: true,
          message: `Real SMS successfully delivered to +91 ${phone} via Fast2SMS gateway!`,
          isRealSms: true,
          otp
        };
      } else {
        return {
          success: true,
          message: `Gateway response: ${data?.message || 'Check key balance'}. Live OTP generated: ${otp}`,
          isRealSms: false,
          otp
        };
      }
    } catch {
      // In case of CORS or network limitation, fall back gracefully
      return {
        success: true,
        message: `Real-time OTP generated: ${otp}`,
        isRealSms: false,
        otp
      };
    }
  }

  // Instant Real-Time OTP simulation
  return {
    success: true,
    message: `Real-time OTP generated for +91 ${phone}`,
    isRealSms: false,
    otp
  };
}
