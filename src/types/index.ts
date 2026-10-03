export interface User {
  id: string;
  name: string;
  email: string;
  avatarSeed?: string;
  createdAt: string;
  goal?: string;
}

export interface UserProgress {
  completedTopicIds: string[];
  quizScores: Record<string, { score: number; total: number; percentage: number; date: string }>;
  bugsSolvedIds: string[];
  compilerRunsCount: number;
  bookmarkedTopicIds: string[];
  streakDays: number;
  lastActiveDate: string;
  milestonesUnlocked: string[];
}

export interface CodeExample {
  title: string;
  titleHindi: string;
  code: string;
  output: string;
  explanation: string;
  explanationHindi: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionHindi: string;
  difficulty: 'easy' | 'hard';
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationHindi: string;
}

export interface TheorySection {
  title: string;
  titleHindi: string;
  contentEn: string;
  contentHi: string;
}

export interface InterviewQnA {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

export interface PracticalProject {
  id: string;
  title: string;
  titleHindi: string;
  objective: string;
  objectiveHindi: string;
  code: string;
  defaultInput?: string;
  expectedOutput: string;
  lineByLineExplanation: {
    line: string;
    noteEn: string;
    noteHi: string;
  }[];
}

export interface Topic {
  id: string;
  order: number;
  title: string;
  titleHindi: string;
  category: 'Basics' | 'Control Flow' | 'Functions & Pointers' | 'Data Structures' | 'Memory & Files';
  summary: string;
  summaryHindi: string;
  readTimeMinutes: number;
  // Structured Deep Theory
  theory?: {
    intro: TheorySection;
    importance: TheorySection;
    syntaxStructure: TheorySection;
    memoryWorking: TheorySection;
    analogy: TheorySection;
    rules: {
      en: string[];
      hi: string[];
    };
    pitfalls: {
      en: string[];
      hi: string[];
    };
    interviewQnA: InterviewQnA[];
  };
  explanationEn: string;
  explanationHi: string;
  realLifeAnalogy: {
    en: string;
    hi: string;
  };
  codeExamples: CodeExample[];
  practicals?: PracticalProject[];
  keyPoints: {
    en: string[];
    hi: string[];
  };
  commonPitfalls: {
    en: string[];
    hi: string[];
  };
  quiz: QuizQuestion[];
}

export interface BugQuestion {
  id: string;
  title: string;
  titleHindi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  bugType: 'Syntax Error' | 'Runtime / Crash' | 'Logical Error' | 'Memory Leak';
  buggyCode: string;
  hint: string;
  hintHindi: string;
  options: string[];
  correctOptionIndex: number;
  fixedCode: string;
  explanation: string;
  explanationHindi: string;
}

export interface Milestone {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  icon: string;
  requiredProgress: number; // in percentage of topics completed
  badgeName: string;
}

export interface FlowchartNode {
  id: string;
  shape: 'oval' | 'parallelogram' | 'diamond' | 'rectangle'; // Start/End, I/O, Decision, Process
  label: string;
  labelHindi: string;
  detail: string;
  detailHindi: string;
  yesNext?: string;
  noNext?: string;
  next?: string;
}

export interface FlowchartDiagram {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Number Theory' | 'Series' | 'Control Logic' | 'Loops';
  summary: string;
  summaryHindi: string;
  nodes: FlowchartNode[];
  cCode: string;
  explanationHindi: string;
  explanationEn: string;
}

export interface ClassicProgram {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Series' | 'Prime & Factors' | 'Number Logic' | 'Patterns' | 'Strings & Math';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  descriptionHindi: string;
  logicPoints: { en: string[]; hi: string[] };
  code: string;
  defaultInput?: string;
  output: string;
  flowchartId?: string;
}

export interface SyntaxItem {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Basics' | 'Conditionals' | 'Loops' | 'Functions' | 'Pointers' | 'Arrays & Strings' | 'Structures' | 'Memory & Files';
  syntaxTemplate: string;
  description: string;
  descriptionHindi: string;
  exampleSnippet: string;
  notes: string;
}

