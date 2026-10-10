# Topics 5 to 8 questions: Variable, Input Output, Operator, Control Statement
from qbank_master import register

# -------------------------------------------------------------
# TOPIC 5: variable (Variables, Scope & Storage Classes)
# -------------------------------------------------------------
var_easy = [
    {
        "id": "var-e1",
        "question": "What is a Variable in C?",
        "questionHindi": "C भाषा में वेरिएबल (चर) क्या होता है?",
        "options": [
            "A named memory location used to store data that can change during execution",
            "A permanent hardware chip",
            "A mathematical function that never changes",
            "A reserved keyword"
        ],
        "correctIndex": 0,
        "explanation": "A variable is a named storage location in RAM that holds a value.",
        "explanationHindi": "मेमोरी (RAM) में एक नामांकित स्थान जहाँ डेटा स्टोर होता है और प्रोग्राम के दौरान बदल सकता है।"
    },
    {
        "id": "var-e2",
        "question": "Which of the following is a VALID variable name in C?",
        "questionHindi": "C भाषा में इनमें से कौन-सा एक मान्य (Valid) वेरिएबल नाम है?",
        "options": ["1st_score", "total_marks", "float", "my marks"],
        "correctIndex": 1,
        "explanation": "total_marks contains valid letters and underscore; cannot start with digit or contain spaces/keywords.",
        "explanationHindi": "total_marks मान्य है; अंक से शुरुआत, स्पेस या कीवर्ड का उपयोग वर्जित है।"
    },
    {
        "id": "var-e3",
        "question": "Can a variable name in C begin with a digit (e.g. 2sum)?",
        "questionHindi": "क्या C में वेरिएबल का नाम किसी अंक से शुरू हो सकता है (जैसे 2sum)?",
        "options": ["Yes, anytime", "No, variable names must begin with a letter or an underscore (_)", "Only for float variables", "Only in main()"],
        "correctIndex": 1,
        "explanation": "Identifiers must start with an alphabet letter or underscore (_).",
        "explanationHindi": "नहीं, वेरिएबल का नाम हमेशा किसी अक्षर (A-Z, a-z) या अंडरस्कोर (_) से ही शुरू होना चाहिए।"
    },
    {
        "id": "var-e4",
        "question": "Are variable names 'student' and 'Student' considered the same in C?",
        "questionHindi": "क्या C में 'student' और 'Student' दोनों एक ही वेरिएबल माने जाते हैं?",
        "options": ["Yes, C ignores case", "No, C is case-sensitive so they are two completely separate variables", "Only in Windows", "Depends on font"],
        "correctIndex": 1,
        "explanation": "C is strictly case-sensitive, so 'student' and 'Student' are two distinct identifiers.",
        "explanationHindi": "नहीं, C केस-सेंसिटिव है; 'student' और 'Student' दो अलग-अलग वेरिएबल्स माने जाते हैं।"
    },
    {
        "id": "var-e5",
        "question": "Can a reserved keyword (like 'while', 'int', 'return') be used as a variable name?",
        "questionHindi": "क्या किसी आरक्षित कीवर्ड (जैसे while, int, return) को वेरिएबल का नाम बनाया जा सकता है?",
        "options": ["Yes, with quotes", "No, keywords are reserved for compiler syntax and cannot be identifiers", "Only inside loops", "Yes, if capitalized"],
        "correctIndex": 1,
        "explanation": "Keywords are reserved by the language specification and cannot be used as variable names.",
        "explanationHindi": "नहीं, कीवर्ड्स भाषा के सिंटेक्स के लिए आरक्षित होते हैं और वेरिएबल नाम नहीं बन सकते।"
    },
    {
        "id": "var-e6",
        "question": "What is the difference between variable declaration and variable initialization?",
        "questionHindi": "वेरिएबल डिक्लेरेशन और इनिशियलाइजेशन में क्या अंतर है?",
        "options": [
            "Declaration specifies type and name; Initialization assigns an initial value at the time of creation",
            "Declaration deletes memory; initialization frees memory",
            "Declaration is in C++; initialization is in C",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "int x; is declaration. int x = 10; is declaration with initialization.",
        "explanationHindi": "डिक्लेरेशन नाम व टाइप तय करता है (int x;); इनिशियलाइजेशन शुरूआती मान देता है (int x = 10;)।"
    },
    {
        "id": "var-e7",
        "question": "What is the scope of a Local variable declared inside a function or block?",
        "questionHindi": "किसी फंक्शन या ब्लॉक के अंदर घोषित लोकल वेरिएबल का स्कोप (पहुंच) क्या होता है?",
        "options": [
            "Accessible anywhere across all files in the project",
            "Accessible only within that specific function or enclosing block { }",
            "Accessible only on internet servers",
            "Accessible by the operating system kernel"
        ],
        "correctIndex": 1,
        "explanation": "Local variables exist and can only be accessed within their defining block { }.",
        "explanationHindi": "लोकल वेरिएबल केवल उसी फंक्शन या ब्लॉक { } के अंदर ही काम करता है जहाँ वह बनाया गया है।"
    },
    {
        "id": "var-e8",
        "question": "Where are Global variables declared in a C source file?",
        "questionHindi": "C सोर्स फाइल में ग्लोबल वेरिएबल्स कहाँ घोषित किए जाते हैं?",
        "options": [
            "Outside of all functions, typically at the top of the file",
            "Inside main() only",
            "Inside the return statement",
            "In a separate .txt file"
        ],
        "correctIndex": 0,
        "explanation": "Global variables are declared outside all function boundaries.",
        "explanationHindi": "सभी फंक्शन्स के बाहर, आमतौर पर प्रोग्राम की शुरुआत में सबसे ऊपर।"
    },
    {
        "id": "var-e9",
        "question": "What is the default initial value of an uninitialized Global or Static integer variable in C?",
        "questionHindi": "बिना मान दिए छोड़े गए ग्लोबल या स्टैटिक पूर्णांक वेरिएबल का डिफ़ॉल्ट मान क्या होता है?",
        "options": ["Garbage value", "0", "-1", "NULL"],
        "correctIndex": 1,
        "explanation": "Globals and static variables are automatically initialized to 0 by the C runtime.",
        "explanationHindi": "ग्लोबल और स्टैटिक वेरिएबल्स को कम्पाइलर द्वारा स्वतः 0 मान दिया जाता है।"
    },
    {
        "id": "var-e10",
        "question": "What is the default initial value of an uninitialized Local (auto) integer variable in C?",
        "questionHindi": "बिना मान दिए छोड़े गए लोकल (Local) वेरिएबल में कौन-सा डिफ़ॉल्ट मान होता है?",
        "options": ["0", "Garbage value (unpredictable junk memory leftover)", "1", "Empty string"],
        "correctIndex": 1,
        "explanation": "Local automatic variables contain unpredictable garbage values if not initialized.",
        "explanationHindi": "लोकल वेरिएबल्स में गारबेज वैल्यू (अज्ञात कचरा मान) होता है।"
    },
    {
        "id": "var-e11",
        "question": "Which keyword makes a variable's value constant (read-only) so it cannot be modified?",
        "questionHindi": "किस कीवर्ड से वेरिएबल का मान स्थायी (Read-only) हो जाता है ताकि उसे बदला न जा सके?",
        "options": ["static", "const", "fixed", "immutable"],
        "correctIndex": 1,
        "explanation": "The 'const' keyword creates a read-only variable whose value cannot be reassigned.",
        "explanationHindi": "'const' कीवर्ड लगाने से वेरिएबल केवल पढ़ने योग्य बन जाता है और बदला नहीं जा सकता।"
    },
    {
        "id": "var-e12",
        "question": "What happens if code attempts to reassign a value to a const variable (e.g. const int c = 5; c = 10;)?",
        "questionHindi": "यदि किसी const वेरिएबल का मान बदलने का प्रयास किया जाए (c = 10;), तो क्या होगा?",
        "options": [
            "Compilation error: assignment of read-only variable",
            "Value updates quietly",
            "Computer restarts",
            "Variable turns into a pointer"
        ],
        "correctIndex": 0,
        "explanation": "Compiler halts with an error: assignment of read-only variable.",
        "explanationHindi": "कम्पाइलर एरर देता है: 'assignment of read-only variable'।"
    },
    {
        "id": "var-e13",
        "question": "What is an L-value (Locator value) in C assignment expressions (e.g. a = b)?",
        "questionHindi": "C असाइनमेंट में L-value (Locator Value) का क्या अर्थ है?",
        "options": [
            "An expression that refers to an identifiable memory location capable of holding data (left side of =)",
            "A loop counter",
            "A library function",
            "A literal number like 5"
        ],
        "correctIndex": 0,
        "explanation": "An L-value refers to a modifiable memory location that can appear on the left side of an assignment.",
        "explanationHindi": "मेमोरी का वह निश्चित पता जो बराबर (=) चिह्न के बाईं ओर रहकर नया मान ग्रहण कर सकता है।"
    },
    {
        "id": "var-e14",
        "question": "Which of the following is an INVALID L-value that causes a compilation error?",
        "questionHindi": "इनमें से कौन-सा अमान्य L-value है जो कम्पाइलेशन एरर पैदा करेगा?",
        "options": ["x = 10;", "5 = x;", "total = marks + 5;", "ptr = &x;"],
        "correctIndex": 1,
        "explanation": "5 is a literal constant, not a memory storage location; 5 = x is an invalid L-value error.",
        "explanationHindi": "'5 = x;' गलत है क्योंकि संख्या 5 कोई मेमोरी बॉक्स नहीं है जिसमें मान डाला जा सके।"
    },
    {
        "id": "var-e15",
        "question": "How can you declare multiple variables of the same type in a single statement?",
        "questionHindi": "एक ही स्टेटमेंट में समान प्रकार के कई वेरिएबल्स कैसे घोषित किए जाते हैं?",
        "options": ["int a, b, c;", "int a and b and c;", "int a; b; c;", "int (a b c);"],
        "correctIndex": 0,
        "explanation": "Comma-separated identifiers: int a, b, c; declares three integer variables.",
        "explanationHindi": "कॉमा लगाकर: int a, b, c; एक साथ तीन पूर्णांक चर घोषित करता है।"
    },
    {
        "id": "var-e16",
        "question": "What is the default storage class for local variables declared inside a function?",
        "questionHindi": "किसी फंक्शन के अंदर घोषित लोकल वेरिएबल्स की डिफ़ॉल्ट स्टोरेज क्लास क्या होती है?",
        "options": ["auto", "static", "register", "extern"],
        "correctIndex": 0,
        "explanation": "'auto' is the implicit default storage class for all local variables.",
        "explanationHindi": "'auto' (ऑटोमैटिक) सभी लोकल वेरिएबल्स की स्वाभाविक डिफ़ॉल्ट स्टोरेज क्लास होती है।"
    },
    {
        "id": "var-e17",
        "question": "What is the lifetime of a standard local (auto) variable?",
        "questionHindi": "एक सामान्य लोकल (auto) वेरिएबल का जीवनकाल (Lifetime) कितना होता है?",
        "options": [
            "Throughout the entire run of the program",
            "From when control enters its enclosing block until execution leaves that block",
            "Forever in hard drive memory",
            "Only 5 seconds"
        ],
        "correctIndex": 1,
        "explanation": "Automatic variables are created on the stack when the block is entered and destroyed upon exit.",
        "explanationHindi": "जब तक कंट्रोल उस ब्लॉक के अंदर रहता है; ब्लॉक से बाहर आते ही यह नष्ट हो जाता है।"
    },
    {
        "id": "var-e18",
        "question": "Which storage class preserves a local variable's value across repeated function calls?",
        "questionHindi": "फंक्शन कॉल समाप्त होने के बाद भी मान को सुरक्षित रखने वाली स्टोरेज क्लास कौन-सी है?",
        "options": ["auto", "static", "register", "volatile"],
        "correctIndex": 1,
        "explanation": "'static' local variables retain their value between function invocations.",
        "explanationHindi": "'static' लोकल वेरिएबल फंक्शन के बार-बार कॉल होने पर भी अपना पुराना मान याद रखता है।"
    },
    {
        "id": "var-e19",
        "question": "Can you declare two different variables with the exact same name inside the same local scope?",
        "questionHindi": "क्या एक ही लोकल ब्लॉक में एक ही नाम के दो अलग-अलग वेरिएबल्स बनाए जा सकते हैं?",
        "options": ["Yes, C will merge them", "No, it causes a compilation error (redeclaration of variable)", "Only if types are different", "Only in loops"],
        "correctIndex": 1,
        "explanation": "Redeclaring the same identifier in the same scope produces a redeclaration compiler error.",
        "explanationHindi": "नहीं, एक ही ब्लॉक में एक नाम के दो चर बनाने पर कम्पाइलर एरर (Redeclaration) देता है।"
    },
    {
        "id": "var-e20",
        "question": "What happens if a local variable has the same name as a global variable?",
        "questionHindi": "यदि किसी लोकल वेरिएबल का नाम ग्लोबल वेरिएबल के समान ही रख दिया जाए तो क्या होगा?",
        "options": [
            "Compiler error immediately",
            "The local variable 'shadows' (hides) the global variable within its local block",
            "Both variables are deleted",
            "Global variable changes value"
        ],
        "correctIndex": 1,
        "explanation": "Local variable shadows the global variable inside the local scope.",
        "explanationHindi": "लोकल वेरिएबल अपने ब्लॉक के अंदर ग्लोबल वेरिएबल को छिपा (Shadow) देता है।"
    }
]

var_hard = [
    {
        "id": "var-h1",
        "question": "Which limitation strictly applies to variables declared with the 'register' storage class in C?",
        "questionHindi": "'register' स्टोरेज क्लास से घोषित वेरिएबल्स पर कौन-सा प्रतिबंध लागू होता है?",
        "options": [
            "You cannot use the address-of operator '&' on a register variable",
            "They can only store negative numbers",
            "They cannot be integers",
            "They must be global"
        ],
        "correctIndex": 0,
        "explanation": "Register variables may reside in CPU registers, which do not have memory RAM addresses; taking &var is illegal.",
        "explanationHindi": "आप '&' (एड्रेस ऑपरेटर) का उपयोग नहीं कर सकते क्योंकि सीपीयू रजिस्टर्स का रैम एड्रेस नहीं होता।"
    },
    {
        "id": "var-h2",
        "question": "What is the difference between declaring a variable with 'extern' versus a standard declaration?",
        "questionHindi": "'extern' के साथ वेरिएबल घोषित करने और सामान्य डिक्लेरेशन में क्या अंतर है?",
        "options": [
            "'extern' informs the compiler that the variable is defined elsewhere (declaration without allocating storage)",
            "'extern' allocates 10x more memory",
            "'extern' makes the variable read-only",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "extern declares an identifier with external linkage without allocating new memory definition.",
        "explanationHindi": "'extern' केवल यह बताता है कि यह वेरिएबल किसी दूसरी फाइल या जगह बना हुआ है (मेमोरी नहीं लेता)।"
    },
    {
        "id": "var-h3",
        "question": "What is the difference in linkage between a global variable and a global variable declared with 'static'?",
        "questionHindi": "सामान्य ग्लोबल वेरिएबल और 'static' ग्लोबल वेरिएबल के लिंकेज में क्या अंतर होता है?",
        "options": [
            "Standard global has external linkage (accessible across files); static global has internal linkage (restricted to its current .c file)",
            "static global cannot be modified",
            "static global is stored on the stack",
            "Standard global is deleted on main() exit"
        ],
        "correctIndex": 0,
        "explanation": "static at file scope restricts visibility to that translation unit (internal linkage).",
        "explanationHindi": "सामान्य ग्लोबल को दूसरी फाइलों से देखा जा सकता है; static ग्लोबल केवल अपनी ही फाइल तक सीमित रहता है।"
    },
    {
        "id": "var-h4",
        "question": "In which memory segment of a C process are uninitialized global and static variables stored?",
        "questionHindi": "C प्रोग्राम में बिना इनिशियलाइज किए गए ग्लोबल और स्टैटिक वेरिएबल्स किस मेमोरी सेगमेंट में रहते हैं?",
        "options": ["Stack Segment", "BSS (Block Started by Symbol) Segment", "Text (Code) Segment", "Heap Segment"],
        "correctIndex": 1,
        "explanation": "Uninitialized globals/statics reside in the BSS segment and are zeroed out by the OS loader.",
        "explanationHindi": "BSS सेगमेंट में रहते हैं, जिसे ऑपरेटिंग सिस्टम प्रोग्राम चालू होते ही 0 से भर देता है।"
    },
    {
        "id": "var-h5",
        "question": "In which memory segment are initialized global and static variables stored?",
        "questionHindi": "प्रारंभिक मान वाले (Initialized) ग्लोबल और स्टैटिक वेरिएबल्स कहाँ स्टोर होते हैं?",
        "options": ["Data Segment (.data)", "Stack Segment", "Heap Segment", "Register bank"],
        "correctIndex": 0,
        "explanation": "Initialized global/static variables with non-zero initial values are stored in the Data Segment.",
        "explanationHindi": "डेटा सेगमेंट (.data) में स्टोर होते हैं।"
    },
    {
        "id": "var-h6",
        "question": "What happens if a static local variable inside a function is initialized as 'static int count = 0;'?",
        "questionHindi": "यदि किसी फंक्शन में 'static int count = 0;' लिखा हो, तो बार-बार फंक्शन कॉल होने पर क्या होगा?",
        "options": [
            "count is reset to 0 every time the function is called",
            "Initialization happens exactly once at compile/startup time; subsequent calls skip the initialization line",
            "Compiler error",
            "count alternates between 0 and 1"
        ],
        "correctIndex": 1,
        "explanation": "Static local initialization executes only once when the program loads.",
        "explanationHindi": "इनिशियलाइजेशन केवल एक बार प्रोग्राम शुरू होते समय होता है; अगली बार यह लाइन छोड़ दी जाती है।"
    },
    {
        "id": "var-h7",
        "question": "What is the difference between 'const int *p' and 'int * const p'?",
        "questionHindi": "'const int *p' और 'int * const p' में क्या अंतर है?",
        "options": [
            "'const int *p' is a pointer to constant integer (value read-only); 'int * const p' is a constant pointer (address read-only)",
            "Both are identical",
            "'int * const p' is illegal in C",
            "'const int *p' allocates memory on heap"
        ],
        "correctIndex": 0,
        "explanation": "const int *p prevents modifying the pointed-to int; int * const p prevents changing the pointer's target address.",
        "explanationHindi": "const int *p मान को बदलने से रोकता है; int * const p पॉइंटर के पते को बदलने से रोकता है।"
    },
    {
        "id": "var-h8",
        "question": "What does the 'volatile' type qualifier tell the C compiler about a variable?",
        "questionHindi": "C कम्पाइलर को 'volatile' कीवर्ड किसी वेरिएबल के बारे में क्या निर्देश देता है?",
        "options": [
            "The variable's value may change unexpectedly (e.g. by hardware or interrupt); prevent compiler caching in CPU registers",
            "The variable evaporates after 1 second",
            "The variable is encrypted",
            "The variable is converted to double"
        ],
        "correctIndex": 0,
        "explanation": "volatile tells the optimizer not to cache the variable in registers because external events can modify it.",
        "explanationHindi": "यह कम्पाइलर को बताता है कि यह चर हार्डवेयर द्वारा कभी भी बदल सकता है, इसलिए इसे ऑप्टिमाइज़ न करें।"
    },
    {
        "id": "var-h9",
        "question": "Why is returning a pointer to a local automatic variable from a function dangerous?",
        "questionHindi": "किसी फंक्शन से लोकल (auto) वेरिएबल का पॉइंटर लौटाना खतरनाक क्यों है?",
        "options": [
            "Local variable memory is deallocated from the stack on function return, resulting in a Dangling Pointer",
            "It corrupts the operating system kernel",
            "It deletes the source file",
            "The compiler will not allow return statements"
        ],
        "correctIndex": 0,
        "explanation": "The stack frame is popped; the pointer points to freed stack space (dangling pointer).",
        "explanationHindi": "फंक्शन खत्म होते ही स्टैक मेमोरी खाली हो जाती है, जिससे पॉइंटर एक डैंगलिंग पॉइंटर बन जाता है।"
    },
    {
        "id": "var-h10",
        "question": "Can the 'register' storage class specifier be applied to a global variable in C?",
        "questionHindi": "क्या 'register' कीवर्ड को C में ग्लोबल वेरिएबल पर लगाया जा सकता है?",
        "options": [
            "No, register storage class is strictly prohibited on global variables",
            "Yes, always",
            "Only on x86 processors",
            "Only if initialized to 0"
        ],
        "correctIndex": 0,
        "explanation": "register specifier is valid only for block-scoped (local) variables and function parameters.",
        "explanationHindi": "नहीं, ग्लोबल वेरिएबल्स पर 'register' लगाना सिंटेक्स एरर होता है।"
    },
    {
        "id": "var-h11",
        "question": "What is the maximum significant length of an internal identifier guaranteed by the ANSI C89 standard?",
        "questionHindi": "ANSI C89 मानक में आंतरिक पहचानकर्ता (Internal Identifier) के कितने अक्षर महत्वपूर्ण माने जाते हैं?",
        "options": ["8 characters", "31 characters", "63 characters", "Unlimited"],
        "correctIndex": 1,
        "explanation": "C89 guaranteed at least 31 characters are significant for internal identifiers (C99 expanded to 63).",
        "explanationHindi": "ANSI C89 में कम से कम 31 अक्षर महत्वपूर्ण (Significant) माने गए थे।"
    },
    {
        "id": "var-h12",
        "question": "What is the scope of function parameter variables in C?",
        "questionHindi": "C भाषा में फंक्शन पैरामीटर्स का स्कोप क्या होता है?",
        "options": [
            "Local to the function body, identical to automatic variables declared at the start of the function",
            "Global to the entire file",
            "Universal across all files",
            "Valid only during function declaration"
        ],
        "correctIndex": 0,
        "explanation": "Parameters behave as local automatic variables initialized with caller arguments.",
        "explanationHindi": "फंक्शन की बॉडी के अंदर लोकल होते हैं और फंक्शन खत्म होते ही समाप्त हो जाते हैं।"
    },
    {
        "id": "var-h13",
        "question": "In C11, which storage-class specifier declares thread-local variables?",
        "questionHindi": "C11 में थ्रेड-लोकल वेरिएबल्स के लिए कौन-सा स्टोरेज-क्लास विनिर्देशक प्रस्तुत किया गया?",
        "options": ["_Thread_local", "thread_static", "thread_auto", "shared_var"],
        "correctIndex": 0,
        "explanation": "_Thread_local (or thread_local in threads.h) gives each thread its own distinct copy.",
        "explanationHindi": "_Thread_local प्रत्येक थ्रेड को वेरिएबल की अपनी अलग कॉपी प्रदान करता है।"
    },
    {
        "id": "var-h14",
        "question": "What is the output of the following code snippet?\nint a = 10;\n{\n    int a = 20;\n    printf(\"%d \", a);\n}\nprintf(\"%d\", a);",
        "questionHindi": "इस कोड का आउटपुट क्या होगा?\nint a = 10; { int a = 20; printf(\"%d \", a); } printf(\"%d\", a);",
        "options": ["20 10", "10 20", "20 20", "10 10"],
        "correctIndex": 0,
        "explanation": "Inside the inner block, local 'a = 20' shadows outer 'a'. Outside the block, outer 'a = 10' is unchanged.",
        "explanationHindi": "अंदर वाले ब्लॉक में a=20 प्रिंट होगा, ब्लॉक से बाहर आते ही मूल a=10 प्रिंट होगा: '20 10'।"
    },
    {
        "id": "var-h15",
        "question": "What does '#define PI 3.1415' do differently compared to 'const float PI = 3.1415;'?",
        "questionHindi": "#define PI और const float PI में क्या मूलभूत अंतर है?",
        "options": [
            "#define is a preprocessor text macro with no type safety or memory address; const float is a typed variable in symbol table",
            "const float uses no RAM",
            "#define cannot be used in calculations",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "#define is text replacement without type checking or address; const creates a typed read-only symbol.",
        "explanationHindi": "#define प्रीप्रोसेसर टेक्स्ट रिप्लेसमेंट है; const एक टाइप-सुरक्षित वेरिएबल होता है।"
    },
    {
        "id": "var-h16",
        "question": "What is the consequence of declaring a variable as 'const volatile int sensor_port;'?",
        "questionHindi": "'const volatile int sensor_port;' लिखने का क्या व्यावहारिक अर्थ है?",
        "options": [
            "It is read-only by the C code (cannot be assigned to), but its value can change externally via hardware registers",
            "It causes a compiler syntax error",
            "It is completely inaccessible",
            "It allocates dynamic heap memory"
        ],
        "correctIndex": 0,
        "explanation": "Read-only for the program, but hardware can change it; compiler re-reads from memory every time.",
        "explanationHindi": "प्रोग्राम इसे बदल नहीं सकता (Read-only), लेकिन हार्डवेयर इसे बदल सकता है; कम्पाइलर हमेशा रैम से पढ़ेगा।"
    },
    {
        "id": "var-h17",
        "question": "Can you declare a variable inside an 'if' condition statement in C99 (e.g. if (int x = 5))?",
        "questionHindi": "क्या C99 में if कंडीशन के अंदर नया वेरिएबल घोषित किया जा सकता है?",
        "options": [
            "No, variable declarations inside if conditions are valid in C++, but illegal in C",
            "Yes, standard C99 feature",
            "Only in while loops",
            "Only with static variables"
        ],
        "correctIndex": 0,
        "explanation": "Declaring variables inside condition expressions is supported in C++, but not in standard C.",
        "explanationHindi": "नहीं, if की शर्त में वेरिएबल बनाना C++ में मान्य है लेकिन मानक C में अवैध है।"
    },
    {
        "id": "var-h18",
        "question": "What is a 'Tentative Definition' of a variable in C?",
        "questionHindi": "C भाषा में वेरिएबल की 'टेंटेटिव डेफिनिशन' (Tentative Definition) क्या होती है?",
        "options": [
            "A file-scope variable declaration without an initializer or storage class (e.g. int x;) that acts as definition if no other appears",
            "A temporary variable on stack",
            "A deleted variable",
            "A pointer to NULL"
        ],
        "correctIndex": 0,
        "explanation": "In file scope, int x; without extern or initializer is tentative; if no definition appears, it initializes to 0.",
        "explanationHindi": "ग्लोबल स्तर पर बिना इनिशियलाइजर के लिखा int x; जो बाद में कोई मान न मिलने पर 0 मान लेता है।"
    },
    {
        "id": "var-h19",
        "question": "What is the effect of the 'restrict' keyword on pointer variables introduced in C99?",
        "questionHindi": "C99 में पॉइंटर्स पर 'restrict' कीवर्ड लगाने का क्या प्रभाव पड़ता है?",
        "options": [
            "Guarantees to the compiler that the pointer is the sole means of accessing the pointed object, allowing aggressive optimization",
            "Prevents the pointer from being dereferenced",
            "Restricts the pointer to NULL",
            "Encrypts pointer address"
        ],
        "correctIndex": 0,
        "explanation": "restrict promises no aliasing occurs through other pointers, enabling register optimization.",
        "explanationHindi": "कम्पाइलर को वचन देता है कि उस मेमोरी तक केवल इसी पॉइंटर से पहुँचा जाएगा, जिससे कोड तेज चलता है।"
    },
    {
        "id": "var-h20",
        "question": "What happens if a static variable is declared with the same name in two different functions in the same file?",
        "questionHindi": "यदि एक ही फाइल के दो अलग फंक्शन्स में एक ही नाम का static वेरिएबल हो, तो क्या होगा?",
        "options": [
            "They are completely independent; each function gets its own distinct static variable with local scope",
            "Compiler throws multiple definition error",
            "The values get shared between both functions",
            "The program crashes on launch"
        ],
        "correctIndex": 0,
        "explanation": "Scope is local to each function, even though both have static lifetimes in the data segment.",
        "explanationHindi": "वे दोनों पूरी तरह स्वतंत्र रहते हैं; प्रत्येक फंक्शन का अपना अलग स्टैटिक वेरिएबल होता है।"
    }
]

register("variable", var_easy, var_hard)
print("Registered Topic 5: variable")

# -------------------------------------------------------------
# TOPIC 6: input-output (Input & Output Operations)
# -------------------------------------------------------------
io_easy = [
    {
        "id": "io-e1",
        "question": "Which standard C library function is used for formatted output to the console screen?",
        "questionHindi": "कंसोल स्क्रीन पर फॉर्मेटेड आउटपुट प्रदर्शित करने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": ["scanf()", "printf()", "print()", "cout"],
        "correctIndex": 1,
        "explanation": "printf() prints formatted text to stdout.",
        "explanationHindi": "printf() फंक्शन स्क्रीन पर आउटपुट दिखाने के लिए उपयोग किया जाता है।"
    },
    {
        "id": "io-e2",
        "question": "Which standard C library function is used for formatted input from the keyboard?",
        "questionHindi": "कीबोर्ड से फॉर्मेटेड इनपुट लेने के लिए कौन-सा C फंक्शन उपयोग किया जाता है?",
        "options": ["scanf()", "printf()", "cin", "read()"],
        "correctIndex": 0,
        "explanation": "scanf() reads formatted data from stdin.",
        "explanationHindi": "scanf() फंक्शन कीबोर्ड से डेटा पढ़ने के लिए उपयोग किया जाता है।"
    },
    {
        "id": "io-e3",
        "question": "Why is the address-of operator '&' required in scanf(\"%d\", &num)?",
        "questionHindi": "scanf(\"%d\", &num) में '&' (एड्रेस ऑपरेटर) लगाना क्यों अनिवार्य है?",
        "options": [
            "To provide the memory address where scanf can directly store the user input value",
            "To convert the number to string",
            "To encrypt the input",
            "To calculate the percentage"
        ],
        "correctIndex": 0,
        "explanation": "scanf needs the variable's memory address so it can write the read value into RAM.",
        "explanationHindi": "क्योंकि scanf को वेरिएबल का मेमोरी पता चाहिए ताकि वह इनपुट किए मान को वहाँ स्टोर कर सके।"
    },
    {
        "id": "io-e4",
        "question": "Why is '&' NOT required when reading a string using scanf(\"%s\", str)?",
        "questionHindi": "स्ट्रिंग पढ़ते समय scanf(\"%s\", str) में '&' की आवश्यकता क्यों नहीं होती?",
        "options": [
            "The array name 'str' itself automatically decays to the memory address of its first element (&str[0])",
            "Strings do not use RAM memory",
            "The compiler guesses the address",
            "scanf hates strings"
        ],
        "correctIndex": 0,
        "explanation": "An array name decays to a pointer to its base address; thus it already is an address.",
        "explanationHindi": "क्योंकि ऐरे का नाम स्वयं अपने पहले तत्व के मेमोरी पते (&str[0]) को दर्शाता है।"
    },
    {
        "id": "io-e5",
        "question": "Which escape sequence moves the console cursor to the beginning of the NEXT line?",
        "questionHindi": "कंसोल कर्सर को अगली नई लाइन पर ले जाने के लिए कौन-सा एस्केप सीक्वेंस है?",
        "options": ["\\t", "\\n", "\\r", "\\b"],
        "correctIndex": 1,
        "explanation": "\\n stands for newline (Enter key equivalent).",
        "explanationHindi": "\\n का अर्थ न्यूलाइन (नई पंक्ति) होता है।"
    },
    {
        "id": "io-e6",
        "question": "Which escape sequence inserts a horizontal TAB space in printf()?",
        "questionHindi": "printf() में क्षैतिज टैब (Tab space) देने के लिए कौन-सा एस्केप सीक्वेंस है?",
        "options": ["\\n", "\\t", "\\s", "\\b"],
        "correctIndex": 1,
        "explanation": "\\t prints a horizontal tab spacing.",
        "explanationHindi": "\\t का उपयोग टैब स्पेस देने के लिए किया जाता है।"
    },
    {
        "id": "io-e7",
        "question": "How do you print a literal percent sign '%' using printf()?",
        "questionHindi": "printf() द्वारा स्क्रीन पर प्रतिशत का चिह्न '%' कैसे प्रिंट किया जाता है?",
        "options": ["\\%", "%%", "/%", "[%]"],
        "correctIndex": 1,
        "explanation": "%% escapes the format specifier to print a literal % character.",
        "explanationHindi": "%% लिखने से स्क्रीन पर एक प्रतिशत (%) चिह्न छपता है।"
    },
    {
        "id": "io-e8",
        "question": "How do you print a literal backslash character '\\' using printf()?",
        "questionHindi": "printf() द्वारा स्क्रीन पर बैकस्लैश '\\' कैसे प्रिंट किया जाता है?",
        "options": ["\\\\", "\\b", "/\\", "\\s"],
        "correctIndex": 0,
        "explanation": "\\\\ prints a single literal backslash.",
        "explanationHindi": "\\\\ लिखने से एक बैकस्लैश स्क्रीन पर प्रिंट होता है।"
    },
    {
        "id": "io-e9",
        "question": "Which function reads a SINGLE character from standard input (stdin)?",
        "questionHindi": "स्टैंडर्ड इनपुट से एक सिंगल कैरेक्टर पढ़ने वाला फंक्शन कौन-सा है?",
        "options": ["getchar()", "putchar()", "puts()", "getch_all()"],
        "correctIndex": 0,
        "explanation": "getchar() reads the next single character from stdin.",
        "explanationHindi": "getchar() कीबोर्ड से एक अक्षर पढ़ने का कार्य करता है।"
    },
    {
        "id": "io-e10",
        "question": "Which function writes a SINGLE character directly to standard output (stdout)?",
        "questionHindi": "स्क्रीन पर एक सिंगल कैरेक्टर प्रिंट करने वाला फंक्शन कौन-सा है?",
        "options": ["putchar()", "getchar()", "putc_str()", "write_one()"],
        "correctIndex": 0,
        "explanation": "putchar(ch) writes character ch to stdout.",
        "explanationHindi": "putchar() स्क्रीन पर एक सिंगल कैरेक्टर प्रिंट करता है।"
    },
    {
        "id": "io-e11",
        "question": "Which function prints a string to screen and automatically appends a newline '\\n'?",
        "questionHindi": "स्ट्रिंग प्रिंट करने के बाद स्वतः नई लाइन जोड़ने वाला फंक्शन कौन-सा है?",
        "options": ["puts()", "gets()", "printf()", "putchar()"],
        "correctIndex": 0,
        "explanation": "puts(str) prints the string followed by a newline.",
        "explanationHindi": "puts() स्ट्रिंग प्रिंट करके अंत में अपने आप न्यूलाइन जोड़ देता है।"
    },
    {
        "id": "io-e12",
        "question": "Why has the 'gets()' function been completely removed from modern ISO C standards (C11)?",
        "questionHindi": "'gets()' फंक्शन को आधुनिक C मानकों से पूरी तरह क्यों हटा दिया गया है?",
        "options": [
            "It does not perform buffer bound checking, causing severe Buffer Overflow security vulnerabilities",
            "It only worked on Windows 95",
            "It was too slow",
            "It only accepted numbers"
        ],
        "correctIndex": 0,
        "explanation": "gets() lacks buffer size limits, allowing inputs to overwrite adjacent memory (buffer overflow).",
        "explanationHindi": "क्योंकि इसमें इनपुट सीमा जांच नहीं थी, जिससे बफर ओवरफ्लो और सुरक्षा खतरे पैदा होते थे।"
    },
    {
        "id": "io-e13",
        "question": "What is the recommended, safe replacement for gets() to read an entire line including spaces?",
        "questionHindi": "स्पेस सहित पूरी लाइन पढ़ने के लिए gets() का सुरक्षित विकल्प कौन-सा है?",
        "options": [
            "fgets(str, sizeof(str), stdin)",
            "scanf(\"%s\", str)",
            "getchar_all()",
            "read_line_unsafe()"
        ],
        "correctIndex": 0,
        "explanation": "fgets() specifies the buffer size limit, preventing buffer overflow.",
        "explanationHindi": "fgets(str, sizeof(str), stdin) बफर साइज की सीमा तय करके सुरक्षित इनपुट लेता है।"
    },
    {
        "id": "io-e14",
        "question": "How do you read two integers simultaneously in a single scanf() statement?",
        "questionHindi": "एक ही scanf() में दो पूर्णांक एक साथ कैसे पढ़े जाते हैं?",
        "options": [
            "scanf(\"%d %d\", &a, &b);",
            "scanf(\"%d\", &a, &b);",
            "scanf(\"%d, %d\", a, b);",
            "scanf(\"%d and %d\", &a &b);"
        ],
        "correctIndex": 0,
        "explanation": "scanf(\"%d %d\", &a, &b) matches format specifiers with corresponding addresses.",
        "explanationHindi": "scanf(\"%d %d\", &a, &b); दो विनिर्देशक और दोनों के पते लिखकर।"
    },
    {
        "id": "io-e15",
        "question": "What does printf(\"%.2f\", 45.6789); print on the screen?",
        "questionHindi": "printf(\"%.2f\", 45.6789); स्क्रीन पर क्या प्रिंट करेगा?",
        "options": ["45.67", "45.68", "45.6789", "45"],
        "correctIndex": 1,
        "explanation": "%.2f rounds to 2 decimal places: 45.68.",
        "explanationHindi": "%.2f दो दशमलव अंकों तक राउंड करके 45.68 प्रिंट करेगा।"
    },
    {
        "id": "io-e16",
        "question": "Which format specifier is used in scanf() to read a double variable?",
        "questionHindi": "scanf() में 'double' वेरिएबल को पढ़ने के लिए कौन-सा फॉर्मेट विनिर्देशक आवश्यक है?",
        "options": ["%f", "%lf", "%d", "%s"],
        "correctIndex": 1,
        "explanation": "scanf strictly requires %lf for double; %f is for float.",
        "explanationHindi": "scanf में double पढ़ने के लिए अनिवार्य रूप से %lf का उपयोग होता है।"
    },
    {
        "id": "io-e17",
        "question": "What happens if a user enters letters when scanf(\"%d\", &num) is expecting a number?",
        "questionHindi": "यदि scanf(\"%d\", &num) संख्या की प्रतीक्षा कर रहा हो और यूजर अक्षर दर्ज कर दे, तो क्या होगा?",
        "options": [
            "scanf fails, returns 0, and leaves the unread characters in the input buffer",
            "The program automatically crashes",
            "The letters are converted to their ASCII sum",
            "num becomes negative"
        ],
        "correctIndex": 0,
        "explanation": "Input matching fails, scanf returns 0 conversions, and bad input remains in the stream.",
        "explanationHindi": "scanf विफल होकर 0 लौटाता है और इनपुट बफर में वे अक्षर वैसे ही फंसे रह जाते हैं।"
    },
    {
        "id": "io-e18",
        "question": "Which format specifier prints an integer in Octal (base-8) format?",
        "questionHindi": "किसी पूर्णांक को ऑक्टल (बेस-8) प्रारूप में प्रिंट करने के लिए कौन-सा विनिर्देशक है?",
        "options": ["%d", "%o", "%x", "%u"],
        "correctIndex": 1,
        "explanation": "%o prints integer in octal representation.",
        "explanationHindi": "%o का उपयोग ऑक्टल प्रारूप के लिए किया जाता है।"
    },
    {
        "id": "io-e19",
        "question": "Which format specifier prints an integer in Hexadecimal (base-16) lowercase format?",
        "questionHindi": "पूर्णांक को हेक्साडेसिमल (बेस-16) छोटे अक्षरों में प्रिंट करने के लिए कौन-सा विनिर्देशक है?",
        "options": ["%h", "%x", "%p", "%o"],
        "correctIndex": 1,
        "explanation": "%x prints in hexadecimal (a-f); %X prints in uppercase (A-F).",
        "explanationHindi": "%x का उपयोग हेक्साडेसिमल छोटे अक्षरों के लिए किया जाता है।"
    },
    {
        "id": "io-e20",
        "question": "What is the standard stream identifier for error messages in C?",
        "questionHindi": "C भाषा में त्रुटि संदेशों (Error messages) के लिए मानक स्ट्रीम कौन-सी है?",
        "options": ["stdin", "stdout", "stderr", "stdlog"],
        "correctIndex": 2,
        "explanation": "stderr is standard error stream (unbuffered by default).",
        "explanationHindi": "stderr मानक एरर स्ट्रीम है जो बिना बफरिंग के तुरंत एरर दिखाती है।"
    }
]

io_hard = [
    {
        "id": "io-h1",
        "question": "What is the return value of the printf() function in C?",
        "questionHindi": "C भाषा में printf() फंक्शन का रिटर्न मान (Return Value) क्या होता है?",
        "options": [
            "Always 0",
            "The total count of characters successfully printed to output",
            "The value of the last printed variable",
            "1 on success, 0 on failure"
        ],
        "correctIndex": 1,
        "explanation": "printf returns the total number of characters successfully written to stdout, or negative on error.",
        "explanationHindi": "printf स्क्रीन पर सफलतापूर्वक प्रिंट किए गए कुल अक्षरों की संख्या लौटाता है।"
    },
    {
        "id": "io-h2",
        "question": "What is the return value of the scanf() function in C?",
        "questionHindi": "C भाषा में scanf() फंक्शन क्या मान लौटाता है?",
        "options": [
            "The sum of entered numbers",
            "The number of input items successfully matched and assigned, or EOF on input failure",
            "Always 1",
            "The memory address of the first variable"
        ],
        "correctIndex": 1,
        "explanation": "scanf returns the count of successfully matched and assigned format arguments.",
        "explanationHindi": "scanf सफलतापूर्वक पढ़े और असाइन किए गए इनपुट आइटम्स की संख्या लौटाता है।"
    },
    {
        "id": "io-h3",
        "question": "What does printf(\"%-10d\", 42); do with the output formatting?",
        "questionHindi": "printf(\"%-10d\", 42); आउटपुट फॉर्मेटिंग में क्या करता है?",
        "options": [
            "Prints 42 left-justified within a 10-character wide field, padded with trailing spaces",
            "Subtracts 10 from 42",
            "Prints -42 ten times",
            "Prints 42 right-justified with 10 leading zeroes"
        ],
        "correctIndex": 0,
        "explanation": "The minus flag '-' indicates left-alignment within the minimum field width of 10 characters.",
        "explanationHindi": "10 अक्षरों की चौड़ाई में 42 को बाईं ओर (Left-aligned) रखेगा और दाईं ओर खाली जगह छोड़ेगा।"
    },
    {
        "id": "io-h4",
        "question": "What does printf(\"%06d\", 123); output?",
        "questionHindi": "printf(\"%06d\", 123); का आउटपुट क्या होगा?",
        "options": ["000123", "   123", "123000", "0123"],
        "correctIndex": 0,
        "explanation": "The '0' flag pads the 6-character field with leading zeroes: 000123.",
        "explanationHindi": "यह 6 अंकों की कुल चौड़ाई बनाने के लिए आगे शून्य जोड़ेगा: '000123'।"
    },
    {
        "id": "io-h5",
        "question": "Why does a subsequent scanf(\"%c\", &ch) often get skipped after reading an integer with scanf(\"%d\", &x)?",
        "questionHindi": "scanf(\"%d\", &x) के बाद तुरंत scanf(\"%c\", &ch) लिखने पर कैरेक्टर इनपुट अक्सर क्यों छूट जाता है?",
        "options": [
            "The newline character '\\n' generated when pressing Enter is left in the input buffer and immediately consumed by %c",
            "The keyboard turns off",
            "%c is not compatible with %d",
            "C compilers only permit one scanf per program"
        ],
        "correctIndex": 0,
        "explanation": "%d stops at newline '\\n'; the subsequent %c immediately reads that leftover '\\n' as valid character input.",
        "explanationHindi": "क्योंकि Enter दबाने पर छूटा हुआ '\\n' बफर में रह जाता है जिसे %c तुरंत पढ़ लेता है।"
    },
    {
        "id": "io-h6",
        "question": "How do you fix the leftover newline buffer issue when reading a char in scanf?",
        "questionHindi": "scanf में कैरेक्टर पढ़ते समय बचे हुए न्यूलाइन बफर को ठीक करने का सबसे सरल तरीका क्या है?",
        "options": [
            "Put a leading space in the format string: scanf(\" %c\", &ch);",
            "Restart the operating system",
            "Use printf() instead",
            "Remove stdio.h"
        ],
        "correctIndex": 0,
        "explanation": "A leading space in \" %c\" tells scanf to skip all leading whitespace characters including '\\n'.",
        "explanationHindi": "फॉर्मेट स्ट्रिंग में आगे स्पेस लगाकर: scanf(\" %c\", &ch); जो सभी खाली जगहों और न्यूलाइन को छोड़ देता है।"
    },
    {
        "id": "io-h7",
        "question": "What is the scanset syntax in scanf to read a full string containing spaces until the Enter key is pressed?",
        "questionHindi": "Enter दबाने तक स्पेस सहित पूरी स्ट्रिंग पढ़ने के लिए scanf का स्कैनसेट सिंटेक्स क्या है?",
        "options": [
            "scanf(\"%[^\n]s\", str);",
            "scanf(\"%s*\", str);",
            "scanf(\"%all\", str);",
            "scanf(\"%text\", str);"
        ],
        "correctIndex": 0,
        "explanation": "%[^\n] reads any characters until a newline character '\\n' is encountered.",
        "explanationHindi": "scanf(\"%[^\n]s\", str); न्यूलाइन आने तक के सभी अक्षरों व स्पेस को पढ़ता है।"
    },
    {
        "id": "io-h8",
        "question": "What does the asterisk '*' assignment-suppression flag do in scanf (e.g. scanf(\"%*d %d\", &val))?",
        "questionHindi": "scanf(\"%*d %d\", &val) में तारा '*' चिह्न क्या कार्य करता है?",
        "options": [
            "It reads the integer matching %*d from the input and discards/skips it without storing it in any variable",
            "It multiplies the input by 2",
            "It creates a pointer",
            "It causes an error"
        ],
        "correctIndex": 0,
        "explanation": "Asterisk suppresses assignment, reading and discarding the matching input item.",
        "explanationHindi": "यह पहले इनपुट को पढ़ता है लेकिन उसे किसी चर में स्टोर किए बिना छोड़ (Discard) देता है।"
    },
    {
        "id": "io-h9",
        "question": "Why is using fflush(stdin) to clear keyboard input buffers non-portable and bad practice?",
        "questionHindi": "कीबोर्ड इनपुट बफर खाली करने के लिए fflush(stdin) का उपयोग करना खराब अभ्यास क्यों माना जाता है?",
        "options": [
            "According to the ISO C standard, fflush() behavior on input streams is strictly Undefined Behavior (it only works reliably on MSVC)",
            "It deletes hard drive files",
            "It disables keyboard input",
            "It slows execution by 100x"
        ],
        "correctIndex": 0,
        "explanation": "C standard specifies fflush is only defined for output streams; calling it on stdin is undefined behavior.",
        "explanationHindi": "ISO C मानक के अनुसार इनपुट स्ट्रीम पर fflush का व्यवहार अपरिभाषित (UB) है; Linux/GCC में यह काम नहीं करता।"
    },
    {
        "id": "io-h10",
        "question": "What is the portable, standard C method to clear all leftover characters in the input buffer?",
        "questionHindi": "इनपुट बफर के बचे हुए कैरेक्टर्स साफ करने का मानक और सुरक्षित तरीका क्या है?",
        "options": [
            "int c; while ((c = getchar()) != '\\n' && c != EOF);",
            "clear_buffer();",
            "flush_all();",
            "delete_stdin();"
        ],
        "correctIndex": 0,
        "explanation": "A loop consuming characters until newline or EOF empties the input stream portably.",
        "explanationHindi": "एक लूप चलाकर न्यूलाइन या EOF आने तक एक-एक कैरेक्टर को निकालते जाना।"
    },
    {
        "id": "io-h11",
        "question": "What is the difference between %i and %d format specifiers in scanf()?",
        "questionHindi": "scanf() में %i और %d विनिर्देशकों में क्या सूक्ष्म अंतर होता है?",
        "options": [
            "%d assumes decimal base-10 only; %i auto-detects octal (with 0 prefix) and hex (with 0x prefix)",
            "%i is for float",
            "%d is for double",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "%i auto-detects base: 012 is read as octal 10, 0x12 as hex 18. %d always reads base 10.",
        "explanationHindi": "%d केवल दशमलव (Base 10) पढ़ता है; %i उपसर्ग देखकर ऑक्टल (0) और हेक्स (0x) को स्वतः पहचान लेता है।"
    },
    {
        "id": "io-h12",
        "question": "What does the function fflush(stdout) do?",
        "questionHindi": "fflush(stdout) फंक्शन क्या कार्य करता है?",
        "options": [
            "Forces immediate flushing of the stdout output buffer to the screen, even without a trailing newline",
            "Clears the screen like clrscr()",
            "Deletes the last printed line",
            "Terminates stdout"
        ],
        "correctIndex": 0,
        "explanation": "fflush forces buffered text out to the display device immediately.",
        "explanationHindi": "यह बफर में रुके हुए आउटपुट को तुरंत स्क्रीन पर भेजने (दिखाने) के लिए मजबूर करता है।"
    },
    {
        "id": "io-h13",
        "question": "What does the snprintf() function do that makes it safer than sprintf()?",
        "questionHindi": "sprintf() की तुलना में snprintf() किस कारण से अधिक सुरक्षित होता है?",
        "options": [
            "It accepts a maximum buffer size limit parameter 'n' to strictly prevent buffer overflow memory corruption",
            "It prints faster",
            "It encrypts strings",
            "It automatically adds comments"
        ],
        "correctIndex": 0,
        "explanation": "snprintf(buf, size, ...) guarantees never writing more than 'size' bytes, preventing overflow.",
        "explanationHindi": "यह अधिकतम बफर साइज 'n' की सीमा स्वीकार करता है जिससे बफर ओवरफ्लो की संभावना समाप्त हो जाती है।"
    },
    {
        "id": "io-h14",
        "question": "What is a 'Format String Vulnerability' in C?",
        "questionHindi": "C भाषा में 'फॉर्मेट स्ट्रिंग वल्नेरेबिलिटी' क्या सुरक्षा खामी होती है?",
        "options": [
            "Passing unsanitized user input directly as the first format argument of printf(user_str) instead of printf(\"%s\", user_str)",
            "Forgetting to include stdio.h",
            "Using %d for float",
            "Using too many printf calls"
        ],
        "correctIndex": 0,
        "explanation": "printf(user_str) allows malicious inputs containing %x and %n to view or overwrite stack memory.",
        "explanationHindi": "यूजर इनपुट को सीधे printf(input) में पास करना, जिससे हैकर्स स्टैक मेमोरी देख या बदल सकते हैं।"
    },
    {
        "id": "io-h15",
        "question": "What does the rare '%n' format specifier in printf() do?",
        "questionHindi": "printf() में दुर्लभ '%n' फॉर्मेट विनिर्देशक क्या करता है?",
        "options": [
            "Stores the count of characters printed so far into the integer variable pointed to by its pointer argument",
            "Prints a newline",
            "Prints NULL",
            "Generates random numbers"
        ],
        "correctIndex": 0,
        "explanation": "%n writes the number of characters printed up to that point into an int* pointer parameter.",
        "explanationHindi": "उस बिंदु तक स्क्रीन पर प्रिंट हुए कुल अक्षरों की संख्या को दिए गए पॉइंटर वेरिएबल में स्टोर करता है।"
    },
    {
        "id": "io-h16",
        "question": "What does the 'sscanf()' function do?",
        "questionHindi": "'sscanf()' फंक्शन क्या कार्य करता है?",
        "options": [
            "Reads formatted data from a string in memory rather than from keyboard stdin",
            "Scans the hard drive for viruses",
            "Scans screen pixels",
            "Super-fast keyboard scanning"
        ],
        "correctIndex": 0,
        "explanation": "sscanf reads and parses formatted variables from an existing character string.",
        "explanationHindi": "कीबोर्ड के बजाय मेमोरी में पहले से मौजूद किसी स्ट्रिंग से फॉर्मेटेड डेटा को पढ़ता है।"
    },
    {
        "id": "io-h17",
        "question": "What is the output of: printf(\"%+d\", 55);?",
        "questionHindi": "printf(\"%+d\", 55); का आउटपुट क्या होगा?",
        "options": ["+55", "55", "-55", "Error"],
        "correctIndex": 0,
        "explanation": "The '+' flag forces printing of a plus sign for positive numbers.",
        "explanationHindi": "'+' फ्लैग धनात्मक संख्या होने पर भी अनिवार्य रूप से '+' चिह्न दिखाता है: '+55'।"
    },
    {
        "id": "io-h18",
        "question": "What is the difference between Buffered I/O and Unbuffered I/O?",
        "questionHindi": "बफर्ड I/O और अनबफर्ड I/O में क्या अंतर है?",
        "options": [
            "Buffered collects data in an intermediate RAM buffer before performing expensive system calls; unbuffered writes immediately",
            "Buffered uses no memory",
            "Unbuffered is for audio only",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Buffering reduces system call overhead by batching input/output operations in memory blocks.",
        "explanationHindi": "बफर्ड में डेटा पहले रैम में इकट्ठा होकर थोक में जाता है; अनबफर्ड में तुरंत एक-एक बाइट भेजी जाती है।"
    },
    {
        "id": "io-h19",
        "question": "What does the escape sequence '\\r' (Carriage Return) do to the console cursor?",
        "questionHindi": "कंसोल कर्सर पर '\\r' (कैरिज रिटर्न) का क्या प्रभाव पड़ता है?",
        "options": [
            "Moves the cursor back to the beginning of the CURRENT line without advancing to a new line",
            "Deletes the entire line",
            "Reverses the text characters",
            "Beeps the motherboard speaker"
        ],
        "correctIndex": 0,
        "explanation": "\\r returns the cursor to column 0 of the current line, allowing overwriting printed text.",
        "explanationHindi": "यह कर्सर को उसी वर्तमान लाइन की शुरुआत में वापस ले आता है, जिससे पुरानी लिखावट पर ओवरराइट हो सकता है।"
    },
    {
        "id": "io-h20",
        "question": "What does the escape sequence '\\a' do?",
        "questionHindi": "'\\a' एस्केप सीक्वेंस क्या करता है?",
        "options": [
            "Produces an audible Alert / Bell sound through the computer terminal speaker",
            "Appends text",
            "Clears memory",
            "Aligns text to center"
        ],
        "correctIndex": 0,
        "explanation": "\\a produces an alert (beep/bell) sound on supporting terminals.",
        "explanationHindi": "यह टर्मिनल स्पीकर से एक बीप (अलर्ट बेल) की आवाज उत्पन्न करता है।"
    }
]

register("input-output", io_easy, io_hard)
print("Registered Topic 6: input-output")

# -------------------------------------------------------------
# TOPIC 7: operator (Operators & Expression Evaluation)
# -------------------------------------------------------------
op_easy = [
    {
        "id": "op-e1",
        "question": "What is an Operator in C?",
        "questionHindi": "C भाषा में ऑपरेटर (Operator) क्या होता है?",
        "options": [
            "A special symbol that tells the compiler to perform a specific mathematical, logical, or relational manipulation on operands",
            "A human computer engineer",
            "A hardware component",
            "A source file extension"
        ],
        "correctIndex": 0,
        "explanation": "Operators are symbols (+, -, *, &&, etc.) that operate on data values (operands).",
        "explanationHindi": "ऑपरेटर एक विशेष प्रतीक (चिह्न) है जो ऑपरेंड्स पर गणितीय या तार्किक क्रियाएं करता है।"
    },
    {
        "id": "op-e2",
        "question": "Which of the following is an Arithmetic Operator in C?",
        "questionHindi": "इनमें से कौन-सा C भाषा में अंकगणितीय (Arithmetic) ऑपरेटर है?",
        "options": ["&&", "==", "%", "<="],
        "correctIndex": 2,
        "explanation": "% (modulus) is an arithmetic operator along with +, -, *, and /.",
        "explanationHindi": "% (मॉड्यूलस) अंकगणितीय ऑपरेटर है जो शेषफल निकालता है।"
    },
    {
        "id": "op-e3",
        "question": "What is the result of the integer division: 17 / 5 in C?",
        "questionHindi": "C में पूर्णांक भाग 17 / 5 का परिणाम क्या होगा?",
        "options": ["3.4", "3", "2", "3.0"],
        "correctIndex": 1,
        "explanation": "Both operands are integers, so integer division produces 3 (fraction discarded).",
        "explanationHindi": "पूर्णांक भाग में दशमलव हट जाता है और परिणाम केवल 3 आता है।"
    },
    {
        "id": "op-e4",
        "question": "What is the result of the modulus expression: 17 % 5 in C?",
        "questionHindi": "C में 17 % 5 का परिणाम क्या होगा?",
        "options": ["3", "2", "3.4", "0"],
        "correctIndex": 1,
        "explanation": "17 divided by 5 leaves a remainder of 2.",
        "explanationHindi": "17 को 5 से भाग देने पर शेषफल 2 बचता है।"
    },
    {
        "id": "op-e5",
        "question": "What is the crucial difference between '=' and '==' in C?",
        "questionHindi": "C में '=' और '==' में क्या महत्वपूर्ण अंतर है?",
        "options": [
            "'=' is the assignment operator (assigns value); '==' is the relational equality operator (tests equality)",
            "Both are completely identical",
            "'==' is for strings only",
            "'=' is logical AND"
        ],
        "correctIndex": 0,
        "explanation": "= assigns values; == tests if two expressions are equal.",
        "explanationHindi": "'=' मान डालने (Assignment) के लिए है; '==' समानता की तुलना (Equality) जांचने के लिए है।"
    },
    {
        "id": "op-e6",
        "question": "Which logical operator represents logical AND in C?",
        "questionHindi": "C भाषा में तार्किक AND (Logical AND) के लिए कौन-सा प्रतीक है?",
        "options": ["&", "&&", "AND", "."],
        "correctIndex": 1,
        "explanation": "&& represents logical AND; single & is bitwise AND.",
        "explanationHindi": "&& तार्किक AND ऑपरेटर है; सिंगल & बिटवाइज़ AND होता है।"
    },
    {
        "id": "op-e7",
        "question": "When does a Logical AND (&&) expression evaluate to TRUE (1)?",
        "questionHindi": "तार्किक AND (&&) एक्सप्रेशन कब सत्य (1) परिणाम देता है?",
        "options": [
            "Only when BOTH operand conditions are true (non-zero)",
            "When at least one operand is true",
            "When both operands are false",
            "When operands are equal to 0"
        ],
        "correctIndex": 0,
        "explanation": "&& requires both conditions to be true simultaneously.",
        "explanationHindi": "केवल तभी जब दोनों शर्तें एक साथ सत्य (True) हों।"
    },
    {
        "id": "op-e8",
        "question": "Which logical operator represents logical OR in C?",
        "questionHindi": "C भाषा में तार्किक OR (Logical OR) के लिए कौन-सा प्रतीक है?",
        "options": ["||", "|", "OR", "!"],
        "correctIndex": 0,
        "explanation": "|| represents logical OR.",
        "explanationHindi": "|| तार्किक OR ऑपरेटर का प्रतीक है।"
    },
    {
        "id": "op-e9",
        "question": "When does a Logical OR (||) expression evaluate to TRUE (1)?",
        "questionHindi": "तार्किक OR (||) एक्सप्रेशन कब सत्य (1) परिणाम देता है?",
        "options": [
            "If AT LEAST ONE of the conditions is true (non-zero)",
            "Only when both are true",
            "Only when both are false",
            "Never"
        ],
        "correctIndex": 0,
        "explanation": "|| returns true if either or both operands are true.",
        "explanationHindi": "जब दोनों में से कम से कम कोई भी एक शर्त सत्य हो।"
    },
    {
        "id": "op-e10",
        "question": "Which operator inverts the truth value of a condition (Logical NOT)?",
        "questionHindi": "सत्य को असत्य और असत्य को सत्य में बदलने वाला ऑपरेटर (Logical NOT) कौन-सा है?",
        "options": ["~", "!", "^", "-"],
        "correctIndex": 1,
        "explanation": "! inverts truth value (!1 is 0, !0 is 1).",
        "explanationHindi": "! (Logical NOT) शर्त के मान को उलट देता है।"
    },
    {
        "id": "op-e11",
        "question": "What is the difference between Pre-increment (++x) and Post-increment (x++)?",
        "questionHindi": "प्री-इंक्रीमेंट (++x) और पोस्ट-इंक्रीमेंट (x++) में क्या अंतर है?",
        "options": [
            "++x increments the value FIRST before using it; x++ uses the current value first, then increments it afterwards",
            "++x increases by 2; x++ increases by 1",
            "++x is for float; x++ is for int",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Prefix increments before evaluation; Postfix evaluates first, then increments.",
        "explanationHindi": "++x पहले मान बढ़ाता है फिर उपयोग करता है; x++ पहले पुराना मान देता है फिर बढ़ाता है।"
    },
    {
        "id": "op-e12",
        "question": "If int x = 5; int y = ++x; what are the values of x and y?",
        "questionHindi": "यदि int x = 5; int y = ++x; हो, तो x और y के मान क्या होंगे?",
        "options": ["x=6, y=6", "x=6, y=5", "x=5, y=6", "x=5, y=5"],
        "correctIndex": 0,
        "explanation": "++x increments x to 6 first, then assigns 6 to y.",
        "explanationHindi": "++x से पहले x बढ़कर 6 होगा, फिर y को 6 मिलेगा: दोनों 6 होंगे।"
    },
    {
        "id": "op-e13",
        "question": "If int x = 5; int y = x++; what are the values of x and y?",
        "questionHindi": "यदि int x = 5; int y = x++; हो, तो x और y के मान क्या होंगे?",
        "options": ["x=6, y=6", "x=6, y=5", "x=5, y=6", "x=5, y=5"],
        "correctIndex": 1,
        "explanation": "x++ assigns original 5 to y first, then x becomes 6.",
        "explanationHindi": "x++ पहले y को पुराना मान 5 देगा, फिर x बढ़कर 6 होगा: x=6, y=5।"
    },
    {
        "id": "op-e14",
        "question": "Which of the following is the Conditional (Ternary) operator in C?",
        "questionHindi": "C भाषा में कंडीशनल (टर्नरी) ऑपरेटर कौन-सा है?",
        "options": ["? :", "if-else", "&& ||", "::"],
        "correctIndex": 0,
        "explanation": "? : is the only ternary operator taking 3 operands: (condition ? expr1 : expr2).",
        "explanationHindi": "? : एकमात्र टर्नरी ऑपरेटर है जो 3 ऑपरेंड लेता है।"
    },
    {
        "id": "op-e15",
        "question": "What is the value of: (10 > 5) ? 100 : 200 in C?",
        "questionHindi": "C में (10 > 5) ? 100 : 200 का मान क्या होगा?",
        "options": ["100", "200", "1", "0"],
        "correctIndex": 0,
        "explanation": "10 > 5 is true, so the first expression (100) is evaluated and returned.",
        "explanationHindi": "शर्त 10 > 5 सत्य है, इसलिए पहला मान 100 प्राप्त होगा।"
    },
    {
        "id": "op-e16",
        "question": "What does the compound assignment operator 'x += 5' do?",
        "questionHindi": "'x += 5' कंपाउंड असाइनमेंट ऑपरेटर क्या कार्य करता है?",
        "options": ["x = x + 5", "x = 5", "x = x * 5", "x = 5 + 5"],
        "correctIndex": 0,
        "explanation": "x += 5 is shorthand for x = x + 5.",
        "explanationHindi": "यह x = x + 5 का संक्षिप्त रूप है (x में 5 जोड़कर वापस x में डालना)।"
    },
    {
        "id": "op-e17",
        "question": "What does the Bitwise AND operator '&' do on binary bits?",
        "questionHindi": "बिटवाइज़ AND ऑपरेटर '&' बाइनरी बिट्स पर क्या कार्य करता है?",
        "options": [
            "Sets the result bit to 1 only if BOTH corresponding bits are 1",
            "Sets bit to 1 if either bit is 1",
            "Inverts all bits",
            "Shifts bits to left"
        ],
        "correctIndex": 0,
        "explanation": "Bitwise AND produces 1 only when both compared bits are 1.",
        "explanationHindi": "परिणामी बिट तभी 1 बनती है जब दोनों तुलना की जाने वाली बिट्स 1 हों।"
    },
    {
        "id": "op-e18",
        "question": "What does the Bitwise OR operator '|' do on binary bits?",
        "questionHindi": "बिटवाइज़ OR ऑपरेटर '|' बाइनरी बिट्स पर क्या कार्य करता है?",
        "options": [
            "Sets the result bit to 1 if AT LEAST ONE of the bits is 1",
            "Sets bit to 1 only if both are 0",
            "Deletes all bits",
            "Swaps bits"
        ],
        "correctIndex": 0,
        "explanation": "Bitwise OR produces 1 if either or both bits are 1.",
        "explanationHindi": "यदि दोनों में से कोई भी एक बिट 1 हो तो परिणाम 1 होता है।"
    },
    {
        "id": "op-e19",
        "question": "What is the result of 5 == 5 in C?",
        "questionHindi": "C भाषा में 5 == 5 का मान क्या होगा?",
        "options": ["true (string)", "1 (integer true)", "5", "0"],
        "correctIndex": 1,
        "explanation": "Relational operators produce integer 1 for true and 0 for false in C.",
        "explanationHindi": "C में तुलनात्मक ऑपरेटर सत्य होने पर पूर्णांक 1 लौटाते हैं।"
    },
    {
        "id": "op-e20",
        "question": "What is the result of 5 != 5 in C?",
        "questionHindi": "C भाषा में 5 != 5 का मान क्या होगा?",
        "options": ["1", "0 (integer false)", "false (string)", "-1"],
        "correctIndex": 1,
        "explanation": "5 != 5 is false, yielding integer 0.",
        "explanationHindi": "5 != 5 असत्य है, इसलिए पूर्णांक 0 प्राप्त होगा।"
    }
]

op_hard = [
    {
        "id": "op-h1",
        "question": "What is 'Short-Circuit Evaluation' in C logical expressions?",
        "questionHindi": "C भाषा में तार्किक एक्सप्रेशन्स में 'शॉर्ट-सर्किट मूल्यांकन' क्या होता है?",
        "options": [
            "In 'A && B', if A is false, B is NOT evaluated at all; in 'A || B', if A is true, B is NOT evaluated at all",
            "Hardware short-circuit in motherboard",
            "Operators skipping division by zero automatically",
            "Expressions evaluating right-to-left"
        ],
        "correctIndex": 0,
        "explanation": "C skips evaluating the second operand if the first operand already determines the truth value.",
        "explanationHindi": "यदि पहले भाग से ही परिणाम तय हो जाए (जैसे && में पहला 0 हो), तो दूसरा भाग कम्पाइलर चलाता ही नहीं।"
    },
    {
        "id": "op-h2",
        "question": "What is the output of the following code snippet?\nint a = 0, b = 5;\nif (a && ++b) {}\nprintf(\"%d\", b);",
        "questionHindi": "इस कोड का आउटपुट क्या होगा?\nint a = 0, b = 5; if (a && ++b) {} printf(\"%d\", b);",
        "options": ["5 (क्योंकि a=0 होने से ++b शॉर्ट-सर्किट होकर चला ही नहीं)", "6", "0", "1"],
        "correctIndex": 0,
        "explanation": "Since 'a' is 0 (false), the logical && short-circuits; ++b is NEVER executed, leaving b as 5.",
        "explanationHindi": "क्योंकि a शून्य है, इसलिए && के कारण ++b कभी निष्पादित ही नहीं हुआ; b का मान 5 ही रहा।"
    },
    {
        "id": "op-h3",
        "question": "How does the Bitwise XOR operator '^' allow swapping two variables without any temporary variable?",
        "questionHindi": "बिटवाइज़ XOR (^) ऑपरेटर बिना तीसरे वेरिएबल के दो संख्याओं की अदला-बदली कैसे करता है?",
        "options": [
            "a ^= b; b ^= a; a ^= b; (because x ^ x = 0 and x ^ 0 = x)",
            "a = a ^ b + 2;",
            "a = ~b;",
            "a ^= a;"
        ],
        "correctIndex": 0,
        "explanation": "XORing thrice swaps values using properties A ^ A = 0 and A ^ 0 = A.",
        "explanationHindi": "a ^= b; b ^= a; a ^= b; क्योंकि XOR के गुणों से मान आपस में बदल जाते हैं।"
    },
    {
        "id": "op-h4",
        "question": "What does shifting an integer to the left by 1 bit (x << 1) mathematically accomplish?",
        "questionHindi": "किसी पूर्णांक को 1 बिट बाईं ओर खिसकाने (x << 1) से गणितीय रूप से क्या होता है?",
        "options": ["Multiplies the integer by 2 (x * 2)", "Divides the integer by 2", "Adds 1 to x", "Squares x"],
        "correctIndex": 0,
        "explanation": "Left shift by n bits multiplies the number by 2^n.",
        "explanationHindi": "1 बिट लेफ्ट शिफ्ट करने से संख्या 2 से गुणा हो जाती है (x * 2)।"
    },
    {
        "id": "op-h5",
        "question": "What does shifting a positive integer to the right by 1 bit (x >> 1) mathematically accomplish?",
        "questionHindi": "किसी धनात्मक पूर्णांक को 1 बिट दाईं ओर खिसकाने (x >> 1) से गणितीय रूप से क्या होता है?",
        "options": ["Multiplies by 2", "Divides the integer by 2 (x / 2)", "Subtracts 1", "Finds square root"],
        "correctIndex": 1,
        "explanation": "Right shift by n bits divides positive integers by 2^n.",
        "explanationHindi": "1 बिट राइट शिफ्ट करने से धनात्मक संख्या 2 से विभाजित हो जाती है (x / 2)।"
    },
    {
        "id": "op-h6",
        "question": "What is the value of bitwise NOT (~x) on a signed 32-bit two's complement integer x?",
        "questionHindi": "C में साइन्ड पूर्णांक x पर बिटवाइज़ NOT (~x) का गणितीय मान क्या होता है?",
        "options": ["-(x + 1)", "-x", "x - 1", "1 / x"],
        "correctIndex": 0,
        "explanation": "In two's complement, ~x equals -(x + 1). For example, ~5 is -6, and ~0 is -1.",
        "explanationHindi": "टूज़ कॉम्प्लीमेंट में ~x का मान -(x + 1) होता है (जैसे ~5 का मान -6 होगा)।"
    },
    {
        "id": "op-h7",
        "question": "Why is the expression: 'if (flags & 1 == 0)' a dangerous logic bug in C?",
        "questionHindi": "C में 'if (flags & 1 == 0)' लिखना एक बहुत बड़ा लॉजिक बग क्यों बन जाता है?",
        "options": [
            "Relational '==' has higher precedence than bitwise '&', so it evaluates as 'flags & (1 == 0)', which is 'flags & 0'",
            "flags cannot be bitwise ANDed",
            "== only works on floats",
            "Compiler error is thrown"
        ],
        "correctIndex": 0,
        "explanation": "== binds tighter than &; code must be written with parentheses: if ((flags & 1) == 0).",
        "explanationHindi": "क्योंकि '==' की प्राथमिकता '&' से अधिक है, जिससे यह 'flags & (1 == 0)' बन जाता है।"
    },
    {
        "id": "op-h8",
        "question": "What is the behavior of: int i = 5; i = i++ in C according to the ISO C standard?",
        "questionHindi": "ISO C मानक के अनुसार 'int i = 5; i = i++;' का व्यवहार क्या होता है?",
        "options": [
            "Undefined Behavior (unsequenced modification of the same variable between sequence points)",
            "i is guaranteed to be 6",
            "i is guaranteed to be 5",
            "Compilation error"
        ],
        "correctIndex": 0,
        "explanation": "Modifying a scalar variable twice without an intervening sequence point is Undefined Behavior.",
        "explanationHindi": "यह अपरिभाषित व्यवहार (Undefined Behavior) है क्योंकि एक ही चर को बिना अनुक्रम के दो बार बदला गया।"
    },
    {
        "id": "op-h9",
        "question": "What does the Comma Operator ',' do in an expression like: x = (a = 2, b = 4, a + b);?",
        "questionHindi": "x = (a = 2, b = 4, a + b); में कॉमा ऑपरेटर ',' क्या परिणाम देता है?",
        "options": [
            "Evaluates each sub-expression left-to-right and returns the value of the rightmost sub-expression (a+b = 6)",
            "Causes compilation error",
            "Returns 2",
            "Returns 4"
        ],
        "correctIndex": 0,
        "explanation": "Comma operator evaluates from left to right and evaluates to the final rightmost expression: 6.",
        "explanationHindi": "यह बाएँ से दाएँ सभी को चलाता है और सबसे अंतिम (दाएँ) एक्सप्रेशन का मान लौटाता है: 6।"
    },
    {
        "id": "op-h10",
        "question": "Does the sizeof operator evaluate expressions at runtime (e.g. int i = 5; sizeof(i++);)?",
        "questionHindi": "क्या sizeof ऑपरेटर अंदर लिखे एक्सप्रेशन को रनटाइम पर चलाता है (जैसे sizeof(i++))?",
        "options": [
            "No, sizeof is evaluated at compile time; i++ is never executed, so i remains 5",
            "Yes, i becomes 6",
            "It throws runtime error",
            "Only for variable length arrays"
        ],
        "correctIndex": 0,
        "explanation": "sizeof inspects type size at compile-time without evaluating expressions (except C99 VLAs).",
        "explanationHindi": "नहीं, sizeof कम्पाइल-टाइम पर काम करता है; i++ कभी नहीं चलेगा और i का मान 5 ही रहेगा।"
    },
    {
        "id": "op-h11",
        "question": "What is the associativity direction of the Assignment operator (=, +=, etc.)?",
        "questionHindi": "असाइनमेंट ऑपरेटरों (=, +=) की साहचर्य दिशा (Associativity) क्या होती है?",
        "options": ["Right-to-Left (दाएँ से बाएँ)", "Left-to-Right (बाएँ से दाएँ)", "Top-to-Bottom", "Random"],
        "correctIndex": 0,
        "explanation": "Assignment associates Right-to-Left: a = b = c = 10 sets c=10, then b=c, then a=b.",
        "explanationHindi": "दाएँ से बाएँ (Right-to-Left) होती है; जैसे a = b = c = 10 में पहले c=10, फिर b=10, फिर a=10।"
    },
    {
        "id": "op-h12",
        "question": "What is the associativity direction of the Conditional (Ternary ? :) operator?",
        "questionHindi": "कंडीशनल टर्नरी (? :) ऑपरेटर की साहचर्य दिशा क्या होती है?",
        "options": ["Right-to-Left", "Left-to-Right", "Non-associative", "Depends on condition"],
        "correctIndex": 0,
        "explanation": "Ternary operator associates Right-to-Left.",
        "explanationHindi": "दाएँ से बाएँ (Right-to-Left) होती है।"
    },
    {
        "id": "op-h13",
        "question": "How do you set the N-th bit (0-indexed) of an integer 'num' to 1 using bitwise operators?",
        "questionHindi": "बिटवाइज़ ऑपरेटर द्वारा किसी संख्या 'num' की N-वीं बिट को 1 कैसे सेट किया जाता है?",
        "options": [
            "num |= (1 << N);",
            "num &= (1 << N);",
            "num ^= (1 << N);",
            "num = 1 << N;"
        ],
        "correctIndex": 0,
        "explanation": "ORing with mask (1 << N) sets the N-th bit to 1 without altering other bits.",
        "explanationHindi": "num |= (1 << N); द्वारा N-वीं बिट 1 बन जाती है और बाकी बिट्स सुरक्षित रहती हैं।"
    },
    {
        "id": "op-h14",
        "question": "How do you clear (set to 0) the N-th bit of an integer 'num' using bitwise operators?",
        "questionHindi": "संख्या 'num' की N-वीं बिट को 0 (Clear) कैसे किया जाता है?",
        "options": [
            "num &= ~(1 << N);",
            "num |= ~(1 << N);",
            "num ^= (1 << N);",
            "num = ~(1 << N);"
        ],
        "correctIndex": 0,
        "explanation": "ANDing with inverted mask ~(1 << N) clears the N-th bit to 0.",
        "explanationHindi": "num &= ~(1 << N); द्वारा N-वीं बिट 0 हो जाती है।"
    },
    {
        "id": "op-h15",
        "question": "How do you toggle (flip 0 to 1 or 1 to 0) the N-th bit of an integer 'num'?",
        "questionHindi": "संख्या 'num' की N-वीं बिट को टॉगल (उलटना: 0 से 1 या 1 से 0) कैसे किया जाता है?",
        "options": [
            "num ^= (1 << N);",
            "num |= (1 << N);",
            "num &= (1 << N);",
            "num = ~num;"
        ],
        "correctIndex": 0,
        "explanation": "XORing with (1 << N) toggles that specific bit.",
        "explanationHindi": "num ^= (1 << N); द्वारा N-वीं बिट उलट जाती है।"
    },
    {
        "id": "op-h16",
        "question": "How can you check if a non-zero positive integer 'num' is a power of 2 using bitwise operators?",
        "questionHindi": "बिटवाइज़ ऑपरेटर से यह कैसे जांचा जाता है कि धनात्मक संख्या 2 की घात (Power of 2) है?",
        "options": [
            "(num & (num - 1)) == 0",
            "(num | (num - 1)) == 0",
            "(num ^ (num - 1)) == 0",
            "(num >> 1) == 0"
        ],
        "correctIndex": 0,
        "explanation": "Powers of 2 have only a single 1 bit (e.g. 8 is 1000b; 8-1 is 0111b; 1000 & 0111 = 0000).",
        "explanationHindi": "(num & (num - 1)) == 0 सत्य होता है क्योंकि 2 की घात में केवल एक ही बिट 1 होती है।"
    },
    {
        "id": "op-h17",
        "question": "What is the precedence rank order among the three logical operators: !, &&, and ||?",
        "questionHindi": "तीन तार्किक ऑपरेटरों: !, &&, और || में प्राथमिकता (Precedence) का सही क्रम क्या है?",
        "options": [
            "! (उच्चतम) > && (मध्यम) > || (निम्नतम)",
            "|| > && > !",
            "&& > || > !",
            "तीनों की प्राथमिकता समान है"
        ],
        "correctIndex": 0,
        "explanation": "Logical NOT (!) has unary precedence; && is higher than ||.",
        "explanationHindi": "! (Unary) सबसे ऊपर है, फिर &&, और सबसे नीचे || आता है।"
    },
    {
        "id": "op-h18",
        "question": "In the ternary expression: 'condition ? expr1 : expr2', what type is the overall expression?",
        "questionHindi": "टर्नरी एक्सप्रेशन में दोनों संभावित परिणामों (expr1 और expr2) के अलग प्रकार होने पर परिणामी प्रकार क्या होगा?",
        "options": [
            "The common promoted type determined by usual arithmetic conversions (e.g. int and double yields double)",
            "Always int",
            "Always void",
            "Whichever branch executes"
        ],
        "correctIndex": 0,
        "explanation": "The type of the conditional expression is determined at compile-time by type promotion.",
        "explanationHindi": "कम्पाइल-टाइम पर दोनों प्रकारों के कॉमन प्रोमोटेड टाइप (जैसे int और double से double) में बदलता है।"
    },
    {
        "id": "op-h19",
        "question": "What is the output of the expression: 1 << 3 in C?",
        "questionHindi": "C में 1 << 3 का मान क्या होगा?",
        "options": ["8", "3", "1", "6"],
        "correctIndex": 0,
        "explanation": "1 shifted left by 3 bits is 1 * 2^3 = 8 (binary 00001000).",
        "explanationHindi": "1 को 3 बिट बाईं ओर खिसकाने पर 1 * 2^3 = 8 बनता है।"
    },
    {
        "id": "op-h20",
        "question": "What does the dereference operator '*' have in common with the prefix increment operator '++' regarding precedence and associativity?",
        "questionHindi": "डिरिफ्रेंस ऑपरेटर '*' और प्रीफिक्स '++' की प्राथमिकता और साहचर्य में क्या समानता है?",
        "options": [
            "Both have identical unary precedence level and associate Right-to-Left",
            "Both associate Left-to-Right",
            "* is higher precedence than ++",
            "++ is lower precedence than +"
        ],
        "correctIndex": 0,
        "explanation": "All unary operators (*, &, ++, --, ~, !, sizeof) share the same precedence and associate Right-to-Left.",
        "explanationHindi": "दोनों यूनेरी ऑपरेटर समान प्राथमिकता रखते हैं और दाएँ से बाएँ (Right-to-Left) जुड़ते हैं।"
    }
]

register("operator", op_easy, op_hard)
print("Registered Topic 7: operator")

# -------------------------------------------------------------
# TOPIC 8: control-statement (Control Statements: Branching & Looping)
# -------------------------------------------------------------
cs_easy = [
    {
        "id": "cs-e1",
        "question": "What is the purpose of Control Statements in C?",
        "questionHindi": "C भाषा में कंट्रोल स्टेटमेंट्स (Control Statements) का क्या उद्देश्य है?",
        "options": [
            "To control and alter the sequential flow of program execution based on conditions and iterations",
            "To control CPU clock voltage",
            "To format printer output",
            "To manage hard disk partitions"
        ],
        "correctIndex": 0,
        "explanation": "Control statements direct branching, decisions, and loop iterations.",
        "explanationHindi": "शर्तों और दोहराव के आधार पर प्रोग्राम के निष्पादन के प्रवाह को नियंत्रित व निर्देशित करना।"
    },
    {
        "id": "cs-e2",
        "question": "In C, what evaluates as FALSE in an 'if' condition statement?",
        "questionHindi": "C भाषा में 'if' कंडीशन में क्या असत्य (FALSE) माना जाता है?",
        "options": ["Only the value 0 (zero)", "-1", "Any non-zero number", "1"],
        "correctIndex": 0,
        "explanation": "In C, strictly zero (0) is FALSE; any non-zero value (1, -5, 100) is considered TRUE.",
        "explanationHindi": "C में केवल शून्य (0) ही असत्य माना जाता है; शून्य के अलावा कोई भी मान सत्य होता है।"
    },
    {
        "id": "cs-e3",
        "question": "What is the correct syntax for a basic 'if' statement in C?",
        "questionHindi": "C में बेसिक 'if' स्टेटमेंट का सही सिंटेक्स क्या है?",
        "options": ["if (condition) { /* code */ }", "if condition then { /* code */ }", "if [condition]:", "IF (condition) THEN"],
        "correctIndex": 0,
        "explanation": "if (condition) with parentheses around condition is standard syntax.",
        "explanationHindi": "if (condition) { /* कोड */ } कोष्ठक के अंदर शर्त के साथ मान्य रूप है।"
    },
    {
        "id": "cs-e4",
        "question": "Which construct allows testing multiple mutually exclusive conditions sequentially?",
        "questionHindi": "एक के बाद एक कई अलग-अलग शर्तों को जांचने के लिए कौन-सा ढांचा प्रयोग होता है?",
        "options": ["else-if ladder", "while loop", "break statement", "goto statement"],
        "correctIndex": 0,
        "explanation": "The else-if ladder evaluates multiple alternative conditions in order.",
        "explanationHindi": "else-if लैडर (Ladder) क्रमिक रूप से कई शर्तों को जांचने की सुविधा देता है।"
    },
    {
        "id": "cs-e5",
        "question": "What data types are strictly permitted in a switch(expression) control statement in C?",
        "questionHindi": "C के switch(expression) स्टेटमेंट में कौन-से डेटा टाइप्स मान्य होते हैं?",
        "options": [
            "Only Integer types (int, short, long, char, enum)",
            "Floats and doubles only",
            "Strings and arrays only",
            "Any data type"
        ],
        "correctIndex": 0,
        "explanation": "switch expressions must evaluate to an integral or enumeration type; floats and strings are illegal.",
        "explanationHindi": "केवल पूर्णांक प्रकार (int, char, enum); दशमलव (float) या स्ट्रिंग्स की अनुमति नहीं है।"
    },
    {
        "id": "cs-e6",
        "question": "What must the 'case' labels in a switch statement be?",
        "questionHindi": "switch स्टेटमेंट में 'case' लेबल्स का क्या होना अनिवार्य है?",
        "options": [
            "Constant expressions or literals (e.g. case 1:, case 'A':)",
            "Variable expressions (e.g. case x:)",
            "Float numbers (case 3.14:)",
            "Function calls"
        ],
        "correctIndex": 0,
        "explanation": "Case labels must be compile-time integer constants or literals.",
        "explanationHindi": "केस लेबल्स केवल स्थिर मान (Constant या Literal) ही हो सकते हैं, वेरिएबल नहीं।"
    },
    {
        "id": "cs-e7",
        "question": "What happens if you omit the 'break;' statement inside a switch case?",
        "questionHindi": "यदि switch केस में 'break;' न लगाया जाए तो क्या होता है?",
        "options": [
            "Execution 'falls through' to execute the statements of subsequent cases until a break or end of switch is reached",
            "Compiler error immediately",
            "Program crashes",
            "Switch restarts from beginning"
        ],
        "correctIndex": 0,
        "explanation": "Omitting break causes Fall-Through into the following case blocks.",
        "explanationHindi": "कंट्रोल नीचे वाले अगले सभी केसों को भी बिना शर्त चला देता है (Fall-Through)।"
    },
    {
        "id": "cs-e8",
        "question": "Which keyword in switch provides a fallback block if no case labels match?",
        "questionHindi": "switch में कोई भी केस मैच न होने पर कौन-सा ब्लॉक चलता है?",
        "options": ["default:", "else:", "otherwise:", "catch:"],
        "correctIndex": 0,
        "explanation": "The default: block executes when none of the explicit case values match.",
        "explanationHindi": "default: ब्लॉक तब निष्पादित होता है जब कोई अन्य केस मैच नहीं करता।"
    },
    {
        "id": "cs-e9",
        "question": "What is an Entry-Controlled loop?",
        "questionHindi": "एंट्री-कंट्रोल्ड (Entry-Controlled) लूप क्या होता है?",
        "options": [
            "A loop that tests the condition BEFORE entering the loop body (e.g. while, for)",
            "A loop that tests the condition at exit",
            "An infinite loop",
            "A loop without condition"
        ],
        "correctIndex": 0,
        "explanation": "while and for test conditions before executing the body; body may execute 0 times.",
        "explanationHindi": "वह लूप जो बॉडी में प्रवेश करने से पहले शर्त जांचता है (जैसे while और for)।"
    },
    {
        "id": "cs-e10",
        "question": "What is an Exit-Controlled loop?",
        "questionHindi": "एग्जिट-कंट्रोल्ड (Exit-Controlled) लूप क्या होता है?",
        "options": [
            "A loop that executes the body AT LEAST ONCE before testing the condition at the end (e.g. do-while)",
            "A loop that never exits",
            "A loop controlled by operating system",
            "A loop with 0 iterations"
        ],
        "correctIndex": 0,
        "explanation": "do-while executes the loop body first, then tests the condition at the bottom.",
        "explanationHindi": "वह लूप जो शर्त जांचने से पहले कम से कम एक बार जरूर चलता है (जैसे do-while)।"
    },
    {
        "id": "cs-e11",
        "question": "What is the mandatory punctuation at the end of a 'do-while' loop statement in C?",
        "questionHindi": "C भाषा में 'do-while' लूप के अंत में कौन-सा विराम चिह्न अनिवार्य है?",
        "options": ["A Semicolon (;)", "A Colon (:)", "A Period (.)", "No punctuation allowed"],
        "correctIndex": 0,
        "explanation": "do { ... } while (condition); strictly requires a terminating semicolon.",
        "explanationHindi": "do { ... } while (condition); के अंत में सेमीकोलन (;) लगाना अनिवार्य है।"
    },
    {
        "id": "cs-e12",
        "question": "What are the three components inside a standard 'for' loop header?",
        "questionHindi": "मानक 'for' लूप के हेडर में कौन-से तीन घटक होते हैं?",
        "options": [
            "for (initialization; condition; increment/decrement)",
            "for (start, stop, step)",
            "for (variable in collection)",
            "for (check, run, stop)"
        ],
        "correctIndex": 0,
        "explanation": "for (init; condition; update) contains initialization, termination test, and update expression.",
        "explanationHindi": "for (इनिशियलाइजेशन; शर्त; इंक्रीमेंट/डिक्रीमेंट)।"
    },
    {
        "id": "cs-e13",
        "question": "What does the 'break' statement do when executed inside a loop?",
        "questionHindi": "लूप के अंदर 'break' स्टेटमेंट चलने पर क्या होता है?",
        "options": [
            "Immediately terminates the loop and jumps to the statement following the loop",
            "Pauses the loop for 1 second",
            "Skips to the next iteration",
            "Restarts the computer"
        ],
        "correctIndex": 0,
        "explanation": "break causes an immediate early termination of the innermost enclosing loop or switch.",
        "explanationHindi": "यह तुरंत लूप को समाप्त करके लूप से बाहर निकाल देता है।"
    },
    {
        "id": "cs-e14",
        "question": "What does the 'continue' statement do when executed inside a loop?",
        "questionHindi": "लूप के अंदर 'continue' स्टेटमेंट चलने पर क्या होता है?",
        "options": [
            "Skips the remaining statements in the CURRENT iteration and jumps directly to the next iteration",
            "Terminates the entire program",
            "Exits the loop completely",
            "Prints current line"
        ],
        "correctIndex": 0,
        "explanation": "continue bypasses the rest of the current iteration body and starts the next iteration.",
        "explanationHindi": "यह वर्तमान चक्कर के बाकी कोड को छोड़कर तुरंत अगले चक्कर (Iteration) पर पहुँच जाता है।"
    },
    {
        "id": "cs-e15",
        "question": "Which of the following creates a clean Infinite Loop in C?",
        "questionHindi": "C में अनंत लूप (Infinite Loop) बनाने का मान्य तरीका कौन-सा है?",
        "options": ["while (1) { } or for (;;) { }", "loop forever;", "repeat 100;", "while (0) { }"],
        "correctIndex": 0,
        "explanation": "while(1) and for(;;) both create non-terminating infinite loops.",
        "explanationHindi": "while (1) { } या for (;;) { } दोनों अनंत लूप बनाते हैं।"
    },
    {
        "id": "cs-e16",
        "question": "What does the 'goto' statement do in C?",
        "questionHindi": "C भाषा में 'goto' स्टेटमेंट क्या करता है?",
        "options": [
            "Unconditionally jumps program control to a labeled statement within the same function",
            "Calls an external website",
            "Opens a new file",
            "Terminates the operating system"
        ],
        "correctIndex": 0,
        "explanation": "goto transfers control unconditionally to a named label (e.g. goto my_label;).",
        "explanationHindi": "यह बिना किसी शर्त के कंट्रोल को उसी फंक्शन के किसी लेबल वाले स्थान पर भेज देता है।"
    },
    {
        "id": "cs-e17",
        "question": "Why is the use of 'goto' widely discouraged in modern structured programming?",
        "questionHindi": "आधुनिक प्रोग्रामिंग में 'goto' का उपयोग करने से क्यों मना किया जाता है?",
        "options": [
            "It creates unreadable, hard-to-maintain, and error-prone 'Spaghetti Code'",
            "It is not supported by compilers",
            "It consumes 100% of CPU memory",
            "It only works on numbers"
        ],
        "correctIndex": 0,
        "explanation": "Uncontrolled jumps produce chaotic spaghetti control flow that is difficult to trace and debug.",
        "explanationHindi": "यह कोड को उलझाकर 'स्पेगेटी कोड' बना देता है जिसे समझना और सुधारना बहुत कठिन होता है।"
    },
    {
        "id": "cs-e18",
        "question": "What is the output of the following code snippet?\nint i = 0;\nwhile (i < 3) {\n    printf(\"%d \", i);\n    i++;\n}",
        "questionHindi": "इस कोड का आउटपुट क्या होगा?\nint i = 0; while (i < 3) { printf(\"%d \", i); i++; }",
        "options": ["0 1 2 ", "0 1 2 3 ", "1 2 3 ", "0 0 0 "],
        "correctIndex": 0,
        "explanation": "Loop runs for i = 0, 1, 2; when i reaches 3, condition (3 < 3) is false: '0 1 2 '.",
        "explanationHindi": "i=0, 1, 2 के लिए चलेगा; जब i=3 होगा तो लूप रुक जाएगा: '0 1 2 '।"
    },
    {
        "id": "cs-e19",
        "question": "What will be printed by: do { printf(\"Hello\"); } while (0);?",
        "questionHindi": "do { printf(\"Hello\"); } while (0); द्वारा क्या प्रिंट होगा?",
        "options": [
            "Hello (exactly once, because do-while runs the body once before testing condition)",
            "Nothing",
            "Hello infinitely",
            "Compiler error"
        ],
        "correctIndex": 0,
        "explanation": "do-while body runs first, prints Hello, then while(0) terminates the loop after 1 run.",
        "explanationHindi": "Hello ठीक एक बार प्रिंट होगा क्योंकि do-while में शर्त बाद में जांची जाती है।"
    },
    {
        "id": "cs-e20",
        "question": "What happens if a semicolon is mistakenly placed after an if statement: if (x > 5); { printf(\"A\"); }?",
        "questionHindi": "यदि if के बाद गलती से सेमीकोलन लगा दिया जाए: if (x > 5); { printf(\"A\"); }, तो क्या होगा?",
        "options": [
            "The if condition treats the semicolon as an empty statement; the block { printf(\"A\"); } executes UNCONDITIONALLY every time",
            "Compiler error halts build",
            "Nothing is ever printed",
            "x becomes 0"
        ],
        "correctIndex": 0,
        "explanation": "The semicolon ends the if statement as an empty null statement; { printf(\"A\"); } runs unconditionally.",
        "explanationHindi": "सेमीकोलन if को वहीं समाप्त कर देता है, जिससे { printf(\"A\"); } हमेशा बिना शर्त चल जाता है।"
    }
]

cs_hard = [
    {
        "id": "cs-h1",
        "question": "What is the 'Dangling Else Problem' in nested conditional statements in C?",
        "questionHindi": "C में नेस्टेड कंडीशन्स में 'डैंगलिंग एल्स' (Dangling Else) समस्या क्या होती है?",
        "options": [
            "An ambiguity where an 'else' binds to the closest preceding unmatched 'if' unless curly braces { } are used",
            "An else statement without code",
            "A missing semicolon in else",
            "An else with a condition"
        ],
        "correctIndex": 0,
        "explanation": "In standard C grammar, an 'else' always attaches to the nearest preceding unmatched 'if'.",
        "explanationHindi": "'else' हमेशा अपने सबसे नजदीकी अधूरे 'if' से जुड़ जाता है, जब तक कि कर्ली ब्रेसेस न लगाए जाएं।"
    },
    {
        "id": "cs-h2",
        "question": "What is 'Duff's Device' in C programming?",
        "questionHindi": "C प्रोग्रामिंग में 'डफ्स डिवाइस' (Duff's Device) क्या प्रसिद्ध तकनीक है?",
        "options": [
            "An unrolled loop construct intertwining a 'switch' statement with a 'do-while' loop for fast memory block copying",
            "A hardware debugger",
            "A USB driver in Linux",
            "A type of memory allocation"
        ],
        "correctIndex": 0,
        "explanation": "Tom Duff's optimization interleaves switch and do-while to unroll loops with partial chunk handling.",
        "explanationHindi": "switch और do-while को मिलाकर लूप अनरोलिंग द्वारा तेज मेमोरी कॉपी करने की तकनीक।"
    },
    {
        "id": "cs-h3",
        "question": "What happens if you declare and initialize a variable immediately after a case label without enclosing braces (e.g. case 1: int x = 10;)?",
        "questionHindi": "switch केस के तुरंत बाद बिना ब्रेसेस के वेरिएबल बनाने पर (case 1: int x = 10;) क्या होता है?",
        "options": [
            "Compilation error in standard C, because declarations cannot immediately follow labels without an enclosing block or statement",
            "Runs without issues",
            "x becomes a static variable",
            "Switch jumps over the variable"
        ],
        "correctIndex": 0,
        "explanation": "Labels cannot precede declarations directly in C90/C99 without an enclosing block { } or empty statement.",
        "explanationHindi": "कम्पाइलर एरर देता है क्योंकि लेबल के तुरंत बाद बिना ब्लॉक { } के डिक्लेरेशन मान्य नहीं है।"
    },
    {
        "id": "cs-h4",
        "question": "What is the exact chronological execution order of expressions in: for (E1; E2; E3) { S; }?",
        "questionHindi": "for (E1; E2; E3) { S; } के घटकों का सही क्रमिक निष्पादन क्रम क्या है?",
        "options": [
            "E1 once -> E2 check -> if true run S -> run E3 -> repeat from E2",
            "E1 -> E2 -> E3 -> S",
            "E1 -> S -> E2 -> E3",
            "E2 -> E1 -> S -> E3"
        ],
        "correctIndex": 0,
        "explanation": "Init (E1) -> Condition test (E2) -> Body (S) -> Update (E3) -> Loop back to E2.",
        "explanationHindi": "पहले E1 (एक बार) -> फिर E2 जांच -> सत्य होने पर S चलेगा -> फिर E3 चलेगा -> वापस E2 पर जांच।"
    },
    {
        "id": "cs-h5",
        "question": "In a 'for' loop, where does a 'continue;' statement jump to?",
        "questionHindi": "'for' लूप में 'continue;' चलने पर कंट्रोल सीधे कहाँ कूदता है?",
        "options": [
            "Directly to the increment/update expression (E3), before re-testing the condition",
            "To the condition test (E2) directly",
            "To the initialization (E1)",
            "Out of the loop"
        ],
        "correctIndex": 0,
        "explanation": "In a for-loop, continue jumps directly to the update expression (E3), not the condition.",
        "explanationHindi": "सीधे इंक्रीमेंट/अपडेट वाले हिस्से पर जाता है, उसके बाद दोबारा शर्त जांची जाती है।"
    },
    {
        "id": "cs-h6",
        "question": "In a 'do-while' loop, where does a 'continue;' statement jump to?",
        "questionHindi": "'do-while' लूप में 'continue;' चलने पर कंट्रोल कहाँ जाता है?",
        "options": [
            "Directly to the while (condition); test at the bottom of the loop",
            "To the 'do' at top",
            "Exits the loop",
            "Repeats the previous line"
        ],
        "correctIndex": 0,
        "explanation": "In do-while, continue jumps straight to evaluating the bottom while condition.",
        "explanationHindi": "सीधे नीचे लिखी हुई while (कंडीशन); की जांच पर पहुँचता है।"
    },
    {
        "id": "cs-h7",
        "question": "How does an optimizing C compiler implement a 'switch-case' statement containing numerous contiguous integer cases?",
        "questionHindi": "ऑप्टिमाइजिंग C कम्पाइलर कई लगातार केसों वाले switch स्टेटमेंट को कैसे लागू करता है?",
        "options": [
            "Generates an O(1) Jump Table (branch table) in assembly for constant-time dispatch",
            "Converts to a linear series of 100 if-else statements",
            "Runs a bubble sort on the cases",
            "Executes all cases sequentially"
        ],
        "correctIndex": 0,
        "explanation": "Compilers generate O(1) branch/jump tables for dense contiguous switch cases.",
        "explanationHindi": "कम्पाइलर असेंबली में जम्प टेबल (Jump Table) बनाता है जिससे O(1) समय में सीधा जम्प होता है।"
    },
    {
        "id": "cs-h8",
        "question": "Why is using a floating-point variable as a loop counter (e.g. for (float f=0.0; f!=1.0; f+=0.1)) considered a critical bug?",
        "questionHindi": "लूप काउंटर के रूप में फ्लोट (float f=0.0; f!=1.0; f+=0.1) का उपयोग करना गंभीर बग क्यों है?",
        "options": [
            "Floating point rounding errors mean f may never exactly equal 1.0 (e.g. 0.999999 -> 1.099999), causing an infinite loop",
            "Floats cannot be incremented",
            "The compiler will reject floats in for loops",
            "It burns CPU hardware"
        ],
        "correctIndex": 0,
        "explanation": "Due to binary representation error, f != 1.0 may skip exact 1.0, triggering an infinite loop.",
        "explanationHindi": "दशमलव राउंडिंग अशुद्धि के कारण f का मान 1.000000 कभी ठीक बराबर नहीं होगा और लूप कभी नहीं रुकेगा।"
    },
    {
        "id": "cs-h9",
        "question": "Can a 'switch' statement be used with character variables in C?",
        "questionHindi": "क्या C में कैरेक्टर वेरिएबल्स (char) के साथ switch स्टेटमेंट का उपयोग किया जा सकता है?",
        "options": [
            "Yes, because 'char' is an integral type represented by its integer ASCII value internally",
            "No, only integers are allowed",
            "Only with string pointers",
            "Only on Linux"
        ],
        "correctIndex": 0,
        "explanation": "Chars are promoted to integers and represent valid discrete integral case labels.",
        "explanationHindi": "हाँ, क्योंकि char आंतरिक रूप से अपने ASCII पूर्णांक मान द्वारा ही पहचाना जाता है।"
    },
    {
        "id": "cs-h10",
        "question": "In C99, what is the scope of a variable declared within a 'for' loop header (e.g. for (int i = 0; i < 10; i++))?",
        "questionHindi": "C99 में 'for' लूप के हेडर में घोषित (int i = 0) चर का स्कोप क्या होता है?",
        "options": [
            "Restricted to the 'for' loop body only; 'i' does not exist outside the loop",
            "Global across the entire function",
            "Accessible by all functions",
            "Static across iterations"
        ],
        "correctIndex": 0,
        "explanation": "C99 loop-header declared variables have block scope confined strictly to that loop.",
        "explanationHindi": "केवल उसी for लूप की बॉडी तक सीमित रहता है; लूप खत्म होते ही 'i' समाप्त हो जाता है।"
    },
    {
        "id": "cs-h11",
        "question": "What is 'Loop Invariant Code Motion' performed by optimizing compilers?",
        "questionHindi": "ऑप्टिमाइजिंग कम्पाइलर द्वारा 'लूप इनवेरिएंट कोड मोशन' क्या किया जाता है?",
        "options": [
            "Moving calculations inside a loop that produce the same result every iteration to OUTSIDE the loop",
            "Converting for loops to while loops",
            "Unrolling loops 4 times",
            "Deleting empty loops"
        ],
        "correctIndex": 0,
        "explanation": "Calculations unaffected by loop variables are hoisted outside the loop to avoid redundant computation.",
        "explanationHindi": "जो गणनाएं लूप के हर चक्कर में एक जैसा परिणाम देती हैं, उन्हें लूप से बाहर निकाल देना।"
    },
    {
        "id": "cs-h12",
        "question": "When is the use of 'goto' considered legitimate and acceptable in production systems code (e.g. Linux Kernel)?",
        "questionHindi": "उत्पादन स्तर के सिस्टम कोड (जैसे लिनक्स कर्नेल) में 'goto' का उपयोग कब स्वीकार्य माना जाता है?",
        "options": [
            "For centralized multi-step error handling and resource cleanup to prevent deeply nested cleanup blocks",
            "To create infinite loops",
            "To replace all while loops",
            "To call network sockets"
        ],
        "correctIndex": 0,
        "explanation": "Linux kernel idiomatically uses goto for centralized error unwinding (freeing allocated resources).",
        "explanationHindi": "गहरी नेस्टिंग से बचने और एरर आने पर सभी खुली फाइलों/मेमोरी को एक जगह साफ (Cleanup) करने के लिए।"
    },
    {
        "id": "cs-h13",
        "question": "What is the output of the following code snippet?\nint x = 1;\nswitch (x) {\n    case 1: printf(\"A \");\n    case 2: printf(\"B \");\n    default: printf(\"C \");\n}",
        "questionHindi": "इस कोड का आउटपुट क्या होगा?\nint x = 1; switch(x) { case 1: printf(\"A \"); case 2: printf(\"B \"); default: printf(\"C \"); }",
        "options": [
            "A B C (due to fall-through because 'break;' is missing in every case)",
            "A",
            "A B",
            "C"
        ],
        "correctIndex": 0,
        "explanation": "Without break statements, execution falls through case 1 into case 2 and default: 'A B C '.",
        "explanationHindi": "break न होने से कंट्रोल केस 1 से शुरू होकर नीचे तक बहता चला जाएगा: 'A B C '।"
    },
    {
        "id": "cs-h14",
        "question": "What is the output of the following loop?\nint i = 0;\nfor (; i < 5; i++);\nprintf(\"%d\", i);",
        "questionHindi": "इस लूप का आउटपुट क्या होगा?\nint i = 0; for (; i < 5; i++); printf(\"%d\", i);",
        "options": [
            "5 (the trailing semicolon makes the for loop body empty; it loops until i=5, then prints i)",
            "0 1 2 3 4",
            "4",
            "0"
        ],
        "correctIndex": 0,
        "explanation": "The semicolon terminates the loop body; it iterates until i reaches 5, then prints 5.",
        "explanationHindi": "सेमीकोलन के कारण लूप खाली चला और i=5 होने पर बाहर आकर केवल '5' प्रिंट करेगा।"
    },
    {
        "id": "cs-h15",
        "question": "Can multiple loop control variables be initialized and updated in a single 'for' loop header using the comma operator?",
        "questionHindi": "क्या एक ही 'for' लूप में कॉमा ऑपरेटर से एक साथ दो चरों को इनिशियलाइज और अपडेट किया जा सकता है?",
        "options": [
            "Yes: for (i = 0, j = 10; i < j; i++, j--)",
            "No, only one variable is allowed in a for loop header",
            "Only with while loops",
            "Only with GCC extensions"
        ],
        "correctIndex": 0,
        "explanation": "The comma operator allows multiple expressions in the init and update clauses of a for loop.",
        "explanationHindi": "हाँ: for (i = 0, j = 10; i < j; i++, j--) जैसे रूप में कॉमा ऑपरेटर मान्य है।"
    },
    {
        "id": "cs-h16",
        "question": "What happens if the condition in a 'for' loop is omitted entirely: 'for (int i = 0; ; i++)'?",
        "questionHindi": "यदि 'for' लूप की शर्त को खाली छोड़ दिया जाए: 'for (int i = 0; ; i++)', तो क्या होगा?",
        "options": [
            "The omitted condition defaults to constant TRUE (non-zero), resulting in an infinite loop unless broken internally",
            "The loop terminates immediately after 0 runs",
            "Compiler syntax error",
            "i stops at 100"
        ],
        "correctIndex": 0,
        "explanation": "An omitted for-loop condition is treated by the compiler as non-zero (always true).",
        "explanationHindi": "खाली शर्त को कम्पाइलर स्वतः हमेशा सत्य (TRUE) मान लेता है, जिससे अनंत लूप बनता है।"
    },
    {
        "id": "cs-h17",
        "question": "What is the time complexity of a loop nested three levels deep: for(i..N) for(j..N) for(k..N)?",
        "questionHindi": "तीन स्तर गहरे नेस्टेड लूप (प्रत्येक N बार) की टाइम कॉम्प्लेक्सिटी क्या होगी?",
        "options": ["O(N^3)", "O(3N)", "O(N log N)", "O(N^2)"],
        "correctIndex": 0,
        "explanation": "Triply nested loops iterating N times each execute N * N * N = O(N^3) total iterations.",
        "explanationHindi": "N * N * N चक्कर चलने के कारण टाइम कॉम्प्लेक्सिटी O(N^3) होगी।"
    },
    {
        "id": "cs-h18",
        "question": "Can a 'switch' statement be nested inside another 'switch' statement in C?",
        "questionHindi": "क्या C भाषा में एक switch स्टेटमेंट के अंदर दूसरा switch स्टेटमेंट (नेस्टेड switch) लिखा जा सकता है?",
        "options": [
            "Yes, switch statements can be freely nested inside one another",
            "No, nested switch is illegal in C",
            "Only if the inner switch uses characters",
            "Only up to 1 level"
        ],
        "correctIndex": 0,
        "explanation": "C allows nested switch statements; case labels of inner switch belong only to their enclosing switch.",
        "explanationHindi": "हाँ, एक switch के केस के अंदर दूसरा switch पूरी तरह मान्य होता है।"
    },
    {
        "id": "cs-h19",
        "question": "What is 'Loop Unrolling' (Loop Unwinding)?",
        "questionHindi": "कम्पाइलर ऑप्टिमाइजेशन में 'लूप अनरोलिंग' (Loop Unrolling) क्या है?",
        "options": [
            "A code transformation that replicates the loop body multiple times to decrease loop control branch overhead and increase instruction-level parallelism",
            "Deleting loops entirely",
            "Converting while to do-while",
            "Printing loop contents"
        ],
        "correctIndex": 0,
        "explanation": "Replicating loop iterations reduces branching tests and increases pipeline throughput.",
        "explanationHindi": "लूप की बॉडी को कई बार दोहराकर लूप जांचने के समय को कम करना और स्पीड बढ़ाना।"
    },
    {
        "id": "cs-h20",
        "question": "What is the effect of putting 'break;' inside an 'if' statement that is NOT inside any loop or switch?",
        "questionHindi": "बिना किसी लूप या switch के अकेले 'if' स्टेटमेंट के अंदर 'break;' लिखने पर क्या होगा?",
        "options": [
            "Compilation error: 'break statement not within loop or switch'",
            "It exits main()",
            "It reboots system",
            "It is ignored quietly"
        ],
        "correctIndex": 0,
        "explanation": "break is strictly syntactically valid only within loops (while, for, do-while) and switch statements.",
        "explanationHindi": "कम्पाइलर एरर देगा: 'break statement not within loop or switch'।"
    }
]

register("control-statement", cs_easy, cs_hard)
print("Registered Topic 8: control-statement")
