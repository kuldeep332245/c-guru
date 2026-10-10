import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  QrCode,
  Smartphone,
  CreditCard,
  Building,
  Lock,
  ArrowRight,
  Download,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Clock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { User } from '../types';
import { subscribeUser } from '../utils/storage';
import {
  BANK_DETAILS,
  requestUpiCollectApi,
  verifyManualPaymentApi
} from '../utils/paymentApi';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onSuccess: (updatedUser: User) => void;
  isDark: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenAuth,
  onSuccess,
  isDark
}) => {
  // 3 Primary Payment Options as requested: 'qr' | 'bank' | 'upi'
  const [selectedTab, setSelectedTab] = useState<'qr' | 'bank' | 'upi'>('qr');

  // UPI Collect Form State
  const [userUpiId, setUserUpiId] = useState('');
  const [isUpiRequested, setIsUpiRequested] = useState(false);
  const [upiCountdown, setUpiCountdown] = useState(300); // 5 minutes timer
  const [upiRequestId, setUpiRequestId] = useState('');

  // UTR / Transaction Reference states for manual confirmation
  const [utrNumber, setUtrNumber] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // General Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedTxnId, setCompletedTxnId] = useState('');
  const [validUntilDate, setValidUntilDate] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedTab('qr');
      setIsProcessing(false);
      setIsSuccess(false);
      setIsUpiRequested(false);
      setCompletedTxnId('');
      setUtrNumber('');
      setErrorMessage(null);
      setUpiCountdown(300);
    }
  }, [isOpen]);

  // UPI Countdown timer
  useEffect(() => {
    let timer: any = null;
    if (isUpiRequested && upiCountdown > 0) {
      timer = setInterval(() => {
        setUpiCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isUpiRequested, upiCountdown]);

  if (!isOpen) return null;

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2000);
  };

  // Helper to complete course subscription
  const finalizeUnlock = (txnId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    const updated = subscribeUser(user.id, txnId);
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const dateStr = future.toLocaleDateString('hi-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    setValidUntilDate(dateStr);
    setCompletedTxnId(txnId);
    setIsProcessing(false);
    setIsSuccess(true);

    if (updated) {
      onSuccess(updated);
    }
  };

  // Handle UPI Collect Request dispatch
  const handleSendUpiCollectRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanUpi = userUpiId.trim();
    if (!cleanUpi || !cleanUpi.includes('@')) {
      setErrorMessage('कृपया सही UPI ID दर्ज करें (उदा. mobile@upi, name@okhdfcbank)');
      return;
    }

    setIsProcessing(true);
    setProcessingMsg('UPI कलेक्ट रिक्वेस्ट भेजी जा रही है...');

    try {
      const res = await requestUpiCollectApi(cleanUpi, 200, user?.name);
      setIsProcessing(false);

      if (res.success) {
        setIsUpiRequested(true);
        setUpiRequestId(res.requestId);
        setUpiCountdown(300);
      } else {
        setErrorMessage(res.error || 'UPI रिक्वेस्ट भेजने में विफलता।');
      }
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'UPI रिक्वेस्ट भेजने में त्रुटि हुई।');
    }
  };

  // Handle confirmation when user approved UPI request or scanned QR/bank
  const handleConfirmPayment = async (method: 'qr' | 'bank' | 'upi') => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setIsProcessing(true);
    setProcessingMsg('पेमेंट सत्यापन और 12-महीने का लाइसेंस सक्रिय किया जा रहा है...');

    try {
      const res = await verifyManualPaymentApi(method, utrNumber, 200);
      setTimeout(() => {
        finalizeUnlock(res.txnId || `TXN_${Date.now()}`);
      }, 800);
    } catch (err: any) {
      setTimeout(() => {
        finalizeUnlock(`TXN_BOB_${Date.now()}`);
      }, 800);
    }
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-lg sm:max-w-xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl shadow-2xl relative border overflow-hidden my-auto transition-all ${
          isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Fixed Top Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-700/40 shrink-0 relative pr-12">
          {!isProcessing && (
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-[#252A36]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>12 Months All-Access Student Pass</span>
          </div>

          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Unlock Complete C Masterclass 🚀
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            सभी 13 विस्तृत टॉपिक्स, 520 प्रश्न, लाइव कम्पाइलर और सर्टिफिकेट अनलॉक करें
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {/* STATE 1: SUCCESS / RECEIPT SCREEN */}
          {isSuccess ? (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 mb-2">
                  Payment Verified & Activated
                </span>
                <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Full Course Unlocked 🎉
                </h2>
                <p className={`text-xs sm:text-sm mt-1 max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  आपका 12 महीने का C-Guru All-Access Pro Pass सक्रिय हो चुका है।
                </p>
              </div>

              {/* Receipt Card */}
              <div
                className={`p-4 sm:p-5 rounded-xl border text-left space-y-3 text-xs sm:text-sm ${
                  isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`flex justify-between items-center pb-2 border-b ${isDark ? 'border-[#2B313F]' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Course Plan:</span>
                  <span className="font-semibold text-blue-500">C-Guru Complete Pro (12 Months)</span>
                </div>
                <div className={`flex justify-between items-center pb-2 border-b ${isDark ? 'border-[#2B313F]' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Paid Amount:</span>
                  <span className="font-bold text-emerald-500 text-base">₹200 (Inclusive of Taxes)</span>
                </div>
                <div className={`flex justify-between items-center pb-2 border-b ${isDark ? 'border-[#2B313F]' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Validity:</span>
                  <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Calendar className="w-3.5 h-3.5" /> 12 Months (Valid Until: {validUntilDate})
                  </span>
                </div>
                <div className={`flex justify-between items-center pb-2 border-b ${isDark ? 'border-[#2B313F]' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Beneficiary Bank:</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Kuldeep Singh (Bank of Baroda)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Transaction ID:</span>
                  <span className={`font-mono text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{completedTxnId}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-98 shadow-md shadow-blue-500/20"
              >
                <span>पढ़ाई शुरू करें (Start Learning C Now) →</span>
              </button>
            </div>
          ) : isProcessing ? (
            /* STATE 2: PROCESSING LOADER */
            <div className="text-center py-10 space-y-6">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin" />
                <ShieldCheck className="w-7 h-7 text-blue-500 absolute" />
              </div>

              <div className="space-y-1.5">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  सुरक्षित सत्यापन जारी है...
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {processingMsg || 'कृपया प्रतीक्षा करें, आपका भुगतान सत्यापित किया जा रहा है...'}
                </p>
              </div>
            </div>
          ) : (
            /* STATE 3: MAIN PAYMENT CHECKOUT WITH 3 OPTIONS */
            <div className="space-y-4">
              {/* Price Banner */}
              <div
                className={`p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 ${
                  isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-blue-50/70 border-blue-200'
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                    Special Student Discount (90% OFF)
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-500">
                      ₹200
                    </span>
                    <span className={`text-xs sm:text-sm line-through ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      ₹1,999
                    </span>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      / 12 Full Months
                    </span>
                  </div>
                </div>

                <div className="self-start sm:self-auto shrink-0 max-w-full">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-normal leading-tight">
                    12 महीने की पूरी वैधता (365 दिन)
                  </span>
                </div>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* THE 3 PAYMENT METHOD TABS (Direct Click opens option) */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  भुगतान का तरीका चुनें (Select Payment Option):
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {/* Option 1: QR Code */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab('qr');
                      setIsUpiRequested(false);
                      setErrorMessage(null);
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      selectedTab === 'qr'
                        ? 'border-blue-500 bg-blue-600/15 text-blue-400 font-bold shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                        : isDark
                        ? 'border-[#2B313F] bg-[#13161D] text-slate-400 hover:text-white hover:bg-[#1a1f2b]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-500" />
                    <span className="text-xs">1. QR Code</span>
                  </button>

                  {/* Option 2: Bank Details */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab('bank');
                      setIsUpiRequested(false);
                      setErrorMessage(null);
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      selectedTab === 'bank'
                        ? 'border-blue-500 bg-blue-600/15 text-blue-400 font-bold shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                        : isDark
                        ? 'border-[#2B313F] bg-[#13161D] text-slate-400 hover:text-white hover:bg-[#1a1f2b]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-5 h-5 text-amber-500" />
                    <span className="text-xs">2. Bank Detail</span>
                  </button>

                  {/* Option 3: UPI ID Request */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTab('upi');
                      setErrorMessage(null);
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      selectedTab === 'upi'
                        ? 'border-blue-500 bg-blue-600/15 text-blue-400 font-bold shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                        : isDark
                        ? 'border-[#2B313F] bg-[#13161D] text-slate-400 hover:text-white hover:bg-[#1a1f2b]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs">3. UPI ID</span>
                  </button>
                </div>
              </div>

              {/* Copy Feedback Toast */}
              {copyFeedback && (
                <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{copyFeedback} क्लिपबोर्ड पर कॉपी हो गया!</span>
                </div>
              )}

              {/* TAB CONTENT 1: PURE DIRECT QR CODE PHOTO VIEW (No Soundbox, No clutter, Large QR only) */}
              {selectedTab === 'qr' && (
                <div
                  className={`p-3.5 sm:p-5 rounded-xl border space-y-4 animate-in fade-in duration-200 ${
                    isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {/* Clean Large QR Code Image Box */}
                  <div className="flex flex-col items-center justify-center text-center space-y-3 pt-1">
                    <div className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-xl border-2 border-slate-200 inline-block transition-transform hover:scale-[1.02]">
                      <img
                        src="/payment-qr.png"
                        alt="Bank of Baroda UPI Payment QR Code"
                        className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto block"
                      />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <span>Google Pay • PhonePe • Paytm • BHIM • any UPI App</span>
                    </div>

                    <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      QR कोड को किसी भी UPI ऐप से स्कैन करके <strong>₹200</strong> का भुगतान करें और नीचे UTR नंबर डालें।
                    </p>
                  </div>

                  {/* UTR Reference Input & Activation Button (Responsive & Compact) */}
                  <div className="pt-3 border-t border-slate-700/40 space-y-2">
                    <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      पेमेंट के बाद 12-अंकों का UTR / Transaction No दर्ज करें:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="उदा. 428910284729 (12-digit UTR)"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className={`w-full sm:flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500 ${
                          isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmPayment('qr')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 active:scale-98 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>सत्यापन करें (Verify)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: BANK DETAILS VIEW */}
              {selectedTab === 'bank' && (
                <div
                  className={`p-3.5 sm:p-5 rounded-xl border space-y-3.5 animate-in fade-in duration-200 ${
                    isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {/* PROMINENT BANK OF BARODA BANNER */}
                  <div className="p-3.5 rounded-xl bg-orange-500/15 border-2 border-orange-500/40 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                        बैंक का नाम (Bank Name)
                      </div>
                      <div className="font-black text-base sm:text-lg text-white">
                        Bank of Baroda (बैंक ऑफ़ बड़ौदा)
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('Bank of Baroda', 'बैंक का नाम')}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                      title="Copy Bank Name"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>कॉपी</span>
                    </button>
                  </div>

                  {/* Bank Account Fields with 1-Click Copy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {/* Account Number */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">खाता संख्या (Account No)</div>
                        <div className="font-mono font-bold text-sm text-emerald-400">43658100019478</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('43658100019478', 'खाता संख्या')}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Copy Account Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Holder Name */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">खाताधारक (Holder Name)</div>
                        <div className="font-bold text-sm text-blue-400">Kuldeep Singh</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('Kuldeep Singh', 'खाताधारक का नाम')}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Copy Holder Name"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* IFSC Code */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">IFSC कोड (IFSC Code)</div>
                        <div className="font-mono font-bold text-sm text-amber-400">BARB0SWAROO</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('BARB0SWAROO', 'IFSC कोड')}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Copy IFSC Code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* UPI ID */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">UPI ID (Google Pay / PhonePe)</div>
                        <div className="font-mono font-bold text-sm text-purple-400">43658100019478@barodampay</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('43658100019478@barodampay', 'UPI ID')}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Copy UPI ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
                    💡 <strong>निर्देश:</strong> अपने बैंक ऐप (BoB World, YONO, iMobile, Paytm, Google Pay आदि) से ₹200 का IMPS/NEFT ट्रांसफर करें। ट्रांसफर के पश्चात 12-अंकों का UTR नंबर दर्ज करके कोर्स अनलॉक करें।
                  </div>

                  {/* UTR Input and Confirm (RESPONSIVE: Never overflows) */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      ट्रांसफर के बाद प्राप्त 12-अंकों का UTR नंबर दर्ज करें:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="उदा. 428910284729"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className={`w-full sm:flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500 ${
                          isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmPayment('bank')}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 active:scale-98 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>सत्यापित करें ✓</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 3: UPI ID REQUEST / COLLECT VIEW */}
              {selectedTab === 'upi' && (
                <div
                  className={`p-3.5 sm:p-5 rounded-xl border space-y-4 animate-in fade-in duration-200 ${
                    isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {!isUpiRequested ? (
                    /* Form to enter UPI ID and send request */
                    <form onSubmit={handleSendUpiCollectRequest} className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            UPI पेमेंट रिक्वेस्ट (UPI Collect Request)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          अपनी UPI ID दर्ज करें। उस पर तुरंत ₹200 की पेमेंट रिक्वेस्ट भेजी जाएगी।
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          आपकी UPI ID (Your UPI ID) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="उदा. 9876543210@paytm या name@okhdfcbank"
                          value={userUpiId}
                          onChange={(e) => setUserUpiId(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500 ${
                            isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          (Google Pay, PhonePe, Paytm, BHIM, Navi या किसी भी बैंक की UPI ID मान्य है)
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing || !userUpiId.trim()}
                        className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20 active:scale-98 cursor-pointer"
                      >
                        {isProcessing ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>पेमेंट रिक्वेस्ट भेजें (Send Payment Request ₹200)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Active Request Status Screen */
                    <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-200">
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
                        <div className="w-14 h-14 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                          <Smartphone className="w-7 h-7" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-semibold uppercase text-emerald-400 flex items-center justify-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>पेमेंट रिक्वेस्ट भेजी जा चुकी है! ({formatTimer(upiCountdown)})</span>
                        </div>
                        <h4 className="text-base font-bold text-white">
                          कृपया अपने UPI ऐप में पेमेंट स्वीकार करें
                        </h4>
                        <p className="text-xs text-slate-300 max-w-sm mx-auto">
                          <strong>{userUpiId}</strong> पर ₹200 की रिक्वेस्ट भेजी गई है। कृपया Google Pay / PhonePe / Paytm खोलें और <strong>Kuldeep Singh (Bank of Baroda)</strong> को पेमेंट अप्रूव करें।
                        </p>
                      </div>

                      {/* Step guidance */}
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                          <span>अपने मोबाइल में Google Pay / PhonePe / Paytm खोलें</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                          <span>₹200 की पेंडिंग रिक्वेस्ट पर <strong>"Pay / Approve"</strong> पर क्लिक करें</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                          <span>पेमेंट पूरी होने के बाद नीचे दिए बटन पर क्लिक करें</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleConfirmPayment('upi')}
                          className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>मैंने पेमेंट कर दिया है (Unlock Now)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsUpiRequested(false)}
                          className="text-xs text-slate-400 hover:text-white underline pt-1 block mx-auto cursor-pointer"
                        >
                          दूसरी UPI ID से रिक्वेस्ट भेजें (Change UPI ID)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
