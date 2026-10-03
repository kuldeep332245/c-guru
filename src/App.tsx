/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { TutorialViewer } from './components/TutorialViewer';
import { AllTopicsDirectory } from './components/AllTopicsDirectory';
import { FlowchartVisualizer } from './components/FlowchartVisualizer';
import { ProgramsLab } from './components/ProgramsLab';
import { SyntaxGuide } from './components/SyntaxGuide';
import { CompilerPlayground } from './components/CompilerPlayground';
import { BugHunter } from './components/BugHunter';
import { QuizSection } from './components/QuizSection';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { GitHubExportModal } from './components/GitHubExportModal';
import { C_TOPICS } from './data/cTopics';
import { Topic, User, UserProgress } from './types';
import {
  getActiveUser,
  setActiveUser,
  getUserProgress,
  saveUserProgress
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('tutorials');
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('cguru_dark_theme');
    return saved !== null ? saved === 'true' : true; // Default dark theme
  });

  const [user, setUser] = useState<User | null>(() => getActiveUser());
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const u = getActiveUser();
    return getUserProgress(u ? u.id : 'user_guest');
  });

  const [currentTopic, setCurrentTopic] = useState<Topic>(C_TOPICS[0]);
  const [compilerCode, setCompilerCode] = useState<string>('');
  const [selectedFlowchartId, setSelectedFlowchartId] = useState<string | undefined>(undefined);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

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

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors selection:bg-blue-600 selection:text-white ${
        isDark ? 'bg-[#0B0F19] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onLogout={handleLogout}
        completedCount={userProgress.completedTopicIds.length}
        totalTopics={C_TOPICS.length}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-12">
        {activeTab === 'tutorials' && (
          <TutorialViewer
            currentTopic={currentTopic}
            onSelectTopic={setCurrentTopic}
            lang={lang}
            isDark={isDark}
            userProgress={userProgress}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenInCompiler={handleOpenInCompiler}
            onRecordQuizScore={handleRecordQuizScore}
          />
        )}

        {activeTab === 'topics' && (
          <AllTopicsDirectory
            onSelectTopic={handleGoToTopic}
            lang={lang}
            isDark={isDark}
            userProgress={userProgress}
          />
        )}

        {activeTab === 'flowcharts' && (
          <FlowchartVisualizer
            isDark={isDark}
            lang={lang}
            onOpenInCompiler={handleOpenInCompiler}
            initialFlowchartId={selectedFlowchartId}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsLab
            isDark={isDark}
            lang={lang}
            onOpenInCompiler={handleOpenInCompiler}
            onGoToFlowchart={handleGoToFlowchart}
          />
        )}

        {activeTab === 'syntax' && (
          <SyntaxGuide
            isDark={isDark}
            lang={lang}
            onOpenInCompiler={handleOpenInCompiler}
          />
        )}

        {activeTab === 'compiler' && (
          <CompilerPlayground
            initialCode={compilerCode}
            isDark={isDark}
            lang={lang}
            onRunSuccess={handleCompilerRunSuccess}
          />
        )}

        {activeTab === 'bugs' && (
          <BugHunter
            isDark={isDark}
            lang={lang}
            userProgress={userProgress}
            onBugSolved={handleBugSolved}
            onOpenInCompiler={handleOpenInCompiler}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            isDark={isDark}
            lang={lang}
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
            lang={lang}
            onGoToTopic={handleGoToTopic}
            onGoToCompiler={() => setActiveTab('compiler')}
            onGoToBugs={() => setActiveTab('bugs')}
            onResetProgress={handleResetProgress}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
        isDark={isDark}
      />

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        isDark={isDark}
        lang={lang}
      />

      {/* Footer */}
      <footer
        className={`mt-auto border-t py-6 transition-colors ${
          isDark
            ? 'bg-[#080C15] border-slate-800/80 text-slate-400'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs shadow-sm bg-gradient-to-tr from-blue-600 to-cyan-500 text-white"
            >
              C
            </span>
            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              C-Guru Academy
            </span>
            <span className="text-slate-500">• Zero se File Handling Tak Sampoorna C Course</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>Modern C Programming Platform</span>
            <span>•</span>
            <span className="text-blue-500 font-medium">Bilingual हिन्दी / English</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
