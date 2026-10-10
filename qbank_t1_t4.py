# Topics 1 to 4 questions: Program Structure, Flowchart, Data Types, 3-Digit Logic
from qbank_master import register

# Topic 1: Program Structure
from make_questions_bank import ps_easy, ps_hard
register("program-structure", ps_easy, ps_hard)

# Topic 2: Flowchart & Logic Design
fc_easy = [
    {
        "id": "fc-e1",
        "question": "What is a flowchart?",
        "questionHindi": "फ्लोचार्ट (Flowchart) क्या होता है?",
        "options": [
            "A diagrammatic or visual representation of an algorithm",
            "A physical hardware circuit diagram",
            "A compiled machine executable",
            "A programming language syntax checker"
        ],
        "correctIndex": 0,
        "explanation": "A flowchart visually illustrates step-by-step logic and sequence using geometric shapes.",
        "explanationHindi": "फ्लोचार्ट किसी एल्गोरिदम या समस्या समाधान की ज्यामितीय आकृतियों द्वारा सचित्र प्रस्तुति है।"
    },
    {
        "id": "fc-e2",
        "question": "Which geometric shape represents Start and Stop / Terminal in a flowchart?",
        "questionHindi": "फ्लोचार्ट में प्रारंभ (Start) और अंत (Stop) दर्शाने के लिए किस आकृति का उपयोग होता है?",
        "options": ["Rectangle", "Oval / Rounded Rectangle", "Rhombus / Diamond", "Parallelogram"],
        "correctIndex": 1,
        "explanation": "An Oval (or rounded rectangle) represents the start or end terminal of a program.",
        "explanationHindi": "अंडाकार (Oval) आकृति प्रोग्राम की शुरुआत और समाप्ति को दर्शाती है।"
    },
    {
        "id": "fc-e3",
        "question": "Which shape denotes Input and Output operations (scanf/printf) in a flowchart?",
        "questionHindi": "फ्लोचार्ट में इनपुट और आउटपुट ऑपरेशन्स के लिए किस आकृति का प्रयोग किया जाता है?",
        "options": ["Circle", "Rectangle", "Parallelogram", "Diamond"],
        "correctIndex": 2,
        "explanation": "A Parallelogram is universally used to depict input (Read/Input) and output (Print/Display).",
        "explanationHindi": "समानांतर चतुर्भुज (Parallelogram) का उपयोग डेटा इनपुट और आउटपुट के लिए किया जाता है।"
    },
    {
        "id": "fc-e4",
        "question": "Which shape denotes computational Processing (arithmetic operations, variable assignments) in a flowchart?",
        "questionHindi": "फ्लोचार्ट में गणना या प्रोसेसिंग (जैसे a = b + c) किस आकृति द्वारा दर्शाई जाती है?",
        "options": ["Rectangle", "Triangle", "Oval", "Hexagon"],
        "correctIndex": 0,
        "explanation": "A Rectangle represents arithmetic operations, calculations, and assignments.",
        "explanationHindi": "आयत (Rectangle) का उपयोग गणनाओं, फॉर्मूलों और मान निर्धारण (Processing) के लिए होता है।"
    },
    {
        "id": "fc-e5",
        "question": "Which shape represents a Decision / Conditional branching (if / else) in a flowchart?",
        "questionHindi": "फ्लोचार्ट में निर्णय (Decision) या शर्त (Condition) जांचने के लिए कौन-सी आकृति प्रयोग होती है?",
        "options": ["Circle", "Rhombus / Diamond", "Parallelogram", "Trapezoid"],
        "correctIndex": 1,
        "explanation": "A Diamond (Rhombus) represents a condition with two or more outcomes (True/False, Yes/No).",
        "explanationHindi": "समचतुर्भुज या डायमंड (Diamond) आकृति निर्णय लेने और शर्तों की जांच के लिए उपयोग होती है।"
    },
    {
        "id": "fc-e6",
        "question": "What do Flowlines (Arrows) indicate in a flowchart?",
        "questionHindi": "फ्लोचार्ट में तीर के निशान (Flowlines) क्या दर्शाते हैं?",
        "options": ["Memory address of pointers", "Direction of logic flow and execution sequence", "Data type of variables", "Speed of CPU clock"],
        "correctIndex": 1,
        "explanation": "Arrows indicate the path and sequence in which operations execute.",
        "explanationHindi": "तीर के निशान प्रोग्राम के निष्पादन की दिशा और क्रम का मार्गदर्शन करते हैं।"
    },
    {
        "id": "fc-e7",
        "question": "Which shape is used as an On-Page Connector to join flowlines on the same page?",
        "questionHindi": "एक ही पृष्ठ पर प्रवाह रेखाओं को जोड़ने के लिए ऑन-पेज कनेक्टर के रूप में क्या प्रयोग होता है?",
        "options": ["Small Circle", "Large Star", "Pentagon", "Square"],
        "correctIndex": 0,
        "explanation": "A small circle serves as an on-page connector to reduce messy crisscrossing lines.",
        "explanationHindi": "छोटा वृत्त (Circle) एक ही पेज पर रेखाओं को आपस में जोड़ने के काम आता है।"
    },
    {
        "id": "fc-e8",
        "question": "What is the primary standard flow direction when reading a standard flowchart?",
        "questionHindi": "फ्लोचार्ट पढ़ने की मानक दिशा आमतौर पर क्या होती है?",
        "options": ["Bottom to top", "Top to bottom and Left to right", "Right to left only", "Diagonal only"],
        "correctIndex": 1,
        "explanation": "Standard flowcharts are read top-to-bottom and left-to-right.",
        "explanationHindi": "फ्लोचार्ट हमेशा ऊपर से नीचे और बाएँ से दाएँ दिशा में पढ़े जाते हैं।"
    },
    {
        "id": "fc-e9",
        "question": "How many exit flowlines typically emerge from a standard Decision (Diamond) symbol?",
        "questionHindi": "एक सामान्य निर्णय (डायमंड) बॉक्स से सामान्यतः कितनी निकास रेखाएं निकलती हैं?",
        "options": ["Exactly 1", "Exactly 2 (True/False or Yes/No)", "Always 4", "Unlimited"],
        "correctIndex": 1,
        "explanation": "A conditional decision box typically branches into two paths: True and False.",
        "explanationHindi": "सामान्यतः दो रेखाएं निकलती हैं: एक 'हाँ/सत्य' (Yes/True) और दूसरी 'नहीं/असत्य' (No/False)।"
    },
    {
        "id": "fc-e10",
        "question": "How many incoming and outgoing flowlines should a standard Processing (Rectangle) box have?",
        "questionHindi": "एक सामान्य प्रोसेसिंग (आयत) बॉक्स में कितनी इनपुट और आउटपुट रेखाएं होनी चाहिए?",
        "options": ["1 incoming and 1 outgoing", "2 incoming and 2 outgoing", "0 incoming", "3 outgoing"],
        "correctIndex": 0,
        "explanation": "A process step has one entry line and one exit line leading to the next sequential step.",
        "explanationHindi": "सामान्यतः एक प्रवेश रेखा (Input) और एक निकास रेखा (Output) होती है।"
    },
    {
        "id": "fc-e11",
        "question": "What is the key advantage of creating a flowchart before writing C code?",
        "questionHindi": "C कोड लिखने से पहले फ्लोचार्ट बनाने का सबसे बड़ा लाभ क्या है?",
        "options": [
            "It makes the computer run 10x faster",
            "It clarifies algorithm logic and reveals flaws before actual coding begins",
            "It eliminates the need for a compiler",
            "It automatically writes the program in binary"
        ],
        "correctIndex": 1,
        "explanation": "Flowcharts make logical reasoning visual, helping prevent logic bugs before typing code.",
        "explanationHindi": "यह प्रोग्राम के लॉजिक को स्पष्ट करता है और कोडिंग से पहले ही गलतियों को पकड़ने में मदद करता है।"
    },
    {
        "id": "fc-e12",
        "question": "What is an Off-Page Connector symbol used when a flowchart spans multiple pages?",
        "questionHindi": "जब फ्लोचार्ट एक से अधिक पृष्ठों में फैल जाए तो ऑफ-पेज कनेक्टर के लिए कौन-सी आकृति प्रयोग होती है?",
        "options": ["Pentagon (Home-plate shape)", "Circle", "Diamond", "Ellipse"],
        "correctIndex": 0,
        "explanation": "A pentagon or inverted home-plate shape connects across different pages.",
        "explanationHindi": "पंचभुज (Pentagon) का उपयोग अलग-अलग पृष्ठों को जोड़ने के लिए किया जाता है।"
    },
    {
        "id": "fc-e13",
        "question": "How is a Loop (iteration) represented in a flowchart?",
        "questionHindi": "फ्लोचार्ट में लूप (दोहराव) को कैसे दर्शाया जाता है?",
        "options": [
            "By drawing a 3D cube",
            "By a flowline that loops back to a preceding decision or process symbol",
            "By crossing out the box with an X",
            "By ending with a stop terminal"
        ],
        "correctIndex": 1,
        "explanation": "A loop is formed when a flowline points backward to an earlier step in the flow.",
        "explanationHindi": "एक तीर पीछे की ओर मुड़कर पुरानी शर्त या प्रक्रिया पर वापस जाकर लूप बनाता है।"
    },
    {
        "id": "fc-e14",
        "question": "Can a computer CPU directly execute a flowchart diagram?",
        "questionHindi": "क्या कंप्यूटर का सीपीयू किसी फ्लोचार्ट को सीधे चला सकता है?",
        "options": [
            "Yes, immediately",
            "No, flowcharts are human design tools that must be translated into programming code and compiled",
            "Only on touch screen devices",
            "Only in modern Linux"
        ],
        "correctIndex": 1,
        "explanation": "Flowcharts are conceptual design aids for humans; CPUs only run compiled binary machine code.",
        "explanationHindi": "नहीं, फ्लोचार्ट केवल इंसानों के समझने के लिए हैं; इन्हें C कोड में बदलना पड़ता है।"
    },
    {
        "id": "fc-e15",
        "question": "What is the difference between an Algorithm and a Flowchart?",
        "questionHindi": "एल्गोरिदम (Algorithm) और फ्लोचार्ट (Flowchart) में मुख्य अंतर क्या है?",
        "options": [
            "Algorithm is step-by-step text in natural language; Flowchart is a visual graphical diagram",
            "Algorithm is for hardware; flowchart is for software",
            "Flowchart is compiled; algorithm is interpreted",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Algorithm is textual step-by-step instructions; flowchart is the pictorial equivalent.",
        "explanationHindi": "एल्गोरिदम लिखित चरण-दर-चरण निर्देश है, जबकि फ्लोचार्ट उसका सचित्र (चित्रमय) रूप है।"
    },
    {
        "id": "fc-e16",
        "question": "In a flowchart to check if a number N is Even or Odd, what is inside the Decision Diamond?",
        "questionHindi": "सम या विषम संख्या जांचने के फ्लोचार्ट में डायमंड बॉक्स के अंदर क्या शर्त होगी?",
        "options": ["Is N / 2 == 0 ?", "Is N % 2 == 0 ?", "Calculate N * 2", "Print Even"],
        "correctIndex": 1,
        "explanation": "N % 2 == 0 checks whether the remainder when dividing by 2 is zero.",
        "explanationHindi": "'क्या N % 2 == 0 है?' यह जांचती है कि संख्या 2 से पूरी विभाजित होती है या नहीं।"
    },
    {
        "id": "fc-e17",
        "question": "Which symbol represents a predefined sub-process or user-defined function in a flowchart?",
        "questionHindi": "फ्लोचार्ट में पहले से परिभाषित सब-प्रोसेस या फंक्शन को दर्शाने के लिए कौन-सा प्रतीक है?",
        "options": [
            "Rectangle with double vertical lines on left and right",
            "Solid black circle",
            "Dotted triangle",
            "Hexagon with arrow"
        ],
        "correctIndex": 0,
        "explanation": "A rectangle with vertical bars on each side indicates a sub-routine/predefined function.",
        "explanationHindi": "किनारों पर दोहरी खड़ी रेखाओं वाला आयत किसी सब-रूटीन या फंक्शन को दर्शाता है।"
    },
    {
        "id": "fc-e18",
        "question": "What must be written along the exit arrows of a Decision box in a flowchart?",
        "questionHindi": "निर्णय बॉक्स से निकलने वाले तीरों पर क्या लिखना अनिवार्य है?",
        "options": ["Labels like 'Yes' / 'No' or 'True' / 'False'", "Variable values", "Line numbers of code", "Author signatures"],
        "correctIndex": 0,
        "explanation": "Clear branch labels (Yes/No, True/False) are essential to prevent ambiguity.",
        "explanationHindi": "स्पष्ट लेबल जैसे 'हाँ/ना' (Yes/No) या 'सत्य/असत्य' लिखना आवश्यक है।"
    },
    {
        "id": "fc-e19",
        "question": "What is Pseudo-code in relation to an algorithm and flowchart?",
        "questionHindi": "स्यूडो-कोड (Pseudo-code) का क्या अर्थ है?",
        "options": [
            "An informal high-level description of code combining English and programming constructs",
            "A virus that mimics real code",
            "A hardware benchmark test",
            "A binary machine dump"
        ],
        "correctIndex": 0,
        "explanation": "Pseudo-code uses structured English-like phrasing to outline program logic without strict syntax.",
        "explanationHindi": "अंग्रेजी और प्रोग्रामिंग के मिले-जुले अनौपचारिक वाक्य जो लॉजिक को सरलता से समझाते हैं।"
    },
    {
        "id": "fc-e20",
        "question": "What happens if a flowchart loop has no exit condition or stop path?",
        "questionHindi": "यदि फ्लोचार्ट में लूप से बाहर निकलने की कोई शर्त न हो तो क्या होगा?",
        "options": [
            "Program executes twice as fast",
            "It represents an Infinite Loop (endless execution without termination)",
            "The compiler turns it into an oval",
            "Operating system safely pauses it"
        ],
        "correctIndex": 1,
        "explanation": "Without an exit branch, the control cycles indefinitely, creating an infinite loop bug.",
        "explanationHindi": "यह एक अनंत लूप (Infinite Loop) बन जाएगा जो कभी समाप्त नहीं होगा।"
    }
]

fc_hard = [
    {
        "id": "fc-h1",
        "question": "How is McCabe's Cyclomatic Complexity related to a flowchart's decision nodes?",
        "questionHindi": "मैककेब की साइक्लोमैटिक जटिलता (Cyclomatic Complexity) फ्लोचार्ट के निर्णय नोड्स से कैसे संबंधित है?",
        "options": [
            "Complexity V(G) = P + 1 (where P is the number of predicate/decision nodes with 2 branches)",
            "Complexity V(G) = P * 10",
            "Complexity V(G) = Number of rectangular process boxes",
            "Complexity V(G) = Number of terminal ovals"
        ],
        "correctIndex": 0,
        "explanation": "Cyclomatic complexity equals the number of binary decision points plus 1 (V = P + 1 or E - N + 2P).",
        "explanationHindi": "साइक्लोमैटिक जटिलता V(G) = P + 1 होती है, जहाँ P निर्णय नोड्स की संख्या है।"
    },
    {
        "id": "fc-h2",
        "question": "What standard organization published the official standard symbols for information processing flowcharts?",
        "questionHindi": "सूचना प्रसंस्करण फ्लोचार्ट के आधिकारिक प्रतीकों को किस मानक संस्था ने मानकीकृत किया था?",
        "options": ["ANSI (ANSI X3.5) and ISO (ISO 5807)", "IEEE 802.11", "W3C HTML Standard", "IETF RFC 791"],
        "correctIndex": 0,
        "explanation": "ANSI X3.5 and ISO 5807 define the international standard flowchart symbols.",
        "explanationHindi": "ANSI X3.5 और ISO 5807 मानक फ्लोचार्ट प्रतीकों को अंतरराष्ट्रीय स्तर पर परिभाषित करते हैं।"
    },
    {
        "id": "fc-h3",
        "question": "In a flowchart, what is the best practice for representing a 'switch-case' multi-way branch?",
        "questionHindi": "फ्लोचार्ट में 'switch-case' जैसे बहु-मार्गी चयन को दर्शाने का सबसे सही तरीका क्या है?",
        "options": [
            "A single decision diamond with multiple tagged outgoing lines or a cascade of connected diamonds",
            "Multiple nested ovals",
            "A large black circle",
            "An upside down parallelogram"
        ],
        "correctIndex": 0,
        "explanation": "A switch construct is shown either as a single decision symbol with multiple paths or a diamond chain.",
        "explanationHindi": "एक डायमंड से कई शाखाएं निकालकर या एक के बाद एक जुड़े डायमंड्स की श्रृंखला बनाकर।"
    },
    {
        "id": "fc-h4",
        "question": "How is the C 'break' statement within a loop represented in a flowchart?",
        "questionHindi": "लूप के अंदर C भाषा के 'break' स्टेटमेंट को फ्लोचार्ट में कैसे दर्शाया जाता है?",
        "options": [
            "A flowline jumping directly out of the loop to the statement immediately following the loop",
            "A red circular stop sign",
            "An arrow returning to the start of the loop",
            "A new terminal start box"
        ],
        "correctIndex": 0,
        "explanation": "break causes an immediate exit jump past the loop's concluding boundary.",
        "explanationHindi": "एक तीर जो लूप से तुरंत बाहर निकलकर लूप के ठीक बाद वाले अगले बॉक्स पर जाता है।"
    },
    {
        "id": "fc-h5",
        "question": "How is the C 'continue' statement in a 'for' loop represented in a flowchart?",
        "questionHindi": "'for' लूप में C भाषा के 'continue' स्टेटमेंट को फ्लोचार्ट में कैसे दर्शाया जाता है?",
        "options": [
            "A jump arrow directing flow straight to the loop update/increment step, skipping the remaining loop body",
            "A jump to the stop terminal",
            "A jump to the beginning of main()",
            "A connection to an on-page connector"
        ],
        "correctIndex": 0,
        "explanation": "In a for-loop, continue jumps directly to the update (increment/decrement) block.",
        "explanationHindi": "लूप की बाकी बॉडी को छोड़कर सीधा लूप के इंक्रीमेंट/अपडेट बॉक्स पर जाने वाला तीर।"
    },
    {
        "id": "fc-h6",
        "question": "What is the key difference between an Entry-Controlled loop (while/for) and an Exit-Controlled loop (do-while) in a flowchart?",
        "questionHindi": "फ्लोचार्ट में एंट्री-कंट्रोल्ड (while) और एग्जिट-कंट्रोल्ड (do-while) लूप में मुख्य अंतर क्या होता है?",
        "options": [
            "Entry-controlled tests condition before entering process; Exit-controlled executes process once before testing condition",
            "Exit-controlled loops cannot use diamonds",
            "Entry-controlled loops cannot have flowlines",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "In entry-controlled, the decision diamond precedes the body; in exit-controlled, body comes first.",
        "explanationHindi": "एंट्री-कंट्रोल्ड में शर्त पहले जांची जाती है; एग्जिट-कंट्रोल्ड में बॉडी एक बार चलने के बाद शर्त जांची जाती है।"
    },
    {
        "id": "fc-h7",
        "question": "Why can flowcharts become impractical for very large, complex enterprise software projects?",
        "questionHindi": "अत्यंत बड़े और जटिल सॉफ्टवेयर प्रोजेक्ट्स में फ्लोचार्ट का उपयोग अव्यावहारिक क्यों हो जाता है?",
        "options": [
            "Computers cannot draw diamonds",
            "They become massive 'spaghetti' diagrams that are difficult to update, scale, and maintain alongside modern OOP/event-driven code",
            "Flowcharts only support integer numbers",
            "Flowcharts cannot be printed"
        ],
        "correctIndex": 1,
        "explanation": "Massive flowcharts become unreadable spaghetti graphs; UML and architectural diagrams scale better.",
        "explanationHindi": "विशाल आरेखों में उलझन (Spaghetti) हो जाती है और बार-बार होने वाले कोड बदलावों के साथ इन्हें बनाए रखना कठिन होता है।"
    },
    {
        "id": "fc-h8",
        "question": "In structured programming, what are the only three fundamental control structures allowed in a structured flowchart?",
        "questionHindi": "संरचित प्रोग्रामिंग (Structured Programming) के अनुसार फ्लोचार्ट में कौन-सी 3 मूल संरचनाएं मान्य हैं?",
        "options": [
            "Sequence, Selection (Decision), and Repetition (Iteration)",
            "Start, Print, Stop",
            "Pointer, Array, Struct",
            "Compiler, Linker, Loader"
        ],
        "correctIndex": 0,
        "explanation": "Bohm and Jacopini proved all algorithms can be built with Sequence, Selection, and Iteration.",
        "explanationHindi": "बोहम-जैकोपिनी सिद्धांत: अनुक्रम (Sequence), चयन (Selection) और पुनरावृत्ति (Iteration)।"
    },
    {
        "id": "fc-h9",
        "question": "What is 'Dead Code' (Unreachable Code) in a flowchart analysis?",
        "questionHindi": "फ्लोचार्ट विश्लेषण में 'डेड कोड' (अगम्य कोड) किसे कहते हैं?",
        "options": [
            "Any process or decision box that has no incoming flowline from the Start node",
            "Code that executes during a system crash",
            "Comments written in uppercase",
            "Code compiled without optimization"
        ],
        "correctIndex": 0,
        "explanation": "Nodes that cannot be reached by any path from Start constitute unreachable dead code.",
        "explanationHindi": "वे बॉक्स जिन तक स्टार्ट नोड से किसी भी रास्ते से नहीं पहुँचा जा सकता।"
    },
    {
        "id": "fc-h10",
        "question": "How is recursion visually depicted in a flowchart?",
        "questionHindi": "फ्लोचार्ट में रिकर्शन (Recursion - फंक्शन द्वारा स्वयं को कॉल करना) को कैसे दर्शाया जाता है?",
        "options": [
            "A predefined process box that invokes itself through a parameter-passing path with a base case termination diamond",
            "By drawing a spiral",
            "By looping flowlines without condition",
            "It cannot be depicted at all"
        ],
        "correctIndex": 0,
        "explanation": "Recursive functions show a base condition check and a predefined sub-process call to the same function.",
        "explanationHindi": "बेस कंडीशन की जांच और फंक्शन बॉक्स द्वारा उसी फंक्शन को नए आर्ग्युमेंट्स के साथ कॉल करने का रास्ता।"
    },
    {
        "id": "fc-h11",
        "question": "In a flowchart for finding the Largest of Three Numbers (A, B, C), what is the minimum number of decision diamonds needed?",
        "questionHindi": "तीन संख्याओं (A, B, C) में से सबसे बड़ी संख्या ज्ञात करने के फ्लोचार्ट में कम से कम कितने निर्णय डायमंड्स की आवश्यकता होती है?",
        "options": ["1", "2 or 3", "7", "10"],
        "correctIndex": 1,
        "explanation": "Comparing A>B, then checking the winner against C requires at least 2 or 3 decision nodes.",
        "explanationHindi": "A और B की तुलना के बाद विजेता की C से तुलना करने के लिए कम से कम 2 या 3 निर्णय डायमंड चाहिए।"
    },
    {
        "id": "fc-h12",
        "question": "What is the preparation symbol in standard ANSI flowcharting (Hexagon shape)?",
        "questionHindi": "मानक ANSI फ्लोचार्ट में षट्भुज (Hexagon) आकृति किस कार्य के लिए आरक्षित है?",
        "options": [
            "Initialization / Preparation (e.g. setting loop counter i = 0)",
            "Printing output on printer",
            "Emergency power down",
            "Reading magnetic tape"
        ],
        "correctIndex": 0,
        "explanation": "A hexagon indicates preparation/initialization steps such as setting initial loop bounds.",
        "explanationHindi": "षट्भुज (Hexagon) का उपयोग इनिशियलाइजेशन (जैसे i = 0 सेट करना) के लिए किया जाता है।"
    },
    {
        "id": "fc-h13",
        "question": "How is an asynchronous hardware interrupt represented in a standard control flowchart?",
        "questionHindi": "एक मानक कंट्रोल फ्लोचार्ट में हार्डवेयर इंटरप्ट को कैसे दर्शाया जाता है?",
        "options": [
            "Standard flowcharts are strictly sequential and handle interrupts poorly; separate event/state transition diagrams are preferred",
            "Using three overlapping rectangles",
            "By drawing a zigzag lightning arrow",
            "By using an inverted oval"
        ],
        "correctIndex": 0,
        "explanation": "Standard flowcharts model sequential synchronous flows; state charts are used for interrupts.",
        "explanationHindi": "फ्लोचार्ट क्रमिक निष्पादन के लिए होते हैं; इंटरप्ट्स के लिए स्टेट ट्रांजिशन डायग्राम बेहतर होते हैं।"
    },
    {
        "id": "fc-h14",
        "question": "What is the mathematical definition of a Directed Graph that forms a flowchart?",
        "questionHindi": "फ्लोचार्ट बनाने वाले डायरेक्टेड ग्राफ (Directed Graph) की गणितीय परिभाषा क्या है?",
        "options": [
            "A set of vertices (boxes/nodes) and directed edges (flowlines/arrows) connecting them: G = (V, E)",
            "A collection of floating-point numbers",
            "A 3D coordinate mesh",
            "A truth table"
        ],
        "correctIndex": 0,
        "explanation": "A flowchart is mathematically a control flow graph G = (V, E) of vertices and directed edges.",
        "explanationHindi": "फ्लोचार्ट गणितीय रूप से शीर्षों (नोड्स) और निर्देशित किनारों (तीरों) का एक ग्राफ G = (V, E) है।"
    },
    {
        "id": "fc-h15",
        "question": "What is the danger of crisscrossing flowlines without connectors in complex flowcharts?",
        "questionHindi": "जटिल फ्लोचार्ट्स में बिना कनेक्टर्स के रेखाओं के एक-दूसरे को काटने (क्रिस-क्रॉस) का क्या नुकसान है?",
        "options": [
            "It causes ambiguity in logic paths, visual clutter, and misinterpretation by engineers",
            "It deletes files from disk",
            "It changes C variable values",
            "It causes compiler buffer overflow"
        ],
        "correctIndex": 0,
        "explanation": "Intersecting lines without connectors cause visual confusion and misread logic flow.",
        "explanationHindi": "यह भ्रम पैदा करता है कि प्रवाह किस दिशा में जा रहा है, जिससे लॉजिक समझने में गलती होती है।"
    },
    {
        "id": "fc-h16",
        "question": "In a flowchart for calculating the Factorial of N, what is the initial accumulator value set to in the process rectangle?",
        "questionHindi": "N का फैक्टोरियल (Factorial) निकालने के फ्लोचार्ट में फैक्टोरियल वेरिएबल (fact) का प्रारंभिक मान क्या रखा जाता है?",
        "options": ["fact = 0", "fact = 1", "fact = -1", "fact = N * N"],
        "correctIndex": 1,
        "explanation": "Multiplicative identity is 1; setting fact = 0 would result in zero for any factorial multiplication.",
        "explanationHindi": "गुणा के लिए पहचान मान 1 होता है; यदि 0 रखेंगे तो पूरा गुणनफल 0 हो जाएगा।"
    },
    {
        "id": "fc-h17",
        "question": "How does a Flowchart differ from a Data Flow Diagram (DFD)?",
        "questionHindi": "फ्लोचार्ट और डेटा फ्लो डायग्राम (DFD) में क्या अंतर है?",
        "options": [
            "Flowchart models sequence and control flow; DFD models the flow and transformation of data without control sequencing",
            "DFD is for hardware; flowchart is for math",
            "Flowchart has no arrows; DFD has arrows",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Flowchart traces chronological control steps; DFD traces movement of data through a system.",
        "explanationHindi": "फ्लोचार्ट निष्पादन के क्रम को दर्शाता है, जबकि DFD सिस्टम में डेटा के प्रवाह और बदलाव को दर्शाता है।"
    },
    {
        "id": "fc-h18",
        "question": "What is a 'Dry Run Table' (Trace Table) constructed using a flowchart?",
        "questionHindi": "फ्लोचार्ट की सहायता से बनाई जाने वाली 'ट्रेस टेबल' (ड्राई रन टेबल) क्या होती है?",
        "options": [
            "A manual step-by-step table tracking variable values for sample inputs through each flowchart node",
            "A dining table for computer scientists",
            "A spreadsheet containing CPU benchmark speeds",
            "A list of syntax errors"
        ],
        "correctIndex": 0,
        "explanation": "A trace table records variable values at each step to manually verify correctness on paper.",
        "explanationHindi": "कागज पर हर कदम पर वेरिएबल्स के मानों को लिखकर एल्गोरिदम को जांचने वाली तालिका।"
    },
    {
        "id": "fc-h19",
        "question": "When converting a flowchart into C code, what C statement directly implements a Decision Diamond with two exits?",
        "questionHindi": "फ्लोचार्ट को C कोड में बदलते समय दो निकासों वाले निर्णय डायमंड को किस C स्टेटमेंट से लिखा जाता है?",
        "options": ["if-else statement", "printf statement", "include directive", "typedef statement"],
        "correctIndex": 0,
        "explanation": "The if-else statement directly mirrors a binary True/False decision diamond.",
        "explanationHindi": "'if-else' स्टेटमेंट सीधे तौर पर सत्य/असत्य निर्णय डायमंड को कोड में बदलता है।"
    },
    {
        "id": "fc-h20",
        "question": "What is 'Top-Down Stepwise Refinement' in flowchart-driven program design?",
        "questionHindi": "फ्लोचार्ट आधारित प्रोग्राम डिजाइन में 'टॉप-डाउन स्टेपवाइज रिफाइनमेंट' क्या है?",
        "options": [
            "Starting with broad high-level flowchart boxes and systematically breaking them into detailed sub-flowcharts",
            "Writing code starting from the bottom of file",
            "Sorting numbers from largest to smallest",
            "Removing comments to save memory"
        ],
        "correctIndex": 0,
        "explanation": "Decomposing large complex operations into progressively smaller, simpler flowcharts.",
        "explanationHindi": "बड़ी समस्या को पहले मुख्य भागों में बांटना और फिर प्रत्येक भाग को छोटे-छोटे विस्तृत फ्लोचार्ट में तोड़ना।"
    }
]

register("flow-chart", fc_easy, fc_hard)
print("Registered Topic 2: flow-chart")

# Topic 3: Data Types
dt_easy = [
    {
        "id": "dt-e1",
        "question": "What is the size of the standard 'int' data type on modern 32-bit and 64-bit architectures?",
        "questionHindi": "आधुनिक 32-बिट और 64-बिट सिस्टम पर सामान्य 'int' डेटा टाइप का आकार कितना होता है?",
        "options": ["1 byte", "2 bytes", "4 bytes (32 bits)", "8 bytes"],
        "correctIndex": 2,
        "explanation": "int is 4 bytes (32 bits) on modern desktop architectures.",
        "explanationHindi": "आधुनिक कम्प्यूटर्स में int सामान्यतः 4 बाइट्स (32 बिट्स) का स्थान लेता है।"
    },
    {
        "id": "dt-e2",
        "question": "What is the memory size of a 'char' data type in C?",
        "questionHindi": "C भाषा में 'char' डेटा टाइप मेमोरी में कितना स्थान लेता है?",
        "options": ["Strictly 1 byte (8 bits)", "2 bytes", "4 bytes", "Depends on character"],
        "correctIndex": 0,
        "explanation": "char is strictly guaranteed to be 1 byte by the C standard.",
        "explanationHindi": "char हमेशा निश्चित रूप से ठीक 1 बाइट (8 बिट) का स्थान लेता है।"
    },
    {
        "id": "dt-e3",
        "question": "Which format specifier is used in printf() to print a single character?",
        "questionHindi": "printf() में एक सिंगल कैरेक्टर प्रिंट करने के लिए कौन-सा फॉर्मेट विनिर्देशक प्रयोग होता है?",
        "options": ["%d", "%c", "%s", "%f"],
        "correctIndex": 1,
        "explanation": "%c format specifier prints a single char.",
        "explanationHindi": "%c का उपयोग सिंगल कैरेक्टर को प्रिंट करने के लिए किया जाता है।"
    },
    {
        "id": "dt-e4",
        "question": "Which format specifier is used in printf() to print a standard floating-point number?",
        "questionHindi": "दशमलव (Floating point) संख्या को प्रिंट करने के लिए कौन-सा फॉर्मेट विनिर्देशक है?",
        "options": ["%d", "%f", "%c", "%lf"],
        "correctIndex": 1,
        "explanation": "%f prints single-precision float numbers.",
        "explanationHindi": "%f का उपयोग फ्लोट संख्याओं के लिए किया जाता है।"
    },
    {
        "id": "dt-e5",
        "question": "What is the memory size of a 'float' variable in standard C?",
        "questionHindi": "मानक C में एक 'float' वेरिएबल का आकार कितना होता है?",
        "options": ["2 bytes", "4 bytes (32 bits)", "8 bytes", "16 bytes"],
        "correctIndex": 1,
        "explanation": "float occupies 4 bytes (single precision IEEE-754).",
        "explanationHindi": "float मेमोरी में 4 बाइट्स (32 बिट्स) का स्थान लेता है।"
    },
    {
        "id": "dt-e6",
        "question": "What is the memory size of a 'double' variable in standard C?",
        "questionHindi": "मानक C में एक 'double' वेरिएबल का आकार कितना होता है?",
        "options": ["4 bytes", "8 bytes (64 bits)", "12 bytes", "16 bytes"],
        "correctIndex": 1,
        "explanation": "double occupies 8 bytes (double precision IEEE-754).",
        "explanationHindi": "double मेमोरी में 8 बाइट्स (64 बिट्स) का स्थान लेता है।"
    },
    {
        "id": "dt-e7",
        "question": "Which format specifier is used to print a 'double' variable in printf()?",
        "questionHindi": "printf() में 'double' वेरिएबल को प्रिंट करने के लिए कौन-सा फॉर्मेट विनिर्देशक है?",
        "options": ["%d", "%f or %lf", "%c", "%s"],
        "correctIndex": 1,
        "explanation": "In printf, %f or %lf works for double (floats promote to double in varargs).",
        "explanationHindi": "printf में %f या %lf का उपयोग double के लिए किया जाता है।"
    },
    {
        "id": "dt-e8",
        "question": "What does the 'void' data type indicate in C?",
        "questionHindi": "C भाषा में 'void' डेटा टाइप का क्या अर्थ होता है?",
        "options": ["An integer with zero value", "No type / Empty / Valueless", "Infinite memory", "A boolean true"],
        "correctIndex": 1,
        "explanation": "void represents an empty or valueless type.",
        "explanationHindi": "void का अर्थ 'कुछ नहीं' या 'शून्य प्रकार' (Valueless) होता है।"
    },
    {
        "id": "dt-e9",
        "question": "Which operator in C returns the memory size of a data type or variable in bytes?",
        "questionHindi": "C में किसी डेटा टाइप या चर का बाइट्स में आकार ज्ञात करने के लिए कौन-सा ऑपरेटर है?",
        "options": ["size()", "sizeof", "lengthof()", "bytes()"],
        "correctIndex": 1,
        "explanation": "sizeof is a compile-time operator that returns byte size.",
        "explanationHindi": "sizeof ऑपरेटर किसी डेटा टाइप का बाइट्स में आकार लौटाता है।"
    },
    {
        "id": "dt-e10",
        "question": "Can an 'unsigned int' variable store negative numbers?",
        "questionHindi": "क्या एक 'unsigned int' वेरिएबल ऋणात्मक (Negative) संख्याएँ स्टोर कर सकता है?",
        "options": [
            "Yes, always",
            "No, unsigned types only store zero and positive values (0 to 4,294,967,295)",
            "Only in Linux",
            "Only up to -10"
        ],
        "correctIndex": 1,
        "explanation": "unsigned specifies non-negative values only, doubling the positive range.",
        "explanationHindi": "नहीं, unsigned केवल शून्य और धनात्मक मान (0 या उससे बड़े) ही स्टोर कर सकता है।"
    },
    {
        "id": "dt-e11",
        "question": "What is the ASCII integer value of the uppercase character 'A' in C?",
        "questionHindi": "C भाषा में बड़े अक्षर 'A' का ASCII पूर्णांक मान क्या होता है?",
        "options": ["48", "65", "97", "127"],
        "correctIndex": 1,
        "explanation": "Uppercase 'A' has an ASCII code of 65 (and 'a' is 97).",
        "explanationHindi": "कैपिटल 'A' का ASCII मान 65 होता है (और 'a' का 97)।"
    },
    {
        "id": "dt-e12",
        "question": "What is the ASCII integer value of the digit character '0' in C?",
        "questionHindi": "C भाषा में अंक कैरेक्टर '0' का ASCII मान क्या होता है?",
        "options": ["0", "32", "48", "65"],
        "correctIndex": 2,
        "explanation": "Character '0' has ASCII value 48. To convert char to int: ch - '0'.",
        "explanationHindi": "कैरेक्टर '0' का ASCII मान 48 होता है।"
    },
    {
        "id": "dt-e13",
        "question": "Which format specifier is used for an 'unsigned int'?",
        "questionHindi": "'unsigned int' के लिए कौन-सा फॉर्मेट विनिर्देशक प्रयोग किया जाता है?",
        "options": ["%d", "%u", "%i", "%x"],
        "correctIndex": 1,
        "explanation": "%u format specifier is for unsigned integer.",
        "explanationHindi": "%u का उपयोग unsigned integer को प्रिंट करने के लिए होता है।"
    },
    {
        "id": "dt-e14",
        "question": "What is the typical memory size of a 'short int' on modern systems?",
        "questionHindi": "आधुनिक कम्प्यूटर्स में 'short int' का सामान्य आकार कितना होता है?",
        "options": ["1 byte", "2 bytes (16 bits)", "4 bytes", "8 bytes"],
        "correctIndex": 1,
        "explanation": "short int typically occupies 2 bytes (range -32,768 to 32,767).",
        "explanationHindi": "short int सामान्यतः 2 बाइट्स (16 बिट्स) लेता है।"
    },
    {
        "id": "dt-e15",
        "question": "What is the typical size of a 'long long int' in standard C99?",
        "questionHindi": "C99 में 'long long int' का न्यूनतम आकार कितना होता है?",
        "options": ["4 bytes", "At least 8 bytes (64 bits)", "16 bytes", "32 bytes"],
        "correctIndex": 1,
        "explanation": "long long int is guaranteed to be at least 64 bits (8 bytes).",
        "explanationHindi": "long long int कम से कम 8 बाइट्स (64 बिट्स) का होता है।"
    },
    {
        "id": "dt-e16",
        "question": "Which format specifier is used to print 'long long int'?",
        "questionHindi": "'long long int' को प्रिंट करने के लिए कौन-सा फॉर्मेट विनिर्देशक है?",
        "options": ["%d", "%ld", "%lld", "%llu"],
        "correctIndex": 2,
        "explanation": "%lld prints signed long long int.",
        "explanationHindi": "%lld का उपयोग long long int के लिए किया जाता है।"
    },
    {
        "id": "dt-e17",
        "question": "In which header file are integer limits like INT_MAX and INT_MIN defined?",
        "questionHindi": "INT_MAX और INT_MIN जैसी पूर्णांक सीमाएं किस हेडर फाइल में परिभाषित हैं?",
        "options": ["<limits.h>", "<float.h>", "<stdlib.h>", "<stddef.h>"],
        "correctIndex": 0,
        "explanation": "<limits.h> defines integer sizes and ranges.",
        "explanationHindi": "<limits.h> हेडर फाइल में पूर्णांकों की न्यूनतम व अधिकतम सीमाएं होती हैं।"
    },
    {
        "id": "dt-e18",
        "question": "In which header file are floating-point limits and epsilon values defined?",
        "questionHindi": "दशमलव संख्याओं की सीमाएं किस हेडर फाइल में परिभाषित होती हैं?",
        "options": ["<float.h>", "<math.h>", "<limits.h>", "<stdio.h>"],
        "correctIndex": 0,
        "explanation": "<float.h> defines precision, epsilon, and min/max limits for float and double.",
        "explanationHindi": "<float.h> में फ्लोट और डबल की सीमाएं व परिशुद्धता परिभाषित होती हैं।"
    },
    {
        "id": "dt-e19",
        "question": "Which of the following is a Derived Data Type in C?",
        "questionHindi": "इनमें से कौन-सा C भाषा में डिराइव्ड (व्युत्पन्न) डेटा टाइप है?",
        "options": ["int", "float", "Array", "char"],
        "correctIndex": 2,
        "explanation": "Arrays, Pointers, and Functions are derived from primitive types.",
        "explanationHindi": "ऐरे (Array), पॉइंटर और फंक्शन डिराइव्ड डेटा टाइप्स कहलाते हैं।"
    },
    {
        "id": "dt-e20",
        "question": "Which keyword is used to define an alias (new nickname) for an existing data type?",
        "questionHindi": "किसी मौजूदा डेटा टाइप का नया उपनाम (Alias) बनाने के लिए किस कीवर्ड का उपयोग होता है?",
        "options": ["alias", "typedef", "define", "typename"],
        "correctIndex": 1,
        "explanation": "typedef creates a new type alias (e.g. typedef unsigned long ulong;).",
        "explanationHindi": "typedef कीवर्ड का उपयोग किसी डेटा टाइप को नया नाम देने के लिए होता है।"
    }
]

dt_hard = [
    {
        "id": "dt-h1",
        "question": "What is the exact numerical range of a signed 32-bit two's complement integer in C?",
        "questionHindi": "C में 32-बिट साइन्ड पूर्णांक की सटीक संख्यात्मक सीमा क्या होती है?",
        "options": [
            "-2,147,483,648 to +2,147,483,647",
            "0 to 4,294,967,295",
            "-32,768 to +32,767",
            "-65,536 to +65,535"
        ],
        "correctIndex": 0,
        "explanation": "Signed 32-bit range is -2^31 to 2^31 - 1 (-2,147,483,648 to +2,147,483,647).",
        "explanationHindi": "32-बिट साइन्ड रेंज -2^31 से 2^31 - 1 (-2,147,483,648 से +2,147,483,647) होती है।"
    },
    {
        "id": "dt-h2",
        "question": "What happens when a signed integer overflows in C according to the ISO C standard?",
        "questionHindi": "ISO C मानक के अनुसार जब एक साइन्ड पूर्णांक ओवरफ्लो होता है तो क्या होता है?",
        "options": [
            "It is strictly defined to wrap around to negative numbers",
            "It is Undefined Behavior (the compiler may optimize or assume it never happens)",
            "It throws a hardware exception and terminates",
            "It automatically converts to double"
        ],
        "correctIndex": 1,
        "explanation": "Signed integer overflow is Undefined Behavior (UB); unsigned overflow wraps modulo 2^N.",
        "explanationHindi": "साइन्ड ओवरफ्लो अपरिभाषित व्यवहार (Undefined Behavior) है; कम्पाइलर कुछ भी कर सकता है।"
    },
    {
        "id": "dt-h3",
        "question": "How is a single-precision 32-bit 'float' formatted internally under the IEEE-754 standard?",
        "questionHindi": "IEEE-754 मानक के तहत 32-बिट 'float' आंतरिक रूप से कैसे विभाजित होता है?",
        "options": [
            "1 sign bit, 8 exponent bits, 23 mantissa/fraction bits",
            "1 sign bit, 11 exponent bits, 20 mantissa bits",
            "8 sign bits, 8 exponent bits, 16 mantissa bits",
            "16 integer bits, 16 decimal bits"
        ],
        "correctIndex": 0,
        "explanation": "IEEE-754 32-bit float uses 1 bit sign + 8 bits exponent + 23 bits fraction.",
        "explanationHindi": "1 बिट साइन (Sign) + 8 बिट एक्सपोनेंट (Exponent) + 23 बिट मैन्टिसा (Mantissa)।"
    },
    {
        "id": "dt-h4",
        "question": "What is 'Integer Promotion' in C expression evaluation?",
        "questionHindi": "C भाषा में एक्सप्रेशन मूल्यांकन के दौरान 'इंटीजर प्रमोशन' (Integer Promotion) क्या है?",
        "options": [
            "Types smaller than int (like char and short) are automatically promoted to int or unsigned int before arithmetic operations",
            "Integers are promoted to pointers",
            "Integers are saved directly to secondary storage",
            "Negative integers become positive"
        ],
        "correctIndex": 0,
        "explanation": "Chars and shorts are automatically promoted to int in expressions before operations execute.",
        "explanationHindi": "int से छोटे प्रकार (जैसे char और short) गणना से पहले स्वतः int में बदल दिए जाते हैं।"
    },
    {
        "id": "dt-h5",
        "question": "What is the output of: printf(\"%d\", sizeof('A')); in standard C?",
        "questionHindi": "मानक C में printf(\"%d\", sizeof('A')); का आउटपुट क्या होगा?",
        "options": [
            "1",
            "sizeof(int) (which is typically 4 bytes)",
            "2",
            "65"
        ],
        "correctIndex": 1,
        "explanation": "In standard C, character constants like 'A' are of type 'int', so sizeof('A') == sizeof(int) (usually 4). Note: in C++ it is 1.",
        "explanationHindi": "मानक C में कैरेक्टर स्थिरांक 'A' का प्रकार 'int' होता है, इसलिए इसका आकार 4 बाइट्स होता है।"
    },
    {
        "id": "dt-h6",
        "question": "Why is directly comparing two float numbers with '==' (e.g. float1 == float2) dangerous?",
        "questionHindi": "दो फ्लोट संख्याओं की सीधे '==' से तुलना करना खतरनाक क्यों माना जाता है?",
        "options": [
            "It will not compile",
            "Binary floating-point numbers have rounding inaccuracies; values like 0.1 cannot be represented precisely",
            "float numbers don't have equality operators",
            "It crashes the CPU arithmetic unit"
        ],
        "correctIndex": 1,
        "explanation": "Binary fractions cannot represent decimal fractions precisely; use fabs(a - b) < EPSILON.",
        "explanationHindi": "दशमलव संख्याओं का बाइनरी में सटीक रूपांतरण न होने से राउंडिंग अंतर आ जाता है।"
    },
    {
        "id": "dt-h7",
        "question": "What is the type of the literal constant 3.14 (without any suffix) in C?",
        "questionHindi": "C में बिना किसी प्रत्यय के लिखी गई दशमलव संख्या 3.14 का प्रकार क्या होता है?",
        "options": ["float", "double", "long double", "fixed point"],
        "correctIndex": 1,
        "explanation": "Floating-point literals without suffix are 'double' by default; use 3.14f for float.",
        "explanationHindi": "बिना प्रत्यय (Suffix) के फ्लोटिंग स्थिरांक डिफ़ॉल्ट रूप से 'double' प्रकार के होते हैं।"
    },
    {
        "id": "dt-h8",
        "question": "What is the size of a pointer variable (e.g. int*, char*, double*) on a 64-bit operating system?",
        "questionHindi": "64-बिट ऑपरेटिंग सिस्टम पर किसी भी पॉइंटर वेरिएबल (int*, char*, double*) का आकार कितना होता है?",
        "options": [
            "It matches the size of the data type pointed to (1, 4, or 8 bytes)",
            "Always 8 bytes (64 bits) regardless of data type",
            "Always 4 bytes",
            "16 bytes"
        ],
        "correctIndex": 1,
        "explanation": "All pointers hold memory addresses, which are 64 bits (8 bytes) on 64-bit systems.",
        "explanationHindi": "सभी पॉइंटर्स केवल मेमोरी पता रखते हैं, इसलिए 64-बिट सिस्टम पर सभी का आकार 8 बाइट्स होता है।"
    },
    {
        "id": "dt-h9",
        "question": "Which header file provides exact-width integer types like int32_t, uint64_t, and int8_t?",
        "questionHindi": "int32_t, uint64_t और int8_t जैसे निश्चित चौड़ाई वाले डेटा टाइप्स किस हेडर फाइल में हैं?",
        "options": ["<stdint.h>", "<stddef.h>", "<limits.h>", "<stdlib.h>"],
        "correctIndex": 0,
        "explanation": "<stdint.h> (introduced in C99) provides exact-width integer definitions.",
        "explanationHindi": "<stdint.h> हेडर फाइल में निश्चित चौड़ाई वाले डेटा प्रकार परिभाषित हैं।"
    },
    {
        "id": "dt-h10",
        "question": "What is 'size_t' in C, and which header file defines it?",
        "questionHindi": "C भाषा में 'size_t' क्या है और यह किस हेडर फाइल में परिभाषित है?",
        "options": [
            "An unsigned integer type representing object sizes in bytes, defined in <stddef.h> / <stdio.h>",
            "A floating-point type for file size",
            "A pointer to a structure",
            "A string type"
        ],
        "correctIndex": 0,
        "explanation": "size_t is an unsigned integer type returned by sizeof, defined in <stddef.h>.",
        "explanationHindi": "यह sizeof द्वारा लौटाया जाने वाला अनसाइन्ड पूर्णांक प्रकार है।"
    },
    {
        "id": "dt-h11",
        "question": "Is plain 'char' guaranteed by the C standard to be signed or unsigned?",
        "questionHindi": "क्या सादा 'char' मानक C के अनुसार साइन्ड होना निश्चित है या अनसाइन्ड?",
        "options": [
            "Always signed (-128 to 127)",
            "Always unsigned (0 to 255)",
            "Implementation-defined (it is up to the compiler/platform to treat it as signed or unsigned)",
            "It changes based on whether main() returns int"
        ],
        "correctIndex": 2,
        "explanation": "Whether plain char is signed or unsigned is implementation-defined by the compiler.",
        "explanationHindi": "यह कम्पाइलर पर निर्भर करता है; कुछ प्लेटफॉर्म्स पर साइन्ड और कुछ पर अनसाइन्ड होता है।"
    },
    {
        "id": "dt-h12",
        "question": "What is the difference between explicit type casting (float)a / b versus implicit type coercion?",
        "questionHindi": "स्पष्ट टाइप कास्टिंग (Explicit Casting) और अंतर्निहित टाइप कन्वर्जन (Implicit Conversion) में क्या अंतर है?",
        "options": [
            "Explicit is deliberately instructed by programmer syntax; Implicit is automatic conversion by compiler rules",
            "Explicit causes errors; implicit is always correct",
            "Explicit is for strings only",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Explicit casting uses (type) syntax; implicit coercion is performed automatically by compiler.",
        "explanationHindi": "एक्सप्लिसिट प्रोग्रामर द्वारा लिखा जाता है; इम्प्लिसिट कम्पाइलर द्वारा स्वतः किया जाता है।"
    },
    {
        "id": "dt-h13",
        "question": "What will be the result of: (float)(5 / 2) versus (float)5 / 2 in C?",
        "questionHindi": "C में (float)(5 / 2) और (float)5 / 2 के परिणामों में क्या अंतर होगा?",
        "options": [
            "Both give 2.5",
            "(float)(5 / 2) gives 2.000000; (float)5 / 2 gives 2.500000",
            "Both give 2.0",
            "(float)(5 / 2) causes a syntax error"
        ],
        "correctIndex": 1,
        "explanation": "5 / 2 divides integers first yielding 2, then cast to float becomes 2.0. In (float)5 / 2, 5 is float first so 5.0 / 2 = 2.5.",
        "explanationHindi": "(float)(5 / 2) में पहले 5/2 = 2 होगा फिर 2.0 बनेगा; दूसरे में 5.0/2 = 2.5 बनेगा।"
    },
    {
        "id": "dt-h14",
        "question": "What is the format specifier to print a pointer memory address in hexadecimal format in printf()?",
        "questionHindi": "printf() में किसी पॉइंटर का मेमोरी पता हेक्साडेसिमल में प्रिंट करने के लिए कौन-सा विनिर्देशक है?",
        "options": ["%p", "%x", "%d", "%addr"],
        "correctIndex": 0,
        "explanation": "%p prints pointer addresses in implementation-defined hexadecimal format.",
        "explanationHindi": "%p का उपयोग पॉइंटर एड्रेस को हेक्साडेसिमल में प्रिंट करने के लिए किया जाता है।"
    },
    {
        "id": "dt-h15",
        "question": "What is the purpose of the 'stdbool.h' header introduced in C99?",
        "questionHindi": "C99 में प्रस्तुत 'stdbool.h' हेडर फाइल का क्या उद्देश्य है?",
        "options": [
            "Defines bool, true (1), and false (0) macros over the built-in _Bool type",
            "Tests string equality",
            "Enables database connectivity",
            "Disables all compiler errors"
        ],
        "correctIndex": 0,
        "explanation": "stdbool.h allows using 'bool', 'true', and 'false' like modern languages.",
        "explanationHindi": "यह बूलियन डेटा टाइप (bool, true, false) का उपयोग करने की सुविधा देता है।"
    },
    {
        "id": "dt-h16",
        "question": "What is the type of a string literal like \"Hello\" in C?",
        "questionHindi": "C भाषा में \"Hello\" जैसे स्ट्रिंग लिटरल का डेटा टाइप क्या होता है?",
        "options": ["string", "char[6] (array of 6 chars including null terminator)", "pointer to integer", "char[5]"],
        "correctIndex": 1,
        "explanation": "\"Hello\" has 5 characters plus the null terminator '\\0', creating an array of char[6].",
        "explanationHindi": "5 अक्षर + अंत में '\\0' (नल कैरेक्टर), इसलिए यह char[6] ऐरे होता है।"
    },
    {
        "id": "dt-h17",
        "question": "What is 'wchar_t' in C and what header file provides it?",
        "questionHindi": "C में 'wchar_t' क्या है और यह किस हेडर फाइल में मिलता है?",
        "options": [
            "Wide character type for international Unicode character sets, defined in <wchar.h> and <stddef.h>",
            "Web character for HTML",
            "Word character for MS Word",
            "A pointer to char"
        ],
        "correctIndex": 0,
        "explanation": "wchar_t is a wide character type for multilingual/Unicode support.",
        "explanationHindi": "यह यूनिकोड और अंतरराष्ट्रीय अक्षरों को स्टोर करने के लिए वाइड कैरेक्टर टाइप है।"
    },
    {
        "id": "dt-h18",
        "question": "What is the size and precision of 'long double' in C?",
        "questionHindi": "C में 'long double' का आकार और परिशुद्धता क्या होती है?",
        "options": [
            "Always 8 bytes",
            "Platform dependent: 80-bit extended precision or 128-bit quadruple precision (10, 12, or 16 bytes)",
            "Always 32 bytes",
            "Same as float"
        ],
        "correctIndex": 1,
        "explanation": "long double provides extended precision, typically 80 bits padded to 12 or 16 bytes.",
        "explanationHindi": "यह अत्यधिक परिशुद्धता (80-बिट या 128-बिट) प्रदान करता है।"
    },
    {
        "id": "dt-h19",
        "question": "What happens if you assign a floating-point value to an integer variable (e.g. int x = 9.85;)?",
        "questionHindi": "यदि दशमलव मान को किसी पूर्णांक चर में असाइन किया जाए (जैसे int x = 9.85;), तो क्या होगा?",
        "options": [
            "Compile error",
            "The fractional part is truncated toward zero (x becomes 9), losing all decimal values",
            "x rounds to 10",
            "x becomes 0"
        ],
        "correctIndex": 1,
        "explanation": "Integer assignment truncates (chops off) decimals without rounding, so 9.85 becomes 9.",
        "explanationHindi": "दशमलव के बाद का भाग हट जाता है (ट्रंकेशन), x का मान केवल 9 रह जाता है।"
    },
    {
        "id": "dt-h20",
        "question": "In C, what is the type of an enumeration constant defined inside 'enum Color { RED, GREEN, BLUE };'?",
        "questionHindi": "enum के अंदर परिभाषित स्थिरांक (जैसे RED, GREEN) का अंतर्निहित डेटा प्रकार क्या होता है?",
        "options": ["int", "char", "unsigned char", "enum_ptr"],
        "correctIndex": 0,
        "explanation": "In C, enum constants are strictly of type 'int'.",
        "explanationHindi": "C भाषा में enum के सभी स्थिरांक आंतरिक रूप से 'int' (पूर्णांक) प्रकार के होते हैं।"
    }
]

register("data-type", dt_easy, dt_hard)
print("Registered Topic 3: data-type")

# Topic 4: Logic: 3-Digit Number Digits Extraction
td_easy = [
    {
        "id": "td-e1",
        "question": "In integer division in C, what does the slash operator '/' return?",
        "questionHindi": "C भाषा में दो पूर्णांकों के विभाजन पर स्लेश ऑपरेटर '/' क्या लौटाता है?",
        "options": ["The remainder", "The integer quotient (भागफल), truncating any fraction", "The decimal float", "The sum"],
        "correctIndex": 1,
        "explanation": "Integer division truncates fractional parts and returns only the quotient.",
        "explanationHindi": "पूर्णांक विभाजन दशमलव को छोड़कर केवल भागफल (Quotient) लौटाता है।"
    },
    {
        "id": "td-e2",
        "question": "What does the modulus operator '%' return in C?",
        "questionHindi": "C भाषा में मॉड्यूलस ऑपरेटर '%' क्या लौटाता है?",
        "options": ["The quotient", "The remainder (शेषफल) after integer division", "The percentage", "The product"],
        "correctIndex": 1,
        "explanation": "% operator yields the remainder after integer division.",
        "explanationHindi": "मॉड्यूलस (%) ऑपरेटर भाग देने के बाद बचा हुआ शेषफल (Remainder) लौटाता है।"
    },
    {
        "id": "td-e3",
        "question": "What is the formula to extract the FIRST digit (hundreds place) of a 3-digit number 'num' (e.g. 749)?",
        "questionHindi": "तीन अंकों की संख्या 'num' (जैसे 749) से पहली संख्या (सैकड़े का अंक) निकालने का फॉर्मूला क्या है?",
        "options": ["num % 100", "num / 100", "num / 10", "num % 10"],
        "correctIndex": 1,
        "explanation": "num / 100 extracts the hundreds digit (e.g. 749 / 100 = 7).",
        "explanationHindi": "num / 100 से पहला अंक मिलता है (जैसे 749 / 100 = 7)।"
    },
    {
        "id": "td-e4",
        "question": "What is the formula to extract the THIRD / LAST digit (units place) of any integer 'num' (e.g. 749)?",
        "questionHindi": "किसी भी संख्या 'num' (जैसे 749) से अंतिम/तीसरी संख्या (इकाई का अंक) निकालने का फॉर्मूला क्या है?",
        "options": ["num / 10", "num % 10", "num / 100", "num % 100"],
        "correctIndex": 1,
        "explanation": "num % 10 gives the remainder when divided by 10, which is the last digit (749 % 10 = 9).",
        "explanationHindi": "num % 10 से अंतिम अंक प्राप्त होता है (जैसे 749 % 10 = 9)।"
    },
    {
        "id": "td-e5",
        "question": "What is the standard formula to extract the SECOND digit (tens place / बीच का अंक) of a 3-digit number 'num'?",
        "questionHindi": "तीन अंकों की संख्या 'num' से दूसरी संख्या (दहाई का अंक / बीच का अंक) निकालने का फॉर्मूला क्या है?",
        "options": ["(num / 10) % 10", "num / 2", "num % 2", "(num * 10) / 10"],
        "correctIndex": 0,
        "explanation": "num / 10 removes the units digit (749 -> 74), then 74 % 10 extracts the tens digit (4).",
        "explanationHindi": "(num / 10) % 10 से बीच का अंक मिलता है (749/10 = 74, फिर 74%10 = 4)।"
    },
    {
        "id": "td-e6",
        "question": "If num = 385, what is the value of 385 / 100 in C?",
        "questionHindi": "यदि num = 385 है, तो C में 385 / 100 का मान क्या होगा?",
        "options": ["3.85", "3", "38", "5"],
        "correctIndex": 1,
        "explanation": "Integer division drops the fraction .85 and gives 3.",
        "explanationHindi": "पूर्णांक भाग में दशमलव हट जाता है और परिणाम 3 आता है।"
    },
    {
        "id": "td-e7",
        "question": "If num = 385, what is the value of 385 % 10 in C?",
        "questionHindi": "यदि num = 385 है, तो C में 385 % 10 का मान क्या होगा?",
        "options": ["3", "8", "5", "38"],
        "correctIndex": 2,
        "explanation": "385 divided by 10 leaves remainder 5.",
        "explanationHindi": "385 को 10 से भाग देने पर शेषफल 5 बचता है।"
    },
    {
        "id": "td-e8",
        "question": "If num = 385, what is the value of (385 / 10) % 10 in C?",
        "questionHindi": "यदि num = 385 है, तो C में (385 / 10) % 10 का मान क्या होगा?",
        "options": ["3", "8", "5", "38"],
        "correctIndex": 1,
        "explanation": "385 / 10 = 38; then 38 % 10 = 8.",
        "explanationHindi": "385 / 10 = 38; फिर 38 % 10 = 8 (बीच का अंक)।"
    },
    {
        "id": "td-e9",
        "question": "What is the formula to calculate the SUM of all three digits (d1, d2, d3)?",
        "questionHindi": "तीनों अंकों (d1, d2, d3) का योग (Sum of Digits) निकालने का फॉर्मूला क्या है?",
        "options": ["d1 * d2 * d3", "d1 + d2 + d3", "(d1 + d3) / d2", "d1 - d2 - d3"],
        "correctIndex": 1,
        "explanation": "Sum of digits is simply d1 + d2 + d3.",
        "explanationHindi": "तीनों अंकों का योग = d1 + d2 + d3।"
    },
    {
        "id": "td-e10",
        "question": "What is the formula to calculate the REVERSE of a 3-digit number given d1 (1st), d2 (2nd), and d3 (3rd)?",
        "questionHindi": "तीनों अंकों (d1=पहला, d2=दूसरा, d3=तीसरा) से उल्टी संख्या (Reverse Number) बनाने का फॉर्मूला क्या है?",
        "options": [
            "(d3 * 100) + (d2 * 10) + d1",
            "(d1 * 100) + (d2 * 10) + d3",
            "d3 + d2 + d1",
            "(d3 * 10) + d2 + d1"
        ],
        "correctIndex": 0,
        "explanation": "To reverse: third digit becomes hundreds, second tens, first units -> (d3 * 100) + (d2 * 10) + d1.",
        "explanationHindi": "उल्टा करने पर: (d3 * 100) + (d2 * 10) + d1 बनता है।"
    },
    {
        "id": "td-e11",
        "question": "If a user enters 925, what will be its reverse number?",
        "questionHindi": "यदि संख्या 925 है, तो उसका उल्टा (Reverse) क्या होगा?",
        "options": ["259", "529", "952", "592"],
        "correctIndex": 1,
        "explanation": "Reversing 925 produces 529 (5*100 + 2*10 + 9).",
        "explanationHindi": "925 का उल्टा 529 होगा (5*100 + 2*10 + 9)।"
    },
    {
        "id": "td-e12",
        "question": "What is the valid numerical range of positive 3-digit integers?",
        "questionHindi": "धनात्मक तीन अंकों की संख्याओं की मान्य सीमा क्या होती है?",
        "options": ["10 to 99", "100 to 999", "1000 to 9999", "0 to 300"],
        "correctIndex": 1,
        "explanation": "Three-digit numbers range from 100 to 999.",
        "explanationHindi": "तीन अंकों की संख्याएं 100 से लेकर 999 तक होती हैं।"
    },
    {
        "id": "td-e13",
        "question": "Which C 'if' condition accurately verifies that variable 'num' is a positive 3-digit number?",
        "questionHindi": "कौन-सी C शर्त यह सही जांचती है कि 'num' एक 3 अंकों की संख्या है?",
        "options": [
            "if (num >= 100 && num <= 999)",
            "if (num > 100 || num < 999)",
            "if (num == 3)",
            "if (num >= 1000)"
        ],
        "correctIndex": 0,
        "explanation": "num >= 100 && num <= 999 ensures num has exactly 3 digits.",
        "explanationHindi": "if (num >= 100 && num <= 999) सही 3-अंकों की सीमा की जांच करता है।"
    },
    {
        "id": "td-e14",
        "question": "What is a 3-digit Armstrong Number (नार्सिसिस्टिक संख्या)?",
        "questionHindi": "3 अंकों की आर्मस्ट्रांग संख्या (Armstrong Number) क्या होती है?",
        "options": [
            "A number whose sum of the cubes of its digits equals the number itself: (d1^3 + d2^3 + d3^3 == num)",
            "A number divisible by 3",
            "A number whose digits are all even",
            "A prime number"
        ],
        "correctIndex": 0,
        "explanation": "An Armstrong number equals the sum of cubes of its digits (e.g. 153 = 1^3 + 5^3 + 3^3).",
        "explanationHindi": "वह संख्या जिसके प्रत्येक अंक के घन (Cube) का योग मूल संख्या के बराबर हो।"
    },
    {
        "id": "td-e15",
        "question": "Is 153 an Armstrong number?",
        "questionHindi": "क्या 153 एक आर्मस्ट्रांग संख्या है?",
        "options": [
            "Yes, because 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153",
            "No, sum is 150",
            "Only in octal",
            "No, it is prime"
        ],
        "correctIndex": 0,
        "explanation": "1^3 (1) + 5^3 (125) + 3^3 (27) = 153, exactly matching the original number.",
        "explanationHindi": "हाँ, क्योंकि 1 + 125 + 27 = 153 होता है।"
    },
    {
        "id": "td-e16",
        "question": "What condition checks if a 3-digit number is a Palindrome (reads same forward and backward)?",
        "questionHindi": "तीन अंकों की संख्या के पैलिंड्रोम (Palindrome) होने की क्या शर्त है?",
        "options": ["d1 == d3 (पहला अंक और तीसरा अंक बराबर हों)", "d1 == d2", "d2 == d3", "d1 + d2 == d3"],
        "correctIndex": 0,
        "explanation": "In any 3-digit palindrome (like 121, 545, 989), the first digit must equal the last digit: d1 == d3.",
        "explanationHindi": "3-अंकों के पैलिंड्रोम (जैसे 121, 545) में पहला और तीसरा अंक समान होना चाहिए (d1 == d3)।"
    },
    {
        "id": "td-e17",
        "question": "What alternative formula can extract the second digit (d2) using % 100 first?",
        "questionHindi": "% 100 का उपयोग करके दूसरा अंक (d2) निकालने का दूसरा वैकल्पिक फॉर्मूला क्या है?",
        "options": ["(num % 100) / 10", "(num % 10) / 100", "num % 20", "(num / 100) % 10"],
        "correctIndex": 0,
        "explanation": "num % 100 drops the hundreds digit (749 -> 49), then 49 / 10 gives 4.",
        "explanationHindi": "(num % 100) / 10 (जैसे 749 % 100 = 49, फिर 49 / 10 = 4)।"
    },
    {
        "id": "td-e18",
        "question": "If num = 407, what are d1, d2, and d3 respectively?",
        "questionHindi": "यदि num = 407 है, तो d1, d2 और d3 के मान क्रमशः क्या होंगे?",
        "options": ["d1=4, d2=0, d3=7", "d1=7, d2=0, d3=4", "d1=4, d2=7, d3=0", "d1=0, d2=4, d3=7"],
        "correctIndex": 0,
        "explanation": "d1 = 407 / 100 = 4; d2 = (407 / 10) % 10 = 0; d3 = 407 % 10 = 7.",
        "explanationHindi": "पहला अंक d1=4, दूसरा अंक d2=0, तीसरा अंक d3=7।"
    },
    {
        "id": "td-e19",
        "question": "What is the product of digits of the number 234?",
        "questionHindi": "संख्या 234 के अंकों का गुणनफल (Product of Digits) क्या होगा?",
        "options": ["9", "24 (2 * 3 * 4)", "20", "14"],
        "correctIndex": 1,
        "explanation": "Product = 2 * 3 * 4 = 24.",
        "explanationHindi": "गुणनफल = 2 * 3 * 4 = 24।"
    },
    {
        "id": "td-e20",
        "question": "Can the modulus operator '%' be used with 'float' or 'double' in C without compilation errors?",
        "questionHindi": "क्या C में '%' ऑपरेटर को सीधे 'float' या 'double' के साथ इस्तेमाल किया जा सकता है?",
        "options": [
            "Yes, works the same",
            "No, % is strictly restricted to integer types in C (use fmod() from <math.h> for floating-point)",
            "Only with GCC flag",
            "Only on Linux"
        ],
        "correctIndex": 1,
        "explanation": "% operator requires integer operands. For floating point remainder, use fmod() from <math.h>.",
        "explanationHindi": "नहीं, C में % ऑपरेटर केवल पूर्णांकों पर ही कार्य करता है (फ्लोट के लिए fmod() चाहिए)।"
    }
]

td_hard = [
    {
        "id": "td-h1",
        "question": "Why does (num / 10) % 10 mathematically guarantee extracting only the tens digit of ANY integer?",
        "questionHindi": "गणितीय रूप से (num / 10) % 10 किसी भी पूर्णांक का दहाई अंक निकालने की गारंटी क्यों देता है?",
        "options": [
            "Dividing by 10 shifts decimal right and discards the units digit; modulo 10 then isolates the new least significant digit",
            "Modulo 10 multiplies by 10",
            "It is a compiler specific trick",
            "It only works for powers of 2"
        ],
        "correctIndex": 0,
        "explanation": "num / 10 strips the units place; then % 10 retrieves the new lowest digit, which was the tens place.",
        "explanationHindi": "num/10 इकाई अंक को हटा देता है; फिर % 10 नए अंतिम अंक (जो दहाई था) को अलग कर लेता है।"
    },
    {
        "id": "td-h2",
        "question": "What is the result of -385 % 10 in ISO C99 / C11 standards?",
        "questionHindi": "ISO C99/C11 मानक में -385 % 10 का मान क्या होगा?",
        "options": ["5", "-5", "38", "-38"],
        "correctIndex": 1,
        "explanation": "In C99, integer division truncates towards zero, meaning (a/b)*b + a%b = a. Thus -385 % 10 is -5.",
        "explanationHindi": "C99 में शेषफल का चिह्न हमेशा भाज्य (Dividend) के चिह्न के समान होता है, इसलिए -5 आएगा।"
    },
    {
        "id": "td-h3",
        "question": "How should a C program robustly extract digits from a negative 3-digit number like -749?",
        "questionHindi": "C प्रोग्राम में -749 जैसी ऋणात्मक संख्या से अंक निकालने का सबसे सुरक्षित तरीका क्या है?",
        "options": [
            "Take the absolute value first using abs(num) or num = -num, then apply standard digit extraction formulas",
            "Add 1000",
            "Divide by -100",
            "Use float casting"
        ],
        "correctIndex": 0,
        "explanation": "Converting to absolute positive value avoids negative digit anomalies during calculation.",
        "explanationHindi": "पहले abs(num) से संख्या को धनात्मक बनाएं, फिर सामान्य फॉर्मूले लागू करें।"
    },
    {
        "id": "td-h4",
        "question": "Which of the following are ALL 3-digit Armstrong numbers?",
        "questionHindi": "इनमें से कौन-सा समूह 3 अंकों की सभी आर्मस्ट्रांग संख्याओं का है?",
        "options": [
            "153, 370, 371, 407",
            "100, 200, 300, 400",
            "123, 234, 345, 456",
            "111, 222, 333, 444"
        ],
        "correctIndex": 0,
        "explanation": "153, 370, 371, and 407 are the only four 3-digit Armstrong numbers.",
        "explanationHindi": "153, 370, 371 और 407 ही केवल 4 तीन-अंकों की आर्मस्ट्रांग संख्याएं हैं।"
    },
    {
        "id": "td-h5",
        "question": "Why is 'd1*d1*d1 + d2*d2*d2 + d3*d3*d3' preferred over 'pow(d1, 3) + pow(d2, 3) + pow(d3, 3)' in C for Armstrong numbers?",
        "questionHindi": "आर्मस्ट्रांग संख्या के लिए C में pow(d, 3) के बजाय d*d*d लिखना क्यों बेहतर माना जाता है?",
        "options": [
            "pow() uses floating-point arithmetic and can introduce precision errors (e.g. 5^3 becoming 124.999999, casting to 124 in int)",
            "pow() is not available in C",
            "pow() only accepts negative numbers",
            "Multiplication is slower than pow()"
        ],
        "correctIndex": 0,
        "explanation": "pow() returns double; truncation to integer can cause precision bugs. Direct multiplication is exact and faster.",
        "explanationHindi": "pow() फ्लोटिंग पॉइंट में काम करता है जिससे 124.999999 जैसी अशुद्धि से int में 124 बन सकता है।"
    },
    {
        "id": "td-h6",
        "question": "What is the time complexity and auxiliary space complexity of 3-digit extraction using direct arithmetic?",
        "questionHindi": "सीधे अंकगणित द्वारा 3-अंकों के निष्कर्षण की टाइम और स्पेस कॉम्प्लेक्सिटी क्या है?",
        "options": ["O(1) Time and O(1) Space", "O(N) Time and O(N) Space", "O(log N) Time", "O(N^2) Time"],
        "correctIndex": 0,
        "explanation": "Direct division and modulus require constant O(1) time and O(1) extra memory.",
        "explanationHindi": "यह निश्चित 3 ऑपरेशन्स में पूरा होता है, इसलिए O(1) टाइम और O(1) स्पेस लगता है।"
    },
    {
        "id": "td-h7",
        "question": "How do you construct a condition to check if the digits of a 3-digit number are in strictly INCREASING order (e.g. 138)?",
        "questionHindi": "3-अंकों की संख्या के अंक बढ़ते क्रम में होने की क्या शर्त होगी (जैसे 138)?",
        "options": [
            "if (d1 < d2 && d2 < d3)",
            "if (d1 > d2 && d2 > d3)",
            "if (d1 <= d2 || d2 <= d3)",
            "if (d1 + 1 == d2)"
        ],
        "correctIndex": 0,
        "explanation": "d1 < d2 && d2 < d3 verifies that each subsequent digit is strictly greater than the previous.",
        "explanationHindi": "if (d1 < d2 && d2 < d3) जांचता है कि पहला अंक < दूसरा अंक < तीसरा अंक।"
    },
    {
        "id": "td-h8",
        "question": "What is the logic to find the LARGEST digit among d1, d2, and d3 in C?",
        "questionHindi": "d1, d2 और d3 में से सबसे बड़ा अंक ज्ञात करने का सही C लॉजिक क्या है?",
        "options": [
            "if (d1 >= d2 && d1 >= d3) max = d1; else if (d2 >= d3) max = d2; else max = d3;",
            "max = d1 + d2 + d3;",
            "max = d1 > d2 > d3;",
            "if (d1 == d2) max = d3;"
        ],
        "correctIndex": 0,
        "explanation": "Compare d1 against d2 and d3; if not, compare d2 against d3; else d3 is largest.",
        "explanationHindi": "यदि d1 >= d2 और d1 >= d3 तो max=d1; अन्यथा यदि d2 >= d3 तो max=d2; अन्यथा max=d3।"
    },
    {
        "id": "td-h9",
        "question": "What is a Harshad (Niven) number for a 3-digit integer?",
        "questionHindi": "3-अंकों की संख्या के लिए हर्षद (Harshad) संख्या क्या होती है?",
        "options": [
            "An integer that is completely divisible by the sum of its digits: num % (d1 + d2 + d3) == 0",
            "A number whose digits multiply to 100",
            "A number with all odd digits",
            "A number equal to reverse of itself"
        ],
        "correctIndex": 0,
        "explanation": "A Harshad number is divisible by the sum of its digits (e.g. 156 / (1+5+6=12) = 13).",
        "explanationHindi": "वह संख्या जो अपने अंकों के योग से पूर्णतः विभाजित हो जाए (num % (d1+d2+d3) == 0)।"
    },
    {
        "id": "td-h10",
        "question": "How do you form a new number by SWAPPING the first and third digits of a 3-digit number 'num'?",
        "questionHindi": "3-अंकों की संख्या के पहले और तीसरे अंक को आपस में बदलकर नई संख्या कैसे बनाई जाएगी?",
        "options": [
            "new_num = (d3 * 100) + (d2 * 10) + d1;",
            "new_num = d3 + d2 + d1;",
            "new_num = (d1 * 100) + (d2 * 10) + d3;",
            "new_num = (d3 * 10) + d1;"
        ],
        "correctIndex": 0,
        "explanation": "Place d3 in hundreds place, keep d2 in tens, and put d1 in units: (d3 * 100) + (d2 * 10) + d1.",
        "explanationHindi": "तीसरे अंक को 100 से गुणा करें, दूसरे को 10 से और पहले को जोड़ दें।"
    },
    {
        "id": "td-h11",
        "question": "If num = 500, what will be the arithmetic reverse using (d3*100 + d2*10 + d1)?",
        "questionHindi": "यदि num = 500 है, तो फॉर्मूले (d3*100 + d2*10 + d1) से क्या पूर्णांक मान बनेगा?",
        "options": ["005", "5 (क्योंकि पूर्णांक 0*100 + 0*10 + 5 = 5 बनता है)", "500", "50"],
        "correctIndex": 1,
        "explanation": "d3=0, d2=0, d1=5 -> 0*100 + 0*10 + 5 = 5. Integers do not store leading zeroes.",
        "explanationHindi": "पूर्णांक के रूप में मान 5 बनेगा क्योंकि आगे के शून्य पूर्णांक में नहीं रहते।"
    },
    {
        "id": "td-h12",
        "question": "How can you print a 3-digit reverse of 500 showing leading zeroes as \"005\"?",
        "questionHindi": "संख्या 500 का उल्टा आगे के शून्य सहित \"005\" के रूप में प्रिंट करने के लिए printf कैसे लिखेंगे?",
        "options": [
            "printf(\"%d%d%d\", d3, d2, d1);",
            "printf(\"%d\", rev);",
            "printf(\"%03d\", rev);",
            "Both A and C achieve leading zeroes"
        ],
        "correctIndex": 3,
        "explanation": "Both printing digits individually %d%d%d or using %03d format specifier will display 005.",
        "explanationHindi": "अंकों को अलग-अलग %d%d%d प्रिंट करके या %03d फ्लैग से 005 प्रिंट किया जा सकता है।"
    },
    {
        "id": "td-h13",
        "question": "What is the difference between extracting digits with a 'while' loop versus direct formulas for 3 digits?",
        "questionHindi": "3-अंकों के लिए सीधे फॉर्मूले और 'while' लूप द्वारा अंक निकालने में क्या अंतर है?",
        "options": [
            "Direct arithmetic is O(1) fixed step and needs no loop overhead; while loop handles any arbitrary number of digits dynamically",
            "While loop is faster than division",
            "Direct formula only works in Windows",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Direct formulas are faster and simpler for known 3 digits; while loops generalize to any number length.",
        "explanationHindi": "सीधा फॉर्मूला 3 अंकों के लिए सबसे तेज O(1) है; लूप किसी भी लंबाई की संख्या के लिए काम करता है।"
    },
    {
        "id": "td-h14",
        "question": "If you rotate the digits of 456 to the left cyclically (456 -> 564), what is the formula?",
        "questionHindi": "यदि 456 के अंकों को बाईं ओर घुमाएं (456 -> 564), तो फॉर्मूला क्या होगा?",
        "options": [
            "new_num = (d2 * 100) + (d3 * 10) + d1;",
            "new_num = (d1 * 100) + (d2 * 10) + d3;",
            "new_num = d2 + d3 + d1;",
            "new_num = (d3 * 100) + (d1 * 10) + d2;"
        ],
        "correctIndex": 0,
        "explanation": "The second digit moves to hundreds, third to tens, first to units: (d2*100) + (d3*10) + d1.",
        "explanationHindi": "(d2 * 100) + (d3 * 10) + d1 से नया अंक 564 बनेगा।"
    },
    {
        "id": "td-h15",
        "question": "What happens if a user inputs 095 in a scanf(\"%d\", &num) statement?",
        "questionHindi": "यदि यूजर इनपुट में 095 दर्ज करे, तो scanf(\"%d\", &num) में क्या स्टोर होगा?",
        "options": [
            "It stores integer 95 (a 2-digit number), failing the 3-digit validation check",
            "It treats it as octal and throws error",
            "It stores 950",
            "It crashes"
        ],
        "correctIndex": 0,
        "explanation": "%d reads decimal, leading zero is ignored, storing 95. The check num >= 100 will correctly reject it.",
        "explanationHindi": "%d डेसिमल पढ़ता है और 95 स्टोर करेगा; 3 अंकों की जांच (num >= 100) इसे अस्वीकार कर देगी।"
    },
    {
        "id": "td-h16",
        "question": "Can bitwise operations alone extract base-10 decimal digits directly without division by 10?",
        "questionHindi": "क्या बिना 10 से भाग दिए केवल बिटवाइज़ ऑपरेटर्स द्वारा दशमलव अंक अलग किए जा सकते हैं?",
        "options": [
            "No, bitwise operations operate in powers of 2 (binary base), not base-10 decimal",
            "Yes, using XOR ^ 10",
            "Yes, using Left shift << 10",
            "Yes, using bitwise NOT ~"
        ],
        "correctIndex": 0,
        "explanation": "Base-10 decimal digits require division/modulo by 10 or BCD conversion; bitwise operates on binary powers of 2.",
        "explanationHindi": "नहीं, बिटवाइज़ ऑपरेटर्स बेस-2 बाइनरी पर काम करते हैं, बेस-10 दशमलव अंकों के लिए 10 से भाग अनिवार्य है।"
    },
    {
        "id": "td-h17",
        "question": "What is the result if num = 999: d1 + d2 + d3, and reversed number?",
        "questionHindi": "यदि num = 999 है, तो अंकों का योग और उल्टा क्या होगा?",
        "options": [
            "Sum = 27, Reversed = 999",
            "Sum = 18, Reversed = 999",
            "Sum = 27, Reversed = 0",
            "Sum = 9, Reversed = 999"
        ],
        "correctIndex": 0,
        "explanation": "9 + 9 + 9 = 27; Reversed = 9*100 + 9*10 + 9 = 999 (Palindrome).",
        "explanationHindi": "योग = 9 + 9 + 9 = 27, और उल्टा भी 999 होगा।"
    },
    {
        "id": "td-h18",
        "question": "What is the check to verify if all three digits of a 3-digit number are distinct (no two digits are equal)?",
        "questionHindi": "यह जांचने की क्या शर्त है कि 3-अंकों की संख्या के तीनों अंक एक-दूसरे से भिन्न (Distinct) हैं?",
        "options": [
            "if (d1 != d2 && d2 != d3 && d1 != d3)",
            "if (d1 != d2 || d2 != d3)",
            "if (d1 + d2 != d3)",
            "if (d1 * d2 * d3 != 0)"
        ],
        "correctIndex": 0,
        "explanation": "Must ensure d1 != d2, d2 != d3, AND d1 != d3 simultaneously.",
        "explanationHindi": "तीनों जोड़ियों की असमानता जांचनी होगी: if (d1 != d2 && d2 != d3 && d1 != d3)।"
    },
    {
        "id": "td-h19",
        "question": "In a 3-digit number, what is the middle digit (d2) if num % 100 == 0 (e.g. 100, 200, 900)?",
        "questionHindi": "यदि संख्या 100, 200 या 900 हो, तो बीच का अंक (d2) क्या होगा?",
        "options": ["0", "1", "10", "Undefined"],
        "correctIndex": 0,
        "explanation": "For 100: (100 / 10) % 10 = 10 % 10 = 0.",
        "explanationHindi": "बीच का अंक 0 होगा (100 / 10 = 10, और 10 % 10 = 0)।"
    },
    {
        "id": "td-h20",
        "question": "What is the condition to check if the sum of the first and third digit equals the middle digit (e.g. 132, where 1+2=3)?",
        "questionHindi": "यह जांचने की क्या शर्त है कि पहले और तीसरे अंक का योग बीच के अंक के बराबर हो (जैसे 132, 1+2=3)?",
        "options": [
            "if (d1 + d3 == d2)",
            "if (d1 + d2 == d3)",
            "if (d2 + d3 == d1)",
            "if (d1 * d3 == d2)"
        ],
        "correctIndex": 0,
        "explanation": "Directly express the relationship: d1 + d3 == d2.",
        "explanationHindi": "सीधा समीकरण: if (d1 + d3 == d2)।"
    }
]

register("three-digit-logic", td_easy, td_hard)
print("Registered Topic 4: three-digit-logic")
