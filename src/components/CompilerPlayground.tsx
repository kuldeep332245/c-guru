import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  FileCode,
  FolderTree,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { C_TEMPLATES, executeCCode, CompileResult } from '../utils/cCompiler';

interface CompilerPlaygroundProps {
  initialCode?: string;
  isDark: boolean;
  lang: 'hi' | 'en';
  onRunSuccess?: () => void;
}

export const CompilerPlayground: React.FC<CompilerPlaygroundProps> = ({
  initialCode,
  isDark,
  lang,
  onRunSuccess
}) => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('hello');
  const [code, setCode] = useState<string>(initialCode || C_TEMPLATES.hello.code);
  const [stdin, setStdin] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [compileResult, setCompileResult] = useState<CompileResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'files'>('output');

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setCode(C_TEMPLATES[key].code);
    setStdin(C_TEMPLATES[key].defaultInput || '');
    setCompileResult(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executeCCode(code, stdin);
      setCompileResult(res);
      setIsRunning(false);
      if (res.exitCode === 0 && onRunSuccess) {
        onRunSuccess();
      }
    }, 200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (C_TEMPLATES[selectedTemplateKey]) {
      setCode(C_TEMPLATES[selectedTemplateKey].code);
      setStdin(C_TEMPLATES[selectedTemplateKey].defaultInput || '');
    }
    setCompileResult(null);
  };

  const insertSnippet = (snippet: string) => {
    setCode((prev) => prev + '\n' + snippet);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, stdin]);

  const lineCount = code.split('\n').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Bar: Template selector & Actions */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border shadow-lg flex flex-wrap items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'hi' ? 'C प्रोग्राम चुनें:' : 'C Template:'}
            </span>
          </div>

          <select
            value={selectedTemplateKey}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
              isDark
                ? 'bg-slate-950 border-slate-700 text-slate-100'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            {Object.entries(C_TEMPLATES).map(([key, item]) => (
              <option key={key} value={key}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyCode}
            className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Reset to Template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? (lang === 'hi' ? 'कंपाइल हो रहा है...' : 'Compiling...') : (lang === 'hi' ? 'Run (Ctrl+Enter)' : 'Run (Ctrl+Enter)')}</span>
          </button>
        </div>
      </div>

      {/* Snippet Quick Inserts */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          {lang === 'hi' ? 'त्वरित स्निपेट्स:' : 'Quick Snippets:'}
        </span>
        {[
          { label: '+ printf', snippet: 'printf("Hello C-Guru!\\n");' },
          { label: '+ scanf(&x)', snippet: 'scanf("%d", &num);' },
          { label: '+ for loop', snippet: 'for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}' },
          { label: '+ pointer *p', snippet: 'int *ptr = &val;\nprintf("%d\\n", *ptr);' },
          { label: '+ fopen & fclose', snippet: 'FILE *fp = fopen("data.txt", "w");\nfprintf(fp, "Saved!\\n");\nfclose(fp);' }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => insertSnippet(btn.snippet)}
            className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Editor & Console Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-[#070A11] overflow-hidden shadow-xl flex flex-col">
          {/* Editor Header */}
          <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono font-bold text-cyan-300 ml-2">main.c</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              GCC 11.2 • {lineCount} lines
            </span>
          </div>

          {/* Editor Textarea with Line Numbers */}
          <div className="relative flex-1 min-h-[400px] flex">
            {/* Line numbers gutter */}
            <div className="py-4 pl-3 pr-2 text-right select-none font-mono text-xs text-slate-600 bg-black/30 border-r border-slate-800/60 w-11">
              {Array.from({ length: Math.max(lineCount, 16) }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-4 font-mono text-xs sm:text-sm bg-transparent text-cyan-100 resize-none focus:outline-none leading-relaxed"
              style={{ minHeight: '400px' }}
              placeholder="// Write your C program here..."
            />
          </div>

          {/* Stdin Input Bar */}
          <div className="p-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-cyan-400 shrink-0">
              Standard Input (stdin):
            </span>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'scanf के लिए इनपुट यहाँ डालें (जैसे: 25 Kuldeep)...' : 'Input data for scanf (e.g. 25 Kuldeep)...'}
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-black/60 border border-slate-700 text-cyan-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Output Console / Virtual Files */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-[#070A11] overflow-hidden shadow-xl flex flex-col">
          {/* Console Header with Tabs */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveConsoleTab('output')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeConsoleTab === 'output' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console Output</span>
              </button>

              <button
                onClick={() => setActiveConsoleTab('files')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeConsoleTab === 'files' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>Virtual Files</span>
                {compileResult?.virtualFiles && Object.keys(compileResult.virtualFiles).length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            </div>

            {compileResult && (
              <div className="flex items-center gap-2 text-xs font-mono">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    compileResult.exitCode === 0
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  Exit {compileResult.exitCode}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {compileResult.executionTimeMs}ms
                </span>
              </div>
            )}
          </div>

          {/* Console Body */}
          <div className="p-4 flex-1 min-h-[400px] max-h-[520px] overflow-y-auto font-mono text-xs leading-relaxed">
            {activeConsoleTab === 'output' ? (
              !compileResult ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16 space-y-2">
                  <Terminal className="w-12 h-12 opacity-30 text-blue-500" />
                  <p className="font-sans text-xs">
                    {lang === 'hi' ? '"Run" बटन दबाकर C कोड निष्पादित करें' : 'Click "Run" or press Ctrl+Enter to execute'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {compileResult.stdout && (
                    <div className="text-emerald-300 whitespace-pre-wrap font-mono">
                      {compileResult.stdout}
                    </div>
                  )}

                  {compileResult.stderr && (
                    <div className="text-rose-400 bg-rose-950/30 p-3.5 rounded-xl border border-rose-900/40 whitespace-pre-wrap flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>{compileResult.stderr}</div>
                    </div>
                  )}
                </div>
              )
            ) : (
              /* Virtual Files Tab */
              <div className="space-y-4">
                <p className="text-[11px] font-sans text-slate-400">
                  {lang === 'hi'
                    ? 'File Handling प्रोग्राम द्वारा बनाई गई फाइलें (Virtual Hard Drive):'
                    : 'Virtual Disk Filesystem (Files created by fopen / fprintf):'}
                </p>

                {compileResult?.virtualFiles && Object.keys(compileResult.virtualFiles).length > 0 ? (
                  Object.entries(compileResult.virtualFiles).map(([fname, content]) => (
                    <div key={fname} className="rounded-2xl border border-slate-800 bg-black/50 overflow-hidden">
                      <div className="px-3.5 py-1.5 bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-between">
                        <span>📄 {fname}</span>
                        <span className="text-[10px] text-slate-400">{content.length} bytes</span>
                      </div>
                      <pre className="p-3 text-cyan-100 text-xs whitespace-pre-wrap">
                        {content}
                      </pre>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500 text-xs font-sans">
                    No files currently written. Run Template 7 (File Handling) to create files dynamically!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
