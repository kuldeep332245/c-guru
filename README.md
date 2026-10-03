# 🚀 C-Guru: Complete C Programming Mastery Platform

A comprehensive, interactive web platform to learn the **C Programming Language from scratch (0) to advanced File Handling** in both **Hindi (हिन्दी)** and **English**.

Includes detailed structured theory, interactive code execution, step-by-step flowchart visualizers, 40-question topic test banks, a "Spot the Bug" challenge arena, and a verified Certificate of Completion.

---

## ✨ Features

- 📘 **Zero to File Handling Curriculum**:
  - 14 comprehensive modules covering Variables, Operators, Conditionals, Loops, Functions, Arrays, 2D Matrices, Strings, Pointers, Memory Layout, Structures, Dynamic Memory Allocation (malloc/calloc/free), Preprocessor Directives, and File Handling (`fopen`, `fprintf`, `fscanf`, `fclose`).
  - Structured theory with Definitions, Real-Life Analogies, Syntax Blueprints, Step-by-Step Execution, Common Pitfalls, and Practical Code.

- ⚡ **In-Browser Interactive C Compiler**:
  - Live execution engine supporting `printf`, `scanf`, loops, conditionals, pointers, arrays, and standard libraries (`<stdio.h>`, `<stdlib.h>`, `<string.h>`, `<math.h>`).
  - Preloaded templates (Hello World, Fibonacci, Prime check, Dynamic Memory, File I/O).

- 🔀 **Interactive Flowchart & Algorithm Visualizer**:
  - Step-by-step visual logic tracing for algorithms (Even/Odd, Prime numbers, Fibonacci series, Factorial, Palindrome).
  - SVG node highlights matching runtime execution.

- 🧪 **Classic Series & Programs Lab**:
  - Fibonacci Series, Prime/Composite checking, Palindrome numbers, Armstrong numbers, GCD/LCM, Star & Pyramid Patterns, Number Swapping without third variable.
  - "Run in Compiler" 1-click execution for all solutions.

- 📋 **Complete C Syntax Reference Guide**:
  - Quick cheatsheet for variable declarations, format specifiers (`%d`, `%f`, `%c`, `%p`), loop templates, function prototypes, and pointer notation.

- 🎯 **Comprehensive Examination & 40-Question Quizzes**:
  - Every topic features a 40-question quiz bank (20 Easy + 20 Hard) with immediate answer verification, scoring, and explanations.
  - 15-question Comprehensive Grand C Test.

- 🐛 **Spot the Bug / Error Hunter Arena**:
  - Debugging exercises covering syntax mistakes, missing `&` in `scanf`, off-by-one errors, uninitialized pointers, memory leaks, and infinite loops.

- 📊 **Performance Dashboard & Verified Certificate**:
  - Tracks completed topics, quiz accuracy percentage, bug challenge progress, streak counter, and unlocked badges.
  - Generates a personalized, print-ready Certificate of Achievement.

- 🌐 **Bilingual (हिन्दी / English)** & **Dark / Light Mode**:
  - Instant language toggle between pure Hindi and English.
  - Modern high-contrast dark theme (Obsidian Navy Slate) and clean light theme.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Bundler & Tooling**: Vite
- **Icons**: Lucide React
- **Animations**: Motion

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/c-guru.git
cd c-guru
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Open `http://localhost:3000` or `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── src/
│   ├── components/        # UI components (Navbar, TutorialViewer, FlowchartVisualizer, etc.)
│   ├── data/              # C topics, question banks, bug exercises, syntax reference
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Local compiler engine, storage & session manager
│   ├── App.tsx            # Main router and global state
│   ├── index.css          # Theme variables and global styles
│   └── main.tsx           # React entry point
├── index.html             # HTML entry file
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite build configuration
```

---

## 📄 License
This project is open-source and available under the Apache-2.0 License.
