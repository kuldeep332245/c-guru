import { Topic } from '../types';

export const C_TOPICS: Topic[] = [
  {
    id: 'c-intro',
    order: 1,
    title: 'Introduction to C & First Program',
    titleHindi: 'C भाषा का परिचय एवं पहला प्रोग्राम (Dennis Ritchie)',
    category: 'Basics',
    summary: 'Discover the mother of all modern languages created by Dennis Ritchie. Understand compilation and your very first "Hello World" code.',
    summaryHindi: 'डेनिस रिची द्वारा निर्मित C भाषा का इतिहास, प्रोग्राम की बुनियादी संरचना और पहला "Hello World" कोड समझें।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS C IN SIMPLE WORDS?
C is a general-purpose, procedural computer programming language created in 1972 by Dennis Ritchie at AT&T Bell Laboratories in the United States. It was originally designed to rewrite the UNIX operating system. Today, C is universally celebrated as the "Mother of all Modern Programming Languages" because languages like C++, Java, C#, Python, JavaScript, and PHP all borrowed their syntax, control structures, and fundamental philosophy directly from C!

2. WHY IS C ESSENTIAL & HOW DOES THE COMPUTER UNDERSTAND IT?
Computers do not speak English, Hindi, or any human language. The CPU only understands machine language consisting of raw binary bits: 0s and 1s (electrical off and on signals). Writing code in 0s and 1s directly is practically impossible for humans. 
C acts as a high-level bridge that humans can easily read and write, while still having low-level access to memory addresses and hardware registers.
A special program called the COMPILER takes your C code and translates it through four distinct phases:
- Preprocessor: Expands headers and macros.
- Compiler: Converts C source code into assembly instructions.
- Assembler: Converts assembly into machine object code (.o).
- Linker: Binds library files together into a final runnable executable (.exe).

3. STEP-BY-STEP BREAKDOWN OF YOUR FIRST C PROGRAM:
Let us analyze every single character of the classic program:
#include <stdio.h>
int main() {
    printf("Namaste, World!\\n");
    return 0;
}

- '#include <stdio.h>': The hash (#) tells the preprocessor to act before compilation. 'stdio.h' stands for Standard Input Output header file. Without this line, the computer would have no clue what 'printf' or 'scanf' mean!
- 'int main()': This is the mandatory front door of every C program. No matter how large an application is (even 1 million lines), the operating system always begins execution precisely at the first line of main(). The 'int' before main means the function will return an integer number to the OS when it finishes.
- '{ and }': The opening and closing curly braces define the boundaries of the main function. Everything you want to execute must live inside these walls.
- 'printf("...");': printf stands for "print formatted". It takes the text enclosed inside double quotation marks and prints it out onto your monitor screen.
- '\\n': This is an escape sequence that represents a newline. It is equivalent to pressing the 'Enter' key on your keyboard, moving the cursor to the next line.
- Semicolon (;): In English, every sentence ends with a full stop (.). In C, every single instruction MUST end with a semicolon (;). Forgetting a semicolon is the most famous beginner error in programming!
- 'return 0;': When main finishes successfully, it hands the number 0 back to the Operating System. In computer science, an exit code of 0 universally means: "Everything finished perfectly without any errors!"

4. REAL-LIFE ANALOGY FOR BEGINNERS:
Think of main() as the principal entrance gate of your school. The school has many classrooms, playgrounds, and labs (functions), but every morning all students and teachers must enter through the front gate first. #include <stdio.h> is like packing your school bag with notebooks and pens before class begins so you have the tools needed to write!`,
    explanationHi: `१. सरल शब्दों में C भाषा क्या है?
C एक अत्यंत लोकप्रिय, शक्तिशाली और बुनियादी कंप्यूटर प्रोग्रामिंग भाषा है। इसका आविष्कार सन् 1972 में अमेरिका की बेल लैबोरेटरीज (Bell Labs) में वैज्ञानिक डेनिस रिची (Dennis Ritchie) ने किया था। C को सभी आधुनिक भाषाओं (जैसे C++, Java, Python, JavaScript) की "माता (Mother Language)" कहा जाता है। इसका कारण यह है कि यदि आप C भाषा सीख लेते हैं, तो दुनिया की किसी भी दूसरी प्रोग्रामिंग भाषा को सीखना आपके लिए बच्चों के खेल जैसा आसान हो जाता है!

२. C भाषा क्यों जरूरी है और कंप्यूटर इसे कैसे समझता है?
कंप्यूटर कोई इंसान नहीं है; वह हमारी हिन्दी या अंग्रेजी भाषा नहीं समझता। कंप्यूटर का दिमाग (CPU) केवल बिजली के चालू और बंद सिग्नल्स, यानी बाइनरी भाषा (0 और 1) को ही समझता है। लेकिन इंसानों के लिए लाखों 0 और 1 लिखना असंभव है। 
इसलिए हम C भाषा में अंग्रेजी जैसे सरल शब्दों में कोड लिखते हैं। इसके बाद एक विशेष सॉफ्टवेयर, जिसे "कम्पाइलर (Compiler)" कहते हैं, हमारे लिखे हुए कोड को कंप्यूटर की समझने योग्य 0 और 1 की मशीनी भाषा में बदल देता है। 
कम्पाइलेशन के ४ मुख्य चरण होते हैं:
- प्रीप्रोसेसर (Preprocessor): हेडर फाइलों को जोड़ता है।
- कम्पाइलर (Compiler): C कोड को असेंबली कोड में बदलता है।
- असेंबलर (Assembler): असेंबली को ऑब्जेक्ट कोड (.o) में बदलता है।
- लिंकर (Linker): सभी फाइलों को मिलाकर चलाने योग्य (.exe) प्रोग्राम बनाता है।

३. पहले C प्रोग्राम के एक-एक शब्द का सरल अर्थ:
आइए हमारे पहले प्रोग्राम की प्रत्येक पंक्ति को गहराई से समझें:
#include <stdio.h>
int main() {
    printf("नमस्ते भारत!\\n");
    return 0;
}

- '#include <stdio.h>': यहाँ '#' का मतलब प्रीप्रोसेसर निर्देश है। 'stdio.h' का पूरा नाम "Standard Input Output Header File" है। जैसे रसोई में खाना बनाने से पहले बर्तनों की जरूरत होती है, वैसे ही स्क्रीन पर कुछ दिखाने (printf) या इनपुट लेने (scanf) के लिए इस फाइल को शामिल करना अनिवार्य है।
- 'int main()': यह पूरे प्रोग्राम का मुख्य दरवाजा (Main Gate) है। आपका प्रोग्राम चाहे 10 लाइनों का हो या 10,000 लाइनों का, कंप्यूटर हमेशा सबसे पहले main() फंक्शन की पहली लाइन से ही चलना शुरू करता है। 'int' का मतलब है कि यह फंक्शन अंत में एक पूर्णांक संख्या वापस करेगा।
- '{ और }': मझले कोष्ठक (Curly Braces) प्रोग्राम की सीमाएं तय करते हैं। जो कुछ भी इन दोनों के बीच लिखा होगा, वही main फंक्शन का हिस्सा माना जाएगा।
- 'printf("...");': printf का मतलब है "Print Formatted"। यह डबल कोट्स (" ") के भीतर लिखे गए किसी भी संदेश को कंप्यूटर की स्क्रीन पर छाप देता है।
- '\\n': इसे एस्केप सीक्वेंस (Newline) कहते हैं। यह कीबोर्ड के 'Enter' बटन की तरह कर्सर को अगली नई लाइन पर भेज देता है।
- सेमीकोलन (;): जैसे हिन्दी में वाक्य खत्म होने पर पूर्ण विराम (।) लगाते हैं, वैसे ही C भाषा में हर निर्देश के अंत में सेमीकोलन (;) लगाना अनिवार्य है। इसे भूलने पर कम्पाइलर तुरंत एरर दे देता है।
- 'return 0;': यह ऑपरेटिंग सिस्टम को संकेत देता है कि "हमारा प्रोग्राम बिना किसी खराबी के बिल्कुल सही पूरा हो गया है।"

४. बच्चों के लिए दैनिक जीवन का मजेदार उदाहरण:
कल्पना कीजिए कि main() आपके घर का मुख्य दरवाजा है। घर में चाहे जितने भी कमरे हों, कोई भी मेहमान सबसे पहले मुख्य दरवाजे से ही प्रवेश करेगा। और #include <stdio.h> आपके स्कूल बैग की तरह है, जिसमें पेंसिल और कॉपी रखी होती है ताकि आप कक्षा में लिख सकें!`,
    realLifeAnalogy: {
      en: 'Think of "main()" as the main front door of your house. No matter how many rooms you have inside, every visitor must always enter through the front door first.',
      hi: 'कल्पना कीजिए कि main() आपके घर का मुख्य प्रवेश द्वार है। घर में चाहे जितने भी कमरे हों, किसी भी मेहमान का प्रवेश हमेशा मुख्य द्वार से ही होगा!'
    },
    codeExamples: [
      {
        title: 'Hello World in C',
        titleHindi: 'C में पहला Hello World प्रोग्राम',
        code: `#include <stdio.h>

int main() {
    // स्क्रीन पर नमस्ते संदेश प्रिंट करें
    printf("Namaste, World! Welcome to C-Guru.\\n");
    printf("Dennis Ritchie would be proud of you!\\n");
    return 0;
}`,
        output: `Namaste, World! Welcome to C-Guru.
Dennis Ritchie would be proud of you!`,
        explanation: 'printf() outputs text between double quotes. \\n adds a newline at the end.',
        explanationHindi: 'printf() डबल कोट्स के भीतर लिखे टेक्स्ट को स्क्रीन पर दिखाता है। \\n नई पंक्ति (Enter) का काम करता है।'
      }
    ],
    keyPoints: {
      en: [
        'C is case-sensitive: "main" is valid, but "Main" will cause a compilation error.',
        'Always end statements with a semicolon (;).',
        '#include <stdio.h> gives access to standard input/output functions.'
      ],
      hi: [
        'C भाषा केस-सेंसिटिव है: "main" छोटे अक्षरों में ही लिखा जाएगा, "Main" लिखने पर कम्पाइलर त्रुटि देगा।',
        'प्रत्येक स्टेटमेंट के अंत में सेमीकोलन (;) लगाना अनिवार्य है।',
        '#include <stdio.h> से स्क्रीन पर आउटपुट दिखाने और इनपुट लेने की क्षमता मिलती है।'
      ]
    },
    commonPitfalls: {
      en: ['Forgetting the semicolon at the end of printf.', 'Typing <stdio> instead of <stdio.h>.'],
      hi: ['printf के अंत में सेमीकोलन (;) लगाना भूल जाना।', '<stdio.h> की जगह गलती से <studio.h> लिख देना।']
    },
    quiz: [
      {
        id: 'q1-1',
        difficulty: 'easy',
        question: 'Who developed the C programming language?',
        questionHindi: 'C प्रोग्रामिंग भाषा का विकास किसने किया था?',
        options: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Ken Thompson'],
        correctIndex: 1,
        explanation: 'Dennis Ritchie developed C in 1972 at Bell Labs.',
        explanationHindi: 'डेनिस रिची ने 1972 में बेल लैब्स में C भाषा का विकास किया था।'
      }
    ]
  },
  {
    id: 'variables-datatypes',
    order: 2,
    title: 'Variables, Constants & Data Types',
    titleHindi: 'वेरिएबल्स, कॉन्स्टेंट्स एवं डेटा प्रकार (RAM Memory Storage)',
    category: 'Basics',
    summary: 'Master how data is stored in memory. Understand int, float, char, format specifiers (%d, %f, %c), and naming conventions.',
    summaryHindi: 'मेमोरी (RAM) में डेटा संग्रहण के नियम समझें: int, float, char, फॉर्मेट विनिर्देशक और नेमिंग रूल्स।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS A VARIABLE IN SIMPLE WORDS?
When you play a video game, the computer needs to remember your score, your player name, and how many lives you have left. Where does the computer store this changing information? Inside its temporary memory, called RAM (Random Access Memory)!
A VARIABLE is simply a named storage box inside the computer's RAM that holds a piece of information which can change (vary) while your program runs.

2. HOW DOES COMPUTER MEMORY (RAM) WORK?
Imagine RAM as a giant post office containing millions of tiny numbered mailboxes. Each mailbox has a hexadecimal address (like 0x7ffd10). Humans cannot memorize numbers like 0x7ffd10, so C allows us to give that mailbox a friendly label, such as "score" or "age".
When you write:
int score = 100;
The compiler reserves 4 bytes of RAM, labels that spot "score", and places the binary number 100 inside!

3. THE 4 FUNDAMENTAL DATA TYPES IN C:
Different items require different types of storage containers:
- int (Integer): Used for whole numbers without any decimal point (e.g., 5, 25, -50, 1000). On modern systems, it occupies 4 bytes (32 bits) of RAM and can store values from -2,147,483,648 to +2,147,483,647. Format specifier: %d
- float (Floating Point): Used for numbers with decimal fractions (e.g., 3.14, 98.6, -0.05). It occupies 4 bytes of memory and gives about 6 to 7 digits of decimal precision. Format specifier: %f
- double (Double Precision Float): Used when you need ultra-precise decimal calculations (e.g., scientific calculations, GPS coordinates, astronomy). It occupies 8 bytes (64 bits) of RAM and gives 15 digits of precision. Format specifier: %lf
- char (Character): Used to store a single letter, digit, or symbol enclosed inside single quotes (e.g., 'A', 'z', '9', '$'). Internally, the computer does not store the letter itself; it stores its numeric ASCII integer code (e.g., 'A' is stored as 65). It takes exactly 1 byte (8 bits) of memory. Format specifier: %c

4. VARIABLE NAMING RULES (HOW TO NAME YOUR BOXES):
- Can use letters (A-Z, a-z), digits (0-9), and underscores (_).
- MUST NOT begin with a digit! 'score1' is valid, but '1score' is illegal.
- Cannot be a reserved C keyword (you cannot name a variable 'int', 'return', or 'while').
- C is case-sensitive: 'age', 'Age', and 'AGE' are three completely distinct variables.

5. WHAT ARE CONSTANTS (const)?
If you have a value that should NEVER be altered anywhere in your program (such as the value of PI = 3.14159 or number of months = 12), place the 'const' keyword in front:
const float PI = 3.14159f;
If any line of code attempts to change PI, the compiler will protect your program and raise a compile-time error.`,
    explanationHi: `१. सरल शब्दों में वेरिएबल (Variable) क्या है?
जब आप कोई वीडियो गेम खेलते हैं, तो कंप्यूटर को याद रखना पड़ता है कि आपका स्कोर कितना है, आपके पास कितनी लाइफ बची हैं, और आपका नाम क्या है। कंप्यूटर यह बदलती हुई जानकारी कहाँ रखता है? अपनी याददाश्त यानी RAM (मेमोरी) में!
वेरिएबल (चर) कंप्यूटर की मेमोरी (RAM) में बना हुआ एक ऐसा नाम वाला डिब्बा (कंटेनर) होता है, जिसमें हम कोई जानकारी सुरक्षित रखते हैं और जरूरत पड़ने पर उसका मान (Value) बदल भी सकते हैं।

२. कंप्यूटर की मेमोरी (RAM) कैसे काम करती है?
कल्पना कीजिए कि कंप्यूटर की RAM एक बहुत बड़ी अलमारी है जिसमें लाखों छोटे-छोटे लॉकर बने हुए हैं। हर लॉकर का एक अजीब सा नंबर (मेमोरी एड्रेस) होता है, जैसे 0x7ffd20। इंसान इतने कठिन पते याद नहीं रख सकते। इसलिए C भाषा हमें उस लॉकर पर एक प्यारा सा नाम चिपकाने की सुविधा देती है, जैसे "age" या "score"।
जब आप लिखते हैं:
int age = 21;
तो कंप्यूटर RAM में 4 बाइट्स की जगह घेरता है, उस पर "age" का लेबल लगाता है, और उसके अंदर 21 रख देता है!

३. C भाषा के ४ मुख्य डेटा प्रकार (Data Types):
जैसे रसोई में दूध रखने के लिए बर्तन, चीनी के लिए डिब्बा और मसाले के लिए छोटी शीशी चाहिए, वैसे ही अलग-अलग डेटा के लिए अलग-अलग डेटा प्रकार होते हैं:
- int (पूर्णांक संख्या): बिना दशमलव वाली पूरी संख्याएं (जैसे 10, 50, -20)। यह मेमोरी में 4 बाइट्स (32 बिट्स) स्थान लेता है। इसका फॉर्मेट विनिर्देशक %d होता है।
- float (दशमलव संख्या): दशमलव बिंदु वाली संख्याएं (जैसे 98.6, 3.14, 45.50)। यह मेमोरी में 4 बाइट्स लेता है। इसका फॉर्मेट विनिर्देशक %f होता है।
- double (बड़ी दशमलव संख्या): अधिक सटीक और लंबी दशमलव संख्याएं। यह 8 बाइट्स लेता है। इसका फॉर्मेट विनिर्देशक %lf होता है।
- char (अक्षर / कैरेक्टर): कोई एक अकेला अक्षर, चिह्न या अंक जिसे सिंगल कोट्स (' ') में लिखा जाए (जैसे 'A', 'z', '@', '5')। कंप्यूटर इसे ASCII कोड के रूप में संचित करता है (जैसे 'A' का ASCII कोड 65 है)। यह मेमोरी में केवल 1 बाइट लेता है। इसका फॉर्मेट विनिर्देशक %c होता है।

४. वेरिएबल का नाम रखने के नियम (Naming Rules):
- नाम में केवल अक्षर (A-Z, a-z), संख्याएं (0-9) और अंडरस्कोर (_) आ सकते हैं।
- नाम का पहला अक्षर कभी भी संख्या (अंक) नहीं हो सकता! 'num1' सही है, लेकिन '1num' गलत है।
- C भाषा के आरक्षित कीवर्ड्स (जैसे int, float, return, if) का उपयोग नाम के लिए नहीं किया जा सकता।
- C केस-सेंसिटिव है: 'total', 'Total' और 'TOTAL' तीन अलग-अलग डिब्बे माने जाएंगे।

५. स्थिरांक यानी Constant (const) क्या है?
यदि आप चाहते हैं कि किसी मान को प्रोग्राम में कोई भी गलती से न बदल सके (जैसे साल के 12 महीने या गणित में PI = 3.14), तो उसके आगे 'const' लगा दें:
const float PI = 3.14f;
यदि कोड में कोई इसे बदलने की कोशिश करेगा, तो कम्पाइलर तुरंत रोक देगा।`,
    realLifeAnalogy: {
      en: 'Think of variables as labelled jars in a kitchen. The "Sugar" jar holds sugar (int), the "Milk" jar holds liquid (float), and a spice pouch holds a single pinch (char).',
      hi: 'रसोईघर के डिब्बों की कल्पना करें: चीनी का डिब्बा (int), दूध का बर्तन (float), और मसाले की छोटी डिब्बी (char)। प्रत्येक डिब्बे का अपना आकार और उद्देश्य होता है!'
    },
    codeExamples: [
      {
        title: 'Variables and Format Specifiers',
        titleHindi: 'वेरिएबल्स और फॉर्मेट विनिर्देशक',
        code: `#include <stdio.h>

int main() {
    int age = 21;
    float marks = 89.75f;
    char grade = 'A';

    printf("आयु (Age): %d वर्ष\\n", age);
    printf("प्रतिशत (Percentage): %.2f%%\\n", marks);
    printf("ग्रेड (Grade): %c\\n", grade);

    return 0;
}`,
        output: `आयु (Age): 21 वर्ष
प्रतिशत (Percentage): 89.75%
ग्रेड (Grade): A`,
        explanation: '%d replaces age, %.2f formats float to 2 decimal places, and %c prints a single character.',
        explanationHindi: '%d पूर्णांक मान दिखाता है, %.2f दशमलव के 2 अंकों तक दिखाता है, और %c कैरेक्टर प्रिंट करता है।'
      }
    ],
    keyPoints: {
      en: [
        'Each data type occupies a specific number of bytes in memory.',
        'Use %.2f to print float values rounded to 2 decimal places.',
        'Single quotes are for char (\'A\'), double quotes are for strings ("Hello").'
      ],
      hi: [
        'प्रत्येक डेटा प्रकार मेमोरी में निश्चित बाइट्स स्थान लेता है।',
        'दशमलव के दो अंकों तक प्रिंट करने के लिए %.2f का उपयोग करें।',
        'कैरेक्टर के लिए सिंगल कोट्स (\'A\') और शब्दों के लिए डबल कोट्स ("नमस्ते") लगाएं।'
      ]
    },
    commonPitfalls: {
      en: ['Using %d for a float variable will print garbage values.', 'Declaring variables with numbers at the start.'],
      hi: ['फ्लोट वेरिएबल के लिए %d लगा देना जिससे अमान्य (Garbage) मान आता है।', 'वेरिएबल का नाम 2score या 1num जैसे अंक से प्रारंभ करना।']
    },
    quiz: [
      {
        id: 'q2-1',
        difficulty: 'easy',
        question: 'Which of the following is an INVALID variable name in C?',
        questionHindi: 'C भाषा में निम्नलिखित में से कौन-सा वेरिएबल नाम अमान्य (INVALID) है?',
        options: ['_totalScore', 'total_score', '2nd_score', 'score2'],
        correctIndex: 2,
        explanation: 'Variables cannot begin with a number (2nd_score is invalid).',
        explanationHindi: 'वेरिएबल का नाम किसी अंक से प्रारंभ नहीं हो सकता।'
      }
    ]
  },
  {
    id: 'operators',
    order: 3,
    title: 'Operators & Expressions',
    titleHindi: 'ऑपरेटर्स एवं व्यंजक (Operators & Calculations)',
    category: 'Basics',
    summary: 'Master arithmetic, relational, logical, assignment, bitwise, and ternary operators with precedence rules.',
    summaryHindi: 'अंकगणितीय (+ - * / %), संबंधपरक (== !=), तार्किक (&& || !), इंक्रीमेंट/डिक्रीमेंट और टर्नरी ऑपरेटर्स का गहन अध्ययन।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT ARE OPERATORS IN SIMPLE WORDS?
In mathematics, when you see 5 + 3 = 8, the plus sign (+) tells you what action to perform on the numbers 5 and 3. In programming, OPERATORS are special symbols that instruct the computer's CPU to carry out specific arithmetic, relational, or logical operations on data items (called operands).

2. THE 5 MAJOR CATEGORIES OF OPERATORS IN C:
- Arithmetic Operators (Math work):
  + (Addition): Adds two values (10 + 5 = 15).
  - (Subtraction): Subtracts right operand from left (10 - 5 = 5).
  * (Multiplication): Multiplies numbers (10 * 5 = 50).
  / (Division): Divides numerator by denominator. CAUTION: In C, if both numbers are integers, integer division truncates the decimal (10 / 4 = 2, NOT 2.5!). To get 2.5, at least one number must be a float (10.0f / 4 = 2.5f).
  % (Modulus / Remainder): Gives the integer remainder left over after division. For example, 10 % 3 = 1 (because 3 * 3 = 9, remainder is 1). Modulus ONLY works with integers!

- Relational Operators (Comparisons):
  These compare two values and return 1 if TRUE and 0 if FALSE.
  == (Equal to): Checks if both sides are equal (5 == 5 is 1).
  != (Not equal to): Checks if sides are different (5 != 3 is 1).
  > (Greater than) and < (Less than).
  >= (Greater than or equal) and <= (Less than or equal).

- Logical Operators (Connecting multiple conditions):
  && (Logical AND): Evaluates to TRUE ONLY IF ALL conditions are true. (Age >= 18 && HasVoterID == 1).
  || (Logical OR): Evaluates to TRUE if AT LEAST ONE condition is true. (Day == Saturday || Day == Sunday).
  ! (Logical NOT): Flips the truth value. If something is TRUE, ! makes it FALSE; if FALSE, ! makes it TRUE.

- Increment & Decrement Operators (++ and --):
  x++ (Post-increment): Uses the current value first in the expression, then adds 1 to x.
  ++x (Pre-increment): Adds 1 to x first, then uses the updated value.

- Ternary (Conditional) Operator (? :):
  This is a compact, one-line replacement for an if-else statement:
  (condition) ? (value_if_true) : (value_if_false);
  Example: (marks >= 40) ? printf("Pass") : printf("Fail");

3. OPERATOR PRECEDENCE (BODMAS FOR C):
Just like in school math where multiplication comes before addition, C follows strict Operator Precedence rules:
1st: Parentheses ( ) have the highest priority.
2nd: Multiplicative (* / %)
3rd: Additive (+ -)
4th: Relational (< <= > >=)
5th: Equality (== !=)
6th: Logical AND (&&) then OR (||)
7th: Assignment (=)`,
    explanationHi: `१. सरल शब्दों में ऑपरेटर क्या होते हैं?
गणित में जब आप 10 + 5 देखते हैं, तो जोड़ का चिह्न (+) कंप्यूटर को बताता है कि इन दोनों संख्याओं को आपस में मिलाना है। C भाषा में ऑपरेटर (Operator) वे विशेष चिह्न होते हैं जो कंप्यूटर के सीपीयू को संख्याओं या डेटा पर गणितीय गणना, तुलना या तार्किक निर्णय लेने का आदेश देते हैं।

२. C भाषा के मुख्य ५ प्रकार के ऑपरेटर्स:
- अंकगणितीय ऑपरेटर्स (Arithmetic Operators):
  + (जोड़): दो मानों को जोड़ता है (10 + 5 = 15)।
  - (घटाव): बड़ी संख्या से छोटी संख्या घटाता है (10 - 5 = 5)।
  * (गुणा): आपस में गुणा करता है (10 * 5 = 50)।
  / (भाग): विभाजन करता है। ध्यान रहे: यदि दोनों संख्याएं पूर्णांक (int) हैं, तो उत्तर का दशमलव हिस्सा कट जाता है (10 / 4 का उत्तर 2.5 नहीं बल्कि 2 आएगा)। दशमलव मान पाने के लिए कम से कम एक संख्या float होनी चाहिए (10.0 / 4 = 2.5)।
  % (मॉड्यूलो यानी शेषफल): भाग देने के बाद जो बाकी बचता है (शेषफल), यह वह मान निकालता है। जैसे 10 % 3 का उत्तर 1 होगा (क्योंकि 3 × 3 = 9 और 1 शेष बचा)। शेषफल ऑपरेटर केवल पूर्णांकों (int) पर कार्य करता है!

- संबंधपरक ऑपरेटर्स (तुलना करने वाले Relational Operators):
  ये दो मानों की तुलना करते हैं और सत्य होने पर 1 तथा असत्य होने पर 0 देते हैं:
  == (समानता जांच): क्या दोनों बराबर हैं? (5 == 5 सत्य यानी 1 है)।
  != (असमानता जांच): क्या दोनों अलग हैं? (5 != 3 सत्य यानी 1 है)।
  > (बड़ा है) और < (छोटा है)।
  >= (बड़ा या बराबर) और <= (छोटा या बराबर)।

- तार्किक ऑपरेटर्स (शर्तें जोड़ने वाले Logical Operators):
  && (तार्किक AND): जब दोनों शर्तें एक साथ सच होंगी, तभी सत्य मानेगा। (जैसे: उम्र >= 18 && वोटर_कार्ड == 1)।
  || (तार्किक OR): यदि कोई एक शर्त भी सच हो जाए, तो सत्य मानेगा। (जैसे: आज_शनिवार || आज_रविवार)।
  ! (तार्किक NOT): यह परिणाम को उल्टा कर देता है; सच को झूठ और झूठ को सच बना देता है।

- इंक्रीमेंट और डिक्रीमेंट (++ और --):
  x++ (पोस्ट-इंक्रीमेंट): पहले पुरानी वैल्यू का उपयोग करो, फिर 1 बढ़ाओ।
  ++x (प्री-इंक्रीमेंट): पहले 1 बढ़ाओ, फिर नए मान का उपयोग करो।

- टर्नरी ऑपरेटर (? :):
  यह छोटे if-else का जादुई एक-लाइन शॉर्टकट है:
  (शर्त) ? (सत्य होने पर यह) : (असत्य होने पर यह);
  उदाहरण: (marks >= 40) ? printf("पास") : printf("फेल");`,
    realLifeAnalogy: {
      en: 'Think of && like needing BOTH your ID and ticket to board a flight. Think of || like showing EITHER Aadhaar OR Passport to verify your identity.',
      hi: '&& का अर्थ है हवाई जहाज में बैठने के लिए टिकट और पहचान पत्र दोनों अनिवार्य हैं। || का अर्थ है पहचान के लिए आधार कार्ड या पासपोर्ट में से कोई एक पर्याप्त है।'
    },
    codeExamples: [
      {
        title: 'Ternary & Modulo in Action',
        titleHindi: 'शेषफल और टर्नरी ऑपरेटर का उदाहरण',
        code: `#include <stdio.h>

int main() {
    int num = 17;

    // टर्नरी ऑपरेटर से सम/विषम जांच
    (num % 2 == 0) ? printf("%d सम (Even) है\\n", num) : printf("%d विषम (Odd) है\\n", num);

    int a = 5;
    printf("Post-increment: %d\\n", a++); // 5 प्रिंट करेगा, फिर 6 होगा
    printf("New value: %d\\n", a);         // 6 प्रिंट करेगा
    return 0;
}`,
        output: `17 विषम (Odd) है
Post-increment: 5
New value: 6`,
        explanation: 'num % 2 returns 1, so the false branch prints Odd.',
        explanationHindi: '17 % 2 का शेषफल 1 आया, इसलिए टर्नरी ऑपरेटर ने विषम प्रिंट किया।'
      }
    ],
    keyPoints: {
      en: [
        'Modulus operator (%) CANNOT be applied to float or double values in C.',
        'Single equal (=) is assignment, double equal (==) is comparison.',
        'In C, any non-zero value is treated as TRUE; 0 is treated as FALSE.'
      ],
      hi: [
        'शेषफल ऑपरेटर (%) दशमलव (float/double) पर लागू नहीं किया जा सकता।',
        'एकल बराबर (=) मान सौंपता है, दोहरा बराबर (==) समानता की जांच करता है।',
        'C में शून्य (0) असत्य होता है और शून्य के अलावा कोई भी संख्या सत्य मानी जाती है।'
      ]
    },
    commonPitfalls: {
      en: ['Writing if (x = 5) instead of if (x == 5).', 'Integer division: 5 / 2 yields 2, not 2.5.'],
      hi: ['if (x == 5) की जगह if (x = 5) लिख देना जिससे शर्त हमेशा सत्य हो जाती है।', 'पूर्णांक विभाजन: 5 / 2 का उत्तर 2.5 नहीं बल्कि 2 आएगा।']
    },
    quiz: [
      {
        id: 'q3-1',
        difficulty: 'easy',
        question: 'What is the result of expression 19 % 4 in C?',
        questionHindi: 'C में 19 % 4 का मान क्या होगा?',
        options: ['4', '4.75', '3', '1'],
        correctIndex: 2,
        explanation: '19 divided by 4 leaves a remainder of 3.',
        explanationHindi: '19 को 4 से भाग देने पर शेषफल 3 बचता है।'
      }
    ]
  },
  {
    id: 'control-statements',
    order: 4,
    title: 'Conditional Statements (if, else, switch)',
    titleHindi: 'कंडीशनल स्टेटमेंट्स (if, else, switch-case से निर्णय लेना)',
    category: 'Control Flow',
    summary: 'Direct the flow of your program. Learn simple if, if-else, ladder, nested if, and switch-case with fallthrough control.',
    summaryHindi: 'प्रोग्राम में निर्णय लेना सीखें: साधारण if, if-else, else-if सीढ़ी और switch-case break के साथ।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS DECISION MAKING IN PROGRAMMING?
In real life, we make decisions constantly: "If it rains, I will carry an umbrella; otherwise, I will wear sunglasses." A program without decision-making abilities would be robotic and dull, executing the exact same lines from top to bottom every single time. 
CONDITIONAL STATEMENTS allow a program to test conditions and branch off to execute different blocks of code depending on whether those conditions evaluate to TRUE or FALSE.

2. THE 4 TYPES OF CONDITIONAL STRUCTURES IN C:
- Simple if statement:
  Executes the code block ONLY IF the condition is true. If the condition is false, the program simply skips the block and moves on.
  Syntax: if (age >= 18) { printf("Eligible to Vote"); }

- if-else statement:
  Provides a fork in the road: executes Block A if the condition is true, or executes Block B if the condition is false.
  Syntax: if (score >= 50) { printf("Passed"); } else { printf("Failed"); }

- else-if ladder (Multiple conditions):
  Used when you have a sequence of multiple mutually exclusive conditions. The computer evaluates each condition from top to bottom; as soon as one condition evaluates to true, its block executes and the rest of the entire ladder is skipped!
  Syntax:
  if (marks >= 90) { printf("Grade A"); }
  else if (marks >= 75) { printf("Grade B"); }
  else if (marks >= 60) { printf("Grade C"); }
  else { printf("Fail"); }

- Nested if statements:
  An if statement placed entirely inside another if statement. The inner check only happens if the outer check passed first (e.g., Check if username is correct -> if true, check if password is correct).

- switch-case statement (Menu Selection):
  Best when you have a single variable and you want to test it against multiple exact constant values. It is cleaner and faster than a 10-level else-if ladder.
  CRITICAL RULE: Always put a 'break;' statement at the end of every case! Without break, execution will fall through and run all subsequent cases regardless of their value! The 'default:' block acts like an 'else' if none of the cases matched.`,
    explanationHi: `१. प्रोग्रामिंग में निर्णय लेने (Decision Making) का क्या अर्थ है?
वास्तविक जीवन में हम हर पल फैसले लेते हैं: "यदि आज बारिश होगी, तो मैं छाता लेकर स्कूल जाऊंगा, अन्यथा धूप का चश्मा पहनूंगा।" यदि कंप्यूटर में फैसले लेने की ताकत न हो, तो वह हमेशा ऊपर से नीचे तक एक ही जैसा कोड चलाता रहेगा। 
कंडीशनल स्टेटमेंट्स (शर्त वाले निर्देश) कंप्यूटर को यह सोचने और तय करने की क्षमता देते हैं कि कौन-सा काम कब करना है और कब छोड़ना है!

२. C भाषा में कंडीशनल स्टेटमेंट्स के ४ मुख्य प्रकार:
- साधारण if स्टेटमेंट:
  यह केवल तभी काम करता है जब दी गई शर्त पूरी तरह सच (True) हो। यदि शर्त गलत है, तो कंप्यूटर भीतर के कोड को छोड़कर आगे बढ़ जाता है।
  उदाहरण: if (उम्र >= 18) { printf("आप वोट डाल सकते हैं"); }

- if-else स्टेटमेंट (दोराहा):
  यह सड़क के दोराहे की तरह है: यदि शर्त सच है तो पहला रास्ता (if ब्लॉक) चुनो, और यदि शर्त गलत है तो दूसरा रास्ता (else ब्लॉक) चुनो।
  उदाहरण: if (अंक >= 40) { printf("पास"); } else { printf("फेल"); }

- else-if सीढ़ी (कई शर्तों की जांच):
  जब हमारे पास 3 या उससे अधिक विकल्प हों (जैसे स्कूल के परीक्षा परिणाम में ग्रेड्स तय करना):
  if (अंक >= 90) { printf("ग्रेड A"); }
  else if (अंक >= 75) { printf("ग्रेड B"); }
  else if (अंक >= 50) { printf("ग्रेड C"); }
  else { printf("कड़ी मेहनत करें!"); }
  कंप्यूटर ऊपर से नीचे तक जांचता है; जो शर्त सबसे पहले सच मिलती है, उसे चलाकर सीढ़ी से बाहर आ जाता है।

- switch-case स्टेटमेंट (मेनू चुनने वाला सिस्टम):
  जब आपके पास एक ही वेरिएबल हो और उसके कई निश्चित उत्तर हो सकते हों (जैसे होटल का मेनू: 1 फॉर पिज़्ज़ा, 2 फॉर बर्गर, 3 फॉर डोसा)।
  सबसे जरूरी नियम: प्रत्येक case के बाद 'break;' लगाना कभी मत भूलें! यदि आप break नहीं लगाएंगे, तो कंप्यूटर नीचे के सभी केस को भी बिना सोचे चला देगा (इसे Fall-through कहते हैं)। 'default:' तब चलता है जब कोई भी विकल्प मैच न करे।`,
    realLifeAnalogy: {
      en: 'Think of an ATM menu: Press 1 for Cash Withdrawal, Press 2 for Balance Enquiry, Press 3 for Mini Statement. That is exactly what a switch-case does!',
      hi: 'एटीएम मशीन के मेनू की कल्पना करें: नकदी निकासी के लिए 1 दबाएं, बैलेंस देखने के लिए 2 दबाएं। यही सटीक switch-case का कार्य है!'
    },
    codeExamples: [
      {
        title: 'Switch-Case Calculator',
        titleHindi: 'Switch-Case से कैलकुलेटर मेनू',
        code: `#include <stdio.h>

int main() {
    char op = '+';
    int a = 20, b = 10;

    switch (op) {
        case '+':
            printf("योग (Sum): %d + %d = %d\\n", a, b, a + b);
            break;
        case '-':
            printf("अंतर (Difference): %d - %d = %d\\n", a, b, a - b);
            break;
        default:
            printf("अमान्य ऑपरेटर!\\n");
    }

    return 0;
}`,
        output: `योग (Sum): 20 + 10 = 30`,
        explanation: 'op is +, case + runs and break exits cleanly.',
        explanationHindi: 'op का मान + था, अतः case + चला और break ने switch से बाहर निकाल दिया।'
      }
    ],
    keyPoints: {
      en: [
        'Switch expression must evaluate to an integer or character (floats are not allowed).',
        'Forget the break statement, and all subsequent cases execute (fall-through).'
      ],
      hi: [
        'Switch में केवल पूर्णांक (int) या कैरेक्टर (char) ही मान्य हैं, दशमलव संख्याएं अमान्य हैं।',
        'Break न लगाने पर नीचे के सभी केस बिना जांचे चल जाएंगे (Fall-through)।'
      ]
    },
    commonPitfalls: {
      en: ['Using float in switch.', 'Missing break statement.'],
      hi: ['Switch में float का उपयोग करना।', 'Case के बाद break लगाना भूल जाना।']
    },
    quiz: [
      {
        id: 'q4-1',
        difficulty: 'easy',
        question: 'Which data type cannot be used in a switch statement in C?',
        questionHindi: 'C के switch स्टेटमेंट में किस डेटा टाइप का उपयोग नहीं किया जा सकता?',
        options: ['int', 'char', 'float', 'short'],
        correctIndex: 2,
        explanation: 'Floats are prohibited in C switch statements.',
        explanationHindi: 'C के switch में दशमलव (float/double) का उपयोग वर्जित है।'
      }
    ]
  },
  {
    id: 'loops-iteration',
    order: 5,
    title: 'Loops & Iterations (for, while, do-while)',
    titleHindi: 'लूप्स एवं पुनरावृत्ति (Loops: for, while, do-while)',
    category: 'Control Flow',
    summary: 'Automate repetitive tasks. Compare entry-controlled (for, while) vs exit-controlled (do-while) loops, break, and continue.',
    summaryHindi: 'पुनरावृत्ति वाले कार्यों का स्वचालन: for, while, do-while लूप्स, break और continue की संपूर्ण समझ।',
    readTimeMinutes: 10,
    explanationEn: `1. WHY DO WE NEED LOOPS IN PROGRAMMING?
Suppose your teacher asks you to write "I will practice C coding every day" 1,000 times in your notebook. Writing it by hand would take hours and exhaust your hand. In computer science, whenever we need to repeat an action multiple times, we use LOOPS!
A loop executes a block of statements repeatedly as long as a specified condition remains TRUE. Once the condition turns FALSE, the loop automatically stops.

2. THE 3 TYPES OF LOOPS IN C:
- for Loop (Entry-Controlled):
  Best when you know in advance EXACTLY how many times the loop should run (e.g., print numbers from 1 to 100).
  Syntax structure: for (initialization; condition; increment/decrement) { ... }
  - Initialization: Sets the starting counter (int i = 1;). Runs only once at the beginning.
  - Condition: Checked before every lap (i <= 100;). If true, body runs; if false, loop exits.
  - Increment/Decrement: Updates counter after each lap (i++;).

- while Loop (Entry-Controlled):
  Best when the number of iterations is NOT known beforehand and depends on an external condition (e.g., keep running a game while player lives > 0).
  Syntax: while (condition) { // code; counter update; }
  CAUTION: You must remember to update the variable inside the while loop body, otherwise the condition will stay true forever and your program will freeze in an Infinite Loop!

- do-while Loop (Exit-Controlled):
  This is the only loop that checks its condition at the very BOTTOM!
  Because the condition is tested at the end, the loop body is GUARANTEED TO RUN AT LEAST ONCE, even if the condition was completely false right from the start!
  Syntax: do { ... } while (condition); (Notice the mandatory semicolon at the end!).

3. LOOP CONTROL KEYWORDS:
- break: Acts as an emergency brake. It instantly terminates the innermost loop and jumps straight out.
- continue: Does not stop the loop; it merely skips the rest of the current iteration and jumps directly to the next lap!`,
    explanationHi: `१. हमें प्रोग्रामिंग में लूप्स (Loops) की आवश्यकता क्यों होती है?
कल्पना कीजिए कि स्कूल में शिक्षक आपसे कहें कि अपनी कॉपी में १०० बार "मैं रोज कंप्यूटर कोडिंग का अभ्यास करूँगा" लिखो। हाथ से १०० बार लिखने में आपकी उंगलियां दुखने लगेंगी। लेकिन कंप्यूटर कभी थकता नहीं है!
प्रोग्रामिंग में जब हमें किसी एक ही काम को बार-बार दोहराना हो (जैसे १ से १००० तक गिनती प्रिंट करना), तो हम लूप्स (Loops) का उपयोग करते हैं। लूप तब तक काम दोहराता रहता है जब तक कि दी गई शर्त सच रहती है। जैसे ही शर्त गलत होती है, लूप अपने आप रुक जाता है।

२. C भाषा के ३ मुख्य लूप्स:
- for लूप (प्रवेश-नियंत्रित Entry-Controlled):
  यह लूप तब सबसे अच्छा होता है जब हमें पहले से पता हो कि चक्र कितनी बार घूमना चाहिए (जैसे ठीक १० बार या ५० बार)।
  इसकी बनावट में ३ हिस्से होते हैं:
  for (शुरुआत; शर्त; बढ़ोत्तरी) { कोड }
  - शुरुआत (int i = 1): काउंटर कहाँ से शुरू होगा। यह सिर्फ एक बार चलता है।
  - शर्त (i <= 10): क्या अभी चक्कर जारी रखना है?
  - बढ़ोत्तरी (i++): हर चक्कर के बाद i का मान १ बढ़ा दो।

- while लूप (प्रवेश-नियंत्रित):
  जब हमें पहले से यह न पता हो कि काम कितनी बार दोहराना पड़ेगा (जैसे: जब तक खिलाड़ी की लाइफ > 0 है, तब तक गेम चलाते रहो)।
  यह पहले दरवाजे पर शर्त जांचता है, फिर अंदर जाने देता है।
  सावधानी: लूप के अंदर काउंटर को बढ़ाना कभी न भूलें, अन्यथा कंप्यूटर अनंत लूप (Infinite Loop) में फंस जाएगा और हैंग हो जाएगा!

- do-while लूप (निकास-नियंत्रित Exit-Controlled):
  यह अकेला ऐसा लूप है जो शर्त सबसे अंत में जांचता है!
  इसका मतलब यह है कि चाहे शर्त पहले ही चक्कर में गलत क्यों न हो, do-while लूप कम से कम एक बार जरूर चलेगा ही चलेगा!
  विशेष नियम: do-while के अंत में सेमीकोलन (;) लगाना अनिवार्य होता है: while(शर्त);

३. लूप के दो जादुई कीवर्ड्स:
- break (इमरजेंसी ब्रेक): यह लूप को तुरंत तोड़कर बाहर फेंक देता है।
- continue (छलांग): यह पूरे लूप को नहीं रोकता, बल्कि सिर्फ उस एक चक्कर के बचे हुए कोड को छोड़कर सीधे अगले चक्कर पर कूद जाता है!`,
    realLifeAnalogy: {
      en: 'A while loop is like a security guard checking tickets at the gate. A do-while loop is like trying a free sweet sample at a sweet shop: you taste once first, then decide whether to continue.',
      hi: 'while लूप सिनेमा हॉल के गार्ड की तरह है जो पहले टिकट देखता है फिर अंदर जाने देता है। do-while मिठाई की दुकान पर मुफ्त में चखने की तरह है: पहले एक बार स्वाद चखते हैं, फिर निर्णय लेते हैं!'
    },
    codeExamples: [
      {
        title: 'Comparing Loops & Continue',
        titleHindi: 'लूप और Continue का उदाहरण',
        code: `#include <stdio.h>

int main() {
    printf("1 से 10 तक सम संख्याएं:\\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) {
            continue; // विषम संख्याओं को छोड़ें
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
        output: `1 से 10 तक सम संख्याएं:
2 4 6 8 10 `,
        explanation: 'continue skips odd iterations.',
        explanationHindi: 'continue ने विषम संख्याओं को छोड़ दिया और केवल सम संख्याएं प्रिंट हुईं।'
      }
    ],
    keyPoints: {
      en: [
        'do-while is the only loop that ends with a semicolon: while(condition);',
        'break exits the loop entirely, while continue only skips the current iteration.'
      ],
      hi: [
        'do-while एकमात्र ऐसा लूप है जिसके अंत में सेमीकोलन (;) लगता है।',
        'break पूरे लूप को रोकता है, जबकि continue केवल उस एक चक्कर को छोड़ता है।'
      ]
    },
    commonPitfalls: {
      en: ['Putting a semicolon after for(): for (int i=0; i<10; i++);', 'Infinite loop caused by not updating counter.'],
      hi: ['for() के कोष्ठक के तुरंत बाद सेमीकोलन लगा देना जिससे लूप खाली हो जाता है।', 'काउंटर को बढ़ाना भूल जाना जिससे लूप अनंत (Infinite) हो जाए।']
    },
    quiz: [
      {
        id: 'q5-1',
        difficulty: 'easy',
        question: 'Which loop executes at least once even if the condition is false initially?',
        questionHindi: 'कौन-सा लूप शर्त असत्य होने पर भी कम से कम एक बार अवश्य चलता है?',
        options: ['for loop', 'while loop', 'do-while loop', 'all loops'],
        correctIndex: 2,
        explanation: 'do-while is an exit-controlled loop.',
        explanationHindi: 'do-while शर्त अंत में जांचता है, इसलिए कम से कम 1 बार अवश्य चलता है।'
      }
    ]
  },
  {
    id: 'functions',
    order: 6,
    title: 'Functions & Modular Programming',
    titleHindi: 'फंक्शंस एवं मॉड्यूलर प्रोग्रामिंग (Functions)',
    category: 'Functions & Pointers',
    summary: 'Write clean, reusable code. Learn function prototypes, arguments, return types, call-by-value vs call-by-reference.',
    summaryHindi: 'कोड को पुनः उपयोग करने योग्य और सुव्यवस्थित बनाएं: डिक्लेरेशन, डेफिनिशन, पैरामीटर्स और कॉल बाय वैल्यू।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS A FUNCTION IN SIMPLE WORDS?
Imagine a big busy restaurant. If one single person had to welcome guests, take orders, chop vegetables, cook the food, bake the bread, wash the dishes, and clean the tables, the restaurant would collapse in chaos! Instead, the restaurant divides the work among specialized experts: a Chef cooks, a Waiter serves, and a Cleaner washes.
In computer programming, a FUNCTION is a self-contained, named block of code that is designed to perform one specific task. 
Instead of writing 2,000 lines of messy code in one place, we break our program into small, clean functions. This philosophy is called MODULAR PROGRAMMING!

2. THE 3 GOLDEN BENEFITS OF FUNCTIONS:
- Reusability (DRY Principle - Don't Repeat Yourself): Write the code once, and you can call it 10,000 times from anywhere in your project!
- Easy Debugging: If the tax calculation is wrong, you only need to inspect the 'calculateTax()' function rather than reading through 5,000 lines of unrelated code.
- Team Collaboration: Different software engineers can build separate functions at the same time without interfering with each other.

3. THE 3 PHASES OF A FUNCTION IN C:
- Function Prototype / Declaration: Tells the compiler the function's name, return type, and parameters before main().
  Syntax: int add(int a, int b);
- Function Definition: The actual recipe containing the code instructions inside curly braces { }.
  Syntax: int add(int a, int b) { return a + b; }
- Function Call: Ordering the function to do its job.
  Syntax: int total = add(10, 20);

4. CALL BY VALUE EXPLAINED:
By default, C passes function arguments by VALUE. When you pass a variable into a function, the computer creates a fresh PHOTOCOPY of that variable. Any changes made to the copy inside the function do NOT affect the original variable back in main()! To modify the original variable, we must use pointers (Call by Reference).`,
    explanationHi: `१. सरल शब्दों में फंक्शन (Function) क्या है?
कल्पना कीजिए एक बड़े होटल की रसोई की। यदि एक ही व्यक्ति को दरवाजे पर स्वागत करना हो, सब्जियां काटनी हों, खाना पकाना हो, रोटियां सेंकनी हों, और बर्तन भी धोने हों, तो पूरा होटल गड़बड़ा जाएगा! समझदारी इसी में है कि काम को अलग-अलग विशेषज्ञों में बांट दिया जाए: रसोइया खाना पकाएगा, वेटर खाना परोसेगा, और हेल्पर बर्तन धोएगा।
प्रोग्रामिंग में फंक्शन (Function) कोड का एक ऐसा छोटा, सुव्यवस्थित और स्वतंत्र टुकड़ा होता है जिसे किसी एक खास काम को करने के लिए बनाया जाता है। इसे "मॉड्यूलर प्रोग्रामिंग" कहते हैं।

२. फंक्शंस के ३ सबसे बड़े फायदे:
- कोड को बार-बार नहीं लिखना पड़ता (Reusability): एक बार फंक्शन बना लो, फिर पूरे प्रोग्राम में चाहे जितनी बार उसे आवाज देकर बुलाओ!
- गलतियां ढूंढना आसान (Easy Debugging): यदि जोड़ की गणना में कोई गलती आ रही है, तो केवल जोड़ वाले फंक्शन में जाकर सुधार करो, बाकी पूरा प्रोग्राम सुरक्षित रहता है।
- साफ-सुथरा कोड: कोड देखने में सुंदर और समझने में आसान लगता है।

३. फंक्शन बनाने के ३ आवश्यक कदम:
- १. डिक्लेरेशन (प्रोटोटाइप): कम्पाइलर को पहले से बताना कि ऐसा एक फंक्शन आगे आने वाला है।
  जैसे: int add(int a, int b);
- २. डेफिनिशन (वास्तविक कोड): फंक्शन का असली काम जो मझले कोष्ठक { } में लिखा जाता है।
  जैसे: int add(int a, int b) { return a + b; }
- ३. कॉल (बुलाना): जहाँ फंक्शन की जरूरत हो, वहाँ उसका नाम लेकर बुलाना।
  जैसे: int result = add(5, 10);

४. कॉल बाय वैल्यू (Call by Value) क्या है?
C भाषा में जब आप किसी सामान्य वेरिएबल को फंक्शन में भेजते हैं, तो कंप्यूटर उसकी एक फोटोकॉपी (नकल) बनाकर भेजता है। यदि फंक्शन के अंदर उस कॉपी में कोई बदलाव किया जाए, तो main() में बैठे असली वेरिएबल पर कोई असर नहीं पड़ता! असली मान को बदलने के लिए हमें पॉइंटर्स (Call by Reference) का उपयोग करना पड़ता है।`,
    realLifeAnalogy: {
      en: 'A function is like a kitchen blender: you put fruits inside (parameters), it blends them (logic), and pours out juice (return value).',
      hi: 'फंक्शन एक जूसर मिक्सर की तरह है: आपने उसमें मौसमी डाली (पैरामीटर्स), उसने प्रोसेस किया (लॉजिक), और ताजा रस निकाल कर दे दिया (रिटर्न वैल्यू)!'
    },
    codeExamples: [
      {
        title: 'Area Calculator Function',
        titleHindi: 'क्षेत्रफल गणना फंक्शन',
        code: `#include <stdio.h>

// फंक्शन प्रोटोटाइप
int calculateArea(int width, int height);

int main() {
    int w = 5, h = 10;
    int area = calculateArea(w, h);
    printf("आयत का क्षेत्रफल: %d वर्ग इकाई\\n", area);
    return 0;
}

int calculateArea(int width, int height) {
    return width * height;
}`,
        output: `आयत का क्षेत्रफल: 50 वर्ग इकाई`,
        explanation: 'Function calculates area and returns product.',
        explanationHindi: 'calculateArea ने चौड़ाई और ऊंचाई का गुणनफल वापस लौटाया।'
      }
    ],
    keyPoints: {
      en: [
        'If a function returns nothing, declare its return type as void.',
        'C defaults to Call by Value.'
      ],
      hi: [
        'यदि फंक्शन कोई मान वापस नहीं लौटाता तो उसका प्रकार "void" रखा जाता है।',
        'C में डिफ़ॉल्ट रूप से कॉल बाय वैल्यू का उपयोग होता है।'
      ]
    },
    commonPitfalls: {
      en: ['Defining functions after main() without declaring a prototype.'],
      hi: ['main() के बाद फंक्शन लिखना और ऊपर उसका प्रोटोटाइप घोषित न करना।']
    },
    quiz: [
      {
        id: 'q6-1',
        difficulty: 'easy',
        question: 'What return type is used when a function returns no value?',
        questionHindi: 'यदि फंक्शन कोई मान वापस नहीं करता तो कौन-सा रिटर्न टाइप लिखा जाता है?',
        options: ['int', 'null', 'void', 'empty'],
        correctIndex: 2,
        explanation: 'void indicates no return value.',
        explanationHindi: 'void का अर्थ है कोई मान रिटर्न नहीं होगा।'
      }
    ]
  },
  {
    id: 'recursion',
    order: 7,
    title: 'Recursion in C',
    titleHindi: 'रिकर्शन (Recursion: जब फंक्शन खुद को कॉल करे)',
    category: 'Functions & Pointers',
    summary: 'When a function calls itself. Understand base conditions, recursive steps, stack frames, and solving Factorial and Fibonacci.',
    summaryHindi: 'फंक्शन द्वारा स्वयं को बार-बार बुलाना: बेस केस, कॉल स्टैक और फैक्टोरियल का सटीक समाधान।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS RECURSION IN SIMPLE WORDS?
Imagine standing between two parallel mirrors in a barber shop: you see an endless corridor of reflections repeating inside reflections! In computer science, RECURSION is a programming technique where a function calls ITSELF to solve a smaller version of the exact same problem.

2. THE 2 VITAL PARTS OF EVERY RECURSIVE FUNCTION:
- The Base Case (The Emergency Brake):
  This is the stopping condition that tells the function: "Stop calling yourself now!" Without a base case, the function will keep creating new calls indefinitely until the computer runs out of memory and crashes with a catastrophic STACK OVERFLOW error!
- The Recursive Step (Making the problem smaller):
  The part where the function calls itself, but with smaller input so that it steadily marches toward the base case.

3. CLASSIC EXAMPLE: FACTORIAL OF A NUMBER (5!):
In math, 5! = 5 * 4 * 3 * 2 * 1 = 120.
Notice the recursive pattern:
5! = 5 * 4!
4! = 4 * 3!
3! = 3 * 2!
2! = 2 * 1!
1! = 1 (This is our Base Case: we stop here!).
Once the base case 1 is reached, the computer multiplies on the way back up: 2 * 1 = 2 -> 3 * 2 = 6 -> 4 * 6 = 24 -> 5 * 24 = 120!`,
    explanationHi: `१. सरल शब्दों में रिकर्शन (Recursion) क्या है?
कल्पना कीजिए कि आप नाई की दुकान में दो आमने-सामने लगे शीशों के बीच खड़े हैं: आपको शीशे के अंदर शीशा, और उसके अंदर एक और शीशा अनंत तक दिखाई देता है! 
प्रोग्रामिंग में जब कोई फंक्शन किसी बड़ी समस्या को हल करने के लिए अपने ही भीतर से स्वयं को दोबारा आवाज देता है (कॉल करता है), तो इस जादुई तकनीक को रिकर्शन (Recursion) कहते हैं।

२. रिकर्शन के २ सबसे महत्वपूर्ण अंग:
- १. बेस केस (Base Case - रुकने का इमरजेंसी ब्रेक):
  यह सबसे जरूरी शर्त है जो फंक्शन को बताती है कि "बस, अब रुक जाओ!" यदि आप बेस केस नहीं लगाएंगे, तो फंक्शन अपने आप को लगातार बुलाता रहेगा और कंप्यूटर की मेमोरी भरकर प्रोग्राम स्टैक ओवरफ्लो (Stack Overflow) होकर क्रैश हो जाएगा!
- २. रिकर्सिव स्टेप (समस्या को छोटा करना):
  जहाँ फंक्शन समस्या को एक कदम छोटा करके खुद को पुनः कॉल करता है।

३. फैक्टोरियल (5!) का प्रसिद्ध उदाहरण:
गणित में 5! का मतलब होता है 5 × 4 × 3 × 2 × 1 = 120।
इसे रिकर्शन से ऐसे समझा जाता है:
5! निकालने के लिए 5 × 4! चाहिए
4! निकालने के लिए 4 × 3! चाहिए
3! निकालने के लिए 3 × 2! चाहिए
2! निकालने के लिए 2 × 1! चाहिए
1! का मान 1 होता है (यह हमारा बेस केस है, यहाँ रुक गए!)।
जैसे ही 1 मिला, कंप्यूटर पीछे लौटते हुए सबकी गुणा करता चला आता है और हमें अंतिम उत्तर 120 मिल जाता है!`,
    realLifeAnalogy: {
      en: 'Russian Nesting Dolls: You open a doll to find a smaller doll inside, until you hit the smallest doll that cannot be opened (the base case).',
      hi: 'रूसी गुड़िया (Nesting Dolls) की तरह: बड़ी गुड़िया खोलने पर अंदर छोटी गुड़िया मिलती है, जब तक कि सबसे छोटी गुड़िया न आ जाए जिसे खोला न जा सके (बेस केस)!'
    },
    codeExamples: [
      {
        title: 'Factorial using Recursion',
        titleHindi: 'रिकर्शन से फैक्टोरियल गणना',
        code: `#include <stdio.h>

long long factorial(int n) {
    // बेस केस (Base Case)
    if (n <= 1) return 1;
    // रिकर्सिव कॉल
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("%d का फैक्टोरियल = %lld\\n", num, factorial(num));
    return 0;
}`,
        output: `5 का फैक्टोरियल = 120`,
        explanation: '5 * factorial(4) down to base case 1.',
        explanationHindi: '5 * 4 * 3 * 2 * 1 की गणना होकर 120 उत्तर आया।'
      }
    ],
    keyPoints: {
      en: ['Always define the base case first to avoid infinite recursion.'],
      hi: ['स्टैक ओवरफ्लो से बचने के लिए बेस केस हमेशा सबसे पहले लिखें।']
    },
    commonPitfalls: {
      en: ['Missing the base case causing stack overflow.'],
      hi: ['बेस केस भूल जाना जिससे प्रोग्राम मेमोरी भरकर क्रैश हो जाए।']
    },
    quiz: [
      {
        id: 'q7-1',
        difficulty: 'easy',
        question: 'What error occurs if a recursive function lacks a base case?',
        questionHindi: 'यदि किसी रिकर्सिव फंक्शन में बेस केस न हो तो कौन-सी गंभीर त्रुटि आती है?',
        options: ['Syntax Error', 'Stack Overflow', 'Divide by Zero', 'File Not Found'],
        correctIndex: 1,
        explanation: 'Calls pile up on the call stack infinitely causing Stack Overflow.',
        explanationHindi: 'कॉल स्टैक भर जाने से स्टैक ओवरफ्लो (Stack Overflow) क्रैश हो जाता है।'
      }
    ]
  },
  {
    id: 'arrays',
    order: 8,
    title: 'Arrays: 1D & 2D Matrices',
    titleHindi: 'ऐरे (Arrays: एक साथ कई डेटा का संग्रह)',
    category: 'Data Structures',
    summary: 'Store multiple values of the same type sequentially in memory. Learn 0-based indexing, traversal, and 2D matrix grids.',
    summaryHindi: 'समान डेटा प्रकार के मानों को मेमोरी में लगातार क्रम में संचित करना: इंडेक्स 0 से n-1 और मैट्रिसेस।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS AN ARRAY IN SIMPLE WORDS?
Imagine your school has 50 students in your classroom. If you wanted to store their test marks using normal variables, you would have to declare 50 separate variables: mark1, mark2, mark3... mark50! Writing code like that is tedious and unmanageable.
An ARRAY is a collection of multiple elements of the EXACT SAME DATA TYPE stored sequentially one after another in contiguous (neighboring) RAM memory locations under a single shared name!

2. HOW ARE ARRAYS STORED IN MEMORY?
When you write:
int marks[5] = {90, 85, 78, 92, 88};
The computer allocates 5 contiguous slots in RAM. If each integer takes 4 bytes and the array starts at memory address 1000, then:
marks[0] is at address 1000
marks[1] is at address 1004
marks[2] is at address 1008
marks[3] is at address 1012
marks[4] is at address 1016

3. WHY DOES INDEXING START AT ZERO (0)?
In C, the index number does not mean "the 1st element"; it represents the OFFSET DISTANCE from the beginning of the array!
The very first element is at distance 0 from the start, so it is arr[0].
For an array of size N, the valid indices run from 0 to N-1.

4. TWO-DIMENSIONAL (2D) ARRAYS (MATRICES):
Used when data is naturally organized in Rows and Columns (like a chessboard, a calendar, or an Excel spreadsheet):
int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };
We use nested loops (one loop for rows, one loop for columns) to traverse 2D arrays.`,
    explanationHi: `१. सरल शब्दों में ऐरे (Array) क्या है?
कल्पना कीजिए कि आपकी कक्षा में ५० बच्चे हैं और आपको सबके गणित के नंबर कंप्यूटर में सुरक्षित रखने हैं। यदि आप सामान्य वेरिएबल्स का उपयोग करेंगे, तो आपको ५० अलग-अलग नाम बनाने पड़ेंगे: marks1, marks2, marks3... marks50! यह कितना थका देने वाला काम होगा!
ऐरे (Array) एक ही नाम के तहत समान डेटा प्रकार के कई सारे मानों को मेमोरी में एक कतार में (एक के बाद एक पड़ोसी बनाकर) रखने की शानदार तकनीक है!

२. ऐरे कंप्यूटर मेमोरी में कैसे रहता है?
जब आप लिखते हैं:
int marks[5] = {90, 85, 78, 92, 88};
तो कंप्यूटर मेमोरी में लगातार ५ डिब्बे आवंटित करता है। यदि पहला डिब्बा पता संख्या 1000 पर है, तो दूसरा 1004 पर, तीसरा 1008 पर होगा।
३. गिनती 0 से क्यों शुरू होती है?
C भाषा में इंडेक्स का मतलब "पहला या दूसरा" नहीं होता, बल्कि इसका मतलब है "शुरुआत से कितनी दूरी पर है (Offset)"। पहला डिब्बा शुरुआत में ही है (दूरी 0), इसलिए वह marks[0] है।
यदि ऐरे का आकार 5 है, तो उसके इंडेक्स 0, 1, 2, 3, 4 तक ही होंगे।

४. 2D ऐरे (टेबल और मैट्रिक्स):
जब हमें पंक्तियों (Rows) और स्तंभों (Columns) में डेटा रखना हो (जैसे शतरंज का बोर्ड या एक्सेल शीट), तो हम 2D ऐरे बनाते हैं:
int table[2][3]; // 2 पंक्तियां और 3 स्तंभ`,
    realLifeAnalogy: {
      en: 'Think of an egg carton with numbered slots from 0 to 11. Each slot holds one egg of identical size.',
      hi: 'अंडे की ट्रे की तरह जिसमें 0 से 11 तक नंबर वाले स्लॉट बने होते हैं। प्रत्येक स्लॉट में एक अंडा सुरक्षित रखा जा सकता है!'
    },
    codeExamples: [
      {
        title: 'Array Sum and Traversal',
        titleHindi: 'ऐरे का योग और ट्रैवर्सल',
        code: `#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("कुल योग (Sum) = %d\\n", sum);
    return 0;
}`,
        output: `कुल योग (Sum) = 150`,
        explanation: 'Loop traverses from index 0 to 4 and accumulates sum.',
        explanationHindi: 'लूप ने 0 से 4 तक के तत्वों को जोड़कर कुल 150 प्राप्त किया।'
      }
    ],
    keyPoints: {
      en: ['C does NOT perform boundary checks on arrays.'],
      hi: ['C में ऐरे बाउंड्स चेकिंग नहीं होती, अतः गलत इंडेक्स पर पढ़ने से कचरा (Garbage) मान आता है।']
    },
    commonPitfalls: {
      en: ['Accessing arr[5] on an array of size 5 (valid indices are 0 to 4).'],
      hi: ['5 आकार के ऐरे में arr[5] को पढ़ना (वैध इंडेक्स केवल 0 से 4 हैं)।']
    },
    quiz: [
      {
        id: 'q8-1',
        difficulty: 'easy',
        question: 'What is the index of the first element in any C array?',
        questionHindi: 'C भाषा में किसी भी ऐरे के पहले तत्व का इंडेक्स क्या होता है?',
        options: ['1', '0', '-1', 'Undefined'],
        correctIndex: 1,
        explanation: 'C arrays are 0-indexed.',
        explanationHindi: 'C भाषा में इंडेक्सिंग हमेशा 0 से ही शुरू होती है।'
      }
    ]
  },
  {
    id: 'pointers',
    order: 9,
    title: 'Pointers & Memory Addresses',
    titleHindi: 'पॉइंटर्स एवं मेमोरी एड्रेस (C की असली शक्ति)',
    category: 'Functions & Pointers',
    summary: 'Demystify pointers! Understand memory addresses (&), dereferencing (*), pointer arithmetic, and swapping values by reference.',
    summaryHindi: 'C की असली शक्ति: मेमोरी का पता (&), मान निकालना (*), पॉइंटर अंकगणित और कॉल बाय रेफरेंस।',
    readTimeMinutes: 10,
    explanationEn: `1. DEMYSTIFYING POINTERS IN SIMPLE WORDS:
Many students find pointers scary, but they are actually very simple!
A normal variable stores a VALUE (like 10 or 3.14).
A POINTER is simply a special variable that stores the MEMORY ADDRESS of another variable!
Think of your friend's house: the house itself contains furniture (value), but if your friend writes their street address on a piece of paper and hands it to you, that slip of paper is a POINTER!

2. THE 2 SUPERSTAR OPERATORS:
- Address-of Operator (&):
  Placed before a variable name, it tells you: "Where does this variable live in RAM?"
  Example: printf("%p", &age); prints hexadecimal address like 0x7ffd20.
- Dereference Operator (*):
  Placed before a pointer variable, it tells the computer: "Go to that memory address, unlock the door, and fetch or modify the value inside!"
  Example: *ptr = 50; directly changes the value sitting at that memory location!

3. WHY ARE POINTERS SO POWERFUL?
- Call by Reference: Functions in C normally receive copies. With pointers, you pass the memory address, enabling the function to alter variables inside main().
- Dynamic Memory: Used with malloc() to create arrays of any size at runtime.
- High Performance: Passing the address of a 1-million-byte image takes only 8 bytes of pointer memory, avoiding slow copying.`,
    explanationHi: `१. सरल शब्दों में पॉइंटर्स (Pointers) क्या हैं?
अक्सर छात्र पॉइंटर्स के नाम से घबराते हैं, लेकिन यह बहुत आसान है!
एक सामान्य वेरिएबल अपने अंदर कोई मान (जैसे 10 या 25) रखता है।
लेकिन पॉइंटर (Pointer) एक ऐसा विशेष वेरिएबल होता है जो किसी दूसरे वेरिएबल का मेमोरी एड्रेस (कंप्यूटर की RAM में उसके घर का पता) संचित करता है!
कल्पना कीजिए कि आपका घर एक वेरिएबल है और उसमें सामान (वैल्यू) रखा है। यदि आप एक पर्ची पर अपने घर का पता लिखकर अपने दोस्त को दे दें, तो वह पर्ची एक "पॉइंटर" है!

२. पॉइंटर्स के दो जादुई ऑपरेटर्स:
- '&' (Address-of ऑपरेटर):
  यह किसी वेरिएबल के आगे लगाने पर बताता है कि वह कंप्यूटर की मेमोरी में किस पते पर बैठा है (जैसे &age)।
- '*' (Dereference ऑपरेटर):
  यह उस पते पर जाकर वहां रखे सामान (वैल्यू) को बाहर निकालता है या बदल देता है!
  जैसे: *ptr = 50; लिखने से उस पते पर रखी संख्या बदलकर 50 हो जाएगी!

३. पॉइंटर्स का उपयोग क्यों किया जाता है?
- कॉल बाय रेफरेंस: फंक्शंस को असली वेरिएबल का पता देकर सीधे मुख्य मान बदलवाना (जैसे दो संख्याओं की अदला-बदली swap करना)।
- डायनेमिक मेमोरी (malloc): प्रोग्राम चलते समय मनचाही मेमोरी लेना।
- सुपर स्पीड: बड़ी फाइलों की नकल करने के बजाय सिर्फ उनका पता भेजना जिससे कंप्यूटर सुपरफास्ट काम करता है।`,
    realLifeAnalogy: {
      en: 'A variable is your house, and a pointer is a slip of paper with your home address written on it.',
      hi: 'वेरिएबल आपका घर है, और पॉइंटर एक कागज का टुकड़ा है जिस पर आपके घर का पता लिखा है। उस पते के जरिए कोई भी आपके घर पहुंच सकता है!'
    },
    codeExamples: [
      {
        title: 'Swap Two Numbers using Pointers',
        titleHindi: 'पॉइंटर्स द्वारा दो संख्याओं की अदला-बदली (Swap)',
        code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("बदलने से पहले: x=%d, y=%d\\n", x, y);
    swap(&x, &y); // एड्रेस पास किया
    printf("बदलने के बाद:   x=%d, y=%d\\n", x, y);
    return 0;
}`,
        output: `बदलने से पहले: x=10, y=20
बदलने के बाद:   x=20, y=10`,
        explanation: 'swap takes addresses and modifies x and y in place.',
        explanationHindi: 'swap फंक्शन ने सीधे पते पर जाकर मानों को आपस में बदल दिया।'
      }
    ],
    keyPoints: {
      en: ['Always initialize unused pointers to NULL: int *ptr = NULL;'],
      hi: ['अप्रयुक्त पॉइंटर को हमेशा NULL से इनिशियलाइज करें: int *ptr = NULL;']
    },
    commonPitfalls: {
      en: ['Dereferencing a NULL or wild pointer causes instant crash.'],
      hi: ['NULL या कचरा पते वाले पॉइंटर पर * लगाना, जिससे प्रोग्राम तुरंत क्रैश हो जाता है।']
    },
    quiz: [
      {
        id: 'q9-1',
        difficulty: 'easy',
        question: 'Which operator is used to get the memory address of a variable in C?',
        questionHindi: 'किसी वेरिएबल का मेमोरी एड्रेस प्राप्त करने के लिए कौन-सा ऑपरेटर उपयोग होता है?',
        options: ['*', '&', '->', '%'],
        correctIndex: 1,
        explanation: '& is the address-of operator.',
        explanationHindi: '& ऑपरेटर वेरिएबल का मेमोरी पता देता है।'
      }
    ]
  },
  {
    id: 'strings',
    order: 10,
    title: 'Strings & String Manipulation',
    titleHindi: 'स्ट्रिंग्स एवं स्ट्रिंग फंक्शंस (अक्षरों की माला)',
    category: 'Data Structures',
    summary: 'Strings in C are character arrays terminated with \\0. Learn strlen, strcpy, strcat, strcmp, and buffer overflow prevention.',
    summaryHindi: 'C में स्ट्रिंग: नल कैरेक्टर (\\0) का महत्व, strlen, strcpy, strcat और strcmp का प्रयोग।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS A STRING IN C?
Unlike Python or Java, C does not have a built-in 'string' data type. In C, a STRING is simply a one-dimensional array of characters that is terminated by a special hidden sentinel character: the NULL TERMINATOR ('\\0', ASCII value 0).

2. WHY IS THE NULL TERMINATOR ('\\0') CRITICAL?
How does the computer know where the word "Kuldeep" ends in memory? It looks for '\\0'!
If '\\0' is missing, functions like printf("%s") will keep reading whatever garbage bytes happen to follow in RAM until they crash.
Rule of thumb: If your string has 7 letters, your char array must be AT LEAST 8 bytes to accommodate '\\0'.

3. THE CORE <string.h> LIBRARY FUNCTIONS:
- strlen(str): Counts characters up to '\\0'.
- strcpy(dest, src): Copies src into dest.
- strcat(dest, src): Concatenates (glues) src onto the end of dest.
- strcmp(s1, s2): Lexicographically compares two strings (returns 0 if identical).`,
    explanationHi: `१. सरल शब्दों में स्ट्रिंग (String) क्या है?
पायथन या जावा की तरह C भाषा में "String" नाम का कोई अलग डेटा प्रकार नहीं होता। C भाषा में स्ट्रिंग वास्तव में अक्षरों की एक माला (Character Array) होती है, जिसके सबसे अंत में एक विशेष अदृश्य कैरेक्टर, जिसे "नल टर्मिनेटर" ('\\0') कहते हैं, लगा होता है।

२. नल कैरेक्टर ('\\0') क्यों अनिवार्य है?
कंप्यूटर को कैसे पता चलेगा कि आपका नाम "भारत" कहाँ समाप्त हुआ? नल कैरेक्टर ('\\0') यह लाल झंडी है जो कंप्यूटर को बताती है कि स्ट्रिंग यहीं समाप्त हो गई है! यदि '\\0' न हो, तो कंप्यूटर मेमोरी में आगे रखा कचरा भी पढ़ने लगेगा।
अतः यदि नाम में 5 अक्षर हैं, तो ऐरे का साइज कम से कम 6 होना चाहिए।

३. सबसे महत्वपूर्ण <string.h> फंक्शंस:
- strlen(str): स्ट्रिंग में अक्षरों की कुल संख्या गिनता है।
- strcpy(dest, src): एक स्ट्रिंग को दूसरी में कॉपी करता है।
- strcat(dest, src): दो स्ट्रिंग्स को आपस में जोड़ता है।
- strcmp(s1, s2): दोनों की तुलना करता है; यदि दोनों बराबर हों तो 0 देता है।`,
    realLifeAnalogy: {
      en: 'Think of a string as a train of character wagons. The null terminator \\0 is the red light on the last wagon signaling the train has ended.',
      hi: 'स्ट्रिंग को ट्रेन के डिब्बों की तरह समझें। सबसे अंतिम डिब्बे पर लगी लाल बत्ती नल कैरेक्टर (\\0) है जो दर्शाती है कि ट्रेन यहीं समाप्त हो गई!'
    },
    codeExamples: [
      {
        title: 'String Functions Demo',
        titleHindi: 'स्ट्रिंग फंक्शंस का उपयोग',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[30] = "Namaste";
    char name[] = " Bharat";

    strcat(greeting, name); // दोनों को जोड़ा
    printf("पूर्ण संदेश: %s\\n", greeting);
    printf("कुल लंबाई: %lu\\n", strlen(greeting));
    return 0;
}`,
        output: `पूर्ण संदेश: Namaste Bharat
कुल लंबाई: 14`,
        explanation: 'strcat combines both strings, strlen counts characters.',
        explanationHindi: 'strcat ने दोनों स्ट्रिंग्स को जोड़ा और strlen ने लंबाई बताई।'
      }
    ],
    keyPoints: {
      en: ['Always allocate size + 1 to accommodate the null terminator \'\\0\'.', 'Compare strings with strcmp, NOT with ==.'],
      hi: ['नल कैरेक्टर (\\0) के लिए ऐरे का साइज हमेशा अक्षरों की संख्या + 1 रखें।', 'स्ट्रिंग्स की तुलना के लिए strcmp का उपयोग करें, == का नहीं।']
    },
    commonPitfalls: {
      en: ['Comparing strings with == compares pointers, not characters!'],
      hi: ['if (s1 == s2) लिखना जो केवल पतों की तुलना करता है, अक्षरों की नहीं।']
    },
    quiz: [
      {
        id: 'q10-1',
        difficulty: 'easy',
        question: 'What special character marks the end of a string in C?',
        questionHindi: 'C भाषा में स्ट्रिंग के अंत को चिह्नित करने वाला विशेष कैरेक्टर कौन-सा है?',
        options: ['\\n', '\\t', '\\0', ';'],
        correctIndex: 2,
        explanation: '\\0 indicates string termination.',
        explanationHindi: '\\0 (नल कैरेक्टर) स्ट्रिंग की समाप्ति को दर्शाता है।'
      }
    ]
  },
  {
    id: 'structures-unions',
    order: 11,
    title: 'Structures (struct) & Unions',
    titleHindi: 'स्ट्रक्चर्स (struct) एवं यूनियन्स (डेटा का बंडल)',
    category: 'Data Structures',
    summary: 'Bundle heterogeneous data types together. Understand struct memory layout, member access (.), arrow operator (->), and unions.',
    summaryHindi: 'विभिन्न डेटा प्रकारों का एक बंडल: डॉट (.) ऑपरेटर, एरो (->) ऑपरेटर और struct बनाम union का मेमोरी अंतर।',
    readTimeMinutes: 10,
    explanationEn: `1. WHY DO WE NEED STRUCTURES (struct)?
An array can only store elements of the SAME data type (all ints or all floats). But in real life, a Student has:
- rollNumber (int)
- name (char array)
- feePercentage (float)
A STRUCTURE ('struct') is a user-defined compound data type that bundles diverse variables together into one clean package!

2. HOW TO ACCESS MEMBERS:
- Dot (.) operator: Used with normal structure variables (student1.marks = 95.0f;).
- Arrow (->) operator: Used when accessing structure members via a pointer (ptr->marks = 95.0f;).

3. STRUCT VS UNION (THE CRITICAL DIFFERENCE):
- struct: Every member receives its own independent memory space. Total size = sum of all member sizes.
- union: All members SHARE the exact same memory address! Total size = size of its largest member. Only one member can be used at any given time.`,
    explanationHi: `१. स्ट्रक्चर (struct) की आवश्यकता क्यों है?
ऐरे में केवल एक ही प्रकार का डेटा आ सकता है (जैसे सारे पूर्णांक)। लेकिन यदि हमें किसी विद्यार्थी का पूरा रिकॉर्ड रखना हो:
- रोल नंबर (int)
- विद्यार्थी का नाम (char स्ट्रिंग)
- परीक्षा के प्राप्तांक (float)
अलग-अलग प्रकार के डेटा को एक साथ एक ही पहचान में बांधने के लिए हम 'struct' (Structure) बनाते हैं!

२. सदस्यों तक पहुंच (Access):
- डॉट (.) ऑपरेटर: सामान्य वेरिएबल के साथ (s1.marks = 95.5;)।
- एरो (->) ऑपरेटर: पॉइंटर के साथ (ptr->marks = 95.5;)।

३. Struct और Union में सबसे बड़ा अंतर:
- struct में हर सदस्य को अपनी अलग मेमोरी मिलती है।
- union में सभी सदस्य एक ही मेमोरी साझा (Share) करते हैं, जिससे बहुत सारी रैम बचती है!`,
    realLifeAnalogy: {
      en: 'A struct is like an apartment with separate rooms for each person. A union is like a single hotel room where only one guest can stay at a time.',
      hi: 'struct एक घर की तरह है जिसमें हर सदस्य का अपना अलग कमरा होता है। union एक होटल के कमरे की तरह है जिसमें एक समय में केवल एक ही व्यक्ति रह सकता है!'
    },
    codeExamples: [
      {
        title: 'Student Structure Record',
        titleHindi: 'विद्यार्थी रिकॉर्ड स्ट्रक्चर',
        code: `#include <stdio.h>

struct Student {
    int roll;
    char name[30];
    float marks;
};

int main() {
    struct Student s1 = {101, "Kuldeep", 95.5f};
    struct Student *ptr = &s1;

    printf("रोल नंबर: %d\\n", ptr->roll);
    printf("नाम: %s\\n", ptr->name);
    printf("अंक: %.1f\\n", ptr->marks);
    return 0;
}`,
        output: `रोल नंबर: 101
नाम: Kuldeep
अंक: 95.5`,
        explanation: 'Arrow operator accesses members via pointer.',
        explanationHindi: 'एरो ऑपरेटर (->) पॉइंटर के जरिए स्ट्रक्चर के सदस्यों को दिखाता है।'
      }
    ],
    keyPoints: {
      en: ['Arrow operator (->) is equivalent to (*ptr).member.'],
      hi: ['एरो ऑपरेटर (->) और (*ptr).member दोनों एक ही अर्थ रखते हैं।']
    },
    commonPitfalls: {
      en: ['Using dot (.) on a pointer instead of arrow (->).'],
      hi: ['पॉइंटर पर डॉट (.) लगाना जबकि एरो (->) लगना चाहिए।']
    },
    quiz: [
      {
        id: 'q11-1',
        difficulty: 'easy',
        question: 'Which operator is used to access structure members through a structure pointer?',
        questionHindi: 'स्ट्रक्चर पॉइंटर के माध्यम से सदस्यों तक पहुँचने के लिए कौन-सा ऑपरेटर उपयोग होता है?',
        options: ['.', '->', '*', '&'],
        correctIndex: 1,
        explanation: 'Arrow operator (->) is used with pointers.',
        explanationHindi: 'पॉइंटर के साथ एरो (->) ऑपरेटर का उपयोग होता है।'
      }
    ]
  },
  {
    id: 'dynamic-memory',
    order: 12,
    title: 'Dynamic Memory Allocation (DMA)',
    titleHindi: 'डायनेमिक मेमोरी एलोकेशन (malloc, calloc, free)',
    category: 'Memory & Files',
    summary: 'Take control of heap memory at runtime. Master malloc, calloc, realloc, and prevent memory leaks using free().',
    summaryHindi: 'प्रोग्राम चलते समय मेमोरी लेना और लौटाना: malloc, calloc, realloc और free() से मेमोरी लीक रोकना।',
    readTimeMinutes: 10,
    explanationEn: `1. STACK VS HEAP MEMORY:
- Stack: Automatic, fast, but fixed in size at compile time.
- Heap: Vast reservoir of RAM that can be allocated dynamically at runtime using pointers.

2. THE 4 ESSENTIAL FUNCTIONS IN <stdlib.h>:
- malloc(bytes): Requests raw memory block from heap. Contains garbage values.
- calloc(n, size): Allocates memory and clears all bytes to zero (0).
- realloc(ptr, new_size): Expands or shrinks existing allocated block.
- free(ptr): Returns memory back to the operating system. Always set ptr = NULL afterwards to prevent dangling pointers!`,
    explanationHi: `१. स्टैक बनाम हीप (Heap) मेमोरी:
सामान्य ऐरे का साइज पहले से निश्चित करना पड़ता है। लेकिन जब हमें प्रोग्राम के चलने के दौरान उपयोगकर्ता की जरूरत के अनुसार मेमोरी चाहिए हो, तो हम हीप (Heap) मेमोरी से डायनेमिक मेमोरी मांगते हैं।

२. <stdlib.h> के ४ प्रमुख फंक्शंस:
- malloc(): हीप से कच्ची मेमोरी लेता है (इसमें पहले से कचरा मान होता है)।
- calloc(): मेमोरी देने के साथ-साथ सभी डिब्बों में 0 भर देता है।
- realloc(): पहले से ली गई मेमोरी का आकार बदलने के लिए।
- free(): काम खत्म होने पर मेमोरी ऑपरेटिंग सिस्टम को लौटाने के लिए।
स्वर्ण नियम: यदि malloc या calloc किया है, तो free() करना अनिवार्य है, अन्यथा मेमोरी लीक हो जाएगा!`,
    realLifeAnalogy: {
      en: 'Stack is like your private desk. Heap is like renting hotel rooms: rent what you need, but remember to checkout (free) when leaving!',
      hi: 'स्टैक मेमोरी आपके स्कूल बैग की तरह है (छोटा, अपने आप खाली)। हीप मेमोरी होटल रूम रेंट पर लेने जैसी है: जब तक रहना हो रहो, पर चेक-आउट (free) करना अनिवार्य है!'
    },
    codeExamples: [
      {
        title: 'Dynamic Array with malloc and free',
        titleHindi: 'malloc और free का वास्तविक उदाहरण',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*) malloc(3 * sizeof(int));
    if (arr == NULL) {
        printf("मेमोरी आवंटन असफल!\\n");
        return 1;
    }

    arr[0] = 100; arr[1] = 200; arr[2] = 300;
    printf("डायनेमिक मान: %d, %d, %d\\n", arr[0], arr[1], arr[2]);

    free(arr); // मेमोरी मुक्त की
    arr = NULL;
    printf("मेमोरी सफलतापूर्वक मुक्त कर दी गई।\\n");
    return 0;
}`,
        output: `डायनेमिक मान: 100, 200, 300
मेमोरी सफलतापूर्वक मुक्त कर दी गई।`,
        explanation: 'malloc allocates heap memory, free releases it.',
        explanationHindi: 'malloc ने हीप मेमोरी दी और free ने उसे ऑपरेटिंग सिस्टम को लौटा दिया।'
      }
    ],
    keyPoints: {
      en: ['Always check if (ptr == NULL) after allocation.', 'After free(ptr), set ptr = NULL.'],
      hi: ['मेमोरी मांगने के बाद हमेशा जांचें कि कहीं ptr == NULL तो नहीं है।', 'free(ptr) के बाद ptr = NULL अवश्य करें।']
    },
    commonPitfalls: {
      en: ['Memory leak from forgetting free().', 'Dangling pointers.'],
      hi: ['free() करना भूल जाना जिससे मेमोरी लीक हो जाए।']
    },
    quiz: [
      {
        id: 'q12-1',
        difficulty: 'easy',
        question: 'Which function initializes allocated memory bytes to zero?',
        questionHindi: 'कौन-सा फंक्शन आवंटित की गई मेमोरी को शून्य (0) से प्रारंभ करता है?',
        options: ['malloc()', 'calloc()', 'realloc()', 'free()'],
        correctIndex: 1,
        explanation: 'calloc zeroes out memory.',
        explanationHindi: 'calloc मेमोरी के सभी बाइट्स में 0 भर देता है।'
      }
    ]
  },
  {
    id: 'preprocessors',
    order: 13,
    title: 'Preprocessors & Macros',
    titleHindi: 'प्रीप्रोसेसर्स एवं मैक्रोज़ (#define, #include)',
    category: 'Memory & Files',
    summary: 'Understand the preliminary phase of compilation. Learn #include, #define constants, macro functions, and #ifdef conditional compilation.',
    summaryHindi: 'कंपाइलेशन से पहले का कार्य: #include, #define मैक्रो फंक्शंस और हेडर गार्ड्स।',
    readTimeMinutes: 10,
    explanationEn: `1. WHAT IS THE PREPROCESSOR IN SIMPLE WORDS?
Think of a master chef who has a helper in the kitchen. Before the chef cooks, the helper washes, peels, and chops the vegetables. In C, the PREPROCESSOR is that kitchen helper! It inspects and modifies your source code BEFORE the compiler translates it into machine code. Every preprocessor line begins with a hash (#).

2. KEY DIRECTIVES:
- #include: Injects header files.
- #define: Performs find-and-replace text substitution for constants and macro formulas.
- Note: Preprocessor directives NEVER terminate with a semicolon!`,
    explanationHi: `१. सरल शब्दों में प्रीप्रोसेसर क्या है?
रसोई में मुख्य बावर्ची (कम्पाइलर) के खाना पकाने से पहले उसका सहायक जो सब्जियां धोकर, छीलकर और काटकर तैयार रखता है, वही C में प्रीप्रोसेसर (Preprocessor) है! यह कोड को कम्पाइल होने से पहले तैयार करता है। इसकी हर पंक्ति हैश (#) से शुरू होती है।

२. मुख्य निर्देश:
- #include: हेडर फाइलों को जोड़ता है।
- #define: फॉर्मूले और मैक्रोज़ को टेक्स्ट रूप में बदलता है।
- विशेष नियम: इसके अंत में कभी भी सेमीकोलन (;) नहीं लगाया जाता!`,
    realLifeAnalogy: {
      en: 'The preprocessor is like the "Find and Replace" tool in Microsoft Word running across your document before printing.',
      hi: 'प्रीप्रोसेसर एमएस वर्ड के "Find and Replace" टूल की तरह है जो प्रिंट निकालने से पहले सभी शब्दों को बदल देता है!'
    },
    codeExamples: [
      {
        title: 'Macro Function Example',
        titleHindi: 'मैक्रो फंक्शन का उदाहरण',
        code: `#include <stdio.h>

#define PI 3.14159
#define SQUARE(x) ((x) * (x))

int main() {
    int side = 5;
    printf("वर्ग का क्षेत्रफल = %d\\n", SQUARE(side));
    printf("PI का मान = %.2f\\n", PI);
    return 0;
}`,
        output: `वर्ग का क्षेत्रफल = 25
PI का मान = 3.14`,
        explanation: 'SQUARE(5) expands to ((5) * (5)).',
        explanationHindi: 'कम्पाइल होने से पहले SQUARE(5) का मान ((5) * (5)) में बदल गया।'
      }
    ],
    keyPoints: {
      en: ['Preprocessor directives do NOT end with a semicolon.'],
      hi: ['प्रीप्रोसेसर निर्देशों के अंत में कभी भी सेमीकोलन नहीं लगाया जाता।']
    },
    commonPitfalls: {
      en: ['Putting a semicolon after #define: #define MAX 100;'],
      hi: ['#define के अंत में सेमीकोलन लगा देना: #define MAX 100;']
    },
    quiz: [
      {
        id: 'q13-1',
        difficulty: 'easy',
        question: 'Which character precedes all C preprocessor directives?',
        questionHindi: 'सभी C प्रीप्रोसेसर निर्देश किस प्रतीक से प्रारंभ होते हैं?',
        options: ['$', '@', '#', '&'],
        correctIndex: 2,
        explanation: 'All directives begin with #.',
        explanationHindi: 'सभी प्रीप्रोसेसर डायरेक्टिव्स # (Hash) से शुरू होते हैं।'
      }
    ]
  },
  {
    id: 'file-handling',
    order: 14,
    title: 'File Handling in C (Zero to Hero)',
    titleHindi: 'फाइल हैंडलिंग: हार्ड डिस्क में डेटा हमेशा के लिए सुरक्षित करना',
    category: 'Memory & Files',
    summary: 'Persist data on hard disk permanently! Master FILE* pointer, fopen modes ("r", "w", "a"), fprintf, fscanf, fgetc, and fclose.',
    summaryHindi: 'डेटा को हमेशा के लिए सुरक्षित करें: FILE पॉइंटर, fopen मोड्स ("r", "w", "a"), fprintf, fscanf और fclose।',
    readTimeMinutes: 10,
    explanationEn: `1. WHY DO WE NEED FILE HANDLING?
All variables, arrays, and structs live in RAM. RAM is volatile: as soon as your program terminates or your computer shuts off, all RAM data vanishes instantly!
FILE HANDLING allows your C program to create, read, append, and save data permanently on the non-volatile Hard Drive (SSD/HDD)!

2. THE 4 STEPS OF FILE HANDLING:
- Step 1: Open the file with fopen()
  FILE *fp = fopen("students.txt", "w");
  Modes:
  "r" (Read): Opens existing file for reading. Returns NULL if not found!
  "w" (Write): Creates a fresh file. WARNING: Overwrites and erases existing contents!
  "a" (Append): Keeps existing data and appends new lines at the end.
- Step 2: Validate pointer (check if fp == NULL)
- Step 3: Write or Read data using fprintf() or fscanf()
- Step 4: Close the file with fclose(fp) so write buffers are flushed to disk.`,
    explanationHi: `१. फाइल हैंडलिंग (File Handling) की आवश्यकता क्यों है?
सामान्य वेरिएबल्स और ऐरे कंप्यूटर की RAM में रहते हैं। जैसे ही प्रोग्राम बंद होता है, RAM का सारा डेटा हमेशा के लिए गायब हो जाता है!
यदि आप चाहते हैं कि आपका डेटा कंप्यूटर की हार्ड डिस्क में हमेशा के लिए सुरक्षित रहे ताकि कल या अगले साल भी उसे पढ़ा जा सके, तो हम फाइल हैंडलिंग का उपयोग करते हैं।

२. फाइल हैंडलिंग के ४ आसान कदम:
- कदम १: फाइल खोलना (fopen)
  FILE *fp = fopen("data.txt", "w");
  मोड्स:
  "r" (पढ़ना): पुरानी फाइल पढ़ने के लिए।
  "w" (लिखना): नई फाइल बनाता है (पुराना डेटा मिटा देता है)।
  "a" (अपेंड): पुराने डेटा के अंत में नया डेटा जोड़ता है।
- कदम २: शून्य की जांच करना: if (fp == NULL)
- कदम ३: डेटा लिखना या पढ़ना: fprintf() या fscanf()
- कदम ४: फाइल बंद करना: fclose(fp) ताकि डेटा हार्ड डिस्क में पक्का सेव हो जाए।`,
    realLifeAnalogy: {
      en: 'File handling is like a diary on your bookshelf: fopen() takes it off the shelf, fprintf() writes with a pen, and fclose() puts it safely back on the shelf.',
      hi: 'फाइल हैंडलिंग अलमारी में रखी डायरी जैसी है: fopen() अलमारी से डायरी निकालना है, fprintf() पेन से लिखना है, और fclose() डायरी वापस अलमारी में संभाल कर रखना है!'
    },
    codeExamples: [
      {
        title: 'Writing Data to File',
        titleHindi: 'फाइल में डेटा लिखना और बंद करना',
        code: `#include <stdio.h>

int main() {
    FILE *fp = fopen("cguru_record.txt", "w");
    if (fp == NULL) {
        printf("फाइल खोलने में त्रुटि!\\n");
        return 1;
    }

    fprintf(fp, "C-Guru Academy\\n");
    fprintf(fp, "Student: Kuldeep Singh\\n");
    fclose(fp); // फाइल सुरक्षित बंद की

    printf("डेटा सफलतापूर्वक cguru_record.txt में सुरक्षित हो गया!\\n");
    return 0;
}`,
        output: `डेटा सफलतापूर्वक cguru_record.txt में सुरक्षित हो गया!`,
        explanation: 'fopen creates file, fprintf writes to it, fclose flushes buffer.',
        explanationHindi: 'fopen ने फाइल बनाई, fprintf ने लिखा और fclose ने हार्ड ड्राइव पर सेव कर दिया।'
      }
    ],
    keyPoints: {
      en: ['Always check if (fp == NULL).', 'Always call fclose(fp).'],
      hi: ['फाइल खोलने के तुरंत बाद if (fp == NULL) की जांच अवश्य करें।', 'कार्य होते ही fclose(fp) करना न भूलें।']
    },
    commonPitfalls: {
      en: ['Forgetting fclose() leaving buffers unwritten.'],
      hi: ['fclose() करना भूल जाना जिससे डेटा डिस्क में अधूरा रह जाए।']
    },
    quiz: [
      {
        id: 'q14-1',
        difficulty: 'easy',
        question: 'Which file mode appends new content to the end of a file without overwriting?',
        questionHindi: 'कौन-सा फाइल मोड पुराने डेटा को मिटाए बिना अंत में नया डेटा जोड़ता है?',
        options: ['"r"', '"w"', '"a"', '"wb"'],
        correctIndex: 2,
        explanation: '"a" is append mode.',
        explanationHindi: '"a" (अपेंड मोड) फाइल के अंत में नया डेटा जोड़ता है।'
      }
    ]
  }
];

export const MILESTONES = [
  {
    id: 'm1',
    title: 'C Novice',
    titleHindi: 'C का आरंभ (Novice)',
    description: 'Mastered C basics, variables, and operators',
    descriptionHindi: 'C के बुनियादी नियम, वेरिएबल्स और ऑपरेटर्स सीखे',
    icon: '🌱',
    requiredProgress: 20,
    badgeName: 'Beginner Badge'
  },
  {
    id: 'm2',
    title: 'Logic Master',
    titleHindi: 'लॉजिक मास्टर (Logic Master)',
    description: 'Conquered conditions, loops, and iterations',
    descriptionHindi: 'कंडीशन्स और लूप्स में महारत हासिल की',
    icon: '⚡',
    requiredProgress: 40,
    badgeName: 'Control Flow Pro'
  },
  {
    id: 'm3',
    title: 'Function Craftsman',
    titleHindi: 'फंक्शन कारीगर (Function Craftsman)',
    description: 'Mastered modular functions and recursion',
    descriptionHindi: 'फंक्शंस और रिकर्शन को गहराई से समझा',
    icon: '🧩',
    requiredProgress: 60,
    badgeName: 'Modular Coder'
  },
  {
    id: 'm4',
    title: 'Pointer Ninja',
    titleHindi: 'पॉइंटर निंजा (Pointer Ninja)',
    description: 'Tamed memory addresses, pointers, and structures',
    descriptionHindi: 'पॉइंटर्स, मेमोरी एड्रेस और स्ट्रक्चर्स की समझ',
    icon: '🎯',
    requiredProgress: 80,
    badgeName: 'Memory Explorer'
  },
  {
    id: 'm5',
    title: 'C Guru (File Handling Champion)',
    titleHindi: 'C गुरु (File Handling Master)',
    description: 'Completed 100% curriculum from Zero to File Handling',
    descriptionHindi: '0 से लेकर फाइल हैंडलिंग तक पूरा पाठ्यक्रम पूर्ण किया',
    icon: '🏆',
    requiredProgress: 100,
    badgeName: 'Certified C-Guru'
  }
];
