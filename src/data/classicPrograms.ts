import { ClassicProgram } from '../types';

export const CLASSIC_PROGRAMS: ClassicProgram[] = [
  {
    id: 'fibonacci-series',
    title: 'Fibonacci Series (0, 1, 1, 2, 3, 5, 8...)',
    titleHindi: 'Fibonacci Series (फाइबोनैचि श्रृंखला)',
    category: 'Series',
    difficulty: 'Easy',
    description: 'Print the famous Fibonacci sequence where each number is the sum of the preceding two numbers.',
    descriptionHindi: 'Har agla number pichle do numbers ka jod hota hai (0, 1, 1, 2, 3, 5, 8, 13, 21...). Interview ka sabse popular sawal!',
    logicPoints: {
      en: [
        'First two terms are fixed: t1 = 0, t2 = 1.',
        'In every iteration: nextTerm = t1 + t2.',
        'Update values: t1 = t2; t2 = nextTerm;'
      ],
      hi: [
        'Pehle do numbers pakke hote hain: t1 = 0 aur t2 = 1.',
        'Har loop me naya number nikalte hain: nextTerm = t1 + t2.',
        'Sliding window: t1 me t2 daalo aur t2 me nextTerm daal do.'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int n = 10; // Kitne terms print karne hain
    int t1 = 0, t2 = 1, nextTerm;

    printf("Fibonacci Series (%d terms):\\n", n);

    for (int i = 1; i <= n; ++i) {
        printf("%d ", t1);
        nextTerm = t1 + t2; // Pichle 2 ka sum
        t1 = t2;            // Shift 1st
        t2 = nextTerm;      // Shift 2nd
    }
    printf("\\n");

    return 0;
}`,
    output: `Fibonacci Series (10 terms):
0 1 1 2 3 5 8 13 21 34`,
    flowchartId: 'fibonacci'
  },
  {
    id: 'prime-check',
    title: 'Prime or Non-Prime Number Check',
    titleHindi: 'Prime (अभाज्य) या Non-Prime संख्या की जांच',
    category: 'Prime & Factors',
    difficulty: 'Easy',
    description: 'Check if a positive integer is Prime (only divisible by 1 and itself) or Composite (Non-Prime).',
    descriptionHindi: 'Check karein ki sankhya Prime hai ya Non-Prime. Prime number sirf 1 se aur khud se katta hai.',
    logicPoints: {
      en: [
        'Numbers <= 1 are NOT prime.',
        'Only loop from i = 2 up to i * i <= n (square root of n).',
        'If n % i == 0, a factor exists -> NOT prime!'
      ],
      hi: [
        '1 ya 1 se chhota number kabhi Prime nahi hota.',
        'Loop ko 2 se lekar sirf sqrt(n) tak chalao (i * i <= n).',
        'Agar beech me kisi se bhi poora kat gaya (n % i == 0) to Non-Prime!'
      ]
    },
    defaultInput: '29',
    code: `#include <stdio.h>

int main() {
    int n = 29;
    int isPrime = 1; // 1 means true

    if (n <= 1) {
        isPrime = 0;
    } else {
        // Optimized check up to square root of n
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = 0; // Factor found
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a PRIME number!\\n", n);
    } else {
        printf("%d is a NON-PRIME (Composite) number.\\n", n);
    }

    return 0;
}`,
    output: `29 is a PRIME number!`,
    flowchartId: 'prime-check'
  },
  {
    id: 'primes-range',
    title: 'Find All Primes in Range (1 to 50)',
    titleHindi: '1 se 50 ke beech ke sabhi Prime Numbers nikaalna',
    category: 'Prime & Factors',
    difficulty: 'Medium',
    description: 'Nested loops to display all prime numbers in a given range.',
    descriptionHindi: 'Ek range (1 se 50) me aane wale sabhi Prime numbers ko dhoondh kar screen par print karein.',
    logicPoints: {
      en: [
        'Outer loop iterates from 2 to Limit.',
        'Inner loop tests if current number has any factors.',
        'If isPrime flag remains 1, print the number.'
      ],
      hi: [
        'Bahar wala loop 2 se limit tak chalega.',
        'Andar wala loop check karega ki number kat-ta hai ya nahi.',
        'Agar flag 1 raha to us number ko print kar do.'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int limit = 50;
    printf("Prime numbers between 1 and %d:\\n", limit);

    for (int num = 2; num <= limit; num++) {
        int isPrime = 1;

        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = 0;
                break;
            }
        }

        if (isPrime) {
            printf("%d ", num);
        }
    }
    printf("\\n");

    return 0;
}`,
    output: `Prime numbers between 1 and 50:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47`
  },
  {
    id: 'even-odd',
    title: 'Even or Odd Number (3 Different Ways)',
    titleHindi: 'Even ya Odd (3 Zabardast Tarike: Modulo, Bitwise, Ternary)',
    category: 'Number Logic',
    difficulty: 'Easy',
    description: 'Master 3 distinct ways to check even or odd: Modulo operator, Bitwise AND (& 1), and Ternary operator.',
    descriptionHindi: 'Even/Odd check karne ke 3 tarike: % Modulo, Bitwise & operator (super fast), aur Ternary operator.',
    logicPoints: {
      en: [
        'Method 1: n % 2 == 0 (Standard modulo)',
        'Method 2: (n & 1) == 0 (Bitwise: odd numbers have least significant bit 1)',
        'Method 3: (n % 2 == 0) ? "Even" : "Odd" (Short 1-line expression)'
      ],
      hi: [
        'Tarika 1: n % 2 == 0 (Standard modulo sheshfal)',
        'Tarika 2: (n & 1) == 0 (Bitwise: odd number ka aakhiri binary bit 1 hota hai)',
        'Tarika 3: Ternary operator se ek line me check karein'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int num = 48;

    printf("Testing number: %d\\n", num);

    // Method 1: Modulo
    if (num % 2 == 0) {
        printf("Method 1 (Modulo): %d is EVEN\\n", num);
    } else {
        printf("Method 1 (Modulo): %d is ODD\\n", num);
    }

    // Method 2: Bitwise AND (CPU-level fast!)
    if ((num & 1) == 0) {
        printf("Method 2 (Bitwise &): %d is EVEN\\n", num);
    } else {
        printf("Method 2 (Bitwise &): %d is ODD\\n", num);
    }

    // Method 3: Ternary Operator
    printf("Method 3 (Ternary): %d is %s\\n", num, (num % 2 == 0) ? "EVEN" : "ODD");

    return 0;
}`,
    output: `Testing number: 48
Method 1 (Modulo): 48 is EVEN
Method 2 (Bitwise &): 48 is EVEN
Method 3 (Ternary): 48 is EVEN`,
    flowchartId: 'even-odd'
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number Check (e.g. 121, 1331)',
    titleHindi: 'Palindrome Number (उल्टा-सीधा एक समान)',
    category: 'Number Logic',
    difficulty: 'Easy',
    description: 'Check if a number remains the exact same when its digits are reversed.',
    descriptionHindi: 'Check karein ki kya number aage se aur piche se padhne par bilkul barabar hai (jaise 121, 1331, 12321).',
    logicPoints: {
      en: [
        'Store original number in temp variable.',
        'Extract last digit: rem = n % 10.',
        'Build reversed number: rev = rev * 10 + rem.',
        'Remove last digit: n = n / 10.'
      ],
      hi: [
        'Asli number ko temp variable me safe rakhein.',
        'Aakhiri digit nikaalein: rem = n % 10.',
        'Ulta number banayein: rev = rev * 10 + rem.',
        'Aakhiri digit hatayein: n = n / 10.'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int num = 1331;
    int original = num;
    int reversed = 0;

    while (num > 0) {
        int rem = num % 10;
        reversed = (reversed * 10) + rem;
        num = num / 10;
    }

    printf("Original: %d | Reversed: %d\\n", original, reversed);

    if (original == reversed) {
        printf("Result: %d is a PALINDROME number!\\n", original);
    } else {
        printf("Result: %d is NOT a palindrome.\\n", original);
    }

    return 0;
}`,
    output: `Original: 1331 | Reversed: 1331
Result: 1331 is a PALINDROME number!`
  },
  {
    id: 'armstrong-number',
    title: 'Armstrong Number Check (e.g. 153 = 1³ + 5³ + 3³)',
    titleHindi: 'Armstrong Number (Digits ke Cube ka Jod)',
    category: 'Number Logic',
    difficulty: 'Medium',
    description: 'An Armstrong number is an integer such that the sum of the cubes of its digits equals the number itself.',
    descriptionHindi: 'Armstrong number wo hota hai jiske digits ke cubes (ghana) ka sum usi number ke barabar ho (1³ + 5³ + 3³ = 1 + 125 + 27 = 153).',
    logicPoints: {
      en: [
        'Extract each digit using % 10.',
        'Add (digit * digit * digit) to sum accumulator.',
        'If sum == original, it is an Armstrong number!'
      ],
      hi: [
        'Har digit nikaalo (% 10).',
        'Har digit ka cube jodte jao: sum += (rem * rem * rem).',
        'Agar aakhiri sum original number ke barabar aaya to Armstrong number hai!'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int num = 153;
    int original = num;
    int sum = 0;

    while (num != 0) {
        int rem = num % 10;
        sum += (rem * rem * rem);
        num /= 10;
    }

    printf("Number: %d, Sum of Cubes: %d\\n", original, sum);

    if (sum == original) {
        printf("%d is an ARMSTRONG number!\\n", original);
    } else {
        printf("%d is NOT an Armstrong number.\\n", original);
    }

    return 0;
}`,
    output: `Number: 153, Sum of Cubes: 153
153 is an ARMSTRONG number!`
  },
  {
    id: 'factorial-program',
    title: 'Factorial of a Number (Iterative & Recursion)',
    titleHindi: 'Factorial (n!) nikalna (Loop aur Recursion)',
    category: 'Series',
    difficulty: 'Easy',
    description: 'Calculate product of all integers up to n.',
    descriptionHindi: 'Factorial calculate karne ke do tarike: normal loop aur function recursion.',
    logicPoints: {
      en: [
        'Base cases: 0! = 1 and 1! = 1.',
        'Iterative: fact *= i inside loop from 1 to n.',
        'Recursive: return n * factorial(n - 1);'
      ],
      hi: [
        '0! aur 1! dono 1 hote hain.',
        'Loop me fact = fact * i karte jao.',
        'Recursion me return n * fact(n - 1) likhte hain.'
      ]
    },
    code: `#include <stdio.h>

// Recursive function
long long factRecursive(int n) {
    if (n <= 1) return 1;
    return n * factRecursive(n - 1);
}

int main() {
    int n = 6;
    long long factLoop = 1;

    // Method 1: Using Loop
    for (int i = 1; i <= n; i++) {
        factLoop *= i;
    }

    printf("Factorial of %d (Loop):      %lld\\n", n, factLoop);
    printf("Factorial of %d (Recursion): %lld\\n", n, factRecursive(n));

    return 0;
}`,
    output: `Factorial of 6 (Loop):      720
Factorial of 6 (Recursion): 720`,
    flowchartId: 'factorial-flow'
  },
  {
    id: 'reverse-number',
    title: 'Reverse Any Given Number (e.g. 9876 -> 6789)',
    titleHindi: 'Kisi bhi Number ko Ulta (Reverse) Karna',
    category: 'Number Logic',
    difficulty: 'Easy',
    description: 'Mathematical digit extraction and reassembly algorithm.',
    descriptionHindi: 'Loop aur Modulo (%) se number ko bina string me badle mathematically ulta karna.',
    logicPoints: {
      en: [
        'rev = (rev * 10) + (n % 10)',
        'n = n / 10',
        'Repeat until n becomes 0'
      ],
      hi: [
        'Piche ka digit nikala aur rev me shift kiya.',
        'n ko 10 se bhaag dekar aakhiri digit hataya.',
        'Jab tak n > 0 hai tab tak chalate rahein.'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int n = 98765;
    int original = n;
    int rev = 0;

    while (n != 0) {
        int digit = n % 10;
        rev = rev * 10 + digit;
        n /= 10;
    }

    printf("Original Number: %d\\n", original);
    printf("Reversed Number: %d\\n", rev);

    return 0;
}`,
    output: `Original Number: 98765
Reversed Number: 56789`
  },
  {
    id: 'star-patterns',
    title: 'Star Patterns & Pyramids in C',
    titleHindi: 'Star Patterns aur Pyramids (Nested Loops)',
    category: 'Patterns',
    difficulty: 'Medium',
    description: 'Learn nested loops to print half pyramids, inverted pyramids, and centered triangle patterns.',
    descriptionHindi: 'Nested loops se Star (*) ke designs aur pyramids banana seekhein. College aur practical exams ka favorite!',
    logicPoints: {
      en: [
        'Outer loop controls row index (i).',
        'Inner loop controls column index (j) and spaces.'
      ],
      hi: [
        'Bahar wala loop rows (lines) ko sambhalta hai.',
        'Andar wala loop stars (*) aur spaces print karta hai.'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int rows = 5;

    printf("--- Pattern 1: Right Triangle ---\\n");
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    printf("\\n--- Pattern 2: Centered Pyramid ---\\n");
    for (int i = 1; i <= rows; i++) {
        // Print leading spaces
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Print stars
        for (int k = 1; k <= (2 * i - 1); k++) {
            printf("*");
        }
        printf("\\n");
    }

    return 0;
}`,
    output: `--- Pattern 1: Right Triangle ---
* 
* * 
* * * 
* * * * 
* * * * * 

--- Pattern 2: Centered Pyramid ---
    *
   ***
  *****
 *******
*********`
  },
  {
    id: 'swap-no-temp',
    title: 'Swap Two Numbers Without Third Variable',
    titleHindi: 'Do Numbers ko Swap Karna (Bina kisi teesre variable ke)',
    category: 'Number Logic',
    difficulty: 'Easy',
    description: 'Swap values in-place using arithmetic (+, -) and bitwise XOR (^).',
    descriptionHindi: 'Teesre variable (temp) ke bina values swap karne ke do pro tarike: Math (+ -) aur Bitwise XOR.',
    logicPoints: {
      en: [
        'Method A (Arithmetic): a = a + b; b = a - b; a = a - b;',
        'Method B (XOR): a = a ^ b; b = a ^ b; a = a ^ b;'
      ],
      hi: [
        'Tarika A: Jod aur ghatao (a = a + b; b = a - b; a = a - b;)',
        'Tarika B: Bitwise XOR bina kisi overflow risk ke swap karta hai!'
      ]
    },
    code: `#include <stdio.h>

int main() {
    int a = 25, b = 80;

    printf("Before Swap: a = %d, b = %d\\n", a, b);

    // Swapping using XOR
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    printf("After Swap:  a = %d, b = %d\\n", a, b);

    return 0;
}`,
    output: `Before Swap: a = 25, b = 80
After Swap:  a = 80, b = 25`
  }
];
