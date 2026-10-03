import React, { useState } from 'react';
import {
  Bug,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Award
} from 'lucide-react';
import { BUG_QUESTIONS } from '../data/bugQuestions';
import { BugQuestion, UserProgress } from '../types';

interface BugHunterProps {
  isDark: boolean;
  lang: 'hi' | 'en';
  userProgress: UserProgress;
  onBugSolved: (bugId: string) => void;
  onOpenInCompiler: (code: string) => void;
}

export const BugHunter: React.FC<BugHunterProps> = ({
  isDark,
  lang,
  userProgress,
  onBugSolved,
  onOpenInCompiler
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeBugId, setActiveBugId] = useState<string>(BUG_QUESTIONS[0].id);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const activeBug = BUG_QUESTIONS.find((b) => b.id === activeBugId) || BUG_QUESTIONS[0];
  const isAlreadySolved = userProgress.bugsSolvedIds.includes(activeBug.id);

  const filteredBugs = BUG_QUESTIONS.filter((b) => {
    if (selectedDifficulty === 'All') return true;
    return b.difficulty === selectedDifficulty;
  });

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === activeBug.correctOptionIndex) {
      onBugSolved(activeBug.id);
    }
  };

  const handleSwitchBug = (bug: BugQuestion) => {
    setActiveBugId(bug.id);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const solvedCount = userProgress.bugsSolvedIds.length;
  const isCorrect = selectedOption === activeBug.correctOptionIndex;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 text-white shadow-md">
              <Bug className="w-5 h-5" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'एरर ढूंढो (Spot the Bug Challenge)' : 'Spot the Bug & Debugging Challenges'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
            {lang === 'hi'
              ? 'असली C प्रोग्राम्स में होने वाली गलतियों को पहचानें और एक प्रो प्रोग्रामर बनें!'
              : 'Analyze buggy C snippets, diagnose compilation & runtime bugs, and master debugging.'}
          </p>
        </div>

        {/* Progress Badge */}
        <div
          className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <Award className="w-5 h-5 text-rose-500" />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Bugs Solved
            </div>
            <div className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {solvedCount} / {BUG_QUESTIONS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Bug list + Bug detective panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Bug list with difficulty tabs */}
        <div className="lg:col-span-4 space-y-3">
          {/* Difficulty filter */}
          <div
            className={`flex rounded-2xl p-1 border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>

          {/* Bug questions cards */}
          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredBugs.map((b, idx) => {
              const active = b.id === activeBug.id;
              const solved = userProgress.bugsSolvedIds.includes(b.id);

              return (
                <button
                  key={b.id}
                  onClick={() => handleSwitchBug(b)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    active
                      ? isDark
                        ? 'bg-slate-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                        : 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                      : isDark
                      ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    {solved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bug className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-bold truncate ${
                      active ? (isDark ? 'text-white' : 'text-blue-900') : (isDark ? 'text-slate-200' : 'text-slate-800')
                    }`}>
                      {idx + 1}. {lang === 'hi' ? b.titleHindi : b.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="font-semibold">{b.difficulty}</span>
                      <span>•</span>
                      <span>{b.bugType}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Active Bug Detective Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-5 transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {activeBug.difficulty}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  isDark ? 'border-slate-800 text-slate-300 bg-slate-950/50' : 'border-slate-200 text-slate-600 bg-slate-50'
                }`}>
                  Type: {activeBug.bugType}
                </span>
              </div>

              {isAlreadySolved && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Solved
                </span>
              )}
            </div>

            <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? activeBug.titleHindi : activeBug.title}
            </h2>

            {/* Buggy Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Bug className="w-3.5 h-3.5" />
                  <span>Buggy Code: Find the flaw</span>
                </span>
                <button
                  onClick={() => onOpenInCompiler(activeBug.buggyCode)}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Test in Playground</span>
                </button>
              </div>

              <div className="rounded-2xl border border-rose-900/40 bg-[#070A12] overflow-hidden shadow-inner">
                <pre className="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{activeBug.buggyCode}</code>
                </pre>
              </div>
            </div>

            {/* Hint Box Toggle */}
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-semibold flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHint ? (lang === 'hi' ? 'Hint छुपाएं' : 'Hide Hint') : (lang === 'hi' ? '💡 सरल हिंट देखें' : '💡 Need a Hint?')}</span>
              </button>

              {showHint && (
                <div
                  className={`mt-2 p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    isDark ? 'bg-blue-950/30 border-blue-500/30 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  {lang === 'hi' ? activeBug.hintHindi : activeBug.hint}
                </div>
              )}
            </div>

            {/* Diagnostic Options */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {lang === 'hi' ? 'इस कोड में असली गड़बड़ क्या है?' : 'Select the true cause of this bug:'}
              </h4>

              <div className="space-y-2">
                {activeBug.options.map((opt, idx) => {
                  let btnClasses = `w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between `;

                  if (selectedOption === idx) {
                    btnClasses += 'border-blue-500 bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30 ';
                  } else {
                    btnClasses += isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 '
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 ';
                  }

                  if (isSubmitted) {
                    if (idx === activeBug.correctOptionIndex) {
                      btnClasses = 'w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500 ';
                    } else if (selectedOption === idx && !isCorrect) {
                      btnClasses = 'w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between border-rose-500 bg-rose-500/20 text-rose-300 ring-1 ring-rose-500 ';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={btnClasses}
                    >
                      <span>{opt}</span>
                      {isSubmitted && idx === activeBug.correctOptionIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selectedOption === idx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit or Next Button */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="w-full py-3 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {lang === 'hi' ? 'गलती कन्फर्म करें (Submit)' : 'Diagnose & Submit'}
              </button>
            ) : (
              /* Solution Explanation Card */
              <div className="space-y-4 pt-2">
                <div
                  className={`p-4 rounded-2xl border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="font-bold text-sm">
                      {isCorrect
                        ? (lang === 'hi' ? 'शानदार! बिल्कुल सही पहचाना!' : 'Spot on! Correct Diagnosis!')
                        : (lang === 'hi' ? 'यह गलत जवाब था!' : 'Not quite right!')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm mt-1 text-slate-300">
                    {lang === 'hi' ? activeBug.explanationHindi : activeBug.explanation}
                  </p>
                </div>

                {/* Fixed Code Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Corrected / Fixed Code:</span>
                    </span>
                    <button
                      onClick={() => onOpenInCompiler(activeBug.fixedCode)}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Run Fixed Code</span>
                    </button>
                  </div>
                  <div className="rounded-2xl border border-emerald-900/40 bg-[#070A12] overflow-hidden shadow-inner">
                    <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-200 overflow-x-auto leading-relaxed">
                      <code>{activeBug.fixedCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
