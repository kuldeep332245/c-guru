import React from 'react';
import {
  BookOpen,
  Terminal,
  Bug,
  HelpCircle,
  LayoutDashboard,
  Moon,
  Sun,
  Globe,
  User,
  LogOut,
  CheckCircle2,
  GitBranch,
  Code,
  BookMarked
} from 'lucide-react';
import { User as UserType } from '../types';

export type TabType =
  | 'tutorials'
  | 'topics'
  | 'flowcharts'
  | 'programs'
  | 'syntax'
  | 'compiler'
  | 'bugs'
  | 'quiz'
  | 'dashboard';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  user: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenGitHubModal?: () => void;
  completedCount: number;
  totalTopics: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  isDark,
  setIsDark,
  user,
  onOpenAuth,
  onLogout,
  onOpenGitHubModal,
  completedCount,
  totalTopics
}) => {
  const percent = Math.round((completedCount / totalTopics) * 100);

  const navItems = [
    { id: 'tutorials' as TabType, labelEn: 'Tutorials', labelHi: 'ट्यूटोरियल्स', icon: BookOpen },
    { id: 'topics' as TabType, labelEn: 'All Topics', labelHi: 'सारे टॉपिक्स', icon: BookMarked },
    { id: 'flowcharts' as TabType, labelEn: 'Flowcharts', labelHi: 'फ्लोचार्ट', icon: GitBranch },
    { id: 'programs' as TabType, labelEn: 'Programs', labelHi: 'प्रोग्राम्स', icon: Code },
    { id: 'syntax' as TabType, labelEn: 'Syntax Guide', labelHi: 'सिंटैक्स', icon: BookMarked },
    { id: 'compiler' as TabType, labelEn: 'Compiler', labelHi: 'कंपाइलर', icon: Terminal },
    { id: 'bugs' as TabType, labelEn: 'Bug Hunt', labelHi: 'एरर सवाल', icon: Bug },
    { id: 'quiz' as TabType, labelEn: 'Quizzes', labelHi: 'क्विज़', icon: HelpCircle },
    { id: 'dashboard' as TabType, labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: LayoutDashboard }
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: isDark ? 'rgba(11, 15, 25, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        borderColor: isDark ? '#1E293B' : '#E2E8F0'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo with Electric Blue / Cyan Gradient */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setActiveTab('tutorials')}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white transition-transform hover:scale-105">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                C-Guru
              </span>
              <span className="hidden xl:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                PRO ACADEMY
              </span>
            </div>
            <p className="text-[11px] hidden sm:block text-slate-400">
              {lang === 'hi' ? '0 से File Handling तक संपूर्ण C कोर्स' : 'Zero to File Handling C Mastery'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const isCompiler = item.id === 'compiler';

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  active
                    ? isCompiler
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Progress, Language, Dark Mode, Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Progress Badge */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${
              isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-100'
            }`}
            title={`${completedCount} of ${totalTopics} topics completed`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400">
              {percent}%
            </span>
          </div>
          {/* Bilingual Toggle (Hinglish vs English) */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-105 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-blue-600 hover:bg-slate-50'
            }`}
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg border transition-all hover:scale-105 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border transition-all hover:opacity-90 ${
                  isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-xs font-medium max-w-[80px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {user.name.split(' ')[0]}
                </span>
              </button>
              <button
                onClick={onLogout}
                className={`p-1.5 rounded-lg border text-slate-400 hover:text-red-400 transition-colors ${
                  isDark ? 'border-slate-800 hover:bg-red-500/10' : 'border-slate-200 hover:bg-red-50'
                }`}
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:opacity-95 hover:scale-105"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div
        className={`lg:hidden flex items-center gap-1 overflow-x-auto py-2 px-3 border-t scrollbar-none ${
          isDark ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-white/95'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
