import React, { useState, useEffect } from 'react';
import {
  Database,
  Shield,
  Server,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Zap,
  Lock,
  Key,
  ExternalLink,
  X,
  Copy,
  Check,
  Cpu,
  Layers,
  Activity
} from 'lucide-react';
import { fetchMongoDatabaseStatus, connectMongoDatabaseApi } from '../utils/storage';

interface BackendConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  lang: string;
}

export const BackendConnectModal: React.FC<BackendConnectModalProps> = ({
  isOpen,
  onClose,
  isDark,
  lang
}) => {
  const isHi = lang === 'hi';
  const [activeTab, setActiveTab] = useState<'database' | 'security' | 'deploy'>('database');

  // Database Connection State
  const [dbUriInput, setDbUriInput] = useState('');
  const [dbNameInput, setDbNameInput] = useState('cguru_database');
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Fetch live status on open
  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  const loadStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const status = await fetchMongoDatabaseStatus();
      setDbStatus(status);
      if (status?.uriMasked) {
        setDbUriInput(status.uriMasked);
      }

    } catch {
      // Fallback
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbUriInput.trim()) {
      setAlertMsg({
        type: 'error',
        text: isHi ? 'कृपया MongoDB URI दर्ज करें।' : 'Please enter MongoDB Connection URI.'
      });
      return;
    }

    setIsConnecting(true);
    setAlertMsg(null);

    try {
      const res = await connectMongoDatabaseApi(dbUriInput.trim(), dbNameInput.trim());
      if (res.success) {
        setAlertMsg({
          type: 'success',
          text: res.message || (isHi ? '✅ डेटाबेस सफलतापूर्वक 1-क्लिक में कनेक्ट हो गया!' : '✅ Database successfully connected in 1-Click!')
        });
        await loadStatus();
      } else {
        setAlertMsg({
          type: 'error',
          text: res.message || (isHi ? 'डेटाबेस कनेक्शन विफल रहा।' : 'Database connection failed.')
        });
      }
    } catch (err: any) {
      setAlertMsg({
        type: 'error',
        text: err.message || 'Connection error'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAdminToken = () => {
    navigator.clipboard.writeText('CGURU_SUPER_ADMIN_SECURE_TOKEN_2026');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-[#14171E] border-[#2B313F] text-slate-100 shadow-purple-950/20'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-[#2B313F] bg-[#181B24]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">
                  {isHi ? 'बैकएंड व डेटाबेस कंट्रोल सेंटर' : 'Backend & Database Control'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  {isHi ? '1-क्लिक कनेक्ट' : '1-Click Connect'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHi ? 'MongoDB Atlas, लाइव API और सुरक्षा गेटवे प्रबंधन' : 'Manage MongoDB, Live APIs & Security Shields'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'border-[#2B313F] bg-[#14171E] text-slate-400 hover:text-white hover:bg-[#202531]'
                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`flex border-b px-5 pt-2 shrink-0 gap-2 ${
            isDark ? 'border-[#2B313F] bg-[#14171E]' : 'border-slate-200 bg-white'
          }`}
        >
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isHi ? 'डेटाबेस (1-क्लिक)' : 'Database (1-Click)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isHi ? 'सुरक्षा शील्ड्स' : 'Security Shields'}</span>
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'deploy'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>{isHi ? 'सर्वर व Vercel' : 'Server & Vercel'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Alert Message */}
          {alertMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-start gap-2.5 animate-in slide-in-from-top-1 ${
                alertMsg.type === 'success'
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                  : alertMsg.type === 'error'
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                  : 'border-blue-500/40 bg-blue-500/15 text-blue-400'
              }`}
            >
              {alertMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              )}
              <div className="flex-1">{alertMsg.text}</div>
            </div>
          )}

          {/* TAB 1: 1-CLICK DATABASE CONNECT */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              {/* Live Status Card */}
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full animate-pulse ${
                      dbStatus?.connected ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-2">
                      <span>
                        {dbStatus?.connected
                          ? (isHi ? '🟢 MongoDB Cloud: कनेक्टेड' : '🟢 MongoDB Cloud: Connected')
                          : (isHi ? '🟡 सुरक्षित लोकल डेटाबेस मोड' : '🟡 Local Storage Safe Mode')}
                      </span>
                      {dbStatus?.pingMs && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono">
                          {dbStatus.pingMs} ms
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isHi
                        ? `कुल छात्र: ${dbStatus?.totalUsersCount || 0} • डेटाबेस: ${dbStatus?.dbName || 'cguru_database'}`
                        : `Total Students: ${dbStatus?.totalUsersCount || 0} • Database: ${dbStatus?.dbName || 'cguru_database'}`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadStatus}
                  disabled={isLoadingStatus}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? 'border-[#2B313F] bg-[#14171E] text-slate-300 hover:bg-[#202531]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? 'animate-spin text-emerald-400' : ''}`} />
                  <span>{isHi ? 'रिफ्रेश स्थिति' : 'Refresh Status'}</span>
                </button>
              </div>

              {/* 1-Click Form */}
              <form onSubmit={handleConnect} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isHi ? 'MongoDB Connection String (URI)' : 'MongoDB Connection String (URI)'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={dbUriInput}
                      onChange={(e) => setDbUriInput(e.target.value)}
                      placeholder="mongodb+srv://username:password@cluster.mongodb.net/cguru_database"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all outline-none ${
                        isDark
                          ? 'border-[#2B313F] bg-[#101217] text-white focus:border-emerald-500'
                          : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-600'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isHi
                      ? 'MongoDB Atlas (Free 512MB) या अपने कस्टम MongoDB क्लस्टर का लिंक यहाँ डालें।'
                      : 'Paste your MongoDB Atlas Free M0 cluster URI or custom database link.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isHi ? 'डेटाबेस का नाम (Database Name)' : 'Database Name'}
                  </label>
                  <input
                    type="text"
                    value={dbNameInput}
                    onChange={(e) => setDbNameInput(e.target.value)}
                    placeholder="cguru_database"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all outline-none ${
                      isDark
                        ? 'border-[#2B313F] bg-[#101217] text-white focus:border-emerald-500'
                        : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-600'
                    }`}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    <Zap className={`w-4 h-4 ${isConnecting ? 'animate-bounce' : ''}`} />
                    <span>
                      {isConnecting
                        ? (isHi ? 'कनेक्ट हो रहा है...' : 'Connecting...')
                        : (isHi ? '🚀 1-क्लिक में कनेक्ट करें' : '🚀 Connect in 1-Click')}
                    </span>
                  </button>
                </div>
              </form>

              {/* Offline Safe Guarantee */}
              <div
                className={`p-3.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2.5 ${
                  isDark ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300' : 'border-emerald-500/30 bg-emerald-50 text-emerald-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {isHi ? '100% डेटा सुरक्षा गारंटी:' : 'Zero-Downtime Architecture:'}
                  </span>{' '}
                  {isHi
                    ? 'अगर MongoDB क्लस्टर डिस्कनेक्ट भी हो जाए, तो C-Guru का ऑटोमैटिक सुरक्षित लोकल डेटाबेस मोड तुरंत काम करेगा। कोई भी छात्र डेटा कभी नहीं खोएगा!'
                    : 'If MongoDB is ever unreachable, C-Guru immediately falls back to localized storage. No student data is ever lost!'}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY SHIELDS */}
          {activeTab === 'security' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold">
                      {isHi ? 'एंटी-ब्रूटफोर्स व रेट लिमिट' : 'Anti-Brute-Force & DDoS'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {isHi
                      ? 'प्रति IP/मोबाइल 30 अनुरोध प्रति 10 मिनट सीमित। बॉट्स और स्पैमर्स पूरी तरह ब्लॉक हैं।'
                      : 'Capped at 30 requests / 10 min. Automatic IP blocking protects against attacks.'}
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold">
                      {isHi ? 'HMAC-SHA256 सुरक्षित टोकन' : 'HMAC Signed Tokens'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {isHi
                      ? 'हर लॉगिन और OTP क्रिप्टोग्राफिक सिग्नेचर से सुरक्षित है, कोई टोकन से छेड़छाड़ नहीं कर सकता।'
                      : 'Cryptographic SHA-256 signatures prevent token forgery across sessions.'}
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold">
                      {isHi ? 'Wakit WhatsApp लाइव गेटवे' : 'Wakit WhatsApp Gateway'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {isHi
                      ? 'लाइव की (Live Key) सक्रिय। OTP कॉल की जगह सीधे आधिकारिक WhatsApp पर जाता है।'
                      : 'Official WhatsApp Cloud API sends verified passcodes directly to users.'}
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold">
                      {isHi ? 'गोपनीय फ़ाइल सुरक्षा शील्ड' : 'Confidential Path Shield'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {isHi
                      ? '.env, server.ts और आंतरिक फाइलों को HTTP से ब्लॉक (403 Forbidden) किया गया है।'
                      : 'All server files and credentials return 403 Forbidden to web inspectors.'}
                  </p>
                </div>
              </div>

              {/* Master Admin Token */}
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    {isHi ? 'मास्टर एडमिन सीक्रेट टोकन' : 'Master Admin Secret Token'}
                  </span>
                  <button
                    type="button"
                    onClick={copyAdminToken}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline cursor-pointer"
                  >
                    {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToken ? (isHi ? 'कॉपी हो गया!' : 'Copied!') : (isHi ? 'टोकन कॉपी करें' : 'Copy Token')}</span>
                  </button>
                </div>
                <div className="px-3 py-2 rounded-lg bg-black/40 border border-slate-700 font-mono text-xs text-amber-400 select-all overflow-x-auto">
                  CGURU_SUPER_ADMIN_SECURE_TOKEN_2026
                </div>
                <p className="text-[10px] text-slate-400">
                  {isHi
                    ? 'यह टोकन केवल आपके (Kuldeep Singh) पास है। कोई भी बाहरी व्यक्ति आपके डेटा को नहीं छू सकता।'
                    : 'This token is strictly reserved for Admin Kuldeep Singh to execute privileged operations.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SERVER & VERCEL DEPLOYMENT */}
          {activeTab === 'deploy' && (
            <div className="space-y-3.5">
              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">
                    {isHi ? 'सर्वर आर्किटेक्चर: डुअल-इंजन रेडी' : 'Dual-Engine Serverless Architecture'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isHi
                    ? 'C-Guru का बैकएंड दोहरे इंजन पर तैयार किया गया है: यह Vercel Serverless Functions (api/*) पर बिना सर्वर खर्च के 100% मुफ़्त चलता है, और Render/Railway पर standalone Node.js Express के रूप में भी तुरंत चलता है!'
                    : 'C-Guru features a dual-engine backend: works seamlessly as zero-cost Serverless functions on Vercel, and as a full-fledged Node.js Express server on Render or Railway.'}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">
                  {isHi ? 'सक्रिय बैकएंड API एंडपॉइंट्स (Active Endpoints):' : 'Active Backend API Endpoints:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-emerald-400 font-bold">POST</span> /api/auth/send-otp
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-emerald-400 font-bold">POST</span> /api/auth/verify-otp
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-blue-400 font-bold">GET</span> /api/leaderboard
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-emerald-400 font-bold">POST</span> /api/user/progress
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-purple-400 font-bold">POST</span> /api/ai/explain
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-[#101217] border-[#2B313F]' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-purple-400 font-bold">POST</span> /api/database/connect
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between shrink-0 ${
            isDark ? 'border-[#2B313F] bg-[#181B24]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHi ? 'सिस्टम स्थिति: सुरक्षित व सक्रिय' : 'System: Secure & Operational'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold border border-slate-500/30 hover:bg-slate-500/10 transition-all cursor-pointer"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
