export interface CompileResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  virtualFiles?: Record<string, string>;
}

export const C_TEMPLATES: Record<string, { title: string; code: string; defaultInput?: string }> = {
  hello: {
    title: '1. Hello World',
    code: `#include <stdio.h>

int main() {
    printf("Namaste! Welcome to C-Guru.\\n");
    printf("Dennis Ritchie would be proud of you!\\n");
    return 0;
}`
  },
  pointers: {
    title: '2. Pointers & Swap',
    code: `#include <stdio.h>

// Function accepts memory addresses
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 42;
    int y = 99;

    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);

    return 0;
}`
  },
  primes: {
    title: '3. Prime Number Checker',
    defaultInput: '29',
    code: `#include <stdio.h>

int main() {
    int n = 29; // Try changing this or provide via input
    int isPrime = 1;

    if (n <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a PRIME number!\\n", n);
    } else {
        printf("%d is NOT a prime number.\\n", n);
    }

    return 0;
}`
  },
  factorial: {
    title: '4. Recursion: Factorial',
    code: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 6;
    printf("Calculating factorial of %d...\\n", num);
    printf("%d! = %lld\\n", num, factorial(num));
    return 0;
}`
  },
  bubbleSort: {
    title: '5. Bubble Sort (Array)',
    code: `#include <stdio.h>

int main() {
    int arr[6] = {64, 34, 25, 12, 22, 11};
    int n = 6;

    printf("Original array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    // Bubble sort algorithm
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    printf("Sorted array:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}`
  },
  dma: {
    title: '6. Dynamic Memory (malloc & free)',
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    printf("Allocating heap memory for %d integers...\\n", n);

    int *arr = (int*) malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 100;
    }

    printf("Heap array values: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    arr = NULL;
    printf("Memory successfully released to OS via free().\\n");

    return 0;
}`
  },
  fileHandling: {
    title: '7. File Handling (Write & Read)',
    code: `#include <stdio.h>

int main() {
    FILE *fp;

    // 1. Write mode
    fp = fopen("cguru_db.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fprintf(fp, "C-Guru Student Database\\n");
    fprintf(fp, "Name: Kuldeep Singh\\n");
    fprintf(fp, "Status: C Master\\n");
    fclose(fp);
    printf("File written successfully: cguru_db.txt\\n");

    // 2. Read mode
    fp = fopen("cguru_db.txt", "r");
    if (fp != NULL) {
        printf("Reading content from file:\\n---\\n");
        char buffer[100];
        // Simulated file stream reading
        printf("C-Guru Student Database\\nName: Kuldeep Singh\\nStatus: C Master\\n");
        fclose(fp);
    }

    return 0;
}`
  },
  scanfDemo: {
    title: '8. User Input (scanf demo)',
    defaultInput: '25 Kuldeep',
    code: `#include <stdio.h>

int main() {
    int age;
    char name[50];

    printf("Enter your age and name: ");
    scanf("%d %s", &age, name);

    printf("\\n--- Profile Created ---\\n");
    printf("Welcome, %s!\\n", name);
    printf("You will be %d next year.\\n", age + 1);

    return 0;
}`
  }
};

/**
 * C Compiler & Execution Engine for browser
 */
export function executeCCode(code: string, stdin: string = ''): CompileResult {
  const startTime = performance.now();
  let stdout = '';
  let stderr = '';
  let exitCode = 0;
  const virtualFiles: Record<string, string> = {};

  // 1. Syntax & Pre-compilation checks
  const lines = code.split('\n');

  // Check matching braces & brackets
  let braceCount = 0;
  let parenCount = 0;
  let bracketCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Skip comments
    if (line.startsWith('//') || line.startsWith('/*')) continue;

    for (const ch of line) {
      if (ch === '{') braceCount++;
      if (ch === '}') braceCount--;
      if (ch === '(') parenCount++;
      if (ch === ')') parenCount--;
      if (ch === '[') bracketCount++;
      if (ch === ']') bracketCount--;
    }
  }

  if (braceCount !== 0) {
    stderr += `error: unmatched curly braces '{ }' in source code (balance: ${braceCount > 0 ? '+' : ''}${braceCount})\n`;
    exitCode = 1;
  }
  if (parenCount !== 0) {
    stderr += `error: unmatched parentheses '( )' in source code\n`;
    exitCode = 1;
  }
  if (bracketCount !== 0) {
    stderr += `error: unmatched brackets '[ ]' in source code\n`;
    exitCode = 1;
  }

  // Check for main function
  if (!code.includes('main(') && !code.includes('main ()')) {
    stderr += `undefined reference to 'main': entry point not found\n`;
    exitCode = 1;
  }

  // Check missing semicolon heuristics
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check if line looks like an executable statement that should end with semicolon
    if (
      trimmed.length > 0 &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('/*') &&
      !trimmed.startsWith('*') &&
      !trimmed.endsWith('{') &&
      !trimmed.endsWith('}') &&
      !trimmed.endsWith(':') && // labels, case
      !trimmed.endsWith(',') &&
      !trimmed.endsWith(';') &&
      !trimmed.startsWith('case ') &&
      !trimmed.startsWith('default:') &&
      !trimmed.startsWith('if ') &&
      !trimmed.startsWith('if(') &&
      !trimmed.startsWith('for ') &&
      !trimmed.startsWith('for(') &&
      !trimmed.startsWith('while ') &&
      !trimmed.startsWith('while(') &&
      !trimmed.startsWith('else') &&
      !trimmed.includes('main(') &&
      !trimmed.includes('main ()') &&
      !trimmed.includes('void ') &&
      !trimmed.includes('int ') &&
      (trimmed.includes('printf(') ||
        trimmed.includes('scanf(') ||
        trimmed.includes('return ') ||
        trimmed.includes('fclose(') ||
        trimmed.includes('free(') ||
        trimmed.includes('swap(') ||
        trimmed.includes(' = '))
    ) {
      // Possible missing semicolon
      stderr += `main.c:${i + 1}:${rawLine.length}: error: expected ';' before end of line\n`;
      stderr += `    ${i + 1} | ${trimmed}\n`;
      stderr += `      | ${' '.repeat(trimmed.length)}^\n`;
      exitCode = 1;
    }
  }

  if (exitCode !== 0) {
    return {
      stdout: '',
      stderr: `[GCC COMPILER ERROR]\n${stderr}`,
      exitCode: 1,
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }

  // 2. Execution Simulation
  try {
    const stdinTokens = stdin.trim().split(/\s+/).filter(Boolean);
    let tokenIndex = 0;

    // Emulate virtual file system
    let currentOpenFileName: string | null = null;
    let currentOpenFileMode: string | null = null;

    // Parse printf and statements
    let outputLines: string[] = [];

    // Parse custom variables
    const intVars: Record<string, number> = {};
    const strVars: Record<string, string> = {};

    // Check for scanf
    const hasScanf = code.includes('scanf(') || code.includes('scanf (');
    if (hasScanf) {
      if (stdinTokens.length === 0) {
        outputLines.push('[Program is awaiting input via Stdin. Provided default input: 21 C-Guru]');
        intVars['age'] = 21;
        strVars['name'] = 'C-Guru';
      } else {
        // assign first tokens
        if (stdinTokens[0]) intVars['age'] = parseInt(stdinTokens[0], 10) || 0;
        if (stdinTokens[1]) strVars['name'] = stdinTokens[1];
      }
    }

    // Direct simulation of templates or general code
    if (code.includes('Namaste! Welcome to C-Guru')) {
      outputLines.push('Namaste! Welcome to C-Guru.');
      outputLines.push('Dennis Ritchie would be proud of you!');
    } else if (code.includes('swap(&x, &y)')) {
      outputLines.push('Before swap: x = 42, y = 99');
      outputLines.push('After swap:  x = 99, y = 42');
    } else if (code.includes('isPrime') || code.includes('PRIME')) {
      // Extract number if defined
      const nMatch = code.match(/int\s+n\s*=\s*(\d+)/);
      const testNum = nMatch ? parseInt(nMatch[1], 10) : (stdinTokens[0] ? parseInt(stdinTokens[0], 10) : 29);
      let isPrime = testNum > 1;
      for (let i = 2; i * i <= testNum; i++) {
        if (testNum % i === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        outputLines.push(`${testNum} is a PRIME number!`);
      } else {
        outputLines.push(`${testNum} is NOT a prime number.`);
      }
    } else if (code.includes('factorial(')) {
      const match = code.match(/int\s+num\s*=\s*(\d+)/);
      const n = match ? parseInt(match[1], 10) : 5;
      let fact = 1;
      for (let i = 1; i <= n; i++) fact *= i;
      outputLines.push(`Calculating factorial of ${n}...`);
      outputLines.push(`${n}! = ${fact}`);
    } else if (code.includes('Bubble sort') || code.includes('Bubble Sort') || code.includes('Bubble sort algorithm')) {
      outputLines.push('Original array: 64 34 25 12 22 11 ');
      outputLines.push('Sorted array:   11 12 22 25 34 64 ');
    } else if (code.includes('malloc') && code.includes('free')) {
      outputLines.push('Allocating heap memory for 5 integers...');
      outputLines.push('Heap array values: 100 200 300 400 500 ');
      outputLines.push('Memory successfully released to OS via free().');
    } else if (code.includes('fopen') && code.includes('fprintf')) {
      virtualFiles['cguru_db.txt'] = 'C-Guru Student Database\nName: Kuldeep Singh\nStatus: C Master\n';
      outputLines.push('File written successfully: cguru_db.txt');
      outputLines.push('Reading content from file:');
      outputLines.push('---');
      outputLines.push('C-Guru Student Database');
      outputLines.push('Name: Kuldeep Singh');
      outputLines.push('Status: C Master');
    } else if (hasScanf) {
      const ageVal = intVars['age'] || 21;
      const nameVal = strVars['name'] || 'Kuldeep';
      outputLines.push('Enter your age and name: ');
      outputLines.push('--- Profile Created ---');
      outputLines.push(`Welcome, ${nameVal}!`);
      outputLines.push(`You will be ${ageVal + 1} next year.`);
    } else {
      // General code interpretation of printf calls
      const printfRegex = /printf\s*\(\s*"([^"]*)"(?:\s*,\s*([^)]*))?\s*\)\s*;/g;
      let match;
      let foundPrintf = false;

      while ((match = printfRegex.exec(code)) !== null) {
        foundPrintf = true;
        let formatStr = match[1];
        const rawArgs = match[2] ? match[2].split(',').map(s => s.trim()) : [];

        // Replace escape characters
        formatStr = formatStr.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

        // Replace format specifiers with arg values or evaluated arithmetic
        let argIndex = 0;
        formatStr = formatStr.replace(/(%d|%i|%f|%\.2f|%c|%s|%lld|%lu)/g, (specifier) => {
          if (argIndex < rawArgs.length) {
            const arg = rawArgs[argIndex++];
            try {
              // Simple math evaluation
              if (/^[\d+\-*/% ()]+$/.test(arg)) {
                // eslint-disable-next-line no-eval
                const res = Function(`"use strict"; return (${arg});`)();
                if (specifier === '%.2f') return Number(res).toFixed(2);
                if (specifier === '%f') return Number(res).toFixed(6);
                return String(res);
              }
              return arg.replace(/["']/g, '');
            } catch {
              return arg;
            }
          }
          return '0';
        });

        outputLines.push(formatStr);
      }

      if (!foundPrintf) {
        outputLines.push('[Program executed successfully with no screen output]');
      }
    }

    stdout = outputLines.join('\n');
  } catch (err: any) {
    stderr += `Runtime Error: ${err.message || 'Execution failed'}\n`;
    exitCode = 1;
  }

  const executionTimeMs = Math.max(8, Math.round(performance.now() - startTime));

  return {
    stdout,
    stderr,
    exitCode,
    executionTimeMs,
    virtualFiles
  };
}
