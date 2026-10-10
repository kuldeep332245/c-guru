import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
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
  BookMarked,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  FolderArchive,
  FlaskConical
} from 'lucide-react';
import { User as UserType } from '../types';
import { ALL_INDIAN_LANGUAGES, getNavLabels, getLanguageName } from '../utils/languages';

export type TabType =
  | 'home'
  | 'tutorials'
  | 'topics'
  | 'lab'
  | 'flowcharts'
  | 'programs'
  | 'syntax'
  | 'compiler'
  | 'bugs'
  | 'quiz'
  | 'dashboard'
  | 'admin';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: string;
  setLang: (lang: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  user: UserType | null;
  isSubscribed: boolean;
  onOpenAuth: () => void;
  onOpenPayment: () => void;
  onLogout: () => void;
  onOpenGitHubExport?: () => void;
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
  isSubscribed,
  onOpenAuth,
  onOpenPayment,
  onLogout,
  onOpenGitHubExport,
  completedCount,
  totalTopics
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(lang);
  const percent = Math.round((completedCount / totalTopics) * 100);
  const isAdmin = Boolean(user?.isAdmin || user?.role === 'admin');

  // Keep selectedLanguageCode in sync with lang
  React.useEffect(() => {
    setSelectedLanguageCode(lang);
  }, [lang]);

  const navLabels = getNavLabels(lang);
  const isIndian = lang !== 'en';

  // Top navigation items with Home as first item
  const topNavItems = [
    { id: 'home' as TabType, label: navLabels.home, icon: Home },
    { id: 'topics' as TabType, label: navLabels.topics, icon: BookMarked },
    { id: 'tutorials' as TabType, label: navLabels.tutorials, icon: BookOpen },
    { id: 'compiler' as TabType, label: navLabels.compiler, icon: Terminal },
    { id: 'quiz' as TabType, label: navLabels.quiz, icon: HelpCircle }
  ];

  // Full 3-Line Drawer navigation items (Fully translated for Hindi & English)
  const allNavItems = [
    {
      category: lang === 'hi' ? 'मुख्य हब (Main Hub)' : 'Main Hub',
      items: [
        {
          id: 'home' as TabType,
          label: lang === 'hi' ? 'होम (मुख्य पृष्ठ)' : 'Home',
          desc: lang === 'hi' ? 'डैशबोर्ड और व्यक्तिगत अध्ययन' : 'Personalized dashboard & start',
          icon: Home
        }
      ]
    },
    {
      category: lang === 'hi' ? 'मुख्य पाठ्यक्रम (Curriculum)' : 'Core Curriculum',
      items: [
        {
          id: 'topics' as TabType,
          label: lang === 'hi' ? 'सभी 20 टॉपिक्स' : 'All Topics',
          desc: lang === 'hi' ? 'पूरा पाठ्यक्रम और सीखने का रोडमैप' : 'Curriculum & roadmap',
          icon: BookMarked
        },
        {
          id: 'tutorials' as TabType,
          label: lang === 'hi' ? 'ट्यूटोरियल्स' : 'Tutorials',
          desc: lang === 'hi' ? 'अध्याय-दर-अध्याय गहन अध्ययन' : 'Chapter by chapter study',
          icon: BookOpen
        },
        {
          id: 'compiler' as TabType,
          label: lang === 'hi' ? 'ऑनलाइन C कम्पाइलर' : 'Online C Compiler',
          desc: lang === 'hi' ? 'ब्राउज़र में रन करें लाइव कोड व आउटपुट' : 'Code runner with real output',
          icon: Terminal
        },
        {
          id: 'quiz' as TabType,
          label: lang === 'hi' ? 'क्विज़ और टेस्ट' : 'Quizzes & Tests',
          desc: lang === 'hi' ? 'अध्यायवार 500+ MCQs और टेस्ट' : 'Topic-wise MCQs & tests',
          icon: HelpCircle
        }
      ]
    },
    {
      category: lang === 'hi' ? 'अभ्यास और प्रैक्टिकल' : 'Practice & Lab',
      items: [
        {
          id: 'lab' as TabType,
          label: lang === 'en' ? 'Lab Questions (Practicals)' : 'लैब प्रश्न (प्रैक्टिकल)',
          desc: lang === 'en' ? 'University lab questions & viva Q&A' : 'यूनिवर्सिटी लैब प्रोग्राम्स और वाइवा',
          icon: FlaskConical
        },
        {
          id: 'programs' as TabType,
          label: lang === 'hi' ? 'प्रोग्राम्स लैब' : 'Programs Lab',
          desc: lang === 'hi' ? '100+ तैयार C प्रोग्राम्स और हल' : '100+ ready C solutions',
          icon: Code
        },
        {
          id: 'syntax' as TabType,
          label: lang === 'hi' ? 'सिंटैक्स चीटशीट' : 'Syntax Cheatsheet',
          desc: lang === 'hi' ? 'मेमोरी और कीवर्ड संदर्भ गाइड' : 'Memory & keyword references',
          icon: BookMarked
        },
        {
          id: 'bugs' as TabType,
          label: lang === 'hi' ? 'बग हंटर' : 'Bug Hunter',
          desc: lang === 'hi' ? 'त्रुटियां ढूंढें और सुलझाएं' : 'Find & fix tricky bugs',
          icon: Bug
        }
      ]
    },
    ...(isAdmin
      ? [
          {
            category: lang === 'hi' ? 'सिस्टम एडमिन' : 'System Admin',
            items: [
              {
                id: 'admin' as TabType,
                label: lang === 'hi' ? 'एडमिन कंट्रोल सेंटर' : 'Admin Control Center',
                desc: lang === 'hi' ? 'विद्यार्थी और प्लेटफ़ॉर्म सेटिंग्स' : 'Student & platform controls',
                icon: ShieldCheck
              }
            ]
          }
        ]
      : [])
  ];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors"
        style={{
          backgroundColor: isDark ? 'rgba(20, 23, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: isDark ? '#2B313F' : '#E2E8F0'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: ONLY ONE 3-Line Hamburger Menu & Logo (Right one deleted as requested) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Single 3 Horizontal Lines (Hamburger Menu) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 flex items-center justify-center ${
                isDark
                  ? 'bg-[#1B1E27] border-[#2B313F] text-white hover:bg-[#232834]'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
              aria-label="Open Navigation Menu"
              title="Open Menu & Profile"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo & Name */}
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <img
                src="/c-guru-logo.png"
                alt="C-Guru Logo"
                className="w-9 h-9 rounded-xl object-cover shadow-sm border border-blue-500/30 transition-transform hover:scale-105"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-extrabold text-base sm:text-lg tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    C-Guru
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-500">
                    ACADEMY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Desktop Tabs (Home, All Topics, Tutorials, Compiler, Quizzes) */}
          <nav className="hidden md:flex items-center gap-1.5 py-1">
            {topNavItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-[#1E222C]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: CLEAN & MINIMAL */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Language Dropdown on Header */}
            <div className="relative hidden md:flex items-center">
              <Globe className="w-3.5 h-3.5 text-blue-400 absolute left-2 pointer-events-none" />
              <select
                value={selectedLanguageCode}
                onChange={(e) => {
                  const newL = e.target.value;
                  setSelectedLanguageCode(newL);
                  setLang(newL);
                }}
                className={`pl-6.5 pr-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer appearance-none ${
                  isDark
                    ? 'bg-[#191D26] border-[#2B313F] text-slate-200 hover:border-blue-500/50'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-400'
                }`}
                title="Select Language"
              >
                <optgroup label="🔥 Most Popular (मुख्य भाषाएं)">
                  {ALL_INDIAN_LANGUAGES.filter((l) => l.popular).map((item) => (
                    <option
                      key={item.code}
                      value={item.code}
                      className={isDark ? 'bg-[#14171E] text-white' : 'bg-white text-slate-900'}
                    >
                      {item.code === 'en' ? 'English' : `${item.native} (${item.name})`}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🇮🇳 Other Languages (अन्य भाषाएं)">
                  {ALL_INDIAN_LANGUAGES.filter((l) => !l.popular).map((item) => (
                    <option
                      key={item.code}
                      value={item.code}
                      className={isDark ? 'bg-[#14171E] text-white' : 'bg-white text-slate-900'}
                    >
                      {item.native} ({item.name})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 100% Free All Access Badge (No lock, free for everyone) */}
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xs"
              title="100% Free Complete C Course"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? '100% मुफ़्त कोर्स' : '100% Free Course'}</span>
            </span>

            {!user && (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {navLabels.signIn}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3-LINE HAMBURGER SIDEBAR DRAWER (Contains Profile, Logout, Language, Theme, and Navigation) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`relative w-84 max-w-[88vw] h-full shadow-2xl z-10 flex flex-col justify-between border-r animate-in slide-in-from-left duration-200 ${
              isDark ? 'bg-[#14171E] border-[#2B313F] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Drawer Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-[#2B313F] bg-[#191D26]' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <img
                  src="/c-guru-logo.png"
                  alt="C-Guru Logo"
                  className="w-10 h-10 rounded-xl object-cover shadow-sm border border-blue-500/30"
                />
                <div>
                  <h3 className={`font-bold text-base tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    C-Guru Academy
                  </h3>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'hi' ? 'सम्पूर्ण C प्रोग्रामिंग मास्टरक्लास' : 'Complete C Programming'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 rounded-xl text-slate-400 hover:text-white transition-colors ${
                  isDark ? 'hover:bg-[#252A36]' : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* 1. ALL APPLICATION FEATURES */}
              {allNavItems.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    {group.category}
                  </span>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                            active
                              ? 'bg-blue-600 text-white font-semibold shadow-sm'
                              : isDark
                              ? 'text-slate-200 hover:text-white hover:bg-[#1E222C]'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`p-1.5 rounded-lg shrink-0 ${
                              active
                                ? 'bg-white/20 text-white'
                                : isDark ? 'bg-[#1E222C] text-blue-400' : 'bg-slate-200 text-blue-600'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate">
                                {item.label}
                              </div>
                              <div className={`text-[10px] truncate ${
                                active ? 'text-white/80' : 'text-slate-400'
                              }`}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* DIVIDER BETWEEN FEATURES AND SETTINGS */}
              <div className="pt-2 border-t border-[#2B313F] space-y-3">
                {/* 2. DEDICATED LANGUAGE SELECTOR */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {isIndian ? 'वेबसाइट की भाषा (Language)' : 'Website Language'}
                    </span>
                    <span className="text-[10px] text-blue-400 font-semibold truncate max-w-[130px]">
                      {selectedLanguageCode === 'en' ? 'English (Global)' : getLanguageName(selectedLanguageCode)}
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    isDark ? 'bg-[#191D26] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                    <select
                      value={selectedLanguageCode}
                      onChange={(e) => {
                        const newL = e.target.value;
                        setSelectedLanguageCode(newL);
                        setLang(newL);
                      }}
                      className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-semibold appearance-none transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-[#14171E] border-[#2B313F] text-white focus:border-blue-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      }`}
                    >
                      <optgroup label="🔥 Most Popular (मुख्य भाषाएं)">
                        {ALL_INDIAN_LANGUAGES.filter((l) => l.popular).map((item) => (
                          <option
                            key={item.code}
                            value={item.code}
                            className={isDark ? 'bg-[#14171E] text-white' : 'bg-white text-slate-900'}
                          >
                            {item.code === 'en' ? 'English' : `${item.native} (${item.name})`}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🇮🇳 Other Languages (अन्य भाषाएं)">
                        {ALL_INDIAN_LANGUAGES.filter((l) => !l.popular).map((item) => (
                          <option
                            key={item.code}
                            value={item.code}
                            className={isDark ? 'bg-[#14171E] text-white' : 'bg-white text-slate-900'}
                          >
                            {item.native} ({item.name})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* 3. GITHUB CODE EXPORT / REPLACE BUTTON */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    if (onOpenGitHubExport) onOpenGitHubExport();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    isDark
                      ? 'bg-[#191D26] border-[#2B313F] text-slate-200 hover:bg-[#222733]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderArchive className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isIndian ? 'GitHub पर कोड रिप्लेस / अपडेट करें' : 'Update Code on GitHub'}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/10">
                    {isIndian ? 'मोबाइल से' : 'Mobile'}
                  </span>
                </button>

                {/* 4. THEME OPTION */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    isDark
                      ? 'bg-[#191D26] border-[#2B313F] text-slate-200 hover:bg-[#222733]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isDark ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                    <span>
                      {lang === 'hi'
                        ? (isDark ? 'थीम: डार्क मोड (रात्रि)' : 'थीम: लाइट मोड (दिन)')
                        : (isDark ? 'Theme: Dark Mode' : 'Theme: Light Mode')}
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-400 font-semibold px-2 py-0.5 rounded-md border border-blue-500/20 bg-blue-500/10">
                    {lang === 'hi' ? 'बदलें' : 'Switch'}
                  </span>
                </button>

                {/* 4. PROFILE BUTTON AT THE VERY BOTTOM */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    if (user) {
                      setShowProfileModal(true);
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all border ${
                    isDark
                      ? 'bg-[#191D26] border-[#2B313F] text-white hover:bg-[#222733] hover:border-blue-500/50 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold truncate">
                      {lang === 'hi' ? 'प्रोफ़ाइल (Profile)' : 'Profile'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {user ? (
                      <span className="text-[11px] text-slate-300 truncate max-w-[110px]">{user.name}</span>
                    ) : (
                      <span className="text-[11px] text-blue-400 font-bold">
                        {lang === 'hi' ? 'लॉगिन करें' : 'Sign In'}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className={`p-3.5 border-t text-center text-[11px] text-slate-400 ${
              isDark ? 'border-[#2B313F] bg-[#191D26]' : 'border-slate-200 bg-slate-50'
            }`}>
              <span>
                {isIndian
                  ? `C-Guru अकैडमी • ${getLanguageName(selectedLanguageCode)}`
                  : 'C-Guru Academy • English Edition'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED PROFILE MODAL (Opens when clicking 'Profile' at the bottom of 3-line menu) */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowProfileModal(false)}
          />

          <div
            className={`relative w-full max-w-md rounded-2xl p-6 sm:p-7 border shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200 ${
              isDark ? 'bg-[#181B24] border-[#2B313F] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${
              isDark ? 'border-[#2B313F]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {lang === 'hi' ? 'विद्यार्थी प्रोफ़ाइल' : 'Student Profile'}
                  </h3>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lang === 'hi' ? 'खाता विवरण और अध्ययन प्रगति' : 'Account details & progress'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-[#252A36]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info Card */}
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-lg font-bold truncate ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{user.name}</h4>
                    <p className={`text-xs truncate font-mono ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>{user.email || user.phone}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {user.role === 'admin' ? (lang === 'hi' ? 'एडमिन' : 'Admin') : (lang === 'hi' ? 'विद्यार्थी' : 'Student')}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {lang === 'hi' ? '100% मुफ़्त सम्पूर्ण एक्सेस' : '100% Free Full Access'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                  isDark ? 'bg-[#13161D] border-[#2B313F] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {lang === 'hi' ? 'नामांकित कोर्स:' : 'Course Enrolled:'}
                    </span>
                    <span className="font-semibold text-blue-600 truncate max-w-[200px]">{user.course || 'Complete C Masterclass'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {lang === 'hi' ? 'पूर्ण किए गए अध्याय:' : 'Modules Completed:'}
                    </span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{completedCount} / {totalTopics} ({percent}%)</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#2B313F] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.max(5, percent)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'पूरा डैशबोर्ड और प्रमाणपत्र देखें' : 'View Full Dashboard & Certificate'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      onLogout();
                    }}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'अकाउंट से लॉगआउट करें' : 'Logout from Account'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-slate-400">
                  {lang === 'hi' ? 'आप अभी अतिथि के रूप में देख रहे हैं।' : 'You are currently browsing as a guest.'}
                </p>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'लॉगिन / नया खाता बनाएं' : 'Sign In / Register'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* MOBILE BOTTOM NAVIGATION BAR (Sleek modern bottom tab bar for smartphone view) */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#14171E]/95 border-[#2B313F] text-slate-300'
            : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5 h-14 items-center">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors ${
                  active
                    ? 'text-blue-600 font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className={`p-1 rounded-lg transition-transform ${active ? 'scale-110 bg-blue-500/10' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[58px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
