import React from 'react';
import {
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  X,
  BookOpen,
  Terminal,
  Award
} from 'lucide-react';

interface UnlockOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  userName?: string;
  isDark: boolean;
}

export const UnlockOfferModal: React.FC<UnlockOfferModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  userName,
  isDark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl relative border my-auto transition-all ${
          isDark
            ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-cyan-500/30 text-white'
            : 'bg-gradient-to-b from-white via-blue-50/20 to-white border-blue-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
          title="Close notification"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Notification Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-cyan-400 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Course Unlock Offer • 90% OFF</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Unlock the Complete C Course?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Welcome {userName ? `${userName}! ` : '! '}
            Unlock the complete C Programming Academy for just <strong>₹200</strong> with unlimited access for <strong>12 full months (365 days)</strong>!
          </p>
        </div>

        {/* Highlight Perks Grid */}
        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-semibold text-slate-300">All 13 Comprehensive Topics</span>
          </div>
          <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-300">Online C Compiler & Labs</span>
          </div>
          <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-300">520 Questions Question Bank</span>
          </div>
          <div className={`p-3 rounded-2xl border flex items-center gap-2.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <Award className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-300">Verified Certificate</span>
          </div>
        </div>

        {/* Pricing Summary */}
        <div
          className={`mt-4 p-3.5 rounded-2xl border flex items-center justify-between ${
            isDark ? 'bg-blue-950/20 border-cyan-500/30' : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              12 Months All-Access Plan
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-400">₹200</span>
              <span className="text-xs text-slate-400 line-through">₹1,999</span>
              <span className="text-[11px] text-emerald-400 font-semibold">(पूरे 12 महीने की वैधता)</span>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            QR / Bank / UPI
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={onAccept}
            className="w-full py-3.5 rounded-2xl font-extrabold text-sm sm:text-base shadow-xl bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>कोर्स अनलॉक करें (QR Code • Bank Detail • UPI ID) →</span>
          </button>

          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Explore Free Chapter First
          </button>
        </div>
      </div>
    </div>
  );
};
