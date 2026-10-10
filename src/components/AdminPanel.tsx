import React, { useState } from 'react';
import {
  Crown,
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  Search,
  Sparkles,
  Key,
  Smartphone,
  Mail,
  Calendar,
  IndianRupee,
  RefreshCw,
  Trash2,
  UserCheck,
  Send,
  Terminal
} from 'lucide-react';
import { User } from '../types';
import {
  getAllUsers,
  toggleUserSubscription,
  deleteUser,
  saveAllUsers,
  setActiveUser
} from '../utils/storage';
import { getSavedSmsApiKey, saveSmsApiKey, sendOtpToMobile } from '../utils/smsService';

interface AdminPanelProps {
  currentUser: User;
  isDark: boolean;
  lang: 'hi' | 'en';
  onSwitchUser?: (user: User) => void;
  onGoToTab: (tab: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  isDark,
  lang,
  onSwitchUser,
  onGoToTab
}) => {
  const [users, setUsers] = useState<User[]>(() => getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'subscribed' | 'free'>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // SMS Test Modal
  const [smsTestPhone, setSmsTestPhone] = useState('9876543210');
  const [smsApiKey, setSmsApiKey] = useState(() => getSavedSmsApiKey());
  const [isSendingSms, setIsSendingSms] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRefresh = () => {
    setUsers(getAllUsers());
    showToast('Student list refreshed!');
  };

  const handleToggleSub = (userId: string, currentStatus: boolean) => {
    const updated = toggleUserSubscription(userId, !currentStatus);
    if (updated) {
      setUsers(getAllUsers());
      showToast(
        !currentStatus
          ? `🎉 Granted 12-Month Pro Pass to ${updated.name}!`
          : `Revoked Pro Pass for ${updated.name}`
      );
    }
  };

  const handleDeleteUser = (userId: string, name: string) => {
    if (userId === currentUser.id) {
      showToast('Cannot delete the primary Admin account.');
      return;
    }
    const ok = window.confirm(`Are you sure you want to remove ${name} from database?`);
    if (ok) {
      deleteUser(userId);
      setUsers(getAllUsers());
      showToast(`User ${name} removed.`);
    }
  };

  const handleGrantAll = () => {
    const all = getAllUsers();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const updated = all.map((u) => ({
      ...u,
      isSubscribed: true,
      subscribedAt: now.toISOString(),
      subscriptionExpiresAt: expiresAt.toISOString(),
      subscriptionPlan: '12 Months All-Access (Admin Master Grant)'
    }));
    saveAllUsers(updated);
    setUsers(updated);
    showToast('✨ All students have been granted 12-Month Pro access!');
  };

  const handleImpersonate = (u: User) => {
    setActiveUser(u);
    if (onSwitchUser) onSwitchUser(u);
    showToast(`Switched active session to: ${u.name}`);
  };

  const handleTestSms = async () => {
    if (!smsTestPhone || smsTestPhone.length !== 10) {
      showToast('Please enter a valid 10-digit number for SMS testing.');
      return;
    }
    setIsSendingSms(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    try {
      const res = await sendOtpToMobile(smsTestPhone, code, smsApiKey);
      if (res.isRealSms) {
        showToast(`🟢 Real Telecom SMS sent to +91 ${smsTestPhone}! (OTP: ${code})`);
      } else {
        showToast(`Simulated SMS Alert triggered for +91 ${smsTestPhone}! (OTP: ${code})`);
      }
    } catch {
      showToast('Error sending test SMS.');
    } finally {
      setIsSendingSms(false);
    }
  };

  // Stats calculation
  const totalStudents = users.length;
  const subscribedStudents = users.filter((u) => u.isSubscribed).length;
  const totalRevenue = subscribedStudents * 200;

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === 'subscribed') return u.isSubscribed;
    if (filter === 'free') return !u.isSubscribed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 py-3 px-5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-2xl flex items-center gap-2 border border-blue-400 animate-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-900/50 text-white'
            : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border-blue-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Admin Control Center
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs sm:text-sm mt-1 text-slate-400">
                Welcome, <strong>{currentUser.name}</strong> ({currentUser.email || 'kuldeep0203singh@gmail.com'}) — Complete access to students, courses & platform tools.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onGoToTab('tutorials')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>Go to Course (All 20 Unlocked)</span>
            </button>
            <button
              onClick={handleRefresh}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
              }`}
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Enrolled Students
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold mt-3">{totalStudents}</div>
          <p className="text-xs text-slate-400 mt-1">Registered via Mobile Phone / OTP</p>
        </div>

        {/* Card 2 */}
        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Active Pro Passes
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold mt-3 text-cyan-400">{subscribedStudents}</div>
          <p className="text-xs text-slate-400 mt-1">Full 20 chapters & compiler unlocked</p>
        </div>

        {/* Card 3 */}
        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Course Revenue (₹200 Plan)
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold mt-3 text-emerald-400">₹{totalRevenue}</div>
          <p className="text-xs text-slate-400 mt-1">Direct student subscriptions</p>
        </div>

        {/* Card 4 */}
        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Course Curriculum
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold mt-3 text-cyan-400">20 Topics</div>
          <p className="text-xs text-slate-400 mt-1">Theory, Programs, Tests & Quizzes</p>
        </div>
      </div>

      {/* Admin Actions Bar */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <div>
            <h4 className="font-bold text-sm">Quick Operations</h4>
            <p className="text-xs text-slate-400">
              Bulk grant access to all students or test real telecom SMS delivery
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleGrantAll}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Bulk Unlock Pro for Everyone</span>
          </button>

          <button
            onClick={() => onGoToTab('compiler')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all hover:scale-105 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Open C Compiler</span>
          </button>
        </div>
      </div>

      {/* SMS Gateway & Master OTP Testing Card */}
      <div
        className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm sm:text-base">
              Telecom Real SMS Gateway & Master OTP Config
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
            Master OTP: 9999 (Anytime Instant Bypass)
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Enter any 10-digit mobile number to send a live test verification OTP code. You can also configure your Fast2SMS API key below for genuine SMS delivery in India:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">Fast2SMS Telecom API Key</label>
            <input
              type="text"
              placeholder="Paste Fast2SMS API Key here (Optional)"
              value={smsApiKey}
              onChange={(e) => {
                setSmsApiKey(e.target.value);
                saveSmsApiKey(e.target.value);
              }}
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">Test Mobile Number (+91)</label>
            <div className="flex gap-2">
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit phone"
                value={smsTestPhone}
                onChange={(e) => setSmsTestPhone(e.target.value.replace(/\D/g, ''))}
                className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <button
                type="button"
                disabled={isSendingSms}
                onClick={handleTestSms}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shrink-0 flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingSms ? 'Sending...' : 'Send Test SMS'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div
        className={`rounded-2xl border shadow-sm overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-inherit flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">Registered Students Directory</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 font-bold">
              {filteredUsers.length} students
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Filter */}
            <div className="flex rounded-xl p-0.5 border border-inherit text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('subscribed')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filter === 'subscribed'
                    ? 'bg-cyan-600 text-white'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Pro Subscribed
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filter === 'free'
                    ? 'bg-slate-700 text-white'
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className={`border-b border-inherit font-bold uppercase tracking-wider text-[11px] ${
              isDark ? 'bg-slate-950/60 text-slate-400' : 'bg-slate-50 text-slate-500'
            }`}>
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4">Course Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = u.id === currentUser.id;
                  const isUserAdmin = u.isAdmin || u.role === 'admin';

                  return (
                    <tr
                      key={u.id}
                      className={`transition-colors ${
                        isCurrent
                          ? isDark ? 'bg-indigo-950/20' : 'bg-blue-50/50'
                          : isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isUserAdmin && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                  ADMIN
                                </span>
                              )}
                              {isCurrent && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                              {u.goal || 'C Programming Student'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="space-y-0.5 text-xs">
                          <div className="flex items-center gap-1 font-mono font-semibold">
                            <Smartphone className="w-3 h-3 text-slate-400" />
                            <span>+91 {u.phone}</span>
                          </div>
                          {u.email && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[180px]">
                              <Mail className="w-3 h-3" />
                              <span>{u.email}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{u.createdAt}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {u.isSubscribed ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Pro Active</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                            <span>Free Trial (1 Chapter)</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Toggle 12M Pro Access */}
                          <button
                            onClick={() => handleToggleSub(u.id, Boolean(u.isSubscribed))}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              u.isSubscribed
                                ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                            }`}
                            title={u.isSubscribed ? 'Revoke Pro Access' : 'Grant 12M Pro Access'}
                          >
                            {u.isSubscribed ? 'Revoke Pass' : 'Grant 12M Pass'}
                          </button>

                          {/* Login as User */}
                          {!isCurrent && (
                            <button
                              onClick={() => handleImpersonate(u)}
                              className={`p-1.5 rounded-lg border text-xs hover:text-blue-400 transition-colors ${
                                isDark ? 'border-slate-800 hover:bg-blue-500/10' : 'border-slate-200 hover:bg-blue-50'
                              }`}
                              title="Login as this student (Preview mode)"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete Student */}
                          {!isCurrent && !isUserAdmin && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className={`p-1.5 rounded-lg border text-xs text-slate-400 hover:text-rose-400 transition-colors ${
                                isDark ? 'border-slate-800 hover:bg-rose-500/10' : 'border-slate-200 hover:bg-rose-50'
                              }`}
                              title="Delete Student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
