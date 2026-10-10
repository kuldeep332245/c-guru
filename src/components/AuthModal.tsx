import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  Smartphone,
  User as UserIcon,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  RefreshCw,
  Edit3
} from 'lucide-react';
import {
  registerUserWithCredentials,
  loginUserWithCredentials,
  loginOrRegisterWithPhoneOtp,
  loginUserWithPhoneOtp,
  registerUserWithPhoneOtp,
  isPhoneRegistered,
  ADMIN_USER
} from '../utils/storage';
import { sendOtpApi, verifyOtpApi } from '../utils/authApi';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  isDark: boolean;
  initialMode?: 'login' | 'register';
  lang?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isDark,
  initialMode = 'login',
  lang = 'hi'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');

  // Registration & User details (Course selection removed as requested)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Password Login Fields
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState<'phone' | 'verify'>('phone');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset and sync mode whenever initialMode or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setAuthMethod('otp');
      setOtpStep('phone');
      setOtpDigits(['', '', '', '', '', '']);
      setDevOtp(null);
      setError(null);
      setSuccessMsg(null);
      setCountdown(0);
    }
  }, [isOpen, initialMode]);

  // Countdown timer effect
  useEffect(() => {
    let timer: any = null;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  if (!isOpen) return null;

  // Clean phone number helper
  const cleanP = phone.replace(/\D/g, '').slice(-10);

  // Handle Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (cleanP.length !== 10) {
      setError(
        lang === 'hi'
          ? 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    // STRICT CHECK: Unregistered numbers CANNOT log in!
    if (mode === 'login') {
      const isRegistered = isPhoneRegistered(cleanP);
      if (!isRegistered) {
        setError(
          lang === 'hi'
            ? 'यह मोबाइल नंबर रजिस्टर नहीं है! कृपया पहले नया खाता बनाएं।'
            : 'This mobile number is not registered! Please create an account first.'
        );
        return;
      }
    }

    if (mode === 'register') {
      const isRegistered = isPhoneRegistered(cleanP);
      if (isRegistered) {
        setError(
          lang === 'hi'
            ? 'यह मोबाइल नंबर पहले से रजिस्टर्ड है! कृपया सीधे लॉगिन करें।'
            : 'This number is already registered! Please switch to Login tab.'
        );
        return;
      }
      if (!name.trim()) {
        setError(
          lang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.'
        );
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError(
          lang === 'hi' ? 'कृपया सही ईमेल आईडी दर्ज करें।' : 'Please enter a valid email address.'
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await sendOtpApi(cleanP, mode);
      setIsSubmitting(false);

      if (res.success) {
        setOtpStep('verify');
        setCountdown(60); // 60 seconds resend countdown
        setOtpDigits(['', '', '', '', '', '']);

        if (res.devOtp) {
          setDevOtp(res.devOtp);
          setIsSimulated(Boolean(res.isSimulated));
        } else {
          setDevOtp(null);
          setIsSimulated(false);
        }

        setSuccessMsg(
          res.message ||
            (lang === 'hi'
              ? `ओटीपी +91 ${cleanP} पर भेज दिया गया है।`
              : `OTP has been sent to +91 ${cleanP}.`)
        );
        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 150);
      } else {
        setError(
          res.error ||
            res.message ||
            (lang === 'hi' ? 'OTP भेजने में विफल। पुनः प्रयास करें।' : 'Failed to send OTP. Please try again.')
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setError(
        err.message || (lang === 'hi' ? 'OTP भेजने में त्रुटि हुई।' : 'Error sending OTP.')
      );
    }
  };

  // Handle OTP digit change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // User pasted full OTP
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted.length > 0) {
        const nextDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          nextDigits[i] = pasted[i] || '';
        }
        setOtpDigits(nextDigits);
        const focusIdx = Math.min(pasted.length, 5);
        otpInputRefs.current[focusIdx]?.focus();
        return;
      }
    }

    const digit = value.replace(/\D/g, '').slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    // Auto focus next input
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation in OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Auto fill dev OTP helper
  const handleAutoFillDevOtp = () => {
    if (devOtp && devOtp.length === 6) {
      const digits = devOtp.split('');
      setOtpDigits(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  // Handle Verify OTP & Login/Register
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const fullOtp = otpDigits.join('').trim();
    if (fullOtp.length !== 6) {
      setError(
        lang === 'hi'
          ? 'कृपया 6-अंकों का पूरा ओटीपी दर्ज करें।'
          : 'Please enter complete 6-digit OTP.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const verifyRes = await verifyOtpApi(cleanP, fullOtp, mode);
      if (!verifyRes.success) {
        setIsSubmitting(false);
        setError(
          verifyRes.error ||
            verifyRes.message ||
            (lang === 'hi' ? 'अमान्य ओटीपी दर्ज किया गया है।' : 'Invalid OTP entered.')
        );
        return;
      }

      // If Login mode, only login existing user!
      if (mode === 'login') {
        const authRes = loginUserWithPhoneOtp(cleanP);
        setIsSubmitting(false);

        if (authRes.success && authRes.user) {
          setSuccessMsg(
            lang === 'hi'
              ? `ओटीपी सत्यापित! स्वागत है, ${authRes.user.name}! 🎉`
              : `OTP Verified! Welcome, ${authRes.user.name}! 🎉`
          );
          setTimeout(() => {
            onSuccess(authRes.user!);
          }, 400);
        } else {
          setError(
            authRes.error ||
              (lang === 'hi'
                ? 'यह मोबाइल नंबर रजिस्टर नहीं है! कृपया पहले नया खाता बनाएं।'
                : 'Number is not registered! Please create an account first.')
          );
        }
      } else {
        // Register mode: create new account
        const authRes = registerUserWithPhoneOtp(cleanP, {
          name: name.trim(),
          email: email.trim(),
          course: 'Complete C Programming Masterclass',
          password: password.trim() || undefined
        });
        setIsSubmitting(false);

        if (authRes.success && authRes.user) {
          setSuccessMsg(
            lang === 'hi'
              ? `रजिस्ट्रेशन सफल! स्वागत है, ${authRes.user.name}! 🎉`
              : `Registration successful! Welcome, ${authRes.user.name}! 🎉`
          );
          setTimeout(() => {
            onSuccess(authRes.user!);
          }, 400);
        } else {
          setError(authRes.error || (lang === 'hi' ? 'रजिस्ट्रेशन विफल रहा।' : 'Registration failed.'));
        }
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err.message || (lang === 'hi' ? 'ओटीपी सत्यापन में त्रुटि हुई।' : 'Error verifying OTP.'));
    }
  };

  // Legacy / Password Login handler
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const trimmedId = loginId.trim();
    const trimmedPass = loginPassword.trim();

    if (!trimmedId) {
      setError(
        lang === 'hi'
          ? 'कृपया रजिस्टर्ड ईमेल या मोबाइल नंबर दर्ज करें।'
          : 'Please enter registered email or mobile number.'
      );
      return;
    }
    if (!trimmedPass) {
      setError(
        lang === 'hi' ? 'कृपया पासवर्ड दर्ज करें।' : 'Please enter your password.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginUserWithCredentials(trimmedId, trimmedPass);
      setIsSubmitting(false);
      if (res.success && res.user) {
        setSuccessMsg(
          lang === 'hi'
            ? `लॉगिन सफल! स्वागत है, ${res.user.name}!`
            : `Login successful! Welcome, ${res.user.name}!`
        );
        setTimeout(() => {
          onSuccess(res.user!);
        }, 300);
      } else {
        setError(
          res.error ||
            (lang === 'hi' ? 'लॉगिन विफल। कृपया पासवर्ड जांचें।' : 'Login failed. Please verify credentials.')
        );
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl shadow-2xl relative border overflow-hidden my-auto transition-all ${
          isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Header (Fixed) */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-700/30 shrink-0 relative pr-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-[#252A36]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600/10 text-blue-500 border border-blue-500/20 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {mode === 'login'
                  ? (lang === 'hi' ? 'C-Guru लॉगिन' : 'Sign In to C-Guru')
                  : (lang === 'hi' ? 'नया खाता बनाएं' : 'Create an Account')}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {mode === 'login'
                  ? (lang === 'hi' ? 'सुरक्षित मोबाइल OTP से तुरंत लॉगिन करें' : 'Fast and secure login with mobile OTP')
                  : (lang === 'hi' ? 'रजिस्टर करें और C प्रोग्रामिंग की यात्रा शुरू करें' : 'Sign up to start your C programming masterclass')}
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {/* Mode Switcher Tabs */}
          <div className={`grid grid-cols-2 p-1 rounded-xl border ${
            isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setOtpStep('phone');
                setError(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'hi' ? 'लॉगिन' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setOtpStep('phone');
                setError(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'hi' ? 'रजिस्टर (नया खाता)' : 'Register (New Account)'}
            </button>
          </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs flex items-start sm:items-center justify-between gap-2.5 bg-rose-500/15 border-2 border-rose-500/40 text-rose-300 animate-in fade-in">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="font-medium">{error}</span>
            </div>
            {mode === 'login' && error.toLowerCase().includes('not register') && (
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                {lang === 'hi' ? 'रजिस्टर करें →' : 'Register Now →'}
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: OTP FLOW (Primary) */}
        {authMethod === 'otp' && (
          <div>
            {otpStep === 'phone' ? (
              /* Phone input form */
              <form onSubmit={handleSendOtp} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={lang === 'hi' ? 'उदा. कुलदीप सिंह' : 'e.g. Alex Smith'}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-blue-500 ${
                            isDark ? 'bg-[#13161D] border-[#2B313F] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {lang === 'hi' ? 'जीमेल / ईमेल *' : 'Email Address *'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={lang === 'hi' ? 'उदा. yourname@gmail.com' : 'e.g. yourname@gmail.com'}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-blue-500 ${
                            isDark ? 'bg-[#13161D] border-[#2B313F] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {lang === 'hi' ? 'मोबाइल नंबर (10-अंक) *' : 'Mobile Number (10 Digits) *'}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 text-xs font-semibold">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className={`w-full pl-16 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm tracking-wider font-mono focus:outline-none focus:border-blue-500 ${
                        isDark ? 'bg-[#13161D] border-[#2B313F] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'hi'
                      ? '* इस नंबर पर 6-अंकों का ओटीपी भेजा जाएगा।'
                      : '* A 6-digit OTP will be sent to this number.'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cleanP.length !== 10}
                  className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {mode === 'login'
                          ? (lang === 'hi' ? 'ओटीपी प्राप्त करें' : 'Get OTP & Sign In')
                          : (lang === 'hi' ? 'ओटीपी भेजें और रजिस्टर करें' : 'Send OTP & Register')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Explicit Switch Option for Mobile Users */}
                <div className="pt-2 text-center">
                  {mode === 'login' ? (
                    <div className="text-xs">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {lang === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setOtpStep('phone');
                          setError(null);
                        }}
                        className="font-bold text-blue-500 hover:underline cursor-pointer ml-1"
                      >
                        {lang === 'hi' ? 'यहाँ रजिस्टर करें (नया खाता) →' : 'Register Now (Create Account) →'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {lang === 'hi' ? 'पहले से खाता है?' : 'Already registered?'}{' '}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setOtpStep('phone');
                          setError(null);
                        }}
                        className="font-bold text-blue-500 hover:underline cursor-pointer ml-1"
                      >
                        {lang === 'hi' ? 'सीधे लॉगिन करें →' : 'Sign In Directly →'}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              /* OTP verification screen */
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {lang === 'hi' ? 'ओटीपी भेजा गया:' : 'OTP Sent To:'}{' '}
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>+91 {cleanP}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep('phone');
                      setError(null);
                    }}
                    className="text-blue-500 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'नंबर बदलें' : 'Change Number'}</span>
                  </button>
                </div>

                {/* Dev/Simulated Mode Banner */}
                {devOtp && (
                  <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>SMS Gateway Real OTP Generated</span>
                      </div>
                      <span className="font-mono font-bold text-sm bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                        {devOtp}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillDevOtp}
                      className="text-[11px] font-bold text-blue-500 hover:underline block pt-0.5 cursor-pointer"
                    >
                      👉 {lang === 'hi' ? `ओटीपी स्वतः भरें (${devOtp})` : `Auto-Fill OTP (${devOtp})`}
                    </button>
                  </div>
                )}

                {/* 6 Individual OTP Boxes */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 text-center ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {lang === 'hi' ? '6-अंकों का ओटीपी दर्ज करें' : 'Enter 6-Digit OTP'}
                  </label>
                  <div className="flex justify-center gap-1.5 sm:gap-2.5">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-9 sm:w-12 h-11 sm:h-13 text-center text-lg sm:text-xl font-bold font-mono rounded-xl border focus:outline-none focus:border-blue-500 transition-all ${
                          digit
                            ? 'border-blue-500 bg-blue-600/10 text-blue-400'
                            : isDark
                            ? 'bg-[#13161D] border-[#2B313F] text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Resend & Timer */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    {lang === 'hi' ? 'ओटीपी नहीं मिला?' : "Didn't receive OTP?"}
                  </span>
                  {countdown > 0 ? (
                    <span className="text-slate-400 font-mono">
                      {lang === 'hi' ? 'पुनः भेजें' : 'Resend'}: 00:{countdown < 10 ? `0${countdown}` : countdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      disabled={isSubmitting}
                      className="text-blue-500 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{lang === 'hi' ? 'पुनः ओटीपी भेजें' : 'Resend OTP'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || otpDigits.join('').length !== 6}
                  className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {mode === 'login'
                          ? (lang === 'hi' ? 'सत्यापित करें और लॉगिन करें' : 'Verify & Sign In')
                          : (lang === 'hi' ? 'सत्यापित करें और शुरू करें' : 'Verify & Get Started')}
                      </span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Toggle to Password Login */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#2B313F] text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('password');
                  setError(null);
                }}
                className={`text-xs hover:underline inline-flex items-center gap-1.5 cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>
                  {lang === 'hi'
                    ? 'पासवर्ड के माध्यम से लॉगिन करें'
                    : 'Sign in with Password instead'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PASSWORD LOGIN (Fallback Option) */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'hi' ? 'रजिस्टर्ड ईमेल / मोबाइल नंबर' : 'Registered Email or Mobile'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={lang === 'hi' ? 'yourname@gmail.com या 9876543210' : 'yourname@gmail.com or 9876543210'}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-[#13161D] border-[#2B313F] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'hi' ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={lang === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-[#13161D] border-[#2B313F] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{lang === 'hi' ? 'पासवर्ड से लॉगिन करें' : 'Sign In with Password'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Switch back to OTP */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#2B313F] text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('otp');
                  setOtpStep('phone');
                  setError(null);
                }}
                className={`text-xs hover:underline inline-flex items-center gap-1.5 cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-blue-500 font-medium">
                  {lang === 'hi' ? 'वापस मोबाइल OTP से लॉगिन करें' : 'Switch back to Mobile OTP'}
                </span>
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};
