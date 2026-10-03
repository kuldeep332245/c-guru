import React, { useState } from 'react';
import {
  GitBranch,
  Play,
  RotateCcw,
  Terminal,
  Info,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { FLOWCHARTS_DATA } from '../data/flowcharts';
import { FlowchartDiagram, FlowchartNode } from '../types';

interface FlowchartVisualizerProps {
  isDark: boolean;
  lang: 'hi' | 'en';
  onOpenInCompiler: (code: string) => void;
  initialFlowchartId?: string;
}

export const FlowchartVisualizer: React.FC<FlowchartVisualizerProps> = ({
  isDark,
  lang,
  onOpenInCompiler,
  initialFlowchartId
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialFlowchartId || FLOWCHARTS_DATA[0].id
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeDiagram: FlowchartDiagram =
    FLOWCHARTS_DATA.find((f) => f.id === selectedId) || FLOWCHARTS_DATA[0];

  const handleNextStep = () => {
    if (activeStepIndex < activeDiagram.nodes.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      setActiveStepIndex(0); // Loop back
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
  };

  // Helper to render shape styling
  const renderNodeShape = (node: FlowchartNode, index: number) => {
    const isActive = index === activeStepIndex;
    const isPast = index < activeStepIndex;

    let shapeClasses = 'p-3.5 sm:p-4 text-center transition-all duration-300 relative border ';

    if (node.shape === 'oval') {
      shapeClasses += 'rounded-full max-w-[210px] mx-auto ';
      if (isActive) {
        shapeClasses += 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-300 ring-4 ring-blue-500/30 shadow-lg scale-105 ';
      } else if (isPast) {
        shapeClasses += isDark
          ? 'bg-blue-950/40 border-blue-500/50 text-blue-300 '
          : 'bg-blue-50 border-blue-200 text-blue-800 ';
      } else {
        shapeClasses += isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400 '
          : 'bg-white border-slate-200 text-slate-600 ';
      }
    } else if (node.shape === 'diamond') {
      shapeClasses += 'rounded-2xl max-w-[260px] mx-auto shadow-sm ';
      if (isActive) {
        shapeClasses += 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300 ring-4 ring-purple-500/30 shadow-lg scale-105 ';
      } else if (isPast) {
        shapeClasses += isDark
          ? 'bg-purple-950/40 border-purple-500/50 text-purple-300 '
          : 'bg-purple-50 border-purple-200 text-purple-800 ';
      } else {
        shapeClasses += isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400 '
          : 'bg-white border-slate-200 text-slate-600 ';
      }
    } else if (node.shape === 'parallelogram') {
      shapeClasses += 'rounded-xl max-w-[240px] mx-auto skew-x-[-8deg] ';
      if (isActive) {
        shapeClasses += 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white border-cyan-300 ring-4 ring-cyan-500/30 shadow-lg scale-105 ';
      } else if (isPast) {
        shapeClasses += isDark
          ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 '
          : 'bg-cyan-50 border-cyan-200 text-cyan-800 ';
      } else {
        shapeClasses += isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400 '
          : 'bg-white border-slate-200 text-slate-600 ';
      }
    } else {
      // Rectangle (Process)
      shapeClasses += 'rounded-xl max-w-[260px] mx-auto shadow-sm ';
      if (isActive) {
        shapeClasses += 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-blue-300 ring-4 ring-blue-500/30 shadow-lg scale-105 ';
      } else if (isPast) {
        shapeClasses += isDark
          ? 'bg-slate-800/80 border-slate-700 text-slate-200 '
          : 'bg-slate-100 border-slate-300 text-slate-800 ';
      } else {
        shapeClasses += isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400 '
          : 'bg-white border-slate-200 text-slate-600 ';
      }
    }

    return (
      <div key={node.id} className="flex flex-col items-center relative group">
        <div className={shapeClasses}>
          <div className={node.shape === 'parallelogram' ? 'skew-x-[8deg]' : ''}>
            <div className="text-xs sm:text-sm font-extrabold">
              {lang === 'hi' ? node.labelHindi : node.label}
            </div>
            <div className="text-[11px] opacity-80 mt-0.5">
              {lang === 'hi' ? node.detailHindi : node.detail}
            </div>
          </div>
        </div>

        {/* Down Arrow connector if not last */}
        {index < activeDiagram.nodes.length - 1 && (
          <div className="my-2 flex flex-col items-center">
            <div
              className={`w-0.5 h-6 transition-colors duration-300 ${
                isPast ? 'bg-blue-500' : isDark ? 'bg-slate-800' : 'bg-slate-300'
              }`}
            />
            <ArrowDown
              className={`w-4 h-4 -mt-1 transition-colors duration-300 ${
                isPast ? 'text-blue-500' : isDark ? 'text-slate-800' : 'text-slate-300'
              }`}
            />
          </div>
        )}
      </div>
    );
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
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
              <GitBranch className="w-5 h-5" />
            </div>
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'hi' ? 'C प्रोग्राम फ्लोचार्ट (Flowcharts & Visual Logic)' : 'C Programming Interactive Flowcharts'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-11">
            {lang === 'hi'
              ? 'प्रोग्राम के चलने का रास्ता (Flow of Execution) चित्रों के माध्यम से समझें।'
              : 'Understand step-by-step program logic and decision paths visually with real-time execution tracing.'}
          </p>
        </div>

        {/* Flowchart Shapes Legend */}
        <div
          className={`flex flex-wrap items-center gap-2 p-3 rounded-xl border text-[11px] ${
            isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-2.5 rounded-full border border-blue-500 bg-blue-500/20" />
            <span>Oval: Start/Stop</span>
          </div>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-2.5 rounded skew-x-[-8deg] border border-cyan-500 bg-cyan-500/20" />
            <span>Parallelogram: I/O</span>
          </div>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rotate-45 border border-purple-500 bg-purple-500/20" />
            <span>Diamond: Decision</span>
          </div>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-3 rounded border border-indigo-500 bg-indigo-500/20" />
            <span>Rectangle: Process</span>
          </div>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {FLOWCHARTS_DATA.map((fc) => {
          const isSelected = fc.id === activeDiagram.id;
          return (
            <button
              key={fc.id}
              onClick={() => {
                setSelectedId(fc.id);
                setActiveStepIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                  : isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {lang === 'hi' ? fc.titleHindi : fc.title}
            </button>
          );
        })}
      </div>

      {/* Main Split: Interactive Diagram View vs Corresponding C Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Diagram Tree */}
        <div
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-lg space-y-6 flex flex-col justify-between transition-all ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Controls Bar */}
          <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div>
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'hi' ? activeDiagram.titleHindi : activeDiagram.title}
              </h2>
              <p className="text-xs text-slate-400">
                Step {activeStepIndex + 1} of {activeDiagram.nodes.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className={`p-2 rounded-xl border text-xs font-semibold transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="Reset step tracker"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextStep}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:opacity-95 hover:scale-105 active:scale-95"
              >
                <span>{activeStepIndex === activeDiagram.nodes.length - 1 ? 'Start Over' : (lang === 'hi' ? 'अगला कदम (Next)' : 'Next Step')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flowchart Diagram Canvas */}
          <div
            className={`p-6 rounded-2xl border space-y-2 max-h-[550px] overflow-y-auto ${
              isDark ? 'bg-[#070A12] border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {activeDiagram.nodes.map((node, idx) => renderNodeShape(node, idx))}
          </div>

          {/* Current Step Description Card */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-blue-400">
                {lang === 'hi' ? 'इस कदम पर क्या हो रहा है:' : 'At this step:'}{' '}
              </span>
              <span className="opacity-95">
                {lang === 'hi'
                  ? activeDiagram.nodes[activeStepIndex]?.detailHindi
                  : activeDiagram.nodes[activeStepIndex]?.detail}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Corresponding C Code & Run in Compiler */}
        <div
          className={`lg:col-span-5 rounded-3xl border overflow-hidden shadow-lg flex flex-col justify-between ${
            isDark ? 'bg-[#070A12] border-slate-800' : 'bg-slate-900 border-slate-800'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                flowchart_code.c
              </span>
            </div>

            <button
              onClick={() => onOpenInCompiler(activeDiagram.cCode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'Compiler में चलाएं' : 'Run in Compiler'}</span>
            </button>
          </div>

          {/* Code */}
          <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto text-slate-200 leading-relaxed flex-1">
            <code>{activeDiagram.cCode}</code>
          </pre>

          {/* Theory note */}
          <div className="p-4 border-t border-slate-800/80 text-xs font-sans bg-slate-950/60 text-slate-400">
            💡 <strong className="text-cyan-400">Flowchart Rule:</strong>{' '}
            {lang === 'hi' ? activeDiagram.explanationHindi : activeDiagram.explanationEn}
          </div>
        </div>
      </div>
    </div>
  );
};
