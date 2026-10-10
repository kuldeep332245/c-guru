# Topics 1 to 4: Program Structure, Flowchart, Data Types, 3-Digit Logic
from topics_master import register_topic

# ==============================================================================
# TOPIC 1: Program Structure in C (C प्रोग्राम की संरचना)
# ==============================================================================
t1 = {
    "id": "program-structure",
    "order": 1,
    "title": "Program Structure in C",
    "titleHindi": "C प्रोग्राम की संरचना (Program Structure)",
    "category": "Basics",
    "summary": "Understand the comprehensive anatomy of a C program from preprocessor directives, header files, main() function entry point, statements, and comments to the compilation pipeline.",
    "summaryHindi": "C प्रोग्राम की छह मूलभूत संरचनाओं (Sections), प्रीप्रोसेसर, main() फंक्शन, सिंटेक्स नियमों और कम्पाइलेशन के चार चरणों को गहराई से समझें।",
    "readTimeMinutes": 15,
    "explanationEn": """1. HISTORICAL CONTEXT & THE BIRTH OF C:
The C programming language was conceived and crafted between 1969 and 1972 by computer scientist Dennis Ritchie at AT&T Bell Laboratories in Murray Hill, New Jersey. Its historical imperative was revolutionary: Dennis Ritchie and Ken Thompson needed a modern, elegant, yet low-level language to rewrite the Unix operating system so it could be ported across diverse hardware architectures instead of being chained to PDP-7 assembly code. Derived from Ken Thompson's B language (which originated from BCPL), C introduced rich data typing, pointer arithmetic, and structured programming paradigms. Today, C is universally celebrated as the foundational bedrock of all modern computing. Operating systems such as Linux, macOS, Android, Windows, database engines like PostgreSQL, MySQL, and SQLite, and game engines are built primarily on C. Modern languages including C++, Java, C#, Python, JavaScript, PHP, and Rust inherited their core control structures, syntax rules, and operators directly from C.

2. THE SIX FUNDAMENTAL SECTIONS OF A C PROGRAM:
A standard, professional C program follows a well-defined architectural sequence comprising six sequential sections:
Section 1 - Documentation Section:
Contains comments detailing the program's title, purpose, author name, creation date, and algorithmic notes. Although completely ignored by the C compiler, this section is indispensable for code maintainability, team collaboration, and software documentation. Both single-line comments (//) and multi-line comments (/* ... */) are utilized here.
Section 2 - Link Section (Preprocessor Directives):
Instructs the preprocessor to pull in external header files containing prototypes of library functions before compilation begins. For example, #include <stdio.h> grants access to standard input/output routines, and #include <stdlib.h> provides memory management tools. Without the link section, functions like printf() and scanf() would remain unrecognized symbols.
Section 3 - Definition Section:
Establishes symbolic constants and macros using the #define directive (e.g., #define PI 3.14159 or #define MAX_BUFFER 1024). Macros perform literal compile-time textual replacement without consuming RAM storage, providing symbolic clarity and performance.
Section 4 - Global Declaration Section:
Houses variables and custom function prototypes that must be visible and accessible across multiple functions throughout the entire source file. Variables declared here reside in the static data segment and persist for the entire program duration.
Section 5 - Main Function Section:
The mandatory gateway of every standalone executable C application. Execution invariably commences at the very first line of main(). The main function consists of two parts: the declaration part (where local variables are created) and the execution part (where operations, expressions, and calls execute). It must conclude by returning an integer exit status code (return 0;) back to the operating system shell.
Section 6 - Subprogram (User-Defined Functions) Section:
Contains custom helper functions (such as calculateSum(), displayBanner(), or sortArray()) defined by the programmer to achieve modular programming, code reuse, and separation of concerns.

3. ANATOMICAL BREAKDOWN OF THE STARTER PROGRAM:
Consider this classic foundational program:
```c
#include <stdio.h>

int main() {
    printf("Namaste, World!\\n");
    return 0;
}
```
Let us examine each token with surgical precision:
- '#': The hash character indicates a preprocessor directive. It flags instructions executed before the actual language compiler translates source code.
- 'include': Tells the preprocessor to search for the specified file and paste its contents verbatim into the current translation unit.
- '<stdio.h>': Standard Input Output header file. The angled brackets tell the preprocessor to search standard system include paths. It defines function prototypes for printf, scanf, getchar, and file operations.
- 'int': Specifies the return type of the function. Modern ISO C standards mandate that main() must return an integer back to the host operating system.
- 'main()': The designated primary execution entry point. The parentheses can contain command-line argument parameters such as (int argc, char *argv[]).
- '{ and }': Curly braces define a code block or scope boundary. Statements inside represent the function body.
- 'printf("...");': Formatted print library routine that transmits characters to the standard output console stream (stdout).
- '\\n': Escape sequence denoting an ASCII Line Feed / Newline character (decimal 10), advancing the terminal cursor to the start of the next line.
- Semicolon ';': The mandatory statement terminator in C. In English, sentences conclude with a period; in C, every executable instruction must terminate with a semicolon. Forgetting a semicolon triggers compilation failure.
- 'return 0;': Concludes the main function and transmits exit code 0 to the Operating System. In Unix and Windows environments, an exit code of 0 universally signifies successful termination with zero errors.

4. THE FOUR PHASES OF THE C COMPILATION PIPELINE:
When you compile a source file like program.c using GCC or Clang, your code passes through four distinct transformation phases:
Phase 1 - Preprocessing:
The preprocessor strips out all comments, expands macros defined by #define, and replaces #include directives with the actual contents of the referenced header files. The resulting intermediate file is called a Translation Unit (.i extension).
Phase 2 - Compilation:
The compiler parses the preprocessed C source code, performs lexical, syntactic, and semantic analysis, builds an Abstract Syntax Tree (AST), and generates equivalent assembly language instructions (.s extension) customized for the host CPU architecture (x86, ARM, RISC-V).
Phase 3 - Assembly:
The assembler translates assembly mnemonics into raw machine code instructions, generating an unlinked Object File (.o on Linux or .obj on Windows).
Phase 4 - Linking:
The linker combines the object file with runtime C standard library binaries (libc), resolves external memory symbols (such as printf), and binds them together into the final runnable executable application (.exe on Windows or ELF binary on Linux).

5. SYNTAX RULES AND CODING CONVENTIONS:
C is a free-form, case-sensitive language. You can format whitespace, blank lines, and indentations flexibly without affecting compiler logic. However, strict adherence to clean formatting standards, descriptive identifier naming, consistent indentation, and thoughtful commenting is vital for real-world software engineering.""",
    "explanationHi": """१. C भाषा का ऐतिहासिक परिचय एवं उत्पत्ति:
C प्रोग्रामिंग भाषा का निर्माण सन् 1969 से 1972 के बीच अमेरिका के न्यू जर्सी स्थित AT&T बेल लैबोरेटरीज (Bell Labs) में विश्वप्रसिद्ध कंप्यूटर वैज्ञानिक डेनिस रिची (Dennis Ritchie) द्वारा किया गया था। उस समय यूनिक्स (UNIX) ऑपरेटिंग सिस्टम को असेंबली भाषा में लिखा गया था, जिसके कारण वह केवल एक ही प्रकार के कंप्यूटर (PDP-7) पर चल सकता था। केन थॉम्पसन और डेनिस रिची एक ऐसी शक्तिशाली, पोर्टेबल और आधुनिक भाषा चाहते थे जिससे पूरे ऑपरेटिंग सिस्टम को पुनः लिखा जा सके ताकि वह दुनिया के किसी भी हार्डवेयर पर सरलता से चल सके। डेनिस रिची ने B भाषा को उन्नत करके C भाषा का आविष्कार किया। आज C भाषा को सभी आधुनिक भाषाओं की "जननी (Mother of All Languages)" कहा जाता है। C++, Java, C#, Python, JavaScript, PHP और Rust जैसी आधुनिक भाषाओं ने अपने बुनियादी सिंटेक्स, लूप, कंडीशन्स और ऑपरेटर्स सीधे C भाषा से ही ग्रहण किए हैं। लिनक्स कर्नेल, विंडोज़ ऑपरेटिंग सिस्टम, डेटाबेस जैसे MySQL व SQLite, और सुपरकंप्यूटर्स के कोर इंजन आज भी C भाषा में लिखे गए हैं।

२. C प्रोग्राम के छह मुख्य भाग (Six Sections of a C Program):
एक आदर्श और मानक C प्रोग्राम की संरचना को छह प्रमुख अनुभागों में विभाजित किया जाता है:
१. डॉक्यूमेंटेशन सेक्शन (Documentation Section):
यह प्रोग्राम का सबसे पहला भाग होता है जिसमें टिप्पणियाँ (Comments) लिखी जाती हैं। इसमें प्रोग्राम का शीर्षक, लेखक का नाम, निर्माण की तिथि और प्रोग्राम का उद्देश्य लिखा जाता है। कम्पाइलर कमेंट्स को पूरी तरह अनदेखा कर देता है, किंतु यह कोड को समझने और टीम के साथ काम करने के लिए अत्यंत महत्वपूर्ण है।
२. लिंक सेक्शन (Link Section / Preprocessor Directives):
इस भाग में प्रीप्रोसेसर निर्देश लिखे जाते हैं जो कम्पाइलर को बाहरी हेडर फाइलों को जोड़ने का आदेश देते हैं। जैसे '#include <stdio.h>' लिखने से कम्पाइलर को इनपुट-आउटपुट फंक्शन्स (printf, scanf) की जानकारी मिलती है।
३. डेफिनिशन सेक्शन (Definition Section):
यहाँ '#define' मैक्रो के माध्यम से सिंबॉलिक स्थिरांक (Constants) परिभाषित किए जाते हैं; जैसे '#define PI 3.14159' या '#define MAX 100'। ये मान मेमोरी में जगह नहीं लेते बल्कि कोड कम्पाइल होने से पहले सीधे बदल दिए जाते हैं।
४. ग्लोबल डिक्लेरेशन सेक्शन (Global Declaration Section):
इस भाग में ऐसे वेरिएबल्स और कस्टम फंक्शन्स के प्रोटोटाइप घोषित किए जाते हैं जिनकी आवश्यकता प्रोग्राम के सभी फंक्शन्स में होती है। यहाँ बनाए गए चर प्रोग्राम के शुरू होने से खत्म होने तक मेमोरी में जीवित रहते हैं।
५. मेन फंक्शन सेक्शन (Main Function Section):
यह प्रत्येक C प्रोग्राम का सबसे महत्वपूर्ण और अनिवार्य प्रवेश द्वार (Entry Point) है। ऑपरेटिंग सिस्टम किसी भी C प्रोग्राम को चलाना हमेशा main() की पहली पंक्ति से ही शुरू करता है। इसके दो भाग होते हैं: डिक्लेरेशन भाग (जहाँ लोकल वेरिएबल्स बनते हैं) और एग्जीक्यूशन भाग (जहाँ निर्देश चलते हैं)। अंत में ऑपरेटिंग सिस्टम को सूचना देने के लिए 'return 0;' लिखा जाता है।
६. सब-प्रोग्राम सेक्शन (Subprogram / Functions Section):
यहाँ यूजर-डिफाइंड फंक्शन्स (User-defined functions) की बॉडी लिखी जाती है, जैसे जोड़ना, घटाना, या सॉर्ट करना। इससे प्रोग्राम मॉड्यूलर और सुव्यवस्थित बनता है।

३. पहले C प्रोग्राम के एक-एक शब्द का गहरा विश्लेषण:
आइए इस सरल क्लासिक प्रोग्राम की प्रत्येक पंक्ति को समझें:
```c
#include <stdio.h>

int main() {
    printf("नमस्ते भारत!\\n");
    return 0;
}
```
- '#': हैश चिह्न यह बताता है कि यह एक प्रीप्रोसेसर निर्देश है जिसे मुख्य कम्पाइलेशन से पहले चलाया जाना चाहिए।
- 'include': यह कम्पाइलर को निर्देश देता है कि बताई गई हेडर फाइल को इस प्रोग्राम के साथ जोड़ दो।
- '<stdio.h>': स्टैंडर्ड इनपुट आउटपुट हेडर फाइल। इसमें स्क्रीन पर प्रिंट करने (printf) और कीबोर्ड से पढ़ने (scanf) के नियम लिखे होते हैं।
- 'int': यह बताता है कि main() फंक्शन अपना कार्य समाप्त करने के बाद ऑपरेटिंग सिस्टम को एक पूर्णांक (Integer) मान वापस लौटाएगा।
- 'main()': हर C प्रोग्राम का पहला दरवाजा। कंप्यूटर चाहे 10,000 लाइनों का कोड हो, निष्पादन हमेशा main() से ही शुरू करता है।
- '{ और }': कर्ली ब्रेसेस कोड ब्लॉक की शुरुआत और अंत की सीमा निर्धारित करते हैं।
- 'printf("...");': प्रिंट फॉर्मेटेड फंक्शन, जो कोट्स के अंदर लिखे शब्दों को स्क्रीन (कंसोल) पर दिखाता है।
- '\\n': न्यूलाइन एस्केप सीक्वेंस, जो कर्सर को अगली नई लाइन पर भेज देता है (कीबोर्ड के Enter बटन के समान)।
- सेमीकोलन ';': C भाषा में हर स्टेटमेंट के अंत में सेमीकोलन लगाना अनिवार्य है। यह बताता है कि निर्देश यहाँ पूरा हो चुका है।
- 'return 0;': यह ऑपरेटिंग सिस्टम को संकेत देता है कि प्रोग्राम बिना किसी त्रुटि (Error) के सफलतापूर्वक समाप्त हो चुका है।

४. C प्रोग्राम के कम्पाइलेशन के चार चरण:
जब आप किसी C प्रोग्राम को कम्पाइल करते हैं, तो वह चार चरणों से होकर गुजरता है:
१. प्रीप्रोसेसर (Preprocessor): यह सभी कमेंट्स को हटाता है और #include वाली फाइलों को कोड में जोड़कर ट्रांसलेशन यूनिट (.i) बनाता है।
२. कम्पाइलर (Compiler): यह C कोड को असेंबली भाषा (.s) में बदलता है और सिंटेक्स की जांच करता है।
३. असेंबलर (Assembler): यह असेंबली कोड को मशीन के समझने योग्य बाइनरी ऑब्जेक्ट कोड (.o या .obj) में बदलता है।
४. लिंकर (Linker): यह सभी ऑब्जेक्ट फाइलों और C लाइब्रेरी फाइलों को जोड़कर अंतिम चलाने योग्य फाइल (.exe या ELF) तैयार करता है।""",
    "realLifeAnalogy": {
        "en": "Think of a C program as constructing a building from an architectural blueprint. The documentation is the project blueprint notes. The #include directives are bringing specialized construction machinery to the site. The main() function is the grand front entrance. The sub-functions are specialized rooms, and return 0 is the city building safety clearance.",
        "hi": "C प्रोग्राम की तुलना मकान के निर्माण से करें। डॉक्यूमेंटेशन नक्शा है, #include निर्माण उपकरण लाना है, main() मुख्य प्रवेश द्वार है, सब-फंक्शन्स अलग-अलग कमरे हैं, और return 0 भवन पूर्णता प्रमाण पत्र है।"
    },
    "codeExamples": [
        {
            "title": "Complete Multi-Section C Program",
            "titleHindi": "छह सेक्शन वाला संपूर्ण C प्रोग्राम",
            "code": """#include <stdio.h>

#define PI 3.14159265

float globalRadius = 5.0f;

float computeArea(float r);

int main() {
    float area = computeArea(globalRadius);
    printf("Radius: %.2f units\\n", globalRadius);
    printf("Computed Area: %.4f sq units\\n", area);
    return 0;
}

float computeArea(float r) {
    return PI * r * r;
}""",
            "output": """Radius: 5.00 units
Computed Area: 78.5398 sq units""",
            "explanation": "Demonstrates all six sections: headers, macros, globals, main, and functions.",
            "explanationHindi": "छह भागों: हेडर, मैक्रो, ग्लोबल, मेन और फंक्शन को दर्शाता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-ps-1",
            "title": "Build Your First Professional C Template",
            "titleHindi": "पहला C प्रोग्राम टेम्प्लेट बनाएं",
            "objective": "Write a clean C program with comments, escape sequences, and return code.",
            "objectiveHindi": "कमेंट्स और एस्केप सीक्वेंस के साथ C प्रोग्राम बनाएं।",
            "code": """#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    printf("Line 1\\tLine 2\\n");
    return 0;
}""",
            "expectedOutput": """Welcome to C Programming!
Line 1	Line 2""",
            "lineByLineExplanation": [
                {"line": "#include <stdio.h>", "noteEn": "Includes standard I/O library.", "noteHi": "इनपुट/आउटपुट लाइब्रेरी शामिल करता है।"},
                {"line": "int main()", "noteEn": "Main entry point.", "noteHi": "मुख्य प्रवेश द्वार।"},
                {"line": "return 0;", "noteEn": "Returns success status.", "noteHi": "सफल कोड लौटाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["main() is mandatory.", "Statements end with semicolon.", "C is case-sensitive.", "Compilation has 4 phases."],
        "hi": ["main() अनिवार्य है।", "सेमीकोलन आवश्यक है।", "C केस-सेंसिटिव है।", "कम्पाइलेशन के 4 चरण हैं।"]
    },
    "commonPitfalls": {
        "en": ["Missing semicolon.", "Typing Main instead of main.", "Using void main()."],
        "hi": ["सेमीकोलन भूलना।", "main को Main लिखना।", "void main() का उपयोग करना।"]
    }
}
register_topic(t1)

# ==============================================================================
# TOPIC 2: Flowchart & Logic Design (फ्लोचार्ट और लॉजिक डिज़ाइन)
# ==============================================================================
t2 = {
    "id": "flow-chart",
    "order": 2,
    "title": "Flowchart & Logic Design",
    "titleHindi": "फ्लोचार्ट और लॉजिक डिज़ाइन (Flowchart)",
    "category": "Basics",
    "summary": "Master visual algorithmic problem-solving using standardized flowchart symbols (Oval, Parallelogram, Rectangle, Diamond, Connectors), flowline rules, and systematic translation into C code.",
    "summaryHindi": "समस्या समाधान के सचित्र एल्गोरिदम, मानक फ्लोचार्ट प्रतीकों (अंडाकार, समानांतर चतुर्भुज, आयत, समचतुर्भुज), नियमों और फ्लोचार्ट से C कोड बनाने की विधि सीखें।",
    "readTimeMinutes": 16,
    "explanationEn": """1. WHAT IS A FLOWCHART & WHY IS IT CRITICAL IN PROGRAMMING?
Before writing a single line of executable C source code, professional software engineers and computer scientists always design their problem-solving strategy visually. A flowchart is a diagrammatic, pictorial representation of an algorithm. It maps out the logical sequence of operations, control branching decisions, repetitive iterations, and input-output flows using internationally standardized geometric symbols. 
Historically, attempting to code complex business or mathematical logic directly into syntax results in tangled thinking, syntax confusion, and obscure logical bugs. A flowchart separates pure problem-solving logic from language-specific syntax rules. It acts as a clear visual roadmap that allows anyone—whether a programmer, manager, or client—to trace how data flows from initial input to final result.

2. STANDARD ANSI / ISO FLOWCHART SYMBOLS AND THEIR PRECISE FUNCTIONS:
The American National Standards Institute (ANSI X3.5) and International Organization for Standardization (ISO 5807) formalized the geometric symbols used across computer science:
1. Terminal Symbol (Oval / Rounded Rectangle):
Represents the absolute beginning (START) and conclusion (STOP or END) of an algorithm or program module. Every valid flowchart must possess exactly one Start terminal and at least one Stop terminal.
2. Input / Output Symbol (Parallelogram):
Represents operations where data enters the program from external devices (e.g., READ A, INPUT marks corresponding to scanf() in C) or where processed information is displayed to the user (e.g., PRINT sum, DISPLAY result corresponding to printf() in C).
3. Processing Symbol (Rectangle):
Depicts internal computational actions, variable assignments, mathematical formulas, and data manipulation. Examples include: sum = a + b, count = 1, or temp = x. A processing box has strictly one incoming flowline and one outgoing flowline.
4. Decision Symbol (Rhombus / Diamond):
Represents a conditional decision point where a logical condition or relational comparison is evaluated (e.g., Is N > 0? or Is marks >= 40?). A decision box always has one incoming flowline and two or more outgoing flowlines labeled with outcomes such as 'Yes' and 'No', or 'True' and 'False'. This directly corresponds to if-else statements and while conditions in C.
5. Flowlines (Directional Arrows):
Lines with arrowheads indicating the exact path and chronological direction of execution flow. Standard flow proceeds from top to bottom and from left to right.
6. On-Page Connector (Small Circle):
Used to connect disparate parts of a flowchart on the same page, preventing intersecting or messy crisscrossing lines. Often labeled with matching capital letters (A, B, C).
7. Off-Page Connector (Pentagon / Home-Plate Shape):
Used when a large flowchart exceeds a single physical sheet of paper and continues onto another page.
8. Predefined Process Symbol (Rectangle with double vertical bars):
Depicts an invocation of a subprogram, function, or modular subroutine (e.g., call calculateFactorial(n)).

3. ESSENTIAL RULES FOR CONSTRUCTING VALID FLOWCHARTS:
To ensure clarity, accuracy, and standardization, flowcharts must adhere to strict engineering rules:
- Clear Orientation: The overall direction of flow should invariably proceed from top to bottom and left to right.
- Single Entry/Exit for Processes: A processing rectangle should possess only one incoming arrow and one outgoing arrow.
- Exhaustive Decision Paths: Every decision diamond must have clearly labeled exit arrows covering all logical possibilities (e.g., Yes and No).
- Unambiguous Flowlines: Lines must not cross over one another arbitrarily. Whenever lines must jump across each other, connectors must be employed.
- Language Independence: Flowcharts should be written using clear mathematical and natural language statements (e.g., 'Input Age', 'Calculate Net = Gross - Tax') rather than machine-specific syntax (e.g., avoiding scanf(\"%d\", &a)).

4. STEP-BY-STEP FLOWCHART EXAMPLES TRANSLATED TO C:
Example 1: Finding the Largest of Two Numbers
Algorithm:
Step 1: Start
Step 2: Input two numbers A and B
Step 3: Check if A > B?
        - If Yes: Print \"A is Largest\"
        - If No: Check if B > A?
                - If Yes: Print \"B is Largest\"
                - If No: Print \"Both numbers are equal\"
Step 4: Stop
In C code, this maps directly to:
```c
if (A > B) printf(\"A is largest\\n\");
else if (B > A) printf(\"B is largest\\n\");
else printf(\"Both are equal\\n\");
```

Example 2: Loop Flowchart - Printing Numbers 1 to N
Algorithm:
Step 1: Start
Step 2: Read limit N
Step 3: Initialize counter i = 1
Step 4: Decision: Is i <= N?
        - If True: Print i -> Increment i = i + 1 -> Loop back to Step 4
        - If False: Exit loop -> Proceed to Step 5
Step 5: Stop
This loop structure in the flowchart directly maps to a while or for loop in C:
```c
int i = 1;
while (i <= N) {
    printf(\"%d \", i);
    i++;
}
```

5. CONVERTING COMPLEX FLOWCHARTS TO C CODE (MAPPING TABLE):
- Terminal Oval -> int main() { ... return 0; }
- Parallelogram (Input) -> scanf(\"%d\", &var);
- Parallelogram (Output) -> printf(\"%d\\n\", var);
- Rectangle (Calculation) -> var = expr;
- Diamond (Binary Condition) -> if (condition) { ... } else { ... }
- Diamond with loopback -> while (condition) { ... } or for (;;) { ... }
- Multi-exit Diamond -> switch (expression) { case 1: ... }

6. DRY RUN TRACING & COMPLEXITY VERIFICATION:
A trace table (or dry-run table) is constructed alongside a flowchart. By walking through sample numbers column-by-column across variables, programmers verify boundary conditions (such as zero, negative values, and large numbers) before touching the keyboard.""",
    "explanationHi": """१. फ्लोचार्ट क्या है और प्रोग्रामिंग में इसका क्या महत्व है?
किसी भी समस्या को कंप्यूटर प्रोग्राम के जरिए हल करने से पहले उसका व्यवस्थित खाका तैयार करना आवश्यक होता है। किसी एल्गोरिदम (Algorithm) या समस्या समाधान की कार्यविधि को ज्यामितीय आकृतियों (Geometric Symbols) और तीरों (Arrows) की सहायता से सचित्र प्रदर्शित करना "फ्लोचार्ट (Flowchart)" कहलाता है।
सरल शब्दों में, जिस प्रकार कोई भवन निर्माता मकान बनाने से पहले उसका नक्शा बनाता है, उसी प्रकार एक कुशल प्रोग्रामर C कोड लिखने से पहले उसका फ्लोचार्ट बनाता है। फ्लोचार्ट बनाने का सबसे बड़ा लाभ यह है कि इससे प्रोग्राम का लॉजिक बिल्कुल शीशे की तरह साफ हो जाता है। यदि लॉजिक में कोई भूल या कमी हो, तो वह कोडिंग से पहले ही पकड़ में आ जाती है, जिससे समय और श्रम की भारी बचत होती है। एल्गोरिदम लिखित शब्दों में होता है जबकि फ्लोचार्ट उसका दृश्य (चित्रमय) रूप होता है, जिसे देखकर कोई भी व्यक्ति प्रोग्राम की पूरी कार्यप्रणाली को कुछ ही सेकंड्स में समझ सकता है।

२. मानक फ्लोचार्ट प्रतीक एवं उनके सटीक कार्य (Standard Flowchart Symbols):
अंतरराष्ट्रीय मानक संगठन (ANSI और ISO) द्वारा फ्लोचार्ट के लिए निम्नलिखित मानक प्रतीक निर्धारित किए गए हैं:
१. टर्मिनल प्रतीक (Terminal - Oval / अंडाकार):
यह आकृति प्रोग्राम की शुरुआत (START) और समाप्ति (STOP / END) को दर्शाती है। प्रत्येक फ्लोचार्ट में केवल एक Start और कम से कम एक Stop टर्मिनल होना अनिवार्य है।
२. इनपुट / आउटपुट प्रतीक (Input/Output - Parallelogram / समानांतर चतुर्भुज):
जब कंप्यूटर में कीबोर्ड से कोई मान लिया जाता है (जैसे READ A, INPUT marks - जो C में scanf होता है) या स्क्रीन पर कोई परिणाम दिखाया जाता है (जैसे PRINT sum, DISPLAY result - जो C में printf होता है), तब समानांतर चतुर्भुज का उपयोग किया जाता है।
३. प्रोसेसिंग प्रतीक (Processing - Rectangle / आयत):
यह गणनाओं, गणितीय फॉर्मूलों और मान निर्धारण (Assignment) को दर्शाता है। उदाहरण के लिए: sum = a + b, count = 1, या area = 3.14 * r * r। आयत में केवल एक तीर अंदर आता है और एक तीर बाहर निकलता है।
४. निर्णय प्रतीक (Decision - Diamond / समचतुर्भुज):
यह किसी शर्त (Condition) की जांच या निर्णय लेने के लिए प्रयुक्त होता है (जैसे: क्या N > 0 है? या क्या आयु >= 18 है?)। इस बॉक्स से हमेशा दो या अधिक रास्ते निकलते हैं जिन पर 'Yes' और 'No' (हाँ / ना) या 'True' और 'False' (सत्य / असत्य) लिखा होता है। यह C भाषा के 'if-else' और लूप्स की शर्तों से सीधे मेल खाता है।
५. प्रवाह रेखाएं (Flowlines - तीर / Arrows):
तीर के निशान प्रोग्राम के चलने की दिशा (Direction of Flow) और निष्पादन के क्रम को दर्शाते हैं। मानक प्रवाह हमेशा ऊपर से नीचे और बाएँ से दाएँ होता है।
६. ऑन-पेज कनेक्टर (On-Page Connector - छोटा वृत्त / Circle):
जब फ्लोचार्ट एक ही पेज पर बहुत बड़ा या उलझा हुआ हो, तो रेखाओं को एक-दूसरे के ऊपर से काटने से बचाने के लिए छोटे वृत्त का उपयोग किया जाता है। वृत्त के अंदर A, B जैसे अक्षर लिखे जाते हैं।
७. ऑफ-पेज कनेक्टर (Off-Page Connector - पंचभुज / Pentagon):
जब फ्लोचार्ट एक पेज से आगे बढ़कर दूसरे पेज पर जाता है, तो दोनों पेजों को आपस में जोड़ने के लिए ऑफ-पेज कनेक्टर का उपयोग होता है।
८. सब-प्रोसेस प्रतीक (Predefined Process - दोहरी खड़ी रेखाओं वाला आयत):
यह किसी पहले से बने फंक्शन या सब-रूटीन को कॉल करने के लिए प्रयोग होता है, जैसे किसी फंक्शन को कॉल करना।

३. फ्लोचार्ट बनाने के आवश्यक नियम एवं सावधानियां:
- फ्लोचार्ट का सामान्य प्रवाह हमेशा ऊपर से नीचे (Top to Bottom) और बाएँ से दाएँ (Left to Right) होना चाहिए।
- हर प्रोसेसिंग बॉक्स (आयत) में केवल एक प्रवेश रेखा और एक निकास रेखा होनी चाहिए।
- निर्णय बॉक्स (डायमंड) से निकलने वाले प्रत्येक रास्ते पर स्पष्ट रूप से 'हाँ/ना' या 'सत्य/असत्य' लिखा होना चाहिए।
- प्रवाह रेखाएं कभी भी एक-दूसरे को काटनी नहीं चाहिए; यदि ऐसा हो तो कनेक्टर्स का उपयोग करें।
- बॉक्स के अंदर लिखी भाषा सरल और स्पष्ट होनी चाहिए (जैसे 'Read A, B' या 'Sum = A + B'), सिंटेक्स की बारीकियां नहीं।

४. चार प्रमुख प्रोग्रामिंग समस्याओं के फ्लोचार्ट और C कोड:
उदाहरण १: सम अथवा विषम संख्या की जांच (Even or Odd Check):
- स्टार्ट (Oval) -> इनपुट N (Parallelogram) -> शर्त: क्या N % 2 == 0? (Diamond)
- यदि हाँ: प्रिंट "Even" -> स्टॉप
- यदि ना: प्रिंट "Odd" -> स्टॉप
C कोड:
```c
if (n % 2 == 0) printf("Even\\n");
else printf("Odd\\n");
```

उदाहरण २: तीन संख्याओं में से सबसे बड़ी संख्या (Largest of 3 Numbers):
- स्टार्ट -> इनपुट A, B, C -> क्या A > B?
  - हाँ: क्या A > C? -> हाँ तो A बड़ा, ना तो C बड़ा।
  - ना: क्या B > C? -> हाँ तो B बड़ा, ना तो C बड़ा।
- स्टॉप।
यह नेस्टेड if-else को दर्शाता है।

उदाहरण ३: 1 से N तक की संख्याओं का योग (Sum of 1 to N using Loop):
- स्टार्ट -> इनपुट N -> sum = 0, i = 1 (Rectangle)
- क्या i <= N? (Diamond)
  - हाँ: sum = sum + i -> i = i + 1 -> वापस शर्त पर जाओ (Loopback Arrow)।
  - ना: प्रिंट sum (Parallelogram) -> स्टॉप।
यह सीधे while लूप या for लूप में बदल जाता है।

५. फ्लोचार्ट से C कोड में सीधा रूपांतरण (Direct Mapping Table):
- स्टार्ट / स्टॉप (अंडाकार) -> int main() { ... return 0; }
- इनपुट (समानांतर चतुर्भुज) -> scanf(\"%d\", &num);
- आउटपुट (समानांतर चतुर्भुज) -> printf(\"%d\", result);
- प्रोसेसिंग (आयत) -> result = a + b;
- निर्णय (डायमंड) -> if (a > b) { ... } else { ... }
- लूप वाली वापसी रेखा -> while (i <= n) { ... } या for loop
- बहु-शाखा निर्णय -> switch (choice) { case 1: ... }

६. ड्राई रन टेबल (Trace Table) द्वारा फ्लोचार्ट की जांच:
फ्लोचार्ट को कंप्यूटर पर चलाने से पहले कागज पर पेन द्वारा विभिन्न इनपुट मान रखकर जांचा जाता है, जिसे ड्राई रन (Dry Run) कहते हैं। जैसे N = 5 रखकर i और sum के मानों को प्रत्येक चक्र में लिखकर यह सुनिश्चित किया जाता है कि एल्गोरिदम हर स्थिति में सही काम कर रहा है।""",
    "realLifeAnalogy": {
        "en": "Think of a flowchart as a GPS Turn-by-Turn Navigation system. The Start oval is your current driveway, and Stop oval is your destination. A straight road is a rectangular Process box. A toll booth is an Input/Output box. A highway fork sign is a Decision Diamond. And a roundabout taking you back is an iterative Loop!",
        "hi": "फ्लोचार्ट को सड़क के जीपीएस नेविगेशन की तरह समझें। स्टार्ट घर है, स्टॉप मंजिल। सीधी सड़क प्रोसेसिंग आयत है। टोल बूथ इनपुट/आउटपुट बॉक्स है। तिराहे का बोर्ड निर्णय डायमंड है, और गोल चक्कर पर घूमना लूप है।"
    },
    "codeExamples": [
        {
            "title": "Largest of Two Numbers (Flowchart to C Implementation)",
            "titleHindi": "दो संख्याओं में बड़ी संख्या ज्ञात करने का C प्रोग्राम",
            "code": """#include <stdio.h>

int main() {
    int num1, num2;
    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);
    
    if (num1 > num2) {
        printf("%d is Greater\\n", num1);
    } else if (num2 > num1) {
        printf("%d is Greater\\n", num2);
    } else {
        printf("Both are Equal\\n");
    }
    return 0;
}""",
            "output": """Enter two numbers: 45 20
45 is Greater""",
            "explanation": "Directly mirrors the flowchart decision diamond and branches.",
            "explanationHindi": "फ्लोचार्ट के निर्णय डायमंड और शाखाओं का सीधा रूपांतरण।"
        }
    ],
    "practicals": [
        {
            "id": "prac-fc-1",
            "title": "Flowchart Loop Implementation: Factorial Calculator",
            "titleHindi": "फ्लोचार्ट लूप आधारित फैक्टोरियल कैलकुलेटर",
            "objective": "Implement an iterative loop derived from a flowchart.",
            "objectiveHindi": "फ्लोचार्ट लूप के आधार पर फैक्टोरियल प्रोग्राम बनाएं।",
            "code": """#include <stdio.h>

int main() {
    int n, i;
    long long fact = 1;
    printf("Enter N: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial = %lld\\n", fact);
    return 0;
}""",
            "expectedOutput": """Enter N: 5
Factorial = 120""",
            "lineByLineExplanation": [
                {"line": "for (i = 1; i <= n; i++)", "noteEn": "Iterates loop from 1 to N.", "noteHi": "1 से N तक लूप चलाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["Oval = Terminal", "Parallelogram = I/O", "Rectangle = Process", "Diamond = Decision", "Arrows = Flow"],
        "hi": ["अंडाकार = स्टार्ट/स्टॉप", "समानांतर चतुर्भुज = इनपुट/आउटपुट", "आयत = प्रोसेस", "डायमंड = निर्णय", "तीर = प्रवाह"]
    },
    "commonPitfalls": {
        "en": ["Using rectangle for I/O.", "Missing Yes/No on diamonds.", "Infinite loops without exit."],
        "hi": ["इनपुट के लिए आयत बनाना।", "डायमंड पर हाँ/ना न लिखना।", "बिना बाहर निकलने की शर्त के अनंत लूप बनाना।"]
    }
}
register_topic(t2)

# ==============================================================================
# TOPIC 3: Data Types & Memory Sizes (डेटा टाइप्स और मेमोरी साइज)
# ==============================================================================
t3 = {
    "id": "data-type",
    "order": 3,
    "title": "Data Types & Memory Sizes",
    "titleHindi": "डेटा टाइप्स और मेमोरी साइज (Data Types)",
    "category": "Basics",
    "summary": "Master C's type system: Primitive types (int, float, double, char, void), type modifiers (signed, unsigned, short, long), byte sizes, ranges, format specifiers, and internal representation.",
    "summaryHindi": "C भाषा के डेटा टाइप्स (int, float, double, char, void), मॉडिफायर्स (signed, unsigned, short, long), मेमोरी आकार, रेंज और फॉर्मेट विनिर्देशकों का संपूर्ण अध्ययन।",
    "readTimeMinutes": 16,
    "explanationEn": """1. WHAT IS A DATA TYPE & WHY IS C STATICALLY TYPED?
In computer science, a Data Type is a formal classification that specifies which type of value a variable can hold, how many bytes of physical RAM memory it occupies, how those bits are encoded internally, and what set of operations can legally be performed upon it. C is a Statically Typed language: every variable must have its data type explicitly declared before use, and that type cannot change at runtime. This provides two huge advantages: exceptional runtime speed (the compiler generates optimal assembly instructions without runtime type inspection overhead) and deterministic memory management.

2. CLASSIFICATION OF DATA TYPES IN C:
The C language type system is organized into three distinct tiers:
1. Fundamental / Primitive (Primary) Types:
Built into the language core: int (whole numbers), char (characters), float (single-precision decimals), double (double-precision decimals), and void (valueless type).
2. Derived Data Types:
Constructed directly from primitive types: Arrays (homogeneous collections), Pointers (memory address holders), and Functions (callable routines).
3. User-Defined Data Types:
Custom types designed by the programmer: struct (heterogeneous records), union (shared memory records), enum (enumerated constants), and typedef aliases.

3. DETAILED BREAKDOWN OF PRIMITIVE TYPES & FORMAT SPECIFIERS:
Let us analyze each core type in detail:
- 'char' (Character):
Occupies strictly 1 byte (8 bits) of memory on every standard platform. Used to store individual characters like 'A', '7', or '$'. In memory, C does not store the visual symbol; it stores the numerical ASCII integer code (e.g., 'A' is stored as binary 01000001, decimal 65). Format specifier: %c. Range: -128 to +127 (signed) or 0 to 255 (unsigned).
- 'int' (Integer):
Used to store whole numbers without any fractional component (e.g., 42, -500, 100000). On modern 32-bit and 64-bit operating systems, an int occupies 4 bytes (32 bits). Format specifiers: %d (signed decimal) or %i. Range: -2,147,483,648 to +2,147,483,647.
- 'float' (Single-Precision Floating Point):
Stores real numbers with fractional decimal points (e.g., 3.14159, -98.6). Occupies 4 bytes (32 bits) formatted internally according to the IEEE-754 standard (1 sign bit, 8 exponent bits, 23 mantissa bits). Provides approximately 6 to 7 decimal digits of precision. Format specifier: %f.
- 'double' (Double-Precision Floating Point):
Occupies 8 bytes (64 bits) formatted under IEEE-754 (1 sign bit, 11 exponent bits, 52 mantissa bits). Provides roughly 15 to 17 decimal digits of precision, making it the preferred standard for scientific and financial computation. Format specifiers: %lf (in scanf) or %f/%lf (in printf).
- 'void' (Empty / Valueless):
Indicates the absence of value or type. Used as a return type for functions that produce no result (void display()), as an empty parameter list (int main(void)), or as a generic memory pointer (void *ptr). You cannot declare a variable of type void (e.g., void x; is a compilation error).

4. TYPE MODIFIERS IN C:
C provides four powerful keywords called Type Modifiers that alter the size, range, or signedness of base types:
1. 'signed': Allows both positive and negative values using two's complement binary representation (default for int).
2. 'unsigned': Disallows negative numbers, shifting the entire range into positive integers and doubling the maximum capacity (e.g., unsigned int spans 0 to 4,294,967,295). Format specifier: %u.
3. 'short': Reduces the memory footprint. A 'short int' occupies 2 bytes (16 bits) spanning -32,768 to +32,767. Format specifier: %hd.
4. 'long': Expands the memory range. A 'long int' occupies 4 or 8 bytes depending on OS (%ld). In C99, 'long long int' provides at least 8 bytes (64 bits, %lld) spanning from -9 quintillion to +9 quintillion!

5. SIZEOF OPERATOR & LIMITS HEADER FILES:
The compile-time operator sizeof yields the exact byte count of any type or variable:
```c
printf(\"Size of int: %zu bytes\\n\", sizeof(int));
printf(\"Size of double: %zu bytes\\n\", sizeof(double));
```
// 6. SIZEOF OPERATOR & LIMITS HEADER FILES:
The compile-time operator sizeof yields the exact byte count of any type or variable:
```c
printf(\"Size of int: %zu bytes\\n\", sizeof(int));
printf(\"Size of double: %zu bytes\\n\", sizeof(double));
```
Standard header file <limits.h> defines architecture-specific limits (INT_MIN, INT_MAX, CHAR_BIT, ULONG_MAX), while <float.h> defines floating-point tolerances (FLT_EPSILON, DBL_MAX).

7. EXACT-WIDTH TYPES IN C99 (<stdint.h>):
Because standard types like 'int' and 'long' can vary between 16-bit, 32-bit, and 64-bit microcontrollers and servers, C99 introduced portable fixed-width integer types:
- int8_t and uint8_t: strictly 8 bits (1 byte)
- int16_t and uint16_t: strictly 16 bits (2 bytes)
- int32_t and uint32_t: strictly 32 bits (4 bytes)
- int64_t and uint64_t: strictly 64 bits (8 bytes)
Embedded systems and networking protocols always prefer these exact-width definitions for predictable memory layout.

8. TYPE CASTING (IMPLICIT VS EXPLICIT):
Type casting converts data from one type to another. 
- Implicit Casting (Type Promotion / Coercion): Performed automatically by the compiler during arithmetic operations following hierarchy: char -> short -> int -> unsigned -> long -> float -> double. For example, in 5 + 2.5, integer 5 is promoted to double 5.0, resulting in 7.5.
- Explicit Casting: Deliberately instructed by the developer using syntax (type)expression. For instance, integer division 5 / 2 yields 2. By writing (float)5 / 2, the operation evaluates in floating-point precision yielding 2.5. Always be mindful of precision truncation when converting from floating-point to integer types.""",
    "explanationHi": """१. डेटा टाइप क्या है और C भाषा में इसका क्या महत्व है?
कंप्यूटर प्रोग्रामिंग में डेटा टाइप (Data Type) यह निर्धारित करता है कि कोई वेरिएबल किस प्रकार का मान (संख्या, अक्षर, दशमलव) स्टोर करेगा, वह कंप्यूटर की रैम (RAM) में कितने बाइट्स जगह घेरेगा, और उस पर कौन-से गणितीय या तार्किक ऑपरेशन किए जा सकते हैं। 
C एक स्टैटिकली टाइप्ड (Statically Typed) भाषा है। इसका अर्थ यह है कि C में किसी भी वेरिएबल का उपयोग करने से पहले उसका डेटा टाइप बताना अनिवार्य होता है, और एक बार घोषित करने के बाद उसका टाइप बदला नहीं जा सकता। इससे C प्रोग्राम अत्यधिक तीव्र गति से चलते हैं क्योंकि कम्पाइलर को रनटाइम पर यह नहीं सोचना पड़ता कि मेमोरी में क्या रखा है। यह मेमोरी का कुशल प्रबंधन और प्रकार सुरक्षा (Type Safety) सुनिश्चित करता है।

२. C भाषा में डेटा टाइप्स का संपूर्ण वर्गीकरण:
C में डेटा टाइप्स को तीन मुख्य श्रेणियों में बांटा गया है:
१. प्राइमरी / प्रिमिटिव डेटा टाइप्स (Primitive Data Types):
ये C भाषा में मूल रूप से पहले से निर्मित होते हैं:
- int: पूर्णांक संख्याएं (बिना दशमलव वाली पूर्ण संख्याएं)
- char: सिंगल कैरेक्टर (अक्षर या विशेष चिह्न)
- float: दशमलव वाली संख्याएं (एकल परिशुद्धता)
- double: दशमलव वाली संख्याएं (दोगुनी परिशुद्धता)
- void: शून्य मान या खाली प्रकार
२. डिराइव्ड डेटा टाइप्स (Derived Data Types):
जो प्रिमिटिव टाइप्स की सहायता से बनाए जाते हैं:
- Arrays (ऐरे): समान प्रकार के डेटा का अनुक्रमिक संग्रह
- Pointers (पॉइंटर्स): मेमोरी एड्रेस स्टोर करने वाले चर
- Functions (फंक्शन्स): निष्पादन योग्य कोड के मॉड्यूलर ब्लॉक
३. यूजर-डिफाइंड डेटा टाइप्स (User-Defined Data Types):
जो प्रोग्रामर अपनी आवश्यकतानुसार खुद बनाता है:
- struct (स्ट्रक्चर): अलग-अलग प्रकार के डेटा का समूह
- union (यूनियन): एक ही साझा मेमोरी का उपयोग करने वाले चरों का समूह
- enum (इन्यूम): नामित पूर्णांक स्थिरांकों का समूह
- typedef: किसी मौजूदा टाइप को नया सरल नाम देना

३. प्रिमिटिव डेटा टाइप्स का विस्तृत अध्ययन:
- 'char' (कैरेक्टर):
यह मेमोरी में ठीक 1 बाइट (8 बिट्स) स्थान लेता है। इसमें एक अक्षर जैसे 'A', 'z', या '9' रखा जाता है। मेमोरी में यह सीधे अक्षर नहीं रखता बल्कि उसका ASCII कोड स्टोर करता है (जैसे 'A' का मान 65 है, 'a' का मान 97 है, और '0' का मान 48 है)। इसका फॉर्मेट विनिर्देशक '%c' है।
- 'int' (पूर्णांक):
यह बिना दशमलव वाली पूर्ण संख्याएं स्टोर करता है (जैसे 10, -50, 1000)। 32-बिट और 64-बिट सिस्टम पर यह 4 बाइट्स (32 बिट्स) स्थान लेता है। इसकी रेंज -2,147,483,648 से +2,147,483,647 तक होती है। इसका फॉर्मेट विनिर्देशक '%d' या '%i' है।
- 'float' (दशमलव संख्या):
यह दशमलव बिंदु वाली संख्याएं (जैसे 3.14, 98.6) स्टोर करता है। यह 4 बाइट्स लेता है और लगभग 6 से 7 अंकों तक की दशमलव शुद्धता देता है। इसका फॉर्मेट विनिर्देशक '%f' है।
- 'double' (दोगुनी परिशुद्धता दशमलव):
यह 8 बाइट्स (64 बिट्स) स्थान लेता है और लगभग 15 से 17 अंकों तक की उच्च परिशुद्धता प्रदान करता है। वैज्ञानिक और वित्तीय गणनाओं में इसका उपयोग होता है। इसका फॉर्मेट विनिर्देशक '%lf' (scanf में) होता है।
- 'void' (शून्य प्रकार):
इसका अर्थ 'कुछ नहीं' है। इसका उपयोग उन फंक्शन्स के लिए होता है जो कोई मान नहीं लौटाते (void printMessage()) या जेनेरिक पॉइंटर्स (void *ptr) के लिए होता है। void प्रकार का कोई वेरिएबल नहीं बनाया जा सकता।

४. डेटा टाइप मॉडिफायर्स (Modifiers) और उनकी क्षमताएं:
C भाषा में चार विशेष कीवर्ड्स होते हैं जो मूल प्रकारों का आकार या सीमा बदलते हैं:
१. signed: धनात्मक और ऋणात्मक दोनों मानों की अनुमति देता है (int का डिफ़ॉल्ट रूप)।
२. unsigned: केवल 0 और धनात्मक मान स्टोर करता है, जिससे अधिकतम धनात्मक क्षमता दोगुनी हो जाती है (unsigned int: 0 से 4,294,967,295, फॉर्मेट %u)।
३. short: मेमोरी का आकार घटाता है (short int = 2 बाइट्स, रेंज -32768 से +32767, फॉर्मेट %hd)।
४. long: आकार बढ़ाता है (long int = 4 या 8 बाइट्स, long long int = कम से कम 8 बाइट्स यानी 64 बिट्स, फॉर्मेट %lld)।

५. आधुनिक C99 में निश्चित चौड़ाई वाले डेटा प्रकार (<stdint.h>):
विभिन्न सिस्टम्स पर int का आकार 2 बाइट्स या 4 बाइट्स हो सकता है। इसलिए C99 में निश्चित चौड़ाई वाले पोर्टेबल प्रकार जोड़े गए:
- int8_t व uint8_t: ठीक 8 बिट्स (1 बाइट)
- int16_t व uint16_t: ठीक 16 बिट्स (2 बाइट्स)
- int32_t व uint32_t: ठीक 32 बिट्स (4 बाइट्स)
- int64_t व uint64_t: ठीक 64 बिट्स (8 बाइट्स)
नेटवर्किंग और एम्बेडेड डिवाइसेज में इन्हीं का प्रयोग किया जाता है ताकि हर मशीन पर मेमोरी का आकार समान रहे।

६. sizeof ऑपरेटर और टाइप कास्टिंग की अनिवार्यता:
'sizeof' ऑपरेटर से हम किसी भी डेटा टाइप का बाइट्स में आकार ज्ञात कर सकते हैं (जैसे sizeof(int) = 4 बाइट्स, sizeof(double) = 8 बाइट्स)।
टाइप कास्टिंग दो प्रकार की होती है:
- अंतर्निहित टाइप कास्टिंग (Implicit Casting): कम्पाइलर द्वारा स्वतः छोटे प्रकार को बड़े प्रकार में बदलना (जैसे int + float मिलकर float बन जाना)।
- स्पष्ट टाइप कास्टिंग (Explicit Casting): प्रोग्रामर द्वारा जबरन बदलना, जैसे '(float)5 / 2' लिखने पर 2.500000 प्राप्त होना, जबकि '5 / 2' लिखने पर केवल 2 प्राप्त होता है।""",
    "realLifeAnalogy": {
        "en": "Think of data types as measuring containers in a kitchen. A teaspoon holds 1 gram—a char. A coffee cup holds 250ml—an int. A measuring jug with decimal milliliter lines—a float. A high-precision laboratory beaker—a double. And an empty tray—a void. Pouring a gallon into a teaspoon overflows, just like integer overflow!",
        "hi": "डेटा टाइप्स रसोई के बर्तनों जैसे हैं। छोटी चम्मच char है (1 बाइट), चाय का कप int है (4 बाइट), दशमलव पैमाना वाला जग float है, वैज्ञानिक फ्लास्क double है, और खाली ट्रे void है। अधिक पानी डालने पर बर्तन छलक जाता है जैसे ओवरफ्लो।"
    },
    "codeExamples": [
        {
            "title": "Comprehensive Data Type Sizes & Specifiers",
            "titleHindi": "सभी डेटा टाइप्स के मेमोरी साइज और फॉर्मेट विनिर्देशक",
            "code": """#include <stdio.h>
#include <limits.h>

int main() {
    char ch = 'K';
    int age = 22;
    unsigned int distance = 4000000000U;
    float pi = 3.14159f;
    double exactPi = 3.141592653589793;
    
    printf("char: '%c' | Size: %zu byte | ASCII: %d\\n", ch, sizeof(ch), ch);
    printf("int: %d | Size: %zu bytes\\n", age, sizeof(age));
    printf("unsigned int: %u | Size: %zu bytes\\n", distance, sizeof(distance));
    printf("float: %.5f | Size: %zu bytes\\n", pi, sizeof(pi));
    printf("double: %.15lf | Size: %zu bytes\\n", exactPi, sizeof(exactPi));
    printf("INT_MAX: %d, INT_MIN: %d\\n", INT_MAX, INT_MIN);
    
    return 0;
}""",
            "output": """char: 'K' | Size: 1 byte | ASCII: 75
int: 22 | Size: 4 bytes
unsigned int: 4000000000 | Size: 4 bytes
float: 3.14159 | Size: 4 bytes
double: 3.141592653589793 | Size: 8 bytes
INT_MAX: 2147483647, INT_MIN: -2147483648""",
            "explanation": "Demonstrates sizes, specifiers, and limits.",
            "explanationHindi": "आकार, विनिर्देशक और सीमाओं को दिखाता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-dt-1",
            "title": "Type Casting and Precision",
            "titleHindi": "टाइप कास्टिंग और परिशुद्धता",
            "objective": "Understand explicit type casting in division.",
            "objectiveHindi": "विभाजन में एक्सप्लिसिट टाइप कास्टिंग को समझें।",
            "code": """#include <stdio.h>

int main() {
    int total = 485, max = 600;
    float pct = ((float)total / max) * 100.0f;
    printf("Percentage: %.2f%%\\n", pct);
    return 0;
}""",
            "expectedOutput": """Percentage: 80.83%""",
            "lineByLineExplanation": [
                {"line": "((float)total / max)", "noteEn": "Casts total to float to preserve decimals.", "noteHi": "दशमलव बचाने के लिए फ्लोट में कास्ट करता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["char is 1 byte.", "int is 4 bytes.", "float is 4 bytes, double is 8 bytes.", "sizeof returns byte size."],
        "hi": ["char 1 बाइट है।", "int 4 बाइट है।", "float 4 और double 8 बाइट्स है।", "sizeof बाइट्स लौटाता है।"]
    },
    "commonPitfalls": {
        "en": ["Integer division 5/2 giving 2.", "Wrong format specifiers."],
        "hi": ["5/2 का उत्तर 2 आना।", "गलत फॉर्मेट विनिर्देशक लगाना।"]
    }
}
register_topic(t3)

# ==============================================================================
# TOPIC 4: Logic: 3-Digit Number Digits Extraction (name = logic)
# (तीन अंकों की संख्या से पहली, दूसरी और तीसरी संख्या निकालना)
# ==============================================================================
t4 = {
    "id": "three-digit-logic",
    "order": 4,
    "title": "Logic: 3-Digit Number Digits Extraction",
    "titleHindi": "तीन अंकों की संख्या से पहली, दूसरी और तीसरी संख्या निकालना (Logic)",
    "category": "Basics",
    "summary": "Master fundamental arithmetic logic using integer division (/) and modulus (%) operators to extract 1st, 2nd, and 3rd digits of any 3-digit number. Build sum of digits, number reversal, and Armstrong number programs.",
    "summaryHindi": "पूर्णांक भाग (/) और शेषफल (%) ऑपरेटरों के गणितीय लॉजिक से 3 अंकों की संख्या से पहली, दूसरी और तीसरी संख्या निकालना सीखें। अंकों का योग, उल्टा करना और आर्मस्ट्रांग संख्या की संपूर्ण कोडिंग।",
    "readTimeMinutes": 18,
    "explanationEn": """1. THE CORE MATHEMATICAL FOUNDATION: QUOTIENT (/) VS REMAINDER (%):
In computer programming, digit manipulation is the premier exercise for building algorithmic reasoning and logical thinking. Every number manipulation algorithm—from calculating digital sums, checking palindromes, reversing numbers, to cryptographic hashing—relies on understanding two fundamental integer operators:
1. The Division Operator (/):
When two integer variables are divided in C, the fractional decimal component is completely discarded (truncated toward zero). The operator returns exclusively the integer QUOTIENT (भागफल).
Examples:
385 / 100 = 3 (The hundreds digit is cleanly separated!)
385 / 10 = 38 (The last digit is chopped off!)
749 / 100 = 7
2. The Modulus Operator (%):
The modulus operator calculates and returns the integer REMAINDER (शेषफल) left over after division.
Examples:
385 % 10 = 5 (The last unit digit is isolated!)
385 % 100 = 85 (The hundreds digit is dropped, leaving the last two digits!)
749 % 10 = 9

2. STEP-BY-STEP FORMULAS FOR EXTRACTING EACH DIGIT:
Let us suppose the user enters any 3-digit integer: num (where num is between 100 and 999, e.g., num = 749 or num = 385).
We want to extract three separate variables:
- first_digit (d1): The Hundreds place digit (पहली संख्या)
- second_digit (d2): The Tens place digit (दूसरी संख्या / बीच का अंक)
- third_digit (d3): The Units place digit (तीसरी संख्या / अंतिम अंक)

Formula for the First Digit (Hundreds Place / पहली संख्या):
```c
first_digit = num / 100;
```
Mathematical Proof: In base-10 positional notation, any 3-digit number is represented as:
num = (d1 * 100) + (d2 * 10) + d3
When divided by 100 in integer arithmetic:
num / 100 = ((d1 * 100) + (d2 * 10) + d3) / 100
Because (d2 * 10 + d3) is strictly less than 100, its division by 100 yields 0.
Therefore, num / 100 = d1.
For num = 749: 749 / 100 = 7. Exactly the first digit!

Formula for the Third Digit (Units Place / तीसरी संख्या / अंतिम अंक):
```c
third_digit = num % 10;
```
Mathematical Proof: The units digit is the remainder when dividing the entire number by 10:
num = (Quotient * 10) + Remainder
749 = (74 * 10) + 9.
Therefore, 749 % 10 = 9. Exactly the last digit!

Formulas for the Second Digit (Tens Place / दूसरी संख्या / बीच का अंक):
There are two elegant mathematical methods to extract the middle digit:
Method A (Divide by 10 first, then Modulo 10):
```c
second_digit = (num / 10) % 10;
```
Step 1: num / 10 strips away the last unit digit:
749 / 10 = 74.
Step 2: 74 % 10 isolates the units digit of 74, which was originally the tens digit:
74 % 10 = 4! Exactly the second digit!

Method B (Modulo 100 first, then Divide by 10):
```c
second_digit = (num % 100) / 10;
```
Step 1: num % 100 strips away the hundreds digit:
749 % 100 = 49.
Step 2: 49 / 10 isolates the tens digit:
49 / 10 = 4! Exactly the second digit!

3. COMPREHENSIVE DRY-RUN TRACE TABLE:
Let us trace these formulas across diverse test numbers:
| Input (num) | d1 = num / 100 | d2 = (num / 10) % 10 | d3 = num % 10 | Sum (d1+d2+d3) | Reversed ((d3*100)+(d2*10)+d1) |
|---|---|---|---|---|---|
| 385 | 385 / 100 = 3 | (385 / 10)%10 = 38%10 = 8 | 385 % 10 = 5 | 3 + 8 + 5 = 16 | 500 + 80 + 3 = 583 |
| 749 | 749 / 100 = 7 | (749 / 10)%10 = 74%10 = 4 | 749 % 10 = 9 | 7 + 4 + 9 = 20 | 900 + 40 + 7 = 947 |
| 102 | 102 / 100 = 1 | (102 / 10)%10 = 10%10 = 0 | 102 % 10 = 2 | 1 + 0 + 2 = 3 | 200 + 0 + 1 = 201 |
| 999 | 999 / 100 = 9 | (999 / 10)%10 = 99%10 = 9 | 999 % 10 = 9 | 9 + 9 + 9 = 27 | 900 + 90 + 9 = 999 |
| 153 | 153 / 100 = 1 | (153 / 10)%10 = 15%10 = 5 | 153 % 10 = 3 | 1 + 5 + 3 = 9 | 300 + 50 + 1 = 351 |

4. CORE APPLICATIONS OF 3-DIGIT LOGIC IN C PROGRAMMING:
Once d1, d2, and d3 are separated into individual variables, programmers can construct powerful classic programs:
1. Sum of Digits:
```c
int sum = d1 + d2 + d3;
```
2. Product of Digits:
```c
int product = d1 * d2 * d3;
```
3. Reversing a 3-Digit Number:
To reverse the number, the third digit becomes the hundreds place, the second digit remains the tens place, and the first digit becomes the units place:
```c
int reversed = (d3 * 100) + (d2 * 10) + d1;
```
4. Palindrome Number Verification:
A number is a palindrome if it reads identical forward and backward (e.g., 121, 545, 989). In a 3-digit number, a number is a palindrome if and only if the first digit equals the third digit:
```c
if (d1 == d3) // or if (reversed == num)
    printf("Palindrome Number!\\n");
```
5. Armstrong Number (Narcissistic Number) Verification:
A 3-digit number is an Armstrong number if the sum of the cubes of its digits equals the original number itself:
num == (d1 * d1 * d1) + (d2 * d2 * d2) + (d3 * d3 * d3)
For example, in 153:
1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153! (Armstrong Number!)
There are only four 3-digit Armstrong numbers in mathematics: 153, 370, 371, and 407.

5. INPUT VALIDATION & HANDLING EDGE CASES:
To ensure industrial robustness, your C program should always validate that the user actually supplied a genuine 3-digit number before performing arithmetic:
```c
if (num >= 100 && num <= 999) {
    // Valid 3-digit positive number
} else {
    printf("Error: Please enter a valid 3-digit number between 100 and 999.\\n");
}
```
If negative numbers are permitted (e.g., -749), take the absolute value first using abs(num) or num = -num so modulus does not yield negative digit remainders.""",
    "explanationHi": """१. मूल गणितीय सिद्धांत: भागफल (/) बनाम शेषफल (%):
प्रोग्रामिंग में संख्याओं के अंकों (Digits) को अलग-अलग करना लॉजिक बिल्डिंग (Logic Building) का सबसे पहला और महत्वपूर्ण अभ्यास है। चाहे किसी संख्या के अंकों का योग निकालना हो, संख्या को उल्टा करना हो, पैलिंड्रोम चेक करना हो, या आर्मस्ट्रांग संख्या की जांच करनी हो—यह पूरा लॉजिक दो बुनियादी अंकगणितीय ऑपरेटरों पर आधारित होता है:
१. पूर्णांक विभाजन ऑपरेटर (Division Operator - /):
C भाषा में जब दो पूर्णांकों को भाग दिया जाता है, तो दशमलव के बाद का भाग हट जाता है और परिणाम में केवल पूर्णांक भागफल (Quotient) बचता है।
उदाहरण:
385 / 100 = 3 (सैकड़े का अंक सीधा बाहर निकल आया!)
385 / 10 = 38 (अंतिम इकाई अंक कट गया!)
749 / 100 = 7 (पहला अंक अलग हो गया!)
२. मॉड्यूलस ऑपरेटर (Modulus Operator - %):
यह ऑपरेटर भाग देने के बाद बचा हुआ शेषफल (Remainder) लौटाता है।
उदाहरण:
385 % 10 = 5 (अंतिम इकाई अंक बाहर निकल आया!)
385 % 100 = 85 (सैकड़े का अंक कट गया, पीछे के दो अंक बचे!)
749 % 10 = 9 (अंतिम इकाई अंक मिल गया!)

२. तीन अंकों की संख्या से प्रत्येक अंक निकालने के सटीक फॉर्मूले:
मान लीजिए यूजर ने कोई तीन अंकों की संख्या 'num' दर्ज की (जैसे num = 749 या 385)।
हमें तीन अलग-अलग वेरिएबल्स निकालने हैं:
- पहली संख्या (First Digit / सैकड़े का अंक): d1
- दूसरी संख्या (Second Digit / दहाई का अंक / बीच का अंक): d2
- तीसरी संख्या (Third Digit / इकाई का अंक / अंतिम अंक): d3

पहला अंक (d1) निकालने का फॉर्मूला:
```c
d1 = num / 100;
```
तर्क: संख्या 749 में कितने 100 समाए हैं? 749 को 100 से भाग देने पर पूर्णांक भागफल 7 आता है। अतः 'num / 100' से हमेशा पहला अंक मिलता है।

तीसरा अंक (d3) निकालने का फॉर्मूला:
```c
d3 = num % 10;
```
तर्क: किसी भी संख्या को 10 से भाग देने पर जो शेषफल बचता है, वह हमेशा उस संख्या का अंतिम अंक होता है। 749 % 10 = 9। अतः 'num % 10' से हमेशा अंतिम (तीसरा) अंक मिलता है।

दूसरा अंक (d2 / बीच का अंक) निकालने के दो तरीके:
विधि A (पहले 10 से भाग, फिर 10 से शेषफल):
```c
d2 = (num / 10) % 10;
```
चरण १: 749 / 10 = 74 (अंतिम इकाई अंक 9 हट गया, केवल 74 बचा)।
चरण २: 74 % 10 = 4 (74 को 10 से भाग देने पर शेषफल 4 बचा, जो कि मूल संख्या का बीच का अंक है!)।

विधि B (पहले 100 से शेषफल, फिर 10 से भाग):
```c
d2 = (num % 100) / 10;
```
चरण १: 749 % 100 = 49 (सैकड़े का अंक 7 हट गया, पीछे 49 बचा)।
चरण २: 49 / 10 = 4 (49 को 10 से भाग देने पर भागफल 4 आया!)।

३. स्टेप-बाय-स्टेप ड्राई-रन तालिका (Dry Run Trace Table):
आइए विभिन्न संख्याओं पर इन फॉर्मूलों का परीक्षण करें:
| इनपुट (num) | d1 = num / 100 | d2 = (num / 10) % 10 | d3 = num % 10 | अंकों का योग | उल्टी संख्या |
|---|---|---|---|---|---|
| 385 | 385 / 100 = 3 | 38 % 10 = 8 | 385 % 10 = 5 | 3 + 8 + 5 = 16 | 583 |
| 749 | 749 / 100 = 7 | 74 % 10 = 4 | 749 % 10 = 9 | 7 + 4 + 9 = 20 | 947 |
| 102 | 102 / 100 = 1 | 10 % 10 = 0 | 102 % 10 = 2 | 1 + 0 + 2 = 3 | 201 |
| 153 | 153 / 100 = 1 | 15 % 10 = 5 | 153 % 10 = 3 | 1 + 5 + 3 = 9 | 351 |

४. 3-अंकों के लॉजिक के व्यावहारिक अनुप्रयोग:
१. अंकों का योग (Sum of Digits):
sum = d1 + d2 + d3;
(जैसे 749 के लिए: 7 + 4 + 9 = 20)।
२. अंकों का गुणनफल (Product of Digits):
product = d1 * d2 * d3;
(जैसे 749 के लिए: 7 * 4 * 9 = 252)।
३. उल्टी संख्या बनाना (Reversed Number):
तीसरे अंक को 100 से गुणा करें, दूसरे अंक को 10 से, और पहले अंक को जोड़ दें:
reversed = (d3 * 100) + (d2 * 10) + d1;
(जैसे 749 का उल्टा: 9*100 + 4*10 + 7 = 947)।
४. पैलिंड्रोम संख्या (Palindrome Number):
यदि संख्या को उल्टा करने पर भी वही संख्या रहे (जैसे 121, 545, 989)। 3 अंकों में यदि पहला अंक और तीसरा अंक बराबर हो (d1 == d3), तो संख्या पैलिंड्रोम होती है।
५. आर्मस्ट्रांग संख्या (Armstrong Number):
यदि तीनों अंकों के घनों (Cubes) का योग मूल संख्या के बराबर हो:
if ((d1 * d1 * d1) + (d2 * d2 * d2) + (d3 * d3 * d3) == num)
गणित में 3 अंकों की केवल 4 आर्मस्ट्रांग संख्याएं हैं: 153, 370, 371 और 407।
(उदाहरण 153: 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153!)
६. सबसे बड़ा अंक ज्ञात करना (Largest Digit):
if (d1 >= d2 && d1 >= d3) max = d1;
else if (d2 >= d3) max = d2;
else max = d3;
७. पहले और तीसरे अंक की अदला-बदली:
new_num = (d3 * 100) + (d2 * 10) + d1;

५. इनपुट वैलिडेशन एवं सुरक्षा उपाय:
किसी भी प्रोग्राम में गणना करने से पहले यूजर के इनपुट की जांच करना आवश्यक है:
```c
if (num >= 100 && num <= 999) {
    // मान्य 3 अंकों की संख्या
} else {
    printf("त्रुटि: कृपया 100 से 999 के बीच की तीन अंकों की संख्या दर्ज करें।\\n");
}
```
यदि संख्या ऋणात्मक (-749) हो सकती है, तो पहले abs(num) द्वारा उसे धनात्मक बना लें ताकि मॉड्यूलस ऑपरेटर सही धनात्मक अंक दे।""",
    "realLifeAnalogy": {
        "en": "Think of a 3-digit number like a 3-wheel combination lock. Dividing by 100 reads the left wheel. Modulo 10 reads the right wheel. Dividing by 10 then modulo 10 reads the middle wheel.",
        "hi": "3 अंकों की संख्या 3-पहियों वाले नंबर लॉक जैसी है। 100 से भाग देने पर बायाँ पहिया मिलता है, 10 से शेषफल पर दायाँ पहिया, और 10 से भाग देकर 10 से शेषफल पर बीच का पहिया मिलता है।"
    },
    "codeExamples": [
        {
            "title": "Complete 3-Digit Extraction, Sum, Reverse & Armstrong Check",
            "titleHindi": "3-अंकों के निष्कर्षण, योग, उल्टा करने और आर्मस्ट्रांग का संपूर्ण C प्रोग्राम",
            "code": """#include <stdio.h>

int main() {
    int num, d1, d2, d3;
    int sum, reversed, armstrongSum;
    
    printf("Enter a 3-digit number (100-999): ");
    scanf("%d", &num);
    
    if (num < 100 || num > 999) {
        printf("Error: Not a 3-digit number!\\n");
        return 1;
    }
    
    d1 = num / 100;
    d2 = (num / 10) % 10;
    d3 = num % 10;
    
    sum = d1 + d2 + d3;
    reversed = (d3 * 100) + (d2 * 10) + d1;
    armstrongSum = (d1 * d1 * d1) + (d2 * d2 * d2) + (d3 * d3 * d3);
    
    printf("1st Digit: %d, 2nd Digit: %d, 3rd Digit: %d\\n", d1, d2, d3);
    printf("Sum of Digits: %d\\n", sum);
    printf("Reversed: %d\\n", reversed);
    printf("Armstrong: %s\\n", (armstrongSum == num) ? "YES" : "NO");
    printf("Palindrome: %s\\n", (d1 == d3) ? "YES" : "NO");
    
    return 0;
}""",
            "output": """Enter a 3-digit number (100-999): 153
1st Digit: 1, 2nd Digit: 5, 3rd Digit: 3
Sum of Digits: 9
Reversed: 351
Armstrong: YES
Palindrome: NO""",
            "explanation": "Extracts 1st, 2nd, and 3rd digits, validates input, calculates sum, reverse, Armstrong and Palindrome.",
            "explanationHindi": "पहली, दूसरी, तीसरी संख्या निकालता है, योग, उल्टा और आर्मस्ट्रांग की जांच करता है।"
        }
    ],
    "practicals": [
        {
            "id": "prac-td-1",
            "title": "Swap First and Last Digits",
            "titleHindi": "पहले और आखिरी अंक को बदलना",
            "objective": "Swap 1st and 3rd digits of a 3-digit integer.",
            "objectiveHindi": "3-अंकों के पहले और तीसरे अंक को आपस में बदलें।",
            "code": """#include <stdio.h>

int main() {
    int num = 742;
    int d1 = num / 100;
    int d2 = (num / 10) % 10;
    int d3 = num % 10;
    int swapped = (d3 * 100) + (d2 * 10) + d1;
    printf("Original: %d, Swapped: %d\\n", num, swapped);
    return 0;
}""",
            "expectedOutput": """Original: 742, Swapped: 247""",
            "lineByLineExplanation": [
                {"line": "(d3 * 100) + (d2 * 10) + d1", "noteEn": "Reconstructs swapped integer.", "noteHi": "अदला-बदली करके नया नंबर बनाता है।"}
            ]
        }
    ],
    "keyPoints": {
        "en": ["1st digit = num / 100", "2nd digit = (num / 10) % 10", "3rd digit = num % 10", "Reversed = (d3*100)+(d2*10)+d1"],
        "hi": ["पहला अंक = num / 100", "दूसरा अंक = (num / 10) % 10", "तीसरा अंक = num % 10", "उल्टा = (d3*100)+(d2*10)+d1"]
    },
    "commonPitfalls": {
        "en": ["Using % instead of / for first digit.", "Using pow() with float errors."],
        "hi": ["पहले अंक के लिए % लगाना।", "pow() में फ्लोट की अशुद्धि होना।"]
    }
}
register_topic(t4)
print("Topics 1-4 registered successfully.")
