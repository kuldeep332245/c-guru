import React, { useState } from 'react';
import {
  BookMarked,
  Copy,
  Check,
  Search,
  Terminal,
  FileCode,
  Info,
  Layers
} from 'lucide-react';
import { C_SYNTAX_DATA } from '../data/cSyntax';
import { SyntaxItem } from '../types';

interface SyntaxGuideProps {
  isDark: boolean;
  lang: 'hi' | 'en';
  onOpenInCompiler: (code: string) => void;
}

export const SyntaxGuide: React.FC<SyntaxGuideProps> = ({
  isDark,
  lang,
  onOpenInCompiler
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Basics',
    'Conditionals',
    'Loops',
    'Functions',
    'Pointers',
    'Structures',
    'Memory & Files'
  ];

  const filtered = C_SYNTAX_DATA.filter((item) => {
    const matchCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      item.titleHindi.toLowerCase().includes(q) ||
      item.syntaxTemplate.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md">
              <BookMarked className="w-5 h-5" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'C सिंटैक्स चीट-शीट & रेफरेंस गाइड' : 'Complete C Syntax Cheat Sheet & Rules'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
            {lang === 'hi'
              ? 'Variables, if-else, switch, loops, functions, pointers से लेकर files तक के सभी syntaxes एक जगह!'
              : 'Quick reference for syntax rules, templates, format specifiers, and boilerplate patterns in C.'}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'Syntax खोजें (e.g. pointer, loop)...' : 'Search syntax...'}
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

      {/* Syntax Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-6 border shadow-lg space-y-4 flex flex-col justify-between transition-all hover:shadow-xl ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.category}
                </span>

                <button
                  onClick={() => handleCopy(item.syntaxTemplate, item.id)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors"
                  title="Copy syntax template"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'hi' ? item.titleHindi : item.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-400">
                {lang === 'hi' ? item.descriptionHindi : item.description}
              </p>

              {/* Syntax Blueprint Box */}
              <div className="rounded-2xl border border-blue-500/20 bg-slate-950/90 overflow-hidden shadow-inner">
                <div className="px-3.5 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-blue-500/20">
                  <Layers className="w-3 h-3" />
                  <span>Syntax Blueprint (Template)</span>
                </div>
                <pre className="p-3.5 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  <code>{item.syntaxTemplate}</code>
                </pre>
              </div>

              {/* Working Example */}
              <div className="rounded-2xl border border-slate-800 bg-[#070A12] overflow-hidden shadow-inner">
                <div className="px-3.5 py-1.5 bg-slate-900/60 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider border-b border-slate-800/80">
                  Real C Example
                </div>
                <pre className="p-3.5 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  <code>{item.exampleSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Run Example Button */}
            <div className={`pt-3 border-t flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <button
                onClick={() => onOpenInCompiler(item.exampleSnippet)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'Compiler में टेस्ट करें' : 'Test in Playground'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
