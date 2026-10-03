import { BugQuestion } from '../types';

export const BUG_QUESTIONS: BugQuestion[] = [
  {
    id: 'bug-1',
    title: 'Missing Address-of Operator in scanf',
    titleHindi: 'scanf me & lagana bhool gaye',
    difficulty: 'Beginner',
    bugType: 'Runtime / Crash',
    buggyCode: `#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    // Can you spot the bug in the line below?
    scanf("%d", age);
    printf("You are %d years old!\\n", age);
    return 0;
}`,
    hint: 'scanf expects the memory address where it should save the user input, not the variable value itself!',
    hintHindi: 'scanf ko memory address (&) chahiye hota hai jaha input store karna hai!',
    options: [
      'Missing semicolon on line 6',
      'scanf("%d", age) should be scanf("%d", &age)',
      'printf format specifier must be %i instead of %d',
      'int age must be initialized to 0'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    // Fixed: Added & before age
    scanf("%d", &age);
    printf("You are %d years old!\\n", age);
    return 0;
}`,
    explanation: 'Passing "age" without "&" supplies garbage memory value as the target address. When scanf tries to write there, the OS throws a Segmentation Fault (Core Dumped).',
    explanationHindi: 'Bina & ke age pass karne par scanf kachra address par likhne lagta hai jisse program crash (Segmentation Fault) ho jata hai. Hamesha &age lagayein!'
  },
  {
    id: 'bug-2',
    title: 'Assignment (=) Instead of Equality (==) in if Condition',
    titleHindi: 'if condition me == ki jagah = lagana',
    difficulty: 'Beginner',
    bugType: 'Logical Error',
    buggyCode: `#include <stdio.h>

int main() {
    int isLoggedIn = 0; // 0 means false / logged out

    // Spot the mistake here:
    if (isLoggedIn = 1) {
        printf("Access Granted! Welcome to Admin Panel.\\n");
    } else {
        printf("Access Denied! Please login.\\n");
    }
    return 0;
}`,
    hint: 'Single = assigns a value, while double == compares two values.',
    hintHindi: 'Single = value daalta hai, double == barabari check karta hai.',
    options: [
      'isLoggedIn should be a char array',
      'The if condition assigns 1 to isLoggedIn instead of comparing (should be == 1)',
      'Curly braces are missing on the else block',
      'printf syntax error'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

int main() {
    int isLoggedIn = 0;

    // Fixed: Using == for comparison
    if (isLoggedIn == 1) {
        printf("Access Granted! Welcome to Admin Panel.\\n");
    } else {
        printf("Access Denied! Please login.\\n");
    }
    return 0;
}`,
    explanation: 'Using "=" assigns 1 to isLoggedIn. Since 1 is non-zero, the condition evaluates to TRUE every single time regardless of prior value!',
    explanationHindi: '"=" lagane se isLoggedIn me 1 chala jata hai jo hamesha TRUE mana jata hai. Isliye bina login ke bhi access mil jata hai! Hamesha "==" lagayein.'
  },
  {
    id: 'bug-3',
    title: 'Off-by-One Array Index Out of Bounds',
    titleHindi: 'Array Index Limit Paar (Index Out of Bounds)',
    difficulty: 'Beginner',
    bugType: 'Logical Error',
    buggyCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    // Notice the loop condition carefully:
    for (int i = 0; i <= 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    return 0;
}`,
    hint: 'An array of size 5 has valid indices 0, 1, 2, 3, 4. What happens when i reaches 5?',
    hintHindi: '5 size ke array me index 0, 1, 2, 3, 4 hi valid hote hain. 5 par kya hoga?',
    options: [
      'i should start at 1 instead of 0',
      'Loop condition should be i < 5 instead of i <= 5 (accessing arr[5] reads garbage)',
      'Array syntax must use parentheses',
      'printf format specifier is wrong'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    // Fixed: i < 5 prevents reading past the array boundary
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    return 0;
}`,
    explanation: 'arr[5] attempts to access the 6th element in a 5-element array. C does not perform boundary checks, reading junk memory or causing crashes.',
    explanationHindi: 'arr[5] chhate (6th) element ko access karta hai jo exist hi nahi karta. C me boundary check nahi hota isliye i < 5 lagana zaroori hai.'
  },
  {
    id: 'bug-4',
    title: 'Missing break in Switch Statement (Fall-through)',
    titleHindi: 'Switch Case me break bhool jana',
    difficulty: 'Intermediate',
    bugType: 'Logical Error',
    buggyCode: `#include <stdio.h>

int main() {
    int choice = 1;

    switch (choice) {
        case 1:
            printf("Action 1: Start Game\\n");
        case 2:
            printf("Action 2: Load Settings\\n");
        default:
            printf("Action: Exit\\n");
    }
    return 0;
}`,
    hint: 'Without break statements, execution flows down into all subsequent cases.',
    hintHindi: 'Bina break ke computer niche wale sabhi cases ko bhi chala deta hai.',
    options: [
      'choice must be a char',
      'Each case statement needs a break; to prevent fall-through',
      'default case is mandatory at the top',
      'switch cannot accept integer variable'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

int main() {
    int choice = 1;

    switch (choice) {
        case 1:
            printf("Action 1: Start Game\\n");
            break; // Fixed: Exits switch immediately
        case 2:
            printf("Action 2: Load Settings\\n");
            break;
        default:
            printf("Action: Exit\\n");
    }
    return 0;
}`,
    explanation: 'When choice is 1, case 1 prints, then case 2 prints, then default prints! Adding break; halts execution after matching case.',
    explanationHindi: 'break na hone se case 1, case 2 aur default teeno chal gaye. Har case ke baad break; lagakar switch se bahar nikle.'
  },
  {
    id: 'bug-5',
    title: 'Comparing Strings with == instead of strcmp',
    titleHindi: 'Strings ko == se compare karna',
    difficulty: 'Intermediate',
    bugType: 'Logical Error',
    buggyCode: `#include <stdio.h>

int main() {
    char password[20] = "secret123";

    // Why does this comparison fail or behave unexpectedly?
    if (password == "secret123") {
        printf("Login Successful!\\n");
    } else {
        printf("Wrong Password!\\n");
    }
    return 0;
}`,
    hint: 'In C, array names decay to memory addresses. "==" compares memory pointers, not character contents!',
    hintHindi: 'C me == do memory addresses ko compare karta hai, andar ke letters ko nahi!',
    options: [
      'password should not have a size of 20',
      'Must use strcmp(password, "secret123") == 0 to compare string values in C',
      'Strings cannot be in double quotes in C',
      'if condition must be enclosed in curly braces'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>
#include <string.h>

int main() {
    char password[20] = "secret123";

    // Fixed: Using strcmp() from <string.h>
    if (strcmp(password, "secret123") == 0) {
        printf("Login Successful!\\n");
    } else {
        printf("Wrong Password!\\n");
    }
    return 0;
}`,
    explanation: 'password == "secret123" compares the address of array password with the address of the literal string in read-only memory. Always use strcmp().',
    explanationHindi: '== se dono ke memory pate match kiye jate hain. String ke shabd match karne ke liye hamesha strcmp() ka use karein.'
  },
  {
    id: 'bug-6',
    title: 'Unclosed File Pointer in File Handling',
    titleHindi: 'File ko fclose() karna bhool jana',
    difficulty: 'Intermediate',
    bugType: 'Memory Leak',
    buggyCode: `#include <stdio.h>

void writeLogs() {
    FILE *fp = fopen("server.log", "w");
    if (fp == NULL) return;

    fprintf(fp, "System rebooted successfully.\\n");
    // Spot the missing step before returning!
}

int main() {
    writeLogs();
    return 0;
}`,
    hint: 'What happens to the open file handle and cached disk buffer when the function finishes?',
    hintHindi: 'Kaam hone par file band karna zaroori hota hai disk me save karne ke liye.',
    options: [
      'fprintf should be printf',
      'Missing fclose(fp); to flush buffer and release the file handle',
      'File name must end with .txt only',
      'fopen cannot use "w" mode'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

void writeLogs() {
    FILE *fp = fopen("server.log", "w");
    if (fp == NULL) return;

    fprintf(fp, "System rebooted successfully.\\n");
    
    // Fixed: Always close opened files
    fclose(fp);
}

int main() {
    writeLogs();
    return 0;
}`,
    explanation: 'Failing to fclose() keeps file locks active, leaks OS file descriptors, and data may remain unwritten in the memory buffer.',
    explanationHindi: 'fclose() na karne se file lock reh sakti hai aur buffer ka data hard drive par save hone se chhoot sakta hai.'
  },
  {
    id: 'bug-7',
    title: 'Dangling Pointer / Access After Free',
    titleHindi: 'free() karne ke baad bhi pointer access karna',
    difficulty: 'Advanced',
    bugType: 'Runtime / Crash',
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*) malloc(sizeof(int));
    *ptr = 100;
    printf("Value: %d\\n", *ptr);

    free(ptr); // Memory is released!

    // Spot the dangerous bug below:
    *ptr = 200;
    printf("New value: %d\\n", *ptr);

    return 0;
}`,
    hint: 'After freeing memory, the pointer becomes a Dangling Pointer. Modifying it causes undefined behavior.',
    hintHindi: 'free karne ke baad us pointer me likhna memory corruption aur crash karta hai.',
    options: [
      'malloc syntax is incorrect',
      'Accessing *ptr after free(ptr) is undefined behavior (Dangling Pointer)',
      'free() requires two parameters',
      'printf format specifier is wrong'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*) malloc(sizeof(int));
    *ptr = 100;
    printf("Value: %d\\n", *ptr);

    free(ptr); // Release memory
    ptr = NULL; // Fixed: Set to NULL so it cannot be misused

    printf("Memory freed safely.\\n");
    return 0;
}`,
    explanation: 'Modifying memory after free() corrupts the heap allocator metadata and creates catastrophic runtime crashes or security vulnerabilities.',
    explanationHindi: 'free karne ke baad us memory par dobara likhna Dangling Pointer bug hota hai. free ke turant baad ptr = NULL karein.'
  },
  {
    id: 'bug-8',
    title: 'Missing Base Case in Recursion (Stack Overflow)',
    titleHindi: 'Recursion me Base Case gayab hona',
    difficulty: 'Advanced',
    bugType: 'Runtime / Crash',
    buggyCode: `#include <stdio.h>

// This function calculates sum of numbers from 1 to n
int sum(int n) {
    // Spot what is missing before the recursive call:
    return n + sum(n - 1);
}

int main() {
    printf("Sum = %d\\n", sum(5));
    return 0;
}`,
    hint: 'When does the function stop calling itself? Without an exit condition, it recurses forever.',
    hintHindi: 'Ye function kab rukega? Agar rukne ki shart nahi hogi to infinite chalta rahega.',
    options: [
      'n should be multiplied instead of added',
      'Missing base case like if (n <= 1) return n; causing infinite recursion & stack overflow',
      'Function return type must be void',
      'sum function cannot take an int'
    ],
    correctOptionIndex: 1,
    fixedCode: `#include <stdio.h>

int sum(int n) {
    // Fixed: Base case stops recursion when n reaches 1 or 0
    if (n <= 1) {
        return n;
    }
    return n + sum(n - 1);
}

int main() {
    printf("Sum = %d\\n", sum(5));
    return 0;
}`,
    explanation: 'Without a base condition, sum(5) calls sum(4) -> sum(3) -> ... -> sum(-99999) until the program call stack overflows and crashes.',
    explanationHindi: 'Bina base case ke function minus me ginte hue chalta rahega jab tak memory bhar kar Stack Overflow crash na ho jaye.'
  }
];
