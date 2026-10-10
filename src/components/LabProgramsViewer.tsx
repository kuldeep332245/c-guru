import React, { useState, useMemo } from 'react';
import {
  FileCode2,
  Search,
  BookOpen,
  Code2,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award,
  ChevronRight,
  ChevronDown,
  Layers,
  FlaskConical,
  Play
} from 'lucide-react';
import { LAB_QUESTIONS } from '../data/labQuestions';
import { LabQuestion } from '../types';

interface LabProgramsViewerProps {
  isDark: boolean;
  lang: string;
  onOpenInCompiler: (code: string) => void;
  initialQuestionId?: string;
}

export const LabProgramsViewer: React.FC<LabProgramsViewerProps> = ({
  isDark,
  lang,
  onOpenInCompiler,
  initialQuestionId
}) => {
  const isHindi = lang !== 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>(
    initialQuestionId || LAB_QUESTIONS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedViva, setExpandedViva] = useState<Record<number, boolean>>({ 0: true });

  const categories = useMemo(() => {
    const set = new Set<string>();
    LAB_QUESTIONS.forEach((q) => set.add(q.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredQuestions = useMemo(() => {
    return LAB_QUESTIONS.filter((q) => {
      const matchCat =
        selectedCategory === 'All' || q.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.titleHindi.toLowerCase().includes(query) ||
        q.objective.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query) ||
        String(q.number) === query;
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeQuestion: LabQuestion = useMemo(() => {
    const found = LAB_QUESTIONS.find((q) => q.id === selectedId);
    return found || filteredQuestions[0] || LAB_QUESTIONS[0];
  }, [selectedId, filteredQuestions]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeQuestion.cCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleViva = (index: number) => {
    setExpandedViva((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Banner / Header */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-[#182030] to-blue-950/40 border-slate-800'
            : 'bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border-blue-100'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>
                {isHindi
                  ? 'यूनिवर्सिटी C प्रोग्रामिंग प्रैक्टिकल लैब मैनुअल'
                  : 'University C Programming Practical Lab Manual'}
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isHindi
                ? 'प्रैक्टिकल लैब प्रश्न एवं संपूर्ण थ्योरी'
                : 'C Programming Lab Questions & Complete Theory'}
            </h1>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {isHindi
                ? 'कॉलेज व यूनिवर्सिटी परीक्षाओं के सभी मुख्य लैब प्रोग्राम्स — विस्तृत थ्योरी, लॉजिक, एल्गोरिदम, C कोड एवं वाइवा (Viva) प्रश्नों के साथ तैयार।'
                : 'Complete collection of university lab questions formatted with detailed conceptual theory, line-by-line logic breakdown, ANSI C source code, and oral viva voce examination Q&A.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`px-4 py-3 rounded-2xl border text-center ${
                isDark
                  ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}
            >
              <div className="text-2xl font-black text-blue-500">
                {LAB_QUESTIONS.length}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isHindi ? 'लैब प्रश्न' : 'Lab Programs'}
              </div>
            </div>

            <div
              className={`px-4 py-3 rounded-2xl border text-center ${
                isDark
                  ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}
            >
              <div className="text-2xl font-black text-emerald-500">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isHindi ? 'सॉल्यूशंस' : 'With Viva'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHindi
                  ? 'लैब प्रश्न या टॉपिक खोजें (उदा: Matrix, Factorial, Prime)...'
                  : 'Search lab questions (e.g., Matrix, Factorial, Prime)...'
              }
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm outline-none transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-blue-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-xs'
              }`}
            />
          </div>

          <span className="text-xs text-slate-400 font-medium">
            {isHindi
              ? `${filteredQuestions.length} प्रश्न उपलब्ध`
              : `${filteredQuestions.length} Questions Available`}
          </span>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102'
                    : isDark
                    ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {cat === 'All' ? (isHindi ? 'सभी टॉपिक्स' : 'All Topics') : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Index List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              {isHindi ? 'प्रैक्टिकल इंडेक्स' : 'Practical Syllabus List'}
            </span>
            <span className="text-[11px] text-slate-400">
              #{activeQuestion.number} of {LAB_QUESTIONS.length}
            </span>
          </div>

          <div
            className={`rounded-2xl border p-2 max-h-[750px] overflow-y-auto space-y-1.5 ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {filteredQuestions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                {isHindi ? 'कोई प्रश्न नहीं मिला।' : 'No matching questions found.'}
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isSelected = q.id === activeQuestion.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedId(q.id);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? isDark
                          ? 'bg-blue-600/15 border-blue-500/50 text-white shadow-sm ring-1 ring-blue-500/30'
                          : 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm ring-1 ring-blue-400/30'
                        : isDark
                        ? 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-xs'
                          : isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {q.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 truncate">
                          {q.category}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                            q.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isDark ? 'text-white' : 'text-black'}`}>
                        {isHindi ? q.titleHindi : q.title}
                      </h4>
                      <p className={`text-[11px] truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>
                        {isHindi ? q.objectiveHindi : q.objective}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                        isSelected ? 'text-blue-500 translate-x-0.5' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Deep Structured Theory & Code (Same style as notes!) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Card */}
          <div
            className={`rounded-3xl p-6 sm:p-9 border shadow-xl space-y-6 ${
              isDark
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200 shadow-md'
            }`}
          >
            {/* Header / Question Title */}
            <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-blue-600 text-white shadow-xs">
                    LAB #{activeQuestion.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {activeQuestion.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenInCompiler(activeQuestion.cCode)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 transition-all hover:scale-102"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isHindi ? 'कंपाइलर में चलाएं' : 'Run in Compiler'}</span>
                  </button>
                </div>
              </div>

              <h2
                className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {isHindi ? activeQuestion.titleHindi : activeQuestion.title}
              </h2>

              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  isDark
                    ? 'bg-blue-950/20 border-blue-900/40 text-blue-100'
                    : 'bg-blue-50/80 border-blue-200 text-black font-medium'
                }`}
              >
                <div className="font-bold text-[11px] uppercase tracking-wider text-blue-500 mb-1">
                  {isHindi ? 'समस्या एवं उद्देश्य (Problem Statement):' : 'Objective & Problem Statement:'}
                </div>
                {isHindi ? activeQuestion.objectiveHindi : activeQuestion.objective}
              </div>
            </div>

            {/* Section 1: Detailed Structured Theory (Just like the theory notes!) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-500">
                <BookOpen className="w-5 h-5 shrink-0" />
                <h3
                  className={`text-lg font-extrabold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isHindi
                    ? '1. विस्तृत थ्योरी एवं लॉजिक व्याख्या (Theory & Concept)'
                    : '1. In-Depth Conceptual Theory & Logic Breakdown'}
                </h3>
              </div>

              <div
                className={`text-xs sm:text-sm sm:leading-relaxed whitespace-pre-line rounded-2xl p-5 border font-sans ${
                  isDark
                    ? 'bg-slate-950/50 border-slate-800/80 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-black font-medium'
                }`}
              >
                {isHindi
                  ? activeQuestion.theoryExplanationHi
                  : activeQuestion.theoryExplanationEn}
              </div>
            </div>

            {/* Section 2: Algorithm Steps */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-500">
                <Award className="w-5 h-5 shrink-0" />
                <h3
                  className={`text-lg font-extrabold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isHindi
                    ? '2. चरण-दर-चरण एल्गोरिदम (Algorithm)'
                    : '2. Step-by-Step Algorithm'}
                </h3>
              </div>

              <div
                className={`rounded-2xl p-5 border space-y-2 text-xs sm:text-sm ${
                  isDark
                    ? 'bg-slate-950/50 border-slate-800/80 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-black font-medium'
                }`}
              >
                {(isHindi ? activeQuestion.algorithmHi : activeQuestion.algorithmEn).map(
                  (step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Section 3: C Program Source Code (Syntax Block) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Code2 className="w-5 h-5 shrink-0" />
                  <h3
                    className={`text-lg font-extrabold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {isHindi
                      ? '3. संपूर्ण C प्रोग्राम कोड (C Source Code)'
                      : '3. Complete C Program Source Code'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      copied
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'कोड कॉपी करें' : 'Copy Code'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenInCompiler(activeQuestion.cCode)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'कंपाइलर' : 'Compiler'}</span>
                  </button>
                </div>
              </div>

              {/* Code Container */}
              <div className="rounded-2xl border border-slate-800 bg-[#0F141C] overflow-hidden shadow-2xl">
                {/* Window header */}
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-400 ml-2 font-bold">
                      lab_{activeQuestion.id}.c
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    ANSI C Standard (C99/C11)
                  </span>
                </div>

                {/* Preformatted Code */}
                <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200 select-text">
                  <pre>{activeQuestion.cCode}</pre>
                </div>
              </div>
            </div>

            {/* Section 4: Sample Input & Expected Output */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Lightbulb className="w-5 h-5 shrink-0" />
                <h3
                  className={`text-lg font-extrabold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {isHindi
                    ? '4. सैंपल इनपुट एवं अपेक्षित आउटपुट (Sample I/O)'
                    : '4. Sample Input & Expected Output'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input */}
                <div
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
                    {isHindi ? 'इनपुट डेटा (Input):' : 'Input Data:'}
                  </span>
                  <div className={`text-xs font-mono font-bold whitespace-pre-wrap ${isDark ? 'text-slate-200' : 'text-black'}`}>
                    {activeQuestion.sampleInput}
                  </div>
                </div>

                {/* Output */}
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark
                    ? 'border-emerald-900/40 bg-emerald-950/20'
                    : 'border-emerald-300 bg-emerald-50/70'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                    {isHindi ? 'कंसोल आउटपुट (Output):' : 'Console Output:'}
                  </span>
                  <pre className={`text-xs font-mono font-bold whitespace-pre-wrap ${isDark ? 'text-emerald-300' : 'text-emerald-950'}`}>
                    {activeQuestion.sampleOutput}
                  </pre>
                </div>
              </div>
            </div>

            {/* Section 5: Viva Voce Exam Q&A */}
            {activeQuestion.vivaQuestions && activeQuestion.vivaQuestions.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <HelpCircle className="w-5 h-5 shrink-0" />
                    <h3
                      className={`text-lg font-extrabold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {isHindi
                        ? '5. वाइवा / मौखिक परीक्षा प्रश्न (Viva Voce Q&A)'
                        : '5. Viva Voce Examination Questions & Answers'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {activeQuestion.vivaQuestions.length} Questions
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeQuestion.vivaQuestions.map((v, idx) => {
                    const isExpanded = !!expandedViva[idx];
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all ${
                          isDark
                            ? 'bg-slate-950/50 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <button
                          onClick={() => toggleViva(idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                              Q{idx + 1}
                            </span>
                            <span className={isDark ? 'text-white' : 'text-black font-bold'}>
                              {isHindi ? v.qHi : v.qEn}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div
                            className={`px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                              isDark
                                ? 'border-slate-800/80 text-slate-200'
                                : 'border-slate-200 text-black font-medium'
                            }`}
                          >
                            <div className="font-bold text-[10px] uppercase tracking-wider text-emerald-500 mb-1">
                              {isHindi ? 'सटीक उत्तर (Answer):' : 'Model Answer:'}
                            </div>
                            {isHindi ? v.aHi : v.aEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
