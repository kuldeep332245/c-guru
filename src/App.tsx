/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Home,
  BookMarked,
  BookOpen,
  Terminal,
  HelpCircle,
  CheckCircle2,
  X,
  ShieldAlert
} from 'lucide-react';
import { Navbar, TabType } from './components/Navbar';
import { TutorialViewer } from './components/TutorialViewer';
import { AllTopicsDirectory } from './components/AllTopicsDirectory';
import { FlowchartVisualizer } from './components/FlowchartVisualizer';
import { LabProgramsViewer } from './components/LabProgramsViewer';
import { ProgramsLab } from './components/ProgramsLab';
import { SyntaxGuide } from './components/SyntaxGuide';
import { CompilerPlayground } from './components/CompilerPlayground';
import { BugHunter } from './components/BugHunter';
import { QuizSection } from './components/QuizSection';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { HomePage } from './components/HomePage';
import { AuthModal } from './components/AuthModal';
import { WelcomePage } from './components/WelcomePage';
import { GitHubExportModal } from './components/GitHubExportModal';
import { C_TOPICS } from './data/cTopics';
import { Topic, User, UserProgress } from './types';
import {
  getActiveUser,
  setActiveUser,
  getUserProgress,
  saveUserProgress,
  isUserSubscribed,
  ADMIN_USER
} from './utils/storage';
import { getNavLabels, getLanguageName } from './utils/languages';
import { initAppSecurity, registerSecurityListener } from './utils/security';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  // Read saved language from localStorage, default to Hindi ('hi') or any chosen Indian language
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem('cguru_lang');
    return saved || 'hi';
  });
  const effectiveLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
  const navLabels = getNavLabels(lang);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('cguru_dark_theme');
    // Default is light theme (false) as compulsory requested by user
    return saved !== null ? saved === 'true' : false;
  });

  const [user, setUser] = useState<User | null>(() => getActiveUser());
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const u = getActiveUser();
    return getUserProgress(u ? u.id : 'user_guest');
  });

  const [currentTopic, setCurrentTopic] = useState<Topic>(C_TOPICS[0]);
  const [compilerCode, setCompilerCode] = useState<string>('');
  const [selectedFlowchartId, setSelectedFlowchartId] = useState<string | undefined>(undefined);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [authToast, setAuthToast] = useState<string | null>(null);
  const [securityToast, setSecurityToast] = useState<string | null>(null);
  const [screenShieldActive, setScreenShieldActive] = useState<boolean>(false);

  // Initialize Security Shield (Anti-Screenshot, Anti-DevTools, Anti-Copy)
  useEffect(() => {
    initAppSecurity();

    const unregister = registerSecurityListener((ev) => {
      // Only show alert on active screenshot key attempt
      if (ev.type === 'screenshot') {
        setScreenShieldActive(true);
        setTimeout(() => setScreenShieldActive(false), 1200);
        setSecurityToast(ev.message);
        setTimeout(() => {
          setSecurityToast(null);
        }, 3000);
      }
    });

    return () => {
      unregister();
    };
  }, []);

  const renderSecurityShields = () => (
    <>
      {/* 1. Screen Shield Blackout Flash (Triggered strictly on PrintScreen or Snipping Tool) */}
      {screenShieldActive && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-6 text-center animate-in fade-in duration-75">
          <div className="max-w-sm space-y-2 text-white">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-rose-400">स्क्रीनशॉट अवरुद्ध (Screenshot Blocked)</h3>
            <p className="text-[11px] text-slate-400">
              C-Guru Academy सामग्री सुरक्षा नीति: डिजिटल गोपनीयता और कॉपीराइट सुरक्षा सक्रिय है।
            </p>
          </div>
        </div>
      )}

      {/* 2. Security Warning Toast (PrtScn) */}
      {securityToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-[92%] px-4 py-3 rounded-2xl border border-rose-500/40 bg-[#160B0E]/95 text-rose-200 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-xs font-bold animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
            <span className="truncate">{securityToast}</span>
          </div>
          <button
            onClick={() => setSecurityToast(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-rose-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Subtle Anti-Leak DRM Watermark */}
      <div
        className="fixed inset-0 pointer-events-none select-none z-20 opacity-[0.02] dark:opacity-[0.035] overflow-hidden flex flex-wrap content-start gap-16 p-8"
        style={{ transform: 'rotate(-15deg) scale(1.1)' }}
        aria-hidden="true"
      >
        {Array.from({ length: 32 }).map((_, i) => (
          <span key={i} className="text-[10px] font-mono font-bold tracking-widest text-slate-500 whitespace-nowrap">
            C-GURU DRM • {user?.phone ? `+91-${user.phone}` : 'STUDENT-SESSION'} • NO-SCREENSHOT
          </span>
        ))}
      </div>
    </>
  );

  const isSubscribed = isUserSubscribed(user);

  const handleAuthSuccess = (newUser: User) => {
    setUser(newUser);
    setUserProgress(getUserProgress(newUser.id));
    setIsAuthModalOpen(false);
    setActiveTab('home');
    setAuthToast(`Welcome, ${newUser.name}! Logged in successfully.`);
    setTimeout(() => {
      setAuthToast(null);
    }, 3500);
  };

  // Sync language selection
  useEffect(() => {
    localStorage.setItem('cguru_lang', lang);
  }, [lang]);

  // Sync dark theme class on document element
  useEffect(() => {
    localStorage.setItem('cguru_dark_theme', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Load progress when user changes
  useEffect(() => {
    if (user) {
      const p = getUserProgress(user.id);
      setUserProgress(p);
    }
  }, [user]);

  // Progress update helper
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setUserProgress((prev) => {
      const next = updater(prev);
      const userId = user ? user.id : 'user_guest';
      saveUserProgress(userId, next);
      return next;
    });
  };

  const handleToggleComplete = (topicId: string) => {
    updateProgress((prev) => {
      const exists = prev.completedTopicIds.includes(topicId);
      const completed = exists
        ? prev.completedTopicIds.filter((id) => id !== topicId)
        : [...prev.completedTopicIds, topicId];
      return {
        ...prev,
        completedTopicIds: completed
      };
    });
  };

  const handleToggleBookmark = (topicId: string) => {
    updateProgress((prev) => {
      const exists = prev.bookmarkedTopicIds.includes(topicId);
      const bookmarked = exists
        ? prev.bookmarkedTopicIds.filter((id) => id !== topicId)
        : [...prev.bookmarkedTopicIds, topicId];
      return {
        ...prev,
        bookmarkedTopicIds: bookmarked
      };
    });
  };

  const handleRecordQuizScore = (topicId: string, score: number, total: number) => {
    updateProgress((prev) => {
      const percentage = Math.round((score / total) * 100);
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [topicId]: {
            score,
            total,
            percentage,
            date: new Date().toISOString().split('T')[0]
          }
        }
      };
    });
  };

  const handleBugSolved = (bugId: string) => {
    updateProgress((prev) => {
      if (prev.bugsSolvedIds.includes(bugId)) return prev;
      return {
        ...prev,
        bugsSolvedIds: [...prev.bugsSolvedIds, bugId]
      };
    });
  };

  const handleCompilerRunSuccess = () => {
    updateProgress((prev) => ({
      ...prev,
      compilerRunsCount: prev.compilerRunsCount + 1
    }));
  };

  const handleOpenInCompiler = (code: string) => {
    setCompilerCode(code);
    setActiveTab('compiler');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTopic = (topic: Topic) => {
    setCurrentTopic(topic);
    setActiveTab('tutorials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToFlowchart = (flowchartId: string) => {
    setSelectedFlowchartId(flowchartId);
    setActiveTab('flowcharts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setActiveUser(null);
    setUser(null);
    setShowUnlockOffer(false);
    setUserProgress(getUserProgress('user_guest'));
  };

  const handleResetProgress = () => {
    const empty: UserProgress = {
      completedTopicIds: [],
      quizScores: {},
      bugsSolvedIds: [],
      compilerRunsCount: 0,
      bookmarkedTopicIds: [],
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      milestonesUnlocked: []
    };
    const userId = user ? user.id : 'user_guest';
    saveUserProgress(userId, empty);
    setUserProgress(empty);
  };

  // When user is not logged in, show Welcome Page directly with details and registration/login
  if (!user) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#121419] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
        {/* Top 1-Line Success Toast */}
        {authToast && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-600 text-white shadow-xl flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              <span className="truncate">{authToast}</span>
            </div>
            <button
              onClick={() => setAuthToast(null)}
              className="p-1 rounded-lg hover:bg-black/20 text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <WelcomePage
          onOpenAuth={(mode) => {
            setAuthMode(mode || 'register');
            setIsAuthModalOpen(true);
          }}
          isDark={isDark}
          lang={lang}
          setLang={setLang}
          setIsDark={setIsDark}
          onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
        />

        {/* Unified Login & Registration Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          isDark={isDark}
          initialMode={authMode}
          lang={lang}
        />

        {/* GitHub Code Export / Update Modal */}
        <GitHubExportModal
          isOpen={isGitHubModalOpen}
          onClose={() => setIsGitHubModalOpen(false)}
          isDark={isDark}
          lang={effectiveLang}
        />

        {/* Security Shield & Anti-Screenshot Overlay */}
        {renderSecurityShields()}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors selection:bg-[#2563EB] selection:text-white ${
        isDark ? 'bg-[#121419] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* Top 1-Line Success Toast */}
      {authToast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-600 text-white shadow-xl flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
            <span className="truncate">{authToast}</span>
          </div>
          <button
            onClick={() => setAuthToast(null)}
            className="p-1 rounded-lg hover:bg-black/20 text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        isSubscribed={isSubscribed}
        onOpenAuth={() => {
          setAuthMode('login');
          setIsAuthModalOpen(true);
        }}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
        onLogout={handleLogout}
        onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
        completedCount={userProgress.completedTopicIds.length}
        totalTopics={C_TOPICS.length}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomePage
            user={user}
            userProgress={userProgress}
            isDark={isDark}
            lang={effectiveLang}
            isSubscribed={isSubscribed}
            onGoToTab={(tab) => setActiveTab(tab)}
            onSelectTopic={handleGoToTopic}
            onOpenCompilerWithCode={handleOpenInCompiler}
            onOpenPayment={() => setIsPaymentModalOpen(true)}
          />
        )}

        {activeTab === 'tutorials' && (
          <TutorialViewer
            currentTopic={currentTopic}
            onSelectTopic={setCurrentTopic}
            lang={effectiveLang}
            isDark={isDark}
            userProgress={userProgress}
            isSubscribed={isSubscribed}
            onOpenPayment={() => setIsPaymentModalOpen(true)}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenInCompiler={handleOpenInCompiler}
            onRecordQuizScore={handleRecordQuizScore}
          />
        )}

        {activeTab === 'topics' && (
          <AllTopicsDirectory
            onSelectTopic={handleGoToTopic}
            lang={effectiveLang}
            isDark={isDark}
            userProgress={userProgress}
            isSubscribed={isSubscribed}
            onOpenPayment={() => setIsPaymentModalOpen(true)}
          />
        )}

        {(activeTab === 'lab' || activeTab === 'flowcharts') && (
          <LabProgramsViewer
            isDark={isDark}
            lang={effectiveLang}
            onOpenInCompiler={handleOpenInCompiler}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsLab
            isDark={isDark}
            lang={effectiveLang}
            onOpenInCompiler={handleOpenInCompiler}
            onGoToFlowchart={handleGoToFlowchart}
          />
        )}

        {activeTab === 'syntax' && (
          <SyntaxGuide
            isDark={isDark}
            lang={effectiveLang}
            onOpenInCompiler={handleOpenInCompiler}
          />
        )}

        {activeTab === 'compiler' && (
          <CompilerPlayground
            initialCode={compilerCode}
            isDark={isDark}
            lang={effectiveLang}
            onRunSuccess={handleCompilerRunSuccess}
          />
        )}

        {activeTab === 'bugs' && (
          <BugHunter
            isDark={isDark}
            lang={effectiveLang}
            userProgress={userProgress}
            onBugSolved={handleBugSolved}
            onOpenInCompiler={handleOpenInCompiler}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            isDark={isDark}
            lang={effectiveLang}
            userProgress={userProgress}
            onRecordScore={handleRecordQuizScore}
            onGoToTopic={handleGoToTopic}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            userProgress={userProgress}
            isDark={isDark}
            lang={effectiveLang}
            isSubscribed={isSubscribed}
            onOpenPayment={() => setIsPaymentModalOpen(true)}
            onGoToTopic={handleGoToTopic}
            onGoToCompiler={() => setActiveTab('compiler')}
            onGoToBugs={() => setActiveTab('bugs')}
            onResetProgress={handleResetProgress}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && user && (
          <AdminPanel
            currentUser={user}
            isDark={isDark}
            lang={effectiveLang}
            onSwitchUser={(u) => setUser(u)}
            onGoToTab={(tab) => setActiveTab(tab as TabType)}
          />
        )}
      </main>

      {/* Auth Modal (Unified Registration & Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        isDark={isDark}
        initialMode={authMode}
        lang={effectiveLang}
      />

      {/* Mobile Bottom Navigation Bar (Ultra-clean 1-tap navigation for phone users) */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-1.5 py-1 transition-colors ${
          isDark
            ? 'bg-[#14171E]/95 border-[#2B313F] text-slate-300'
            : 'bg-white/95 border-slate-200 text-slate-600'
        }`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 4px)' }}
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {[
            { id: 'home' as TabType, label: navLabels.home, icon: Home },
            { id: 'topics' as TabType, label: navLabels.topics, icon: BookMarked },
            { id: 'tutorials' as TabType, label: navLabels.tutorials, icon: BookOpen },
            { id: 'compiler' as TabType, label: navLabels.compiler, icon: Terminal },
            { id: 'quiz' as TabType, label: navLabels.quiz, icon: HelpCircle }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  active
                    ? 'text-blue-500 font-bold scale-105'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className={`p-1 rounded-lg ${active ? 'bg-blue-500/10' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer with balanced, natural gap so C-Guru Academy looks clean and not stuck to bottom bar */}
      <footer
        className={`mt-auto border-t py-3 pb-14 sm:py-3.5 transition-colors ${
          isDark
            ? 'bg-[#14171E] border-[#2B313F] text-slate-300'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
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

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>Modern C Programming Platform</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">
              {lang === 'en' ? '🌐 English Global Edition' : `🇮🇳 ${getLanguageName(lang)}`}
            </span>
          </div>
        </div>
      </footer>

      {/* GitHub Code Export / Update Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        isDark={isDark}
        lang={effectiveLang}
      />

      {/* Security Shield & Anti-Screenshot Overlay */}
      {renderSecurityShields()}
    </div>
  );
}
