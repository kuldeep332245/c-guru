import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Search,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Code2,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { Topic, UserProgress } from '../types';
import { C_TOPICS } from '../data/cTopics';
import { TopicDetailView } from './TopicDetailView';

interface TutorialViewerProps {
  currentTopic: Topic;
  onSelectTopic: (topic: Topic) => void;
  lang: 'hi' | 'en';
  isDark: boolean;
  userProgress: UserProgress;
  onToggleComplete: (topicId: string) => void;
  onToggleBookmark: (topicId: string) => void;
  onOpenInCompiler: (code: string) => void;
  onRecordQuizScore: (topicId: string, score: number, total: number) => void;
}

export const TutorialViewer: React.FC<TutorialViewerProps> = ({
  currentTopic,
  onSelectTopic,
  lang,
  isDark,
  userProgress,
  onToggleComplete,
  onToggleBookmark,
  onOpenInCompiler,
  onRecordQuizScore
}) => {
  // If activeTopicOpened is true, we show the dedicated TopicDetailView
  const [activeTopicOpened, setActiveTopicOpened] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Basics',
    'Control Flow',
    'Functions & Pointers',
    'Data Structures',
    'Memory & Files'
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

  const handleOpenTopic = (t: Topic) => {
    onSelectTopic(t);
    setActiveTopicOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a topic is opened in detail view:
  if (activeTopicOpened) {
    return (
      <TopicDetailView
        topic={currentTopic}
        onBack={() => setActiveTopicOpened(false)}
        lang={lang}
        isDark={isDark}
        userProgress={userProgress}
        onToggleComplete={onToggleComplete}
        onToggleBookmark={onToggleBookmark}
        onOpenInCompiler={onOpenInCompiler}
        onRecordQuizScore={onRecordQuizScore}
      />
    );
  }

  // Otherwise, show the Topic Explorer Catalog
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
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'C प्रोग्रामिंग विषय सूची (0 से File Handling)' : 'Complete C Language Curriculum'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
            {lang === 'hi'
              ? 'किसी भी टॉपिक पर क्लिक करें - अंदर विस्तृत थ्योरी, प्रैक्टिकल कोडिंग और 40 प्रश्नों का टेस्ट मिलेगा!'
              : 'Click any topic to open its dedicated learning space with theory, hands-on practicals, and 40-question quiz!'}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'टॉपिक खोजें...' : 'Search curriculum...'}
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

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const isDone = userProgress.completedTopicIds.includes(topic.id);
          const quizScore = userProgress.quizScores[topic.id];

          return (
            <div
              key={topic.id}
              onClick={() => handleOpenTopic(topic)}
              className={`rounded-2xl p-6 border shadow-sm transition-all hover:shadow-xl hover:scale-[1.01] cursor-pointer flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              } ${isDone ? 'ring-1 ring-emerald-500/30' : ''}`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Module {topic.order}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {isDone ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{topic.readTimeMinutes} min</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                  isDark
                    ? 'text-slate-100 group-hover:text-blue-400'
                    : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {lang === 'hi' ? topic.titleHindi : topic.title}
                </h3>

                {/* Summary */}
                <p className="text-xs line-clamp-2 leading-relaxed text-slate-400">
                  {lang === 'hi' ? topic.summaryHindi : topic.summary}
                </p>

                {/* Badges: Theory, Practical, 40-Q Quiz */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded-md border border-slate-700/60 bg-slate-800/40 text-slate-300 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                    <span>थ्योरी</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md border border-slate-700/60 bg-slate-800/40 text-slate-300 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-emerald-400" />
                    <span>प्रैक्टिकल</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>40 प्रश्न टेस्ट</span>
                  </span>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className={`pt-4 border-t mt-4 flex items-center justify-between ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <span className="text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>{lang === 'hi' ? 'टॉपिक खोलें' : 'Open Topic'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {quizScore && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    Quiz: {quizScore.score}/{quizScore.total}
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
