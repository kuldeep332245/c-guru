import React, { useState } from 'react';
import {
  Code,
  Terminal,
  GitBranch,
  Copy,
  Check,
  Search,
  Sparkles,
  Zap,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { CLASSIC_PROGRAMS } from '../data/classicPrograms';
import { ClassicProgram } from '../types';

interface ProgramsLabProps {
  isDark: boolean;
  lang: 'hi' | 'en';
  onOpenInCompiler: (code: string) => void;
  onGoToFlowchart: (flowchartId: string) => void;
}

export const ProgramsLab: React.FC<ProgramsLabProps> = ({
  isDark,
  lang,
  onOpenInCompiler,
  onGoToFlowchart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProgramId, setActiveProgramId] = useState<string>(
    CLASSIC_PROGRAMS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    'All',
    'Series',
    'Primes & Factors',
    'Number Logic',
    'Patterns',
    'Math & Algorithms'
  ];

  const filtered = CLASSIC_PROGRAMS.filter((p) => {
    const matchCat =
      selectedCategory === 'All' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.titleHindi.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const activeProgram: ClassicProgram =
    CLASSIC_PROGRAMS.find((p) => p.id === activeProgramId) ||
    CLASSIC_PROGRAMS[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
              <Code className="w-5 h-5" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'क्लासिक C प्रोग्राम्स & सीरीज लैब' : 'Classic C Programs & Series Lab'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
            {lang === 'hi'
              ? 'Fibonacci series, Prime/Non-Prime, Even/Odd, Palindrome, Armstrong, Patterns सब एक जगह!'
              : 'Master essential C interview programs: Fibonacci series, Primes, Even/Odd, Palindromes, Armstrong, and Star Patterns.'}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'प्रोग्राम खोजें...' : 'Search programs...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isDark
                ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Split: Program list on left, detailed editor & explanation on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Program Cards */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const active = item.id === activeProgram.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveProgramId(item.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                  active
                    ? isDark
                      ? 'bg-slate-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                      : 'bg-blue-50/80 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                    : isDark
                    ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${active ? 'text-blue-500' : 'text-slate-400'}`}>
                    {item.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    active
                      ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                      : 'border-slate-700/60 text-slate-400'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm font-bold ${
                  active ? (isDark ? 'text-white' : 'text-blue-900') : (isDark ? 'text-slate-200' : 'text-slate-800')
                }`}>
                  {lang === 'hi' ? item.titleHindi : item.title}
                </div>
                <p className="text-[11px] line-clamp-1 opacity-75 text-slate-400">
                  {lang === 'hi' ? item.descriptionHindi : item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Active Program Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-5 transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header with actions */}
            <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {activeProgram.category}
                  </span>
                  <span className="text-xs text-slate-400">Difficulty: {activeProgram.difficulty}</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? activeProgram.titleHindi : activeProgram.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {activeProgram.flowchartId && (
                  <button
                    onClick={() => onGoToFlowchart(activeProgram.flowchartId!)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105 ${
                      isDark
                        ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
                        : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    }`}
                    title="View visual flowchart"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'फ्लोचार्ट देखें' : 'View Flowchart'}</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenInCompiler(activeProgram.code)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:opacity-95 hover:scale-105"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'कंपाइलर में चलाएं' : 'Run in Playground'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {lang === 'hi' ? activeProgram.descriptionHindi : activeProgram.description}
            </p>

            {/* Core Logic Bullets */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अल्गोरिदम का मुख्य लॉजिक (Key Logic):' : 'Key Algorithm Logic:'}</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm pl-2">
                {(lang === 'hi' ? activeProgram.logicPoints.hi : activeProgram.logicPoints.en).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Box */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg bg-[#070A12]">
              <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono font-bold text-slate-300 ml-2">solution.c</span>
                </div>

                <button
                  onClick={() => handleCopy(activeProgram.code)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{activeProgram.code}</code>
              </pre>

              {/* Expected Output */}
              <div className="px-4 py-3 border-t border-slate-800/80 bg-slate-950/90 text-xs font-mono">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Expected Output:
                </div>
                <div className="text-slate-300 whitespace-pre-line">{activeProgram.output}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
