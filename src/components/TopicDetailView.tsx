import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Code2,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  Play,
  Copy,
  Check,
  Lightbulb,
  AlertTriangle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileText,
  Lock,
  Sparkles,
  Crown
} from 'lucide-react';
import { Topic, UserProgress, QuizQuestion } from '../types';
import { getTopicQuestionBank } from '../data/topicQuestionBanks';

interface TopicDetailViewProps {
  topic: Topic;
  onBack: () => void;
  lang: 'hi' | 'en';
  isDark: boolean;
  userProgress: UserProgress;
  isSubscribed: boolean;
  onOpenPayment: () => void;
  onToggleComplete: (topicId: string) => void;
  onToggleBookmark: (topicId: string) => void;
  onOpenInCompiler: (code: string) => void;
  onRecordQuizScore: (topicId: string, score: number, total: number) => void;
}

export const TopicDetailView: React.FC<TopicDetailViewProps> = ({
  topic,
  onBack,
  lang,
  isDark,
  userProgress,
  isSubscribed,
  onOpenPayment,
  onToggleComplete,
  onToggleBookmark,
  onOpenInCompiler,
  onRecordQuizScore
}) => {
  const [activeMode, setActiveMode] = useState<'theory' | 'practical' | 'quiz'>('theory');

  const fullQuestions: QuizQuestion[] = useMemo(() => {
    return getTopicQuestionBank(topic.id, topic.title, topic.category);
  }, [topic.id, topic.title, topic.category]);

  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'hard'>('all');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isCompleted = userProgress.completedTopicIds.includes(topic.id);
  const isBookmarked = userProgress.bookmarkedTopicIds.includes(topic.id);

  const activeQuestions = useMemo(() => {
    if (difficultyFilter === 'easy') {
      return fullQuestions.filter((q) => q.difficulty === 'easy');
    }
    if (difficultyFilter === 'hard') {
      return fullQuestions.filter((q) => q.difficulty === 'hard');
    }
    return fullQuestions;
  }, [fullQuestions, difficultyFilter]);

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setIsQuizSubmitted(true);
    onRecordQuizScore(topic.id, score, activeQuestions.length);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQIndex(0);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  let totalCorrect = 0;
  if (isQuizSubmitted) {
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) totalCorrect++;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 protected-content">
      {/* Top Header / Breadcrumb Bar */}
      <div
        className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 transition-all ${
          isDark
            ? 'bg-[#1D2536] border-[#2C374D]'
            : 'bg-white border-[#E2E8F0]'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border text-xs font-bold transition-all hover:scale-105 shrink-0 ${
              isDark
                ? 'bg-[#171E2D] border-[#2C374D] text-slate-200 hover:bg-[#20293D]'
                : 'bg-slate-100 border-[#E2E8F0] text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सभी विषय' : 'All Topics'}</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                Module {topic.order}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">{topic.category}</span>
            </div>
            <h1 className={`text-base sm:text-2xl font-extrabold tracking-tight mt-0.5 sm:mt-1 truncate ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
              {lang === 'hi' ? topic.titleHindi : topic.title}
            </h1>
          </div>
        </div>

        {/* Actions: Bookmark & Mark Complete */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-700/20">
          <button
            onClick={() => onToggleBookmark(topic.id)}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all hover:scale-105 ${
              isDark
                ? 'bg-[#171E2D] border-[#2C374D] text-slate-300'
                : 'bg-slate-100 border-[#E2E8F0] text-slate-600'
            }`}
            title="Bookmark"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current text-[#2563EB]" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleComplete(topic.id)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isCompleted
                ? 'bg-[#10B981] hover:bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-[#2563EB] hover:bg-blue-600 text-white hover:scale-105 shadow-blue-500/20'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Completed ✓' : 'Mark as Done'}</span>
          </button>
        </div>
      </div>

      {/* All Course Content is 100% Free for Everyone */}
      <div
        className={`flex rounded-2xl p-1.5 border shadow-sm ${
          isDark ? 'bg-[#1D2536] border-[#2C374D]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
        }`}
      >
        <button
          onClick={() => setActiveMode('theory')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeMode === 'theory'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:text-white'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'hi' ? '1. विस्तृत थ्योरी (400+ शब्द)' : '1. In-Depth Theory'}</span>
        </button>

        <button
          onClick={() => setActiveMode('practical')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeMode === 'practical'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:text-white'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>{lang === 'hi' ? '2. प्रैक्टिकल लैब (Code)' : '2. Practical Coding'}</span>
        </button>

        <button
          onClick={() => setActiveMode('quiz')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeMode === 'quiz'
              ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:text-white'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{lang === 'hi' ? '3. 40 प्रश्नों का टेस्ट' : '3. 40-Q Test'}</span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] bg-black/20 text-white font-bold">
            {lang === 'hi' ? '20 सरल + 20 कठिन' : '20 Easy + 20 Hard'}
          </span>
        </button>
      </div>

      {/* Mode 1: Detailed Structured Theory (400+ Words) */}
      {activeMode === 'theory' && (
        <div className="space-y-6">
          {/* Main Structured Reading Card */}
          <div
            className={`rounded-3xl p-6 sm:p-9 border shadow-sm space-y-6 ${
              isDark
                ? 'bg-[#1D2536] border-[#2C374D]'
                : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? 'संपूर्ण एवं सरल थ्योरी (Complete Structured Theory)' : 'In-Depth Conceptual Theory'}
                </h2>
                <span className="text-xs text-slate-400">400+ {lang === 'hi' ? 'शब्द • बच्चों जैसी सरल भाषा में' : 'words • Easy conceptual breakdown'}</span>
              </div>
            </div>

            <div
              className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans ${
                isDark ? 'text-slate-200' : 'text-slate-900 font-medium'
              }`}
            >
              {lang === 'hi' ? topic.explanationHi : topic.explanationEn}
            </div>
          </div>

          {/* Real-Life Analogy Box */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-md flex items-start gap-4 ${
              isDark
                ? 'bg-blue-950/20 border-blue-900/40 text-blue-100'
                : 'bg-blue-50/70 border-blue-200 text-slate-900'
            }`}
          >
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500 font-bold">
                {lang === 'hi' ? 'दैनिक जीवन का मजेदार उदाहरण (Fun Real-Life Analogy)' : 'Real-Life Everyday Analogy'}
              </h3>
              <p className={`text-sm sm:text-base font-semibold leading-relaxed ${
                isDark ? 'text-blue-100' : 'text-slate-900'
              }`}>
                {lang === 'hi' ? topic.realLifeAnalogy.hi : topic.realLifeAnalogy.en}
              </p>
            </div>
          </div>

          {/* Golden Rules & Pitfalls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Golden Rules */}
            <div
              className={`rounded-3xl p-6 sm:p-7 border shadow-sm space-y-3 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <Award className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {lang === 'hi' ? 'महत्वपूर्ण नियम (Key Principles)' : 'Key Rules & Best Practices'}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {(lang === 'hi' ? topic.keyPoints.hi : topic.keyPoints.en).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-900 font-medium'}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfalls */}
            <div
              className={`rounded-3xl p-6 sm:p-7 border shadow-sm space-y-3 ${
                isDark
                  ? 'bg-rose-950/20 border-rose-900/30'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {lang === 'hi' ? 'सामान्य गलतियां (Pitfalls to Avoid)' : 'Common Pitfalls & Bugs'}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {(lang === 'hi' ? topic.commonPitfalls.hi : topic.commonPitfalls.en).map((pit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">⚠</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-900 font-medium'}>{pit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Hands-on Practical Coding */}
      {activeMode === 'practical' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'प्रैक्टिकल कोडिंग लैब (Hands-On Practical Lab)' : 'Practical Coding Lab'}
            </h2>
            <span className="text-xs text-slate-400">
              {topic.codeExamples.length} Runnable Programs
            </span>
          </div>

          {topic.codeExamples.map((ex, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-slate-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono font-bold text-cyan-300 ml-2">
                    {lang === 'hi' ? ex.titleHindi : ex.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(ex.code, idx)}
                    className="p-1.5 px-2.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenInCompiler(ex.code)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-all hover:scale-105"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{lang === 'hi' ? 'कंपाइलर में चलाएं' : 'Run in Playground'}</span>
                  </button>
                </div>
              </div>

              {/* Code */}
              <pre className="p-5 text-xs sm:text-sm font-mono text-cyan-100 overflow-x-auto leading-relaxed">
                <code>{ex.code}</code>
              </pre>

              {/* Expected Output */}
              <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-900/40 text-xs font-mono">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Expected Output:
                </div>
                <div className="text-slate-300 whitespace-pre-line">{ex.output}</div>
              </div>

              {/* Logic Explanation */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/60 text-xs font-sans text-slate-300 leading-relaxed">
                💡 <strong className="text-cyan-400">{lang === 'hi' ? 'लॉजिक समझें:' : 'Logic Breakdown:'}</strong>{' '}
                {lang === 'hi' ? ex.explanationHindi : ex.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 3: 40 Questions Topic Test (20 Easy + 20 Hard) */}
      {activeMode === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Control Banner */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-5 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'hi' ? '40 प्रश्नों का संपूर्ण टॉपिक टेस्ट' : '40-Question Topic Mastery Test'}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'hi'
                    ? '20 सरल बुनियादी प्रश्न और 20 कठिन एडवांस प्रश्न शामिल हैं।'
                    : '20 Easy/Fundamental questions and 20 Hard/Advanced tricky questions.'}
                </p>
              </div>

              {/* Difficulty Filter Tabs */}
              <div
                className={`flex items-center rounded-xl p-1 border text-xs font-bold ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  onClick={() => { setDifficultyFilter('all'); setCurrentQIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    difficultyFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {lang === 'hi' ? 'सभी 40' : 'All 40'}
                </button>

                <button
                  onClick={() => { setDifficultyFilter('easy'); setCurrentQIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    difficultyFilter === 'easy'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {lang === 'hi' ? '🟢 20 सरल' : '🟢 20 Easy'}
                </button>

                <button
                  onClick={() => { setDifficultyFilter('hard'); setCurrentQIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    difficultyFilter === 'hard'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {lang === 'hi' ? '🔴 20 कठिन' : '🔴 20 Hard'}
                </button>
              </div>
            </div>

            {/* Question Quick-Jump Grid (1 to 40) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>{lang === 'hi' ? 'प्रश्न नेविगेटर:' : 'Question Navigator:'}</span>
                <span>
                  {Object.keys(userAnswers).length} of {activeQuestions.length} answered
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                {activeQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCorrect = userAnswers[q.id] === q.correctIndex;

                  let styleClass = isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600';

                  if (isAnswered) {
                    styleClass = 'bg-blue-600 text-white border-blue-500 shadow-xs';
                  }

                  if (isQuizSubmitted) {
                    if (isCorrect) {
                      styleClass = 'bg-emerald-600 text-white border-emerald-500';
                    } else {
                      styleClass = 'bg-rose-600 text-white border-rose-500';
                    }
                  }

                  if (isCurrent) {
                    styleClass += ' ring-2 ring-cyan-400 scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all ${styleClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Question Display */}
          {!isQuizSubmitted ? (
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-6 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Question {currentQIndex + 1} of {activeQuestions.length}
                </span>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    currentQ?.difficulty === 'easy'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {currentQ?.difficulty === 'easy'
                    ? lang === 'hi' ? '🟢 सरल (Easy)' : '🟢 Easy'
                    : lang === 'hi' ? '🔴 कठिन (Hard)' : '🔴 Hard'}
                </span>
              </div>

              {/* Question Text */}
              <h3 className={`text-base sm:text-lg font-bold leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'hi' ? currentQ?.questionHindi : currentQ?.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ?.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-[1.01]'
                          : isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'border-white bg-white text-blue-600' : 'border-slate-500 text-slate-400'
                        }`}
                      >
                        {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Controls: Prev, Next, Submit */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all disabled:opacity-30 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'पिछला' : 'Previous'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex < activeQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex((prev) => prev + 1)}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105"
                    >
                      <span>{lang === 'hi' ? 'अगला' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-all hover:scale-105"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'टेस्ट सबमिट करें' : 'Finish & Submit'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div
              className={`rounded-3xl p-6 sm:p-9 border shadow-xl text-center space-y-6 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center font-bold text-3xl shadow-lg bg-gradient-to-tr from-blue-600 to-cyan-400 text-white">
                🏆
              </div>

              <div>
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? 'टॉपिक टेस्ट का परिणाम' : 'Topic Test Results'}
                </h2>
                <p className="text-sm mt-1 text-slate-400">
                  {totalCorrect >= Math.round(activeQuestions.length * 0.6)
                    ? (lang === 'hi' ? 'बधाई! आपने इस टॉपिक में शानदार महारत हासिल की है।' : 'Congratulations! You mastered this topic.')
                    : (lang === 'hi' ? 'अच्छा प्रयास! नीचे दिए गए हल देखकर दोबारा प्रयास करें।' : 'Good attempt! Review the answers and retry.')}
                </p>
              </div>

              <div
                className={`p-6 rounded-3xl border max-w-sm mx-auto flex items-center justify-around ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Total Score</div>
                  <div className="text-3xl font-extrabold text-blue-500">
                    {totalCorrect} / {activeQuestions.length}
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-300 dark:bg-slate-700" />
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Percentage</div>
                  <div className="text-3xl font-extrabold text-cyan-400">
                    {Math.round((totalCorrect / activeQuestions.length) * 100)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-semibold hover:opacity-90 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'पुनः टेस्ट दें' : 'Retake Quiz'}</span>
                </button>

                <button
                  onClick={() => setActiveMode('theory')}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-105"
                >
                  <span>{lang === 'hi' ? 'थ्योरी दोहराएं' : 'Review Theory'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
