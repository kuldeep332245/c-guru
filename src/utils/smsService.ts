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
const LEGACY_STORAGE_KEY = 'cguru_fast2sms_api_key';

export function getSavedSmsApiKey(): string {
  try {
    return (
      localStorage.getItem(STORAGE_SMS_KEY) ||
      localStorage.getItem(LEGACY_STORAGE_KEY) ||
      (import.meta as any).env?.VITE_SMS_API_KEY ||
      (import.meta as any).env?.VITE_2FACTOR_API_KEY ||
      ''
    );
  } catch {
    return '';
  }
}

export function saveSmsApiKey(key: string): void {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_SMS_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_SMS_KEY, key.trim());
      localStorage.setItem(LEGACY_STORAGE_KEY, key.trim());
    }
  } catch (err) {
    console.error('Failed to save SMS key:', err);
  }
}

export function detectSmsProvider(key: string): '2factor' | 'fast2sms' | 'unknown' {
  const trimmed = (key || '').trim();
  if (!trimmed) return 'unknown';
  // 2Factor.in API keys are typically UUID format (e.g. 8-4-4-4-12 chars with hyphens)
  if (trimmed.includes('-') || trimmed.length === 36) {
    return '2factor';
  }
  return 'fast2sms';
}

export async function sendOtpToMobile(
  phone: string,
  otp: string,
  apiKey?: string
): Promise<SmsSendResult> {
  const activeKey = (apiKey || getSavedSmsApiKey()).trim();
  const cleanDigits = phone.replace(/\D/g, '').slice(-10);

  // 1. Try Backend Proxy First (avoids browser CORS & mixed content completely)
  try {
    const res = await fetch('/api/sms/send-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanDigits, apiKey: activeKey, otp })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: data.success,
        message: data.message || `OTP sent to your number (+91 ${cleanDigits})`,
        isRealSms: Boolean(data.isRealSms),
        otp: data.otp || otp,
        provider: data.provider || 'unknown'
      };
    }
  } catch (backendErr) {
    console.warn('Backend SMS test proxy failed, attempting direct fetch:', backendErr);
  }

  // 2. Direct client-side fallback if backend route is unavailable
  if (activeKey) {
    const provider = detectSmsProvider(activeKey);

    // 2.1 If 2Factor.in API Key
    if (provider === '2factor') {
      try {
        const url = `https://2factor.in/API/V1/${encodeURIComponent(
          activeKey
        )}/SMS/${encodeURIComponent(cleanDigits)}/${encodeURIComponent(otp)}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'cache-control': 'no-cache'
          }
        });

        const rawText = await response.text();
        let data: any = null;
        try {
          data = JSON.parse(rawText);
        } catch {
          // If non-JSON
        }

        if (data && (data.Status === 'Success' || String(data.Status).toLowerCase() === 'success')) {
          return {
            success: true,
            message: `OTP sent to your number (+91 ${cleanDigits})`,
            isRealSms: true,
            otp,
            provider: '2factor'
          };
        } else {
          let errDetail = data?.Details || rawText || 'त्रुटि';
          if (errDetail.toLowerCase().includes('insufficient') || errDetail.toLowerCase().includes('balance')) {
            errDetail = '2Factor.in में SMS बैलेंस (Credits) समाप्त है। कृपया 2factor.in पर SMS बैलेंस रिचार्ज करें।';
          } else if (errDetail.toLowerCase().includes('invalid') || errDetail.toLowerCase().includes('missing api')) {
            errDetail = 'अमान्य 2Factor API Key। कृपया 2Factor.in Account Summary से सही Key कॉपी करें।';
          }
          return {
            success: false,
            message: `2Factor: ${errDetail}`,
            isRealSms: false,
            otp,
            provider: '2factor'
          };
        }
      } catch (err: any) {
        return {
          success: false,
          message: `2Factor नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।`,
          isRealSms: false,
          otp,
          provider: '2factor'
        };
      }
    }

    // 2. Fast2SMS OTP Gateway
    try {
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(
        activeKey
      )}&route=otp&variables_values=${encodeURIComponent(
        otp
      )}&flash=0&numbers=${encodeURIComponent(cleanDigits)}`;

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
          message: `Real SMS successfully delivered to +91 ${cleanDigits} via Fast2SMS gateway!`,
          isRealSms: true,
          otp,
          provider: 'fast2sms'
        };
      } else {
        return {
          success: true,
          message: `Fast2SMS response: ${data?.message || 'Check balance'}. Live OTP: ${otp}`,
          isRealSms: false,
          otp,
          provider: 'fast2sms'
        };
      }
    } catch {
      return {
        success: true,
        message: `Real-time OTP generated: ${otp}`,
        isRealSms: false,
        otp,
        provider: 'fast2sms'
      };
    }
  }

  // Instant Real-Time OTP simulation
  return {
    success: true,
    message: `Real-time OTP generated for +91 ${cleanDigits}`,
    isRealSms: false,
    otp,
    provider: 'simulation'
  };
}
