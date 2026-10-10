#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder for Topics 5 to 8 with comprehensive, textbook-grade theory (850+ words in both English and Hindi).
Topics:
5. variable (Variables, Scope, Storage Classes)
6. input-output (Input / Output: printf, scanf, Streams, Buffering)
7. operator (Operators, Bitwise, Precedence, Short-Circuit, Conversions)
8. control-statement (Branching, Looping, Jump Tables, Nested Controls)
"""

content = '''# Topics 5 to 8: Variable, Input Output, Operator, Control Statement
from topics_master import register_topic

# ==============================================================================
# TOPIC 5: Variables, Scope & Storage Classes (वेरिएबल्स और स्टोरेज क्लासेस)
# ==============================================================================
t5 = {
    "id": "variable",
    "order": 5,
    "title": "Variables, Identifiers & Storage Classes",
    "titleHindi": "वेरिएबल्स, पहचानकर्ता और स्टोरेज क्लासेस (Variable)",
    "category": "Basics",
    "summary": "Complete architectural exploration of C variables: Declaration, definition, initialization, lvalue vs rvalue, identifier naming rules, scopes (block, function, file), lifetimes, and the four C storage classes: auto, register, static, and extern.",
    "summaryHindi": "C भाषा में वेरिएबल्स का आर्किटेक्चरल अध्ययन: घोषणा, परिभाषा, lvalue बनाम rvalue, नामकरण के नियम, स्कोप और लाइफटाइम, तथा चार प्रमुख स्टोरेज क्लासेस: auto, register, static, और extern का गहन विवरण।",
    "readTimeMinutes": 19,
    "explanationEn": """1. WHAT IS A VARIABLE IN COMPUTER ARCHITECTURE?
In low-level systems programming and C architecture, a Variable is a named, symbolic abstraction representing a specific physical location in Random Access Memory (RAM). When a programmer declares a variable such as 'int age = 21;', the compiler and OS memory allocator perform several coordinated actions:
1. Symbol Table Binding: The identifier 'age' is recorded in the compiler symbol table mapped to a relative stack frame offset or data segment address.
2. Memory Allocation: A contiguous block of physical RAM (typically 4 bytes on 32-bit and 64-bit x86/ARM architectures) is reserved.
3. Value Encoding: The binary integer representation of 21 (00000000 00000000 00000000 00010101) is copied directly into those reserved bytes.
Without variables, programmers would be forced to write raw machine memory addresses (e.g., storing data at hex location 0x7ffd98b2c4e0), which is humanly impossible to manage across modern dynamic virtual memory operating systems.

2. DECLARATION VERSUS DEFINITION OF A VARIABLE:
One of the most essential distinctions in systems engineering is the difference between declaring and defining a variable:
- A Declaration informs the compiler about the identifier's name and data type, but does NOT allocate physical storage bytes in memory. It asserts: "A variable with this signature exists somewhere in this application." (Example: extern int globalCounter;).
- A Definition informs the compiler of the variable's type and name, AND immediately allocates physical memory space in RAM. Every definition is implicitly a declaration, but not all declarations are definitions. (Example: int globalCounter = 0;).
- Initialization is the optional process of assigning an initial, known value to the variable at the exact moment of its memory definition. If a local variable is defined without initialization, it contains whatever residual electrical charges existed at that RAM location, commonly termed "garbage data".

3. RULES FOR CONSTRUCTING C IDENTIFIERS:
Identifiers are user-defined names given to variables, functions, structures, and arrays. The ISO C standard mandates strict lexical rules:
1. Allowed Characters: Only uppercase English letters (A-Z), lowercase English letters (a-z), numeric digits (0-9), and the underscore character (_) are permitted.
2. Initial Character Restriction: The first character MUST be a letter or an underscore. An identifier can NEVER begin with a digit (e.g., '1stRank' is illegal syntax, whereas 'rank1' or '_rank1' are legal).
3. Keyword Exclusivity: An identifier cannot be identical to any of the 32 reserved C language keywords (such as int, return, for, if, switch, volatile).
4. Case Sensitivity: C is strictly case-sensitive. The identifiers 'totalScore', 'TotalScore', and 'TOTALSCORE' reference three entirely distinct memory locations.
5. Special Characters Prohibited: Spaces, hyphens, and punctuation marks (such as $, @, #, %, &) are illegal inside variable names.

4. SCOPE, VISIBILITY, AND LIFETIME (DURATION):
Every variable in C possesses two distinct architectural dimensions: Scope and Lifetime.
- Scope (Visibility): The syntactic region of source code where the variable's identifier can be legally referenced.
  - Block Scope (Local Scope): Variables declared inside curly braces { ... } are visible exclusively within that block.
  - Function Scope: Labels utilized by goto statements are visible anywhere throughout the enclosing function body.
  - File Scope (Global Scope): Variables declared outside of all functions (at the file top level) are visible from their point of declaration down to the end of the compilation unit.
- Lifetime (Storage Duration): The duration of execution time during which the allocated physical memory remains reserved and valid for that variable.
  - Automatic Duration: Memory is allocated upon entering the enclosing block and destroyed immediately upon exiting the block (stack memory).
  - Static Duration: Memory is allocated before main() begins execution and persists throughout the entire program lifespan until termination (data segment / BSS segment).
  - Dynamic Duration: Memory allocated explicitly by programmer code via malloc() on the heap, persisting until free() is called.

5. THE FOUR C STORAGE CLASSES:
Storage classes define four critical properties of a variable: its storage location (RAM vs CPU register), initial default value, scope, and lifetime.
1. 'auto' (Automatic):
   - Location: RAM Call Stack.
   - Default Value: Indeterminate garbage value.
   - Scope: Local to the enclosing block.
   - Lifetime: Exists only while the block is executing.
   - Usage: Every local variable is 'auto' by default, making the explicit 'auto' keyword virtually redundant in C.
2. 'register':
   - Location: CPU Registers (or RAM if CPU registers are unavailable).
   - Default Value: Indeterminate garbage value.
   - Purpose: Requests the compiler to store high-frequency loop counters or variables directly inside ultra-fast CPU registers rather than system RAM.
   - Critical Architectural Rule: You CANNOT apply the address-of operator '&' to a register variable (e.g., &regVar is a compile error) because CPU registers do not have memory bus RAM addresses!
3. 'static':
   - Location: Static Data Segment (BSS if uninitialized, Data segment if initialized).
   - Default Value: Automatically initialized to zero (or NULL for pointers).
   - Scope: Remains local to its declaring block or static to the declaring file.
   - Lifetime: Persists throughout the entire life of the program!
   - Magic Behavior: A static local variable retains its value between multiple function invocations. It is initialized only once during program startup.
4. 'extern' (External):
   - Location: Global Data Segment.
   - Default Value: Zero.
   - Scope: Global across multiple separate C source files (compilation units).
   - Purpose: Enables sharing of a single global variable across multi-file software projects without duplicating memory definitions.""",
    "explanationHi": """१. कंप्यूटर आर्किटेक्चर में वेरिएबल (Variable) क्या है?
कंप्यूटर की निम्न-स्तरीय प्रणाली और C भाषा की संरचना में, एक 'वेरिएबल' (Variable या चर) कंप्यूटर की मुख्य मेमोरी (RAM) के एक निश्चित भौतिक स्थान को दिया गया मानव-पठनीय प्रतीकात्मक नाम होता है। जब कोई प्रोग्रामर 'int age = 21;' लिखता है, तो कंपाइलर और ऑपरेटिंग सिस्टम कई महत्वपूर्ण कार्य करते हैं:
१. सिंबल टेबल मैपिंग: कंपाइलर अपनी सिंबल टेबल में 'age' नाम को स्टैक या डेटा सेगमेंट के एक विशिष्ट मेमोरी एड्रेस के साथ जोड़ लेता है।
२. मेमोरी आवंटन: रैम (RAM) के अंदर ठीक 4 बाइट्स (32-बिट और 64-बिट सिस्टम पर) की जगह इस वेरिएबल के लिए सुरक्षित कर ली जाती है।
३. बाइनरी एनकोडिंग: संख्या 21 का बाइनरी रूप (00000000 00000000 00000000 00010101) सीधे उन 4 बाइट्स में लिख दिया जाता है।
यदि वेरिएबल्स की सुविधा न होती, तो प्रोग्रामर को हर डेटा को हेक्साडेसिमल मेमोरी पते (जैसे 0x7ffd98b2c4e0) पर सीधे लिखना पड़ता, जो आधुनिक ऑपरेटिंग सिस्टम में असंभव कार्य है।

२. वेरिएबल डिक्लेरेशन और डेफिनिशन में मौलिक अंतर:
C प्रोग्रामिंग में 'Declaration' और 'Definition' के अंतर को समझना अत्यंत आवश्यक है:
- डिक्लेरेशन (Declaration): यह कंपाइलर को केवल वेरिएबल के नाम और उसके डेटा टाइप की सूचना देता है, परंतु रैम में कोई भौतिक मेमोरी आवंटित नहीं करता। इसका अर्थ है: "यह वेरिएबल कहीं मौजूद है।" (जैसे extern int total;)।
- डेफिनिशन (Definition): यह कंपाइलर को वेरिएबल का नाम और प्रकार बताने के साथ-साथ रैम में उसके लिए वास्तविक मेमोरी स्पेस भी आरक्षित करता है। (जैसे int total = 0;)।
- इनिशियलाइजेशन (Initialization): मेमोरी आरक्षित करते समय ही वेरिएबल को उसका पहला प्रारंभिक मान देना इनिशियलाइजेशन कहलाता है। यदि किसी लोकल वेरिएबल को मान दिए बिना छोड़ दिया जाए, तो उसमें पुराना कचरा मान (Garbage Value) मौजूद रहता है।

३. आइडेंटिफायर्स (Identifiers) के नामकरण के कड़े नियम:
वेरिएबल्स, फंक्शन्स और ऐरे के नाम को आइडेंटिफायर कहा जाता है। C मानक के अनुसार इसके कड़े नियम हैं:
१. मान्य वर्ण: केवल अंग्रेजी के बड़े अक्षर (A-Z), छोटे अक्षर (a-z), अंक (0-9) और अंडरस्कोर (_) का ही उपयोग किया जा सकता है।
२. पहला अक्षर: वेरिएबल का पहला अक्षर हमेशा एक वर्ण (Letter) या अंडरस्कोर (_) ही होना चाहिए। यह कभी भी किसी अंक से शुरू नहीं हो सकता (जैसे 1value अमान्य है, जबकि value1 या _value मान्य है)।
३. कीवर्ड्स पर रोक: C भाषा के 32 सुरक्षित शब्दों (जैसे int, float, for, if, switch, return) को वेरिएबल का नाम नहीं बनाया जा सकता।
४. केस संवेदनशीलता (Case Sensitivity): C भाषा छोटे और बड़े अक्षरों में भेद करती है। 'score', 'Score' और 'SCORE' तीन बिल्कुल अलग वेरिएबल्स माने जाएंगे।
५. विशेष चिन्ह वर्जित: स्पेस, हाइफन या अन्य चिन्ह (जैसे @, $, #) वेरिएबल के नाम में पूरी तरह वर्जित हैं।

४. स्कोप (Scope), विजिबिलिटी और लाइफटाइम (Lifetime):
C भाषा में हर वेरिएबल के दो प्रमुख आयाम होते हैं:
- स्कोप (Scope): प्रोग्राम का वह क्षेत्र जहाँ वेरिएबल का नाम मान्य होता है और उसका उपयोग किया जा सकता है।
  - ब्लॉक स्कोप (Local): घुंघराले कोष्ठक { ... } के अंदर बने वेरिएबल्स केवल उसी ब्लॉक में दिखाई देते हैं।
  - फाइल स्कोप (Global): सभी फंक्शन्स के बाहर फाइल के शीर्ष पर बने वेरिएबल्स पूरी फाइल में कहीं भी पढ़े जा सकते हैं।
- लाइफटाइम (Lifetime): वह समय सीमा जब तक वेरिएबल को आवंटित की गई मेमोरी रैम में सुरक्षित और जीवित रहती है।
  - ऑटोमैटिक लाइफटाइम: ब्लॉक शुरू होने पर मेमोरी मिलती है और ब्लॉक खत्म होते ही मेमोरी नष्ट हो जाती है।
  - स्टेटिक लाइफटाइम: प्रोग्राम शुरू होते ही मेमोरी मिलती है और प्रोग्राम बंद होने तक बनी रहती है।

५. C की चार प्रमुख स्टोरेज क्लासेस (Storage Classes):
स्टोरेज क्लास यह तय करती है कि वेरिएबल कहाँ स्टोर होगा, उसका प्रारंभिक मान क्या होगा, उसका स्कोप क्या होगा और वह कब तक जीवित रहेगा:
१. 'auto': यह सभी लोकल वेरिएबल्स की डिफ़ॉल्ट क्लास है। यह स्टैक मेमोरी पर बनती है और इसमें गारबेज मान होता है।
२. 'register': यह सीपीयू से अनुरोध करती है कि वेरिएबल को रैम के बजाय सीधे सीपीयू के अति-तीव्र रजिस्टर्स में रखा जाए। इसके साथ '&' ऑपरेटर का प्रयोग नहीं किया जा सकता क्योंकि सीपीयू रजिस्टर का कोई रैम एड्रेस नहीं होता।
३. 'static': यह डेटा सेगमेंट में स्टोर होती है। इसका प्रारंभिक मान स्वतः शून्य (0) होता है। सबसे महत्वपूर्ण बात: यह फंक्शन समाप्त होने के बाद भी अपना पुराना मान याद रखती है!
४. 'extern': यह ग्लोबल वेरिएबल को कई अलग-अलग C फाइलों के बीच साझा करने की सुविधा देती है।

६. मेमोरी लेआउट और डेटा सेगमेंट्स (Memory Segments):
कंप्यूटर में जब C प्रोग्राम लोड होता है, तो उसकी मेमोरी 5 प्रमुख भागों में विभाजित होती है:
१. टेक्स्ट सेगमेंट (Text Segment): इसमें कंपाइल किया गया मशीन कोड सुरक्षित रहता है जो केवल पढ़ने योग्य (Read-only) होता है।
२. इनिशियलाइज्ड डेटा सेगमेंट (.data): इसमें वे ग्लोबल और स्टेटिक वेरिएबल्स रहते हैं जिन्हें प्रोग्रामर ने शुरू में ही मान दिया हो (जैसे int counter = 10;)।
३. अनइनिशियलाइज्ड डेटा सेगमेंट (.bss - Block Started by Symbol): इसमें वे ग्लोबल और स्टेटिक वेरिएबल्स आते हैं जिन्हें कोई मान नहीं दिया गया हो। ऑपरेटिंग सिस्टम प्रोग्राम शुरू होने से पहले इन्हें स्वतः शून्य (0) से भर देता है।
४. हीप (Heap): यह गतिशील मेमोरी (Dynamic Memory) के लिए आरक्षित होता है जहाँ malloc() और calloc() से रनटाइम पर मेमोरी मांगी जाती है।
५. स्टैक (Stack): इसमें फंक्शन कॉल्स, लोकल (auto) वेरिएबल्स और रिटर्न पते स्टोर होते हैं। यह LIFO (लास्ट-इन-फर्स्ट-आउट) सिद्धांत पर अत्यंत तीव्र गति से काम करता है। जब फंक्शन पूरा होता है, तो उसका स्टैक फ्रेम अपने आप नष्ट हो जाता है।""",
    "realLifeAnalogy": {
        "en": "Think of a variable as a labeled storage box in an Amazon warehouse. The data type defines the size of the box (e.g., shoe box vs refrigerator crate). The variable name is the barcode label. A local 'auto' variable is like a sticky note on your personal desk that gets thrown in the trash at the end of the day. A 'static' variable is like an iron safe in the company hallway: even when everyone goes home for the night, whatever documents were left inside remain completely intact tomorrow!",
        "hi": "वेरिएबल की तुलना एक लेबल लगे डिब्बे से करें। डेटा टाइप डिब्बे का आकार है। वेरिएबल का नाम डिब्बे पर लगा लेबल है। लोकल 'auto' वेरिएबल आपकी मेज पर रखे उस रफ कागज जैसा है जिसे शाम को फेंक दिया जाता है। जबकि 'static' वेरिएबल कार्यालय की मजबूत तिजोरी जैसा है: रात को सब घर चले जाएँ तब भी तिजोरी के अंदर रखा सामान अगली सुबह बिल्कुल वैसा ही सुरक्षित मिलता है!"
    },
    "codeExamples": [
        {
            "title": "Static vs Auto Variable Lifetime Demonstration",
            "titleHindi": "स्टेटिक बनाम ऑटो वेरिएबल के लाइफटाइम का व्यावहारिक प्रदर्शन",
            "code": """#include <stdio.h>

void counterDemonstration() {
    auto int autoCount = 1;     // Recreated on stack every invocation
    static int staticCount = 1; // Retains value in static segment across calls
    
    printf("autoCount: %d | staticCount: %d\\n", autoCount, staticCount);
    
    autoCount++;
    staticCount++;
}

int main() {
    printf("--- Function Call 1 ---\\n");
    counterDemonstration();
    
    printf("--- Function Call 2 ---\\n");
    counterDemonstration();
    
    printf("--- Function Call 3 ---\\n");
    counterDemonstration();
    
    return 0;
}""",
            "output": """--- Function Call 1 ---
autoCount: 1 | staticCount: 1
--- Function Call 2 ---
autoCount: 1 | staticCount: 2
--- Function Call 3 ---
autoCount: 1 | staticCount: 3""",
            "explanation": "autoCount is destroyed and reinitialized to 1 on every invocation. staticCount preserves its incremented state across all calls.",
            "explanationHindi": "autoCount हर बार नष्ट होकर दोबारा 1 बन जाता है, जबकि staticCount अपना पुराना मान सुरक्षित रखकर 1, 2, 3 बढ़ता जाता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-var-1",
            "title": "Register Variable Constraints and Speed",
            "titleHindi": "रजिस्टर वेरिएबल की सीमाएं और विशेषता",
            "objective": "Understand CPU register variable limitations and prohibition of address operator &.",
            "objectiveHindi": "सीपीयू रजिस्टर वेरिएबल पर & ऑपरेटर के प्रतिबंध को समझें।",
            "code": """#include <stdio.h>

int main() {
    register int fastCounter = 0;
    
    for (fastCounter = 0; fastCounter < 5; fastCounter++) {
        printf("Loop tick: %d\\n", fastCounter);
    }
    
    // Note: Attempting printf("%p", &fastCounter) would trigger:
    // error: address of register variable 'fastCounter' requested!
    return 0;
}""",
            "expectedOutput": """Loop tick: 0
Loop tick: 1
Loop tick: 2
Loop tick: 3
Loop tick: 4""",
            "lineByLineExplanation": [
                {"line": "register int fastCounter = 0;", "noteEn": "Requests CPU register storage for zero-latency memory access.", "noteHi": "सीपीयू से अनुरोध करता है कि वेरिएबल सीधे रजिस्टर में स्टोर हो।"},
                {"line": "for (fastCounter = 0; ...)", "noteEn": "Executes loop without RAM bus memory latency.", "noteHi": "बिना रैम की देरी के तीव्र गति से लूप चलाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["Declaration introduces type/name; definition allocates RAM bytes.", "Variables cannot begin with digits or use reserved keywords.", "static variables default to 0 and persist across function calls.", "register variables cannot have their memory addresses (&) taken."],
        "hi": ["डिक्लेरेशन नाम बताता है; डेफिनिशन रैम में बाइट्स आवंटित करती है।", "वेरिएबल का नाम अंक से शुरू नहीं हो सकता और कीवर्ड नहीं हो सकता।", "static वेरिएबल का प्रारंभिक मान 0 होता है और यह फंक्शन कॉल के बीच मान याद रखता है।", "register वेरिएबल का एड्रेस (&) नहीं लिया जा सकता।"]
    },
    "commonPitfalls": {
        "en": ["Using uninitialized local variables containing random garbage values.", "Trying to take address of register variable (&regVar causes compiler error).", "Accidentally redeclaring global variable locally, shadowing outer scope."],
        "hi": ["बिना इनिशियलाइज किए लोकल वेरिएबल का उपयोग करना जिसमें कचरा मान होता है।", "रजिस्टर वेरिएबल का एड्रेस (&) लेने का प्रयास करना।", "ग्लोबल वेरिएबल के नाम से ही अंदर नया लोकल वेरिएबल बनाकर बाहरी वेरिएबल को छिपा देना।"]
    }
}
register_topic(t5)

# ==============================================================================
# TOPIC 6: Input & Output Operations (printf & scanf)
# ==============================================================================
t6 = {
    "id": "input-output",
    "order": 6,
    "title": "Standard Input & Output Operations (printf & scanf)",
    "titleHindi": "मानक इनपुट और आउटपुट ऑपरेशन्स (Input / Output)",
    "category": "Basics",
    "summary": "Deep architectural analysis of standard I/O in C: The stream abstraction (stdin, stdout, stderr), stream buffering mechanics (unbuffered, line-buffered, block-buffered), printf formatted output with format specifiers, field widths, precision, and return codes, scanf input parsing with the & address operator, scansets, buffer overflow hazards, and safe stream flushing.",
    "summaryHindi": "C भाषा में मानक I/O का आर्किटेक्चरल अध्ययन: स्ट्रीम्स (stdin, stdout, stderr), स्ट्रीम बफरिंग के प्रकार, printf द्वारा फॉर्मेटेड आउटपुट, फॉर्मेट विनिर्देशक, फील्ड विड्थ, प्रेसिजन, scanf द्वारा इनपुट पार्सिंग, & ऑपरेटर की अनिवार्यता, स्कैन्सेट्स, बफर ओवरफ्लो के खतरे और सुरक्षित इनपुट बफर हैंडलिंग।",
    "readTimeMinutes": 21,
    "explanationEn": """1. THE STREAM ABSTRACTION & HARDWARE I/O IN C:
In the C runtime standard library (<stdio.h>), input and output operations are abstracted through the unified concept of Streams. Rather than forcing developers to interface directly with keyboard interrupt controllers, video graphics display memory, or hard drive disk sectors, C treats all peripheral communication as a continuous, unidirectional sequence of bytes called a Stream.
When a C application launches, the runtime environment and operating system automatically initialize three standard file streams:
1. stdin (Standard Input - file descriptor 0): Connected by default to the user's interactive keyboard input stream.
2. stdout (Standard Output - file descriptor 1): Connected by default to the display console terminal screen.
3. stderr (Standard Error - file descriptor 2): Connected directly to the display terminal screen for critical diagnostic error output.

2. STREAM BUFFERING MECHANISMS (FULLY, LINE, AND UNBUFFERED):
To optimize CPU throughput and minimize expensive hardware system calls to the operating system kernel, C streams employ three distinct buffering strategies:
- Line-Buffered (Typical of stdout to interactive terminals): Characters written to the stream are accumulated in an internal RAM memory buffer and flushed (sent to the physical screen) only when a newline character ('\\n') is encountered, when the internal buffer fills completely, or when input is requested from stdin.
- Block-Buffered / Fully Buffered (Typical of file I/O): Data is retained until a large block (typically 4096 or 8192 bytes) fills up before triggering a physical disk write.
- Unbuffered (Typical of stderr): Every single byte written is dispatched immediately to the destination hardware with zero intermediate buffering, ensuring diagnostic messages appear even if the program crashes in the very next instruction!
Developers can explicitly control buffering behavior via setvbuf() or force immediate buffer flushing using fflush(stdout).

3. FORMATTED OUTPUT WITH PRINTF():
The standard output function printf() stands for "Print Formatted". It transforms internal binary data formats into human-readable ASCII/UTF-8 character sequences based on a control format string.
Function Prototype:
```c
int printf(const char *format, ...);
```
- Return Value: printf() returns an integer representing the exact number of characters successfully written to the output stream. If an output error occurs, it returns a negative integer.
- The Anatomy of a Format Specifier (%[flags][width][.precision][length]specifier):
  1. Flags:
     - Minus (-): Left-align the output within the designated field width.
     - Plus (+): Explicitly print a sign (+ or -) for signed numeric values.
     - Space: Print a leading space if the number is positive.
     - Zero (0): Pad numeric output with leading zeroes instead of default spaces.
     - Hash (#): For hex (%#x), prefixes '0x'; for octal (%#o), prefixes '0'.
  2. Field Width: Specifies the minimum number of character columns reserved for output. If the actual value occupies fewer columns, it is padded with spaces or zeroes.
  3. Precision (.):
     - For integers: Specifies the minimum number of digits to appear.
     - For floating-point: Specifies the exact number of digits to print after the decimal point (rounded mathematically).
     - For strings: Specifies the maximum number of characters to print.
  4. Length Modifiers:
     - %hhd / %hd: Signed char / short integer.
     - %ld / %lld: Long int / Long Long 64-bit integer.
     - %zu: size_t (standard type returned by sizeof operator).
     - %Lf: Long double high-precision floating point.
  5. Core Type Specifiers:
     - %d or %i: Signed decimal 32-bit integer.
     - %u: Unsigned decimal integer.
     - %c: Single character.
     - %s: Null-terminated character string.
     - %f: Standard float / double in decimal notation.
     - %e / %E: Scientific exponential notation (e.g., 1.234e+02).
     - %x / %X: Hexadecimal integer (lowercase / uppercase).
     - %p: Void pointer memory address formatted in hexadecimal.
     - %%: Literal percent character.

4. FORMATTED INPUT WITH SCANF():
The companion input function scanf() stands for "Scan Formatted". It reads byte characters from stdin, parses them according to specified format conversion specifiers, and writes the converted binary values directly into designated memory locations.
Function Prototype:
```c
int scanf(const char *format, ...);
```
- The Critical Mandate of the Address-of Operator '&':
C functions pass parameters strictly by value. When you pass an argument to a function, the function receives an isolated copy of that value on its call stack. If you wrote 'scanf("%d", num);', scanf would receive a copy of num's contents; any modification made by scanf would affect only that stack copy, leaving the original variable unchanged. By passing '&num' (the memory address), scanf receives a direct pointer to the variable's physical RAM location and writes the parsed input directly into the variable's memory slot!
- Why Strings and Arrays Omit the '&' Operator:
When reading a string into a character array (e.g., char name[50]; scanf("%s", name);), the identifier 'name' automatically decays into a pointer pointing to its base address &name[0]. Adding an extra '&' would pass a pointer to the entire array type, which is unnecessary and syntactically sloppy.
- Return Value of scanf():
scanf() returns the total count of input items successfully scanned, converted, and stored. If a user provides text where an integer was requested (e.g., typing 'apple' for %d), conversion fails, the input character remains stuck in the stream buffer, and scanf returns 0. If end-of-file is encountered before any conversion, EOF (-1) is returned.

5. INPUT BUFFER TRAPS, SCANSETS, AND SAFER ALTERNATIVES:
- The Infamous Trailing Newline Bug:
When reading numbers with scanf("%d", &val), the user types digits and presses the Enter key. The %d specifier reads the numeric digits but leaves the newline character '\\n' sitting in the stdin buffer. If your program immediately attempts to read a character with scanf("%c", &ch), the %c specifier immediately swallows that leftover '\\n' without pausing for user input!
Solution: Use a leading whitespace in the format string: scanf(" %c", &ch); which instructs scanf to skip any preceding whitespace characters including '\\n'.
- Scansets (%[...]):
scanf allows regex-like scanset parsing. For instance, scanf("%[^\n]", str); reads all characters up to the next newline, allowing string inputs that contain spaces!
- Buffer Overflow Prevention:
Writing 'scanf("%s", buffer);' into a 50-byte array allows an attacker to enter 1000 characters, causing a disastrous buffer overflow crash. Always specify maximum width: 'scanf("%49s", buffer);'.
- gets() Deprecation vs fgets() Standard:
The historic gets() function was permanently deleted from the ISO C standard (C11) because it lacked any buffer limit parameter. Always use fgets():
```c
fgets(str, sizeof(str), stdin);
```
- Safe Input Buffer Clearing Idiom:
Never use fflush(stdin) because the C standard defines fflush behavior only on output streams; its effect on stdin is undefined behavior. The universal standard portable idiom is:
```c
int c;
while ((c = getchar()) != '\\n' && c != EOF);
```""",
    "explanationHi": """१. C भाषा में स्ट्रीम अमूर्तीकरण (Stream Abstraction) और हार्डवेयर I/O:
C भाषा के मानक इनपुट/आउटपुट पुस्तकालय (<stdio.h>) में कंप्यूटर के हार्डवेयर उपकरणों (कीबोर्ड, मॉनिटर, हार्ड डिस्क) से संचार करने के लिए 'स्ट्रीम्स' (Streams) की अवधारणा का उपयोग किया जाता है। प्रोग्रामर को सीधे कीबोर्ड चिपसेट या ग्राफिक्स कार्ड के मेमोरी पतों से संवाद करने की आवश्यकता नहीं होती; C सभी डेटा आदान-प्रदान को बाइट्स की एक सतत श्रृंखला (Stream) के रूप में प्रबंधित करता है।
जब भी कोई C प्रोग्राम निष्पादित होना प्रारंभ होता है, ऑपरेटिंग सिस्टम स्वतः तीन मानक स्ट्रीम्स स्थापित कर देता है:
१. stdin (Standard Input): यह डिफ़ॉल्ट रूप से उपयोगकर्ता के कीबोर्ड से जुड़ा होता है।
२. stdout (Standard Output): यह सामान्य आउटपुट प्रदर्शित करने के लिए मॉनिटर टर्मिनल से जुड़ा होता है।
३. stderr (Standard Error): यह गंभीर एरर और चेतावनी संदेशों को तुरंत स्क्रीन पर भेजने के लिए समर्पित होता है।

२. स्ट्रीम बफरिंग के प्रकार (Buffering Mechanics):
कंप्यूटर के सीपीयू की गति अत्यंत तीव्र होती है, जबकि कीबोर्ड और मॉनिटर अत्यंत धीमे होते हैं। प्रदर्शन को अनुकूलित करने के लिए C स्ट्रीम्स बफरिंग का उपयोग करती हैं:
- लाइन-बफर्ड (Line-Buffered): टर्मिनल स्क्रीन (stdout) पर आउटपुट तुरंत नहीं जाता, बल्कि रैम के एक आंतरिक बफर में जमा होता रहता है। जैसे ही कोड में न्यूलाइन वर्ण ('\\n') आता है या इनपुट माँगा जाता है, पूरा बफर एक साथ स्क्रीन पर खाली (Flush) कर दिया जाता है।
- ब्लॉक-बफर्ड (Block-Buffered): फाइलों में डेटा लिखते समय जब तक 4096 या 8192 बाइट्स का पूरा ब्लॉक नहीं भर जाता, तब तक डिस्क पर राइट ऑपरेशन नहीं होता।
- अनबफर्ड (Unbuffered): stderr में कोई बफरिंग नहीं होती; एरर संदेश का प्रत्येक बाइट तुरंत स्क्रीन पर भेज दिया जाता है ताकि प्रोग्राम क्रैश होने की स्थिति में भी एरर दिख सके।

३. printf() द्वारा फॉर्मेटेड आउटपुट:
printf का पूरा नाम "Print Formatted" है। यह कंप्यूटर की आंतरिक बाइनरी मेमोरी में रखे डेटा को मनुष्य के पढ़ने योग्य अक्षरों में बदलकर स्क्रीन पर प्रदर्शित करता है।
फंक्शन सिंटैक्स:
```c
int printf(const char *format, ...);
```
- रिटर्न मान: printf() एक पूर्णांक संख्या लौटाता है, जो यह बताती है कि स्क्रीन पर कुल कितने अक्षर (Characters) सफलतापूर्वक प्रिंट किए गए।
- फॉर्मेट विनिर्देशकों (Format Specifiers) की संरचना:
  १. फ्लैग्स (Flags):
     - माइनस (-): डेटा को बाईं ओर अलाइन करता है।
     - प्लस (+): धनात्मक संख्याओं के आगे भी + चिन्ह प्रदर्शित करता है।
     - जीरो (0): खाली स्थानों की जगह आगे शून्य (0) भर देता है (जैसे %05d से 00042 बनेगा)।
  २. फील्ड विड्थ (Width): आउटपुट के लिए न्यूनतम आरक्षित कॉलमों की संख्या (जैसे %10s)।
  ३. प्रेसिजन (.Precision): दशमलव के बाद कितने अंक दिखाने हैं (जैसे %.2f से 19.995 राउंड होकर 20.00 बनेगा)।
  ४. प्रमुख विनिर्देशक:
     - %d / %i: साइन्ड 32-बिट पूर्णांक।
     - %u: अनसाइन्ड पूर्णांक।
     - %c: अकेला कैरेक्टर।
     - %s: नल-टर्मिनेटेड स्ट्रिंग (शब्द या वाक्य)।
     - %f: फ्लोट दशमलव संख्या।
     - %lf: डबल प्रिसिजन फ्लोट।
     - %p: हेक्साडेसिमल मेमोरी एड्रेस (पॉइंटर एड्रेस)।
     - %x / %X: हेक्साडेसिमल संख्या।
     - %zu: sizeof ऑपरेटर द्वारा लौटाया गया size_t प्रकार।
     - %%: प्रतिशत (%) का चिन्ह प्रिंट करने के लिए।

४. scanf() द्वारा फॉर्मेटेड इनपुट और '&' की अनिवार्यता:
scanf का पूरा नाम "Scan Formatted" है। यह कीबोर्ड से टेक्स्ट इनपुट पढ़कर उसे उचित बाइनरी मान में बदलकर प्रोग्राम के वेरिएबल्स में लिखता है।
- '&' (Address-of) ऑपरेटर क्यों अनिवार्य है?
C भाषा में फंक्शन्स को मान केवल कॉपी के रूप में भेजे जाते हैं (Pass by Value)। यदि हम 'scanf("%d", num)' लिखें, तो scanf के पास केवल num के मान की एक अलग नकल जाएगी। scanf उस नकल को बदल भी दे तो मुख्य प्रोग्राम का वेरिएबल नहीं बदलेगा! जब हम '&num' (मेमोरी एड्रेस) भेजते हैं, तो scanf को रैम में उस वेरिएबल के भौतिक स्थान का सीधा पॉइंटर मिल जाता है और वह कीबोर्ड से पढ़ा गया नया मान सीधे उसी पते पर लिख देता है।
- स्ट्रिंग्स में '&' क्यों नहीं लगाते?
जब हम 'scanf("%s", str)' लिखते हैं, जहाँ str एक कैरेक्टर ऐरे है, तो C नियमों के अनुसार ऐरे का नाम स्वतः अपने पहले तत्व के पते (&str[0]) को दर्शाता है। अतः अलग से '&' लगाना अनावश्यक होता है।
- scanf का रिटर्न मान:
scanf यह संख्या लौटाता है कि उसने कितने इनपुट सफलतापूर्वक पढ़े और वेरिएबल्स में असाइन किए। यदि यूजर से संख्या माँगी जाए और वह अक्षर टाइप कर दे, तो मिलान विफल हो जाता है और scanf शून्य (0) लौटाता है।

५. इनपुट बफर की समस्याएं और सुरक्षित कोडिंग:
- न्यूलाइन वर्ण ('\\n') के अटकने की समस्या:
जब आप संख्या इनपुट करके Enter दबाते हैं, तो scanf("%d") संख्या तो पढ़ लेता है लेकिन Enter कुंजी वाला '\\n' कीबोर्ड बफर में ही छोड़ देता है। इसके तुरंत बाद यदि आप 'scanf("%c", &ch)' चलाते हैं, तो वह नया इनपुट लेने के बजाय बफर में पहले से मौजूद उस '\\n' को तुरंत पढ़ लेता है!
समाधान: फॉर्मेट स्ट्रिंग में आगे एक स्पेस जोड़ें: 'scanf(" %c", &ch);'। स्पेस scanf को आदेश देता है कि वह पहले की सभी खाली जगहों और न्यूलाइन को नजरअंदाज करे।
- बफर ओवरफ्लो और fgets():
पुरानी C में उपयोग होने वाला gets() असुरक्षित होने के कारण C11 मानक से हमेशा के लिए हटा दिया गया है। स्ट्रिंग्स के सुरक्षित इनपुट के लिए हमेशा fgets() का उपयोग करें: 'fgets(str, sizeof(str), stdin);'।
- बफर खाली करने का मानक तरीका:
fflush(stdin) का उपयोग गैर-मानक है। मानक तरीका getchar() लूप चलाकर बफर खाली करना है:
```c
int c;
while ((c = getchar()) != '\\n' && c != EOF);
```""",
    "realLifeAnalogy": {
        "en": "Think of printf as an announcement screen at an airport that translates internal flight data into clearly formatted departure boards with aligned flight numbers and gate names. Think of scanf as a passport verification officer: you must provide the physical location (& address) of the traveler's seat so the officer can stamp their specific document directly in place!",
        "hi": "printf की तुलना हवाई अड्डे के सूचना बोर्ड से करें जो उड़ानों के डेटा को सुंदर तालिकाओं में दिखाता है। scanf की तुलना पासपोर्ट अधिकारी से करें: यात्री को अपनी सीट का सटीक पता (& एड्रेस) देना पड़ता है ताकि अधिकारी सीधे उसके मूल दस्तावेज पर मोहर लगा सके!"
    },
    "codeExamples": [
        {
            "title": "Advanced printf Flags and scanf Return Validation",
            "titleHindi": "printf की फॉर्मेटिंग और scanf इनपुट सत्यापन का सी कोड",
            "code": """#include <stdio.h>

int main() {
    int id = 7;
    double price = 24.956;
    char code[] = "PROD";
    
    // Width padding, precision rounding, and sign flags
    printf("Item ID:     [%06d]\\n", id);
    printf("Code:        [%-8s]\\n", code);
    printf("Price:       [%+8.2f]\\n", price);
    
    // Return value demonstration of printf
    int count = printf("Welcome to C Language\\n");
    printf("Previous line output exactly %d characters.\\n", count);
    
    // Input validation with scanf return value
    int age;
    printf("\\nEnter your age: ");
    if (scanf("%d", &age) == 1) {
        printf("Valid input! Age stored: %d\\n", age);
    } else {
        printf("Invalid input! You did not enter a numeric integer.\\n");
    }
    
    return 0;
}""",
            "output": """Item ID:     [000007]
Code:        [PROD    ]
Price:       [  +24.96]
Welcome to C Language
Previous line output exactly 22 characters.

Enter your age: 25
Valid input! Age stored: 25""",
            "explanation": "Demonstrates zero-padding, left justification, forced sign flag, printf return count, and scanf return code verification.",
            "explanationHindi": "जीरो पैडिंग, बाईं ओर अलाइनमेंट, + चिन्ह प्रदर्शन, printf का कैरेक्टर काउंट और scanf रिटर्न कोड से इनपुट सत्यापन दिखाता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-io-1",
            "title": "Safe Multi-Input Reading with Buffer Drainage",
            "titleHindi": "बफर सफाई के साथ सुरक्षित बहु-प्रकार इनपुट",
            "objective": "Read integer, character, and multi-word string safely without input skipping.",
            "objectiveHindi": "बिना बफर स्किपिंग के संख्या, कैरेक्टर और स्ट्रिंग का सुरक्षित इनपुट लें।",
            "code": """#include <stdio.h>

int main() {
    int roll;
    char section;
    char fullName[60];
    
    printf("Enter Roll Number: ");
    scanf("%d", &roll);
    
    // Leading space fixes newline skipping
    printf("Enter Section (A/B/C): ");
    scanf(" %c", &section);
    
    // Drain remaining buffer characters before line reading
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
    
    printf("Enter Full Name: ");
    fgets(fullName, sizeof(fullName), stdin);
    
    printf("\\n--- Verified Student Card ---\\n");
    printf("Roll: %d | Section: %c | Name: %s", roll, section, fullName);
    
    return 0;
}""",
            "expectedOutput": """--- Verified Student Card ---
Roll: 101 | Section: A | Name: Rahul Sharma""",
            "lineByLineExplanation": [
                {"line": "scanf(\\" %c\\", &section);", "noteEn": "Leading whitespace skips leftover newline from preceding integer scan.", "noteHi": "आगे का स्पेस पिछले इनपुट से बची न्यूलाइन को छोड़कर सही अक्षर पढ़ता है।"},
                {"line": "fgets(fullName, sizeof(fullName), stdin);", "noteEn": "Reads full line including spaces safely without buffer overflow.", "noteHi": "बिना बफर ओवरफ्लो के स्पेस सहित पूरा नाम सुरक्षित रूप से पढ़ता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["printf returns character count; scanf returns successfully scanned item count.", "Mandatory '&' in scanf provides RAM variable address.", "Leading space in scanf(\\" %c\\") prevents whitespace/newline skipping.", "Always replace unsafe gets() with fgets()."],
        "hi": ["printf प्रिंट हुए कुल अक्षरों की संख्या और scanf पढ़े गए मानों की संख्या लौटाता है।", "scanf में '&' लगाना अनिवार्य है ताकि मेमोरी का पता मिल सके।", "scanf(\\" %c\\") में आगे का स्पेस न्यूलाइन छूटने की समस्या को हल करता है।", "gets() के स्थान पर हमेशा fgets() का उपयोग करें।"]
    },
    "commonPitfalls": {
        "en": ["Omitting '&' in scanf causes memory segmentation faults.", "Using unsafe gets() causing critical buffer overflow security flaws.", "Using undefined fflush(stdin) instead of standard getchar() loop."],
        "hi": ["scanf में '&' भूल जाना जिससे प्रोग्राम सेग्मेंटेशन फॉल्ट से क्रैश हो जाता है।", "असुरक्षित gets() का उपयोग जिससे बफर ओवरफ्लो होता है।", "fflush(stdin) का उपयोग करना जो C मानक में अपरिभाषित है।"]
    }
}
register_topic(t6)

# ==============================================================================
# TOPIC 7: Operators & Expression Evaluation (ऑपरेटर्स और एक्सप्रेशन्स)
# ==============================================================================
t7 = {
    "id": "operator",
    "order": 7,
    "title": "Operators, Precedence & Expression Evaluation",
    "titleHindi": "ऑपरेटर्स, प्राथमिकता और एक्सप्रेशन्स (Operators)",
    "category": "Basics",
    "summary": "Exhaustive breakdown of C operators: Arithmetic, Relational, Logical with short-circuit evaluation, Bitwise manipulation (shifts, masking, bit toggling), Assignment, Increment/Decrement (++ / --), Conditional Ternary (?:), sizeof, Comma operator, Type promotion rules, Sequence points, and the 15-level Precedence and Associativity hierarchy.",
    "summaryHindi": "C भाषा के ऑपरेटर्स का संपूर्ण वर्गीकरण: अंकगणितीय, रिलेशनल, लॉजिकल (शॉर्ट-सर्किट), बिटवाइज़ मैनिपुलेशन (मास्किंग, शिफ्ट्स), असाइनमेंट, इंक्रीमेंट/डिक्रीमेंट, टर्नरी ऑपरेटर, sizeof, कॉमा ऑपरेटर, टाइप प्रमोशन के नियम, सीक्वेंस पॉइंट्स और 15-स्तरीय ऑपरेटर प्राथमिकता तालिका।",
    "readTimeMinutes": 22,
    "explanationEn": """1. WHAT IS AN OPERATOR, OPERAND, AND EXPRESSION IN C?
In computer programming, an Operator is a designated syntactic symbol that instructs the Central Processing Unit's Arithmetic Logic Unit (ALU) to execute a specific mathematical, logical, relational, or bitwise operation. The data items upon which the operator acts are called Operands. An Expression is any syntactically valid combination of operators, constants, variables, and function calls that evaluates to a single resultant value (e.g., result = (a + b) * 5;).
Operators are classified by arity (the number of operands required):
- Unary Operators: Operate upon a single operand (e.g., ++x, -num, !flag, ~mask, &var, *ptr, sizeof).
- Binary Operators: Require two operands (e.g., a + b, x == y, m && n, p | q).
- Ternary Operators: Take three operands (the conditional operator: condition ? expr1 : expr2).

2. TAXONOMY OF C OPERATORS:
1. Arithmetic Operators:
   - Addition (+) and Subtraction (-)
   - Multiplication (*)
   - Division (/): Performs integer truncation if both operands are integers (17 / 5 yields 3); performs IEEE floating-point division if either operand is a float or double (17.0 / 5 yields 3.4).
   - Modulus (%): Computes the integer remainder after division (17 % 5 yields 2). Crucial Rule: The modulus operator is strictly restricted to integer types in C; applying % to float or double is a compile error!
2. Relational / Comparison Operators:
   Evaluate the relationship between two operands, returning integer 1 for TRUE and integer 0 for FALSE:
   < (less than), > (greater than), <= (less than or equal), >= (greater than or equal), == (equality test), != (inequality test).
3. Logical Operators & Short-Circuit Evaluation:
   - Logical AND (&&): Evaluates to 1 if and only if BOTH operands are non-zero (true).
   - Logical OR (||): Evaluates to 1 if AT LEAST ONE operand is non-zero.
   - Logical NOT (!): Inverts truth value (!1 is 0; !0 is 1).
   - Short-Circuit Guarantee: C mandates strict left-to-right evaluation for logical operators with early termination:
     - In A && B: If A evaluates to 0 (false), operand B is NEVER evaluated, because false AND anything is guaranteed to be false!
     - In A || B: If A evaluates to non-zero (true), operand B is NEVER evaluated, because true OR anything is guaranteed to be true!
     Practical Application: This safely guards against null pointer dereferences and division-by-zero crashes:
     ```c
     if (ptr != NULL && *ptr == 100) { /* Safe! *ptr is never accessed if ptr is NULL */ }
     if (denominator != 0 && (numerator / denominator) > 5) { /* Safe from division crash */ }
     ```
4. Bitwise Operators & Hardware Bitmasking:
   Operate directly on the individual binary bits of integer data types:
   - Bitwise AND (&): Result bit is 1 only if both operand bits are 1. Used for clearing bits and bit testing: (num & (1 << k)) checks if bit k is set.
   - Bitwise OR (|): Result bit is 1 if either operand bit is 1. Used for setting bits: num |= (1 << k) turns bit k ON.
   - Bitwise XOR (^): Result bit is 1 if bits differ. Used for bit toggling: num ^= (1 << k) flips bit k. Also used for in-place swapping without temporary variables: a ^= b; b ^= a; a ^= b;.
   - Bitwise NOT (~): Inverts every bit (one's complement: ~x = -(x + 1)).
   - Left Shift (<<): Shifts bits left by N positions, shifting in zeroes from the right. Multiplying unsigned integer by 2^N (x << 1 multiplies by 2).
   - Right Shift (>>): Shifts bits right by N positions. For unsigned numbers, shifts in zeroes; for signed numbers, behavior depends on the CPU architecture (arithmetic shift preserves sign bit).
5. Increment and Decrement Operators (++ and --):
   - Pre-increment (++x): Increments variable by 1 FIRST, then yields the newly incremented value in the enclosing expression.
   - Post-increment (x++): Yields the current value of the variable FIRST in the expression, then increments the variable in memory afterwards.
6. Assignment and Compound Assignment Operators:
   Simple assignment (=) evaluates the right-hand expression and stores it into the left-hand modifiable L-value.
   Compound operators perform the operation in-place: +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=.
7. Special Operators:
   - Conditional / Ternary Operator (? :): Compact inline decision-making: max = (a > b) ? a : b;.
   - sizeof: Compile-time operator returning size in bytes (type size_t). Expressions placed inside sizeof are NOT evaluated at runtime! (e.g., sizeof(x++) does NOT increment x!).
   - Comma Operator (,): Evaluates sub-expressions left-to-right sequentially and discards intermediate results, returning the value of the rightmost sub-expression: x = (a = 2, b = 4, a + b); sets x to 6.

3. USUAL ARITHMETIC CONVERSIONS & INTEGER PROMOTION:
When an operator acts on operands of different types, C automatically converts them to a common type following strict promotion rules:
1. Integer Promotion: All types smaller than int (such as char, signed char, unsigned char, short, unsigned short) are automatically promoted to int (or unsigned int) before any arithmetic operation.
2. Conversion Hierarchy: The lower type is promoted to the higher type without data loss:
   int -> unsigned int -> long -> unsigned long -> long long -> float -> double -> long double.

4. SEQUENCE POINTS & UNDEFINED BEHAVIOR:
A Sequence Point is a designated point in program execution where all side effects of previous evaluations are guaranteed to be complete. In C, modifying the same variable more than once between consecutive sequence points (e.g., i = i++; or arr[i] = i++; or func(i++, i++)) invokes Undefined Behavior (UB). The compiler is free to generate any arbitrary machine code!

5. OPERATOR PRECEDENCE & ASSOCIATIVITY TABLE:
When multiple operators appear together, Precedence determines which operator binds first, while Associativity dictates the evaluation direction for operators having equal precedence:
1. Primary / Postfix: () [] -> . ++ -- (Left-to-Right)
2. Unary: ++ -- + - ! ~ * & (type) sizeof (Right-to-Left)
3. Multiplicative: * / % (Left-to-Right)
4. Additive: + - (Left-to-Right)
5. Bitwise Shifts: << >> (Left-to-Right)
6. Relational: < <= > >= (Left-to-Right)
7. Equality: == != (Left-to-Right)
8. Bitwise AND: & (Left-to-Right)
9. Bitwise XOR: ^ (Left-to-Right)
10. Bitwise OR: | (Left-to-Right)
11. Logical AND: && (Left-to-Right)
12. Logical OR: || (Left-to-Right)
13. Conditional Ternary: ? : (Right-to-Left)
14. Assignment: = += -= *= /= %= &= |= ^= <<= >>= (Right-to-Left)
15. Comma: , (Left-to-Right)""",
    "explanationHi": """१. C भाषा में ऑपरेटर, ऑपरेंड और एक्सप्रेशन क्या हैं?
कंप्यूटर प्रोग्रामिंग में 'ऑपरेटर' (Operator) एक ऐसा विशेष प्रतीकात्मक चिन्ह होता है जो कंप्यूटर के प्रोसेसर (ALU) को एक विशिष्ट गणितीय, तार्किक, तुलनात्मक या बिटवाइज़ क्रिया करने का आदेश देता है। जिन डेटा मानों पर ऑपरेटर अपनी क्रिया करता है, उन्हें 'ऑपरेंड' (Operands) कहा जाता है। 
ऑपरेटर्स, वेरिएबल्स, कॉन्स्टेंट्स और फंक्शन कॉल्स के वैध संयोजन से जो व्यंजक बनता है और जिसका एक अंतिम मान निकलता है, उसे 'एक्सप्रेशन' (Expression) कहते हैं (जैसे result = (a + b) * 5;)।
ऑपरेंड्स की संख्या के आधार पर ऑपरेटर्स को तीन भागों में बांटा जाता है:
- यूनेरी ऑपरेटर (Unary Operators): जो केवल एक ऑपरेंड पर कार्य करते हैं (जैसे ++x, -val, !flag, ~mask, &var, *ptr, sizeof)।
- बाइनरी ऑपरेटर (Binary Operators): जिन्हें कार्य करने के लिए दो ऑपरेंड्स की आवश्यकता होती है (जैसे a + b, x == y, m && n, p | q)।
- टर्नरी ऑपरेटर (Ternary Operator): जो तीन ऑपरेंड्स लेता है (कंडीशनल ऑपरेटर ? :)।

२. C भाषा के सभी प्रमुख ऑपरेटर्स का संपूर्ण वर्गीकरण:
१. अंकगणितीय ऑपरेटर (Arithmetic Operators):
   - जोड़ (+), घटाव (-)
   - गुणा (*)
   - भाग (/): यदि दोनों ऑपरेंड पूर्णांक हों, तो दशमलव का हिस्सा कट जाता है (17 / 5 = 3); यदि कोई एक भी फ्लोट या डबल हो, तो सटीक दशमलव मान मिलता है (17.0 / 5 = 3.4)।
   - मॉड्यूलस (%): पूर्णांक विभाजन का शेषफल देता है (17 % 5 = 2)। अत्यंत महत्वपूर्ण नियम: C में % ऑपरेटर केवल और केवल पूर्णांकों (int, char) पर काम करता है; float या double पर % लगाना सिंटेक्स एरर है!
२. तुलनात्मक ऑपरेटर (Relational Operators):
   दो मानों की तुलना करते हैं और सत्य होने पर पूर्णांक 1 तथा असत्य होने पर पूर्णांक 0 लौटाते हैं:
   < (छोटा), > (बड़ा), <= (छोटा या बराबर), >= (बड़ा या बराबर), == (समानता जांच), != (असमानता)।
३. तार्किक ऑपरेटर और शॉर्ट-सर्किट मूल्यांकन (Short-Circuit Evaluation):
   - तार्किक AND (&&): दोनों शर्तें सत्य होने पर ही 1 देता है।
   - तार्किक OR (||): कोई भी एक शर्त सत्य होने पर 1 देता है।
   - तार्किक NOT (!): सत्य (non-zero) को 0 और असत्य (0) को 1 बना देता है।
   - शॉर्ट-सर्किट का नियम: C भाषा में तार्किक एक्सप्रेशन्स बाएँ से दाएँ जाँचे जाते हैं:
     - A && B में: यदि A असत्य (0) है, तो B को कभी जाँचा ही नहीं जाता, क्योंकि परिणाम पहले ही निश्चित रूप से असत्य है!
     - A || B में: यदि A सत्य (1) है, तो B को कभी नहीं जाँचा जाता, क्योंकि परिणाम पहले ही सत्य हो चुका है!
     यह नियम शून्य से भाग देने और नल पॉइंटर क्रैश से सुरक्षा प्रदान करता है:
     ```c
     if (ptr != NULL && *ptr == 10) { /* सुरक्षित: यदि ptr नल है तो दायाँ हिस्सा चलेगा ही नहीं */ }
     ```
४. बिटवाइज़ ऑपरेटर और हार्डवेयर बिट मास्किंग:
   सीधे बाइनरी बिट्स (0 और 1) पर कार्य करते हैं:
   - बिटवाइज़ AND (&): दोनों बिट 1 होने पर 1। इसका उपयोग किसी बिट को जांचने और क्लियर करने के लिए किया जाता है।
   - बिटवाइज़ OR (|): कोई भी बिट 1 होने पर 1। इसका उपयोग किसी विशिष्ट बिट को 1 (ON) करने के लिए किया जाता है।
   - बिटवाइज़ XOR (^): दोनों बिट्स अलग होने पर 1। इसका उपयोग बिट्स को पलटने (Toggle) और बिना तीसरे वेरिएबल के दो संख्याओं की अदला-बदली (a^=b; b^=a; a^=b;) के लिए किया जाता है।
   - बिटवाइज़ NOT (~): सभी बिट्स को उलट देता है (~x = -(x + 1))।
   - लेफ्ट शिफ्ट (<<): बिट्स को बाईं ओर खिसकाता है (x << 1 का अर्थ x को 2 से गुणा करना है)।
   - राइट शिफ्ट (>>): बिट्स को दाईं ओर खिसकाता है (x >> 1 का अर्थ x को 2 से भाग देना है)।
५. इंक्रीमेंट और डिक्रीमेंट (++ और --):
   - प्री-इंक्रीमेंट (++x): पहले वेरिएबल का मान 1 बढ़ाता है, फिर एक्सप्रेशन में उसका उपयोग करता है।
   - पोस्ट-इंक्रीमेंट (x++): पहले वेरिएबल का वर्तमान मान एक्सप्रेशन में देता है, फिर बाद में मेमोरी में मान 1 बढ़ाता है।
६. असाइनमेंट और कंपाउंड असाइनमेंट:
   = साधारण असाइनमेंट है। +=, -=, *=, /=, %=, &=, |= आदि इन-प्लेस गणना करते हैं (जैसे x += 5 का अर्थ x = x + 5 है)।
७. विशेष ऑपरेटर्स:
   - टर्नरी ऑपरेटर (? :): if-else का संक्षिप्त रूप (max = (a > b) ? a : b;)।
   - sizeof: कंपाइल-टाइम ऑपरेटर जो डेटा का बाइट्स में आकार लौटाता है। sizeof के अंदर लिखे एक्सप्रेशन्स रनटाइम पर कभी निष्पादित नहीं होते (sizeof(x++) लिखने पर x का मान नहीं बढ़ता!)।
   - कॉमा ऑपरेटर (,): बाएँ से दाएँ गणना करता है और सबसे दाईं ओर का परिणाम लौटाता है (x = (a=2, b=4, a+b); में x = 6 बनेगा)।

३. डेटा टाइप प्रमोशन और अंकगणितीय रूपांतरण:
जब किसी एक्सप्रेशन में अलग-अलग प्रकार के डेटा आते हैं, तो C स्वचालित रूप से छोटे प्रकार को बड़े प्रकार में बदल देती है:
१. इंटिजर प्रमोशन: int से छोटे सभी प्रकार (char, short) गणना से पहले स्वतः int में बदल दिए जाते हैं।
२. पदानुक्रम: int -> unsigned int -> long -> float -> double -> long double।

४. ऑपरेटर प्राथमिकता और साहचर्य तालिका (Precedence & Associativity):
१. पोस्टफिक्स: () [] -> . ++ -- (बाएँ से दाएँ)
२. यूनेरी: ++ -- ! ~ + - * & sizeof (दाएँ से बाएँ)
३. गुणा, भाग, शेषफल: * / % (बाएँ से दाएँ)
४. जोड़, घटाव: + - (बाएँ से दाएँ)
५. बिटवाइज़ शिफ्ट्स: << >> (बाएँ से दाएँ)
६. रिलेशनल: < <= > >= (बाएँ से दाएँ)
७. समानता: == != (बाएँ से दाएँ)
८. बिटवाइज़ AND: & (बाएँ से दाएँ)
९. बिटवाइज़ XOR: ^ (बाएँ से दाएँ)
१०. बिटवाइज़ OR: | (बाएँ से दाएँ)
११. तार्किक AND: && (बाएँ से दाएँ)
१२. तार्किक OR: || (बाएँ से दाएँ)
१३. टर्नरी ऑपरेटर: ? : (दाएँ से बाएँ)
१४. असाइनमेंट: = += -= *= /= (दाएँ से बाएँ)
१५. कॉमा: , (बाएँ से दाएँ)""",
    "realLifeAnalogy": {
        "en": "Think of operator precedence like the BODMAS/PEMDAS rule in algebra: 2 + 3 * 4 is 14, not 20, because multiplication has higher priority than addition. Short-circuit evaluation is like an airport boarding gate: if your boarding pass is expired (Condition 1 is False), the security guard immediately stops you without wasting time examining your passport (Condition 2 is skipped)!",
        "hi": "ऑपरेटर प्राथमिकता गणित के BODMAS नियम जैसी है: 2 + 3 * 4 का मान 14 होता है, 20 नहीं, क्योंकि गुणा की प्राथमिकता जोड़ से ऊपर है। शॉर्ट-सर्किट एयरपोर्ट के सुरक्षा गार्ड जैसा है: यदि आपका बोर्डिंग पास ही एक्सपायर हो चुका है, तो गार्ड आपको वहीं रोक देता है और पासपोर्ट देखने में समय नष्ट नहीं करता!"
    },
    "codeExamples": [
        {
            "title": "Short-Circuit Logic, Bitwise Operations, and Precedence",
            "titleHindi": "शॉर्ट-सर्किट लॉजिक, बिटवाइज़ ऑपरेशन्स और प्राथमिकता का सी कोड",
            "code": """#include <stdio.h>

int main() {
    int a = 0, b = 10;
    
    // Short circuit demonstration: ++b is skipped!
    if (a != 0 && ++b > 10) {
        printf("Condition True\\n");
    } else {
        printf("Condition False\\n");
    }
    printf("b is still %d (not 11 because ++b was skipped!)\\n", b);
    
    // Bitwise shift and XOR in-place swap
    int x = 5; // binary: 00000101
    printf("5 << 1 (multiply by 2) = %d\\n", x << 1);
    printf("5 >> 1 (divide by 2)   = %d\\n", x >> 1);
    
    int p = 15, q = 30;
    p ^= q; q ^= p; p ^= q; // XOR swap without temp variable
    printf("After XOR swap: p = %d, q = %d\\n", p, q);
    
    // sizeof compile-time expression evaluation check
    int k = 50;
    printf("sizeof(k++) = %zu bytes\\n", sizeof(k++));
    printf("k is still %d (k++ inside sizeof is never executed!)\\n", k);
    
    return 0;
}""",
            "output": """Condition False
b is still 10 (not 11 because ++b was skipped!)
5 << 1 (multiply by 2) = 10
5 >> 1 (divide by 2)   = 2
After XOR swap: p = 30, q = 15
sizeof(k++) = 4 bytes
k is still 50 (k++ inside sizeof is never executed!)""",
            "explanation": "Demonstrates short-circuit skipping of ++b, bitwise shift arithmetic, XOR swap, and proof that sizeof expressions are purely compile-time.",
            "explanationHindi": "शॉर्ट-सर्किट द्वारा ++b का छूटना, बिटवाइज़ शिफ्ट द्वारा गुणा/भाग, XOR से अदला-बदली और यह प्रमाण कि sizeof के अंदर का कोड रनटाइम पर नहीं चलता।"
        }
    ],
    "practicals": [
        {
            "id": "prac-op-1",
            "title": "Prefix vs Postfix Increment in Complex Expressions",
            "titleHindi": "जटिल एक्सप्रेशन्स में प्रीफिक्स बनाम पोस्टफिक्स इंक्रीमेंट",
            "objective": "Understand how pre-increment and post-increment produce distinct evaluation results.",
            "objectiveHindi": "प्री और पोस्ट इंक्रीमेंट के कारण एक्सप्रेशन के परिणामों में अंतर को समझें।",
            "code": """#include <stdio.h>

int main() {
    int i = 5, j = 5;
    int res1 = ++i * 2; // i becomes 6 first, then 6 * 2 = 12
    int res2 = j++ * 2; // uses original 5 * 2 = 10, then j becomes 6
    
    printf("res1 (++i * 2) = %d | final i = %d\\n", res1, i);
    printf("res2 (j++ * 2) = %d | final j = %d\\n", res2, j);
    return 0;
}""",
            "expectedOutput": """res1 (++i * 2) = 12 | final i = 6
res2 (j++ * 2) = 10 | final j = 6""",
            "lineByLineExplanation": [
                {"line": "int res1 = ++i * 2;", "noteEn": "Pre-increment updates i to 6 immediately, evaluating 6 * 2 = 12.", "noteHi": "प्री-इंक्रीमेंट पहले i को 6 करता है, फिर 6 * 2 = 12 बनता है।"},
                {"line": "int res2 = j++ * 2;", "noteEn": "Post-increment supplies original 5 for 5 * 2 = 10, incrementing j afterwards.", "noteHi": "पोस्ट-इंक्रीमेंट पहले पुराना 5 देता है जिससे 10 आता है, फिर j को 6 बनाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["&& and || strictly short-circuit left-to-right.", "Left shift (<< 1) doubles an integer; right shift (>> 1) halves it.", "Prefix ++ increments before value access; postfix ++ increments after.", "Modulus operator % is valid strictly on integers."],
        "hi": ["&& और || बाएँ से दाएँ शॉर्ट-सर्किट होते हैं।", "लेफ्ट शिफ्ट 2 से गुणा और राइट शिफ्ट 2 से भाग करता है।", "प्रीफिक्स पहले बढ़ाता है; पोस्टफिक्स बाद में बढ़ाता है।", "% ऑपरेटर केवल पूर्णांकों पर ही मान्य है।"]
    },
    "commonPitfalls": {
        "en": ["Writing assignment = instead of comparison == inside if conditions.", "Modifying the same variable twice without sequence points (i = i++ causes undefined behavior).", "Assuming bitwise & has higher precedence than comparison =="],
        "hi": ["if कंडीशन में तुलना (==) के स्थान पर गलती से असाइनमेंट (=) लिख देना।", "एक ही एक्सप्रेशन में दो बार i++ लिखना (i = i++) जो अनडिफाइंड बिहेवियर है।", "यह समझना कि बिटवाइज़ & की प्राथमिकता == से अधिक है (वास्तव में == पहले चलता है)।"]
    }
}
register_topic(t7)

# ==============================================================================
# TOPIC 8: Control Statements: Branching & Looping
# ==============================================================================
t8 = {
    "id": "control-statement",
    "order": 8,
    "title": "Control Statements: Branching, Iteration & Jump Tables",
    "titleHindi": "कंट्रोल स्टेटमेंट्स: कंडीशन्स, लूप्स और जंप स्टेटमेंट्स (Control Statements)",
    "category": "Control Flow",
    "summary": "Master the flow of control in C: Selection statements (if, if-else, nested branching, else-if ladders), switch-case mechanics and compiler jump tables, iteration loops (for, while, do-while), jump statements (break, continue, goto), infinite loop traps, and loop optimization.",
    "summaryHindi": "C भाषा के नियंत्रण प्रवाह का संपूर्ण अध्ययन: कंडीशनल स्टेटमेंट्स (if, if-else, नेस्टेड, else-if ladder), switch-case और कंपाइलर जंप टेबल्स, लूप्स (for, while, do-while), जंप स्टेटमेंट्स (break, continue, goto), अनंत लूप्स की रोकथाम और लूप परफॉर्मेंस ऑप्टिमाइजेशन।",
    "readTimeMinutes": 22,
    "explanationEn": """1. WHY CONTROL FLOW IS ESSENTIAL IN SYSTEMS PROGRAMMING:
By default, the Central Processing Unit executes machine instructions strictly sequentially, advancing the Program Counter (PC) line-by-line from top to bottom. However, real-world software must make dynamic decisions based on runtime conditions (e.g., verifying access permissions, handling network errors) and repeat tasks millions of times (e.g., matrix processing, rendering graphics frames, searching databases). Control Statements are architectural constructs that alter this sequential instruction flow.
In C, control statements are categorized into three core domains:
1. Decision Making / Selection Statements: if, if-else, nested if, else-if ladder, switch-case.
2. Iteration / Looping Statements: while, do-while, for.
3. Jump / Transfer Statements: break, continue, goto, return.

2. SELECTION & BRANCHING STATEMENTS IN DETAIL:
- The 'if' Statement:
Evaluates a boolean condition. In C, any non-zero value represents TRUE, and exactly zero (0) represents FALSE.
```c
if (balance >= withdrawalAmount) {
    balance -= withdrawalAmount;
}
```
- The 'if-else' Statement:
Guarantees execution of exactly one of two mutually exclusive code blocks based on truth value.
- The 'else-if' Ladder:
Evaluates a chain of conditions sequentially from top to bottom. The moment any condition evaluates to true, its corresponding code block executes, and the entire remainder of the ladder is bypassed. If no condition succeeds, the trailing 'else' block executes.
- The 'switch-case' Statement & Compiler Jump Tables:
A multi-way branching statement testing an expression against multiple discrete constant values.
Rigid Syntactic Constraints of switch:
1. The evaluated expression MUST strictly produce an integer or character type (float, double, and string are illegal!).
2. Case labels must be compile-time constants (case 1: or case 'A':; dynamic variables like case x: are strictly prohibited!).
3. The 'break;' statement is essential at the end of each case block. Without break, execution continues unconditionally into all subsequent cases (known as Fall-Through). While fall-through is occasionally utilized intentionally (e.g., grouping lowercase and uppercase letters case 'a': case 'A':), accidental omission is a notorious bug.
4. The 'default:' block executes if no cases match.
- Why switch is Faster than else-if (Jump Tables):
When case values are densely clustered, optimizing C compilers do not generate a slow chain of sequential compare-and-jump instructions. Instead, the compiler generates a direct Jump Table in memory (an array of code address pointers). The CPU computes the jump target in O(1) constant time, leaping directly to the matching case in a single instruction!

3. ITERATION STATEMENTS (LOOPS) IN DETAIL:
Loops repeat a code block until a designated termination condition evaluates to false (0).
1. 'while' Loop (Entry-Controlled Loop):
The condition is tested BEFORE entering the loop body. If the condition is false on the very first evaluation, the loop body executes zero times.
```c
int count = 1;
while (count <= 5) {
    printf("%d ", count);
    count++;
}
```
2. 'do-while' Loop (Exit-Controlled Loop):
The loop body is executed AT LEAST ONCE before the condition is tested at the bottom.
Crucial Syntactic Mandate: A do-while loop MUST conclude with a terminating semicolon (;):
```c
int input;
do {
    printf("Enter a positive number: ");
    scanf("%d", &input);
} while (input <= 0); // Semicolon is mandatory!
```
3. 'for' Loop (Header-Controlled Loop):
Consolidates initialization, condition check, and iteration update into a single unified header:
```c
for (int i = 0; i < N; i++) {
    // Loop body executes N times
}
```
Execution Cycle of a for Loop:
Step 1: Initialization runs exactly once upon entry.
Step 2: Condition is evaluated. If false (0), the loop terminates immediately.
Step 3: The body statements execute.
Step 4: The increment/update expression executes.
Step 5: Control jumps back to Step 2.

4. JUMP STATEMENTS: BREAK, CONTINUE, GOTO:
- 'break':
Immediately terminates the innermost enclosing loop or switch block, jumping execution directly to the statement immediately following the loop.
- 'continue':
Bypasses all remaining statements in the CURRENT iteration and jumps directly to the loop's next iteration. In a 'for' loop, continue jumps to the increment step; in a 'while' loop, it jumps to the condition test.
- 'goto':
Performs an unconditional jump to a labeled statement within the same function. While unrestricted use leads to tangled "spaghetti code", disciplined use is universally accepted in Linux kernel systems programming for centralized multi-step error recovery and cleanup.

5. INFINITE LOOPS & PERFORMANCE PITFALLS:
- Intentional Infinite Loops: Server listeners and embedded microcontrollers run perpetual loops:
```c
while (1) { /* polling */ }
for (;;) { /* standard C idiom for infinite loop */ }
```
- The Floating-Point Loop Counter Trap:
Never use float variables as exact loop counters:
```c
for (float f = 0.0f; f != 1.0f; f += 0.1f) { ... } // INFINITE LOOP!
```
Because decimal 0.1 cannot be represented precisely in binary IEEE-754 floating-point, f will be 0.99999994 then 1.0999999, never matching 1.0 exactly!

6. STRUCTURED PROGRAMMING PRINCIPLES & CYCLOMATIC COMPLEXITY:
Structured programming, pioneered by computer science luminary Edsger W. Dijkstra, establishes that any algorithmic procedure can be fully implemented using only three foundational control topologies: Sequence, Selection (branching), and Iteration (looping). In enterprise and kernel development, avoiding spaghetti code is critical. Software engineers track Cyclomatic Complexity (the quantitative count of linearly independent paths through code). Keeping cyclomatic complexity under 10 prevents defect proliferation. Using early guard clauses with 'return' or 'break' eliminates deep pyramids of nested if-statements, transforming spaghetti into clean, linear code.""",
    "explanationHi": """१. सिस्टम्स प्रोग्रामिंग में कंट्रोल फ्लो (Control Flow) की अनिवार्यता:
सामान्यतः कंप्यूटर का प्रोसेसर (CPU) प्रोग्राम के निर्देशों को ऊपर से नीचे की ओर एक सीधी रेखा में, एक के बाद एक क्रमिक रूप से चलाता है। लेकिन वास्तविक सॉफ्टवेयर में हमें बदलती परिस्थितियों के आधार पर निर्णय लेने होते हैं (जैसे यूजर का पासवर्ड सही है या नहीं) और किसी कार्य को लाखों बार दोहराना पड़ता है (जैसे 10,000 कर्मचारियों के वेतन की गणना करना या स्क्रीन पर पिक्सल रेंडर करना)।
कंट्रोल स्टेटमेंट्स (Control Statements) वे प्रोग्रामिंग निर्देश हैं जो निष्पादन के इस सीधे प्रवाह को बदलकर प्रोग्राम को निर्णय लेने और दोहराव करने की क्षमता प्रदान करते हैं।
C भाषा में इन्हें तीन प्रमुख श्रेणियों में विभाजित किया गया है:
१. निर्णय लेने वाले स्टेटमेंट्स (Decision Making): if, if-else, nested if, else-if ladder, switch-case।
२. दोहराव वाले स्टेटमेंट्स (Loops / Iteration): while, do-while, for।
३. जंप स्टेटमेंट्स (Jump / Transfer): break, continue, goto, return।

२. निर्णय लेने वाले स्टेटमेंट्स का गहन अध्ययन:
- 'if' स्टेटमेंट:
यह दी गई शर्त का मूल्यांकन करता है। C भाषा में कोई भी गैर-शून्य संख्या (Non-zero) सत्य (TRUE) मानी जाती है, और केवल शून्य (0) ही असत्य (FALSE) माना जाता है।
- 'if-else' स्टेटमेंट:
सत्य होने पर 'if' वाला ब्लॉक चलता है, और असत्य होने पर 'else' वाला ब्लॉक चलता है। दोनों में से कोई एक ही ब्लॉक चलेगा।
- 'else-if' लैडर (Ladder):
जब कई परस्पर विरोधी शर्तों की एक के बाद एक क्रमिक जांच करनी हो। ऊपर से नीचे की ओर जैसे ही पहली शर्त सत्य होती है, उसका कोड चलता है और बाकी पूरी लैडर छोड़ दी जाती है।
- 'switch-case' स्टेटमेंट और कंपाइलर जंप टेबल्स:
जब किसी एक चर के कई अलग-अलग निश्चित मानों की तुलना करनी हो।
switch के कड़े नियम:
१. switch के अंदर केवल पूर्णांक (int) या कैरेक्टर (char) ही मान्य हैं; float, double या स्ट्रिंग का उपयोग अवैध है!
२. case लेबल्स केवल स्थिर मान (Constants जैसे case 1:, case 'A':) ही हो सकते हैं; वेरिएबल्स (case x:) लिखना वर्जित है।
३. प्रत्येक केस के अंत में 'break;' लगाना अनिवार्य है। यदि break नहीं लगाया गया, तो कंट्रोल नीचे वाले सभी केसों को भी बिना शर्त चला देगा (जिसे Fall-Through कहते हैं)।
४. जब कोई भी केस मैच नहीं होता, तब 'default:' ब्लॉक चलता है।
- switch स्टेटमेंट else-if से तेज क्यों होता है?
जब केस मान पास-पास होते हैं, तो C कंपाइलर तुलना की लंबी श्रृंखला बनाने के बजाय मेमोरी में एक 'जंप टेबल' (Jump Table) बना देता है। सीपीयू O(1) समय में सीधे सही केस पर छलांग लगा देता है!

३. लूप्स (Loops) का विस्तृत अध्ययन:
लूप किसी कोड ब्लॉक को तब तक दोहराते हैं जब तक कि समाप्ति की शर्त असत्य (0) न हो जाए।
१. 'while' लूप (Entry-Controlled Loop):
शर्त लूप बॉडी में घुसने से पहले जांची जाती है। यदि शर्त शुरू में ही असत्य हो, तो लूप 0 बार चलता है।
२. 'do-while' लूप (Exit-Controlled Loop):
शर्त लूप बॉडी चलने के बाद सबसे नीचे जांची जाती है। इसलिए do-while लूप कम से कम एक बार जरूर चलता है, चाहे शर्त शुरू में ही गलत क्यों न हो!
अनिवार्य सिंटेक्स नियम: do-while के अंत में सेमीकोलन (;) लगाना अनिवार्य होता है: 'do { ... } while (शर्त);'।
३. 'for' लूप (Header-Controlled Loop):
यह इनिशियलाइजेशन, शर्त की जांच और इंक्रीमेंट/डिक्रीमेंट तीनों को एक ही पंक्ति में समेट लेता है।
for लूप के चलने का चरणबद्ध क्रम:
चरण १: इनिशियलाइजेशन (केवल एक बार शुरू में चलता है)।
चरण २: शर्त की जांच। यदि असत्य है, तो लूप तुरंत बंद हो जाता है।
चरण ३: लूप बॉडी का कोड चलता है।
चरण ४: इंक्रीमेंट या डिक्रीमेंट होता है।
चरण ५: वापस चरण २ पर जाकर शर्त जांची जाती है।

४. जंप स्टेटमेंट्स (break, continue, goto):
- 'break': लूप या switch को तुरंत बीच में ही समाप्त करके बाहर निकाल देता है।
- 'continue': वर्तमान चक्कर के बचे हुए कोड को छोड़कर तुरंत अगले चक्कर (Iteration) पर कूद जाता है।
- 'goto': बिना शर्त प्रोग्राम को उसी फंक्शन के किसी लेबल पर भेज देता है। लिनक्स कर्नल में इसका उपयोग एरर हैंडलिंग और मेमोरी फ्री करने के लिए सुरक्षित रूप से किया जाता है।

५. फ्लोटिंग पॉइंट लूप काउंटर की घातक गलती:
कभी भी float वेरिएबल को लूप काउंटर के रूप में exact equality (!=) के साथ न चलाएं:
'for (float f = 0.0f; f != 1.0f; f += 0.1f)'
क्योंकि बाइनरी IEEE-754 में 0.1 का सटीक मान नहीं होता, इसलिए f कभी भी ठीक 1.0 नहीं बनेगा और यह अनंत लूप बन जाएगा!

६. स्ट्रक्चर्ड प्रोग्रामिंग का सिद्धांत और चक्रीय जटिलता (Cyclomatic Complexity):
महान कंप्यूटर वैज्ञानिक एड्सगर डिज्क्स्ट्रा (Edsger W. Dijkstra) द्वारा प्रतिपादित स्ट्रक्चर्ड प्रोग्रामिंग का नियम कहता है कि दुनिया के किसी भी जटिल से जटिल प्रोग्राम को केवल तीन बुनियादी संरचनाओं से बनाया जा सकता है: क्रम (Sequence), चयन (Selection/Decision) और दोहराव (Iteration/Loop)।
यदि प्रोग्रामर अत्यधिक goto स्टेटमेंट्स या 6-7 स्तर गहरे नेस्टेड if-else का उपयोग करता है, तो कोड 'स्पघेटी कोड' बन जाता है जिसे समझना और डीबग करना लगभग असंभव हो जाता है। आधुनिक सॉफ्टवेयर इंजीनियरिंग में यह नियम है कि किसी भी फंक्शन की चक्रीय जटिलता (Cyclomatic Complexity - अलग-अलग स्वतंत्र रास्तों की संख्या) 10 से कम होनी चाहिए। यदि किसी लूप में कोई शर्त पूरी न हो, तो तुरंत 'break' या 'return' (Guard Clause) लगाकर बाहर निकल जाना चाहिए ताकि कोड साफ-सुथरा और पठनीय रहे।""",
    "realLifeAnalogy": {
        "en": "Think of control flow like driving on a highway. An 'if-else' is a fork in the road: exit left for Airport or stay right for Downtown. A 'switch' is an elevator with labeled buttons: press 4 and the elevator moves directly to Floor 4 via a counterweight pulley. A 'while' loop is waiting at a railroad crossing until the barrier lifts. A 'for' loop is running exactly 10 laps on an athletic track. And 'break' is pulling the emergency brake immediately!",
        "hi": "कंट्रोल फ्लो हाईवे पर गाड़ी चलाने जैसा है। if-else सड़क का तिराहा है: दाएँ मुड़ें या बाएँ। switch लिफ्ट के बटन जैसा है: 4 नंबर दबाया तो लिफ्ट सीधे चौथी मंजिल पर रुकती है। while लूप रेलवे फाटक पर ट्रेन गुजरने तक इंतजार करना है। for लूप मैदान के ठीक 10 चक्कर लगाना है। और break आपातकालीन ब्रेक लगाकर गाड़ी को तुरंत रोक देना है!"
    },
    "codeExamples": [
        {
            "title": "Switch-Case Menu Driven System with Guarded Fall-Through",
            "titleHindi": "switch-case आधारित कैलकुलेटर और केस ग्रुपिंग का सी कोड",
            "code": """#include <stdio.h>

int main() {
    char op;
    double num1, num2;
    
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &op);
    printf("Enter two numbers: ");
    scanf("%lf %lf", &num1, &num2);
    
    switch (op) {
        case '+':
            printf("Result: %.2lf + %.2lf = %.2lf\\n", num1, num2, num1 + num2);
            break;
        case '-':
            printf("Result: %.2lf - %.2lf = %.2lf\\n", num1, num2, num1 - num2);
            break;
        case '*':
            printf("Result: %.2lf * %.2lf = %.2lf\\n", num1, num2, num1 * num2);
            break;
        case '/':
            if (num2 != 0.0) {
                printf("Result: %.2lf / %.2lf = %.2lf\\n", num1, num2, num1 / num2);
            } else {
                printf("Runtime Error: Division by zero is mathematically undefined!\\n");
            }
            break;
        default:
            printf("Error: Unrecognized operator '%c'\\n", op);
    }
    return 0;
}""",
            "output": """Enter operator (+, -, *, /): *
Enter two numbers: 12.5 4
Result: 12.50 * 4.00 = 50.00""",
            "explanation": "Demonstrates multi-branching with switch on char, explicit break statements, and zero division guarding.",
            "explanationHindi": "कैरेक्टर पर switch-case, break स्टेटमेंट और शून्य से विभाजन की सुरक्षा को प्रदर्शित करता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-cs-1",
            "title": "Nested Loops Triangle Pattern and Loop Skipping",
            "titleHindi": "नेस्टेड लूप्स द्वारा त्रिभुज पैटर्न और continue का उपयोग",
            "objective": "Use nested loops to generate a triangle pattern while skipping specific numbers with continue.",
            "objectiveHindi": "नेस्टेड लूप्स द्वारा स्टार पैटर्न बनाएं और continue का व्यवहार समझें।",
            "code": """#include <stdio.h>

int main() {
    int rows = 4;
    
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }
    return 0;
}""",
            "expectedOutput": """1 
1 2 
1 2 3 
1 2 3 4 """,
            "lineByLineExplanation": [
                {"line": "for (int i = 1; i <= rows; i++)", "noteEn": "Outer loop controls rows from 1 to 4.", "noteHi": "बाहरी लूप पंक्तियों (1 से 4) को नियंत्रित करता है।"},
                {"line": "for (int j = 1; j <= i; j++)", "noteEn": "Inner loop prints digits up to current row index.", "noteHi": "अंदरूनी लूप वर्तमान पंक्ति संख्या तक अंक प्रिंट करता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["0 is false; any non-zero value is true in C.", "switch expression must be int or char; float is illegal.", "do-while executes at least once and requires trailing semicolon.", "break exits enclosing loop; continue skips to next iteration."],
        "hi": ["0 असत्य है; कोई भी गैर-शून्य मान सत्य है।", "switch में केवल int या char मान्य हैं; float अमान्य है।", "do-while कम से कम एक बार चलता है और अंत में सेमीकोलन मांगता है।", "break लूप से बाहर निकालता है; continue अगले चक्कर पर भेजता है।"]
    },
    "commonPitfalls": {
        "en": ["Putting accidental semicolon after if: if(x > 5);", "Forgetting break in switch causes fall-through into next cases.", "Using float in loop counter termination condition causing infinite loops."],
        "hi": ["if के बाद गलती से सेमीकोलन लगाना: if(x > 5); जिससे if खाली हो जाता है।", "switch में break भूलने से नीचे के केस भी चल जाना।", "फ्लोट वेरिएबल को लूप काउंटर बनाकर अनंत लूप में फँस जाना।"]
    }
}
register_topic(t8)
print("Topics 5-8 registered successfully.")
'''

with open("topics_t5_t8.py", "w", encoding="utf-8") as f:
    f.write(content)
print("Successfully generated topics_t5_t8.py")
