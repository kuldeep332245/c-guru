import React from 'react';
import {
  BookOpen,
  Terminal,
  Bug,
  GitBranch,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Code,
  Sparkles,
  Zap,
  Users,
  Compass,
  Laptop,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { C_TOPICS } from '../data/cTopics';
import { ALL_INDIAN_LANGUAGES, getLanguageName } from '../utils/languages';

interface WelcomePageProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  isDark: boolean;
  lang?: string;
  setLang?: (lang: string) => void;
  setIsDark?: (dark: boolean) => void;
  onOpenGitHubExport?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onOpenAuth,
  isDark,
  lang = 'hi',
  setLang,
  setIsDark,
  onOpenGitHubExport
}) => {
  const highlights = [
    {
      icon: BookOpen,
      title: lang === 'hi' ? '20 सम्पूर्ण अध्याय' : '20 Step-by-Step Chapters',
      desc: lang === 'hi'
        ? '"Hello World" से लेकर पॉइंटर्स, डायनामिक मेमोरी और फ़ाइल हैंडलिंग तक पूरा पाठ्यक्रम।'
        : 'From "Hello World" basics to complex pointers, dynamic memory allocation, and persistent file handling.'
    },
    {
      icon: Terminal,
      title: lang === 'hi' ? 'इन-ब्राउज़र ऑनलाइन C कम्पाइलर' : 'In-Browser Online C Compiler',
      desc: lang === 'hi'
        ? 'कोई सॉफ़्टवेयर इंस्टॉल करने की ज़रूरत नहीं। सीधे ब्राउज़र में कोड लिखें और आउटपुट देखें।'
        : 'Zero software setup needed. Write, compile, run, and experiment with C programs directly in your browser.'
    },
    {
      icon: GitBranch,
      title: lang === 'hi' ? 'इंटरैक्टिव लॉजिक फ्लोचार्ट्स' : 'Interactive Logic Flowcharts',
      desc: lang === 'hi'
        ? 'if-else, लूप्स, ऐरे और फ़ंक्शन्स के लिए एनिमेटेड फ्लोचार्ट्स से कोडिंग लॉजिक पक्का करें।'
        : 'Visual animated diagrams for if-else branching, loops, arrays, and functions to build solid coding logic.'
    },
    {
      icon: Code,
      title: lang === 'hi' ? '100+ तैयार C प्रोग्राम्स' : '100+ Ready-to-Run Programs',
      desc: lang === 'hi'
        ? 'परीक्षा और इंटरव्यू के लिए फ़िबोनैचि, मैट्रिक्स, लिंक्ड लिस्ट और फ़ाइल ऑपरेशन्स के हल।'
        : 'Classic interview and academic problems (Fibonacci, Matrix operations, Linked Lists, File streams).'
    },
    {
      icon: Bug,
      title: lang === 'hi' ? 'बग हंटर डिबगिंग लैब' : 'Bug Hunter Debugging Lab',
      desc: lang === 'hi'
        ? 'सिंटैक्स, सेगमेंटेशन फ़ॉल्ट और पॉइंटर एरर्स को पहचानें और कोड सही करना सीखें।'
        : 'Diagnose and fix real syntax, pointer, and segmentation errors to become a confident problem solver.'
    },
    {
      icon: Award,
      title: lang === 'hi' ? 'वेरिफाइड पूर्णता प्रमाणपत्र' : 'Verified Certificate of Completion',
      desc: lang === 'hi'
        ? 'कोर्स पूरा करने पर यूनिक स्टूडेंट आईडी और क्यूआर कोड सहित डिजिटल सर्टिफ़िकेट प्राप्त करें।'
        : 'Earn an authentic completion certificate with verifiable student ID upon finishing the course.'
    }
  ];

  const curriculumHighlights = [
    {
      module: lang === 'hi' ? 'मॉड्यूल 1' : 'Module 1',
      title: lang === 'hi' ? 'C बेसिक्स और सिंटैक्स' : 'C Fundamentals & Syntax',
      chapters: lang === 'hi' ? 'टोकन्स, डेटा प्रकार, ऑपरेटर्स और स्ट्रक्चर' : 'Tokens, Data Types, Operators'
    },
    {
      module: lang === 'hi' ? 'मॉड्यूल 2' : 'Module 2',
      title: lang === 'hi' ? 'निर्णय व लूप्स (Decision & Loops)' : 'Decision Making & Iteration',
      chapters: lang === 'hi' ? 'If-Else, Switch, While, For लूप्स' : 'If-Else, Switch, While, For Loops'
    },
    {
      module: lang === 'hi' ? 'मॉड्यूल 3' : 'Module 3',
      title: lang === 'hi' ? 'ऐरे व स्ट्रिंग्स (Arrays & Strings)' : 'Arrays & String Operations',
      chapters: lang === 'hi' ? '1D/2D ऐरे, स्ट्रिंग लाइब्रेरी व मैनिपुलेशन' : '1D/2D Arrays, String Library'
    },
    {
      module: lang === 'hi' ? 'मॉड्यूल 4' : 'Module 4',
      title: lang === 'hi' ? 'फ़ंक्शन्स व रिकर्शन' : 'Functions & Recursion Logic',
      chapters: lang === 'hi' ? 'पास-बाय-वैल्यू, स्कोप, रिकर्सिव कॉल्स' : 'Pass-by-value, Scope, Call Stack'
    },
    {
      module: lang === 'hi' ? 'मॉड्यूल 5' : 'Module 5',
      title: lang === 'hi' ? 'पॉइंटर्स व डायनामिक मेमोरी' : 'Pointers & Dynamic Memory',
      chapters: lang === 'hi' ? 'मेमोरी एड्रेस, malloc, calloc, realloc' : 'Memory Addresses, Malloc, Calloc'
    },
    {
      module: lang === 'hi' ? 'मॉड्यूल 6' : 'Module 6',
      title: lang === 'hi' ? 'स्ट्रक्चर्स व फ़ाइल I/O' : 'Structures, Unions & File I/O',
      chapters: lang === 'hi' ? 'स्ट्रक्ट, फ़ाइल रीड/राइट, डेटा परसिस्टेंस' : 'Structs, Files, Persistent Storage'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isDark ? 'bg-[#121419] text-white' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* Top Welcome Header Bar */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#14171E]' : 'bg-white/95 border-slate-200'
      }`}
      style={{ borderColor: isDark ? '#2B313F' : '#E2E8F0' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2.5">
          {/* Clean Left Brand */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink">
            <img
              src="/c-guru-logo.png"
              alt="C-Guru"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl object-cover shadow-sm border border-blue-500/30 shrink-0"
            />
            <span className={`font-bold text-xs sm:text-base tracking-tight truncate ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              C-Guru<span className="hidden sm:inline"> Academy</span>
            </span>
          </div>

          {/* Right Header Action Buttons: Language toggle, Theme, Login, Register */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {setLang && (
              <div className="relative flex items-center">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 absolute left-1.5 sm:left-2 pointer-events-none" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className={`pl-5 sm:pl-6.5 pr-1 sm:pr-2 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-semibold appearance-none transition-colors cursor-pointer max-w-[70px] sm:max-w-none ${
                    isDark
                      ? 'border-[#2B313F] bg-[#181B24] text-slate-200 hover:bg-[#232834]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Select Language (भाषा चुनें)"
                >
                  <optgroup label="🔥 Popular">
                    <option value="en" className={isDark ? 'bg-[#181B24] text-white' : 'bg-white text-slate-900'}>
                      English
                    </option>
                    <option value="hi" className={isDark ? 'bg-[#181B24] text-white' : 'bg-white text-slate-900'}>
                      हिन्दी (Hindi)
                    </option>
                  </optgroup>
                  <optgroup label="🇮🇳 Indian Languages">
                    {ALL_INDIAN_LANGUAGES.filter(l => l.code !== 'en' && l.code !== 'hi').map((item) => (
                      <option key={item.code} value={item.code} className={isDark ? 'bg-[#181B24] text-white' : 'bg-white text-slate-900'}>
                        {item.native} ({item.name})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {setIsDark && (
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-1 sm:p-1.5 rounded-lg sm:rounded-xl border transition-all ${
                  isDark
                    ? 'border-[#2B313F] bg-[#181B24] text-amber-400 hover:bg-[#232834]'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />}
              </button>
            )}

            <button
              onClick={() => onOpenAuth('login')}
              className="px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              {lang === 'hi' ? 'लॉगिन' : 'Sign In'}
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold border border-blue-500/40 bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 transition-all active:scale-95 whitespace-nowrap cursor-pointer shadow-xs"
            >
              {lang === 'hi' ? 'रजिस्टर' : 'Register'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-6 pb-10 sm:pt-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10 text-center space-y-4 sm:space-y-6">
            {/* Center Logo Showcase */}
            <div className="flex justify-center mb-0.5">
              <img
                src="/c-guru-logo.png"
                alt="C-Guru Logo"
                className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-lg border border-blue-500/20"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सम्पूर्ण C प्रोग्रामिंग अकैडमी' : 'Interactive C Programming Academy'}</span>
            </div>

            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight px-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'hi' ? (
                <>
                  C प्रोग्रामिंग सीखें{' '}
                  <span className="text-blue-500 font-bold">शून्य से फ़ाइल हैंडलिंग तक</span>
                </>
              ) : (
                <>
                  Master C Programming{' '}
                  <span className="text-blue-500 font-bold">From Zero to File Handling</span>
                </>
              )}
            </h1>

            <p className={`text-xs sm:text-base max-w-xl mx-auto leading-relaxed px-1 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'hi'
                ? 'संरचित अध्याय, लाइव ब्राउज़र कम्पाइलर, यूनिवर्सिटी लैब प्रश्न और 100+ प्रोग्राम्स। कॉलेज व कोडिंग इंटरव्यू के लिए परिपूर्ण।'
                : 'Structured chapters, real in-browser compiler, practical lab questions, and 100+ programs. Built for university exams and coding interviews.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 pt-1.5 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>{lang === 'hi' ? 'नया खाता बनाएं और शुरू करें' : 'Create Account & Start'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'border-[#2B313F] bg-[#181B24] text-slate-200 hover:bg-[#232834]'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-xs'
                }`}
              >
                {lang === 'hi' ? 'अकाउंट में लॉगिन करें' : 'Sign In to Account'}
              </button>
            </div>

            {/* Key Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-6 max-w-3xl mx-auto">
              {[
                { number: '20', label: lang === 'hi' ? 'संरचित टॉपिक्स' : 'Structured Topics' },
                { number: '100+', label: lang === 'hi' ? 'क्लासिक प्रोग्राम्स' : 'Classic Programs' },
                { number: '50+', label: lang === 'hi' ? 'लॉजिक फ्लोचार्ट्स' : 'Logic Flowcharts' },
                { number: 'Online', label: lang === 'hi' ? 'C कम्पाइलर' : 'C Compiler' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-2.5 sm:p-4 rounded-xl border text-center transition-all ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="font-bold text-lg sm:text-2xl text-blue-500">{stat.number}</div>
                  <div className={`text-[11px] sm:text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Features Showcase */}
        <section className={`py-10 sm:py-16 border-t ${
          isDark ? 'bg-[#14171E] border-[#2B313F]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-8 sm:space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                {lang === 'hi' ? 'सम्पूर्ण अध्ययन एक ही जगह' : 'EVERYTHING IN ONE PLATFORM'}
              </span>
              <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {lang === 'hi' ? 'तेज़ और आत्मविश्वास से भरपूर तैयारी' : 'Designed for Fast, Confident Mastery'}
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {lang === 'hi'
                  ? 'कोई जटिल सेटअप नहीं। C प्रोग्रामिंग सीखने और अभ्यास करने की हर सुविधा आपके ब्राउज़र में उपलब्ध है।'
                  : 'No complex IDE setup required. Everything you need to learn and practice C is built directly into your browser.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 sm:p-6 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#181B24] border-[#2B313F] text-white hover:border-blue-500/50'
                        : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-blue-300'
                    }`}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className={`font-bold text-sm sm:text-base mb-1.5 sm:mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{h.title}</h3>
                    <p className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Curriculum Preview Section */}
        <section className="py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  {lang === 'hi' ? 'पाठ्यक्रम विवरण' : 'CURRICULUM BREAKDOWN'}
                </span>
                <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {lang === 'hi' ? 'विस्तृत 6-मॉड्यूल सिलेबस' : 'Comprehensive 6-Module Syllabus'}
                </h2>
              </div>
              <button
                onClick={() => onOpenAuth('register')}
                className="self-stretch sm:self-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? 'कोर्स में प्रवेश लें' : 'Enroll in Course'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {curriculumHighlights.map((mod, i) => (
                <div
                  key={i}
                  className={`p-4 sm:p-5 rounded-xl border flex flex-col justify-between transition-all ${
                    isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">
                      {mod.module}
                    </span>
                    <h4 className={`font-bold text-sm ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>{mod.title}</h4>
                    <p className={`text-xs ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>{mod.chapters}</p>
                  </div>
                  <div className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                    isDark ? 'border-[#2B313F]' : 'border-slate-100'
                  }`}>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      {lang === 'hi' ? 'स्थिति: विद्यार्थियों हेतु उपलब्ध' : 'Status: Unlocked for Students'}
                    </span>
                    <button
                      onClick={() => onOpenAuth('register')}
                      className="text-blue-500 font-semibold hover:underline cursor-pointer"
                    >
                      {lang === 'hi' ? 'खोलें →' : 'Unlock →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="py-8 sm:py-12 px-3 sm:px-6">
          <div
            className={`max-w-5xl mx-auto p-6 sm:p-12 rounded-2xl border text-center space-y-4 sm:space-y-6 relative overflow-hidden ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F]'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <img
              src="/c-guru-logo.png"
              alt="C-Guru"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover mx-auto shadow-sm border border-blue-500/20"
            />
            <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'hi' ? 'आज ही C प्रोग्रामिंग में महारत हासिल करें!' : 'Ready to Master C Programming Today?'}
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'hi'
                ? 'हज़ारों विद्यार्थियों के साथ विज़ुअल लॉजिक, कोडिंग चैलेंजेस और लाइव कोड रन करें।'
                : 'Join students mastering C with visual logic, code challenges, and real-time execution.'}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 pt-2 pb-3.5 sm:pb-4">
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                {lang === 'hi' ? 'निःशुल्क खाता बनाएं' : 'Register Account Free'}
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className={`w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold text-xs border transition-all cursor-pointer ${
                  isDark
                    ? 'border-[#2B313F] hover:bg-[#232834] text-slate-200'
                    : 'border-slate-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                {lang === 'hi' ? 'अकाउंट में लॉगिन करें' : 'Log In to Existing Account'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with balanced, moderate gap */}
      <footer className={`border-t py-4 sm:py-5 transition-colors ${
        isDark ? 'bg-[#14171E] border-[#2B313F] text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2.5">
            <img
              src="/c-guru-logo.png"
              alt="C-Guru"
              className="w-7 h-7 rounded-lg object-cover shadow-xs border border-blue-500/20"
            />
            <span className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
              C-Guru Academy
            </span>
            <span className="text-slate-400">
              • {lang === 'en' ? 'Complete C Programming Course' : 'सम्पूर्ण C प्रोग्रामिंग कोर्स'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            {onOpenGitHubExport && (
              <button
                onClick={onOpenGitHubExport}
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs underline cursor-pointer"
              >
                {lang === 'en' ? 'GitHub Code' : 'GitHub पर कोड अपलोड करें'}
              </button>
            )}
            <span>
              {lang === 'en' ? '🌐 English Global Edition' : `🇮🇳 ${getLanguageName(lang)}`}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
