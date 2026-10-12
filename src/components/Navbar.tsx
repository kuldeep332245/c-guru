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
  FlaskConical,
  Key,
  Smartphone,
  Check
} from 'lucide-react';
import { User as UserType } from '../types';
import { ALL_INDIAN_LANGUAGES, getNavLabels, getLanguageName } from '../utils/languages';
import { getSavedSmsApiKey, saveSmsApiKey, detectSmsProvider, sendOtpToMobile } from '../utils/smsService';

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
  const [showSmsKeyModal, setShowSmsKeyModal] = useState(false);
  const [modalSmsKey, setModalSmsKey] = useState(() => getSavedSmsApiKey());
  const [smsTestPhone, setSmsTestPhone] = useState('9876543210');
  const [isTestingSms, setIsTestingSms] = useState(false);
  const [smsFeedbackMsg, setSmsFeedbackMsg] = useState<string | null>(null);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(lang);
  const percent = Math.round((completedCount / totalTopics) * 100);
  const isAdmin = Boolean(user?.isAdmin || user?.role === 'admin');

  React.useEffect(() => {
    setSelectedLanguageCode(lang);
  }, [lang]);

  React.useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    const handleOpenSmsModal = () => {
      setModalSmsKey(getSavedSmsApiKey());
      setSmsFeedbackMsg(null);
      setShowSmsKeyModal(true);
    };

    window.addEventListener('open-navbar-sidebar', handleOpenSidebar);
    window.addEventListener('open-sms-key-modal', handleOpenSmsModal);

    return () => {
      window.removeEventListener('open-navbar-sidebar', handleOpenSidebar);
      window.removeEventListener('open-sms-key-modal', handleOpenSmsModal);
    };
  }, []);

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguageCode(code);
    setLang(code);
    try {
      localStorage.setItem('cguru_lang', code);
    } catch (e) {}
  };

  const handleSaveSmsKey = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveSmsApiKey(modalSmsKey);
    const detected = detectSmsProvider(modalSmsKey);
    setSmsFeedbackMsg(`API Key सुरक्षित हो गई! (Gateway: ${detected.toUpperCase()})`);
    setTimeout(() => {
      setSmsFeedbackMsg(null);
      setShowSmsKeyModal(false);
    }, 1500);
  };

  const handleSendTestSms = async () => {
    const cleanNumber = smsTestPhone.replace(/\D/g, '').slice(-10);
    if (cleanNumber.length !== 10) {
      setSmsFeedbackMsg('कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें!');
      return;
    }
    setIsTestingSms(true);
    setSmsFeedbackMsg(null);
    try {
      saveSmsApiKey(modalSmsKey);
      const res = await sendOtpToMobile(cleanNumber, '123456', modalSmsKey);
      setIsTestingSms(false);
      if (res.success) {
        setSmsFeedbackMsg(`SMS सफलतापूर्वक भेजा गया! (Provider: ${res.provider})`);
      } else {
        setSmsFeedbackMsg(`त्रुटि: ${res.error || 'SMS नहीं भेजा जा सका'}`);
      }
    } catch (err: any) {
      setIsTestingSms(false);
      setSmsFeedbackMsg(`त्रुटि: ${err.message || 'SMS भेजने में विफलता'}`);
    }
  };

  const navLabels = getNavLabels(lang);

  const primaryTabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: navLabels.home, icon: Home },
    { id: 'tutorials', label: navLabels.tutorials, icon: BookOpen },
    { id: 'topics', label: navLabels.topics, icon: BookMarked },
    { id: 'lab', label: navLabels.lab, icon: FlaskConical },
    { id: 'flowcharts', label: navLabels.flowcharts, icon: GitBranch },
    { id: 'compiler', label: navLabels.compiler, icon: Terminal },
    { id: 'dashboard', label: navLabels.dashboard, icon: LayoutDashboard }
  ];

  const allNavItems: {
    category: string;
    items: {
      id: TabType;
      label: string;
      desc: string;
      icon: React.FC<{ className?: string }>;
    }[];
  }[] = [
    {
      category: lang === 'hi' ? 'सीखें और पढ़ें (Learn)' : 'Core Learning',
      items: [
        {
          id: 'home',
          label: navLabels.home,
          desc: lang === 'hi' ? 'मुख्य पृष्ठ और अवलोकन' : 'Home overview & progress',
          icon: Home
        },
        {
          id: 'tutorials',
          label: navLabels.tutorials,
          desc: lang === 'hi' ? 'अध्यायवार व्याख्या और नोट्स' : 'Step-by-step master lessons',
          icon: BookOpen
        },
        {
          id: 'topics',
          label: navLabels.topics,
          desc: lang === 'hi' ? 'सम्पूर्ण पाठ्यक्रम (40+ अध्याय)' : 'All 40+ topic curriculum',
          icon: BookMarked
        },
        {
          id: 'syntax',
          label: navLabels.syntax,
          desc: lang === 'hi' ? 'त्वरित सिंटैक्स चीट-शीट' : 'C Syntax rules & reference cheat-sheet',
          icon: Code
        }
      ]
    },
    {
      category: lang === 'hi' ? 'प्रैक्टिस और कोडिंग (Practice)' : 'Coding & Practice',
      items: [
        {
          id: 'compiler',
          label: navLabels.compiler,
          desc: lang === 'hi' ? 'लाइव C कोड लिखें और रन करें' : 'Interactive online compiler playground',
          icon: Terminal
        },
        {
          id: 'lab',
          label: navLabels.lab,
          desc: lang === 'hi' ? 'प्रयोगशाला कोड और आउटपुट' : 'Real lab programs with line notes',
          icon: FlaskConical
        },
        {
          id: 'flowcharts',
          label: navLabels.flowcharts,
          desc: lang === 'hi' ? 'विजुअल लॉजिक फ्लोचार्ट' : 'Visual step-by-step algorithm flowcharts',
          icon: GitBranch
        },
        {
          id: 'bugs',
          label: navLabels.bugs,
          desc: lang === 'hi' ? 'एरर खोजें और हल करें' : 'Debug code snippets & fix errors',
          icon: Bug
        },
        {
          id: 'quiz',
          label: navLabels.quiz,
          desc: lang === 'hi' ? 'MCQ क्विज और परीक्षा' : 'Chapter-wise test MCQs & instant score',
          icon: HelpCircle
        }
      ]
    },
    {
      category: lang === 'hi' ? 'विद्यार्थी और डैशबोर्ड' : 'Student & Performance',
      items: [
        {
          id: 'dashboard',
          label: navLabels.dashboard,
          desc: lang === 'hi' ? 'प्रगति, टेस्ट स्कोर और सर्टिफिकेट' : 'Your learning stats & certificate',
          icon: LayoutDashboard
        }
      ]
    }
  ];

  const isIndian = selectedLanguageCode !== 'en';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#12141A]/95 border-[#232733] text-white'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isDark
                  ? 'hover:bg-[#1E222D] text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
              title={lang === 'hi' ? 'सभी फीचर्स खोलें' : 'All Features Menu'}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
            >
              <img
                src="/c-guru-logo.png"
                alt="C-Guru Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform border border-blue-500/20"
              />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    C-Guru
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Masterclass
                  </span>
                </div>
                <p className={`text-[10px] hidden xs:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'hi' ? 'C प्रोग्रामिंग सरल हिंदी में' : 'Complete C Programming'}
                </p>
              </div>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-[#1E222D]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="relative">
              <select
                value={selectedLanguageCode}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className={`appearance-none text-xs font-semibold pl-7 pr-6 py-1.5 rounded-xl border cursor-pointer transition-all ${
                  isDark
                    ? 'bg-[#181B24] border-[#2B313F] text-slate-200 hover:border-blue-500/50'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
                }`}
                title="Select Language / भाषा चुनें"
              >
                <optgroup label="⭐ Popular (प्रमुख भाषाएं)">
                  {ALL_INDIAN_LANGUAGES.filter((l) => l.popular).map((item) => (
                    <option
                      key={item.code}
                      value={item.code}
                      className={isDark ? 'bg-[#181B24] text-white' : 'bg-white text-slate-900'}
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
                      className={isDark ? 'bg-[#181B24] text-white' : 'bg-white text-slate-900'}
                    >
                      {item.native} ({item.name})
                    </option>
                  ))}
                </optgroup>
              </select>
              <Globe className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[9px] text-slate-400">
                ▼
              </div>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#181B24] border border-[#2B313F] text-slate-300 hover:text-white'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            {user ? (
              <button
                onClick={() => setShowProfileModal(true)}
                className={`flex items-center gap-2 pl-2 pr-2 sm:pr-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#181B24] border-[#2B313F] text-slate-200 hover:border-blue-500/50'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 shadow-xs'
                }`}
                title="Open Profile"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold hidden md:inline truncate max-w-[90px]">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 sm:px-4 py-1.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3-LINE DRAWER */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div
            className={`relative w-full max-w-xs sm:max-w-sm h-full flex flex-col shadow-2xl z-10 transition-all ${
              isDark ? 'bg-[#12141A] text-white border-r border-[#232733]' : 'bg-white text-slate-900 border-r border-slate-200'
            }`}
          >
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? 'border-[#232733]' : 'border-slate-200'
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
                className={`p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-[#252A36]' : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Content (pb-8 so button doesn't stick to bottom footer) */}
            <div className="flex-1 overflow-y-auto p-4 pb-8 space-y-5">
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
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
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

              <div className="pt-2 border-t border-slate-700/30 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {lang === 'hi' ? 'सेटिंग्स और विकल्प' : 'Settings & Preferences'}
                </span>

                <div className={`p-3 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#191D26] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <label className="block text-xs font-semibold text-slate-400">
                    🇮🇳 {lang === 'hi' ? 'अपनी भाषा चुनें (Language)' : 'Select Language'}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLanguageCode}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className={`w-full text-xs font-semibold pl-3 pr-8 py-2 rounded-lg border appearance-none cursor-pointer ${
                        isDark ? 'bg-[#14171E] border-[#2B313F] text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <optgroup label="⭐ Popular (प्रमुख भाषाएं)">
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

                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
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

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    if (user) {
                      setShowProfileModal(true);
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
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
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-[#252A36]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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
                    <p className="text-xs text-slate-400 truncate font-mono">
                      {user.email || user.phone || 'Student'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {lang === 'hi' ? 'सक्रिय विद्यार्थी' : 'Active Student'}
                      </span>
                      {isAdmin && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#14171E] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{lang === 'hi' ? 'कोर्स प्रगति' : 'Course Progress'}</span>
                    <span className="font-bold font-mono text-blue-400">{percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>{completedCount} {lang === 'hi' ? 'अध्याय पूर्ण' : 'topics completed'}</span>
                    <span>{totalTopics} {lang === 'hi' ? 'कुल अध्याय' : 'total topics'}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'पूर्ण डैशबोर्ड खोलें' : 'Open Full Dashboard'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      onLogout();
                    }}
                    className={`w-full py-2 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isDark
                        ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                        : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'खाते से लॉग आउट करें' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center mx-auto">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-base">
                    {lang === 'hi' ? 'आप अभी लॉगिन नहीं हैं' : 'You are not signed in'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === 'hi'
                      ? 'अपनी पढ़ाई की प्रगति और सर्टिफिकेट सेव करने के लिए लॉगिन करें।'
                      : 'Sign in to save your learning progress and certificate.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    onOpenAuth();
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md cursor-pointer"
                >
                  {lang === 'hi' ? 'लॉगिन / नया खाता बनाएं' : 'Sign In / Register'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
