import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Search,
  ArrowRight,
  HelpCircle,
  Code2,
  Layers,
  FileText
} from 'lucide-react';
import { Topic, UserProgress } from '../types';
import { C_TOPICS } from '../data/cTopics';

interface AllTopicsDirectoryProps {
  onSelectTopic: (topic: Topic) => void;
  lang: 'hi' | 'en';
  isDark: boolean;
  userProgress: UserProgress;
}

export const AllTopicsDirectory: React.FC<AllTopicsDirectoryProps> = ({
  onSelectTopic,
  lang,
  isDark,
  userProgress
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', labelEn: 'All Topics (14)', labelHi: 'सभी विषय (14)' },
    { id: 'Basics', labelEn: 'Level 0 Basics', labelHi: 'लेवल 0: बुनियादी' },
    { id: 'Control Flow', labelEn: 'Control & Loops', labelHi: 'कंडीशन्स और लूप्स' },
    { id: 'Functions & Pointers', labelEn: 'Functions & Pointers', labelHi: 'फंक्शंस और पॉइंटर्स' },
    { id: 'Data Structures', labelEn: 'Arrays & Structures', labelHi: 'ऐरे, स्ट्रिंग्स व स्ट्रक्चर' },
    { id: 'Memory & Files', labelEn: 'Memory & File Handling', labelHi: 'मेमोरी व फाइल हैंडलिंग' }
  ];

  const filteredTopics = C_TOPICS.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.title.toLowerCase().includes(q) ||
      t.titleHindi.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border-slate-800'
            : 'bg-gradient-to-r from-blue-50/60 via-indigo-50/30 to-white border-slate-200'
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'C प्रोग्रामिंग के सभी विषय (Curriculum)' : 'C Programming Full Curriculum'}
            </h1>
          </div>
          <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'hi'
              ? 'प्रत्येक टॉपिक में 400+ शब्दों की सरल थ्योरी, प्रैक्टिकल कोडिंग और 40 प्रश्नों का टेस्ट (20 सरल + 20 कठिन) शामिल है।'
              : 'Complete zero to file handling curriculum with 400+ words structured theory, interactive code, and 40-Q mastery tests.'}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'कोई भी टॉपिक खोजें...' : 'Search curriculum...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {lang === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Grid of All Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const isDone = userProgress.completedTopicIds.includes(topic.id);
          const score = userProgress.quizScores[topic.id];

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className={`rounded-3xl p-6 border transition-all hover:shadow-xl hover:scale-[1.01] cursor-pointer flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/70 border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900'
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
              } ${isDone ? (isDark ? 'border-emerald-500/30' : 'border-emerald-300') : ''}`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Module {topic.order}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {topic.category}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'पूर्ण' : 'Done'}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{topic.readTimeMinutes} min</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`text-base sm:text-lg font-bold group-hover:text-blue-400 transition-colors ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {lang === 'hi' ? topic.titleHindi : topic.title}
                </h3>

                {/* Summary */}
                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'hi' ? topic.summaryHindi : topic.summary}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px] font-bold">
                  <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}>
                    <FileText className="w-3 h-3 text-cyan-400" />
                    <span>400+ शब्द</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}>
                    <Code2 className="w-3 h-3 text-emerald-400" />
                    <span>प्रैक्टिकल कोड</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-blue-200 bg-blue-50 text-blue-600'
                  }`}>
                    <HelpCircle className="w-3 h-3" />
                    <span>40 प्रश्न टेस्ट</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div
                className={`pt-5 border-t mt-4 flex items-center justify-between ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <span className="text-xs font-bold text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>{lang === 'hi' ? 'यह विषय पढ़ें' : 'Open Topic'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {score && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Quiz: {score.percentage}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
