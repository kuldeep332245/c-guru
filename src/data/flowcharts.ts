import { FlowchartDiagram } from '../types';

export const FLOWCHARTS_DATA: FlowchartDiagram[] = [
  {
    id: 'even-odd',
    title: 'Even or Odd Number Flowchart',
    titleHindi: 'Even (सम) या Odd (विषम) संख्या का Flowchart',
    category: 'Number Theory',
    summary: 'Visual logic to determine whether an integer is divisible by 2 with remainder 0.',
    summaryHindi: 'Socho number ko 2 se bhaag dekar check karna ki sheshfal (remainder) 0 bachta hai ya nahi.',
    nodes: [
      {
        id: 'n1',
        shape: 'oval',
        label: 'START',
        labelHindi: 'START (शुरू)',
        detail: 'Program execution begins here',
        detailHindi: 'Program shuru hota hai',
        next: 'n2'
      },
      {
        id: 'n2',
        shape: 'parallelogram',
        label: 'Input Integer: n',
        labelHindi: 'User se number lo: n',
        detail: 'Read user number via scanf("%d", &n)',
        detailHindi: 'User se n ki value input li',
        next: 'n3'
      },
      {
        id: 'n3',
        shape: 'diamond',
        label: 'Is (n % 2 == 0) ?',
        labelHindi: 'Kya (n % 2 == 0) hai?',
        detail: 'Modulo operator checks if remainder is zero',
        detailHindi: 'Sheshfal 0 aaya to Even, varna Odd',
        yesNext: 'n4',
        noNext: 'n5'
      },
      {
        id: 'n4',
        shape: 'parallelogram',
        label: 'Print "n is EVEN"',
        labelHindi: 'Print "n ek EVEN sankhya hai"',
        detail: 'printf("%d is Even\\n", n)',
        detailHindi: 'Screen par EVEN print hoga',
        next: 'n6'
      },
      {
        id: 'n5',
        shape: 'parallelogram',
        label: 'Print "n is ODD"',
        labelHindi: 'Print "n ek ODD sankhya hai"',
        detail: 'printf("%d is Odd\\n", n)',
        detailHindi: 'Screen par ODD print hoga',
        next: 'n6'
      },
      {
        id: 'n6',
        shape: 'oval',
        label: 'STOP / END',
        labelHindi: 'STOP (समाप्त)',
        detail: 'return 0 terminates program',
        detailHindi: 'Program safalta-purvak khatam hua'
      }
    ],
    cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter an integer: ");
    scanf("%d", &n);

    // Flowchart Decision Diamond:
    if (n % 2 == 0) {
        printf("%d is an EVEN number.\\n", n);
    } else {
        printf("%d is an ODD number.\\n", n);
    }

    return 0;
}`,
    explanationEn: 'In a flowchart, the Oval represents Start/Stop, Parallelogram represents Input/Output, and Diamond represents Decision making (True/False branch).',
    explanationHindi: 'Flowchart me Oval = Start/Stop, Parallelogram = Input/Output, aur Diamond = Decision (Faisla) lene ke liye use hota hai.'
  },
  {
    id: 'prime-check',
    title: 'Prime / Non-Prime Number Flowchart',
    titleHindi: 'Prime (अभाज्य) aur Non-Prime Check Flowchart',
    category: 'Number Theory',
    summary: 'Check if a number greater than 1 has any factors other than 1 and itself.',
    summaryHindi: 'Check karein ki sankhya 1 aur khud ke alawa kisi aur number se kat-ti hai ya nahi.',
    nodes: [
      {
        id: 'p1',
        shape: 'oval',
        label: 'START',
        labelHindi: 'START (शुरू)',
        detail: 'Initialize logic',
        detailHindi: 'Program shuru',
        next: 'p2'
      },
      {
        id: 'p2',
        shape: 'parallelogram',
        label: 'Input Integer: n',
        labelHindi: 'Number input lo: n',
        detail: 'Get number to test',
        detailHindi: 'User se number liya',
        next: 'p3'
      },
      {
        id: 'p3',
        shape: 'diamond',
        label: 'Is n <= 1 ?',
        labelHindi: 'Kya n <= 1 hai?',
        detail: 'Numbers <= 1 are NOT prime by definition',
        detailHindi: '1 ya usse chhoti sankhya prime nahi hoti',
        yesNext: 'p4',
        noNext: 'p5'
      },
      {
        id: 'p4',
        shape: 'parallelogram',
        label: 'Print "NOT PRIME"',
        labelHindi: 'Print "NOT PRIME"',
        detail: 'Early exit for <= 1',
        detailHindi: 'Seedha Not Prime print kiya',
        next: 'p11'
      },
      {
        id: 'p5',
        shape: 'rectangle',
        label: 'Set i = 2, isPrime = 1',
        labelHindi: 'i = 2, isPrime = 1 set karo',
        detail: 'Initialize loop counter and flag',
        detailHindi: 'Shuruat me maan liya ki prime hai',
        next: 'p6'
      },
      {
        id: 'p6',
        shape: 'diamond',
        label: 'Is (i * i <= n) ?',
        labelHindi: 'Kya (i * i <= n) hai?',
        detail: 'Loop up to square root of n for efficiency',
        detailHindi: 'Square root tak check karna kaafi hota hai',
        yesNext: 'p7',
        noNext: 'p9'
      },
      {
        id: 'p7',
        shape: 'diamond',
        label: 'Is (n % i == 0) ?',
        labelHindi: 'Kya (n % i == 0) poora kata?',
        detail: 'Check if divisible by i',
        detailHindi: 'Agar poora kat gaya to prime nahi ho sakta',
        yesNext: 'p8',
        noNext: 'p8b'
      },
      {
        id: 'p8',
        shape: 'rectangle',
        label: 'isPrime = 0; BREAK LOOP',
        labelHindi: 'isPrime = 0; Loop se bahar niklo',
        detail: 'Factor found, stop searching',
        detailHindi: 'Factor mil gaya, aage check karne ki zarurat nahi',
        next: 'p9'
      },
      {
        id: 'p8b',
        shape: 'rectangle',
        label: 'i = i + 1',
        labelHindi: 'i ko 1 badhao (i++)',
        detail: 'Check next divisor',
        detailHindi: 'Agla divisor test karo',
        next: 'p6'
      },
      {
        id: 'p9',
        shape: 'diamond',
        label: 'Is isPrime == 1 ?',
        labelHindi: 'Kya isPrime == 1 bacha?',
        detail: 'Evaluate final result',
        detailHindi: 'Check karo flag abhi bhi 1 hai?',
        yesNext: 'p10a',
        noNext: 'p10b'
      },
      {
        id: 'p10a',
        shape: 'parallelogram',
        label: 'Print "PRIME NUMBER"',
        labelHindi: 'Print "PRIME NUMBER"',
        detail: 'No factors found, it is prime',
        detailHindi: 'Sankhya PRIME hai',
        next: 'p11'
      },
      {
        id: 'p10b',
        shape: 'parallelogram',
        label: 'Print "NOT PRIME"',
        labelHindi: 'Print "NOT PRIME"',
        detail: 'Divisible by another number',
        detailHindi: 'Sankhya Composite / Not Prime hai',
        next: 'p11'
      },
      {
        id: 'p11',
        shape: 'oval',
        label: 'STOP / END',
        labelHindi: 'STOP (समाप्त)',
        detail: 'Algorithm complete',
        detailHindi: 'Execution samapt'
      }
    ],
    cCode: `#include <stdio.h>

int main() {
    int n, isPrime = 1;
    printf("Enter a positive number: ");
    scanf("%d", &n);

    if (n <= 1) {
        printf("%d is NOT a prime number.\\n", n);
        return 0;
    }

    // Loop from 2 to sqrt(n)
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = 0; // Found a factor
            break;
        }
    }

    if (isPrime) {
        printf("%d is a PRIME number!\\n", n);
    } else {
        printf("%d is NOT a prime number.\\n", n);
    }

    return 0;
}`,
    explanationEn: 'Prime checking optimization: instead of checking all numbers up to n, we only check up to sqrt(n) because any composite number must have a factor <= sqrt(n).',
    explanationHindi: 'Prime number optimization: n tak ginte rehne ki jagah sqrt(n) tak hi check karte hain kyunki agar koi factor hoga to wo sqrt se pehle hi mil jayega!'
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Series Flowchart',
    titleHindi: 'Fibonacci Series (0, 1, 1, 2, 3, 5, 8...) Flowchart',
    category: 'Series',
    summary: 'Each term is the sum of previous two terms: next = t1 + t2.',
    summaryHindi: 'Har agla number pichle do numbers ka jod hota hai: t1 + t2.',
    nodes: [
      {
        id: 'f1',
        shape: 'oval',
        label: 'START',
        labelHindi: 'START (शुरू)',
        detail: 'Initialize Fibonacci generator',
        detailHindi: 'Series shuruat',
        next: 'f2'
      },
      {
        id: 'f2',
        shape: 'parallelogram',
        label: 'Input terms count: n',
        labelHindi: 'Kitne terms chahiye: n',
        detail: 'Read how many terms to print',
        detailHindi: 'User se terms ki ginti li',
        next: 'f3'
      },
      {
        id: 'f3',
        shape: 'rectangle',
        label: 't1 = 0, t2 = 1, i = 1',
        labelHindi: 't1 = 0, t2 = 1, i = 1 set karein',
        detail: 'Initialize first two Fibonacci terms and counter',
        detailHindi: 'Pehle do terms fix hain: 0 aur 1',
        next: 'f4'
      },
      {
        id: 'f4',
        shape: 'diamond',
        label: 'Is (i <= n) ?',
        labelHindi: 'Kya (i <= n) hai?',
        detail: 'Loop condition',
        detailHindi: 'Jab tak sare terms print na ho jayein',
        yesNext: 'f5',
        noNext: 'f8'
      },
      {
        id: 'f5',
        shape: 'parallelogram',
        label: 'Print t1',
        labelHindi: 'Print t1 (Screen par dikhao)',
        detail: 'Output the current term',
        detailHindi: 'Current term print kiya',
        next: 'f6'
      },
      {
        id: 'f6',
        shape: 'rectangle',
        label: 'next = t1 + t2\nt1 = t2\nt2 = next',
        labelHindi: 'next = t1 + t2\nt1 = t2\nt2 = next',
        detail: 'Advance sliding window to next term',
        detailHindi: 'Values aage khiska di nayi term ke liye',
        next: 'f7'
      },
      {
        id: 'f7',
        shape: 'rectangle',
        label: 'i = i + 1',
        labelHindi: 'i = i + 1 (Agla round)',
        detail: 'Increment iteration count',
        detailHindi: 'Counter badhaya',
        next: 'f4'
      },
      {
        id: 'f8',
        shape: 'oval',
        label: 'STOP / END',
        labelHindi: 'STOP (समाप्त)',
        detail: 'All n terms printed',
        detailHindi: 'Poori Fibonacci series print ho gayi'
      }
    ],
    cCode: `#include <stdio.h>

int main() {
    int n = 10;
    int t1 = 0, t2 = 1, nextTerm;

    printf("Fibonacci Series (%d terms):\\n", n);

    for (int i = 1; i <= n; ++i) {
        printf("%d, ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");

    return 0;
}`,
    explanationEn: 'The Fibonacci sequence starts with 0 and 1. The loop repeatedly prints t1, calculates nextTerm = t1 + t2, slides t1 = t2, and updates t2 = nextTerm.',
    explanationHindi: 'Fibonacci me shuruat 0 aur 1 se hoti hai. Har round me t1 print karke agla term (t1+t2) nikalte hain aur sliding window se aage badhte hain.'
  },
  {
    id: 'factorial-flow',
    title: 'Factorial Calculation Flowchart',
    titleHindi: 'Factorial (n!) Calculation Flowchart',
    category: 'Number Theory',
    summary: 'Compute n! = 1 * 2 * 3 * ... * n using accumulator loop.',
    summaryHindi: 'Factorial nikalne ka step-by-step logic: fact = fact * i.',
    nodes: [
      {
        id: 'fc1',
        shape: 'oval',
        label: 'START',
        labelHindi: 'START (शुरू)',
        detail: 'Start factorial calculation',
        detailHindi: 'Program shuru',
        next: 'fc2'
      },
      {
        id: 'fc2',
        shape: 'parallelogram',
        label: 'Input: n',
        labelHindi: 'Input: n',
        detail: 'Number whose factorial is needed',
        detailHindi: 'Jiska factorial nikalna hai',
        next: 'fc3'
      },
      {
        id: 'fc3',
        shape: 'rectangle',
        label: 'fact = 1, i = 1',
        labelHindi: 'fact = 1, i = 1 initialize karein',
        detail: 'Multiplication accumulator starts at 1',
        detailHindi: 'Guna (Multiply) ke liye 1 se shuruat',
        next: 'fc4'
      },
      {
        id: 'fc4',
        shape: 'diamond',
        label: 'Is (i <= n) ?',
        labelHindi: 'Kya (i <= n) hai?',
        detail: 'Loop boundary test',
        detailHindi: 'Kya abhi n tak pahuche?',
        yesNext: 'fc5',
        noNext: 'fc7'
      },
      {
        id: 'fc5',
        shape: 'rectangle',
        label: 'fact = fact * i',
        labelHindi: 'fact = fact * i (Guna karo)',
        detail: 'Accumulate multiplication',
        detailHindi: 'Purane fact me i ka multiply kiya',
        next: 'fc6'
      },
      {
        id: 'fc6',
        shape: 'rectangle',
        label: 'i = i + 1',
        labelHindi: 'i = i + 1 (i ko badhao)',
        detail: 'Next multiplier',
        detailHindi: 'Agla number liya',
        next: 'fc4'
      },
      {
        id: 'fc7',
        shape: 'parallelogram',
        label: 'Print fact',
        labelHindi: 'Print fact (Final Answer)',
        detail: 'Display final factorial result',
        detailHindi: 'Factorial screen par print kiya',
        next: 'fc8'
      },
      {
        id: 'fc8',
        shape: 'oval',
        label: 'STOP / END',
        labelHindi: 'STOP (समाप्त)',
        detail: 'Complete',
        detailHindi: 'Khatam'
      }
    ],
    cCode: `#include <stdio.h>

int main() {
    int n = 5;
    long long fact = 1;

    for (int i = 1; i <= n; ++i) {
        fact *= i;
    }

    printf("Factorial of %d = %lld\\n", n, fact);
    return 0;
}`,
    explanationEn: 'Factorial of 0 is 1. For n > 0, an accumulator variable starts at 1 and multiplies every integer up to n.',
    explanationHindi: '0! ka answer 1 hota hai. Baaki ke liye fact = 1 se shuru hokar 1 se n tak sabhi sankhyao ka aapas me guna karta hai.'
  }
];
