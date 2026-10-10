#!/usr/bin/env python3
# Generator for 520 C Programming questions (13 topics x 40 questions: 20 easy + 20 hard)
import json

raw_banks = {}

def add_topic(tid, easy_qs, hard_qs):
    raw_banks[tid] = {
        "easy": easy_qs,
        "hard": hard_qs
    }

# -------------------------------------------------------------
# TOPIC 1: program-structure (Program Structure)
# -------------------------------------------------------------
ps_easy = [
    {
        "id": "ps-e1",
        "question": "Who developed the C programming language?",
        "questionHindi": "C प्रोग्रामिंग भाषा का विकास किसने किया था?",
        "options": ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Ken Thompson"],
        "correctIndex": 1,
        "explanation": "Dennis Ritchie created C in 1972 at AT&T Bell Laboratories.",
        "explanationHindi": "डेनिस रिची ने 1972 में बेल लैब्स में C भाषा का निर्माण किया था।"
    },
    {
        "id": "ps-e2",
        "question": "What is the mandatory entry point of every standard C program?",
        "questionHindi": "प्रत्येक C प्रोग्राम का निष्पादन किस फंक्शन से अनिवार्य रूप से शुरू होता है?",
        "options": ["start()", "init()", "main()", "run()"],
        "correctIndex": 2,
        "explanation": "Execution of every C program begins at the first line of main().",
        "explanationHindi": "हर C प्रोग्राम का निष्पादन हमेशा main() फंक्शन से शुरू होता है।"
    },
    {
        "id": "ps-e3",
        "question": "Which symbol is used at the beginning of preprocessor directives in C?",
        "questionHindi": "C भाषा में प्रीप्रोसेसर निर्देशों के आरंभ में कौन-सा चिह्न लगाया जाता है?",
        "options": ["$", "#", "@", "&"],
        "correctIndex": 1,
        "explanation": "Preprocessor directives like #include and #define begin with the hash (#) symbol.",
        "explanationHindi": "प्रीप्रोसेसर निर्देश हमेशा हैश (#) चिह्न से प्रारंभ होते हैं।"
    },
    {
        "id": "ps-e4",
        "question": "Which header file is required for printf() and scanf()?",
        "questionHindi": "printf() और scanf() का उपयोग करने के लिए कौन-सी हेडर फाइल आवश्यक है?",
        "options": ["<stdlib.h>", "<conio.h>", "<stdio.h>", "<math.h>"],
        "correctIndex": 2,
        "explanation": "stdio.h stands for Standard Input Output header file.",
        "explanationHindi": "<stdio.h> का अर्थ स्टैंडर्ड इनपुट आउटपुट हेडर फाइल है।"
    },
    {
        "id": "ps-e5",
        "question": "Every standard statement in C must terminate with which character?",
        "questionHindi": "C में प्रत्येक सामान्य स्टेटमेंट के अंत में कौन-सा विराम चिह्न अनिवार्य है?",
        "options": ["Colon (:)", "Period (.)", "Semicolon (;)", "Comma (,)"],
        "correctIndex": 2,
        "explanation": "In C, every instruction ends with a semicolon (;).",
        "explanationHindi": "C में प्रत्येक निर्देश सेमीकोलन (;) पर समाप्त होता है।"
    },
    {
        "id": "ps-e6",
        "question": "What does 'return 0;' at the end of main() signal to the operating system?",
        "questionHindi": "main() के अंत में 'return 0;' ऑपरेटिंग सिस्टम को क्या सूचित करता है?",
        "options": ["Program crashed", "Successful execution without error", "Memory full", "Restart program"],
        "correctIndex": 1,
        "explanation": "Exit code 0 indicates successful termination.",
        "explanationHindi": "0 का मतलब है कि प्रोग्राम बिना किसी त्रुटि के सफलतापूर्वक पूरा हुआ।"
    },
    {
        "id": "ps-e7",
        "question": "Which syntax denotes a single-line comment in modern C?",
        "questionHindi": "C में सिंगल-लाइन टिप्पणी (कमेंट) के लिए किस चिह्न का उपयोग होता है?",
        "options": ["#", "//", "/* */", "--"],
        "correctIndex": 1,
        "explanation": "// starts a single line comment.",
        "explanationHindi": "// चिह्न का उपयोग एक लाइन के कमेंट के लिए किया जाता है।"
    },
    {
        "id": "ps-e8",
        "question": "Which symbols enclose multi-line comments in C?",
        "questionHindi": "C में मल्टी-लाइन कमेंट किन चिह्नों के मध्य लिखा जाता है?",
        "options": ["<!-- -->", "/* */", "{{ }}", "## ##"],
        "correctIndex": 1,
        "explanation": "/* and */ enclose multi-line comments.",
        "explanationHindi": "/* और */ के बीच कई पंक्तियों की टिप्पणियाँ लिखी जाती हैं।"
    },
    {
        "id": "ps-e9",
        "question": "Is C language case-sensitive or case-insensitive?",
        "questionHindi": "क्या C भाषा केस-सेंसिटिव (Case-Sensitive) है?",
        "options": ["Completely Case-sensitive", "Case-insensitive", "Case-sensitive only in Linux", "Depends on editor"],
        "correctIndex": 0,
        "explanation": "C is strictly case-sensitive: 'main' is different from 'Main'.",
        "explanationHindi": "C भाषा पूरी तरह केस-सेंसिटिव है; 'main' और 'Main' अलग माने जाते हैं।"
    },
    {
        "id": "ps-e10",
        "question": "What is the standard file extension of a C source file?",
        "questionHindi": "C सोर्स कोड फाइल का मानक एक्सटेंशन क्या होता है?",
        "options": [".cpp", ".c", ".obj", ".exe"],
        "correctIndex": 1,
        "explanation": "C source files have the .c extension.",
        "explanationHindi": "C सोर्स फाइल्स का एक्सटेंशन .c होता है।"
    },
    {
        "id": "ps-e11",
        "question": "Which braces enclose the body of a function or code block in C?",
        "questionHindi": "C में फंक्शन या ब्लॉक की सीमा किन ब्रैकेट्स से निर्धारित होती है?",
        "options": ["( )", "[ ]", "{ }", "< >"],
        "correctIndex": 2,
        "explanation": "Curly braces { and } enclose blocks of code.",
        "explanationHindi": "कर्ली ब्रेसेस { } का उपयोग कोड ब्लॉक को घेरने के लिए किया जाता है।"
    },
    {
        "id": "ps-e12",
        "question": "What is the first section typically written in a well-structured C program?",
        "questionHindi": "एक सुव्यवस्थित C प्रोग्राम का पहला भाग आमतौर पर कौन-सा होता है?",
        "options": ["Subprogram section", "Documentation section", "Global declaration section", "Link section"],
        "correctIndex": 1,
        "explanation": "Documentation section contains comments describing author, date, and program purpose.",
        "explanationHindi": "डॉक्यूमेंटेशन सेक्शन में लेखक का नाम और प्रोग्राम का उद्देश्य कमेंट्स में लिखा जाता है।"
    },
    {
        "id": "ps-e13",
        "question": "How many reserved keywords were originally present in the ANSI C89 standard?",
        "questionHindi": "ANSI C89 मानक में मूल रूप से कितने आरक्षित कीवर्ड्स थे?",
        "options": ["24", "32", "48", "64"],
        "correctIndex": 1,
        "explanation": "C89 standardized 32 reserved keywords.",
        "explanationHindi": "ANSI C89 में कुल 32 आरक्षित कीवर्ड्स निर्धारित किए गए थे।"
    },
    {
        "id": "ps-e14",
        "question": "Which software translates C source code into machine-executable code?",
        "questionHindi": "C सोर्स कोड को मशीनी भाषा में बदलने वाले सॉफ्टवेयर को क्या कहते हैं?",
        "options": ["Interpreter", "Compiler", "Debugger", "Browser"],
        "correctIndex": 1,
        "explanation": "The compiler translates human-readable C into machine code.",
        "explanationHindi": "कम्पाइलर C कोड को मशीन के समझने योग्य बाइनरी कोड में बदलता है।"
    },
    {
        "id": "ps-e15",
        "question": "Can comments in C be nested inside each other using /* /* */ */?",
        "questionHindi": "क्या C में /* /* */ */ का उपयोग करके नेस्टेड कमेंट्स लिखे जा सकते हैं?",
        "options": ["Yes, always", "No, standard C prohibits nested /* */ comments", "Only with compiler flag", "Only single lines"],
        "correctIndex": 1,
        "explanation": "/* comments cannot be nested because the first */ terminates the entire comment.",
        "explanationHindi": "नहीं, पहला */ मिलते ही कमेंट समाप्त हो जाता है, जिससे सिंटेक्स एरर आता है।"
    },
    {
        "id": "ps-e16",
        "question": "In which section are variables declared that need to be accessible across all functions?",
        "questionHindi": "सभी फंक्शन्स में इस्तेमाल होने वाले वेरिएबल्स किस सेक्शन में घोषित किए जाते हैं?",
        "options": ["Local block", "Global declaration section", "Documentation section", "Link section"],
        "correctIndex": 1,
        "explanation": "Global declaration section holds variables accessible by every function in the file.",
        "explanationHindi": "ग्लोबल डिक्लेरेशन सेक्शन में घोषित वेरिएबल्स पूरे प्रोग्राम में उपलब्ध होते हैं।"
    },
    {
        "id": "ps-e17",
        "question": "What is the smallest individual unit in a C program called?",
        "questionHindi": "C प्रोग्राम की सबसे छोटी स्वतंत्र इकाई को क्या कहा जाता है?",
        "options": ["Statement", "Token", "Instruction", "Directive"],
        "correctIndex": 1,
        "explanation": "Tokens are the smallest building blocks (keywords, identifiers, constants, operators, etc.).",
        "explanationHindi": "टोकन (Token) C भाषा की सबसे छोटी मूल इकाई होते हैं।"
    },
    {
        "id": "ps-e18",
        "question": "Does the C compiler consider blank spaces, tabs, and newlines as syntax errors?",
        "questionHindi": "क्या C कम्पाइलर खाली जगहों (Whitespace) और नई लाइनों को सिंटेक्स एरर मानता है?",
        "options": ["Yes, indentation is mandatory like Python", "No, C is a free-form language and ignores extra whitespace", "Only inside main()", "Only after semicolons"],
        "correctIndex": 1,
        "explanation": "C ignores whitespace, meaning you can format code with any indentations.",
        "explanationHindi": "नहीं, C एक फ्री-फॉर्म भाषा है जो खाली जगहों और न्यूलाइन्स को अनदेखा करती है।"
    },
    {
        "id": "ps-e19",
        "question": "What is the return type of main() according to modern ISO C standards?",
        "questionHindi": "आधुनिक ISO C मानक के अनुसार main() का रिटर्न टाइप क्या होना चाहिए?",
        "options": ["void", "int", "char", "float"],
        "correctIndex": 1,
        "explanation": "ISO C mandates that main() must return 'int'.",
        "explanationHindi": "ISO C मानक के अनुसार main() का रिटर्न टाइप हमेशा 'int' होना चाहिए।"
    },
    {
        "id": "ps-e20",
        "question": "What header file would you include to define mathematical functions like sqrt() and pow()?",
        "questionHindi": "गणितीय फंक्शन्स जैसे sqrt() और pow() के लिए कौन-सी हेडर फाइल शामिल की जाती है?",
        "options": ["<stdio.h>", "<math.h>", "<stdlib.h>", "<string.h>"],
        "correctIndex": 1,
        "explanation": "<math.h> contains declarations for standard mathematical functions.",
        "explanationHindi": "<math.h> हेडर फाइल में गणितीय फंक्शन्स उपलब्ध होते हैं।"
    }
]

ps_hard = [
    {
        "id": "ps-h1",
        "question": "What are the four precise stages of C compilation in sequential order?",
        "questionHindi": "C कम्पाइलेशन प्रक्रिया के चार चरण सही क्रम में कौन-से हैं?",
        "options": [
            "Compilation -> Preprocessing -> Linking -> Assembly",
            "Preprocessing -> Compilation -> Assembly -> Linking",
            "Assembly -> Preprocessing -> Linking -> Compilation",
            "Linking -> Compilation -> Preprocessing -> Loading"
        ],
        "correctIndex": 1,
        "explanation": "The pipeline is: Preprocessor -> Compiler -> Assembler -> Linker.",
        "explanationHindi": "सही क्रम है: प्रीप्रोसेसर -> कम्पाइलर -> असेंबलर -> लिंकर।"
    },
    {
        "id": "ps-h2",
        "question": "What is the output file of the Assembler phase before linking?",
        "questionHindi": "लिंकिंग से पहले असेंबलर चरण द्वारा कौन-सी फाइल बनाई जाती है?",
        "options": ["Source file (.c)", "Preprocessed file (.i)", "Object file (.o or .obj)", "Executable file (.exe)"],
        "correctIndex": 2,
        "explanation": "Assembler produces relocatable machine object code (.o or .obj).",
        "explanationHindi": "असेंबलर ऑब्जेक्ट फाइल (.o या .obj) उत्पन्न करता है।"
    },
    {
        "id": "ps-h3",
        "question": "What role does the Linker play in the C program lifecycle?",
        "questionHindi": "C प्रोग्राम की जीवन-प्रक्रिया में लिंकर (Linker) की क्या भूमिका होती है?",
        "options": [
            "Checks for semicolon syntax errors",
            "Combines compiled object files with C runtime libraries into a single executable",
            "Translates C code into assembly instructions",
            "Allocates RAM at startup"
        ],
        "correctIndex": 1,
        "explanation": "Linker resolves external references and binds library functions into an executable.",
        "explanationHindi": "लिंकर ऑब्जेक्ट कोड और सी लाइब्रेरी को जोड़कर निष्पादन योग्य फाइल (.exe) बनाता है।"
    },
    {
        "id": "ps-h4",
        "question": "What happens if a macro is defined as '#define PI 3.14;' with a trailing semicolon?",
        "questionHindi": "यदि मैक्रो '#define PI 3.14;' में अंत में सेमीकोलन लगा दिया जाए तो क्या होगा?",
        "options": [
            "The compiler removes it automatically",
            "Every occurrence of PI is replaced with '3.14;', causing syntax errors in expressions like 2 * PI * r",
            "PI becomes a constant variable of float type",
            "Program runs with higher precision"
        ],
        "correctIndex": 1,
        "explanation": "Preprocessor does literal text substitution; 2*PI*r becomes 2*3.14;*r which is invalid syntax.",
        "explanationHindi": "प्रीप्रोसेसर अक्षरशः बदलता है, जिससे '2 * 3.14; * r' बनेगा जो सिंटेक्स एरर देगा।"
    },
    {
        "id": "ps-h5",
        "question": "What is the standard signature of main() that accepts command-line arguments?",
        "questionHindi": "कमांड-लाइन आर्ग्युमेंट्स स्वीकार करने वाले main() का मानक रूप क्या है?",
        "options": [
            "int main(string args[])",
            "int main(int argc, char *argv[])",
            "void main(char **args, int count)",
            "int main(char argv[], int argc)"
        ],
        "correctIndex": 1,
        "explanation": "int main(int argc, char *argv[]) is the standard ANSI form.",
        "explanationHindi": "मानक रूप: int main(int argc, char *argv[]) होता है।"
    },
    {
        "id": "ps-h6",
        "question": "Why is 'void main()' discouraged in standard ANSI/ISO C?",
        "questionHindi": "मानक C में 'void main()' लिखने से क्यों मना किया जाता है?",
        "options": [
            "It will not compile in any C compiler",
            "ISO standard specifies main must return int; void main yields undefined exit status to the OS",
            "It consumes twice the memory",
            "It disables printf statements"
        ],
        "correctIndex": 1,
        "explanation": "ISO standard specifies main must return int so the OS receives a status code.",
        "explanationHindi": "ISO मानक के अनुसार OS को स्टेटस कोड देने के लिए main को int रिटर्न करना अनिवार्य है।"
    },
    {
        "id": "ps-h7",
        "question": "What does the preprocessor directive '#include \"myheader.h\"' do differently from '#include <myheader.h>'?",
        "questionHindi": "डबल कोट्स \"myheader.h\" और एंगल्ड ब्रैकेट्स <myheader.h> में क्या अंतर है?",
        "options": [
            "Quotes search current project directory first; angled brackets search system library paths first",
            "Quotes are for C++ only",
            "Angled brackets allow macros; quotes do not",
            "There is zero difference"
        ],
        "correctIndex": 0,
        "explanation": "\" \" searches current directory first; < > searches system standard directories.",
        "explanationHindi": "\" \" पहले वर्तमान डायरेक्टरी में खोजता है, जबकि < > सिस्टम डायरेक्टरीज में खोजता है।"
    },
    {
        "id": "ps-h8",
        "question": "What is a 'Translation Unit' in C compilation?",
        "questionHindi": "C कम्पाइलेशन में 'ट्रांसलेशन यूनिट' (Translation Unit) क्या होती है?",
        "options": [
            "The final binary machine file",
            "A single .c source file after being processed by the preprocessor with all headers included",
            "A CPU hardware instruction unit",
            "A dynamic linked library"
        ],
        "correctIndex": 1,
        "explanation": "A source file plus all included headers and expanded macros forms a single translation unit.",
        "explanationHindi": "सभी हेडर फाइलों के विस्तार के बाद प्रीप्रोसेसर द्वारा तैयार की गई एकल इकाई।"
    },
    {
        "id": "ps-h9",
        "question": "What is the purpose of header guards like '#ifndef HEADER_H #define HEADER_H ... #endif'?",
        "questionHindi": "हेडर गार्ड्स (#ifndef ... #define ... #endif) का क्या उद्देश्य होता है?",
        "options": [
            "To encrypt source code against unauthorized access",
            "To prevent duplicate inclusion of the same header in a translation unit",
            "To increase execution speed at runtime",
            "To hide variable declarations from main()"
        ],
        "correctIndex": 1,
        "explanation": "Header guards prevent multiple definition compilation errors from repeated inclusions.",
        "explanationHindi": "एक ही हेडर फाइल को बार-बार शामिल करने से होने वाले डुप्लीकेट एरर्स को रोकना।"
    },
    {
        "id": "ps-h10",
        "question": "Which exit status constant defined in <stdlib.h> indicates successful execution?",
        "questionHindi": "<stdlib.h> में सफल निष्पादन दर्शाने के लिए कौन-सा स्थिरांक परिभाषित है?",
        "options": ["STATUS_OK", "EXIT_SUCCESS", "SUCCESS_CODE", "TERMINATE_ZERO"],
        "correctIndex": 1,
        "explanation": "EXIT_SUCCESS (usually 0) and EXIT_FAILURE (usually non-zero) are standard macros.",
        "explanationHindi": "EXIT_SUCCESS सफल निष्पादन का मानक मैक्रो है।"
    },
    {
        "id": "ps-h11",
        "question": "What error occurs if you declare a function prototype but forget to write its implementation body and call it?",
        "questionHindi": "यदि फंक्शन का प्रोटोटाइप घोषित किया जाए पर बॉडी न लिखी जाए, तो कौन-सा एरर आता है?",
        "options": ["Syntax error", "Preprocessor error", "Linker error (undefined reference)", "Runtime segmentation fault"],
        "correctIndex": 2,
        "explanation": "The linker fails when trying to resolve the function symbol: undefined reference.",
        "explanationHindi": "लिंकर एरर (Undefined Reference) आता है क्योंकि फंक्शन की परिभाषा नहीं मिलती।"
    },
    {
        "id": "ps-h12",
        "question": "In C99 and later, what happens if execution falls off the end of main() without an explicit 'return' statement?",
        "questionHindi": "C99 में यदि main() के अंत में 'return 0;' न लिखा जाए तो क्या होता है?",
        "options": [
            "Compiler error is thrown",
            "It implicitly performs 'return 0;' automatically",
            "Operating system crashes",
            "Program loops forever"
        ],
        "correctIndex": 1,
        "explanation": "Since C99, reaching the closing brace of main() automatically implies return 0;.",
        "explanationHindi": "C99 मानक के अनुसार main() के अंत में स्वतः 'return 0;' मान लिया जाता है।"
    },
    {
        "id": "ps-h13",
        "question": "What is the difference between exit(0) and return 0 inside a helper function (not main)?",
        "questionHindi": "किसी सहायक फंक्शन में exit(0) और return 0 में क्या अंतर है?",
        "options": [
            "Both return control to main()",
            "return 0 returns to the caller function; exit(0) immediately terminates the whole program",
            "exit(0) reboots the computer",
            "return 0 terminates the OS kernel"
        ],
        "correctIndex": 1,
        "explanation": "return returns to the calling function, whereas exit() terminates the entire process immediately.",
        "explanationHindi": "return कॉलर फंक्शन में लौटता है, जबकि exit(0) तुरंत पूरे प्रोग्राम को बंद कर देता है।"
    },
    {
        "id": "ps-h14",
        "question": "Which of the following is NOT a reserved keyword in ANSI C89 standard?",
        "questionHindi": "ANSI C89 मानक में इनमें से कौन-सा आरक्षित कीवर्ड नहीं है?",
        "options": ["auto", "volatile", "class", "register"],
        "correctIndex": 2,
        "explanation": "'class' is a C++ keyword and does not exist in standard C.",
        "explanationHindi": "'class' C++ का कीवर्ड है, C89 में class नाम का कोई कीवर्ड नहीं था।"
    },
    {
        "id": "ps-h15",
        "question": "Which preprocessor directive cancels a previously defined macro?",
        "questionHindi": "पहले से परिभाषित किसी मैक्रो को हटाने के लिए कौन-सा निर्देश उपयोग होता है?",
        "options": ["#delete", "#undef", "#remove", "#clear"],
        "correctIndex": 1,
        "explanation": "#undef un-defines a macro identifier.",
        "explanationHindi": "#undef का उपयोग किसी मैक्रो की परिभाषा समाप्त करने के लिए किया जाता है।"
    },
    {
        "id": "ps-h16",
        "question": "What is the role of the Symbol Table generated during compilation?",
        "questionHindi": "कम्पाइलेशन के दौरान बनने वाले सिंबल टेबल (Symbol Table) का क्या कार्य है?",
        "options": [
            "Stores screen pixel graphics",
            "Tracks identifier names, data types, scope, and memory locations",
            "Prints formatted user documentation",
            "Manages file upload bandwidth"
        ],
        "correctIndex": 1,
        "explanation": "Symbol table maintains records of identifiers with their types, scope, and addresses.",
        "explanationHindi": "सिंबल टेबल वेरिएबल्स और फंक्शन्स के नाम, प्रकार और मेमोरी पते का रिकॉर्ड रखती है।"
    },
    {
        "id": "ps-h17",
        "question": "What is an Abstract Syntax Tree (AST) produced by the compiler parser?",
        "questionHindi": "कम्पाइलर पार्सर द्वारा निर्मित एब्स्ट्रैक्ट सिंटैक्स ट्री (AST) क्या है?",
        "options": [
            "A hierarchical tree representation of the syntactic structure of source code",
            "A folder directory on the hard drive",
            "An array of memory addresses",
            "A binary file that boots the computer"
        ],
        "correctIndex": 0,
        "explanation": "AST is a tree representation of abstract syntactic structure created during syntax analysis.",
        "explanationHindi": "सोर्स कोड की व्याकरणिक संरचना को दर्शाने वाला ट्री मॉडल जो कोड विश्लेषण में काम आता है।"
    },
    {
        "id": "ps-h18",
        "question": "What does '#pragma once' do when placed at the top of a header file?",
        "questionHindi": "हेडर फाइल के शीर्ष पर '#pragma once' लिखने से क्या होता है?",
        "options": [
            "Compiles the program in one single second",
            "Directs modern compilers to include the file only once in a single compilation",
            "Limits program to run only once",
            "Disables all optimization"
        ],
        "correctIndex": 1,
        "explanation": "#pragma once serves as a non-standard but widely supported header guard.",
        "explanationHindi": "यह सुनिश्चित करता है कि हेडर फाइल एक कम्पाइलेशन में केवल एक ही बार शामिल हो।"
    },
    {
        "id": "ps-h19",
        "question": "In the standard 6 sections of a C program, what does the Definition Section contain?",
        "questionHindi": "C प्रोग्राम के 6 मानक सेक्शन में 'Definition Section' में क्या लिखा जाता है?",
        "options": [
            "Global variable declarations and prototypes",
            "Symbolic constants defined via #define macros",
            "The main() executable statements",
            "User documentation comments"
        ],
        "correctIndex": 1,
        "explanation": "Definition section defines symbolic constants (like #define MAX 100).",
        "explanationHindi": "डेफिनिशन सेक्शन में #define द्वारा सिंबॉलिक स्थिरांक परिभाषित किए जाते हैं।"
    },
    {
        "id": "ps-h20",
        "question": "What happens if a C program contains multiple definitions of main() in the same project?",
        "questionHindi": "यदि एक ही प्रोजेक्ट में दो अलग फाइलों में main() परिभाषित हो, तो क्या परिणाम होगा?",
        "options": [
            "First main() runs, second is ignored",
            "Linker error: multiple definition of 'main'",
            "Both main functions run simultaneously in threads",
            "Compiler creates two executable files"
        ],
        "correctIndex": 1,
        "explanation": "Linker throws multiple definition error because an executable can have only one entry point.",
        "explanationHindi": "लिंकर एरर (Multiple Definition of main) आता है क्योंकि एंट्री पॉइंट केवल एक हो सकता है।"
    }
]

add_topic("program-structure", ps_easy, ps_hard)
print("Added Topic 1: program-structure (40 Qs)")
