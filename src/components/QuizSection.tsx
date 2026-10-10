import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { C_TOPICS } from '../data/cTopics';
import { Topic, QuizQuestion, UserProgress } from '../types';

interface QuizSectionProps {
  isDark: boolean;
  lang: 'hi' | 'en';
  userProgress: UserProgress;
  onRecordScore: (topicId: string, score: number, total: number) => void;
  onGoToTopic: (topic: Topic) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  isDark,
  lang,
  userProgress,
  onRecordScore,
  onGoToTopic
}) => {
  // Can be a specific topic or 'grand-test'
  const [activeQuizMode, setActiveQuizMode] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Generate Grand Test questions (sample from multiple topics)
  const grandTestQuestions: QuizQuestion[] = C_TOPICS.flatMap((t) => t.quiz).slice(0, 15);

  const activeTopic = C_TOPICS.find((t) => t.id === activeQuizMode);
  const currentQuestions = activeQuizMode === 'grand'
    ? grandTestQuestions
    : (activeTopic?.quiz || []);

  const handleStartTopicQuiz = (topicId: string) => {
    setActiveQuizMode(topicId);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const handleStartGrandTest = () => {
    setActiveQuizMode('grand');
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      currentQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          score++;
        }
      });
      setIsFinished(true);
      if (activeQuizMode && activeQuizMode !== 'grand') {
        onRecordScore(activeQuizMode, score, currentQuestions.length);
      }
    }
  };

  const currentQ = currentQuestions[currentQIndex];

  // Quiz Results summary
  let totalScore = 0;
  if (isFinished) {
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) totalScore++;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* If no quiz is currently being played, show quiz catalog */}
      {!activeQuizMode ? (
        <div className="space-y-6">
          {/* Header Banner */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg relative overflow-hidden transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'hi' ? 'C प्रोग्रामिंग टेस्ट & क्विज़' : 'C Language Quizzes & Tests'}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
                  {lang === 'hi'
                    ? 'हर टॉपिक का टेस्ट देकर अपनी तैयारी जांचें या 15 सवालों का ग्रैंड टेस्ट दें!'
                    : 'Take topic-wise quizzes or challenge yourself with the 15-question Comprehensive C Test.'}
                </p>
              </div>

              {/* Grand Test Button */}
              <button
                onClick={handleStartGrandTest}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-105 active:scale-95"
              >
                <Trophy className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ग्रैंड सी टेस्ट शुरू करें (15 Qs)' : 'Start Grand C Test (15 Qs)'}</span>
              </button>
            </div>
          </div>

          {/* Topic Quizzes Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {C_TOPICS.map((topic) => {
              const quizRecord = userProgress.quizScores[topic.id];
              const isPassed = quizRecord && quizRecord.percentage >= 60;

              return (
                <div
                  key={topic.id}
                  className={`rounded-3xl p-5 border shadow-sm transition-all hover:shadow-xl flex flex-col justify-between group ${
                    isDark ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-400">
                        Module {topic.order}
                      </span>
                      {quizRecord ? (
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            isPassed ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                          }`}
                        >
                          Best: {quizRecord.score}/{quizRecord.total} ({quizRecord.percentage}%)
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Not attempted</span>
                      )}
                    </div>

                    <h3 className={`font-bold text-sm transition-colors ${
                      isDark ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {lang === 'hi' ? topic.titleHindi : topic.title}
                    </h3>
                    <p className="text-xs line-clamp-2 text-slate-400">
                      {lang === 'hi' ? topic.summaryHindi : topic.summary}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleStartTopicQuiz(topic.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{quizRecord ? (lang === 'hi' ? 'फिर से टेस्ट दें' : 'Retake') : (lang === 'hi' ? 'टेस्ट दें' : 'Take Quiz')}</span>
                    </button>

                    <button
                      onClick={() => onGoToTopic(topic)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title="Read tutorial"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Quiz Screen */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top navigation row */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveQuizMode(null)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              ← {lang === 'hi' ? 'Quizzes सूची पर वापस जाएं' : 'Back to Quizzes List'}
            </button>

            <span className="text-xs font-mono font-bold text-blue-400">
              Question {currentQIndex + 1} of {currentQuestions.length}
            </span>
          </div>

          {!isFinished ? (
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-lg space-y-6 transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Progress bar */}
              <div className="w-full bg-slate-800/60 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  style={{
                    width: `${((currentQIndex + 1) / currentQuestions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {activeQuizMode === 'grand' ? 'Grand C Exam' : activeTopic?.title}
                </span>
                <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? currentQ?.questionHindi : currentQ?.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ?.options.map((opt, optIdx) => {
                  const isChosen = selectedAnswers[currentQIndex] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerSelect(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isChosen
                          ? 'border-blue-500 bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30 shadow-md scale-[1.01]'
                          : isDark
                          ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isChosen
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-slate-600 text-slate-400'
                        }`}
                      >
                        {isChosen ? '✓' : String.fromCharCode(65 + optIdx)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQIndex] === undefined}
                  className="px-6 py-3 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span>{currentQIndex === currentQuestions.length - 1 ? (lang === 'hi' ? 'सबमिट करें' : 'Finish Quiz') : (lang === 'hi' ? 'अगला सवाल' : 'Next Question')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-lg text-center space-y-6 transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white">
                🏆
              </div>

              <div className="space-y-1">
                <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'hi' ? 'टेस्ट पूरा हुआ!' : 'Quiz Completed!'}
                </h2>
                <p className="text-sm text-slate-400">
                  {Math.round((totalScore / currentQuestions.length) * 100) >= 60
                    ? (lang === 'hi' ? 'शानदार प्रदर्शन! आपने यह टेस्ट पास कर लिया है।' : 'Great job! You passed the test.')
                    : (lang === 'hi' ? 'अच्छा प्रयास! थोड़ी और मेहनत करें और फिर से दें।' : 'Good effort! Review the tutorials and try again.')}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border max-w-sm mx-auto flex items-center justify-around ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Score</div>
                  <div className="text-3xl font-extrabold text-blue-400">
                    {totalScore} / {currentQuestions.length}
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-700/60" />
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Accuracy</div>
                  <div className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {Math.round((totalScore / currentQuestions.length) * 100)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentQIndex(0);
                    setSelectedAnswers({});
                    setIsFinished(false);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all hover:scale-105 ${
                    isDark ? 'border-slate-800 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'दोबारा दें' : 'Retake'}</span>
                </button>

                <button
                  onClick={() => setActiveQuizMode(null)}
                  className="px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-105"
                >
                  <span>{lang === 'hi' ? 'अन्य टेस्ट देखें' : 'More Quizzes'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
