#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder for Topics 9 to 13 with comprehensive theory (850+ words in both English and Hindi).
Topics:
9. array (1D Arrays, 2D Matrices, Strings, Cache Locality, Row-Major Order)
10. pointer (Pointers, Addressing, Pointer Arithmetic, Arrays & Pointers, Double Pointers)
11. user-defined-data-type (Structures, Unions, Enums, Typedef, Padding, Bit-fields)
12. error (Syntax, Linker, Runtime, Logical Errors, Segfaults, Assertions, UB)
13. file-handling (FILE*, Streams, fopen Modes, fread/fwrite, fseek, Text vs Binary)
"""

content = '''# Topics 9 to 13: Array, Pointer, User Defined Data Type, Error, File Handling
from topics_master import register_topic

# ==============================================================================
# TOPIC 9: Arrays: 1D, 2D Matrices & Strings (ऐरे, मैट्रिसेस और स्ट्रिंग्स)
# ==============================================================================
t9 = {
    "id": "array",
    "order": 9,
    "title": "Arrays, Multi-Dimensional Matrices & Character Strings",
    "titleHindi": "ऐरे, बहु-आयामी मैट्रिसेस और स्ट्रिंग्स (Array)",
    "category": "Data Structures",
    "summary": "Master contiguous linear collections in C: 1D array indexing, base address arithmetic, cache locality, 2D matrix row-major storage layout, matrix addition and multiplication algorithms, character string representation, null-terminator byte '\\\\0', string.h functions, and array decaying to pointers.",
    "summaryHindi": "C भाषा में ऐरे और स्ट्रिंग्स का संपूर्ण अध्ययन: 1D ऐरे इंडेक्सिंग, बेस एड्रेस, रैम में रो-मेजर मेमोरी लेआउट, मैट्रिक्स जोड़ और गुणा कलन-विधि, नल-टर्मिनेटर '\\\\0', string.h के महत्वपूर्ण फंक्शन्स और ऐरे का पॉइंटर में बदलना।",
    "readTimeMinutes": 22,
    "explanationEn": """1. WHAT IS AN ARRAY IN LOW-LEVEL MEMORY ARCHITECTURE?
In the C programming language and hardware memory architecture, an Array is a contiguous collection of homogeneous (identical data type) elements stored sequentially in Random Access Memory (RAM). When an array is declared, such as 'int numbers[5];', the memory management subsystem allocates an unbroken, consecutive block of bytes:
- Total Byte Size = Number of Elements * sizeof(element_type). For an array of 5 32-bit integers, exactly 5 * 4 = 20 contiguous bytes are reserved.
- Zero-Based Indexing & The Base Address Formula:
C arrays are zero-indexed because an index is fundamentally a mathematical offset from the starting memory location (called the Base Address). If an array 'numbers' begins at memory address 0x1000, the address of element numbers[i] is computed directly in hardware as:
Address(&numbers[i]) = Base_Address + (i * sizeof(element_type))
For index 0: 0x1000 + (0 * 4) = 0x1000 (Base address itself!).
For index 1: 0x1000 + (1 * 4) = 0x1004.
For index 2: 0x1000 + (2 * 4) = 0x1008.
Because the CPU calculates this address using a single multiply-add instruction, accessing any arbitrary element numbers[i] occurs in O(1) instantaneous constant time!

2. HARDWARE CACHE LOCALITY & PERFORMANCE ADVANTAGE:
Unlike linked lists or node-based graphs where items are scattered randomly across the heap, arrays reside in contiguous physical memory addresses. When the CPU accesses numbers[0], modern hardware memory controllers automatically prefetch an entire 64-byte Cache Line from system RAM into the ultra-fast L1/L2 CPU hardware cache. Consequently, subsequent accesses to numbers[1], numbers[2], and numbers[3] result in instantaneous Cache Hits, making linear array iteration significantly faster than non-contiguous data structures.

3. LACK OF BOUNDS CHECKING & SECURITY HAZARDS:
C was engineered for raw operating system performance and minimal runtime overhead. Therefore, the C compiler does NOT perform runtime Array Bounds Checking. If you declare 'int arr[5];' and attempt to access 'arr[10] = 99;', C does not throw an IndexOutOfBoundsException. Instead, it computes the address 0x1000 + (10 * 4) and writes 99 into whatever external memory happens to reside there! This leads to data corruption, mysterious crashes, or catastrophic security vulnerabilities (Buffer Overflow attacks). It is the programmer's absolute responsibility to enforce boundary validation.

4. MULTI-DIMENSIONAL ARRAYS & ROW-MAJOR ORDER:
A two-dimensional array represents a grid of rows and columns (e.g., int matrix[3][4];).
Physical RAM is strictly linear (one-dimensional). To map a 2D grid onto a 1D linear memory bus, C strictly employs Row-Major Order:
Row 0 is placed in memory first, followed immediately by Row 1, followed by Row 2.
Memory Address Formula for matrix[row][col]:
Address(&matrix[i][j]) = Base_Address + ((i * Total_Columns + j) * sizeof(type))
Traversing a 2D matrix with the outer loop iterating rows and the inner loop iterating columns accesses memory sequentially, maximizing CPU cache efficiency. Inverting the loops (iterating columns outer, rows inner) causes frequent cache misses, degrading execution speed.

5. PASSING ARRAYS TO FUNCTIONS & POINTER DECAY:
When an array is passed as an argument to a function, C NEVER copies the entire array contents. Instead, the array name automatically "decays" into a pointer pointing to its first element (&arr[0]).
Function Prototype:
```c
void printArray(int arr[], int size); // Equivalent to: void printArray(int *arr, int size);
```
Inside the function, 'sizeof(arr)' returns the size of a pointer (8 bytes on 64-bit systems), NOT the byte size of the array! Therefore, the programmer MUST pass the array size as a separate parameter.

6. CHARACTER STRINGS & THE NULL TERMINATOR ('\\\\0'):
In C, there is no primitive "string" keyword. A String is simply a one-dimensional array of characters terminated by a special sentinel byte called the Null Character ('\\\\0', ASCII value 0).
- Declaring Strings:
```c
char greeting[] = "Hello"; // Occupies 6 bytes in memory: 'H', 'e', 'l', 'l', 'o', '\\\\0'
```
Without the '\\\\0' terminator, standard string functions (like printf("%s"), strlen, strcpy) would continue reading random bytes past the end of the array until they hit a random zero byte in memory, causing segmentation faults.
- Standard Library Functions (<string.h>):
1. strlen(str): Returns character count excluding '\\\\0'.
2. strcpy(dest, src) / strncpy: Copies characters from src to dest.
3. strcat(dest, src) / strncat: Concatenates src to end of dest.
4. strcmp(str1, str2): Compares two strings lexicographically; returns 0 if equal, negative if str1 < str2, positive if str1 > str2.""",
    "explanationHi": """१. कंप्यूटर मेमोरी आर्किटेक्चर में ऐरे (Array) क्या है?
C प्रोग्रामिंग भाषा और कंप्यूटर हार्डवेयर में, ऐरे (Array) समान डेटा टाइप के तत्वों का एक ऐसा रैखिक संग्रह है जो मुख्य मेमोरी (RAM) में एक के बाद एक लगातार (Contiguous Memory) क्रम में स्टोर होता है। जब प्रोग्रामर 'int numbers[5];' लिखता है, तो मेमोरी प्रबंधक रैम में 20 बाइट्स (5 तत्व * 4 बाइट्स) की एक अखंड जगह आरक्षित करता है।
- शून्य-आधारित इंडेक्सिंग और बेस एड्रेस (Base Address):
C भाषा में ऐरे का इंडेक्स हमेशा 0 से शुरू होता है क्योंकि इंडेक्स वास्तव में शुरुआती मेमोरी पते से दूरी (Offset) को दर्शाता है। यदि ऐरे 'numbers' का पहला मेमोरी पता 0x1000 है, तो किसी भी तत्व numbers[i] का मेमोरी एड्रेस इस गणितीय सूत्र से निकाला जाता है:
Address(&numbers[i]) = Base_Address + (i * sizeof(element_type))
इंडेक्स 0 के लिए: 0x1000 + (0 * 4) = 0x1000 (शुरुआती पता ही)।
इंडेक्स 1 के लिए: 0x1000 + (1 * 4) = 0x1004।
इंडेक्स 2 के लिए: 0x1000 + (2 * 4) = 0x1008।
चूंकि कंप्यूटर का प्रोसेसर एक ही निर्देश में इस पते की गणना कर लेता है, इसलिए ऐरे के किसी भी तत्व को पढ़ने में O(1) यानी स्थिर समय लगता है।

२. हार्डवेयर कैश लोकैलिटी और परफॉर्मेंस लाभ:
लिंक्ड लिस्ट के विपरीत जहाँ डेटा रैम में अलग-अलग बिखरा होता है, ऐरे का डेटा एक पंक्ति में होता है। जब सीपीयू numbers[0] को पढ़ता है, तो कंप्यूटर का हार्डवेयर कंट्रोलर पूरी 64-बाइट कैश लाइन को रैम से उठाकर सुपर-फास्ट L1/L2 कैश मेमोरी में भर देता है। इसके कारण अगले तत्वों (numbers[1], numbers[2]) को पढ़ते समय डेटा तुरंत कैश से मिल जाता है (Cache Hit), जिससे प्रोग्राम की गति अत्यधिक तेज हो जाती है।

३. बाउंड्स चेकिंग का अभाव और बफर ओवरफ्लो:
C भाषा को तेज गति और ऑपरेटिंग सिस्टम बनाने के लिए डिजाइन किया गया था। इसलिए C कंपाइलर यह जांच नहीं करता कि इंडेक्स ऐरे की सीमा के अंदर है या बाहर (No Bounds Checking)। यदि आप 5 तत्वों के ऐरे में 'arr[10] = 99;' लिखेंगे, तो C कोई एरर नहीं देगा बल्कि उस पते पर 99 लिख देगा जहाँ कोई दूसरा डेटा हो सकता है! इसे 'बफर ओवरफ्लो' (Buffer Overflow) कहते हैं, जिससे प्रोग्राम क्रैश हो सकता है या सुरक्षा में सेंध लग सकती है। ऐरे की सीमा की जांच करना प्रोग्रामर की निजी जिम्मेदारी है।

४. बहु-आयामी ऐरे और रो-मेजर ऑर्डर (Row-Major Order):
दो-आयामी ऐरे (2D Array) को मैट्रिक्स या टेबल के रूप में देखा जाता है (जैसे int matrix[3][4];)।
परंतु कंप्यूटर की रैम एक सीधी रेखा (1D) होती है। C भाषा 2D मैट्रिक्स को रैम में स्टोर करने के लिए 'रो-मेजर ऑर्डर' (Row-Major Order) का उपयोग करती है:
पहले पूरी पंक्ति 0 स्टोर होती है, फिर उसके ठीक बाद पंक्ति 1, और फिर पंक्ति 2।
matrix[i][j] का मेमोरी पता सूत्र:
Address = Base_Address + ((i * कुल_कॉलम + j) * sizeof(type))
मैट्रिक्स को लूप में चलाते समय हमेशा बाहरी लूप पंक्ति (Rows) का और अंदरूनी लूप कॉलम (Columns) का चलाना चाहिए ताकि डेटा लगातार पढ़ा जा सके और कैश का पूरा फायदा मिले।

५. फंक्शन में ऐरे भेजना और पॉइंटर डिके (Pointer Decay):
जब किसी ऐरे को फंक्शन में भेजा जाता है, तो C कभी भी पूरे ऐरे की नकल नहीं बनाता। इसके बजाय ऐरे का नाम स्वतः अपने पहले तत्व के पते (&arr[0]) में बदल जाता है जिसे 'Pointer Decay' कहते हैं।
फंक्शन के अंदर 'sizeof(arr)' पूरे ऐरे का आकार नहीं बताता बल्कि केवल पॉइंटर का आकार (8 बाइट्स) बताता है। इसलिए फंक्शन में ऐरे के साथ उसका साइज (आकार) अलग से भेजना अनिवार्य होता है।

६. कैरेक्टर स्ट्रिंग्स और नल टर्मिनेटर ('\\\\0'):
C भाषा में स्ट्रिंग नाम का कोई अलग डेटा टाइप नहीं होता। स्ट्रिंग केवल कैरेक्टर्स का 1D ऐरे होती है जिसके अंत में एक विशेष शून्य बाइट होता है जिसे 'नल कैरेक्टर' ('\\\\0', ASCII 0) कहते हैं।
- स्ट्रिंग की घोषणा:
'char name[] = "Hello";' मेमोरी में 6 बाइट्स लेता है: 'H', 'e', 'l', 'l', 'o', और अंत में '\\\\0'।
यदि नल कैरेक्टर न हो, तो printf("%s") और strlen जैसे फंक्शन्स मेमोरी में तब तक आगे बढ़ते रहेंगे जब तक उन्हें कोई शून्य न मिल जाए, जिससे प्रोग्राम क्रैश हो जाएगा।
- string.h के प्रमुख फंक्शन्स:
१. strlen(str): स्ट्रिंग में अक्षरों की कुल संख्या लौटाता है ('\\\\0' को छोड़कर)।
२. strcpy(dest, src): एक स्ट्रिंग को दूसरी में कॉपी करता है।
३. strcat(dest, src): दो स्ट्रिंग्स को आपस में जोड़ता है।
४. strcmp(str1, str2): दो स्ट्रिंग्स की तुलना करता है; समान होने पर 0 लौटाता है।""",
    "realLifeAnalogy": {
        "en": "Think of an array like a row of identical numbered mailboxes in an apartment lobby. Because each box is the exact same width and they are physically bolted side-by-side in a straight line, the mail carrier can instantly calculate the exact physical location of Mailbox #15 without checking boxes 1 through 14 first! A string is like a train with a special caboose at the end: the conductor knows the train is finished when they see the caboose ('\\\\0')!",
        "hi": "ऐरे की तुलना एक अपार्टमेंट की दीवार पर लगे एक समान लेटरबॉक्सों से करें। चूंकि सभी बॉक्स एक ही आकार के हैं और एक सीधी लाइन में जुड़े हैं, डाकिया बिना 1 से 14 बॉक्स गिने सीधे 15वें बॉक्स पर पहुँच सकता है! स्ट्रिंग एक रेलगाड़ी जैसी है जिसके सबसे पीछे गार्ड का लाल डिब्बा ('\\\\0') लगा होता है; गार्ड का डिब्बा देखते ही पता चल जाता है कि गाड़ी यहाँ समाप्त हो गई है!"
    },
    "codeExamples": [
        {
            "title": "2D Matrix Addition and Row-Major Memory Inspection",
            "titleHindi": "2D मैट्रिक्स जोड़ और मेमोरी एड्रेस का C कोड",
            "code": """#include <stdio.h>

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int Sum[2][2];
    
    // Matrix Addition
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            Sum[i][j] = A[i][j] + B[i][j];
        }
    }
    
    printf("Resultant 2x2 Matrix:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", Sum[i][j]);
        }
        printf("\\n");
    }
    
    // Inspect contiguous row-major memory addresses
    printf("\\nMemory Addresses of Array Elements:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("Sum[%d][%d] at %p (value %d)\\n", i, j, (void*)&Sum[i][j], Sum[i][j]);
        }
    }
    return 0;
}""",
            "output": """Resultant 2x2 Matrix:
6 8 
10 12 

Memory Addresses of Array Elements:
Sum[0][0] at 0x7ffd98b2c4e0 (value 6)
Sum[0][1] at 0x7ffd98b2c4e4 (value 8)
Sum[1][0] at 0x7ffd98b2c4e8 (value 10)
Sum[1][1] at 0x7ffd98b2c4ec (value 12)""",
            "explanation": "Demonstrates 2D nested iteration for matrix arithmetic and proves that elements are stored consecutively with exactly 4-byte spacing.",
            "explanationHindi": "मैट्रिक्स जोड़ के लिए नेस्टेड लूप्स का उपयोग और यह प्रमाण कि सभी तत्व मेमोरी में ठीक 4-4 बाइट्स की दूरी पर लगातार क्रम में स्टोर होते हैं।"
        }
    ],
    "practicals": [
        {
            "id": "prac-arr-1",
            "title": "Reverse a String In-Place Without Extra Memory",
            "titleHindi": "बिना अतिरिक्त मेमोरी के स्ट्रिंग को उलटना",
            "objective": "Reverse a character string array using two-pointer swap technique.",
            "objectiveHindi": "स्ट्रिंग को टू-पॉइंटर तकनीक से उसी स्थान पर उल्टा करें।",
            "code": """#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;
    
    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char word[] = "PROGRAMMING";
    printf("Original: %s\\n", word);
    
    reverseString(word);
    printf("Reversed: %s\\n", word);
    return 0;
}""",
            "expectedOutput": """Original: PROGRAMMING
Reversed: GNIMMARGORP""",
            "lineByLineExplanation": [
                {"line": "int right = strlen(str) - 1;", "noteEn": "Points to last valid character before null terminator.", "noteHi": "नल टर्मिनेटर से पहले के अंतिम अक्षर को इंगित करता है।"},
                {"line": "str[left] = str[right];", "noteEn": "Swaps characters symmetrically from outside inwards in O(N/2) time.", "noteHi": "बाहर से अंदर की ओर अक्षरों की अदला-बदली करता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["Array elements are stored contiguously in RAM.", "Array index i is calculated as Base + i * sizeof(type).", "C does not perform bounds checking; buffer overflow is possible.", "Strings must terminate with '\\\\0' byte."],
        "hi": ["ऐरे के सभी तत्व रैम में लगातार क्रम में स्टोर होते हैं।", "इंडेक्स i का एड्रेस Base + i * sizeof(type) से निकलता है।", "C में बाउंड्स चेकिंग नहीं होती जिससे बफर ओवरफ्लो हो सकता है।", "स्ट्रिंग के अंत में '\\\\0' (नल कैरेक्टर) होना अनिवार्य है।"]
    },
    "commonPitfalls": {
        "en": ["Accessing out of bounds elements (arr[size] instead of arr[size-1]).", "Forgetting space for '\\\\0' when sizing char arrays for strings.", "Using sizeof(arr) inside functions expecting whole array byte size."],
        "hi": ["ऐरे की सीमा से बाहर जाना (arr[size] लिखना जबकि अंतिम इंडेक्स size-1 होता है)।", "स्ट्रिंग ऐरे बनाते समय '\\\\0' के लिए 1 अतिरिक्त बाइट न छोड़ना।", "फंक्शन के अंदर sizeof(arr) से पूरे ऐरे का आकार नापने की भूल करना।"]
    }
}
register_topic(t9)

# ==============================================================================
# TOPIC 10: Pointers: Memory Addressing & Dereferencing (पॉइंटर्स और मेमोरी एड्रेसिंग)
# ==============================================================================
t10 = {
    "id": "pointer",
    "order": 10,
    "title": "Pointers, Memory Addressing & Pointer Arithmetic",
    "titleHindi": "पॉइंटर्स, मेमोरी एड्रेसिंग और पॉइंटर अंकगणित (Pointer)",
    "category": "Basics",
    "summary": "Master the defining superpower of C: Pointer variable declaration, address-of operator &, indirection/dereference operator *, pointer arithmetic scaling, relationship between arrays and pointers, NULL pointers, void generic pointers, pointer-to-pointer (**ptr), pass-by-reference simulation, and dangling pointer hazards.",
    "summaryHindi": "C भाषा की सबसे शक्तिशाली विशेषता पॉइंटर्स का संपूर्ण अध्ययन: पॉइंटर डिक्लेरेशन, एड्रेस ऑपरेटर &, डीरेफरेंसिंग ऑपरेटर *, पॉइंटर अंकगणित, ऐरे और पॉइंटर का संबंध, NULL पॉइंटर, void जेनेरिक पॉइंटर, डबल पॉइंटर (**ptr), कॉल बाई रेफरेंस और डैंगलिंग पॉइंटर्स की रोकथाम।",
    "readTimeMinutes": 23,
    "explanationEn": """1. WHAT IS A POINTER IN HARDWARE & OPERATING SYSTEM ARCHITECTURE?
In low-level systems programming, a Pointer is a variable whose assigned value is NOT a direct piece of data (such as an integer or character), but the physical or virtual Hexadecimal Memory Address of another variable located in Random Access Memory (RAM).
Understanding Virtual Address Space:
In modern 64-bit operating systems (Linux, Windows, macOS), every process runs in its own 64-bit Virtual Address Space.
- On a 64-bit CPU architecture, any pointer variable occupies exactly 8 bytes (64 bits) of memory, regardless of whether it points to a 1-byte char, a 4-byte int, or an 8000-byte structure!
- On a 32-bit architecture, all pointers occupy exactly 4 bytes (32 bits).

2. THE TWO ESSENTIAL POINTER OPERATORS (& AND *):
Pointers operate using two complementary unary operators:
1. The Address-of Operator (&):
Returns the memory address where a variable is physically stored in RAM.
Example: 'int x = 42; printf("%p", (void*)&x);' prints an address such as 0x7ffd98b2c4e0.
2. The Indirection / Dereference Operator (*):
When applied to a pointer variable, the asterisk accesses ("dereferences") the actual value stored at the memory address currently held by that pointer.
```c
int x = 42;
int *ptr = &x;   // ptr holds the address of x
printf("%d", *ptr); // Dereferences ptr to read 42
*ptr = 100;         // Mutates the value of x directly through memory!
```

3. POINTER ARITHMETIC & TYPE SCALING:
Pointer arithmetic behaves entirely differently from standard integer arithmetic. You cannot perform multiplication or division on pointers, but you CAN add or subtract integers.
The Type Scaling Rule:
When you add 1 to a pointer (ptr + 1), the memory address does NOT increment by 1 byte. Instead, it advances by 1 * sizeof(*ptr) bytes!
- If 'int *p = 0x1000;', then 'p + 1' equals 0x1004 (advances by 4 bytes because sizeof(int) is 4).
- If 'double *dp = 0x1000;', then 'dp + 1' equals 0x1008 (advances by 8 bytes because sizeof(double) is 8).
- If 'char *cp = 0x1000;', then 'cp + 1' equals 0x1001 (advances by 1 byte).
Pointer Subtraction (p2 - p1):
Subtracting two pointers of the same type yields the number of elements situated between them, NOT the raw byte difference!

4. THE INTRINSIC EQUIVALENCE OF ARRAYS AND POINTERS:
In C, arrays and pointers are deeply intertwined. The name of an array acts as a constant pointer to its first element:
'arr' is equivalent to '&arr[0]'.
Array subscript notation is actually syntactic sugar for pointer arithmetic:
'arr[i]' is translated by the compiler directly into '*(arr + i)'.
Because addition is mathematically commutative, '*(arr + i)' is identical to '*(i + arr)', meaning that the bizarre syntax 'i[arr]' is 100% valid in C and compiles cleanly!

5. SPECIAL TYPES OF POINTERS:
1. NULL Pointer:
A pointer explicitly assigned the value 0 or NULL (macro defined as ((void*)0)). It represents a pointer that points to nothing. Dereferencing a NULL pointer triggers a hardware memory protection fault, terminating the process with a Segmentation Fault (SIGSEGV).
2. Void Pointer (Generic Pointer - void*):
A generic pointer type that can hold the address of ANY data type without an explicit cast. Used by dynamic memory functions (malloc returns void*). Crucial limitation: You CANNOT directly dereference a void* without casting it first, because the compiler does not know how many bytes to read!
3. Pointer to Pointer (Double Pointer - **ptr):
A pointer variable that stores the memory address of another pointer variable. Extensively used when a function needs to modify a pointer passed into it (such as allocating memory inside a helper function or managing 2D dynamic matrices).
4. Dangling Pointer & Wild Pointer:
- A Wild Pointer is an uninitialized pointer containing random garbage memory addresses.
- A Dangling Pointer points to a memory block that has already been deallocated (e.g., pointing to freed heap memory or a local stack variable of an exited function). Accessing it invokes catastrophic Undefined Behavior.

6. PASS-BY-REFERENCE SIMULATION:
C functions strictly use Pass-by-Value. To modify a caller's variable inside a function, we pass the variable's memory address (&x). The function receives a pointer copy and dereferences it to modify the original variable, perfectly simulating Pass-by-Reference (e.g., the classic swap(&a, &b) function).""",
    "explanationHi": """१. कंप्यूटर आर्किटेक्चर में पॉइंटर (Pointer) क्या है?
C प्रोग्रामिंग भाषा में 'पॉइंटर' (Pointer) एक ऐसा विशिष्ट वेरिएबल होता है जिसके अंदर कोई साधारण डेटा (जैसे संख्या या अक्षर) स्टोर नहीं होता, बल्कि मुख्य मेमोरी (RAM) के किसी दूसरे वेरिएबल का हेक्साडेसिमल मेमोरी एड्रेस (पॉइंटर एड्रेस) स्टोर होता है।
वर्चुअल मेमोरी और पॉइंटर का आकार:
आधुनिक 64-बिट कंप्यूटर सिस्टम में प्रत्येक प्रोग्राम अपनी अलग 64-बिट वर्चुअल मेमोरी में चलता है।
- 64-बिट सिस्टम पर सभी पॉइंटर्स का आकार ठीक 8 बाइट्स (64 बिट्स) होता है, चाहे वह 1-बाइट के char को इंगित कर रहा हो या 1000-बाइट के स्ट्रक्चर को!
- 32-बिट सिस्टम पर सभी पॉइंटर्स का आकार हमेशा 4 बाइट्स (32 बिट्स) होता है।

२. पॉइंटर्स के दो बुनियादी ऑपरेटर (& और *):
पॉइंटर्स का उपयोग करने के लिए दो प्रमुख ऑपरेटर होते हैं:
१. एड्रेस ऑपरेटर (& - Address-of Operator):
यह किसी भी वेरिएबल का वह भौतिक मेमोरी पता लौटाता है जहाँ वह रैम में स्टोर है।
उदाहरण: 'int x = 42; printf("%p", (void*)&x);' स्क्रीन पर 0x7ffd98b2c4e0 जैसा हेक्साडेसिमल एड्रेस दिखाएगा।
२. डीरेफरेंसिंग ऑपरेटर (* - Dereference / Indirection Operator):
जब किसी पॉइंटर के आगे तारा (*) लगाया जाता है, तो यह उस मेमोरी पते पर जाकर वहाँ रखे वास्तविक मान को पढ़ता है या बदलता है।
```c
int x = 42;
int *ptr = &x;     // ptr में x का पता आ गया
printf("%d", *ptr); // पते पर जाकर मान पढ़ा = 42
*ptr = 100;         // मेमोरी पते पर जाकर x का मान सीधे 100 कर दिया!
```

३. पॉइंटर अंकगणित और टाइप स्केलिंग (Pointer Arithmetic):
पॉइंटर का अंकगणित साधारण गणित से पूरी तरह अलग होता है। पॉइंटर में गुणा या भाग नहीं किया जा सकता, केवल जोड़ और घटाव मान्य हैं।
टाइप स्केलिंग का नियम:
जब आप किसी पॉइंटर में 1 जोड़ते हैं (ptr + 1), तो उसका मेमोरी एड्रेस 1 बाइट नहीं बढ़ता, बल्कि उसके डेटा टाइप के आकार (sizeof) के बराबर बढ़ता है!
- यदि 'int *p = 0x1000;' है, तो 'p + 1' का मान 0x1004 होगा (क्योंकि int 4 बाइट्स का होता है)।
- यदि 'double *dp = 0x1000;' है, तो 'dp + 1' का मान 0x1008 होगा (क्योंकि double 8 बाइट्स का होता है)।
- यदि 'char *cp = 0x1000;' है, तो 'cp + 1' का मान 0x1001 होगा।
पॉइंटर घटाव (p2 - p1): दो पॉइंटर्स को आपस में घटाने पर बाइट्स का अंतर नहीं मिलता, बल्कि उनके बीच मौजूद तत्वों की संख्या मिलती है!

४. ऐरे और पॉइंटर्स का अटूट संबंध:
C भाषा में ऐरे का नाम वास्तव में उसके पहले तत्व के पते (&arr[0]) के बराबर होता है।
ऐरे में 'arr[i]' लिखना वास्तव में पॉइंटर अंकगणित '*(arr + i)' का ही सुंदर रूप है।
चूंकि जोड़ में क्रम बदलने से फर्क नहीं पड़ता, इसलिए '*(arr + i)' और '*(i + arr)' एक समान हैं, जिसका अर्थ है कि C में 'i[arr]' लिखना भी 100% मान्य है और सही काम करता है!

५. पॉइंटर्स के विशेष प्रकार:
१. NULL पॉइंटर: एक ऐसा पॉइंटर जिसका मान 0 या NULL होता है। यह किसी भी वैध मेमोरी को इंगित नहीं करता। NULL पॉइंटर को डीरेफरेंस (*ptr) करने पर प्रोग्राम तुरंत सेग्मेंटेशन फॉल्ट (SIGSEGV) से क्रैश हो जाता है।
२. Void पॉइंटर (void* - जेनेरिक पॉइंटर): यह किसी भी प्रकार के डेटा का पता रख सकता है। malloc() फंक्शन void* लौटाता है। इसे सीधे डीरेफरेंस नहीं किया जा सकता; पहले उचित प्रकार में टाइपकास्ट करना पड़ता है।
३. डबल पॉइंटर (**ptr): पॉइंटर का पॉइंटर। यह किसी दूसरे पॉइंटर वेरिएबल का मेमोरी एड्रेस स्टोर करता है।
४. डैंगलिंग पॉइंटर (Dangling Pointer): एक ऐसा पॉइंटर जो उस मेमोरी को इंगित कर रहा है जिसे पहले ही डिलीट (free) किया जा चुका है या जो फंक्शन खत्म होने से नष्ट हो चुकी है। इसका उपयोग करने पर अनपेक्षित परिणाम आते हैं।

६. कॉल बाई रेफरेंस (Pass by Reference) का अनुकरण:
C में सभी मान केवल कॉपी के रूप में भेजे जाते हैं। यदि किसी फंक्शन के अंदर मुख्य प्रोग्राम के वेरिएबल्स को बदलना हो, तो हम उनके मेमोरी पते (&a, &b) भेजते हैं। फंक्शन पॉइंटर के जरिए सीधे मुख्य मेमोरी में बदलाव कर देता है (जैसे swap फंक्शन)।""",
    "realLifeAnalogy": {
        "en": "Think of a regular variable as your physical house, and a pointer as a piece of paper with your GPS home address written on it. Giving someone the piece of paper (passing a pointer) allows them to travel directly to your house and paint your front door (modifying the variable in memory) without needing to clone your entire house!",
        "hi": "साधारण वेरिएबल की तुलना अपने घर से करें, और पॉइंटर की तुलना एक पर्ची से करें जिस पर आपके घर का जीपीएस पता लिखा है। किसी को वह पर्ची देने से वह सीधे आपके घर पहुँचकर दरवाजे पर पेंट कर सकता है (मेमोरी में बदलाव), इसके लिए उसे पूरे घर की नकल बनाने की आवश्यकता नहीं होती!"
    },
    "codeExamples": [
        {
            "title": "Pass-by-Reference Swap and Pointer Arithmetic",
            "titleHindi": "पॉइंटर द्वारा दो संख्याओं की अदला-बदली और अंकगणित",
            "code": """#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x; // Read value at address x
    *x = *y;       // Store value at y into address x
    *y = temp;     // Store temp into address y
}

int main() {
    int a = 10, b = 20;
    printf("Before Swap: a = %d, b = %d\\n", a, b);
    
    swap(&a, &b); // Pass memory addresses
    printf("After Swap:  a = %d, b = %d\\n", a, b);
    
    // Pointer Arithmetic demonstration
    int arr[3] = {100, 200, 300};
    int *ptr = arr;
    
    printf("\\nPointer Traversal of Array:\\n");
    for (int i = 0; i < 3; i++) {
        printf("Element %d = %d at address %p\\n", i, *(ptr + i), (void*)(ptr + i));
    }
    return 0;
}""",
            "output": """Before Swap: a = 10, b = 20
After Swap:  a = 20, b = 10

Pointer Traversal of Array:
Element 0 = 100 at address 0x7ffd98b2c4e0
Element 1 = 200 at address 0x7ffd98b2c4e4
Element 2 = 300 at address 0x7ffd98b2c4e8""",
            "explanation": "Demonstrates successful modification of caller variables via memory pointers and pointer arithmetic address scaling.",
            "explanationHindi": "मेमोरी पतों द्वारा कॉलर वेरिएबल्स की सफल अदला-बदली और पॉइंटर अंकगणित द्वारा 4-4 बाइट्स आगे बढ़ने का प्रदर्शन।"
        }
    ],
    "practicals": [
        {
            "id": "prac-ptr-1",
            "title": "Dynamic Array Allocation and Safe Memory Release",
            "titleHindi": "डायनेमिक मेमोरी आवंटन और सुरक्षित रिलीज",
            "objective": "Allocate memory dynamically on the heap using malloc and prevent memory leaks with free.",
            "objectiveHindi": "malloc से हीप मेमोरी आवंटित करें और free से मेमोरी लीक रोकें।",
            "code": """#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;
    int *arr = (int*)malloc(n * sizeof(int));
    
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    
    printf("Dynamically allocated values: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", *(arr + i));
    }
    printf("\\n");
    
    free(arr);    // Free heap memory
    arr = NULL;   // Prevent dangling pointer!
    printf("Memory freed safely.\\n");
    return 0;
}""",
            "expectedOutput": """Dynamically allocated values: 10 20 30 
Memory freed safely.""",
            "lineByLineExplanation": [
                {"line": "if (arr == NULL)", "noteEn": "Always verify malloc succeeded before dereferencing.", "noteHi": "मेमोरी का उपयोग करने से पहले हमेशा NULL की जांच करें।"},
                {"line": "arr = NULL;", "noteEn": "Assigning NULL prevents accidental dangling pointer usage.", "noteHi": "free करने के बाद पॉइंटर को NULL बनाना डैंगलिंग पॉइंटर से बचाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["All pointers are 8 bytes on 64-bit systems and 4 bytes on 32-bit systems.", "& gives memory address; * dereferences address.", "ptr + 1 advances address by sizeof(*ptr) bytes.", "Always set freed pointers to NULL."],
        "hi": ["64-बिट पर सभी पॉइंटर्स 8 बाइट्स और 32-बिट पर 4 बाइट्स के होते हैं।", "& मेमोरी का पता देता है; * उस पते पर रखा मान देता है।", "ptr + 1 एड्रेस को sizeof(*ptr) बाइट्स आगे बढ़ाता है।", "मेमोरी फ्री करने के बाद पॉइंटर को हमेशा NULL करें।"]
    },
    "commonPitfalls": {
        "en": ["Dereferencing NULL or uninitialized wild pointers (causes immediate crash).", "Memory leaks by forgetting to call free() on malloc-allocated memory.", "Using dangling pointers after memory has been freed."],
        "hi": ["NULL या अनइनिशियलाइज्ड पॉइंटर को डीरेफरेंस करना जिससे प्रोग्राम क्रैश हो जाता है।", "malloc से ली गई मेमोरी को free() करना भूल जाना जिससे मेमोरी लीक होती है।", "फ्री की जा चुकी मेमोरी वाले डैंगलिंग पॉइंटर का उपयोग करना।"]
    }
}
register_topic(t10)

# ==============================================================================
# TOPIC 11: User-Defined Data Types (स्ट्रक्चर्स, यूनियन्स और टाइपडेफ)
# ==============================================================================
t11 = {
    "id": "user-defined-data-type",
    "order": 11,
    "title": "User-Defined Data Types: Struct, Union, Enum & Typedef",
    "titleHindi": "यूजर डिफाइंड डेटा टाइप्स: स्ट्रक्चर्स, यूनियन्स और इनम (User Defined Types)",
    "category": "Data Structures",
    "summary": "Master custom composite data types in C: Struct declarations, member access dot (.) and arrow (->) operators, CPU memory alignment and struct padding bytes, Unions and shared overlapping memory, Enumerations (enum) integer naming, typedef aliases, and hardware bit-fields.",
    "summaryHindi": "C भाषा में कस्टम डेटा टाइप्स का गहन अध्ययन: स्ट्रक्चर (struct) डिक्लेरेशन, डॉट (.) और एरो (->) ऑपरेटर्स, सीपीयू मेमोरी अलाइनमेंट और स्ट्रक्चर पैडिंग, यूनियन (union) की साझा मेमोरी, इनम (enum) और टाइपडेफ (typedef) का उपयोग, तथा हार्डवेयर बिट-फील्ड्स।",
    "readTimeMinutes": 21,
    "explanationEn": """1. WHY USER-DEFINED DATA TYPES ARE NECESSARY:
Primitive data types (int, float, char) represent isolated, single values. However, real-world software entities are inherently composite: a Student has a name (string), roll number (integer), and GPA (float); an Operating System Thread has an ID, stack pointer, priority, and state. Grouping these related attributes into a single unified construct creates high-level domain abstractions while maintaining C's bare-metal performance.
C provides four foundational mechanisms for creating user-defined types:
1. Structures ('struct')
2. Unions ('union')
3. Enumerations ('enum')
4. Type Aliasing ('typedef')

2. STRUCTURES ('struct') & MEMBER ACCESS:
A Structure is a composite user-defined data type that groups variables of DIFFERENT data types under a single unified name. Each variable within a structure is called a Member.
Syntax:
```c
struct Student {
    int id;
    char name[50];
    float gpa;
};
```
- Member Access Operators:
  1. The Dot Operator (.): Used to access members when working with a direct structure variable:
     'student1.id = 101;'
  2. The Arrow Operator (->): Used when accessing members through a POINTER to a structure:
     'struct Student *ptr = &student1; ptr->id = 101;'
     The arrow operator 'ptr->id' is shorthand syntactic sugar for '(*ptr).id'. The parentheses are strictly required because the dot operator (.) has higher precedence than the dereference operator (*).

3. MEMORY ALIGNMENT & STRUCT PADDING:
A common misconception among beginners is that the total byte size of a struct equals the exact sum of its members' individual sizes. On modern CPUs, this is rarely true!
Why Struct Padding Exists:
Modern 32-bit and 64-bit microprocessors do not read memory from RAM one byte at a time; they read in 4-byte or 8-byte Word-aligned chunks. Accessing an unaligned 4-byte integer spanning across two word boundaries requires two separate RAM memory read cycles plus bit shifting. To optimize CPU throughput, C compilers automatically insert invisible Padding Bytes between members so that each data type aligns to an address divisible by its own size.
Example:
```c
struct Sample {
    char a;    // 1 byte
    // 3 compiler padding bytes inserted here!
    int b;     // 4 bytes (aligned to 4-byte boundary)
    char c;    // 1 byte
    // 3 compiler trailing padding bytes inserted here!
};
```
Even though the actual data occupies 1 + 4 + 1 = 6 bytes, 'sizeof(struct Sample)' is 12 bytes!
Optimization Rule: Declare structure members in descending order of size (largest to smallest) to minimize wasted padding bytes.

4. UNIONS ('union') & SHARED OVERLAPPING MEMORY:
A Union syntactically resembles a struct, but fundamentally differs in how it allocates physical memory:
- In a struct, every member has its own independent memory location; total size is the sum of all members (plus padding).
- In a union, ALL members share the EXACT SAME physical memory location!
- Total Size of a Union: The size of a union is equal to the size of its LARGEST member (padded for alignment).
- Usage: Only ONE member can hold a valid value at any given moment. Writing to member B immediately overwrites and corrupts the value of member A. Unions are extensively utilized in embedded systems, network packet parsers, and hardware register mapping where the same memory chunk represents different data types under different contexts.

5. ENUMERATIONS ('enum'):
An Enumeration is a user-defined type consisting of named integral constants:
```c
enum Days { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY };
```
By default, the compiler assigns integer 0 to the first identifier (SUNDAY = 0), 1 to the second (MONDAY = 1), and so forth. Custom values can be assigned at will (e.g., enum Status { ERR = -1, OK = 0, PENDING = 1 };). Enums dramatically enhance code readability and maintainability compared to magic numbers.

6. TYPEDEF & HARDWARE BIT-FIELDS:
- 'typedef':
The typedef keyword creates a new, memorable alias for an existing data type:
```c
typedef struct Student Student; // Now we can write 'Student s1;' without the 'struct' keyword!
```
- Bit-Fields:
Allow precise bit-level packing of structure members to match hardware registers or conserve RAM in microcontrollers:
```c
struct Flags {
    unsigned int isReady : 1;  // Occupies exactly 1 bit!
    unsigned int mode    : 3;  // Occupies exactly 3 bits (values 0-7)
};
```""",
    "explanationHi": """१. यूजर डिफाइंड डेटा टाइप्स की आवश्यकता क्यों है?
प्राथमिक डेटा टाइप्स (int, float, char) केवल अकेले, बिखरे हुए मानों को स्टोर करते हैं। लेकिन वास्तविक जीवन की चीजें जटिल होती हैं: जैसे किसी छात्र का रोल नंबर (int), नाम (string) और अंक (float) होते हैं। यदि हम अलग-अलग वेरिएबल्स बनाएंगे तो कोड बिखर जाएगा।
C भाषा विभिन्न प्रकार के डेटा को एक साथ बांधकर नए कस्टम डेटा प्रकार बनाने के लिए चार शक्तिशाली साधन प्रदान करती है:
१. स्ट्रक्चर्स ('struct')
२. यूनियन्स ('union')
३. इन्यूमरेशन्स ('enum')
४. टाइपडेफ ('typedef')

२. स्ट्रक्चर्स ('struct') और सदस्य एक्सेस:
स्ट्रक्चर एक ऐसा यूजर-डिफाइंड डेटा टाइप है जो अलग-अलग प्रकार के डेटा तत्वों को एक नाम के अंतर्गत समेटता है। इसके अंदर के वेरिएबल्स को 'मेम्बर्स' (Members) कहा जाता है।
- मेम्बर्स को एक्सेस करने के दो ऑपरेटर:
१. डॉट ऑपरेटर (.): जब हम सीधे स्ट्रक्चर वेरिएबल के साथ काम करते हैं (जैसे s1.id = 101)।
२. एरो ऑपरेटर (->): जब हम स्ट्रक्चर के पॉइंटर के जरिए मेम्बर्स को एक्सेस करते हैं (जैसे ptr->id = 101)। एरो ऑपरेटर '(*ptr).id' का संक्षिप्त रूप है।

३. मेमोरी अलाइनमेंट और स्ट्रक्चर पैडिंग (Struct Padding):
अधिकांश नए प्रोग्रामर सोचते हैं कि स्ट्रक्चर का कुल आकार उसके सभी सदस्यों के आकारों का सीधा जोड़ होता है। लेकिन आधुनिक कंप्यूटरों में ऐसा नहीं होता!
पैडिंग क्यों होती है?
आधुनिक सीपीयू रैम से डेटा एक-एक बाइट करके नहीं पढ़ते, बल्कि 4-बाइट या 8-बाइट के 'वर्ड' (Word) में पढ़ते हैं। यदि कोई 4-बाइट का int किसी विषम पते पर होगा, तो सीपीयू को उसे पढ़ने के लिए दो बार मेमोरी पढ़नी पड़ेगी जिससे सिस्टम धीमा हो जाएगा। सीपीयू की गति बढ़ाने के लिए C कंपाइलर सदस्यों के बीच में कुछ खाली बाइट्स (Padding Bytes) स्वतः जोड़ देता है ताकि हर डेटा अपने आकार के गुणक पते पर ही शुरू हो।
उदाहरण के लिए, यदि स्ट्रक्चर में char (1 बाइट), int (4 बाइट) और char (1 बाइट) हों, तो कुल डेटा 6 बाइट्स का है, लेकिन कंपाइलर पैडिंग जोड़कर इसका कुल आकार 12 बाइट्स कर देता है!
मेमोरी बचाने का नियम: स्ट्रक्चर में हमेशा बड़े डेटा प्रकार पहले और छोटे डेटा प्रकार बाद में लिखें।

४. यूनियन्स ('union') और साझा मेमोरी:
यूनियन दिखने में स्ट्रक्चर जैसा होता है, लेकिन मेमोरी के मामले में पूरी तरह विपरीत होता है:
- स्ट्रक्चर में हर सदस्य को अलग मेमोरी मिलती है।
- यूनियन में सभी सदस्य एक ही साझा मेमोरी (Same Memory Location) का उपयोग करते हैं!
- यूनियन का कुल आकार उसके सबसे बड़े सदस्य के आकार के बराबर होता है।
- एक समय में केवल एक ही सदस्य का मान सुरक्षित रहता है। जैसे ही आप दूसरे सदस्य में मान लिखेंगे, पहले वाले का मान मिट जाएगा। इसका उपयोग एम्बेडेड सिस्टम्स और हार्डवेयर में मेमोरी बचाने के लिए किया जाता है।

५. इन्यूमरेशन ('enum'):
enum पूर्णांक कॉन्स्टेंट्स को मानव-पठनीय नाम देने का तरीका है:
'enum Days { SUN, MON, TUE, WED, THU, FRI, SAT };'
कंपाइलर SUN को स्वतः 0, MON को 1 आदि मान देता है। इससे कोड में जादुई संख्याओं (Magic Numbers) के बजाय सुंदर नाम उपयोग किए जा सकते हैं।

६. टाइपडेफ ('typedef') और बिट-फील्ड्स:
- 'typedef': किसी लंबे डेटा टाइप को एक छोटा और सरल उपनाम देने के लिए उपयोग होता है (जैसे 'typedef unsigned long long uint64;' या स्ट्रक्चर को सरल नाम देना)।
- बिट-फील्ड्स (Bit-Fields): स्ट्रक्चर के सदस्यों को बाइट्स के बजाय सीधे बिट्स के स्तर पर आकार देना (जैसे किसी फ्लैग के लिए केवल 1 बिट आरक्षित करना) ताकि माइक्रोकंट्रोलर में मेमोरी की भारी बचत हो सके।""",
    "realLifeAnalogy": {
        "en": "Think of a 'struct' like a student backpack with separate pockets for a laptop, a water bottle, and a pen: all items exist simultaneously in their own space. Think of a 'union' like a single convertible sofa-bed in a studio apartment: it can be a comfortable sofa OR a bed, but you cannot use both simultaneously because they occupy the exact same physical furniture space!",
        "hi": "स्ट्रक्चर की तुलना एक स्कूल बैग से करें जिसमें लैपटॉप, पानी की बोतल और पेन के लिए अलग-अलग जेबें हैं: सभी वस्तुएं अपनी-अपनी जगह एक साथ रह सकती हैं। यूनियन की तुलना एक सोफा-कम-बेड से करें: वह या तो सोफा बन सकता है या बिस्तर, दोनों एक साथ नहीं हो सकते क्योंकि दोनों एक ही भौतिक स्थान साझा करते हैं!"
    },
    "codeExamples": [
        {
            "title": "Struct Padding vs Union Shared Memory Demonstration",
            "titleHindi": "स्ट्रक्चर पैडिंग बनाम यूनियन की साझा मेमोरी का C कोड",
            "code": """#include <stdio.h>

struct StudentStruct {
    char grade;      // 1 byte (+ 3 padding bytes)
    int roll;        // 4 bytes
    double fee;      // 8 bytes
};

union DataUnion {
    int intVal;      // 4 bytes
    float floatVal;  // 4 bytes
    char charVal;    // 1 byte
};

int main() {
    printf("Size of struct StudentStruct: %zu bytes (1+4+8 = 13 + padding = 16!)\\n", sizeof(struct StudentStruct));
    printf("Size of union DataUnion:       %zu bytes (largest member size = 4)\\n", sizeof(union DataUnion));
    
    // Demonstrate union shared memory overwriting
    union DataUnion u;
    u.intVal = 65;
    printf("\\nu.intVal set to: %d\\n", u.intVal);
    printf("u.charVal reads:  '%c' (ASCII 65 is 'A'!)\\n", u.charVal);
    
    u.floatVal = 3.14f;
    printf("After setting u.floatVal = 3.14, u.intVal is corrupted: %d\\n", u.intVal);
    return 0;
}""",
            "output": """Size of struct StudentStruct: 16 bytes (1+4+8 = 13 + padding = 16!)
Size of union DataUnion:       4 bytes (largest member size = 4)

u.intVal set to: 65
u.charVal reads:  'A' (ASCII 65 is 'A'!)
After setting u.floatVal = 3.14, u.intVal is corrupted: 1078523331""",
            "explanation": "Demonstrates struct padding expansion to 16 bytes and proves that union members share identical memory bytes.",
            "explanationHindi": "स्ट्रक्चर में पैडिंग के कारण 16 बाइट्स आकार और यूनियन में सभी सदस्यों द्वारा एक ही मेमोरी साझा करने का व्यावहारिक प्रदर्शन।"
        }
    ],
    "practicals": [
        {
            "id": "prac-udt-1",
            "title": "Array of Structures with Pointer Arrow Operator",
            "titleHindi": "स्ट्रक्चर्स का ऐरे और एरो (->) ऑपरेटर का उपयोग",
            "objective": "Manage multiple records using an array of structures and traverse with a pointer.",
            "objectiveHindi": "स्ट्रक्चर ऐरे बनाएं और पॉइंटर एरो ऑपरेटर से डेटा प्रोसेस करें।",
            "code": """#include <stdio.h>

typedef struct {
    int id;
    char grade;
    float marks;
} Record;

int main() {
    Record students[2] = {
        {101, 'A', 92.5f},
        {102, 'B', 81.0f}
    };
    
    Record *ptr = students; // Points to first record
    
    for (int i = 0; i < 2; i++) {
        printf("Student %d -> ID: %d | Grade: %c | Marks: %.1f\\n", 
               i + 1, (ptr + i)->id, (ptr + i)->grade, (ptr + i)->marks);
    }
    return 0;
}""",
            "expectedOutput": """Student 1 -> ID: 101 | Grade: A | Marks: 92.5
Student 2 -> ID: 102 | Grade: B | Marks: 81.0""",
            "lineByLineExplanation": [
                {"line": "(ptr + i)->id", "noteEn": "Advances pointer by sizeof(Record) and dereferences id member.", "noteHi": "पॉइंटर को अगले रिकॉर्ड पर ले जाकर एरो से id सदस्य पढ़ता है।"},
                {"line": "typedef struct { ... } Record;", "noteEn": "Defines clean type alias eliminating repeated 'struct' keyword.", "noteHi": "स्ट्रक्चर को संक्षिप्त नाम देता है ताकि बार-बार struct न लिखना पड़े।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["struct members have separate memory; union members share the same memory.", "Compiler inserts padding bytes for CPU word alignment.", "Use dot (.) for direct variables and arrow (->) for structure pointers.", "typedef creates type aliases."],
        "hi": ["struct के सभी सदस्यों को अलग मेमोरी मिलती है; union के सभी सदस्य एक ही मेमोरी साझा करते हैं।", "सीपीयू स्पीड के लिए कंपाइलर स्ट्रक्चर में पैडिंग बाइट्स जोड़ता है।", "वेरिएबल के लिए डॉट (.) और पॉइंटर के लिए एरो (->) ऑपरेटर का उपयोग करें।", "typedef डेटा टाइप को सरल उपनाम देता है।"]
    },
    "commonPitfalls": {
        "en": ["Assuming sizeof(struct) is exact mathematical sum of member sizes.", "Reading from a union member that was not the most recently written.", "Using dot operator on a pointer instead of arrow operator."],
        "hi": ["स्ट्रक्चर के आकार को केवल सदस्यों के आकारों का जोड़ समझना (पैडिंग भूल जाना)।", "यूनियन के उस सदस्य को पढ़ना जिसमें हाल ही में मान नहीं लिखा गया था।", "पॉइंटर पर एरो (->) के स्थान पर गलती से डॉट (.) ऑपरेटर लगाना।"]
    }
}
register_topic(t11)

# ==============================================================================
# TOPIC 12: Errors: Types, Debugging & Undefined Behavior (एरर्स और डिबगिंग)
# ==============================================================================
t12 = {
    "id": "error",
    "order": 12,
    "title": "Errors, Debugging, Segmentation Faults & Undefined Behavior",
    "titleHindi": "त्रुटियों के प्रकार, डिबगिंग और अनडिफाइंड बिहेवियर (Errors & Debugging)",
    "category": "Basics",
    "summary": "Master software defect triage in C: Syntax compile-time errors, Linker unresolved symbols (LNK2019 / undefined reference to main), Runtime crashes, Logical calculation bugs, Segmentation faults (SIGSEGV), Stack overflow, Undefined Behavior (UB) compiler optimization hazards, Defensive assertions with assert.h, and gdb debugging.",
    "summaryHindi": "C भाषा में त्रुटियों का संपूर्ण वर्गीकरण: सिंटैक्स एरर, लिंकर एरर (undefined reference to main), रनटाइम एरर, लॉजिकल एरर, सेग्मेंटेशन फॉल्ट (SIGSEGV), स्टैक ओवरफ्लो, अनडिफाइंड बिहेवियर (UB) के खतरे, assert.h द्वारा रक्षात्मक प्रोग्रामिंग और डिबगिंग तकनीक।",
    "readTimeMinutes": 21,
    "explanationEn": """1. TAXONOMY OF SOFTWARE DEFECTS IN C:
Developing production-grade systems software in C requires deep familiarity with the distinct phases where errors manifest. Unlike managed languages (Java, Python, C#) that throw safe, catchable virtual machine exceptions, C operates directly on bare metal. An unhandled defect in C causes silent memory corruption, catastrophic security breaches, or immediate operating system termination signals.
Errors in C fall into four fundamental categories:
1. Compile-Time Errors (Syntax & Semantic Errors)
2. Linker Errors (Unresolved External Symbols)
3. Runtime Errors (Faults, Exceptions, System Signals)
4. Logical Errors (Algorithmic Flaws)

2. COMPILE-TIME ERRORS (SYNTAX & SEMANTIC):
Occur during the preprocessing, lexical analysis, parsing, and type-checking phases of the compiler (gcc / clang / msvc).
- Syntax Errors: Violations of the grammatical grammar rules of C (e.g., missing semicolons, unmatched curly braces, misspelled keywords like 'whlie' instead of 'while'). The compiler halts and refuses to emit an object (.o / .obj) file.
- Semantic Errors: Syntactically valid statements that violate C type system constraints (e.g., assigning a string literal to an integer variable, passing the wrong number of arguments to a function, or attempting to modify a const variable).

3. LINKER ERRORS (UNRESOLVED REFERENCES):
The linker combines multiple compiled object files and libraries into a final executable binary. Linker errors occur when code references a symbol (function or global variable) whose actual compiled definition cannot be located:
- Classic Linker Error: 'undefined reference to `main`': Occurs if the program entry point main() is missing or misspelled (e.g., typing 'mian()').
- 'undefined reference to `sqrt`': Occurs when header <math.h> is included but the math library is not linked via the '-lm' compiler flag.
- Multiple Definition Error: Occurs when the same global variable or non-inline function is defined across multiple source files without 'extern'.

4. RUNTIME ERRORS & OPERATING SYSTEM SIGNALS:
Runtime errors occur while the compiled binary is actively executing on the physical CPU:
1. Segmentation Fault (SIGSEGV - Signal 11):
Triggered by the CPU's Memory Management Unit (MMU) when a program attempts to access a virtual memory address that it does not own or has no permission to access.
Common Causes:
- Dereferencing a NULL pointer (*(int*)NULL = 5;).
- Dereferencing an uninitialized wild pointer.
- Writing to read-only string literal memory (char *s = "Hello"; s[0] = 'M'; -> CRASH!).
- Buffer overflow walking past stack boundaries into protected OS pages.
2. Bus Error (SIGBUS):
Triggered when CPU hardware attempts unaligned memory access on architectures that strictly enforce alignment.
3. Floating Point Exception (SIGFPE):
Triggered by mathematical hardware faults, most commonly integer division by zero (e.g., int x = 10 / 0;). Note: Float division by zero in IEEE-754 yields INFINITY, not SIGFPE!
4. Stack Overflow:
Occurs when deep or infinite recursion exhausts the call stack boundary (typically 8MB on Linux).

5. THE DARK REALM OF UNDEFINED BEHAVIOR (UB):
In the ISO C standard, certain operations are categorized as Undefined Behavior (UB). When UB is encountered, the C standard places ZERO requirements on the compiler or hardware. The program is not required to crash; it may appear to work today, produce garbage tomorrow, or the optimizing compiler may delete entire blocks of code assuming UB can never happen!
Famous Undefined Behaviors in C:
- Signed integer overflow (INT_MAX + 1).
- Modifying a variable twice without an intervening sequence point (i = i++; or func(i++, i++)).
- Accessing memory after calling free() (use-after-free).
- Reading uninitialized automatic local variables.
- Shifting a 32-bit integer by 32 or more bits.

6. DEFENSIVE PROGRAMMING & ASSERTIONS:
To detect bugs early during development, professional systems engineers employ assertions from standard header <assert.h>:
```c
assert(ptr != NULL);
assert(divisor != 0);
```
If the condition evaluates to false (0), assert() immediately prints the failing expression, source file name, and line number to stderr, and terminates execution via abort(). In production release builds, compiling with '-DNDEBUG' completely disables all assert checks without runtime performance penalty!""",
    "explanationHi": """१. C भाषा में सॉफ्टवेयर त्रुटियों का संपूर्ण वर्गीकरण:
C भाषा में मजबूत और सुरक्षित सॉफ्टवेयर बनाने के लिए यह समझना अनिवार्य है कि गलतियाँ प्रोग्राम के किस चरण में सामने आती हैं। पायथन या जावा जैसी भाषाओं के विपरीत जहाँ गलतियाँ सुरक्षित अपवादों (Exceptions) के रूप में पकड़ी जा सकती हैं, C भाषा सीधे कंप्यूटर के हार्डवेयर और मेमोरी पर काम करती है। C में एक छोटी सी भूल पूरे प्रोग्राम को क्रैश कर सकती है या ऑपरेटिंग सिस्टम को सेग्मेंटेशन फॉल्ट देने पर मजबूर कर देती है।
C भाषा में त्रुटियों को 4 प्रमुख श्रेणियों में बांटा गया है:
१. कंपाइल-टाइम त्रुटियाँ (Compile-Time Errors - सिंटैक्स और सेमांटिक)
२. लिंकर त्रुटियाँ (Linker Errors)
३. रनटाइम त्रुटियाँ (Runtime Errors - क्रैश और सिग्नल्स)
४. लॉजिकल त्रुटियाँ (Logical Errors - कलन-विधि की गलतियाँ)

२. कंपाइल-टाइम त्रुटियाँ (Syntax & Semantic Errors):
ये त्रुटियाँ प्रोग्राम को कंपाइल करते समय सामने आती हैं। जब तक इन्हें ठीक न किया जाए, कंपाइलर प्रोग्राम की मशीन फाइल (.exe या .o) नहीं बनाता।
- सिंटैक्स एरर (Syntax Error): C भाषा के व्याकरण के नियमों का उल्लंघन। जैसे सेमीकोलन (;) भूल जाना, ब्रैकेट बंद न करना, या कीवर्ड्स की गलत स्पेलिंग लिखना (जैसे while की जगह whlie)।
- सेमांटिक एरर (Semantic Error): वाक्य रचना सही होने पर भी डेटा टाइप या भाषा के नियमों का उल्लंघन। जैसे const वेरिएबल का मान बदलने का प्रयास करना या संख्या वाले वेरिएबल में स्ट्रिंग डालना।

३. लिंकर त्रुटियाँ (Linker Errors):
लिंकर कंपाइल की गई अलग-अलग फाइलों और पुस्तकालयों को जोड़कर अंतिम सॉफ्टवेयर बनाता है।
- सबसे प्रसिद्ध लिंकर एरर: 'undefined reference to `main`': यह तब आता है जब मुख्य फंक्शन main() गायब हो या उसकी स्पेलिंग गलत (जैसे mian) लिख दी गई हो।
- 'undefined reference to `sqrt`': गणितीय लाइब्रेरी <math.h> का उपयोग करने पर यदि कंपाइलर को '-lm' फ्लैग न दिया जाए।
- मल्टीपल डेफिनिशन: जब एक ही ग्लोबल वेरिएबल को दो अलग-अलग C फाइलों में बिना 'extern' के दोबारा बना दिया जाए।

४. रनटाइम त्रुटियाँ और ऑपरेटिंग सिस्टम सिग्नल्स:
ये त्रुटियाँ तब आती हैं जब प्रोग्राम सफलतापूर्वक कंपाइल होकर कंप्यूटर पर चल रहा होता है:
१. सेग्मेंटेशन फॉल्ट (Segmentation Fault - SIGSEGV):
यह C का सबसे कुख्यात क्रैश है। जब प्रोग्राम मेमोरी (रैम) के ऐसे पते को छूने या लिखने की कोशिश करता है जो उसका नहीं है, तो ऑपरेटिंग सिस्टम सुरक्षा के लिए प्रोग्राम को तुरंत मार (Kill) देता है।
इसके प्रमुख कारण:
- NULL पॉइंटर को डीरेफरेंस करना (*(int*)NULL = 10;)।
- अनइनिशियलाइज्ड जंगली पॉइंटर का उपयोग।
- स्ट्रिंग लिटरल्स (Read-only मेमोरी) में लिखने की कोशिश करना (जैसे char *s = "Hello"; s[0]='M';)।
- ऐरे की सीमा से बहुत बाहर निकल जाना।
२. शून्य से भाग (SIGFPE):
जब पूर्णांक में शून्य से भाग दिया जाता है (जैसे 10 / 0), तो हार्डवेयर क्रैश हो जाता है।
३. स्टैक ओवरफ्लो (Stack Overflow):
जब कोई फंक्शन खुद को बार-बार अनंत बार कॉल करता है (Infinite Recursion), तो कंप्यूटर की स्टैक मेमोरी भर जाती है और प्रोग्राम क्रैश हो जाता है।

५. अनडिफाइंड बिहेवियर (Undefined Behavior - UB) का खतरा:
C भाषा के मानक में कुछ कार्यों को 'अनडिफाइंड बिहेवियर' कहा गया है। इसका अर्थ है कि यदि प्रोग्रामर ऐसा कोड लिखेगा, तो कंपाइलर और कंप्यूटर कुछ भी करने के लिए स्वतंत्र हैं!
प्रमुख अनडिफाइंड बिहेवियर:
- साइन्ड इंटीजर ओवरफ्लो (INT_MAX + 1)।
- एक ही एक्सप्रेशन में दो बार i++ लिखना (i = i++;)।
- फ्री की जा चुकी मेमोरी का उपयोग करना (Use-after-free)।
- बिना मान दिए लोकल वेरिएबल को पढ़ना।

६. रक्षात्मक प्रोग्रामिंग और असर्शन्स (assert.h):
कोड की गलतियों को तुरंत पकड़ने के लिए पेशेवर इंजीनियर assert.h का उपयोग करते हैं:
'assert(ptr != NULL);'
यदि शर्त गलत होती है, तो प्रोग्राम तुरंत फाइल नाम और लाइन नंबर स्क्रीन पर दिखाकर बंद हो जाता है, जिससे बग को तुरंत पकड़ा जा सकता है।""",
    "realLifeAnalogy": {
        "en": "Think of a Syntax Error like a spelling mistake on a blueprint that prevents the factory from even starting construction. A Linker Error is like ordering a custom door from the catalog, but the delivery truck never shows up to the construction site. A Runtime Segmentation Fault is like walking into a bank vault without authorization: the silent alarm trips and armed security guards instantly tackle you to the ground!",
        "hi": "सिंटैक्स एरर मकान के नक्शे पर हुई ऐसी गलती है जिसे देखते ही ठेकेदार काम शुरू करने से मना कर देता है। लिंकर एरर ऐसा है कि नक्शे में खिड़की बनी है लेकिन बाजार में वह खिड़की मिली ही नहीं। और सेग्मेंटेशन फॉल्ट किसी बैंक की तिजोरी में बिना अनुमति घुसने जैसा है: अलार्म बजते ही सुरक्षा गार्ड आपको तुरंत पकड़कर बाहर फेंक देते हैं!"
    },
    "codeExamples": [
        {
            "title": "Demonstration of Assertions and Division by Zero Guard",
            "titleHindi": "assert.h द्वारा रक्षात्मक कोडिंग और शून्य विभाजन से सुरक्षा",
            "code": """#include <stdio.h>
#include <assert.h>

double safeDivide(double numerator, double denominator) {
    // Assert guards against fatal zero division
    assert(denominator != 0.0 && "Denominator cannot be zero!");
    return numerator / denominator;
}

int main() {
    double n = 50.0, d = 5.0;
    printf("Result 50 / 5 = %.2f\\n", safeDivide(n, d));
    
    printf("Testing safe divide with valid numbers complete.\\n");
    // safeDivide(50.0, 0.0); // Would trigger assertion failure on line 6!
    return 0;
}""",
            "output": """Result 50 / 5 = 10.00
Testing safe divide with valid numbers complete.""",
            "explanation": "Demonstrates defensive assertion checking before arithmetic operations to prevent runtime crashes.",
            "explanationHindi": "रनटाइम क्रैश से बचने के लिए अंकगणितीय क्रिया से पहले assert द्वारा सुरक्षा जांच का प्रदर्शन।"
        }
    ],
    "practicals": [
        {
            "id": "prac-err-1",
            "title": "Fixing a Segmentation Fault and Pointer Inspection",
            "titleHindi": "सेग्मेंटेशन फॉल्ट को पहचानना और सुरक्षित समाधान",
            "objective": "Identify the cause of segmentation faults and implement defensive NULL checking.",
            "objectiveHindi": "NULL पॉइंटर चेकिंग द्वारा सेग्मेंटेशन फॉल्ट को रोकें।",
            "code": """#include <stdio.h>

void printNumber(int *ptr) {
    // Defensive check prevents SIGSEGV crash!
    if (ptr == NULL) {
        printf("Error: Attempted to dereference NULL pointer! Aborting safely.\\n");
        return;
    }
    printf("Value at address %p is: %d\\n", (void*)ptr, *ptr);
}

int main() {
    int value = 42;
    int *validPtr = &value;
    int *nullPtr = NULL;
    
    printf("Testing with valid pointer:\\n");
    printNumber(validPtr);
    
    printf("\\nTesting with NULL pointer:\\n");
    printNumber(nullPtr);
    return 0;
}""",
            "expectedOutput": """Testing with valid pointer:
Value at address 0x7ffd98b2c4e0 is: 42

Testing with NULL pointer:
Error: Attempted to dereference NULL pointer! Aborting safely.""",
            "lineByLineExplanation": [
                {"line": "if (ptr == NULL)", "noteEn": "Defensive guard prevents MMU memory violation.", "noteHi": "मेमोरी सुरक्षा के लिए पॉइंटर का NULL होना जांचता है।"},
                {"line": "printf(\\"Value at address ...\\", *ptr);", "noteEn": "Safe dereference guaranteed only after NULL check passes.", "noteHi": "NULL जांच पास होने के बाद ही सुरक्षित डीरेफरेंस करता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["Syntax errors prevent compilation; linker errors occur when symbols are missing.", "SIGSEGV happens when dereferencing NULL or invalid memory.", "assert(condition) halts with line number on failure.", "Undefined Behavior (UB) allows compiler to generate arbitrary code."],
        "hi": ["सिंटैक्स एरर कंपाइल होने से रोकते हैं; लिंकर एरर सिंबल न मिलने पर आते हैं।", "SIGSEGV तब आता है जब NULL या अवैध मेमोरी को छुआ जाता है।", "assert गलत होने पर फाइल और लाइन नंबर के साथ प्रोग्राम रोक देता है।", "अनडिफाइंड बिहेवियर कंपाइलर को कोई भी कोड जनरेट करने की छूट देता है।"]
    },
    "commonPitfalls": {
        "en": ["Writing to string literals (char *s = \\"hi\\"; s[0]='x'; causes SIGSEGV).", "Forgetting to link math library with -lm compiler flag.", "Relying on Undefined Behavior that happens to work on one specific compiler."],
        "hi": ["स्ट्रिंग लिटरल में मान बदलने का प्रयास करना (SIGSEGV क्रैश)।", "मैथ लाइब्रेरी को -lm फ्लैग से लिंक करना भूल जाना।", "अनडिफाइंड बिहेवियर पर भरोसा करना जो किसी एक कंपाइलर पर गलती से चल रहा हो।"]
    }
}
register_topic(t12)

# ==============================================================================
# TOPIC 13: File Handling: Streams, I/O & Modes (फाइल हैंडलिंग)
# ==============================================================================
t13 = {
    "id": "file-handling",
    "order": 13,
    "title": "File Handling: Streams, File Modes, Buffering & Binary Records",
    "titleHindi": "फाइल हैंडलिंग: स्ट्रीम्स, फाइल मोड्स और बाइनरी ऑपरेशन्स (File Handling)",
    "category": "Memory & Files",
    "summary": "Master persistent disk storage in C: The FILE structure pointer, fopen() file opening modes (r, w, a, r+, w+, a+, b), fclose() stream flushing and descriptor release, text stream I/O (fgetc, fputc, fgets, fputs, fprintf, fscanf), binary block records (fread, fwrite), random access seeking (fseek, ftell, rewind, SEEK_SET, SEEK_CUR, SEEK_END), and stream error handling (feof, ferror, perror).",
    "summaryHindi": "C भाषा में स्थायी डिस्क स्टोरेज का संपूर्ण अध्ययन: FILE स्ट्रक्चर पॉइंटर, fopen के विभिन्न मोड्स (r, w, a, r+, w+, a+, b), fclose द्वारा स्ट्रीम फ्लशिंग, टेक्स्ट फाइल I/O (fgetc, fgets, fprintf, fscanf), बाइनरी रिकॉर्ड I/O (fread, fwrite), रैंडम एक्सेस सीकिंग (fseek, ftell, rewind), तथा फाइल एरर हैंडलिंग (feof, ferror, perror)।",
    "readTimeMinutes": 23,
    "explanationEn": """1. PERSISTENT STORAGE VERSUS VOLATILE MEMORY:
All variables, arrays, and dynamic heap memory allocations explored thus far exist exclusively within Random Access Memory (RAM). RAM is Volatile Storage: the exact moment a program terminates or the physical computer loses power, all data residing in RAM evaporates instantly. To preserve data across program executions and power cycles, software must write to Non-Volatile Secondary Storage devices (Hard Disk Drives, Solid State Drives, NVMe flash).
In C, interacting with persistent storage files is mediated through the File Stream Abstraction provided by standard header <stdio.h>.

2. THE 'FILE' STRUCTURE POINTER & FOPEN():
In C, a disk file is never accessed by raw hardware sectors. Instead, the runtime library maintains an opaque control block represented by the typedef 'FILE' (defined in <stdio.h>). A 'FILE*' pointer stores critical internal metadata:
- The OS File Descriptor (a numeric handle provided by the operating system kernel).
- The memory stream read/write buffer address.
- The current byte Position Indicator within the file.
- End-of-File (EOF) and Error status bit flags.

Opening a Stream with fopen():
```c
FILE *fopen(const char *filename, const char *mode);
```
Mandatory Defensive Rule: If fopen() fails (e.g., file does not exist, disk is full, or user lacks read/write permissions), it returns NULL. A robust program MUST ALWAYS test for NULL before performing any file operations!

3. EXHAUSTIVE TAXONOMY OF FOPEN MODES:
File modes dictate access permissions and file pointer placement:
1. "r" (Read Text):
   - Opens an existing text file for reading.
   - File MUST already exist! If the file is missing, fopen() returns NULL.
2. "w" (Write Text):
   - Creates a new empty text file for writing.
   - DANGER: If the file already exists, its existing contents are completely TRUNCATED and wiped to 0 bytes!
3. "a" (Append Text):
   - Opens file for appending data to the very end.
   - If the file exists, previous contents are preserved; new writes are appended at the end. If missing, a new file is created.
4. "r+" (Read & Write Extended):
   - Opens an existing file for both reading and writing. File must exist.
5. "w+" (Write & Read Extended):
   - Creates an empty file for both reading and writing. Overwrites existing file if present.
6. "a+" (Append & Read Extended):
   - Opens file for reading and appending.
7. Binary Modes ("rb", "wb", "ab", "rb+", "wb+", "ab+"):
   - Disables automatic newline translation ('\\r\\n' on Windows into '\\n'). Crucial for images, compiled binaries, and structured data records.

4. CLOSING STREAMS & FLUSHING WITH FCLOSE():
```c
int fclose(FILE *stream);
```
Never forget to close opened files! fclose() performs three vital operating system tasks:
1. Flushes any remaining unwritten data sitting in RAM buffers onto physical disk sectors.
2. Deallocates internal stream buffers from memory.
3. Releases the operating system file descriptor handle back to the kernel. Operating systems enforce a strict limit on open file handles per process (e.g., 1024); failing to close files causes "File Descriptor Leak" crashes.

5. TEXT STREAM FUNCTIONS VS BINARY STREAM FUNCTIONS:
- Text I/O Functions:
  - fgetc(fp) / fputc(ch, fp): Read / write a single character.
  - fgets(buffer, size, fp): Reads a line of text safely up to size-1 bytes or newline.
  - fputs(str, fp): Writes a string without adding trailing newlines.
  - fprintf(fp, format, ...): Formatted text output to file stream.
  - fscanf(fp, format, ...): Formatted text parsing from file stream.
- Binary Block I/O Functions:
  For structured data (e.g., writing whole structs), text formatting is slow and wastes space. Binary functions read and write raw bytes directly:
  ```c
  size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);
  size_t fread(void *ptr, size_t size, size_t count, FILE *stream);
  ```
  Writes or reads 'count' elements of 'size' bytes each in a single hardware DMA disk operation!

6. RANDOM ACCESS FILE SEEKING (FSEEK, FTELL, REWIND):
Files are sequential streams by default, but random access allows jumping directly to any byte offset:
1. fseek(fp, offset, origin):
   Moves the byte position indicator. 'origin' can be:
   - SEEK_SET: Beginning of the file.
   - SEEK_CUR: Current position indicator.
   - SEEK_END: End of the file.
2. ftell(fp):
   Returns the current byte offset from the start of the file (type long). Used to calculate exact file sizes:
   ```c
   fseek(fp, 0, SEEK_END);
   long fileSize = ftell(fp);
   ```
3. rewind(fp):
   Resets position indicator back to byte 0 (equivalent to fseek(fp, 0, SEEK_SET);).

7. STREAM ERROR & EOF DETECTION (FEOF, FERROR, PERROR):
- feof(fp): Returns non-zero ONLY AFTER an attempt has been made to read past the end of the file. DANGER: Do not use 'while(!feof(fp))' as a loop condition because it reads the last record twice!
- ferror(fp): Tests if a hardware read/write error occurred on the stream.
- perror("Custom message"): Prints descriptive human-readable OS error string (such as "No such file or directory" or "Permission denied") to stderr.""",
    "explanationHi": """१. वोलेटाइल मेमोरी (RAM) बनाम स्थायी स्टोरेज (Files):
अब तक हमने C भाषा में जितने भी वेरिएबल्स, ऐरे और डायनेमिक मेमोरी (malloc) का उपयोग किया, वे सभी कंप्यूटर की मुख्य मेमोरी (RAM) में रहते हैं। रैम एक 'वोलेटाइल' (अस्थायी) मेमोरी होती है: जैसे ही प्रोग्राम बंद होता है या कंप्यूटर की बिजली कटती है, रैम का सारा डेटा हमेशा के लिए मिट जाता है।
यदि हमें डेटा को स्थायी रूप से सुरक्षित रखना हो (जैसे छात्रों का रिकॉर्ड, गेम सेव फाइल्स या लॉग्स), तो हमें डेटा को नॉन-वोलेटाइल सेकेंडरी स्टोरेज (हार्ड डिस्क, SSD) की फाइलों में लिखना पड़ता है।
C भाषा में फाइलों से संवाद करने के लिए <stdio.h> हेडर फाइल के 'फाइल स्ट्रीम्स' (File Streams) का उपयोग किया जाता है।

२. 'FILE' स्ट्रक्चर पॉइंटर और fopen():
C भाषा में हम डिस्क की फाइलों को सीधे हार्डवेयर स्तर पर नहीं पढ़ते। इसके बजाय C रनटाइम एक विशेष स्ट्रक्चर 'FILE' का उपयोग करता है। एक 'FILE*' पॉइंटर निम्नलिखित आंतरिक जानकारी को संभालता है:
- ऑपरेटिंग सिस्टम का फाइल डिस्क्रिप्टर (File Descriptor)।
- मेमोरी बफर का पता।
- फाइल के अंदर कर्सर की वर्तमान स्थिति (Position Indicator)।
- फाइल समाप्ति (EOF) और एरर के बिट फ्लैग्स।

fopen() द्वारा फाइल खोलना:
```c
FILE *fopen(const char *filename, const char *mode);
```
अनिवार्य सुरक्षा नियम: यदि किसी कारणवश फाइल न खुले (जैसे फाइल मौजूद न हो, डिस्क भरी हो या परमिशन न हो), तो fopen() 'NULL' लौटाता है। फाइल पर कोई भी काम करने से पहले हमेशा NULL की जांच करना अनिवार्य है!

३. फाइल ओपनिंग मोड्स (File Modes) का विस्तृत विवरण:
१. "r" (रीड मोड):
   - पहले से मौजूद टेक्स्ट फाइल को पढ़ने के लिए खोलता है।
   - फाइल का पहले से मौजूद होना अनिवार्य है! यदि फाइल नहीं है तो fopen NULL देगा।
२. "w" (राइट मोड):
   - लिखने के लिए नई फाइल बनाता है।
   - अत्यंत महत्वपूर्ण चेतावनी: यदि फाइल पहले से मौजूद है, तो उसका पुराना सारा डेटा हमेशा के लिए मिटा दिया जाता है (Truncate)!
३. "a" (अपेंड मोड):
   - फाइल के अंत में नया डेटा जोड़ने के लिए। पुराना डेटा सुरक्षित रहता है। यदि फाइल न हो तो नई फाइल बन जाती है।
४. "r+" (रीड और राइट): दोनों पढ़ने और लिखने के लिए। फाइल होनी चाहिए।
५. "w+" (राइट और रीड): पढ़ने और लिखने के लिए; पुरानी फाइल को खाली कर देता है।
६. "a+" (अपेंड और रीड): पढ़ने और अंत में जोड़ने के लिए।
७. बाइनरी मोड्स ("rb", "wb", "ab"):
   - बिना किसी कैरेक्टर कन्वर्जन के सीधे बाइनरी बाइट्स पढ़ने/लिखने के लिए (जैसे फोटो, ऑडियो या स्ट्रक्चर्स)।

४. fclose() द्वारा स्ट्रीम बंद करना:
'fclose(fp);'
फाइल का काम पूरा होने के बाद उसे बंद करना अनिवार्य है। यह तीन प्रमुख कार्य करता है:
१. रैम बफर में बचे हुए डेटा को डिस्क पर लिखता है (Flushing)।
२. बफर मेमोरी को खाली करता है।
३. ऑपरेटिंग सिस्टम के फाइल डिस्क्रिप्टर को मुक्त करता है। यदि फाइलें बंद न की जाएँ, तो ऑपरेटिंग सिस्टम फाइल हैंडल्स खत्म होने पर एरर दे देगा।

५. टेक्स्ट बनाम बाइनरी I/O फंक्शन्स:
- टेक्स्ट फाइल फंक्शन्स:
  - fgetc(fp) / fputc(ch, fp): एक-एक कैरेक्टर पढ़ना और लिखना।
  - fgets(buffer, size, fp): फाइल से पूरी एक पंक्ति सुरक्षित रूप से पढ़ना।
  - fputs(str, fp): स्ट्रिंग को फाइल में लिखना।
  - fprintf(fp, format, ...): फॉर्मेटेड टेक्स्ट फाइल में लिखना।
  - fscanf(fp, format, ...): फॉर्मेटेड टेक्स्ट फाइल से पढ़ना।
- बाइनरी फाइल फंक्शन्स (fread और fwrite):
  पूरे के पूरे स्ट्रक्चर को एक ही झटके में डिस्क पर लिखने और पढ़ने के लिए:
  ```c
  fwrite(&student1, sizeof(Student), 1, fp);
  fread(&student1, sizeof(Student), 1, fp);
  ```
  यह टेक्स्ट कन्वर्जन की देरी के बिना सुपर-फास्ट गति से सीधे बाइनरी डेटा लिखता और पढ़ता है।

६. रैंडम एक्सेस सीकिंग (fseek, ftell, rewind):
फाइल में सीधे किसी भी बाइट पर छलांग लगाने की सुविधा:
१. fseek(fp, offset, origin):
   कर्सर को किसी विशिष्ट स्थान पर ले जाता है।
   - SEEK_SET: फाइल की शुरुआत से।
   - SEEK_CUR: कर्सर की वर्तमान जगह से।
   - SEEK_END: फाइल के अंत से।
२. ftell(fp):
   यह बताता है कि कर्सर इस समय फाइल की शुरुआत से कितने बाइट्स दूर है। इसका उपयोग फाइल का कुल साइज (आकार) नापने के लिए किया जाता है:
   'fseek(fp, 0, SEEK_END); long size = ftell(fp);'
३. rewind(fp):
   कर्सर को वापस फाइल के पहले बाइट (SEEK_SET) पर भेज देता है।

७. एरर हैंडलिंग (feof, ferror, perror):
- feof(fp): यह तभी सत्य लौटाता है जब फाइल के अंतिम सिरे (EOF) के पार जाने की कोशिश की जा चुकी हो। कभी भी 'while(!feof(fp))' का उपयोग न करें क्योंकि यह अंतिम रिकॉर्ड को दो बार पढ़ लेता है!
- perror("मैसेज"): सिस्टम में आई एरर का असली कारण स्क्रीन पर प्रिंट करता है।""",
    "realLifeAnalogy": {
        "en": "Think of RAM like writing notes on an erasable whiteboard: the moment you turn off the office lights and leave, the janitor wipes the board clean (volatile memory)! Think of file handling like writing notes with indelible ink into a bound leather notebook and locking it in an iron filing cabinet: years later, you can open the notebook ('fopen'), turn directly to Page 50 ('fseek'), and read the exact preserved words!",
        "hi": "रैम की तुलना व्हाइटबोर्ड पर लिखे मिटने वाले मार्कर से करें: शाम को जैसे ही आप ऑफिस से निकलते हैं, बोर्ड को पोंछकर साफ कर दिया जाता है! फाइल हैंडलिंग की तुलना एक पक्की डायरी में स्थायी स्याही से लिखने और उसे लोहे की अलमारी में बंद करने से करें: 10 साल बाद भी डायरी खोलकर (fopen) सीधे 50वें पन्ने पर जाकर (fseek) आप अपना लिखा हुआ बिल्कुल सुरक्षित पढ़ सकते हैं!"
    },
    "codeExamples": [
        {
            "title": "Text File Writing and Safe Reading with fgets",
            "titleHindi": "टेक्स्ट फाइल में लिखना और fgets द्वारा सुरक्षित पढ़ना",
            "code": """#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fp;
    
    // Writing to text file
    fp = fopen("demo.txt", "w");
    if (fp == NULL) {
        perror("Error opening file for write");
        return 1;
    }
    
    fprintf(fp, "Line 1: Learning C File Handling\\n");
    fprintf(fp, "Line 2: Persistent Storage in Action\\n");
    fclose(fp); // Flush and close
    printf("Data written and file closed successfully.\\n");
    
    // Reading back from file safely
    fp = fopen("demo.txt", "r");
    if (fp == NULL) {
        perror("Error opening file for read");
        return 1;
    }
    
    char buffer[100];
    printf("\\nReading file contents:\\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    
    fclose(fp);
    return 0;
}""",
            "output": """Data written and file closed successfully.

Reading file contents:
Line 1: Learning C File Handling
Line 2: Persistent Storage in Action""",
            "explanation": "Demonstrates file creation in 'w' mode, fprintf formatting, safe closing, and line-by-line reading with fgets.",
            "explanationHindi": "'w' मोड में फाइल बनाना, fprintf से लिखना, fclose से स्ट्रीम बंद करना और fgets द्वारा लाइन-दर-लाइन सुरक्षित पढ़ने का प्रदर्शन।"
        }
    ],
    "practicals": [
        {
            "id": "prac-file-1",
            "title": "Binary Record Storage and File Size Calculation",
            "titleHindi": "बाइनरी रिकॉर्ड स्टोरेज और फाइल का आकार निकालना",
            "objective": "Store and retrieve structured binary records using fwrite/fread and calculate size with fseek/ftell.",
            "objectiveHindi": "fwrite और fread से बाइनरी स्ट्रक्चर सेव करें तथा fseek/ftell से फाइल साइज मापें।",
            "code": """#include <stdio.h>

typedef struct {
    int id;
    char code[10];
    double balance;
} Account;

int main() {
    Account acc1 = {1001, "SAVINGS", 45000.75};
    FILE *fp = fopen("account.bin", "wb");
    if (!fp) return 1;
    
    fwrite(&acc1, sizeof(Account), 1, fp);
    fclose(fp);
    
    // Calculate file size using fseek and ftell
    fp = fopen("account.bin", "rb");
    if (!fp) return 1;
    
    fseek(fp, 0, SEEK_END);
    long size = ftell(fp);
    printf("Binary file size on disk: %ld bytes (sizeof Account is %zu)\\n", size, sizeof(Account));
    
    // Read record back
    rewind(fp);
    Account loaded;
    fread(&loaded, sizeof(Account), 1, fp);
    printf("Loaded Account -> ID: %d | Code: %s | Balance: %.2f\\n", loaded.id, loaded.code, loaded.balance);
    
    fclose(fp);
    return 0;
}""",
            "expectedOutput": """Binary file size on disk: 32 bytes (sizeof Account is 32)
Loaded Account -> ID: 1001 | Code: SAVINGS | Balance: 45000.75""",
            "lineByLineExplanation": [
                {"line": "fwrite(&acc1, sizeof(Account), 1, fp);", "noteEn": "Writes whole struct memory directly to disk in single binary block.", "noteHi": "पूरे स्ट्रक्चर को एक ही ब्लॉक में सीधे बाइनरी रूप में डिस्क पर लिखता है।"},
                {"line": "fseek(fp, 0, SEEK_END); ftell(fp);", "noteEn": "Seeks to EOF and measures total file byte length accurately.", "noteHi": "फाइल के अंत में जाकर कुल बाइट्स की संख्या मापता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["Always check fopen() for NULL return before accessing.", "Mode 'w' truncates existing files to 0 bytes.", "fclose() flushes memory buffers and frees OS file descriptors.", "Use binary modes ('rb', 'wb') for structures and raw bytes."],
        "hi": ["फाइल पर काम करने से पहले हमेशा fopen() के NULL होने की जांच करें।", "'w' मोड पहले से मौजूद फाइल के डेटा को पूरी तरह मिटा देता है।", "fclose() बफर को डिस्क पर फ्लश करता है और फाइल हैंडल मुक्त करता है।", "स्ट्रक्चर्स और बाइनरी डेटा के लिए हमेशा 'rb' और 'wb' मोड का उपयोग करें।"]
    },
    "commonPitfalls": {
        "en": ["Using while(!feof(fp)) which processes the last record twice.", "Forgetting to fclose() causing file descriptor leaks and unwritten buffers.", "Opening in 'w' mode by mistake and accidentally erasing critical data."],
        "hi": ["while(!feof(fp)) का उपयोग करना जिससे अंतिम रिकॉर्ड दो बार प्रोसेस हो जाता है।", "fclose() करना भूल जाना जिससे फाइल डिस्क्रिप्टर लीक होते हैं और डेटा अधूरा रह जाता है।", "गलती से 'w' मोड खोलकर जरूरी डेटा को नष्ट कर देना।"]
    }
}
register_topic(t13)
print("Topics 9-13 registered successfully.")
'''

with open("topics_t9_t13.py", "w", encoding="utf-8") as f:
    f.write(content)
print("Successfully generated topics_t9_t13.py")
