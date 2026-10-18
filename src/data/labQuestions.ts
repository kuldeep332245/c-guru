import { LabQuestion } from '../types';

export const LAB_QUESTIONS: LabQuestion[] = [
  // -------------------------------------------------------------
  // Category 1: Basic I/O & Operators
  // -------------------------------------------------------------
  {
    id: 'lab-01',
    number: 1,
    title: 'Hello World & Student Biodata',
    titleHindi: 'हेलो वर्ल्ड और छात्र परिचय प्रोग्राम',
    category: 'Basic I/O & Operators',
    difficulty: 'Easy',
    objective: 'Write a C program to display "Hello World!" and print a formatted student bio-data using escape sequences.',
    objectiveHindi: 'C में एक प्रोग्राम लिखें जो "Hello World!" प्रदर्शित करे और एस्केप अनुक्रमों (\\n, \\t) का उपयोग करके छात्र का बायोडाटा प्रिंट करे।',
    theoryExplanationEn: `In C programming, the printf() function from the <stdio.h> library is the fundamental standard output mechanism.
1. Return Value of main(): 'int main()' defines the starting point of program execution. It returns integer 0 to operating system, indicating successful execution.
2. Preprocessor Directive: #include <stdio.h> instructs the C preprocessor to paste header declarations for standard input/output before compilation.
3. Escape Sequences:
   - \\n (Newline): Moves cursor to the beginning of next line.
   - \\t (Tab): Inserts a horizontal tab space (usually 8 character widths).
   - \\\\ and \\": Escapes backslash and double quotes inside string literals.`,
    theoryExplanationHi: `C प्रोग्रामिंग में <stdio.h> लाइब्रेरी से printf() फंक्शन मानक आउटपुट के लिए प्रयोग किया जाता है।
1. main() का महत्व: हर C प्रोग्राम का निष्पादन main() फंक्शन से ही शुरू होता है। return 0 ऑपरेटिंग सिस्टम को सूचित करता है कि प्रोग्राम बिना किसी त्रुटि के समाप्त हुआ।
2. हेडर फाइल (#include <stdio.h>): यह प्रीप्रोसेसर डायरेक्टिव कंपाइलर को इनपुट/आउटपुट लाइब्रेरी जोड़ने का निर्देश देता है।
3. एस्केप सीक्वेन्स (Escape Sequences):
   - \\n : कर्सर को अगली नई लाइन में भेजता है।
   - \\t : क्षैतिज टैब स्पेस (8 स्पेस का अंतर) देता है।`,
    algorithmEn: [
      'Step 1: Start program execution from main().',
      'Step 2: Print welcome greeting "Hello World!" followed by a newline.',
      'Step 3: Print header divider for student bio-data.',
      'Step 4: Print Name, Roll Number, Branch, and College name using \\t and \\n.',
      'Step 5: Return 0 and terminate.'
    ],
    algorithmHi: [
      'चरण 1: main() से प्रोग्राम निष्पादन शुरू करें।',
      'चरण 2: "Hello World!" प्रिंट करें और नई लाइन (\\n) लगाएं।',
      'चरण 3: छात्र बायोडाटा हेडर और विभाजक रेखा प्रिंट करें।',
      'चरण 4: नाम, रोल नंबर, शाखा और कॉलेज का नाम \\t और \\n से प्रिंट करें।',
      'चरण 5: return 0 कर प्रोग्राम समाप्त करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    // Basic Printf with Escape Sequences
    printf("===========================================\\n");
    printf("         WELCOME TO C-GURU ACADEMY        \\n");
    printf("===========================================\\n");
    printf("Hello World! This is my first C Lab program.\\n\\n");

    // Formatted Student Biodata
    printf("----------- STUDENT BIO-DATA --------------\\n");
    printf("Name       :\\tRahul Sharma\\n");
    printf("Roll Number:\\t2024CS101\\n");
    printf("Course     :\\tB.Tech (Computer Science)\\n");
    printf("Semester   :\\t1st Semester\\n");
    printf("Language   :\\tANSI C Standard (C99)\\n");
    printf("-------------------------------------------\\n");

    return 0;
}`,
    sampleInput: 'No input required (Pure standard output demonstration)',
    sampleOutput: `===========================================
         WELCOME TO C-GURU ACADEMY        
===========================================
Hello World! This is my first C Lab program.

----------- STUDENT BIO-DATA --------------
Name       :	Rahul Sharma
Roll Number:	2024CS101
Course     :	B.Tech (Computer Science)
Semester   :	1st Semester
Language   :	ANSI C Standard (C99)
-------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'What is the return type of main() in standard C and why?',
        qHi: 'मानक C में main() का रिटर्न टाइप क्या होता है और क्यों?',
        aEn: 'The return type is int. Returning 0 indicates successful termination, while non-zero values signify error exit codes to the parent shell/OS.',
        aHi: 'रिटर्न टाइप int होता है। return 0 सफल निष्पादन का संकेत देता है, जबकि गैर-शून्य संख्याएं ऑपरेटिंग सिस्टम को त्रुटि की सूचना देती हैं।'
      },
      {
        qEn: 'What does stdio.h stand for?',
        qHi: 'stdio.h का पूरा नाम क्या है?',
        aEn: 'Standard Input Output Header. It contains declarations for functions like printf(), scanf(), fopen(), etc.',
        aHi: 'Standard Input Output Header। इसमें printf(), scanf(), fopen() जैसे फंक्शनों की घोषणाएं होती हैं।'
      }
    ]
  },

  {
    id: 'lab-02',
    number: 2,
    title: 'Simple & Compound Interest Calculation',
    titleHindi: 'साधारण एवं चक्रवृद्धि ब्याज की गणना',
    category: 'Basic I/O & Operators',
    difficulty: 'Easy',
    objective: 'Write a C program to calculate Simple Interest and Compound Interest given Principal, Rate, and Time period.',
    objectiveHindi: 'मूलधन (P), दर (R), और समय (T) इनपुट लेकर साधारण ब्याज (SI) और चक्रवृद्धि ब्याज (CI) की गणना करने वाला C प्रोग्राम लिखें।',
    theoryExplanationEn: `Mathematical Formulation:
1. Simple Interest (SI):
   Formula: SI = (P * R * T) / 100
   Where P = Principal Amount, R = Annual Interest Rate (%), T = Time in years.
2. Compound Interest (CI):
   Formula: Amount = P * (1 + R / 100)^T
   CI = Amount - P
   In C, exponential power is computed using the pow(base, exponent) function declared in <math.h>.
3. Floating Point Precision:
   Use 'double' or 'float' data type for high financial accuracy and print with %.2lf to format to 2 decimal places.`,
    theoryExplanationHi: `गणितीय सूत्र एवं लॉजिक:
1. साधारण ब्याज (SI):
   सूत्र: SI = (P * R * T) / 100
   जहाँ P = मूलधन, R = ब्याज दर (%), T = समय (वर्ष)।
2. चक्रवृद्धि ब्याज (CI):
   सूत्र: कुल राशि (A) = P * (1 + R / 100)^T
   CI = कुल राशि - मूलधन
   C में घात (power) निकालने के लिए <math.h> लाइब्रेरी के pow(base, exp) फंक्शन का उपयोग किया जाता है।
3. फ्लोटिंग पॉइंट प्रिसिजन:
   दशमलव गणनाओं के लिए float या double का प्रयोग करें और '%.2f' या '%.2lf' से 2 दशमलव स्थानों तक प्रिंट करें।`,
    algorithmEn: [
      'Step 1: Include <stdio.h> and <math.h>.',
      'Step 2: Declare variables principal, rate, time, si, amount, ci as double.',
      'Step 3: Read values of Principal, Rate, and Time from the user using scanf().',
      'Step 4: Calculate SI = (principal * rate * time) / 100.0.',
      'Step 5: Calculate Amount = principal * pow((1.0 + rate / 100.0), time).',
      'Step 6: Calculate CI = Amount - principal.',
      'Step 7: Display SI and CI with two decimal digits precision.'
    ],
    algorithmHi: [
      'चरण 1: <stdio.h> और <math.h> हेडर फाइल शामिल करें।',
      'चरण 2: principal, rate, time, si, amount, ci को double डेटा टाइप घोषित करें।',
      'चरण 3: scanf() से उपयोगकर्ता से P, R, और T का मान इनपुट लें।',
      'चरण 4: SI = (principal * rate * time) / 100.0 की गणना करें।',
      'चरण 5: Amount = principal * pow((1 + rate/100), time) की गणना करें।',
      'चरण 6: CI = Amount - principal निकालें।',
      'चरण 7: SI और CI को दो दशमलव स्थानों तक प्रदर्शित करें।'
    ],
    cCode: `#include <stdio.h>
#include <math.h>

int main() {
    double principal, rate, time;
    double simpleInterest, amount, compoundInterest;

    printf("=== Simple & Compound Interest Calculator ===\\n");
    printf("Enter Principal Amount (P) in INR: ");
    if (scanf("%lf", &principal) != 1) return 0;

    printf("Enter Annual Rate of Interest (R in %%): ");
    if (scanf("%lf", &rate) != 1) return 0;

    printf("Enter Time Period (T in Years): ");
    if (scanf("%lf", &time) != 1) return 0;

    // 1. Calculate Simple Interest
    simpleInterest = (principal * rate * time) / 100.0;

    // 2. Calculate Compound Interest
    amount = principal * pow((1.0 + (rate / 100.0)), time);
    compoundInterest = amount - principal;

    // Display formatted results
    printf("\\n----------------- CALCULATION REPORT -----------------\\n");
    printf("Principal Amount   : Rs. %.2lf\\n", principal);
    printf("Annual Rate        : %.2lf %%%%\\n", rate);
    printf("Time Period        : %.2lf Years\\n", time);
    printf("Simple Interest    : Rs. %.2lf (Total: Rs. %.2lf)\\n", simpleInterest, principal + simpleInterest);
    printf("Compound Interest  : Rs. %.2lf (Total: Rs. %.2lf)\\n", compoundInterest, amount);
    printf("------------------------------------------------------\\n");

    return 0;
}`,
    sampleInput: `Principal: 10000
Rate: 7.5
Time: 3`,
    sampleOutput: `=== Simple & Compound Interest Calculator ===
Enter Principal Amount (P) in INR: 10000
Enter Annual Rate of Interest (R in %): 7.5
Enter Time Period (T in Years): 3

----------------- CALCULATION REPORT -----------------
Principal Amount   : Rs. 10000.00
Annual Rate        : 7.50 %
Time Period        : 3.00 Years
Simple Interest    : Rs. 2250.00 (Total: Rs. 12250.00)
Compound Interest  : Rs. 2422.97 (Total: Rs. 12422.97)
------------------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'Why do we need <math.h> and -lm flag in GCC while compiling?',
        qHi: 'pow() का उपयोग करते समय <math.h> क्यों शामिल किया जाता है?',
        aEn: 'pow() is part of the standard C math library defined in <math.h>. In GCC, the math library (-lm) must be linked dynamically during the compilation phase.',
        aHi: 'pow() फंक्शन <math.h> में घोषित होता है। GCC कंपाइलर में गणित लाइब्रेरी को लिंक करने के लिए -lm फ्लैग जरूरी होता है।'
      },
      {
        qEn: 'What is the format specifier for reading and printing a double variable?',
        qHi: 'double वेरिएबल को इनपुट और आउटपुट करने का फॉर्मेट विनिर्देशक क्या है?',
        aEn: 'For reading via scanf, we must use "%lf" (long float). For printf, both "%f" and "%lf" are valid, but "%lf" is standard.',
        aHi: 'scanf में double पढ़ने के लिए "%lf" का उपयोग अनिवार्य है। printf में "%.2lf" से दो दशमलव स्थान तक प्रिंट होता है।'
      }
    ]
  },

  {
    id: 'lab-03',
    number: 3,
    title: 'Swap Two Variables (With & Without 3rd Variable)',
    titleHindi: 'दो संख्याओं की अदला-बदली (तीसरे चर के साथ और बिना)',
    category: 'Basic I/O & Operators',
    difficulty: 'Easy',
    objective: 'Write a C program to swap two numbers using a temporary third variable, and then demonstrate swapping without using any third variable (Arithmetic & Bitwise XOR method).',
    objectiveHindi: 'तीसरे चर का उपयोग करके और बिना किसी तीसरे चर के (अंकगणितीय एवं बिटवाइज़ XOR) दो चरों के मानों की अदला-बदली करने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Swapping means interchanging the values stored in two distinct memory locations.
Method 1: Using Temporary Variable:
- temp = A; A = B; B = temp;
- Safe and straightforward. No danger of integer overflow.

Method 2: Arithmetic Method (Without 3rd variable):
- A = A + B;
- B = A - B; // B becomes old A
- A = A - B; // A becomes old B
- Caveat: Risk of integer overflow if (A + B) exceeds INT_MAX.

Method 3: Bitwise XOR Method:
- A = A ^ B;
- B = A ^ B;
- A = A ^ B;
- Extremely fast at CPU hardware level, perfectly immune to arithmetic overflow!`,
    theoryExplanationHi: `स्वैपिंग (Swapping) का अर्थ है दो वेरिएबल्स के मानों का परस्पर आदान-प्रदान करना।
विधि 1: तीसरे वेरिएबल (temp) का उपयोग करके:
- temp = A; A = B; B = temp;
- सबसे सुरक्षित और सरल तरीका, ओवरफ्लो का कोई खतरा नहीं।

विधि 2: बिना तीसरे वेरिएबल के (जोड़-घटाव विधि):
- A = A + B;
- B = A - B; (B को A का पुराना मान मिला)
- A = A - B; (A को B का पुराना मान मिला)
- सावधानी: यदि A + B का मान बहुत बड़ा हो जाए तो इंटीजर ओवरफ्लो हो सकता है।

विधि 3: बिटवाइज़ XOR विधि:
- A = A ^ B; B = A ^ B; A = A ^ B;
- यह हार्डवेयर स्तर पर अत्यंत तेज है और इसमें कोई ओवरफ्लो नहीं होता।`,
    algorithmEn: [
      'Step 1: Read two integers A and B from the user.',
      'Step 2: Display initial values before swapping.',
      'Step 3: Swap using temp variable: temp = A, A = B, B = temp.',
      'Step 4: Swap back without temp using XOR: A = A ^ B, B = A ^ B, A = A ^ B.',
      'Step 5: Print final values verifying correctness.'
    ],
    algorithmHi: [
      'चरण 1: उपयोगकर्ता से दो पूर्णांक A और B इनपुट लें।',
      'चरण 2: स्वैपिंग से पहले के मूल मान दिखाएं।',
      'चरण 3: temp वेरिएबल से स्वैप करें: temp = A, A = B, B = temp।',
      'चरण 4: XOR विधि से बिना temp के पुनः स्वैप करें: A = A ^ B, B = A ^ B, A = A ^ B।',
      'चरण 5: अंतिम परिणाम सत्यापित कर प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int a, b, temp;

    printf("Enter first integer (A) : ");
    if (scanf("%d", &a) != 1) return 0;
    printf("Enter second integer (B): ");
    if (scanf("%d", &b) != 1) return 0;

    printf("\\n[ORIGINAL VALUES]: A = %d, B = %d\\n", a, b);

    // Method 1: Swapping using a 3rd temporary variable
    temp = a;
    a = b;
    b = temp;
    printf("\\n[METHOD 1 - Using Temp Variable]:\\n");
    printf("Swapped: A = %d, B = %d\\n", a, b);

    // Method 2: Swapping back without 3rd variable using Bitwise XOR
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    printf("\\n[METHOD 2 - Bitwise XOR (No Extra Memory)]:\\n");
    printf("Swapped back: A = %d, B = %d\\n", a, b);

    return 0;
}`,
    sampleInput: `A: 25
B: 70`,
    sampleOutput: `Enter first integer (A) : 25
Enter second integer (B): 70

[ORIGINAL VALUES]: A = 25, B = 70

[METHOD 1 - Using Temp Variable]:
Swapped: A = 70, B = 25

[METHOD 2 - Bitwise XOR (No Extra Memory)]:
Swapped back: A = 25, B = 70`,
    vivaQuestions: [
      {
        qEn: 'Why is the bitwise XOR method preferred over arithmetic (+ and -) swap?',
        qHi: 'अंकगणितीय विधि (+ और -) की तुलना में बिटवाइज़ XOR विधि को प्राथमिकता क्यों दी जाती है?',
        aEn: 'The arithmetic method (A = A + B) can trigger undefined integer overflow if the sum exceeds the 32-bit limits. Bitwise XOR works on individual bits and cannot overflow.',
        aHi: 'अंकगणितीय विधि में A + B करने पर यदि संख्या 32-बिट सीमा पार कर जाए तो ओवरफ्लो हो जाता है। XOR में ओवरफ्लो का कोई जोखिम नहीं होता।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 2: Conditionals & Switch
  // -------------------------------------------------------------
  {
    id: 'lab-04',
    number: 4,
    title: 'Largest of Three Numbers (Nested If & Ternary)',
    titleHindi: 'तीन संख्याओं में से सबसे बड़ी संख्या ज्ञात करना',
    category: 'Conditionals & Switch',
    difficulty: 'Easy',
    objective: 'Write a C program to find the largest among three numbers using nested if-else structures and conditional ternary operator.',
    objectiveHindi: 'नेस्टेड if-else और टर्नरी ऑपरेटर (? :) का उपयोग करके तीन संख्याओं में से सबसे बड़ी संख्या ज्ञात करने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Conditional Branching Logic:
To determine the maximum of three numbers (A, B, C):
1. Compare A with B and A with C simultaneously using logical AND (&&):
   If (A >= B && A >= C) -> A is the largest.
2. Otherwise, if (B >= A && B >= C) -> B is the largest.
3. If both conditions fail -> C is guaranteed to be the largest.

Ternary Operator (? :):
The conditional operator evaluates an expression in a single line:
int max = (A > B) ? ((A > C) ? A : C) : ((B > C) ? B : C);`,
    theoryExplanationHi: `कंडीशनल ब्रांचिंग लॉजिक:
तीन संख्याओं (A, B, C) में से अधिकतम संख्या ज्ञात करने के लिए:
1. लॉजिकल AND (&&) ऑपरेटर द्वारा A की तुलना B और C दोनों से करें:
   यदि (A >= B && A >= C) है, तो A सबसे बड़ा है।
2. अन्यथा, यदि (B >= A && B >= C) है, तो B सबसे बड़ा है।
3. यदि दोनों गलत हैं, तो निश्चित रूप से C सबसे बड़ा है।

टर्नरी ऑपरेटर (Ternary Operator ? :):
यह if-else का संक्षिप्त रूप है:
int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);`,
    algorithmEn: [
      'Step 1: Read three integers A, B, and C.',
      'Step 2: Check if A >= B AND A >= C: If true, Largest = A.',
      'Step 3: Else check if B >= A AND B >= C: If true, Largest = B.',
      'Step 4: Else Largest = C.',
      'Step 5: Verify result using conditional ternary operator.',
      'Step 6: Display the largest number.'
    ],
    algorithmHi: [
      'चरण 1: उपयोगकर्ता से तीन संख्याएं A, B, और C इनपुट लें।',
      'चरण 2: यदि (A >= B और A >= C) है, तो सबसे बड़ा = A।',
      'चरण 3: अन्यथा यदि (B >= A और B >= C) है, तो सबसे बड़ा = B।',
      'चरण 4: अन्यथा सबसे बड़ा = C।',
      'चरण 5: टर्नरी ऑपरेटर से परिणाम सत्यापित करें और प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    double a, b, c, largest;

    printf("=== Find Largest of 3 Numbers ===\\n");
    printf("Enter number A: ");
    if (scanf("%lf", &a) != 1) return 0;
    printf("Enter number B: ");
    if (scanf("%lf", &b) != 1) return 0;
    printf("Enter number C: ");
    if (scanf("%lf", &c) != 1) return 0;

    // Logic using nested if-else
    if (a >= b && a >= c) {
        largest = a;
    } else if (b >= a && b >= c) {
        largest = b;
    } else {
        largest = c;
    }

    printf("\\n[RESULT via if-else]:\\n");
    printf("The largest number is: %.2lf\\n", largest);

    // Demonstration via Compact Ternary Operator
    double maxTernary = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    printf("[RESULT via Ternary ?:]: %.2lf\\n", maxTernary);

    return 0;
}`,
    sampleInput: `A: 45.8
B: 92.4
C: 67.1`,
    sampleOutput: `=== Find Largest of 3 Numbers ===
Enter number A: 45.8
Enter number B: 92.4
Enter number C: 67.1

[RESULT via if-else]:
The largest number is: 92.40
[RESULT via Ternary ?:]: 92.40`,
    vivaQuestions: [
      {
        qEn: 'What is short-circuit evaluation in C logical operators?',
        qHi: 'लॉजिकल ऑपरेटर्स (&& और ||) में शॉर्ट-सर्किट मूल्यांकन क्या है?',
        aEn: 'In (expr1 && expr2), if expr1 is false, expr2 is never evaluated because the outcome is already guaranteed false. Similarly, in (expr1 || expr2), if expr1 is true, expr2 is skipped.',
        aHi: '&& ऑपरेटर में यदि पहला भाग गलत (false) हो, तो दूसरा भाग जाँचा ही नहीं जाता क्योंकि परिणाम पहले ही गलत तय हो चुका है।'
      }
    ]
  },

  {
    id: 'lab-05',
    number: 5,
    title: 'Leap Year Checking (Century & Non-Century Rules)',
    titleHindi: 'लीप वर्ष की पहचान (शताब्दी एवं सामान्य वर्ष नियम)',
    category: 'Conditionals & Switch',
    difficulty: 'Easy',
    objective: 'Write a C program to check whether a given year is a leap year or not, rigorously applying the Gregorian calendar rules.',
    objectiveHindi: 'ग्रेगोरियन कैलेंडर के सटीक नियमों के अनुसार यह जाँचने के लिए C प्रोग्राम लिखें कि कोई वर्ष लीप वर्ष है या नहीं।',
    theoryExplanationEn: `Astronomical Leap Year Rules:
The earth takes approximately 365.2425 days to orbit the sun. To keep calendar aligned:
Rule 1: A year is a leap year if it is divisible by 4 AND NOT divisible by 100.
Rule 2: Exception: If the year is divisible by 100, it MUST also be divisible by 400 to qualify as a leap year.
Examples:
- 2024: Divisible by 4, not 100 -> Leap Year.
- 1900: Divisible by 100, but NOT by 400 -> NOT a Leap Year.
- 2000: Divisible by 100 AND by 400 -> Leap Year!

Compound Boolean Condition:
((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))`,
    theoryExplanationHi: `लीप वर्ष के सटीक वैज्ञानिक नियम:
पृथ्वी को सूर्य का चक्कर लगाने में 365.2422 दिन लगते हैं। अतः कैलेंडर को सही रखने के नियम:
1. सामान्य नियम: कोई वर्ष 4 से पूर्णतः विभाज्य हो और 100 से विभाज्य न हो, तो वह लीप वर्ष है।
2. शताब्दी वर्ष का नियम: यदि वर्ष 100 से विभाज्य है (जैसे 1900, 2000), तो उसे 400 से भी पूर्णतः विभाज्य होना पड़ेगा।
उदाहरण:
- 2024 : 4 से कटता है, 100 से नहीं -> लीप वर्ष है।
- 1900 : 100 से कटता है लेकिन 400 से नहीं -> लीप वर्ष नहीं है।
- 2000 : 400 से कटता है -> लीप वर्ष है!`,
    algorithmEn: [
      'Step 1: Read integer year from user.',
      'Step 2: If (year % 400 == 0), then Year is a Leap Year.',
      'Step 3: Else if (year % 100 == 0), then Year is NOT a Leap Year.',
      'Step 4: Else if (year % 4 == 0), then Year is a Leap Year.',
      'Step 5: Else Year is NOT a Leap Year.',
      'Step 6: Display result.'
    ],
    algorithmHi: [
      'चरण 1: उपयोगकर्ता से वर्ष (year) इनपुट लें।',
      'चरण 2: यदि (year % 400 == 0) है -> लीप वर्ष है।',
      'चरण 3: अन्यथा यदि (year % 100 == 0) है -> लीप वर्ष नहीं है।',
      'चरण 4: अन्यथा यदि (year % 4 == 0) है -> लीप वर्ष है।',
      'चरण 5: अन्यथा -> सामान्य वर्ष है।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int year;

    printf("Enter any calendar year (e.g. 2024, 1900, 2000): ");
    if (scanf("%d", &year) != 1 || year <= 0) {
        printf("Invalid year entered!\\n");
        return 0;
    }

    // Precise Gregorian calendar condition
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("\\n-> %d IS A LEAP YEAR! (366 Days, February has 29 days)\\n", year);
    } else {
        printf("\\n-> %d is NOT a leap year. (Standard 365 Days, February has 28 days)\\n", year);
    }

    return 0;
}`,
    sampleInput: '2000',
    sampleOutput: `Enter any calendar year (e.g. 2024, 1900, 2000): 2000

-> 2000 IS A LEAP YEAR! (366 Days, February has 29 days)`,
    vivaQuestions: [
      {
        qEn: 'Why was the year 1900 not a leap year even though 1900 is divisible by 4?',
        qHi: '1900 चार से विभाजित होने के बावजूद लीप वर्ष क्यों नहीं था?',
        aEn: 'Century years must be divisible by 400. 1900 % 400 = 300 (not zero), so according to the Gregorian calendar reform, 1900 was a common year.',
        aHi: 'शताब्दी वर्षों के लिए 400 से कटना आवश्यक है। 1900, 400 से विभाजित नहीं होता, इसलिए यह साधारण वर्ष था।'
      }
    ]
  },

  {
    id: 'lab-06',
    number: 6,
    title: 'Roots of a Quadratic Equation (Real & Complex)',
    titleHindi: 'द्विघात समीकरण के मूल (वास्तविक एवं काल्पनिक)',
    category: 'Conditionals & Switch',
    difficulty: 'Medium',
    objective: 'Write a C program to find the roots of a quadratic equation ax² + bx + c = 0, handling all cases: real and equal, real and distinct, and complex roots.',
    objectiveHindi: 'ax² + bx + c = 0 द्विघात समीकरण के मूल (roots) ज्ञात करने वाला C प्रोग्राम लिखें जो वास्तविक, समान और काल्पनिक (complex) सभी स्थितियों को हल करे।',
    theoryExplanationEn: `Mathematical Formulation:
Standard Form: a*x² + b*x + c = 0, where a != 0.
Discriminant (D) = b² - 4*a*c.
1. Case 1: D > 0 (Real and Distinct Roots)
   root1 = (-b + sqrt(D)) / (2*a)
   root2 = (-b - sqrt(D)) / (2*a)
2. Case 2: D == 0 (Real and Equal Roots)
   root1 = root2 = -b / (2*a)
3. Case 3: D < 0 (Complex Conjugate Roots)
   realPart = -b / (2*a)
   imagPart = sqrt(-D) / (2*a)
   Roots are: realPart ± i * imagPart`,
    theoryExplanationHi: `गणितीय विश्लेषण:
मानक समीकरण: ax² + bx + c = 0 (जहाँ a != 0)
विविक्तकर (Discriminant D) = b² - 4ac
1. स्थिति 1: D > 0 (वास्तविक और भिन्न मूल)
   root1 = (-b + √D) / (2a), root2 = (-b - √D) / (2a)
2. स्थिति 2: D == 0 (वास्तविक और समान मूल)
   root1 = root2 = -b / (2a)
3. स्थिति 3: D < 0 (काल्पनिक/सम्मिश्र मूल)
   वास्तविक भाग = -b / (2a)
   काल्पनिक भाग = √( -D ) / (2a)
   मूल: वास्तविक भाग ± i (काल्पनिक भाग)`,
    algorithmEn: [
      'Step 1: Read coefficients a, b, and c.',
      'Step 2: If a == 0, print "Not a quadratic equation" and exit.',
      'Step 3: Calculate discriminant D = (b * b) - (4 * a * c).',
      'Step 4: If D > 0, compute real roots using sqrt(D).',
      'Step 5: If D == 0, compute single repeated root: -b / (2*a).',
      'Step 6: If D < 0, compute realPart and imagPart using sqrt(-D).',
      'Step 7: Display roots with appropriate labels.'
    ],
    algorithmHi: [
      'चरण 1: गुणांक a, b, और c इनपुट लें।',
      'चरण 2: यदि a == 0 है तो यह द्विघात समीकरण नहीं है।',
      'चरण 3: विविक्तकर D = b² - 4ac निकालें।',
      'चरण 4: यदि D > 0 है तो sqrt(D) से दो वास्तविक मूल निकालें।',
      'चरण 5: यदि D == 0 है तो -b / (2a) से समान मूल निकालें।',
      'चरण 6: यदि D < 0 है तो sqrt(-D) से काल्पनिक भाग निकालें और real ± i*imag प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>
#include <math.h>

int main() {
    double a, b, c;
    double discriminant, root1, root2, realPart, imagPart;

    printf("=== Quadratic Equation Solver (ax^2 + bx + c = 0) ===\\n");
    printf("Enter coefficient a: ");
    if (scanf("%lf", &a) != 1) return 0;
    printf("Enter coefficient b: ");
    if (scanf("%lf", &b) != 1) return 0;
    printf("Enter coefficient c: ");
    if (scanf("%lf", &c) != 1) return 0;

    if (a == 0) {
        printf("Error: 'a' cannot be 0 in a quadratic equation!\\n");
        return 0;
    }

    discriminant = (b * b) - (4.0 * a * c);

    printf("\\nDiscriminant (D) = %.2lf\\n", discriminant);

    if (discriminant > 0) {
        // Roots are real and distinct
        root1 = (-b + sqrt(discriminant)) / (2.0 * a);
        root2 = (-b - sqrt(discriminant)) / (2.0 * a);
        printf("Roots are REAL and DISTINCT:\\n");
        printf("Root 1 = %.4lf\\n", root1);
        printf("Root 2 = %.4lf\\n", root2);
    } else if (discriminant == 0) {
        // Roots are real and equal
        root1 = -b / (2.0 * a);
        printf("Roots are REAL and EQUAL:\\n");
        printf("Root 1 = Root 2 = %.4lf\\n", root1);
    } else {
        // Roots are complex conjugates
        realPart = -b / (2.0 * a);
        imagPart = sqrt(-discriminant) / (2.0 * a);
        printf("Roots are COMPLEX and IMAGINARY:\\n");
        printf("Root 1 = %.4lf + %.4lfi\\n", realPart, imagPart);
        printf("Root 2 = %.4lf - %.4lfi\\n", realPart, imagPart);
    }

    return 0;
}`,
    sampleInput: `a: 1
b: -5
c: 6`,
    sampleOutput: `=== Quadratic Equation Solver (ax^2 + bx + c = 0) ===
Enter coefficient a: 1
Enter coefficient b: -5
Enter coefficient c: 6

Discriminant (D) = 1.00
Roots are REAL and DISTINCT:
Root 1 = 3.0000
Root 2 = 2.0000`,
    vivaQuestions: [
      {
        qEn: 'Why do we compute sqrt(-discriminant) when D < 0?',
        qHi: 'जब D < 0 होता है तो हम sqrt(-D) क्यों निकालते हैं?',
        aEn: 'The sqrt() function cannot accept negative numbers (it causes NaN/Domain Error). Multiplying by -1 converts negative D into positive, allowing us to calculate the imaginary component multiplier i.',
        aHi: 'sqrt() ऋणात्मक संख्याओं के लिए काम नहीं करता (NaN त्रुटि आती है)। इसलिए -D करके उसे धनात्मक बनाते हैं और काल्पनिक इकाई i अलग रखते हैं।'
      }
    ]
  },

  {
    id: 'lab-07',
    number: 7,
    title: 'Menu-Driven Calculator using switch-case',
    titleHindi: 'स्विच-केस द्वारा मेनू-आधारित कैलकुलेटर',
    category: 'Conditionals & Switch',
    difficulty: 'Easy',
    objective: 'Write a menu-driven C program to simulate a basic calculator performing Addition, Subtraction, Multiplication, Division, and Modulus using switch-case.',
    objectiveHindi: 'स्विच-केस का उपयोग करके जोड़, घटाव, गुणा, भाग और शेषफल की गणना करने वाला मेनू-आधारित C कैलकुलेटर प्रोग्राम लिखें।',
    theoryExplanationEn: `The switch-case statement is a multi-way branch selection structure.
Key Rules:
1. Expression must evaluate to an integral or character type (int, char, enum). Float expressions are ILLEGAL in switch.
2. Case values must be constant or literal expressions; variables are forbidden.
3. The 'break' keyword prevents "fall-through" into subsequent cases.
4. Division by Zero: Must be guarded against in division (/) and modulo (%) operations to avoid SIGFPE (Floating Point Exception crash).`,
    theoryExplanationHi: `switch-case एक बहुमार्गीय निर्णय संरचना है।
मुख्य नियम:
1. switch के अंदर केवल पूर्णांक (int) या वर्ण (char) हो सकते हैं। float का प्रयोग अवैध है।
2. case के आगे केवल स्थिर (constant) मान आ सकते हैं, वेरिएबल नहीं।
3. प्रत्येक केस के अंत में 'break' लगाना आवश्यक है, अन्यथा निष्पादन अगले केस में गिर (fall-through) जाएगा।
4. शून्य से विभाजन (Division by Zero): भाग (/) और शेषफल (%) में भाजक 0 नहीं होना चाहिए।`,
    algorithmEn: [
      'Step 1: Display operation menu (+, -, *, /, %).',
      'Step 2: Read operator character from user.',
      'Step 3: Read two operands num1 and num2.',
      'Step 4: Switch on operator:',
      '        Case +: Print num1 + num2; break',
      '        Case -: Print num1 - num2; break',
      '        Case *: Print num1 * num2; break',
      '        Case /: If num2 != 0, print num1 / num2; else Error; break',
      '        Case %: If (int)num2 != 0, print num1 % num2; break',
      '        Default: Print "Invalid Operator".',
      'Step 5: Terminate program.'
    ],
    algorithmHi: [
      'चरण 1: ऑपरेटर मेनू प्रदर्शित करें (+, -, *, /, %)।',
      'चरण 2: उपयोगकर्ता से ऑपरेटर और दो संख्याएं इनपुट लें।',
      'चरण 3: ऑपरेटर पर switch करें और संबंधित गणितीय गणना कर प्रिंट करें।',
      'चरण 4: यदि ऑपरेटर अमान्य हो तो default केस में त्रुटि संदेश दिखाएं।'
    ],
    cCode: `#include <stdio.h>

int main() {
    char op;
    double num1, num2;

    printf("=======================================\\n");
    printf("        C-GURU ARITHMETIC CALCULATOR   \\n");
    printf("=======================================\\n");
    printf("Select Operator [+ , - , * , / , %%] : ");
    if (scanf(" %c", &op) != 1) return 0;

    printf("Enter First Number  : ");
    if (scanf("%lf", &num1) != 1) return 0;
    printf("Enter Second Number : ");
    if (scanf("%lf", &num2) != 1) return 0;

    printf("\\n----------------- RESULT -----------------\\n");
    switch (op) {
        case '+':
            printf("%.2lf + %.2lf = %.2lf\\n", num1, num2, num1 + num2);
            break;
        case '-':
            printf("%.2lf - %.2lf = %.2lf\\n", num1, num2, num1 - num2);
            break;
        case '*':
            printf("%.2lf * %.2lf = %.2lf\\n", num1, num2, num1 * num2);
            break;
        case '/':
            if (num2 != 0) {
                printf("%.2lf / %.2lf = %.4lf\\n", num1, num2, num1 / num2);
            } else {
                printf("Error: Division by ZERO is mathematically undefined!\\n");
            }
            break;
        case '%':
            if ((long long)num2 != 0) {
                long long rem = (long long)num1 % (long long)num2;
                printf("%lld %%%% %lld = %lld (Integer Remainder)\\n", (long long)num1, (long long)num2, rem);
            } else {
                printf("Error: Modulo by ZERO is invalid!\\n");
            }
            break;
        default:
            printf("Error: Invalid Operator '%c' selected!\\n", op);
    }
    printf("------------------------------------------\\n");

    return 0;
}`,
    sampleInput: `Operator: *
Num1: 15.5
Num2: 4`,
    sampleOutput: `Select Operator [+ , - , * , / , %] : *
Enter First Number  : 15.5
Enter Second Number : 4

----------------- RESULT -----------------
15.50 * 4.00 = 62.00
------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'Why do we write a leading space in scanf(" %c", &op)?',
        qHi: 'scanf(" %c", &op) में %c के आगे स्पेस क्यों दिया जाता है?',
        aEn: 'The leading space tells scanf to skip any trailing whitespace characters (including newlines from previous Enter key presses) remaining in the stdin buffer.',
        aHi: 'स्पेस कंपाइलर को इनपुट बफर में बचे हुए पुराने न्यूलाइन (\\n) या रिक्त स्थान को नजरअंदाज करने का निर्देश देता है।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 3: Loops & Series
  // -------------------------------------------------------------
  {
    id: 'lab-08',
    number: 8,
    title: 'Factorial of a Number (Iterative Loop)',
    titleHindi: 'संख्या का फैक्टोरियल ज्ञात करना (इटरेटिव लूप)',
    category: 'Loops & Series',
    difficulty: 'Easy',
    objective: 'Write a C program to calculate the factorial of an integer N using iterative loops, handling boundary conditions (0! = 1).',
    objectiveHindi: 'लूप का उपयोग करके किसी पूर्णांक N का फैक्टोरियल (N!) निकालने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Factorial Definition:
For a non-negative integer N, N! is the product of all positive integers less than or equal to N:
N! = N * (N - 1) * (N - 2) * ... * 1.
Boundary Cases:
- 0! = 1 by mathematical definition.
- Negative numbers: Factorial is undefined.
- Data Type Capacity: Factorials grow extremely fast (20! ≈ 2.43 * 10^18). We use 'unsigned long long' to avoid rapid integer overflow.`,
    theoryExplanationHi: `फैक्टोरियल की परिभाषा:
किसी गैर-ऋणात्मक पूर्णांक N का फैक्टोरियल 1 से N तक की सभी संख्याओं का गुणनफल होता है:
N! = N * (N - 1) * ... * 1
विशेष स्थितियां:
- 0! = 1 होता है।
- ऋणात्मक संख्याओं का फैक्टोरियल परिभाषित नहीं है।
- डेटा प्रकार: फैक्टोरियल बहुत तेजी से बढ़ता है, इसलिए 64-बिट 'unsigned long long' का उपयोग किया जाता है।`,
    algorithmEn: [
      'Step 1: Read non-negative integer N.',
      'Step 2: If N < 0, display error and terminate.',
      'Step 3: Initialize fact = 1 (of type unsigned long long).',
      'Step 4: Loop for i = 1 to N: fact = fact * i.',
      'Step 5: Print calculated factorial fact.'
    ],
    algorithmHi: [
      'चरण 1: उपयोगकर्ता से धनात्मक संख्या N इनपुट लें।',
      'चरण 2: यदि N < 0 है, तो अमान्य इनपुट का संदेश दें।',
      'चरण 3: fact = 1 (unsigned long long) सेट करें।',
      'चरण 4: i = 1 से N तक लूप चलाएं: fact = fact * i।',
      'चरण 5: फैक्टोरियल परिणाम प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int n;
    unsigned long long fact = 1;

    printf("Enter a positive integer (0 to 20): ");
    if (scanf("%d", &n) != 1) return 0;

    if (n < 0) {
        printf("Error: Factorial of negative numbers does not exist!\\n");
        return 0;
    }

    if (n > 20) {
        printf("Warning: Result exceeds standard 64-bit integer limit!\\n");
    }

    // Iterative Factorial Computation
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }

    printf("\\n-> %d! = %llu\\n", n, fact);

    return 0;
}`,
    sampleInput: '7',
    sampleOutput: `Enter a positive integer (0 to 20): 7

-> 7! = 5040`,
    vivaQuestions: [
      {
        qEn: 'What is the maximum value of N for which factorial fits in a 64-bit unsigned integer?',
        qHi: '64-बिट unsigned long long में अधिकतम कितने तक का फैक्टोरियल सही समा सकता है?',
        aEn: 'N = 20. 20! is approximately 2.43 * 10^18. 21! overflows the 64-bit maximum (1.84 * 10^19).',
        aHi: 'N = 20। 20! का मान 2.43 × 10^18 होता है। 21! करने पर 64-बिट सीमा पार होकर ओवरफ्लो हो जाता है।'
      }
    ]
  },

  {
    id: 'lab-09',
    number: 9,
    title: 'Fibonacci Series Generation up to N Terms',
    titleHindi: 'फाइबोनैचि श्रृंखला (N पदों तक)',
    category: 'Loops & Series',
    difficulty: 'Easy',
    objective: 'Write a C program to generate and display the Fibonacci series up to N terms (0, 1, 1, 2, 3, 5, 8, ...).',
    objectiveHindi: 'N पदों तक फाइबोनैचि श्रृंखला (0, 1, 1, 2, 3, 5, 8...) प्रिंट करने वाला C प्रोग्राम लिखें।',
    theoryExplanationEn: `Fibonacci Sequence Principle:
Every term after the first two is the sum of the preceding two terms:
F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2) for n >= 2.
Time Complexity: O(N) using iterative loop with two rolling state variables.
Space Complexity: O(1) auxiliary memory.`,
    theoryExplanationHi: `फाइबोनैचि श्रृंखला का सिद्धांत:
पहले दो पदों के बाद का प्रत्येक पद अपने पिछले दो पदों का योग होता है:
F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2)
समय जटिलता: केवल एक लूप चलाने से O(N) होती है।
स्थान जटिलता: O(1) (बिना अतिरिक्त मेमोरी के)।`,
    algorithmEn: [
      'Step 1: Read number of terms N.',
      'Step 2: Initialize t1 = 0, t2 = 1.',
      'Step 3: Print t1 and t2 for initial terms.',
      'Step 4: Run loop from i = 3 to N: nextTerm = t1 + t2; print nextTerm; t1 = t2; t2 = nextTerm.',
      'Step 5: End.'
    ],
    algorithmHi: [
      'चरण 1: पदों की संख्या N इनपुट लें।',
      'चरण 2: t1 = 0 और t2 = 1 निर्धारित करें।',
      'चरण 3: पहले दो पद प्रिंट करें।',
      'चरण 4: 3 से N तक लूप चलाएं: next = t1 + t2 प्रिंट करें, फिर t1 = t2 और t2 = next करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int n;
    long long t1 = 0, t2 = 1, nextTerm;

    printf("Enter number of terms to generate (N >= 1): ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("Please enter a positive integer.\\n");
        return 0;
    }

    printf("\\nFibonacci Series (%d terms):\\n", n);
    for (int i = 1; i <= n; i++) {
        if (i == 1) {
            printf("%lld", t1);
            continue;
        }
        if (i == 2) {
            printf(", %lld", t2);
            continue;
        }
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
        printf(", %lld", nextTerm);
    }
    printf("\\n");

    return 0;
}`,
    sampleInput: '8',
    sampleOutput: `Enter number of terms to generate (N >= 1): 8

Fibonacci Series (8 terms):
0, 1, 1, 2, 3, 5, 8, 13`,
    vivaQuestions: [
      {
        qEn: 'What is the ratio of consecutive Fibonacci terms as N approaches infinity?',
        qHi: 'फाइबोनैचि श्रृंखला के उत्तरोत्तर पदों का अनुपात अनंत की ओर बढ़ने पर क्या कहलाता है?',
        aEn: 'The Golden Ratio (phi ≈ 1.6180339887).',
        aHi: 'इसे स्वर्णिम अनुपात (Golden Ratio φ ≈ 1.618) कहते हैं।'
      }
    ]
  },

  {
    id: 'lab-10',
    number: 10,
    title: 'Prime Number Verification & Range Generator',
    titleHindi: 'अभाज्य संख्या (प्राइम नंबर) जांच एवं श्रृंखला',
    category: 'Loops & Series',
    difficulty: 'Medium',
    objective: 'Write an optimized C program to check whether a given integer is Prime or Composite, testing divisibility up to √N.',
    objectiveHindi: 'यह जाँचने का C प्रोग्राम लिखें कि दी गई संख्या अभाज्य (Prime) है या भाज्य (Composite)। √N तक परीक्षण करके सर्वोत्तम गति प्राप्त करें।',
    theoryExplanationEn: `Mathematical Optimization for Prime Testing:
A prime number is a natural number strictly greater than 1 with no positive divisors other than 1 and itself.
Naive method: Test divisibility by all numbers from 2 up to N-1 -> O(N).
Optimized method:
If N has any factor, at least one factor must be less than or equal to √N.
Therefore, testing up to i * i <= N runs in O(√N) time!
Additionally:
- N <= 1 is never prime.
- 2 and 3 are prime.
- Even numbers > 2 are not prime.`,
    theoryExplanationHi: `अभाज्य संख्या जांच का अनुकूलित (Optimized) सिद्धांत:
1 से बड़ी वह संख्या जो केवल 1 और स्वयं से विभाजित हो, अभाज्य कहलाती है।
सामान्य विधि: 2 से N-1 तक भाग देकर देखना (धीमी गति - O(N))।
वैज्ञानिक विधि: यदि N का कोई गुणनखंड है, तो कम से कम एक गुणनखंड √N से छोटा या बराबर होना ही चाहिए।
अतः केवल i * i <= N तक लूप चलाने पर गति O(√N) हो जाती है।`,
    algorithmEn: [
      'Step 1: Read integer N.',
      'Step 2: If N <= 1, return Not Prime.',
      'Step 3: If N <= 3, return Prime.',
      'Step 4: If N % 2 == 0 or N % 3 == 0, return Not Prime.',
      'Step 5: For i = 5; i * i <= N; i += 6:',
      '        If N % i == 0 or N % (i + 2) == 0 -> return Not Prime.',
      'Step 6: Return Prime.'
    ],
    algorithmHi: [
      'चरण 1: संख्या N इनपुट लें।',
      'चरण 2: यदि N <= 1 है तो अभाज्य नहीं है।',
      'चरण 3: यदि N == 2 या 3 है तो अभाज्य है।',
      'चरण 4: i = 2 से शुरू करके i * i <= N तक भाग देकर जांचें।',
      'चरण 5: यदि किसी से पूरा भाग लगे तो "भाज्य" अन्यथा "अभाज्य" घोषित करें।'
    ],
    cCode: `#include <stdio.h>
#include <stdbool.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;

    // Optimized check up to sqrt(N) skipping multiples of 2 & 3
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int num;

    printf("Enter an integer to test for primality: ");
    if (scanf("%d", &num) != 1) return 0;

    if (isPrime(num)) {
        printf("-> %d IS A PRIME NUMBER! (Divisible strictly by 1 and itself)\\n", num);
    } else {
        printf("-> %d is a COMPOSITE number (Not Prime).\\n", num);
    }

    return 0;
}`,
    sampleInput: '97',
    sampleOutput: `Enter an integer to test for primality: 97

-> 97 IS A PRIME NUMBER! (Divisible strictly by 1 and itself)`,
    vivaQuestions: [
      {
        qEn: 'Why is 1 neither prime nor composite?',
        qHi: '1 न तो अभाज्य है और न ही भाज्य, क्यों?',
        aEn: 'By the Fundamental Theorem of Arithmetic, a prime must have exactly two distinct positive divisors (1 and itself). 1 has only one divisor.',
        aHi: 'अंकगणित के मूलभूत प्रमेय के अनुसार अभाज्य संख्या के ठीक दो अलग-अलग भाजक होने चाहिए। 1 का केवल एक ही भाजक (1) है।'
      }
    ]
  },

  {
    id: 'lab-11',
    number: 11,
    title: 'Palindrome & Reverse of a Number',
    titleHindi: 'संख्या को उलटना एवं पलिंड्रोम जांच',
    category: 'Loops & Series',
    difficulty: 'Easy',
    objective: 'Write a C program to reverse a given integer and check whether it is a Palindrome (e.g., 121, 1331).',
    objectiveHindi: 'किसी संख्या को उलटने (Reverse) और यह जाँचने का C प्रोग्राम लिखें कि क्या वह पलिंड्रोम (Palindrome) संख्या है।',
    theoryExplanationEn: `Number Palindrome Logic:
A palindrome number reads identically forwards and backwards (e.g. 1221, 545).
Algorithm to reverse an integer:
1. Extract last digit: rem = n % 10;
2. Append to reversed number: rev = (rev * 10) + rem;
3. Truncate last digit: n = n / 10;
Repeat until n becomes 0.
Compare original number with reversed number. If original == reversed, it is a Palindrome.`,
    theoryExplanationHi: `पलिंड्रोम संख्या का सिद्धांत:
वह संख्या जिसे आगे और पीछे दोनों तरफ से पढ़ने पर समान मान प्राप्त हो, पलिंड्रोम कहलाती है (जैसे 121, 1331)।
संख्या उलटने की विधि:
1. अंतिम अंक निकालें: rem = n % 10;
2. उल्टी संख्या में जोड़ें: rev = (rev * 10) + rem;
3. संख्या को 10 से भाग देकर छोटा करें: n = n / 10;
लूप समाप्त होने पर मूल संख्या की rev से तुलना करें।`,
    algorithmEn: [
      'Step 1: Read integer N.',
      'Step 2: Store original = N and initialize rev = 0.',
      'Step 3: While N > 0: rev = (rev * 10) + (N % 10); N = N / 10.',
      'Step 4: If original == rev -> Palindrome; Else -> Not Palindrome.'
    ],
    algorithmHi: [
      'चरण 1: संख्या N इनपुट लें।',
      'चरण 2: original = N रखें और rev = 0 करें।',
      'चरण 3: जब तक N > 0 रहे: rev = (rev * 10) + (N % 10); N = N / 10 करें।',
      'चरण 4: यदि original == rev है तो पलिंड्रोम है, अन्यथा नहीं।'
    ],
    cCode: `#include <stdio.h>

int main() {
    long long n, original, reversed = 0;

    printf("Enter a positive integer: ");
    if (scanf("%lld", &n) != 1) return 0;

    original = n;

    // Reverse the number
    while (n > 0) {
        int rem = n % 10;
        reversed = (reversed * 10) + rem;
        n /= 10;
    }

    printf("\\nOriginal Number : %lld\\n", original);
    printf("Reversed Number : %lld\\n", reversed);

    if (original == reversed) {
        printf("Result: YES! It IS a Palindrome number.\\n");
    } else {
        printf("Result: NO, it is NOT a Palindrome number.\\n");
    }

    return 0;
}`,
    sampleInput: '12321',
    sampleOutput: `Enter a positive integer: 12321

Original Number : 12321
Reversed Number : 12321
Result: YES! It IS a Palindrome number.`,
    vivaQuestions: [
      {
        qEn: 'What happens if a negative number is tested for Palindrome?',
        qHi: 'ऋणात्मक संख्या की पलिंड्रोम जांच करने पर क्या होता है?',
        aEn: 'Negative numbers are not palindromes because the negative sign at the front does not appear at the end (e.g., -121 reversed is 121-).',
        aHi: 'ऋणात्मक संख्याएं पलिंड्रोम नहीं होतीं क्योंकि आगे लगा माइनस चिह्न पीछे नहीं आ सकता।'
      }
    ]
  },

  {
    id: 'lab-12',
    number: 12,
    title: 'Armstrong Number Verification',
    titleHindi: 'आर्मस्ट्रांग संख्या की पहचान',
    category: 'Loops & Series',
    difficulty: 'Medium',
    objective: 'Write a C program to check whether a given integer is an Armstrong number (Narcissistic number of order k).',
    objectiveHindi: 'यह जाँचने का C प्रोग्राम लिखें कि क्या दी गई संख्या एक आर्मस्ट्रांग संख्या (Armstrong Number) है।',
    theoryExplanationEn: `Armstrong Number Definition:
An Armstrong number of order k is a number that is equal to the sum of its own digits each raised to the power of k, where k is the total number of digits.
Examples:
- 153 has 3 digits: 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 (Armstrong!)
- 370: 3³ + 7³ + 0³ = 27 + 343 + 0 = 370 (Armstrong!)
- 1634 has 4 digits: 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634 (Armstrong!)`,
    theoryExplanationHi: `आर्मस्ट्रांग संख्या की परिभाषा:
यदि किसी संख्या के प्रत्येक अंक को अंकों की कुल संख्या (k) की घात पर चढ़ाकर जोड़ा जाए, और योगफल पुनः वही मूल संख्या प्राप्त हो, तो उसे आर्मस्ट्रांग संख्या कहते हैं।
उदाहरण:
- 153 (3 अंक): 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 (आर्मस्ट्रांग)
- 1634 (4 अंक): 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1634 (आर्मस्ट्रांग)`,
    algorithmEn: [
      'Step 1: Read number N.',
      'Step 2: Count total number of digits k in N.',
      'Step 3: Initialize sum = 0.',
      'Step 4: For each digit d in N: sum += pow(d, k).',
      'Step 5: If sum == N -> Armstrong Number; Else -> Not Armstrong.'
    ],
    algorithmHi: [
      'चरण 1: संख्या N इनपुट लें।',
      'चरण 2: N में कुल अंकों की संख्या (k) गिनें।',
      'चरण 3: sum = 0 निर्धारित करें।',
      'चरण 4: N के प्रत्येक अंक के लिए: sum += pow(अंक, k) जोड़ें।',
      'चरण 5: यदि sum == N है तो आर्मस्ट्रांग संख्या है।'
    ],
    cCode: `#include <stdio.h>
#include <math.h>

int main() {
    long long num, temp, original, sum = 0;
    int digits = 0;

    printf("Enter any positive integer: ");
    if (scanf("%lld", &num) != 1 || num < 0) return 0;

    original = num;

    // Step 1: Count number of digits
    temp = num;
    while (temp > 0) {
        digits++;
        temp /= 10;
    }

    // Step 2: Compute sum of digits raised to power 'digits'
    temp = num;
    while (temp > 0) {
        int rem = temp % 10;
        sum += (long long)pow(rem, digits);
        temp /= 10;
    }

    printf("\\nTotal Digits: %d\\n", digits);
    printf("Sum of digits^%d = %lld\\n", digits, sum);

    if (sum == original) {
        printf("-> %lld IS AN ARMSTRONG NUMBER!\\n", original);
    } else {
        printf("-> %lld is NOT an Armstrong number.\\n", original);
    }

    return 0;
}`,
    sampleInput: '153',
    sampleOutput: `Enter any positive integer: 153

Total Digits: 3
Sum of digits^3 = 153
-> 153 IS AN ARMSTRONG NUMBER!`,
    vivaQuestions: [
      {
        qEn: 'Are all single-digit positive numbers Armstrong numbers?',
        qHi: 'क्या सभी 1-अंकीय धनात्मक संख्याएं आर्मस्ट्रांग होती हैं?',
        aEn: 'Yes! For any single digit d (1 to 9), k = 1, and d^1 = d always.',
        aHi: 'हाँ! 1 से 9 तक की सभी संख्याएं आर्मस्ट्रांग हैं क्योंकि उनकी घात 1 होने पर वही मान आता है।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 4: Patterns
  // -------------------------------------------------------------
  {
    id: 'lab-13',
    number: 13,
    title: 'Star Pyramid & Equilateral Triangle Patterns',
    titleHindi: 'स्टार पिरामिड एवं त्रिभुज पैटर्न प्रिंटिंग',
    category: 'Patterns',
    difficulty: 'Easy',
    objective: 'Write a C program to print an equilateral star pyramid and inverted pyramid pattern of height N using nested loops.',
    objectiveHindi: 'नेस्टेड लूप्स का उपयोग करके N ऊंचाई का समबाहु स्टार पिरामिड पैटर्न प्रिंट करने वाला C प्रोग्राम लिखें।',
    theoryExplanationEn: `Nested Loop Pattern Analysis:
For each row i from 1 to N:
1. Outer loop controls row iteration: for (i = 1; i <= N; i++).
2. First inner loop prints leading spaces to right-shift stars:
   spaces = N - i spaces.
3. Second inner loop prints odd number of stars:
   stars = (2 * i - 1) stars.
4. After each row, print a newline character (\\n).`,
    theoryExplanationHi: `नेस्टेड लूप का विश्लेषण:
प्रत्येक पंक्ति i (1 से N तक) के लिए:
1. बाहरी लूप पंक्तियों (rows) को चलाता है।
2. पहला आंतरिक लूप स्पेस (रिक्त स्थान) देता है: (N - i) स्पेस।
3. दूसरा आंतरिक लूप तारे (*) प्रिंट करता है: (2 * i - 1) तारे।
4. पंक्ति समाप्त होने पर \\n से अगली पंक्ति पर जाएं।`,
    algorithmEn: [
      'Step 1: Read pyramid height N.',
      'Step 2: Loop i = 1 to N:',
      '        a. Loop j = 1 to N - i: Print space " ".',
      '        b. Loop k = 1 to 2 * i - 1: Print star "*".',
      '        c. Print newline.',
      'Step 3: End.'
    ],
    algorithmHi: [
      'चरण 1: पिरामिड की ऊंचाई N इनपुट लें।',
      'चरण 2: i = 1 से N तक बाहरी लूप चलाएं:',
      '        क. N - i स्पेस प्रिंट करें।',
      '        ख. 2*i - 1 तारे (*) प्रिंट करें।',
      '        ग. नई लाइन प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int n;

    printf("Enter pyramid height (Number of rows): ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    printf("\\n--- EQUILATERAL STAR PYRAMID ---\\n\\n");
    for (int i = 1; i <= n; i++) {
        // Print leading spaces
        for (int space = 1; space <= n - i; space++) {
            printf(" ");
        }
        // Print stars
        for (int star = 1; star <= (2 * i - 1); star++) {
            printf("*");
        }
        printf("\\n");
    }

    return 0;
}`,
    sampleInput: '5',
    sampleOutput: `Enter pyramid height (Number of rows): 5

--- EQUILATERAL STAR PYRAMID ---

    *
   ***
  *****
 *******
*********`,
    vivaQuestions: [
      {
        qEn: 'How many total stars are printed in a pyramid of height N?',
        qHi: 'N ऊंचाई वाले पिरामिड में कुल कितने तारे प्रिंट होते हैं?',
        aEn: 'The sum of first N odd numbers is N². For N=5, 5² = 25 stars.',
        aHi: 'प्रथम N विषम संख्याओं का योग N² होता है। N=5 के लिए 25 तारे प्रिंट होंगे।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 5: 1D Arrays
  // -------------------------------------------------------------
  {
    id: 'lab-14',
    number: 14,
    title: 'Linear Search & Binary Search in 1D Array',
    titleHindi: '1D ऐरे में लीनियर सर्च एवं बाइनरी सर्च',
    category: '1D Arrays',
    difficulty: 'Medium',
    objective: 'Write a C program to implement and compare Linear Search (unsorted) and Binary Search (sorted array) algorithms.',
    objectiveHindi: 'लीनियर सर्च (Linear Search) और बाइनरी सर्च (Binary Search) को लागू करने और उनकी तुलना करने वाला C प्रोग्राम लिखें।',
    theoryExplanationEn: `Searching Algorithms Comparison:
1. Linear Search:
   - Scans every element sequentially from index 0 to N-1.
   - Works on both sorted and unsorted arrays.
   - Time Complexity: Best O(1), Worst O(N).
2. Binary Search:
   - Requires the array to be strictly SORTED.
   - Divides search space in half each iteration (Divide & Conquer):
     mid = low + (high - low) / 2
     If arr[mid] == target -> found!
     If target < arr[mid] -> high = mid - 1
     If target > arr[mid] -> low = mid + 1
   - Time Complexity: O(log N). Extremely fast for large datasets!`,
    theoryExplanationHi: `सर्चिंग एल्गोरिदम की तुलना:
1. लीनियर सर्च (रैखिक खोज):
   - ऐरे के पहले से अंतिम तत्व तक एक-एक करके ढूंढता है।
   - ऐरे सॉर्टेड हो या न हो, दोनों पर काम करता है।
   - समय जटिलता: O(N)।
2. बाइनरी सर्च (द्विआधारी खोज):
   - इसके लिए ऐरे का पहले से सॉर्टेड (क्रमबद्ध) होना अनिवार्य है।
   - यह हर बार ऐरे को आधा-आधा बांटकर ढूंढता है (Divide and Conquer):
     mid = (low + high) / 2
   - समय जटिलता: अत्यंत तीव्र O(log N)।`,
    algorithmEn: [
      'Step 1: Read size N and sorted array elements.',
      'Step 2: Read target element to search.',
      'Step 3: Set low = 0, high = N - 1.',
      'Step 4: While low <= high:',
      '        mid = low + (high - low) / 2',
      '        If arr[mid] == key -> return mid.',
      '        Else if arr[mid] < key -> low = mid + 1.',
      '        Else -> high = mid - 1.',
      'Step 5: If not found, return -1.'
    ],
    algorithmHi: [
      'चरण 1: ऐरे का आकार N और सॉर्टेड तत्व इनपुट लें।',
      'चरण 2: खोजी जाने वाली संख्या (Key) इनपुट लें।',
      'चरण 3: low = 0, high = N - 1 रखें।',
      'चरण 4: जब तक low <= high रहे, mid निकालें और तुलना करें।',
      'चरण 5: मिल जाने पर इंडेक्स प्रिंट करें, अन्यथा "संख्या नहीं मिली" दिखाएं।'
    ],
    cCode: `#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i;
    }
    return -1;
}

int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) return mid;
        if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, key;
    int arr[100];

    printf("Enter number of elements (Sorted array for Binary Search): ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    printf("Enter %d sorted integers:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Enter element to search for: ");
    scanf("%d", &key);

    int linIdx = linearSearch(arr, n, key);
    int binIdx = binarySearch(arr, n, key);

    printf("\\n----------------- SEARCH RESULTS -----------------\\n");
    if (binIdx != -1) {
        printf("Element %d FOUND at index %d (Position %d)!\\n", key, binIdx, binIdx + 1);
        printf("Binary Search Complexity : O(log %d)\\n", n);
        printf("Linear Search Index      : %d\\n", linIdx);
    } else {
        printf("Element %d was NOT found in the array.\\n", key);
    }
    printf("--------------------------------------------------\\n");

    return 0;
}`,
    sampleInput: `Size: 6
Elements: 10 25 38 52 70 89
Search Key: 52`,
    sampleOutput: `Enter number of elements (Sorted array for Binary Search): 6
Enter 6 sorted integers:
10 25 38 52 70 89
Enter element to search for: 52

----------------- SEARCH RESULTS -----------------
Element 52 FOUND at index 3 (Position 4)!
Binary Search Complexity : O(log 6)
Linear Search Index      : 3
--------------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'Why do we compute mid as low + (high - low)/2 instead of (low + high)/2?',
        qHi: 'mid को (low + high)/2 के बजाय low + (high - low)/2 क्यों लिखा जाता है?',
        aEn: 'To prevent integer overflow! If low and high are very large positive numbers, their sum (low + high) could exceed INT_MAX and overflow into negative numbers.',
        aHi: 'इंटीजर ओवरफ्लो से बचने के लिए! बड़ी संख्याओं में (low + high) जोड़ने पर 32-बिट सीमा पार हो सकती है।'
      }
    ]
  },

  {
    id: 'lab-15',
    number: 15,
    title: 'Bubble Sort Algorithm on 1D Array',
    titleHindi: 'बबल सॉर्ट (Bubble Sort) ऐरे सॉर्टिंग',
    category: '1D Arrays',
    difficulty: 'Medium',
    objective: 'Write a C program to sort an array of N integers in ascending order using the Bubble Sort algorithm with early-termination optimization.',
    objectiveHindi: 'बबल सॉर्ट एल्गोरिदम द्वारा N पूर्णांकों के ऐरे को आरोही (Ascending) क्रम में व्यवस्थित करने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Bubble Sort Working Principle:
Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
- In pass 1, the largest element "bubbles up" to the final position N-1.
- In pass 2, the second largest reaches N-2.
Optimization:
If no swaps occur in an entire pass, the array is already sorted; we can break early, achieving O(N) best-case time!
Time Complexity: Best O(N), Worst O(N²).
Space Complexity: O(1) in-place sorting.`,
    theoryExplanationHi: `बबल सॉर्ट का सिद्धांत:
यह पास-दर-पास ऐरे के पड़ोसी तत्वों की तुलना करता है और यदि वे गलत क्रम में हों तो उन्हें आपस में बदलता (swap) है।
- पहले राउंड में सबसे बड़ा तत्व सबसे पीछे पहुंच जाता है।
- अनुकूलन (Optimization): यदि किसी राउंड में एक भी स्वैप न हो, तो इसका अर्थ है कि ऐरे पहले ही सॉर्ट हो चुका है। अतः लूप वहीं समाप्त कर O(N) में काम पूरा किया जा सकता है।`,
    algorithmEn: [
      'Step 1: Read array size N and elements.',
      'Step 2: Loop i from 0 to N - 2:',
      '        a. Set swapped = false.',
      '        b. Loop j from 0 to N - i - 2:',
      '           If arr[j] > arr[j + 1]:',
      '              Swap arr[j] and arr[j + 1];',
      '              swapped = true;',
      '        c. If swapped is false, break early (Already sorted).',
      'Step 3: Print sorted array.'
    ],
    algorithmHi: [
      'चरण 1: ऐरे का आकार N और तत्व इनपुट लें।',
      'चरण 2: i = 0 से N - 2 तक पास चलाएं:',
      '        क. swapped = 0 रखें।',
      '        ख. j = 0 से N - i - 2 तक तुलना करें और यदि arr[j] > arr[j+1] हो तो स्वैप करें।',
      '        ग. यदि कोई स्वैप न हुआ हो तो लूप समाप्त करें।',
      'चरण 3: सॉर्टेड ऐरे प्रिंट करें।'
    ],
    cCode: `#include <stdio.h>
#include <stdbool.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, array is sorted
        if (!swapped) break;
    }
}

int main() {
    int n, arr[100];

    printf("Enter number of elements to sort: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    printf("Enter %d integers:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\\nOriginal Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    bubbleSort(arr, n);

    printf("Sorted Array   : ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}`,
    sampleInput: `Size: 5
Elements: 64 34 25 12 22`,
    sampleOutput: `Enter number of elements to sort: 5
Enter 5 integers:
64 34 25 12 22

Original Array: 64 34 25 12 22 
Sorted Array   : 12 22 25 34 64`,
    vivaQuestions: [
      {
        qEn: 'Is Bubble Sort a stable sorting algorithm?',
        qHi: 'क्या बबल सॉर्ट एक स्थिर (Stable) सॉर्टिंग एल्गोरिदम है?',
        aEn: 'Yes! Bubble sort preserves the relative order of duplicate elements because it only swaps when strictly arr[j] > arr[j+1].',
        aHi: 'हाँ! बबल सॉर्ट स्थिर है क्योंकि यह समान मान वाले तत्वों का सापेक्ष क्रम नहीं बदलता।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 6: 2D Arrays & Matrices
  // -------------------------------------------------------------
  {
    id: 'lab-16',
    number: 16,
    title: 'Matrix Addition, Subtraction & Transpose',
    titleHindi: 'मैट्रिक्स का जोड़, घटाव एवं ट्रांसपोज़ (Transpose)',
    category: '2D Arrays & Matrices',
    difficulty: 'Medium',
    objective: 'Write a C program to perform Matrix Addition and compute the Transpose of a 2D matrix of order M x N.',
    objectiveHindi: 'M x N क्रम के दो 2D आव्यूहों (Matrices) का योग निकालने और ट्रांसपोज़ ज्ञात करने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Matrix Algebra in C:
1. Matrix Representation: Represented as a 2-dimensional array int matrix[ROWS][COLS].
2. Matrix Addition Rule: Two matrices A and B can only be added if they possess identical dimensions (R1 == R2 and C1 == C2).
   C[i][j] = A[i][j] + B[i][j]
3. Transpose of Matrix (A^T):
   Rows and columns are flipped: Transpose[j][i] = Matrix[i][j].
   A matrix of size M x N produces a transpose of size N x M.`,
    theoryExplanationHi: `मैट्रिक्स बीजगणित:
1. मैट्रिक्स निरूपण: C में इसे 2-डायमेंशनल ऐरे (int mat[M][N]) द्वारा दर्शाया जाता है।
2. जोड़ का नियम: दो मैट्रिक्स का जोड़ तभी संभव है जब दोनों की पंक्तियों और स्तंभों की संख्या समान हो:
   C[i][j] = A[i][j] + B[i][j]
3. ट्रांसपोज़ (Transpose): पंक्तियों को स्तंभों और स्तंभों को पंक्तियों में बदल देना:
   T[j][i] = A[i][j]`,
    algorithmEn: [
      'Step 1: Read rows R and columns C.',
      'Step 2: Read Matrix A and Matrix B elements.',
      'Step 3: Loop i from 0 to R-1 and j from 0 to C-1: Sum[i][j] = A[i][j] + B[i][j].',
      'Step 4: Compute Transpose: Trans[j][i] = A[i][j].',
      'Step 5: Display Sum Matrix and Transpose Matrix.'
    ],
    algorithmHi: [
      'चरण 1: पंक्तियों (R) और स्तंभों (C) की संख्या इनपुट लें।',
      'चरण 2: मैट्रिक्स A और मैट्रिक्स B के तत्व इनपुट लें।',
      'चरण 3: Sum[i][j] = A[i][j] + B[i][j] की गणना करें।',
      'चरण 4: Trans[j][i] = A[i][j] से ट्रांसपोज़ निकालें।',
      'चरण 5: दोनों परिणाम स्क्रीन पर प्रदर्शित करें।'
    ],
    cCode: `#include <stdio.h>

int main() {
    int r, c;
    int a[10][10], b[10][10], sum[10][10], transpose[10][10];

    printf("Enter number of rows (max 10): ");
    if (scanf("%d", &r) != 1) return 0;
    printf("Enter number of columns (max 10): ");
    if (scanf("%d", &c) != 1) return 0;

    printf("\\nEnter elements of Matrix A (%d x %d):\\n", r, c);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &a[i][j]);
        }
    }

    printf("\\nEnter elements of Matrix B (%d x %d):\\n", r, c);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &b[i][j]);
        }
    }

    // Matrix Addition and Transpose calculation
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            sum[i][j] = a[i][j] + b[i][j];
            transpose[j][i] = a[i][j]; // Transpose of Matrix A
        }
    }

    printf("\\n--- MATRIX A + B (SUM) ---\\n");
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            printf("%4d ", sum[i][j]);
        }
        printf("\\n");
    }

    printf("\\n--- TRANSPOSE OF MATRIX A (%d x %d) ---\\n", c, r);
    for (int i = 0; i < c; i++) {
        for (int j = 0; j < r; j++) {
            printf("%4d ", transpose[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
    sampleInput: `Rows: 2, Cols: 2
Matrix A:
1 2
3 4
Matrix B:
5 6
7 8`,
    sampleOutput: `--- MATRIX A + B (SUM) ---
   6    8 
  10   12 

--- TRANSPOSE OF MATRIX A (2 x 2) ---
   1    3 
   2    4`,
    vivaQuestions: [
      {
        qEn: 'How are 2D arrays stored in computer memory in C?',
        qHi: 'C भाषा में 2D ऐरे मेमोरी में कैसे स्टोर होते हैं?',
        aEn: 'In Row-Major Order. The entire first row is stored in contiguous memory addresses, followed immediately by the second row, and so on.',
        aHi: 'Row-Major Order में। पहली पंक्ति के सभी तत्व लगातार मेमोरी में रहते हैं, उसके ठीक बाद दूसरी पंक्ति के तत्व आते हैं।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 7: Strings
  // -------------------------------------------------------------
  {
    id: 'lab-17',
    number: 17,
    title: 'String Length, Reverse & Palindrome (Without String Functions)',
    titleHindi: 'स्ट्रिंग लंबाई, रिवर्स और पलिंड्रोम (बिना लाइब्रेरी फंक्शन के)',
    category: 'Strings',
    difficulty: 'Medium',
    objective: 'Write a C program to compute string length, reverse a string in-place, and check for Palindrome without using any built-in functions from <string.h>.',
    objectiveHindi: '<string.h> के रेडीमेड फंक्शनों (strlen, strrev) का उपयोग किए बिना स्ट्रिंग की लंबाई नापने, उलटने और पलिंड्रोम जाँचने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `String Anatomy in C:
In C, a string is a 1D character array terminated by a null character '\\0' (ASCII 0).
1. Calculating Length without strlen():
   Iterate until str[len] == '\\0'.
2. In-Place Reversal:
   Use two-pointer technique: swap characters at 'start' and 'end', increment start, decrement end until start >= end.
3. Palindrome Check:
   If str[start] != str[end] at any matching position, string is NOT a palindrome.`,
    theoryExplanationHi: `C में स्ट्रिंग की संरचना:
C में स्ट्रिंग वर्णों (characters) का ऐरे होती है जिसका अंत नल कैरेक्टर '\\0' से होता है।
1. बिना strlen के लंबाई: जब तक str[i] != '\\0' न हो जाए, लूप चलाकर गिनें।
2. बिना strrev के उलटना: Two-pointer विधि से पहले और अंतिम कैरेक्टर को स्वैप करते हुए बीच तक आएं।
3. पलिंड्रोम जांच: यदि दोनों सिरों के कैरेक्टर समान न हों तो पलिंड्रोम नहीं है।`,
    algorithmEn: [
      'Step 1: Read string line using fgets().',
      'Step 2: Remove trailing newline if present.',
      'Step 3: Count length by looping until str[len] == "\\0".',
      'Step 4: Check palindrome using start = 0, end = len - 1 pointers.',
      'Step 5: Reverse string in-place by swapping str[start] and str[end].',
      'Step 6: Display length, palindrome verdict, and reversed string.'
    ],
    algorithmHi: [
      'चरण 1: fgets() द्वारा स्ट्रिंग इनपुट लें।',
      'चरण 2: len = 0 से "\\0" तक गिनकर लंबाई निकालें।',
      'चरण 3: पहले और आखिरी अक्षरों की तुलना कर पलिंड्रोम जांचें।',
      'चरण 4: अक्षरों को परस्पर बदलकर स्ट्रिंग उलटें और परिणाम दिखाएं।'
    ],
    cCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    char str[200], reversed[200];
    int len = 0;
    bool isPalindrome = true;

    printf("Enter a word/string: ");
    if (fgets(str, sizeof(str), stdin) == NULL) return 0;

    // Remove trailing newline character
    while (str[len] != '\\0') {
        if (str[len] == '\\n') {
            str[len] = '\\0';
            break;
        }
        len++;
    }

    // Check Palindrome
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            isPalindrome = false;
            break;
        }
    }

    // Reverse the string
    for (int i = 0; i < len; i++) {
        reversed[i] = str[len - 1 - i];
    }
    reversed[len] = '\\0';

    printf("\\n----------------- STRING ANALYSIS -----------------\\n");
    printf("Original String : \\"%s\\"\\n", str);
    printf("String Length   : %d characters (without strlen)\\n", len);
    printf("Reversed String : \\"%s\\" (without strrev)\\n", reversed);
    printf("Palindrome Status: %s\\n", isPalindrome ? "YES! It is a Palindrome" : "NO, not a palindrome");
    printf("---------------------------------------------------\\n");

    return 0;
}`,
    sampleInput: 'madam',
    sampleOutput: `Enter a word/string: madam

----------------- STRING ANALYSIS -----------------
Original String : "madam"
String Length   : 5 characters (without strlen)
Reversed String : "madam" (without strrev)
Palindrome Status: YES! It is a Palindrome
---------------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'Why is gets() considered dangerous and removed in modern C standards?',
        qHi: 'gets() फंक्शन को आधुनिक C मानकों में क्यों हटा दिया गया?',
        aEn: 'gets() performs no array bounds checking and causes catastrophic buffer overflow vulnerabilities. fgets() specifies maximum buffer size and is safe.',
        aHi: 'gets() बफर साइज की जांच नहीं करता जिससे बफर ओवरफ्लो हैकिंग का खतरा रहता है। fgets() सुरक्षित है।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 8: Functions & Recursion
  // -------------------------------------------------------------
  {
    id: 'lab-18',
    number: 18,
    title: 'Call by Value vs Call by Reference & Recursion',
    titleHindi: 'कॉल बाई वैल्यू बनाम कॉल बाई रेफरेंस एवं रिकर्शन',
    category: 'Functions & Recursion',
    difficulty: 'Medium',
    objective: 'Write a C program to demonstrate Call by Value vs Call by Reference using pointers, and implement recursive GCD (Euclid algorithm).',
    objectiveHindi: 'पॉइंटर्स द्वारा Call by Value और Call by Reference का अंतर दिखाने और यूक्लिड रिकर्सिव विधि से GCD (म.स.प.) निकालने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `Function Parameter Passing in C:
1. Call by Value:
   - A copy of actual arguments is passed to formal parameters.
   - Modifications inside the function do NOT affect original caller variables.
2. Call by Reference:
   - Memory addresses (&x, &y) are passed into pointer parameters (*a, *b).
   - Dereferencing (*a) modifies the actual memory location directly in the caller's stack frame!
3. Recursive GCD (Euclidean Algorithm):
   - Base Case: if (b == 0) return a;
   - Recursive Step: return gcd(b, a % b);`,
    theoryExplanationHi: `फंक्शन पैरामीटर पासिंग:
1. Call by Value:
   - मूल मान की केवल एक कॉपी भेजी जाती है। फंक्शन के अंदर बदलाव करने पर बाहर के वेरिएबल्स पर कोई प्रभाव नहीं पड़ता।
2. Call by Reference:
   - मेमोरी एड्रेस (&x) भेजे जाते हैं। फंक्शन में पॉइंटर (*ptr) से सीधे मूल मेमोरी में बदलाव होता है।
3. रिकर्सिव GCD (म.स.प.):
   - बेस केस: यदि b == 0 तो a लौटाएं।
   - रिकर्सिव कॉल: gcd(b, a % b)।`,
    algorithmEn: [
      'Step 1: Declare swapByValue(int x, int y) and swapByRef(int *x, int *y).',
      'Step 2: Read two numbers A and B.',
      'Step 3: Call swapByValue(A, B); show that original values DID NOT change.',
      'Step 4: Call swapByRef(&A, &B); show that original values WERE successfully swapped.',
      'Step 5: Compute GCD using recursive Euclid algorithm.',
      'Step 6: Display results.'
    ],
    algorithmHi: [
      'चरण 1: swapByValue और swapByRef फंक्शन बनाएं।',
      'चरण 2: दो संख्याएं A और B इनपुट लें।',
      'चरण 3: swapByValue कॉल करके दिखाएं कि मान नहीं बदले।',
      'चरण 4: swapByRef(&A, &B) कॉल करके दिखाएं कि पॉइंटर से मान बदल गए।',
      'चरण 5: रिकर्सिव फंक्शन से GCD निकालें।'
    ],
    cCode: `#include <stdio.h>

// 1. Call by Value: Modifies local copies only
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

// 2. Call by Reference: Modifies actual memory via pointers
void swapByRef(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 3. Recursive Euclidean Algorithm for GCD (HCF)
int recursiveGCD(int a, int b) {
    if (b == 0) return a;
    return recursiveGCD(b, a % b);
}

int main() {
    int x = 10, y = 20;

    printf("Initial values: x = %d, y = %d\\n\\n", x, y);

    // Call by Value Test
    swapByValue(x, y);
    printf("[After Call by Value]    : x = %d, y = %d (NO CHANGE!)\\n", x, y);

    // Call by Reference Test
    swapByRef(&x, &y);
    printf("[After Call by Reference]: x = %d, y = %d (SWAPPED SUCCESSFULLY!)\\n", x, y);

    // Recursive GCD demonstration
    int n1 = 48, n2 = 18;
    int gcd = recursiveGCD(n1, n2);
    int lcm = (n1 * n2) / gcd;
    printf("\\n--- RECURSION DEMO ---\\n");
    printf("GCD of %d and %d = %d\\n", n1, n2, gcd);
    printf("LCM of %d and %d = %d\\n", n1, n2, lcm);

    return 0;
}`,
    sampleInput: 'Values x=10, y=20',
    sampleOutput: `Initial values: x = 10, y = 20

[After Call by Value]    : x = 10, y = 20 (NO CHANGE!)
[After Call by Reference]: x = 20, y = 10 (SWAPPED SUCCESSFULLY!)

--- RECURSION DEMO ---
GCD of 48 and 18 = 6
LCM of 48 and 18 = 144`,
    vivaQuestions: [
      {
        qEn: 'Does C natively support Call by Reference like C++?',
        qHi: 'क्या C भाषा में C++ की तरह वास्तविक Reference वेरिएबल होते हैं?',
        aEn: 'No! Strictly speaking, C is strictly Call by Value only. "Call by reference" in C is simulated by passing the value of pointers (addresses).',
        aHi: 'नहीं! तकनीकी रूप से C केवल Call by Value का समर्थन करती है। रेफरेंस का प्रभाव एड्रेस का मान (पॉइंटर) भेजकर उत्पन्न किया जाता है।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 9: Structures & Unions
  // -------------------------------------------------------------
  {
    id: 'lab-19',
    number: 19,
    title: 'Student Record Management & Structure vs Union',
    titleHindi: 'छात्र रिकॉर्ड प्रबंधन एवं स्ट्रक्चर बनाम यूनियन',
    category: 'Structures & Unions',
    difficulty: 'Medium',
    objective: 'Write a C program to define a struct Student, compute total marks, percentage, and rank students. Also demonstrate memory footprint differences between struct and union using sizeof.',
    objectiveHindi: 'struct Student बनाकर छात्रों का कुल अंक, प्रतिशत और ग्रेड निकालने का C प्रोग्राम लिखें, और struct तथा union के मेमोरी आकार की तुलना दिखाएं।',
    theoryExplanationEn: `Structure vs Union in C:
1. struct (Structure):
   - Every member gets its own distinct memory block.
   - Total size >= sum of sizes of all individual members (subject to CPU byte alignment/padding).
   - All members can be accessed simultaneously.
2. union (Union):
   - All members SHARE the exact same memory location!
   - Total size = size of the largest member.
   - Only ONE member can hold a valid value at any given moment.`,
    theoryExplanationHi: `Structure बनाम Union:
1. Structure (संरचना):
   - इसमें प्रत्येक सदस्य (member) के लिए अलग-अलग स्वतंत्र मेमोरी स्थान आवंटित होता है।
   - सभी सदस्यों को एक साथ उपयोग में लिया जा सकता है। कुल साइज सभी सदस्यों के योग के बराबर या अधिक (पैडिंग सहित) होता है।
2. Union (संघ):
   - इसके सभी सदस्य एक ही साझा (shared) मेमोरी का उपयोग करते हैं!
   - कुल साइज सबसे बड़े सदस्य के बराबर होता है।
   - एक समय में केवल एक ही सदस्य का मान सुरक्षित रह सकता है।`,
    algorithmEn: [
      'Step 1: Define struct Student { int roll; char name[50]; float marks[3]; float total; float percent; }.',
      'Step 2: Read student details.',
      'Step 3: Calculate total and percentage.',
      'Step 4: Define demo struct and demo union to demonstrate sizeof differences.',
      'Step 5: Print formatted student scorecard and memory comparison.'
    ],
    algorithmHi: [
      'चरण 1: struct Student बनाएं जिसमें रोल नंबर, नाम और 3 विषयों के अंक हों।',
      'चरण 2: छात्र का विवरण इनपुट लें और कुल अंक व प्रतिशत निकालें।',
      'चरण 3: sizeof ऑपरेटर से struct और union के मेमोरी साइज की तुलना करें।',
      'चरण 4: परिणाम प्रदर्शित करें।'
    ],
    cCode: `#include <stdio.h>

// Structure Definition
struct Student {
    int rollNo;
    char name[50];
    float marks[3];
    float total;
    float percentage;
};

// Memory comparison struct and union
struct StructDemo {
    int i;      // 4 bytes
    float f;    // 4 bytes
    char c;     // 1 byte (+3 padding bytes)
};

union UnionDemo {
    int i;      // 4 bytes
    float f;    // 4 bytes
    char c;     // 1 byte (shares memory with i & f)
};

int main() {
    struct Student s = {
        101,
        "Aarav Verma",
        {88.5f, 92.0f, 79.5f},
        0.0f,
        0.0f
    };

    // Calculate total and percentage
    s.total = s.marks[0] + s.marks[1] + s.marks[2];
    s.percentage = (s.total / 300.0f) * 100.0f;

    printf("===========================================\\n");
    printf("         STUDENT MARKSHEET & REPORT        \\n");
    printf("===========================================\\n");
    printf("Roll Number : %d\\n", s.rollNo);
    printf("Student Name: %s\\n", s.name);
    printf("Marks       : Sub1=%.1f, Sub2=%.1f, Sub3=%.1f\\n", s.marks[0], s.marks[1], s.marks[2]);
    printf("Total Marks : %.1f / 300.0\\n", s.total);
    printf("Percentage  : %.2f%%\\n", s.percentage);
    printf("Grade       : %s\\n", s.percentage >= 75.0f ? "Distinction (A+)" : "First Division");

    printf("\\n---------------- STRUCTURE vs UNION MEMORY ----------------\\n");
    printf("sizeof(struct StructDemo) : %zu bytes (Dedicated memory for each member)\\n", sizeof(struct StructDemo));
    printf("sizeof(union UnionDemo)   : %zu bytes (Shared memory = largest member)\\n", sizeof(union UnionDemo));
    printf("-----------------------------------------------------------\\n");

    return 0;
}`,
    sampleInput: 'Student data (Aarav, Roll 101)',
    sampleOutput: `===========================================
         STUDENT MARKSHEET & REPORT        
===========================================
Roll Number : 101
Student Name: Aarav Verma
Marks       : Sub1=88.5, Sub2=92.0, Sub3=79.5
Total Marks : 260.0 / 300.0
Percentage  : 86.67%
Grade       : Distinction (A+)

---------------- STRUCTURE vs UNION MEMORY ----------------
sizeof(struct StructDemo) : 12 bytes (Dedicated memory for each member)
sizeof(union UnionDemo)   : 4 bytes (Shared memory = largest member)
-----------------------------------------------------------`,
    vivaQuestions: [
      {
        qEn: 'What is structure padding and why does the compiler add it?',
        qHi: 'स्ट्रक्चर पैडिंग क्या है और कंपाइलर इसे क्यों जोड़ता है?',
        aEn: 'Processors access memory faster at aligned word boundaries (e.g. 4-byte or 8-byte multiples). Compilers add unused filler bytes between struct members for hardware alignment.',
        aHi: 'प्रोसेसर 4 या 8 बाइट की सीमाओं पर मेमोरी को तेजी से पढ़ते हैं। हार्डवेयर की गति बढ़ाने के लिए कंपाइलर खाली बाइट्स (पैडिंग) जोड़ता है।'
      }
    ]
  },

  // -------------------------------------------------------------
  // Category 10: File Handling
  // -------------------------------------------------------------
  {
    id: 'lab-20',
    number: 20,
    title: 'File Handling: Create, Write, Read & Count Stats',
    titleHindi: 'फाइल हैंडलिंग: निर्माण, लेखन, पाठन एवं गणना',
    category: 'File Handling',
    difficulty: 'Hard',
    objective: 'Write a C program to create a text file, write user input data to it, reopen it in read mode, and count the total number of characters, words, and lines.',
    objectiveHindi: 'टेक्स्ट फाइल बनाने, उसमें डेटा लिखने, पढ़ने और फाइल में कुल कैरेक्टर्स, शब्दों और पंक्तियों की संख्या गिनने का C प्रोग्राम लिखें।',
    theoryExplanationEn: `File I/O Concepts in C:
1. FILE Pointer: Declared as FILE *fp. It acts as an operating system file stream handle.
2. File Modes:
   - "w": Write mode (creates a new file or overwrites existing).
   - "r": Read mode (fails if file does not exist, returns NULL).
   - "a": Append mode (adds data to end of file).
3. Standard Functions:
   - fopen("filename.txt", "w"): Opens file.
   - fprintf(fp, ...): Writes formatted text.
   - fgetc(fp): Reads single character until EOF (End of File).
   - fclose(fp): Flushes buffer and closes file stream. Always mandatory to prevent memory leaks!`,
    theoryExplanationHi: `C में फाइल हैंडलिंग:
1. FILE पॉइंटर: FILE *fp ऑपरेटिंग सिस्टम के साथ फाइल कनेक्शन को संभालता है।
2. फाइल मोड्स (File Modes):
   - "w" : राइट मोड (नई फाइल बनाता है या पुरानी को ओवरराइट करता है)।
   - "r" : रीड मोड (यदि फाइल न मिले तो NULL देता है)।
   - "a" : अपेंड मोड (पुरानी फाइल के अंत में नया डेटा जोड़ता है)।
3. मुख्य फंक्शन:
   - fopen, fprintf, fgetc, fclose (फाइल बफर सुरक्षित करने के लिए fclose अनिवार्य है)।
   - EOF: End Of File (फाइल समाप्ति का सूचक)।`,
    algorithmEn: [
      'Step 1: Open file "student_lab.txt" in "w" mode using fopen().',
      'Step 2: Check if fp == NULL. If so, display error.',
      'Step 3: Write multiple lines using fprintf(). Close file using fclose().',
      'Step 4: Reopen file in "r" mode.',
      'Step 5: Loop character ch = fgetc(fp) until ch == EOF:',
      '        Increment charCount.',
      '        If ch == "\\n", increment lineCount.',
      '        If ch is whitespace or newline, mark inWord = false; else if !inWord, increment wordCount.',
      'Step 6: Close file and print statistics.'
    ],
    algorithmHi: [
      'चरण 1: fopen से "student_lab.txt" फाइल को "w" मोड में खोलें।',
      'चरण 2: fprintf से टेक्स्ट लिखें और fclose से फाइल बंद करें।',
      'चरण 3: फाइल को पुनः "r" मोड में खोलें।',
      'चरण 4: fgetc से EOF आने तक एक-एक कैरेक्टर पढ़ें।',
      'चरण 5: कैरेक्टर, शब्द और लाइनों की गिनती करें और प्रदर्शित करें।'
    ],
    cCode: `#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>

int main() {
    FILE *fp;
    const char *filename = "cguru_lab_demo.txt";

    // 1. CREATE AND WRITE TO FILE
    fp = fopen(filename, "w");
    if (fp == NULL) {
        printf("Error: Could not create file!\\n");
        return 1;
    }

    fprintf(fp, "C-Guru Academy - Standard C Programming Laboratory.\\n");
    fprintf(fp, "C is a powerful procedural programming language.\\n");
    fprintf(fp, "File handling enables persistent storage on secondary disk.\\n");
    fclose(fp);
    printf("File '%s' successfully created and written!\\n\\n", filename);

    // 2. READ FILE AND COUNT CHARACTERS, WORDS, AND LINES
    fp = fopen(filename, "r");
    if (fp == NULL) {
        printf("Error: Could not open file for reading!\\n");
        return 1;
    }

    int charCount = 0, wordCount = 0, lineCount = 0;
    int ch;
    bool inWord = false;

    printf("--- FILE CONTENTS ---\\n");
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
        charCount++;

        if (ch == '\\n') {
            lineCount++;
        }

        if (isspace(ch)) {
            inWord = false;
        } else if (!inWord) {
            inWord = true;
            wordCount++;
        }
    }
    fclose(fp);

    printf("---------------------\\n");
    printf("Total Characters : %d\\n", charCount);
    printf("Total Words      : %d\\n", wordCount);
    printf("Total Lines      : %d\\n", lineCount);

    return 0;
}`,
    sampleInput: 'File written internally',
    sampleOutput: `File 'cguru_lab_demo.txt' successfully created and written!

--- FILE CONTENTS ---
C-Guru Academy - Standard C Programming Laboratory.
C is a powerful procedural programming language.
File handling enables persistent storage on secondary disk.
---------------------
Total Characters : 160
Total Words      : 21
Total Lines      : 3`,
    vivaQuestions: [
      {
        qEn: 'What does EOF stand for and what is its integer value in C?',
        qHi: 'EOF का पूरा नाम क्या है और C में इसका मान क्या होता है?',
        aEn: 'EOF stands for End Of File. It is an integer constant defined in <stdio.h>, typically equal to -1.',
        aHi: 'EOF का पूरा नाम End Of File है। यह <stdio.h> में परिभाषित एक स्थिरांक है जिसका मान सामान्यतः -1 होता है।'
      },
      {
        qEn: 'Why is it critical to check if fp == NULL after calling fopen()?',
        qHi: 'fopen() के बाद fp == NULL की जांच करना क्यों अनिवार्य है?',
        aEn: 'If the file does not exist, or permissions are denied, fopen() returns NULL. Attempting to read/write using a NULL pointer causes a segmentation fault crash.',
        aHi: 'यदि फाइल न मिले या परमिशन न हो तो fopen() NULL लौटाता है। NULL पॉइंटर का उपयोग करने पर प्रोग्राम तुरंत क्रैश (Segmentation Fault) हो जाता है।'
      }
    ]
  }
];
