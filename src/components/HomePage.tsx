import React from 'react';
import {
  BookOpen,
  Terminal,
  HelpCircle,
  Code,
  GitBranch,
  Bug,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Lock,
  Play,
  BookMarked,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  FlaskConical
} from 'lucide-react';
import { User, UserProgress, Topic } from '../types';
import { C_TOPICS } from '../data/cTopics';
import { TabType } from './Navbar';

interface HomePageProps {
  user: User | null;
  userProgress: UserProgress;
  isDark: boolean;
  lang: 'hi' | 'en';
  isSubscribed: boolean;
  onGoToTab: (tab: TabType) => void;
  onSelectTopic: (topic: Topic) => void;
  onOpenCompilerWithCode?: (code: string) => void;
  onOpenPayment: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  userProgress,
  isDark,
  lang,
  isSubscribed,
  onGoToTab,
  onSelectTopic,
  onOpenCompilerWithCode,
  onOpenPayment
}) => {
  const isHindi = lang !== 'en';
  const completedCount = userProgress.completedTopicIds.length;
  const totalTopics = C_TOPICS.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  // Find next topic to study
  const nextTopic =
    C_TOPICS.find((t) => !userProgress.completedTopicIds.includes(t.id)) || C_TOPICS[0];

  const handleContinueStudy = () => {
    onSelectTopic(nextTopic);
    onGoToTab('tutorials');
  };

  const sampleChallengeCode = `#include <stdio.h>

int main() {
    int n = 7;
    int isPrime = 1;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = 0;
            break;
        }
    }
    
    if (isPrime && n > 1) {
        printf("Number %d is a PRIME number!\\n", n);
    } else {
        printf("Number %d is NOT prime.\\n", n);
    }
    
    return 0;
}`;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. HERO GREETING BANNER */}
      <div
        className={`rounded-2xl p-4 sm:p-8 border shadow-sm relative overflow-hidden transition-all ${
          isDark
            ? 'bg-[#181B24] border-[#2B313F]'
            : 'bg-white border-[#E2E8F0]'
        }`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'hi' ? 'C-Guru अकैडमी • सम्पूर्ण C मास्टरक्लास' : 'C-Guru Academy • Complete C Masterclass'}
              </span>
            </div>

            <h1 className={`text-xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'hi' ? 'स्वागत है, ' : 'Welcome back, '}
              <span className="text-blue-500 font-bold">
                {user ? user.name : (lang === 'hi' ? 'विद्यार्थी' : 'Student')}
              </span>
              ! 👋
            </h1>

            <p className={`text-xs sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'hi'
                ? 'अपनी C प्रोग्रामिंग यात्रा जारी रखें। मेमोरी पॉइंटर्स, एल्गोरिदम और प्रोग्राम्स को क्रमबद्ध समझें।'
                : 'Continue your C Programming mastery. Understand memory pointers, algorithms, and practical code solutions step-by-step.'}
            </p>

            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] sm:text-xs font-medium">
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                isDark ? 'border-[#2B313F] bg-[#13161D] text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}>
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span>
                  {userProgress.streakDays} {lang === 'hi' ? 'दिन की निरंतरता' : 'Day Streak'}
                </span>
              </div>

              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                isDark ? 'border-[#2B313F] bg-[#13161D] text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {completedCount} / {totalTopics} {lang === 'hi' ? 'अध्याय पूर्ण' : 'Topics Completed'}
                </span>
              </div>

              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                isDark ? 'border-[#2B313F] bg-[#13161D] text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}>
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {Object.keys(userProgress.quizScores).length} {lang === 'hi' ? 'क्विज़ उत्तीर्ण' : 'Quizzes Passed'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? '100% मुफ़्त सम्पूर्ण एक्सेस' : '100% Free Full Access'}</span>
              </div>
            </div>
          </div>

          {/* Quick Progress Bar Card */}
          <div
            className={`w-full lg:w-72 p-4 sm:p-5 rounded-xl border space-y-3 shrink-0 ${
              isDark ? 'bg-[#13161D] border-[#2B313F]' : 'bg-slate-50 border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className={`uppercase tracking-wider text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'hi' ? 'कोर्स प्रगति' : 'Course Progress'}
              </span>
              <span className="text-blue-400 font-bold text-sm">{progressPercent}%</span>
            </div>

            {/* Progress track */}
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#2B313F]' : 'bg-slate-200'}`}>
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>

            <div className={`flex items-center justify-between text-[11px] pt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>{completedCount} {lang === 'hi' ? 'पूर्ण' : 'Chapters'}</span>
              <span>{totalTopics - completedCount} {lang === 'hi' ? 'शेष' : 'Remaining'}</span>
            </div>

            <button
              onClick={handleContinueStudy}
              className="w-full py-2.5 rounded-lg text-xs font-semibold text-white shadow-sm bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>{lang === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. NEXT UP CHAPTER RECOMMENDATION */}
      <div
        className={`rounded-xl p-4 sm:p-6 border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 ${
          isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-[#E2E8F0] shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-sm shrink-0">
            {nextTopic.order}
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                {lang === 'hi' ? 'अगला अनुशंसित अध्याय' : 'Recommended Next'}
              </span>
              <span className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Clock className="w-3 h-3" /> {nextTopic.readTimeMinutes} {lang === 'hi' ? 'मिनट' : 'min'}
              </span>
            </div>
            <h3 className={`text-sm sm:text-lg font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' && nextTopic.titleHindi ? nextTopic.titleHindi : nextTopic.title}
            </h3>
            <p className={`text-xs line-clamp-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'hi' && nextTopic.summaryHindi ? nextTopic.summaryHindi : nextTopic.summary}
            </p>
          </div>
        </div>

        <button
          onClick={handleContinueStudy}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>
            {lang === 'hi' ? `अध्याय ${nextTopic.order} शुरू करें` : `Start Topic ${nextTopic.order}`}
          </span>
        </button>
      </div>

      {/* 3. CORE FEATURES LAUNCHPAD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Explore Core Features
          </h2>
          <span className="text-xs text-slate-400">Everything you need to master C</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tutorials */}
          <div
            onClick={() => onGoToTab('tutorials')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-blue-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-blue-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Tutorials & Theory
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                20 structured chapters covering basic syntax up to file handling and memory structures.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Tutorials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Compiler Playground */}
          <div
            onClick={() => onGoToTab('compiler')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-emerald-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-emerald-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Online C Compiler
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Write, test, and execute C code in real time with interactive inputs and console terminal.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-emerald-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Compiler</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Quizzes */}
          <div
            onClick={() => onGoToTab('quiz')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-purple-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-purple-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-purple-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Quizzes & Tests
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                400+ topic-wise MCQs and grand practice exams with instant feedback and explanations.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-purple-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Programs Lab */}
          <div
            onClick={() => onGoToTab('programs')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-blue-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <Code className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-blue-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Programs Lab
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                100+ ready classic C solutions: loops, arrays, strings, recursion, sorting, and files.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Lab Questions & Practical Manual */}
          <div
            onClick={() => onGoToTab('lab')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-blue-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-blue-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {isHindi ? 'प्रैक्टिकल लैब प्रश्न (Lab Manual)' : 'Lab Questions (Practical Manual)'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {isHindi
                  ? 'यूनिवर्सिटी के सभी मुख्य 20+ लैब प्रश्न: विस्तृत थ्योरी, ANSI C कोड और मौखिक परीक्षा (Viva Voce) Q&A।'
                  : 'University practical syllabus: detailed conceptual theory, C code, and viva voce exam Q&A.'}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>{isHindi ? 'लैब प्रश्न देखें' : 'View Lab Questions'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Bug Hunter */}
          <div
            onClick={() => onGoToTab('bugs')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-rose-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-rose-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                <Bug className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-rose-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Bug Hunter
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Test your debugging skills by finding subtle syntax and memory bugs in real C snippets.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-rose-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Hunt Bugs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 7: All Topics Directory */}
          <div
            onClick={() => onGoToTab('topics')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-blue-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <BookMarked className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-blue-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                All Topics Directory
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Browse the complete syllabus roadmap from introduction to dynamic memory management.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 8: Dashboard & Certificate */}
          <div
            onClick={() => onGoToTab('dashboard')}
            className={`p-5 rounded-xl border transition-all cursor-pointer group hover:border-amber-500 flex flex-col justify-between ${
              isDark
                ? 'bg-[#181B24] border-[#2B313F] hover:bg-[#1E222C]'
                : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
            }`}
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <Award className="w-4 h-4" />
              </div>
              <h3 className={`font-semibold text-sm group-hover:text-amber-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Profile & Certificate
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Check personal stats, unlocked milestones, bookmarks, and print your verified certificate.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-500 gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. CODE CHALLENGE OF THE DAY */}
      <div
        className={`rounded-2xl p-6 sm:p-7 border shadow-sm space-y-4 ${
          isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Daily C Challenge: Prime Number Checker
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Test your logic and execute this program live in the compiler.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (onOpenCompilerWithCode) {
                onOpenCompilerWithCode(sampleChallengeCode);
              }
              onGoToTab('compiler');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code in Compiler</span>
          </button>
        </div>

        <div className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto ${
          isDark ? 'bg-[#12141A] border-[#2B313F] text-emerald-300' : 'bg-slate-900 text-emerald-300'
        }`}>
          <pre>{sampleChallengeCode}</pre>
        </div>
      </div>
    </div>
  );
};
