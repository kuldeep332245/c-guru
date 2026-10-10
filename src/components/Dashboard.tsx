import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle,
  CheckCircle2,
  Flame,
  Terminal,
  Bug,
  HelpCircle,
  Bookmark,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Crown,
  Lock,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { User, UserProgress, Topic } from '../types';
import { C_TOPICS, MILESTONES } from '../data/cTopics';
import { CertificateModal } from './CertificateModal';

interface DashboardProps {
  user: User | null;
  userProgress: UserProgress;
  isDark: boolean;
  lang: 'hi' | 'en';
  isSubscribed: boolean;
  onOpenPayment: () => void;
  onGoToTopic: (topic: Topic) => void;
  onGoToCompiler: () => void;
  onGoToBugs: () => void;
  onResetProgress: () => void;
  onOpenAuth: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  userProgress,
  isDark,
  lang,
  isSubscribed,
  onOpenPayment,
  onGoToTopic,
  onGoToCompiler,
  onGoToBugs,
  onResetProgress,
  onOpenAuth
}) => {
  const [isCertOpen, setIsCertOpen] = useState(false);

  const completedCount = userProgress.completedTopicIds.length;
  const totalTopics = C_TOPICS.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  // Calculate Quiz average accuracy
  const quizScores = Object.values(userProgress.quizScores);
  const totalScoreObtained = quizScores.reduce((acc, curr) => acc + curr.score, 0);
  const totalMaxScore = quizScores.reduce((acc, curr) => acc + curr.total, 0);
  const quizAccuracy = totalMaxScore > 0 ? Math.round((totalScoreObtained / totalMaxScore) * 100) : 0;

  const bookmarkedTopics = C_TOPICS.filter((t) =>
    userProgress.bookmarkedTopicIds.includes(t.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Profile & Greeting Card */}
      <div
        className={`rounded-2xl p-6 sm:p-8 border shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
          isDark
            ? 'bg-[#181B24] border-[#2B313F]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm shrink-0 bg-blue-600 text-white">
            {user ? user.name.charAt(0).toUpperCase() : 'G'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Welcome back, {user ? user.name : 'Guest'}! 👋
              </h1>
              {progressPercent === 100 && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  C Master
                </span>
              )}
            </div>

            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {user ? user.email : 'Login to save your milestones permanently'}
            </p>

            <div className={`flex items-center gap-3 pt-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="flex items-center gap-1 font-semibold text-blue-500">
                <Flame className="w-4 h-4 fill-current text-amber-500" />
                {userProgress.streakDays} Day Streak
              </span>
              <span>•</span>
              <span>Course: {user?.course || 'Complete C Programming Masterclass'}</span>
            </div>
          </div>
        </div>

        {/* Certificate & Auth CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCertOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </button>

          {!user && (
            <button
              onClick={onOpenAuth}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                isDark
                  ? 'border-[#2B313F] bg-[#14171E] text-slate-200 hover:bg-[#1E222C]'
                  : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      {/* 100% Free Lifetime Course Pass Card */}
      <div
        className={`rounded-2xl p-6 sm:p-7 border shadow-sm relative overflow-hidden transition-all ${
          isDark
            ? 'bg-[#181B24] border-emerald-500/30'
            : 'bg-emerald-50/60 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 bg-emerald-600 text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi'
                    ? '100% मुफ़्त सम्पूर्ण C कोर्स (सभी अध्याय अनलॉक)'
                    : '100% Free Complete C Curriculum (All Chapters Unlocked)'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  {lang === 'hi' ? 'सक्रिय' : 'Free Access'}
                </span>
              </div>

              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'hi'
                  ? 'सभी 20 चैप्टर्स, कम्पाइलर, और प्रैक्टिकल लैब प्रश्न 100% मुफ़्त अनलॉक हैं।'
                  : 'All 20 modules, playground compiler, and practical lab programs are 100% free and unlocked.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Topics Progress */}
        <div
          className={`rounded-2xl p-5 border shadow-sm space-y-2 transition-all ${
            isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Course Progress</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {progressPercent}%
          </div>
          <div className="w-full bg-[#2B313F] h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-blue-600"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {completedCount} of {totalTopics} modules finished
          </p>
        </div>

        {/* Quizzes Accuracy */}
        <div
          className={`rounded-2xl p-5 border shadow-sm space-y-2 transition-all ${
            isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Quiz Accuracy</span>
            <HelpCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-500">
            {quizAccuracy}%
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {totalScoreObtained} correct out of {totalMaxScore} questions
          </p>
        </div>

        {/* Bugs Diagnosed */}
        <div
          className={`rounded-2xl p-5 border shadow-sm space-y-2 transition-all ${
            isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Bugs Solved</span>
            <Bug className="w-4 h-4 text-rose-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {userProgress.bugsSolvedIds.length}
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Debugging challenges conquered
          </p>
        </div>

        {/* Compiler Runs */}
        <div
          className={`rounded-2xl p-5 border shadow-sm space-y-2 transition-all ${
            isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Compiler Runs</span>
            <Terminal className="w-4 h-4 text-blue-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {userProgress.compilerRunsCount}
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            C programs executed in playground
          </p>
        </div>
      </div>

      {/* Learning Milestones Badges */}
      <div
        className={`rounded-2xl p-6 sm:p-7 border shadow-sm space-y-5 transition-all ${
          isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Learning Milestones & Badges
            </h2>
          </div>
          <span className="text-xs font-semibold text-blue-400">
            {userProgress.milestonesUnlocked.length}/{MILESTONES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {MILESTONES.map((m) => {
            const isUnlocked = userProgress.milestonesUnlocked.includes(m.id);

            return (
              <div
                key={m.id}
                className={`p-4 rounded-xl border transition-all text-center space-y-2 ${
                  isUnlocked
                    ? isDark
                      ? 'bg-[#14171E] border-blue-500/40 shadow-sm'
                      : 'bg-blue-50/70 border-blue-200 shadow-sm'
                    : isDark
                    ? 'bg-[#13161D] border-[#2B313F] opacity-50 grayscale'
                    : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
                }`}
              >
                <div className="text-3xl">{m.icon}</div>
                <div className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? m.titleHindi : m.title}
                </div>
                <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'hi' ? m.descriptionHindi : m.description}
                </p>
                <div className="pt-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isUnlocked
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-[#2B313F] text-slate-400'
                    }`}
                  >
                    {isUnlocked ? 'Unlocked ✓' : `${m.requiredProgress}% required`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Topics Section */}
      {bookmarkedTopics.length > 0 && (
        <div
          className={`rounded-2xl p-6 sm:p-7 border shadow-sm space-y-4 transition-all ${
            isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-400 fill-current" />
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'बुकमार्क किए गए टॉपिक्स' : 'Bookmarked Topics for Quick Revision'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookmarkedTopics.map((top) => (
              <div
                key={top.id}
                onClick={() => onGoToTopic(top)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isDark
                    ? 'bg-[#14171E] border-[#2B313F] hover:border-blue-500'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-500'
                }`}
              >
                <div>
                  <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {top.order}. {lang === 'hi' ? top.titleHindi : top.title}
                  </div>
                  <div className="text-[11px] text-slate-300">{top.category}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Roadmap Overview */}
      <div
        className={`rounded-2xl p-6 sm:p-7 border shadow-sm space-y-5 transition-all ${
          isDark ? 'bg-[#181B24] border-[#2B313F]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'hi' ? 'सीखने का रोडमैप (Zero se File Handling)' : 'Complete C Learning Roadmap'}
          </h2>
        </div>

        <div className="space-y-3">
          {C_TOPICS.map((topic) => {
            const isDone = userProgress.completedTopicIds.includes(topic.id);
            const score = userProgress.quizScores[topic.id];

            return (
              <div
                key={topic.id}
                onClick={() => onGoToTopic(topic)}
                className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isDone
                    ? isDark
                      ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                    : isDark
                    ? 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Module {topic.order}: {lang === 'hi' ? topic.titleHindi : topic.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {topic.category} • {topic.readTimeMinutes} min
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {score && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      Quiz: {score.percentage}%
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress Danger Zone */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => {
            if (window.confirm('Kya aap sach me progress reset karna chahte hain?')) {
              onResetProgress();
            }
          }}
          className="text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Learning Progress</span>
        </button>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        user={user}
        userProgress={userProgress}
        isDark={isDark}
        lang={lang}
      />
    </div>
  );
};
