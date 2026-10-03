import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { registerUser, loginUser } from '../utils/storage';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  isDark: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, isDark }) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('0 se lekar File Handling tak C seekhna');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Kripya valid Gmail ya Email address dalein.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password kam se kam 4 characters ka hona chahiye.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Kripya apna naam zaroor dalein.');
        return;
      }
      const user = registerUser(name.trim(), email.trim(), goal);
      onSuccess(user);
      onClose();
    } else {
      const user = loginUser(email.trim());
      if (user) {
        onSuccess(user);
        onClose();
      } else {
        // Automatically suggest registering if account not found
        setError('Ye account mila nahi. Kripya pehle "Register" karein.');
      }
    }
  };

  const handleQuickDemoLogin = () => {
    const user = registerUser('Kuldeep Singh', 'kuldeep0203singh@gmail.com', 'Mastering C for software jobs');
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border transition-all ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl shadow-md mb-3 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white">
            C
          </div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {mode === 'register' ? 'C-Guru पर Register करें' : 'C-Guru में Login करें'}
          </h2>
          <p className="text-xs sm:text-sm mt-1 text-slate-400">
            {mode === 'register'
              ? 'अपना Gmail और password डालें ताकि प्रोग्रेस सुरक्षित रहे'
              : 'पहले से रजिस्टर हैं? सीधे लॉगिन करें'}
          </p>
        </div>

        {/* Tab switch */}
        <div
          className={`flex rounded-2xl p-1 mb-6 border ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            नया यूजर (Register)
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            पुराना यूजर (Login)
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs font-medium border bg-rose-500/10 border-rose-500/30 text-rose-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">
                आपका पूरा नाम (Full Name)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Kuldeep Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">
              Gmail / Email ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                placeholder="kuldeep0203singh@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{mode === 'register' ? 'Register करें & Start करें' : 'Direct Login करें'}</span>
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className={`w-full py-2.5 px-3 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>1-Click Demo Login (Kuldeep Singh)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
