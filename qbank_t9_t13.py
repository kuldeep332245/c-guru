# Topics 9 to 13 questions: Array, Pointer, User Defined Data Type, Error, File Handling
from qbank_master import register

# -------------------------------------------------------------
# TOPIC 9: array (Arrays: 1D, 2D Matrices & Strings)
# -------------------------------------------------------------
arr_easy = [
    {
        "id": "arr-e1",
        "question": "What is an Array in C?",
        "questionHindi": "C भाषा में ऐरे (Array) क्या होता है?",
        "options": [
            "A collection of elements of the same data type stored in contiguous memory locations",
            "A collection of mixed different data types",
            "A function that returns multiple integers",
            "A dynamic pointer"
        ],
        "correctIndex": 0,
        "explanation": "An array is a fixed-size homogeneous collection of elements stored sequentially in memory.",
        "explanationHindi": "समान डेटा प्रकार के तत्वों का एक संग्रह जो मेमोरी में लगातार (Contiguous) स्थानों पर स्टोर होता है।"
    },
    {
        "id": "arr-e2",
        "question": "What is the index of the FIRST element in any C array?",
        "questionHindi": "C भाषा में किसी भी ऐरे के पहले तत्व का इंडेक्स क्या होता है?",
        "options": ["0 (zero-based indexing)", "1", "-1", "Depends on array size"],
        "correctIndex": 0,
        "explanation": "C uses 0-based indexing; the first element is always at index 0.",
        "explanationHindi": "C में 0-बेस्ड इंडेक्सिंग होती है; पहला तत्व हमेशा इंडेक्स 0 पर होता है।"
    },
    {
        "id": "arr-e3",
        "question": "In an array declared as 'int arr[10];', what is the index of the LAST element?",
        "questionHindi": "'int arr[10];' ऐरे में अंतिम तत्व का इंडेक्स क्या होगा?",
        "options": ["10", "9", "11", "0"],
        "correctIndex": 1,
        "explanation": "For an array of size N, valid indices run from 0 to N - 1 (here 0 to 9).",
        "explanationHindi": "N आकार के ऐरे में इंडेक्स 0 से N-1 तक होते हैं, इसलिए अंतिम इंडेक्स 9 होगा।"
    },
    {
        "id": "arr-e4",
        "question": "How do you access the third element of an array named 'marks'?",
        "questionHindi": "'marks' नामक ऐरे के तीसरे तत्व को कैसे एक्सेस किया जाएगा?",
        "options": ["marks[2]", "marks[3]", "marks(2)", "marks.3"],
        "correctIndex": 0,
        "explanation": "Due to 0-indexing: element 1 is marks[0], element 2 is marks[1], element 3 is marks[2].",
        "explanationHindi": "0-इंडेक्सिंग के कारण: पहला [0], दूसरा [1], तीसरा तत्व marks[2] होगा।"
    },
    {
        "id": "arr-e5",
        "question": "What happens if an array is partially initialized, e.g.: int arr[5] = {10, 20};?",
        "questionHindi": "यदि ऐरे को आंशिक मान दिए जाएं (int arr[5] = {10, 20};), तो बाकी तत्वों का क्या होगा?",
        "options": [
            "The remaining uninitialized elements are automatically set to 0",
            "They contain garbage values",
            "Compiler error",
            "They repeat 10 and 20"
        ],
        "correctIndex": 0,
        "explanation": "If any initializer is provided, uninitialized remaining elements are zeroed out automatically.",
        "explanationHindi": "यदि कम से कम एक मान दिया गया हो, तो बाकी बचे सभी तत्व अपने आप 0 से भर दिए जाते हैं।"
    },
    {
        "id": "arr-e6",
        "question": "How can you dynamically determine the number of elements in an array 'arr' in C?",
        "questionHindi": "C में ऐरे 'arr' के तत्वों की कुल संख्या ज्ञात करने का मानक फॉर्मूला क्या है?",
        "options": [
            "sizeof(arr) / sizeof(arr[0])",
            "length(arr)",
            "arr.length",
            "count(arr)"
        ],
        "correctIndex": 0,
        "explanation": "Dividing total array bytes by the byte size of one element yields total element count.",
        "explanationHindi": "कुल ऐरे बाइट्स को एक तत्व के बाइट्स से भाग देकर: sizeof(arr) / sizeof(arr[0])।"
    },
    {
        "id": "arr-e7",
        "question": "Does standard C perform runtime Array Bounds Checking (e.g. accessing arr[15] when size is 10)?",
        "questionHindi": "क्या C भाषा रनटाइम पर ऐरे बाउंड्स चेकिंग (Array Bounds Checking) करती है?",
        "options": [
            "No, C never checks array bounds at runtime; accessing out-of-bounds causes Undefined Behavior / memory corruption",
            "Yes, it throws an ArrayIndexOutOfBoundsException",
            "Yes, it caps the index at 9",
            "Only in debug mode"
        ],
        "correctIndex": 0,
        "explanation": "C gives direct memory access without bounds checking, leading to potential buffer overflows.",
        "explanationHindi": "नहीं, C कभी सीमा जांच नहीं करता; बाहर जाने पर अपरिभाषित व्यवहार या क्रैश होता है।"
    },
    {
        "id": "arr-e8",
        "question": "How is a 2D array (Matrix) with 3 rows and 4 columns declared in C?",
        "questionHindi": "3 पंक्तियों (Rows) और 4 कॉलम (Columns) वाला 2D मैट्रिक्स ऐरे कैसे घोषित किया जाता है?",
        "options": ["int mat[3][4];", "int mat[4][3];", "int mat[3, 4];", "matrix 3x4 mat;"],
        "correctIndex": 0,
        "explanation": "int mat[rows][cols]; specifies row and column dimensions.",
        "explanationHindi": "int mat[3][4]; पहले पंक्ति (3) और फिर कॉलम (4) की संख्या दर्शाता है।"
    },
    {
        "id": "arr-e9",
        "question": "How many total elements are present in a 2D array declared as: float matrix[4][5];?",
        "questionHindi": "float matrix[4][5]; ऐरे में कुल कितने तत्व उपस्थित होंगे?",
        "options": ["9", "20 (4 * 5)", "40", "16"],
        "correctIndex": 1,
        "explanation": "Total elements = rows * cols = 4 * 5 = 20 elements.",
        "explanationHindi": "कुल तत्व = 4 * 5 = 20 तत्व।"
    },
    {
        "id": "arr-e10",
        "question": "How is a string represented in standard C?",
        "questionHindi": "C भाषा में स्ट्रिंग (String) को किस रूप में दर्शाया जाता है?",
        "options": [
            "As an array of characters terminated by a null character ('\\0')",
            "As a built-in 'string' primitive data type",
            "As a linked list of integers",
            "As a binary file"
        ],
        "correctIndex": 0,
        "explanation": "C strings are 1D character arrays ending with the null terminator character '\\0' (ASCII 0).",
        "explanationHindi": "अक्षर ऐरे (char array) के रूप में जिसके अंत में एक नल कैरेक्टर ('\\0') होता है।"
    },
    {
        "id": "arr-e11",
        "question": "What is the ASCII value of the string terminating Null Character ('\\0') in C?",
        "questionHindi": "C भाषा में नल कैरेक्टर ('\\0') का ASCII मान क्या होता है?",
        "options": ["0", "32", "48", "-1"],
        "correctIndex": 0,
        "explanation": "The null character '\\0' has an integer ASCII value of 0.",
        "explanationHindi": "नल कैरेक्टर '\\0' का ASCII मान बिल्कुल 0 होता है।"
    },
    {
        "id": "arr-e12",
        "question": "Which standard library header file contains string manipulation functions like strlen, strcpy, and strcmp?",
        "questionHindi": "strlen, strcpy और strcmp जैसे स्ट्रिंग फंक्शन्स किस हेडर फाइल में होते हैं?",
        "options": ["<string.h>", "<strings.h>", "<stdlib.h>", "<stdio.h>"],
        "correctIndex": 0,
        "explanation": "<string.h> provides standard C string functions.",
        "explanationHindi": "<string.h> हेडर फाइल में स्ट्रिंग फंक्शन्स परिभाषित हैं।"
    },
    {
        "id": "arr-e13",
        "question": "What does the strlen(\"Hello\") function return?",
        "questionHindi": "strlen(\"Hello\") फंक्शन क्या मान लौटाता है?",
        "options": ["5 (the count of characters EXCLUDING the null terminator)", "6", "4", "sizeof(char)"],
        "correctIndex": 0,
        "explanation": "strlen counts characters up to, but not including, the terminating null character: 5.",
        "explanationHindi": "यह नल कैरेक्टर को छोड़कर केवल अक्षरों की संख्या (5) लौटाता है।"
    },
    {
        "id": "arr-e14",
        "question": "What does the Linear Search algorithm do to find a target value in an array?",
        "questionHindi": "लीनियर सर्च (Linear Search) एल्गोरिदम ऐरे में तत्व खोजने के लिए क्या करता है?",
        "options": [
            "Sequentially checks every element from index 0 to N-1 until a match is found or the end is reached",
            "Divides the array in half",
            "Sorts the array first",
            "Jumps in powers of 2"
        ],
        "correctIndex": 0,
        "explanation": "Linear search scans each element sequentially in O(N) time.",
        "explanationHindi": "इंडेक्स 0 से शुरू करके एक-एक करके क्रम से सभी तत्वों की तुलना करता है।"
    },
    {
        "id": "arr-e15",
        "question": "What is the strict prerequisite before Binary Search can be performed on an array?",
        "questionHindi": "ऐरे पर बाइनरी सर्च (Binary Search) लगाने की अनिवार्य पूर्व-शर्त क्या है?",
        "options": [
            "The array MUST be sorted (ascending or descending)",
            "The array must have an even size",
            "The array must contain only positive numbers",
            "The array must be 2D"
        ],
        "correctIndex": 0,
        "explanation": "Binary search divides search space in half at each step and strictly requires sorted data.",
        "explanationHindi": "ऐरे का पहले से सॉर्ट (क्रमबद्ध) होना अनिवार्य है।"
    },
    {
        "id": "arr-e16",
        "question": "What is the primary mechanism of the Bubble Sort algorithm?",
        "questionHindi": "बबल सॉर्ट (Bubble Sort) एल्गोरिदम का मूल सिद्धांत क्या है?",
        "options": [
            "Repeatedly stepping through the array, comparing adjacent elements and swapping them if they are in the wrong order",
            "Inserting elements into a binary tree",
            "Selecting a random pivot element",
            "Splitting array into buckets"
        ],
        "correctIndex": 0,
        "explanation": "Bubble sort bubbles the largest unsorted element to the end through adjacent swaps.",
        "explanationHindi": "पास-पास वाले तत्वों की तुलना करके यदि वे गलत क्रम में हों तो उन्हें आपस में बदलना।"
    },
    {
        "id": "arr-e17",
        "question": "How are 2D arrays traversed using loops in C?",
        "questionHindi": "C में 2D ऐरे को लूप्स द्वारा कैसे ट्रेवर्स (घूमा) किया जाता है?",
        "options": [
            "Using nested loops: an outer loop for rows and an inner loop for columns",
            "Using a single while loop with no condition",
            "Using recursion only",
            "Using printf() without loop"
        ],
        "correctIndex": 0,
        "explanation": "Nested loops: outer loop iterates through rows, inner loop iterates columns of each row.",
        "explanationHindi": "नेस्टेड लूप्स द्वारा: बाहरी लूप पंक्तियों (Rows) के लिए और अंदरूनी लूप कॉलम (Cols) के लिए।"
    },
    {
        "id": "arr-e18",
        "question": "What happens if you assign one array to another directly using the assignment operator (e.g. arr1 = arr2;)?",
        "questionHindi": "यदि एक ऐरे को सीधे दूसरे ऐरे में असाइन किया जाए (arr1 = arr2;), तो क्या होगा?",
        "options": [
            "Compilation error: array name is a non-modifiable constant pointer (invalid L-value)",
            "All elements copy over automatically",
            "Both arrays swap sizes",
            "Memory deletes"
        ],
        "correctIndex": 0,
        "explanation": "Array names are non-modifiable L-values; you must copy elements individually or use memcpy().",
        "explanationHindi": "कम्पाइलर एरर देगा क्योंकि ऐरे का नाम एक स्थिर पॉइंटर होता है जिसे असाइन नहीं किया जा सकता।"
    },
    {
        "id": "arr-e19",
        "question": "What function copies the contents of source string 'src' into destination string 'dest'?",
        "questionHindi": "सोर्स स्ट्रिंग को डेस्टिनेशन स्ट्रिंग में कॉपी करने वाला फंक्शन कौन-सा है?",
        "options": ["strcpy(dest, src)", "strcat(dest, src)", "strcmp(dest, src)", "copy(dest, src)"],
        "correctIndex": 0,
        "explanation": "strcpy(dest, src) copies src including the null terminator into dest.",
        "explanationHindi": "strcpy(dest, src) फंक्शन स्ट्रिंग को कॉपी करता है।"
    },
    {
        "id": "arr-e20",
        "question": "What function concatenates (appends) source string 'src' to the end of string 'dest'?",
        "questionHindi": "एक स्ट्रिंग के अंत में दूसरी स्ट्रिंग को जोड़ने वाला फंक्शन कौन-सा है?",
        "options": ["strcat(dest, src)", "strcpy(dest, src)", "strrev(dest)", "append(dest, src)"],
        "correctIndex": 0,
        "explanation": "strcat appends src to dest, overwriting dest's null terminator and adding a new one at end.",
        "explanationHindi": "strcat(dest, src) स्ट्रिंग्स को आपस में जोड़ता है (Concatenation)।"
    }
]

arr_hard = [
    {
        "id": "arr-h1",
        "question": "What is the memory order in which multi-dimensional arrays are stored in C?",
        "questionHindi": "C भाषा में बहु-आयामी (2D/3D) ऐरे मेमोरी में किस क्रम में स्टोर होते हैं?",
        "options": [
            "Row-Major Order (Row 0 elements stored sequentially, followed immediately by Row 1, Row 2, etc.)",
            "Column-Major Order",
            "Diagonal Order",
            "Scattered random allocation"
        ],
        "correctIndex": 0,
        "explanation": "C strictly uses Row-Major Order for contiguous multi-dimensional storage.",
        "explanationHindi": "रो-मेजर ऑर्डर (Row-Major Order): पहले पहली पंक्ति के सभी तत्व, फिर दूसरी पंक्ति के, इत्यादि।"
    },
    {
        "id": "arr-h2",
        "question": "What is the address calculation formula for element arr[i][j] in a 2D array with C columns?",
        "questionHindi": "C कॉलम वाले 2D ऐरे में तत्व arr[i][j] का मेमोरी पता निकालने का फॉर्मूला क्या है?",
        "options": [
            "Address = Base_Address + (i * C + j) * sizeof(element)",
            "Address = Base_Address + (j * C + i) * sizeof(element)",
            "Address = Base_Address + i + j",
            "Address = (Base_Address * i) + j"
        ],
        "correctIndex": 0,
        "explanation": "Row-major addressing: skip 'i' complete rows of size C, plus column offset 'j': Base + (i*C + j)*size.",
        "explanationHindi": "Base_Address + (i * C + j) * sizeof(element)।"
    },
    {
        "id": "arr-h3",
        "question": "Why does passing an array to a function result in 'Array Decay'?",
        "questionHindi": "फंक्शन में ऐरे पास करने पर 'ऐरे डिके' (Array Decay) क्यों होता है?",
        "options": [
            "The array name automatically decays (converts) into a pointer to its first element (&arr[0])",
            "The array memory is erased",
            "The array size shrinks to zero",
            "Elements convert to characters"
        ],
        "correctIndex": 0,
        "explanation": "Arrays passed by value decay into pointers; sizeof(arr) inside the function yields pointer size (8 bytes).",
        "explanationHindi": "ऐरे का नाम अपने आप पहले तत्व के पॉइंटर (&arr[0]) में बदल जाता है, जिससे उसका कुल आकार खो जाता है।"
    },
    {
        "id": "arr-h4",
        "question": "What is a Variable Length Array (VLA) introduced in C99?",
        "questionHindi": "C99 में प्रस्तुत 'वेरिएबल लेंथ ऐरे' (VLA) क्या होता है?",
        "options": [
            "An array whose dimension size is determined at runtime based on a variable value and allocated on the Stack",
            "A dynamically resizable heap array like vector",
            "An array with unlimited elements",
            "An array stored on hard drive"
        ],
        "correctIndex": 0,
        "explanation": "VLAs are automatic stack-allocated arrays whose sizes are evaluated at runtime (e.g. int arr[n];).",
        "explanationHindi": "रनटाइम पर तय आकार वाला ऐरे जो स्टैक पर बनता है (C11 में यह वैकल्पिक कर दिया गया)।"
    },
    {
        "id": "arr-h5",
        "question": "Why is traversing a 2D matrix row-by-row (mat[i][j]) drastically faster than column-by-column (mat[j][i])?",
        "questionHindi": "2D मैट्रिक्स को पंक्ति अनुसार (mat[i][j]) पढ़ना कॉलम अनुसार (mat[j][i]) पढ़ने से बहुत तेज क्यों होता है?",
        "options": [
            "Spatial Locality and CPU Cache Lines: contiguous memory loads into fast CPU cache; column traversal causes constant cache misses",
            "C compilers only support row loops",
            "Columns take double RAM",
            "Rows are sorted automatically"
        ],
        "correctIndex": 0,
        "explanation": "Row-major layout matches spatial cache line loading, maximizing cache hits.",
        "explanationHindi": "मेमोरी में लगातार होने से सीपीयू कैश (CPU Cache) का पूरा फायदा मिलता है और कैश मिस नहीं होते।"
    },
    {
        "id": "arr-h6",
        "question": "Why is 'strncpy()' safer than 'strcpy()'?",
        "questionHindi": "'strcpy()' की तुलना में 'strncpy()' अधिक सुरक्षित क्यों है?",
        "options": [
            "It accepts a maximum byte count parameter 'n' to prevent destination buffer overflow",
            "It automatically encrypts strings",
            "It is 5x faster",
            "It converts text to uppercase"
        ],
        "correctIndex": 0,
        "explanation": "strncpy(dest, src, n) caps the copy length to prevent buffer overflow.",
        "explanationHindi": "यह अधिकतम 'n' अक्षरों की सीमा तय करता है जिससे डेस्टिनेशन बफर ओवरफ्लो नहीं होता।"
    },
    {
        "id": "arr-h7",
        "question": "What does strcmp(str1, str2) return when str1 is lexicographically less than str2?",
        "questionHindi": "जब str1 वर्णमाला क्रम में str2 से छोटी होती है, तो strcmp(str1, str2) क्या लौटाता है?",
        "options": ["A negative integer (< 0)", "0", "A positive integer (> 0)", "false"],
        "correctIndex": 0,
        "explanation": "strcmp returns < 0 if str1 < str2, 0 if str1 == str2, and > 0 if str1 > str2.",
        "explanationHindi": "एक ऋणात्मक संख्या (< 0) लौटाता है।"
    },
    {
        "id": "arr-h8",
        "question": "What is the mathematical condition for Matrix Multiplication (A * B) to be valid?",
        "questionHindi": "दो मैट्रिसेस (A * B) के गुणा के लिए क्या गणितीय शर्त अनिवार्य है?",
        "options": [
            "The number of Columns in Matrix A must strictly equal the number of Rows in Matrix B",
            "Both matrices must be square",
            "Both must have identical dimensions",
            "All elements must be positive"
        ],
        "correctIndex": 0,
        "explanation": "Columns of A must equal Rows of B; resulting matrix has dimensions Rows_A x Cols_B.",
        "explanationHindi": "मैट्रिक्स A के कॉलमों की संख्या मैट्रिक्स B की पंक्तियों के बिल्कुल बराबर होनी चाहिए।"
    },
    {
        "id": "arr-h9",
        "question": "What is the time complexity of multiplying two N x N square matrices using standard nested loops?",
        "questionHindi": "मानक नेस्टेड लूप्स द्वारा दो N x N मैट्रिसेस के गुणा की टाइम कॉम्प्लेक्सिटी क्या होती है?",
        "options": ["O(N^3)", "O(N^2)", "O(N log N)", "O(N)"],
        "correctIndex": 0,
        "explanation": "Standard 3 nested loops (i, j, k) for N x N matrix multiplication require O(N^3) time.",
        "explanationHindi": "तीन नेस्टेड लूप्स चलने के कारण समय जटिलता O(N^3) होती है।"
    },
    {
        "id": "arr-h10",
        "question": "In multidimensional array parameter declarations, which dimension size CAN be omitted in C?",
        "questionHindi": "फंक्शन में 2D ऐरे पैरामीटर पास करते समय कौन-सा आयाम खाली छोड़ा जा सकता है?",
        "options": [
            "Only the FIRST dimension (e.g. void func(int mat[][4]))",
            "Only the second dimension",
            "Both dimensions",
            "Neither dimension can be omitted"
        ],
        "correctIndex": 0,
        "explanation": "Compiler needs column width for pointer arithmetic step calculation: int mat[][4] is valid.",
        "explanationHindi": "केवल पहला आयाम (Rows) छोड़ा जा सकता है; कॉलम की चौड़ाई देना अनिवार्य है।"
    },
    {
        "id": "arr-h11",
        "question": "What is the output of the following pointer expression on an array: *(arr + 3)?",
        "questionHindi": "ऐरे पर पॉइंटर एक्सप्रेशन *(arr + 3) का मान किसके बिल्कुल बराबर होता है?",
        "options": ["arr[3]", "arr[0] + 3", "&arr[3]", "3"],
        "correctIndex": 0,
        "explanation": "Array indexing arr[i] is syntactically defined as *(arr + i).",
        "explanationHindi": "*(arr + 3) बिल्कुल arr[3] के समान होता है (इंडेक्स 3 का मान)।"
    },
    {
        "id": "arr-h12",
        "question": "Can negative array indexing ever be valid in C (e.g. p[-1])?",
        "questionHindi": "क्या C में नकारात्मक इंडेक्सिंग (जैसे p[-1]) कभी मान्य हो सकती है?",
        "options": [
            "Yes, if 'p' is a pointer pointing into an array past index 0 (e.g. int *p = &arr[2]; p[-1] accesses arr[1])",
            "No, negative indices cause compilation error",
            "Negative index accesses from end of array like Python",
            "Only in C++"
        ],
        "correctIndex": 0,
        "explanation": "p[-1] means *(p - 1); valid if p points after index 0.",
        "explanationHindi": "हाँ, यदि पॉइंटर ऐरे के बीच में हो, तो p[-1] पीछे वाले तत्व को एक्सेस कर सकता है।"
    },
    {
        "id": "arr-h13",
        "question": "What is the worst-case time complexity of the Bubble Sort algorithm on an array of size N?",
        "questionHindi": "N तत्वों के ऐरे पर बबल सॉर्ट की वर्स्ट-केस (Worst-case) टाइम कॉम्प्लेक्सिटी क्या होती है?",
        "options": ["O(N^2)", "O(N log N)", "O(N)", "O(1)"],
        "correctIndex": 0,
        "explanation": "In worst case (reverse sorted array), bubble sort makes N*(N-1)/2 comparisons: O(N^2).",
        "explanationHindi": "उल्टे क्रम में होने पर बबल सॉर्ट को O(N^2) समय लगता है।"
    },
    {
        "id": "arr-h14",
        "question": "How can Bubble Sort be optimized to achieve O(N) best-case time complexity on an already sorted array?",
        "questionHindi": "पहले से सॉर्ट किए गए ऐरे पर बबल सॉर्ट को O(N) में पूरा करने के लिए क्या ऑप्टिमाइजेशन किया जाता है?",
        "options": [
            "Use a 'swapped' boolean flag; if a full pass completes with 0 swaps, break out of the loop early",
            "Divide array in half",
            "Run backwards",
            "Use recursion"
        ],
        "correctIndex": 0,
        "explanation": "If no swaps occurred in a pass, the array is already sorted and sorting terminates early.",
        "explanationHindi": "एक फ्लैग (swapped) रखकर; यदि किसी राउंड में कोई अदला-बदली न हो तो लूप को तुरंत रोक देना।"
    },
    {
        "id": "arr-h15",
        "question": "What is the time complexity of Binary Search on a sorted array of N elements?",
        "questionHindi": "सॉर्ट किए गए N तत्वों पर बाइनरी सर्च की टाइम कॉम्प्लेक्सिटी क्या होती है?",
        "options": ["O(log N)", "O(N)", "O(N^2)", "O(1)"],
        "correctIndex": 0,
        "explanation": "Binary search halves the search space each step: log2(N) steps = O(log N).",
        "explanationHindi": "हर कदम पर खोज का क्षेत्र आधा होने के कारण O(log N) समय लगता है।"
    },
    {
        "id": "arr-h16",
        "question": "What is an Array of Pointers to Strings (char *names[]) useful for compared to a 2D char array (char names[][20])?",
        "questionHindi": "2D चार ऐरे की तुलना में पॉइंटर्स के ऐरे (char *names[]) का क्या बड़ा लाभ है?",
        "options": [
            "Prevents wasting memory on fixed row widths for short strings (Jagged array memory efficiency)",
            "It is 10x slower",
            "Strings cannot be printed",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Pointer arrays point to variable-length string literals without fixed rectangular padding.",
        "explanationHindi": "अलग-अलग लंबाई की स्ट्रिंग्स के लिए खाली जगह बर्बाद नहीं होती (मेमोरी की बचत)।"
    },
    {
        "id": "arr-h17",
        "question": "What is the memory size of: char str[] = \"Code\";?",
        "questionHindi": "char str[] = \"Code\"; का मेमोरी आकार (sizeof) कितना होगा?",
        "options": ["5 bytes (4 letters + 1 null terminator '\\0')", "4 bytes", "8 bytes", "1 byte"],
        "correctIndex": 0,
        "explanation": "'C','o','d','e' + '\\0' occupies 5 bytes in memory.",
        "explanationHindi": "4 अक्षर + 1 नल कैरेक्टर ('\\0') = कुल 5 बाइट्स।"
    },
    {
        "id": "arr-h18",
        "question": "What is the difference between: char a[] = \"Hello\"; and char *p = \"Hello\";?",
        "questionHindi": "char a[] = \"Hello\"; और char *p = \"Hello\"; में क्या महत्वपूर्ण अंतर है?",
        "options": [
            "'a[]' is a modifiable array on the stack; '*p' points to a read-only string literal in the text segment (modifying p[0] causes crash)",
            "Both are modifiable",
            "'*p' is stored on heap",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "String literals are read-only; modifying char* literal pointer causes Segmentation Fault.",
        "explanationHindi": "a[] स्टैक पर परिवर्तनीय ऐरे है; *p केवल पढ़ने योग्य लिटरल की ओर इशारा करता है जिसे बदलना क्रैश करेगा।"
    },
    {
        "id": "arr-h19",
        "question": "What is the result of expression: 2[arr] in C?",
        "questionHindi": "C भाषा में एक्सप्रेशन 2[arr] का क्या मान होगा?",
        "options": [
            "Exactly identical to arr[2] (because both translate to *(2 + arr) == *(arr + 2))",
            "Syntax error",
            "Multiplies array by 2",
            "Accesses index 0 twice"
        ],
        "correctIndex": 0,
        "explanation": "Array subscripting is commutative: arr[i] == *(arr + i) == *(i + arr) == i[arr].",
        "explanationHindi": "यह arr[2] के बिल्कुल समान है क्योंकि दोनों का अर्थ *(arr + 2) ही होता है।"
    },
    {
        "id": "arr-h20",
        "question": "What does the function 'strtok()' in <string.h> do?",
        "questionHindi": "<string.h> में 'strtok()' फंक्शन क्या कार्य करता है?",
        "options": [
            "Splits a string into a sequence of tokens separated by specified delimiter characters",
            "Calculates string checksum",
            "Converts string to uppercase",
            "Encrypts string"
        ],
        "correctIndex": 0,
        "explanation": "strtok breaks strings into tokens based on delimiters by replacing delimiters with '\\0'.",
        "explanationHindi": "निर्धारित विभाजक (Delimiters) के आधार पर स्ट्रिंग को छोटे-छोटे टुकड़ों (Tokens) में तोड़ता है।"
    }
]

register("array", arr_easy, arr_hard)
print("Registered Topic 9: array")

# -------------------------------------------------------------
# TOPIC 10: pointer (Pointers & Direct Memory Addressing)
# -------------------------------------------------------------
ptr_easy = [
    {
        "id": "ptr-e1",
        "question": "What is a Pointer in C?",
        "questionHindi": "C भाषा में पॉइंटर (Pointer) क्या होता है?",
        "options": [
            "A variable that stores the memory address of another variable",
            "A variable that only stores decimal fractions",
            "A special keyboard key",
            "A monitor cursor position"
        ],
        "correctIndex": 0,
        "explanation": "A pointer variable holds the direct hexadecimal memory address of another variable in RAM.",
        "explanationHindi": "एक ऐसा वेरिएबल जो किसी दूसरे वेरिएबल का मेमोरी एड्रेस (पता) स्टोर करता है।"
    },
    {
        "id": "ptr-e2",
        "question": "Which operator is used to obtain the Memory Address of a variable in C?",
        "questionHindi": "किसी वेरिएबल का मेमोरी एड्रेस (पता) प्राप्त करने के लिए कौन-सा ऑपरेटर उपयोग होता है?",
        "options": ["& (Address-of operator)", "* (Asterisk)", "-> (Arrow)", "% (Modulus)"],
        "correctIndex": 0,
        "explanation": "& (ampersand) is the address-of operator.",
        "explanationHindi": "& (Address-of) ऑपरेटर किसी वेरिएबल का मेमोरी पता लौटाता है।"
    },
    {
        "id": "ptr-e3",
        "question": "Which operator is used to access the Value at the address pointed to by a pointer (Dereference)?",
        "questionHindi": "पॉइंटर द्वारा इंगित पते पर मौजूद मान को प्राप्त करने (Dereference) के लिए कौन-सा ऑपरेटर है?",
        "options": ["* (Dereference / Indirection operator)", "& (Address-of)", ". (Dot)", "# (Hash)"],
        "correctIndex": 0,
        "explanation": "* (asterisk) dereferences a pointer to access the value at the target memory location.",
        "explanationHindi": "* (डिरिफ्रेंस ऑपरेटर) पॉइंटर के पते पर मौजूद वास्तविक डेटा को पढ़ता या बदलता है।"
    },
    {
        "id": "ptr-e4",
        "question": "How do you declare a pointer to an integer named 'ptr' in C?",
        "questionHindi": "C में 'ptr' नाम का इंटीजर पॉइंटर कैसे घोषित किया जाता है?",
        "options": ["int *ptr;", "int ptr*;", "pointer int ptr;", "int &ptr;"],
        "correctIndex": 0,
        "explanation": "int *ptr; declares ptr as a pointer to an integer.",
        "explanationHindi": "int *ptr; पूर्णांक पॉइंटर की मानक घोषणा है।"
    },
    {
        "id": "ptr-e5",
        "question": "If int x = 25; int *p = &x; what does '*p' evaluate to?",
        "questionHindi": "यदि int x = 25; int *p = &x; हो, तो '*p' का मान क्या होगा?",
        "options": ["25 (the value of x)", "The memory address of x", "0", "NULL"],
        "correctIndex": 0,
        "explanation": "*p dereferences the address of x and evaluates to x's value (25).",
        "explanationHindi": "*p उस पते पर रखी x की वैल्यू यानी 25 को दर्शाएगा।"
    },
    {
        "id": "ptr-e6",
        "question": "What is a NULL Pointer in C?",
        "questionHindi": "C भाषा में NULL पॉइंटर क्या होता है?",
        "options": [
            "A pointer explicitly assigned to point to nothing / address 0 ((void *)0)",
            "A broken corrupted pointer",
            "A pointer containing random garbage",
            "A pointer to the screen"
        ],
        "correctIndex": 0,
        "explanation": "A NULL pointer does not point to any valid object or function.",
        "explanationHindi": "एक ऐसा पॉइंटर जो किसी भी मान्य मेमोरी पते की ओर इशारा नहीं करता (पता 0)।"
    },
    {
        "id": "ptr-e7",
        "question": "What is a 'Wild Pointer' in C?",
        "questionHindi": "C भाषा में 'वाइल्ड पॉइंटर' (Wild Pointer) किसे कहते हैं?",
        "options": [
            "An uninitialized pointer variable containing a random unpredictable garbage address",
            "A pointer that points to animals",
            "A pointer declared inside a loop",
            "A pointer that changes types"
        ],
        "correctIndex": 0,
        "explanation": "An uninitialized pointer holds random memory garbage; dereferencing it causes crashes.",
        "explanationHindi": "बिना इनिशियलाइज किया गया पॉइंटर जो किसी भी अज्ञात कचरा पते की ओर इशारा करता है।"
    },
    {
        "id": "ptr-e8",
        "question": "What is a 'Dangling Pointer' in C?",
        "questionHindi": "C में 'डैंगलिंग पॉइंटर' (Dangling Pointer) क्या होता है?",
        "options": [
            "A pointer that continues to point to a memory location that has already been deallocated or freed",
            "A pointer hanging in infinite loop",
            "A pointer to another pointer",
            "A NULL pointer"
        ],
        "correctIndex": 0,
        "explanation": "A dangling pointer points to memory that was deallocated (via free() or popped stack).",
        "explanationHindi": "वह पॉइंटर जो उस मेमोरी की ओर इशारा करता रहता है जिसे पहले ही डिलीट/मुक्त किया जा चुका है।"
    },
    {
        "id": "ptr-e9",
        "question": "What is a 'Pointer to Pointer' (Double Pointer) in C?",
        "questionHindi": "C में डबल पॉइंटर (Pointer to Pointer) क्या होता है?",
        "options": [
            "A pointer that stores the memory address of another pointer variable (e.g. int **pptr;)",
            "Two pointers added together",
            "A pointer to a 2D array",
            "A pointer twice as large in bytes"
        ],
        "correctIndex": 0,
        "explanation": "A double pointer holds the address of a pointer variable.",
        "explanationHindi": "एक ऐसा पॉइंटर जो किसी दूसरे पॉइंटर वेरिएबल का मेमोरी एड्रेस स्टोर करता है।"
    },
    {
        "id": "ptr-e10",
        "question": "What is the difference between Call by Value and Call by Reference (Address) in C?",
        "questionHindi": "कॉल बाय वैल्यू और कॉल बाय रेफरेंस में क्या अंतर है?",
        "options": [
            "Call by Value passes copies (caller variables unaffected); Call by Reference passes pointers so the function can directly modify caller variables",
            "Call by Value is for pointers only",
            "Call by Reference is in Python only",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "C natively passes by value; passing pointers simulates call by reference to modify originals.",
        "explanationHindi": "कॉल बाय वैल्यू कॉपी भेजता है; कॉल बाय रेफरेंस पॉइंटर भेजकर मूल वेरिएबल्स को बदलने की अनुमति देता है।"
    },
    {
        "id": "ptr-e11",
        "question": "In the classic swap function 'void swap(int *a, int *b)', how are variables swapped in main()?",
        "questionHindi": "swap(&x, &y) फंक्शन में पॉइंटर्स के जरिए x और y का मान कैसे बदला जाता है?",
        "options": [
            "int temp = *a; *a = *b; *b = temp;",
            "int temp = a; a = b; b = temp;",
            "a = b;",
            "*a = &b;"
        ],
        "correctIndex": 0,
        "explanation": "Dereferencing *a and *b directly swaps the values at x and y's memory locations.",
        "explanationHindi": "temp = *a; *a = *b; *b = temp; द्वारा सीधे मूल पतों पर रखे मान बदल दिए जाते हैं।"
    },
    {
        "id": "ptr-e12",
        "question": "What is the size of an 'int*' pointer versus a 'char*' pointer on a 64-bit operating system?",
        "questionHindi": "64-बिट सिस्टम पर 'int*' और 'char*' पॉइंटर्स के आकार में क्या अंतर होता है?",
        "options": [
            "Both are exactly 8 bytes (all memory addresses on 64-bit systems are 64 bits)",
            "int* is 4 bytes; char* is 1 byte",
            "int* is 8 bytes; char* is 2 bytes",
            "char* is larger"
        ],
        "correctIndex": 0,
        "explanation": "All pointers store addresses; on 64-bit architectures, every pointer is 8 bytes regardless of type.",
        "explanationHindi": "दोनों का आकार ठीक 8 बाइट्स होता है क्योंकि 64-बिट में सभी मेमोरी पते 8 बाइट्स के होते हैं।"
    },
    {
        "id": "ptr-e13",
        "question": "What does a 'void*' pointer represent in C?",
        "questionHindi": "C भाषा में 'void*' पॉइंटर क्या होता है?",
        "options": [
            "A generic pointer that can point to any data type without type-specific awareness",
            "A broken pointer",
            "A pointer to zero",
            "A pointer that takes zero bytes"
        ],
        "correctIndex": 0,
        "explanation": "void* is a generic raw memory address pointer, returned by functions like malloc().",
        "explanationHindi": "एक जेनेरिक (सामान्य) पॉइंटर जो किसी भी डेटा प्रकार के मेमोरी पते को रख सकता है।"
    },
    {
        "id": "ptr-e14",
        "question": "Can you directly dereference a 'void*' pointer (e.g. *vptr) without typecasting?",
        "questionHindi": "क्या बिना टाइपकास्ट किए 'void*' पॉइंटर को सीधे डिरिफ्रेंस (*vptr) किया जा सकता है?",
        "options": [
            "No, compilation error: the compiler has no knowledge of how many bytes to read or what type it is",
            "Yes, always",
            "Only for integers",
            "Only in GCC"
        ],
        "correctIndex": 0,
        "explanation": "Compiler cannot know the target object's size; void* must be cast to a concrete type pointer first.",
        "explanationHindi": "नहीं, कम्पाइलर को पता नहीं होता कि कितने बाइट्स पढ़ने हैं; पहले टाइपकास्ट करना अनिवार्य है।"
    },
    {
        "id": "ptr-e15",
        "question": "If 'ptr' points to arr[0], what element does '*(ptr + 2)' access?",
        "questionHindi": "यदि ptr ऐरे के पहले तत्व (arr[0]) पर है, तो '*(ptr + 2)' किसे एक्सेस करेगा?",
        "options": ["arr[2]", "arr[0] + 2", "arr[3]", "arr[1]"],
        "correctIndex": 0,
        "explanation": "Pointer arithmetic offsets by element size; ptr + 2 points to arr[2].",
        "explanationHindi": "यह arr[2] (तीसरे तत्व) को एक्सेस करेगा।"
    },
    {
        "id": "ptr-e16",
        "question": "What happens when an integer pointer 'ptr' is incremented using 'ptr++'?",
        "questionHindi": "जब इंटीजर पॉइंटर (int *ptr) पर 'ptr++' किया जाता है, तो मेमोरी एड्रेस कितना आगे बढ़ता है?",
        "options": [
            "Advances by sizeof(int) bytes (typically 4 bytes), NOT by 1 byte",
            "Advances by strictly 1 byte",
            "Advances by 8 bytes always",
            "Does not advance"
        ],
        "correctIndex": 0,
        "explanation": "Pointer arithmetic scales by sizeof(type); ptr++ adds sizeof(*ptr) to the address.",
        "explanationHindi": "एड्रेस 1 बाइट नहीं बल्कि उस डेटा टाइप के आकार (int के लिए 4 बाइट्स) आगे बढ़ता है।"
    },
    {
        "id": "ptr-e17",
        "question": "Can you perform addition between TWO pointers in C (e.g. ptr1 + ptr2)?",
        "questionHindi": "क्या C में दो पॉइंटर्स को आपस में जोड़ा जा सकता है (ptr1 + ptr2)?",
        "options": [
            "No, adding two pointers is completely meaningless and is a compilation error in C",
            "Yes, it adds the memory addresses",
            "Only for char pointers",
            "Only in 64-bit systems"
        ],
        "correctIndex": 0,
        "explanation": "Adding two memory addresses makes no sense; pointer addition is forbidden.",
        "explanationHindi": "नहीं, दो मेमोरी पतों को जोड़ना अर्थहीन है और C में सिंटेक्स एरर देता है।"
    },
    {
        "id": "ptr-e18",
        "question": "Can you subtract two pointers that point to elements of the same array (ptr2 - ptr1)?",
        "questionHindi": "क्या एक ही ऐरे के दो पॉइंटर्स को आपस में घटाया जा सकता है (ptr2 - ptr1)?",
        "options": [
            "Yes, it returns the count of elements between them (of type ptrdiff_t)",
            "No, subtraction is illegal",
            "It gives byte address sum",
            "It deletes the elements"
        ],
        "correctIndex": 0,
        "explanation": "Subtracting two pointers to the same array yields the number of elements between them.",
        "explanationHindi": "हाँ, यह उनके बीच मौजूद तत्वों की संख्या (ptrdiff_t) लौटाता है।"
    },
    {
        "id": "ptr-e19",
        "question": "What is the relationship between an array name 'arr' and pointers in C?",
        "questionHindi": "C में ऐरे नाम 'arr' और पॉइंटर्स के बीच क्या संबंध होता है?",
        "options": [
            "The array name acts as a constant pointer to its first element (arr == &arr[0])",
            "Array name is a variable that can be reassigned",
            "There is no relationship",
            "Array name is a void pointer"
        ],
        "correctIndex": 0,
        "explanation": "An array name acts as a constant pointer to its base address &arr[0].",
        "explanationHindi": "ऐरे का नाम अपने पहले तत्व के पते (&arr[0]) के स्थिर पॉइंटर की तरह काम करता है।"
    },
    {
        "id": "ptr-e20",
        "question": "How do you safely avoid a Dangling Pointer after calling free(ptr)?",
        "questionHindi": "free(ptr) कॉल करने के बाद डैंगलिंग पॉइंटर से बचने का सबसे सुरक्षित तरीका क्या है?",
        "options": [
            "Immediately assign ptr = NULL; after freeing",
            "Delete the source file",
            "Turn off computer",
            "Declare ptr again"
        ],
        "correctIndex": 0,
        "explanation": "Setting ptr = NULL guarantees that any subsequent check (if (ptr != NULL)) will detect it.",
        "explanationHindi": "मेमोरी खाली करते ही तुरंत 'ptr = NULL;' कर देना चाहिए ताकि वह अमान्य पते पर न रहे।"
    }
]

ptr_hard = [
    {
        "id": "ptr-h1",
        "question": "What is the difference between 'int *arr[5]' and 'int (*ptr)[5]' in C?",
        "questionHindi": "C में 'int *arr[5]' और 'int (*ptr)[5]' में क्या बड़ा अंतर है?",
        "options": [
            "'int *arr[5]' is an array of 5 integer pointers; 'int (*ptr)[5]' is a pointer to an array of 5 integers",
            "Both are identical",
            "'int (*ptr)[5]' is an array of pointers",
            "Neither is valid syntax"
        ],
        "correctIndex": 0,
        "explanation": "Brackets bind tighter than *; parentheses (*ptr)[5] make ptr a pointer to an array of 5 ints.",
        "explanationHindi": "int *arr[5] पाँच पॉइंटर्स का ऐरे है; int (*ptr)[5] पाँच पूर्णांकों के एक पूरे ऐरे का पॉइंटर है।"
    },
    {
        "id": "ptr-h2",
        "question": "What is a Function Pointer in C and how is it declared for a function returning int and taking two ints?",
        "questionHindi": "फंक्शन पॉइंटर क्या है और int func(int, int) के लिए इसे कैसे घोषित किया जाता है?",
        "options": [
            "int (*func_ptr)(int, int);",
            "int *func_ptr(int, int);",
            "func_ptr*(int, int);",
            "int func_ptr*(int, int);"
        ],
        "correctIndex": 0,
        "explanation": "int (*func_ptr)(int, int) holds the entry memory address of an executable function.",
        "explanationHindi": "int (*func_ptr)(int, int); कोड मेमोरी में फंक्शन का निष्पादन पता स्टोर करता है।"
    },
    {
        "id": "ptr-h3",
        "question": "What is the 'Strict Aliasing Rule' in C99 regarding pointer types?",
        "questionHindi": "C99 में पॉइंटर टाइप्स से संबंधित 'स्ट्रिक्ट एलियासिंग नियम' क्या है?",
        "options": [
            "Two pointers of different types (e.g. int* and float*) are assumed not to point to the same memory location, enabling aggressive compiler optimization",
            "Pointers must have strict English names",
            "Pointers cannot point to structs",
            "Aliasing is strictly forbidden for chars"
        ],
        "correctIndex": 0,
        "explanation": "Strict aliasing permits compilers to optimize assuming incompatible types do not alias the same memory.",
        "explanationHindi": "कम्पाइलर यह मानकर ऑप्टिमाइज़ करता है कि अलग-अलग टाइप के दो पॉइंटर्स एक ही मेमोरी को नहीं दर्शाते।"
    },
    {
        "id": "ptr-h4",
        "question": "Why is 'char*' allowed to alias any other data type pointer without violating the strict aliasing rule?",
        "questionHindi": "'char*' को स्ट्रिक्ट एलियासिंग नियम तोड़े बिना किसी भी प्रकार की मेमोरी पढ़ने की अनुमति क्यों है?",
        "options": [
            "ISO C explicitly permits character types (char*, unsigned char*) to inspect the raw byte representation of any object",
            "char is 4 bytes",
            "char has no pointers",
            "It is a compiler bug"
        ],
        "correctIndex": 0,
        "explanation": "C standard explicitly carves out an exception for character types to allow byte-level inspection.",
        "explanationHindi": "क्योंकि C मानक स्पष्ट अनुमति देता है कि char* किसी भी ऑब्जेक्ट की कच्ची बाइट्स को देख सकता है।"
    },
    {
        "id": "ptr-h5",
        "question": "What is 'Memory Endianness' and how can a pointer verify whether a machine is Little Endian or Big Endian?",
        "questionHindi": "मेमोरी एंडियननेस क्या है और पॉइंटर से लिटल-एंडियन या बिग-एंडियन की जांच कैसे की जाती है?",
        "options": [
            "int x = 1; char *c = (char*)&x; if (*c == 1) it is Little Endian (least significant byte stored at lowest address)",
            "By checking sizeof(int)",
            "By checking if float is 4 bytes",
            "By running a loop"
        ],
        "correctIndex": 0,
        "explanation": "Little Endian stores the lowest byte (0x01) at the lowest memory address.",
        "explanationHindi": "int x = 1; का char* बनाकर यदि *c == 1 मिले तो मशीन लिटल-एंडियन (Little Endian) है।"
    },
    {
        "id": "ptr-h6",
        "question": "Why does attempting to modify a string literal via a pointer cause a Segmentation Fault (e.g. char *s = \"hello\"; s[0] = 'H';)?",
        "questionHindi": "char *s = \"hello\"; s[0] = 'H'; करने पर सेगमेंटेशन फॉल्ट (Crash) क्यों आता है?",
        "options": [
            "String literals are stored in the Read-Only Data/Text Segment (.rodata) of process memory; writing to it triggers a CPU hardware protection fault",
            "The letter 'H' is too large",
            "Pointers cannot index arrays",
            "s is a NULL pointer"
        ],
        "correctIndex": 0,
        "explanation": "String literals are placed in read-only pages; modifying them causes an OS SIGSEGV signal.",
        "explanationHindi": "स्ट्रिंग लिटरल्स केवल पढ़ने योग्य (.rodata) मेमोरी में होते हैं; उन पर लिखना सीपीयू क्रैश कर देता है।"
    },
    {
        "id": "ptr-h7",
        "question": "Why must you pass a Pointer to a Pointer (Double Pointer) when a function dynamically allocates memory for the caller?",
        "questionHindi": "फंक्शन द्वारा कॉलर के लिए डायनामिक मेमोरी आवंटित करते समय डबल पॉइंटर (int **p) क्यों पास करना पड़ता है?",
        "options": [
            "In C, all arguments are passed by value; to modify the caller's pointer variable itself, you must pass its address (&ptr)",
            "malloc requires double pointers",
            "Double pointers allocate twice as much RAM",
            "Single pointers cannot hold addresses"
        ],
        "correctIndex": 0,
        "explanation": "To change what a caller's pointer points to inside a helper function, you must pass the pointer's address.",
        "explanationHindi": "क्योंकि पॉइंटर के अपने पते को बदलने के लिए उसका भी पता (डबल पॉइंटर) पास करना अनिवार्य है।"
    },
    {
        "id": "ptr-h8",
        "question": "What is the output of the following pointer code?\nint a[] = {10, 20, 30, 40};\nint *p = a;\nprintf(\"%d \", *p++);\nprintf(\"%d\", *p);",
        "questionHindi": "इस कोड का आउटपुट क्या होगा?\nint a[] = {10, 20, 30, 40}; int *p = a; printf(\"%d \", *p++); printf(\"%d\", *p);",
        "options": ["10 20", "20 20", "11 20", "10 10"],
        "correctIndex": 0,
        "explanation": "*p++ dereferences current value (10) first, then increments pointer 'p' to point to next element (20): '10 20'.",
        "explanationHindi": "*p++ पहले पुराना मान (10) प्रिंट करेगा, फिर पॉइंटर आगे बढ़कर a[1] (20) पर पहुँच जाएगा: '10 20'।"
    },
    {
        "id": "ptr-h9",
        "question": "What does (*p)++ do compared to *p++?",
        "questionHindi": "(*p)++ और *p++ में क्या अंतर होता है?",
        "options": [
            "(*p)++ increments the VALUE at the memory address pointed to; *p++ advances the POINTER address to the next element",
            "Both are identical",
            "(*p)++ advances the pointer by 2 bytes",
            "(*p)++ causes syntax error"
        ],
        "correctIndex": 0,
        "explanation": "Parentheses enforce dereferencing first; (*p)++ increments the actual integer data value.",
        "explanationHindi": "(*p)++ उस पते पर रखी संख्या को बढ़ाता है; जबकि *p++ पॉइंटर के पते को आगे खिसकाता है।"
    },
    {
        "id": "ptr-h10",
        "question": "What does ++*p do in C?",
        "questionHindi": "C में ++*p क्या कार्य करता है?",
        "options": [
            "Dereferences the pointer and increments the pointed-to value (pre-increment of value)",
            "Increments pointer address then dereferences",
            "Syntax error",
            "Squares the pointer"
        ],
        "correctIndex": 0,
        "explanation": "Unary operators associate Right-to-Left: *p is dereferenced, then its value is pre-incremented.",
        "explanationHindi": "दाएँ से बाएँ प्राथमिकता के कारण पहले *p से मान मिलेगा फिर वह मान 1 बढ़ जाएगा।"
    },
    {
        "id": "ptr-h11",
        "question": "What does *++p do in C?",
        "questionHindi": "C में *++p क्या कार्य करता है?",
        "options": [
            "Advances the pointer to the next element FIRST, then dereferences and returns that new element's value",
            "Increments the current value",
            "Syntax error",
            "Doubles the pointer"
        ],
        "correctIndex": 0,
        "explanation": "++p advances the pointer address first, then * dereferences the new address.",
        "explanationHindi": "पहले पॉइंटर अगले तत्व के पते पर जाता है, फिर वहाँ का मान निकालता है।"
    },
    {
        "id": "ptr-h12",
        "question": "What is 'Memory Alignment' and why can misaligned pointer dereferencing crash on RISC architectures?",
        "questionHindi": "मेमोरी अलाइनमेंट क्या है और गैर-अलाइन पॉइंटर को डिरिफ्रेंस करने पर क्रैश क्यों हो सकता है?",
        "options": [
            "CPUs read memory in word-sized chunks (e.g. 4 or 8 bytes); accessing an int at an odd address causes a hardware Bus Error (SIGBUS)",
            "Misaligned pointers delete RAM",
            "Pointers must be sorted in alphabetical order",
            "It only applies to hard disks"
        ],
        "correctIndex": 0,
        "explanation": "Processors require types to be aligned at multiples of their size; misaligned access triggers hardware exceptions.",
        "explanationHindi": "हार्डवेयर 4 या 8 के गुणकों में डेटा पढ़ता है; गलत पते से पढ़ने पर बस एरर (SIGBUS) क्रैश होता है।"
    },
    {
        "id": "ptr-h13",
        "question": "What is the difference between NULL, '\\0', and 0 in C?",
        "questionHindi": "C भाषा में NULL, '\\0', और 0 में क्या वैचारिक अंतर है?",
        "options": [
            "NULL is a pointer constant ((void*)0); '\\0' is a character literal with ASCII value 0; 0 is an integer literal 0",
            "All three have completely different binary bit patterns in RAM",
            "NULL is for floats; '\\0' is for strings; 0 is for doubles",
            "There is zero difference"
        ],
        "correctIndex": 0,
        "explanation": "All evaluate to 0, but they represent different types: pointer, character, and integer respectively.",
        "explanationHindi": "NULL पॉइंटर स्थिरांक है, '\\0' कैरेक्टर लिटरल है, और 0 एक पूर्णांक है (यद्यपि तीनों का मान 0 है)।"
    },
    {
        "id": "ptr-h14",
        "question": "What does 'ptrdiff_t' represent in the C standard library (<stddef.h>)?",
        "questionHindi": "<stddef.h> में 'ptrdiff_t' क्या दर्शाता है?",
        "options": [
            "A signed integer type used to represent the result of subtracting two pointers",
            "An unsigned byte count",
            "A floating-point address",
            "A time delay in pointer operations"
        ],
        "correctIndex": 0,
        "explanation": "ptrdiff_t is the signed integer type returned when subtracting two pointers.",
        "explanationHindi": "दो पॉइंटर्स को आपस में घटाने पर प्राप्त होने वाला साइन्ड पूर्णांक डेटा टाइप।"
    },
    {
        "id": "ptr-h15",
        "question": "Can two pointers pointing to DIFFERENT unrelated arrays be safely subtracted or compared with '<' in C?",
        "questionHindi": "क्या दो अलग-अलग ऐरे के पॉइंटर्स की आपस में तुलना (<) या घटाव किया जा सकता है?",
        "options": [
            "No, relational comparisons (<, >) and subtraction between pointers to different objects is Undefined Behavior in ISO C",
            "Yes, always works",
            "Only on Windows",
            "Only if types match"
        ],
        "correctIndex": 0,
        "explanation": "C standard states pointer comparisons (<, <=, >, >=) are only valid within the same array or one past the end.",
        "explanationHindi": "नहीं, अलग-अलग ऐरे के पॉइंटर्स की तुलना अपरिभाषित व्यवहार (Undefined Behavior) होती है।"
    },
    {
        "id": "ptr-h16",
        "question": "What is a 'Callback Function' implemented using function pointers?",
        "questionHindi": "फंक्शन पॉइंटर्स द्वारा लागू किया जाने वाला 'कॉल Mosca' (Callback Function) क्या है?",
        "options": [
            "A function passed as a pointer argument to another function (e.g. qsort comparison function) to be called back at a specific moment",
            "A function that calls itself recursively",
            "A function that rings a phone",
            "A function that restarts main()"
        ],
        "correctIndex": 0,
        "explanation": "Function pointers enable passing executable routines into libraries (like custom comparator in qsort).",
        "explanationHindi": "किसी दूसरे फंक्शन में पैरामीटर के रूप में भेजा जाने वाला फंक्शन जिसे जरूरत पड़ने पर कॉल किया जाता है।"
    },
    {
        "id": "ptr-h17",
        "question": "What is the signature of the comparison function required by the C standard library 'qsort()'?",
        "questionHindi": "मानक लाइब्रेरी के 'qsort()' को आवश्यक तुलना फंक्शन का सिग्नेचर क्या होता है?",
        "options": [
            "int (*compar)(const void *, const void *)",
            "void (*compar)(int, int)",
            "bool (*compar)(void *, void *)",
            "int (*compar)(char *, char *)"
        ],
        "correctIndex": 0,
        "explanation": "qsort expects int (*compar)(const void *a, const void *b) returning <0, 0, or >0.",
        "explanationHindi": "int (*compar)(const void *, const void *) जो दो जेनेरिक पॉइंटर्स की तुलना करता है।"
    },
    {
        "id": "ptr-h18",
        "question": "What is a 'Pointer to Constant Pointer to Constant' in C?",
        "questionHindi": "C भाषा में 'const int * const ptr' क्या दर्शाता है?",
        "options": [
            "A constant pointer where neither the target address can be changed nor the pointed-to integer value modified",
            "A standard pointer",
            "A pointer stored on heap",
            "An invalid declaration"
        ],
        "correctIndex": 0,
        "explanation": "Both the pointer itself and the data it points to are strictly read-only constants.",
        "explanationHindi": "एक ऐसा पॉइंटर जहाँ न तो उसका पता बदला जा सकता है और न ही वहाँ रखा मान बदला जा सकता है।"
    },
    {
        "id": "ptr-h19",
        "question": "What happens if you free a pointer twice in C (Double Free bug)?",
        "questionHindi": "एक ही पॉइंटर को दो बार free() करने पर (Double Free Bug) क्या होता है?",
        "options": [
            "Heap memory corruption leading to crashes, abort traps, and serious remote code execution security exploits",
            "Nothing, free is idempotent",
            "Memory frees twice as fast",
            "The pointer becomes 0"
        ],
        "correctIndex": 0,
        "explanation": "Double-free corrupts internal heap allocators metadata, causing crashes and security vulnerabilities.",
        "explanationHindi": "हीप मेमोरी की आंतरिक संरचना भ्रष्ट हो जाती है, जिससे प्रोग्राम क्रैश होता है और सुरक्षा खतरे बनते हैं।"
    },
    {
        "id": "ptr-h20",
        "question": "What is 'Type Punning' using pointers in C?",
        "questionHindi": "C भाषा में पॉइंटर्स द्वारा 'टाइप पनिंग' (Type Punning) क्या होती है?",
        "options": [
            "Accessing the raw memory bytes of an object of one type through a pointer of a different type",
            "A joke in C syntax",
            "Converting integers to characters",
            "Printing with %p"
        ],
        "correctIndex": 0,
        "explanation": "Type punning reinterprets the bit pattern of one type as another (e.g. viewing float bits as int).",
        "explanationHindi": "किसी एक प्रकार के डेटा की मेमोरी बाइट्स को दूसरे प्रकार के पॉइंटर से सीधे पढ़ना (जैसे फ्लोट की बिट्स को int से देखना)।"
    }
]

register("pointer", ptr_easy, ptr_hard)
print("Registered Topic 10: pointer")

# -------------------------------------------------------------
# TOPIC 11: user-defined-data-type (User Defined Data Types)
# -------------------------------------------------------------
udt_easy = [
    {
        "id": "udt-e1",
        "question": "Why are User-Defined Data Types needed in C?",
        "questionHindi": "C भाषा में यूजर-डिफाइंड डेटा टाइप्स की आवश्यकता क्यों होती है?",
        "options": [
            "To group related heterogeneous data members of different types together into a single meaningful entity",
            "Because C has no integers",
            "To speed up compiler",
            "To replace pointers"
        ],
        "correctIndex": 0,
        "explanation": "Structures and user types allow creating composite entities like Student, Book, or Employee.",
        "explanationHindi": "अलग-अलग प्रकार के संबंधित डेटा को एक इकाई (जैसे Student, Employee) में संगठित करने के लिए।"
    },
    {
        "id": "udt-e2",
        "question": "Which keyword is used to define a Structure in C?",
        "questionHindi": "C भाषा में स्ट्रक्चर (Structure) बनाने के लिए किस कीवर्ड का उपयोग होता है?",
        "options": ["struct", "structure", "class", "record"],
        "correctIndex": 0,
        "explanation": "'struct' keyword defines user-defined structures.",
        "explanationHindi": "'struct' कीवर्ड का उपयोग स्ट्रक्चर परिभाषित करने के लिए किया जाता है।"
    },
    {
        "id": "udt-e3",
        "question": "Which operator is used to access individual members of a structure variable?",
        "questionHindi": "स्ट्रक्चर वेरिएबल के किसी सदस्य (Member) को एक्सेस करने के लिए कौन-सा ऑपरेटर प्रयोग होता है?",
        "options": [". (Dot operator / Member access operator)", "-> (Arrow)", ": (Colon)", "# (Hash)"],
        "correctIndex": 0,
        "explanation": "Dot (.) operator accesses members of a direct structure variable (e.g. s1.roll_no).",
        "explanationHindi": "डॉट (.) ऑपरेटर द्वारा स्ट्रक्चर के सदस्यों को एक्सेस किया जाता है (जैसे s1.roll_no)।"
    },
    {
        "id": "udt-e4",
        "question": "Which operator is used to access structure members through a POINTER to a structure?",
        "questionHindi": "स्ट्रक्चर पॉइंटर के माध्यम से सदस्यों को एक्सेस करने के लिए कौन-सा ऑपरेटर प्रयोग होता है?",
        "options": ["-> (Arrow operator)", ". (Dot)", "* (Asterisk)", ":: (Scope)"],
        "correctIndex": 0,
        "explanation": "Arrow (->) operator dereferences and accesses members via pointers (ptr->marks == (*ptr).marks).",
        "explanationHindi": "एरो (->) ऑपरेटर का उपयोग स्ट्रक्चर पॉइंटर के साथ किया जाता है (ptr->marks)।"
    },
    {
        "id": "udt-e5",
        "question": "What is the equivalent of 'ptr->name' using the dereference and dot operators?",
        "questionHindi": "डिरिफ्रेंस और डॉट ऑपरेटर का उपयोग करके 'ptr->name' का समतुल्य रूप क्या है?",
        "options": ["(*ptr).name", "*ptr.name", "&ptr->name", "ptr.(name)"],
        "correctIndex": 0,
        "explanation": "(*ptr).name dereferences ptr first, then accesses member 'name'. Dot has higher precedence than *.",
        "explanationHindi": "(*ptr).name बिल्कुल ptr->name के बराबर होता है।"
    },
    {
        "id": "udt-e6",
        "question": "What is the fundamental difference in Memory Allocation between 'struct' and 'union' in C?",
        "questionHindi": "C में 'struct' और 'union' के मेमोरी आवंटन में क्या मूलभूत अंतर है?",
        "options": [
            "In 'struct', every member gets its own separate memory; in 'union', all members share the exact SAME memory location",
            "struct has no memory",
            "union cannot hold floats",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Struct members have distinct addresses; union members share one common overlapping address.",
        "explanationHindi": "struct में हर सदस्य को अलग मेमोरी मिलती है; union में सभी सदस्य एक ही साझा मेमोरी साझा करते हैं।"
    },
    {
        "id": "udt-e7",
        "question": "What is the total size of a 'union' in C?",
        "questionHindi": "C भाषा में 'union' का कुल आकार कितना होता है?",
        "options": [
            "Equal to the size of its largest member (plus any padding alignment)",
            "The sum of all its members",
            "Always 4 bytes",
            "Always 100 bytes"
        ],
        "correctIndex": 0,
        "explanation": "A union's size accommodates its largest member, since only one member can be stored at a time.",
        "explanationHindi": "यूनियन का आकार उसके सबसे बड़े सदस्य के आकार के बराबर होता है।"
    },
    {
        "id": "udt-e8",
        "question": "Can multiple members of a 'union' hold valid, independent values at the exact same moment?",
        "questionHindi": "क्या एक 'union' के कई सदस्य एक ही समय पर अलग-अलग मान्य मान रख सकते हैं?",
        "options": [
            "No, only ONE member can hold a valid value at any given time (writing to one overwrites all others)",
            "Yes, always",
            "Only if they are integers",
            "Only on 64-bit systems"
        ],
        "correctIndex": 0,
        "explanation": "Since all union members share memory, assigning to one member overwrites whatever was there.",
        "explanationHindi": "नहीं, एक समय में केवल एक ही सदस्य मान्य मान रख सकता है; नए मान से पुराना मान मिट जाता है।"
    },
    {
        "id": "udt-e9",
        "question": "Which keyword is used to create an Enumeration (named integer constants) in C?",
        "questionHindi": "C में इन्यूमरेशन (Enumeration) बनाने के लिए किस कीवर्ड का उपयोग होता है?",
        "options": ["enum", "enumerate", "list", "symbols"],
        "correctIndex": 0,
        "explanation": "'enum' creates a user-defined enumeration type.",
        "explanationHindi": "'enum' कीवर्ड से नामित पूर्णांक स्थिरांकों का समूह बनाया जाता है।"
    },
    {
        "id": "udt-e10",
        "question": "What is the default integer value assigned to the FIRST member of an 'enum' if not specified?",
        "questionHindi": "यदि मान न दिया जाए, तो 'enum' के पहले सदस्य का डिफ़ॉल्ट मान क्या होता है?",
        "options": ["0", "1", "-1", "NULL"],
        "correctIndex": 0,
        "explanation": "Enum constants start at 0 by default and increment by 1 for each subsequent member.",
        "explanationHindi": "पहले सदस्य का मान डिफ़ॉल्ट रूप से 0 होता है, और अगले सदस्यों का मान 1-1 बढ़ता जाता है।"
    },
    {
        "id": "udt-e11",
        "question": "If 'enum Days { MON = 1, TUE, WED };', what is the integer value of 'WED'?",
        "questionHindi": "यदि enum Days { MON = 1, TUE, WED }; हो, तो 'WED' का मान क्या होगा?",
        "options": ["3", "2", "1", "0"],
        "correctIndex": 0,
        "explanation": "MON is 1, TUE increments to 2, and WED increments to 3.",
        "explanationHindi": "MON=1 है, इसलिए TUE=2 और WED=3 होगा।"
    },
    {
        "id": "udt-e12",
        "question": "What does the 'typedef' keyword do in C?",
        "questionHindi": "C भाषा में 'typedef' कीवर्ड क्या कार्य करता है?",
        "options": [
            "Creates an alias (synonym/nickname) for an existing data type to simplify declarations",
            "Allocates dynamic heap RAM",
            "Creates a pointer",
            "Defines a constant variable"
        ],
        "correctIndex": 0,
        "explanation": "typedef gives an existing type a new alias name (e.g. typedef struct Student Student;).",
        "explanationHindi": "मौजूदा डेटा टाइप का नया उपनाम (Alias) बनाता है ताकि बार-बार लंबा नाम न लिखना पड़े।"
    },
    {
        "id": "udt-e13",
        "question": "Can an array of structures be created in C (e.g. struct Student classroom[50];)?",
        "questionHindi": "क्या C में स्ट्रक्चर्स का ऐरे बनाया जा सकता है (जैसे struct Student list[50];)?",
        "options": [
            "Yes, arrays of structures are completely standard and widely used for databases and lists",
            "No, structures cannot be arrays",
            "Only up to 5 elements",
            "Only with unions"
        ],
        "correctIndex": 0,
        "explanation": "Arrays of structs hold multiple composite records in contiguous memory.",
        "explanationHindi": "हाँ, स्ट्रक्चर्स का ऐरे बनाना पूरी तरह मान्य है और छात्रों/कर्मचारियों की सूची बनाने में काम आता है।"
    },
    {
        "id": "udt-e14",
        "question": "Can a structure contain another structure as a member (Nested Structure)?",
        "questionHindi": "क्या एक स्ट्रक्चर के अंदर दूसरा स्ट्रक्चर सदस्य के रूप में रखा जा सकता है (Nested Structure)?",
        "options": [
            "Yes, nested structures are fully supported in C",
            "No, structures cannot be nested",
            "Only with pointers",
            "Only 1 level deep"
        ],
        "correctIndex": 0,
        "explanation": "Nested structures allow composition (e.g. struct Date inside struct Employee).",
        "explanationHindi": "हाँ, नेस्टेड स्ट्रक्चर पूरी तरह मान्य हैं (जैसे Employee के अंदर Date of Birth का स्ट्रक्चर)।"
    },
    {
        "id": "udt-e15",
        "question": "Can a structure contain an instance of ITSELF directly (not a pointer)?",
        "questionHindi": "क्या कोई स्ट्रक्चर बिना पॉइंटर के सीधे अपने आप को ही अपने अंदर सदस्य बना सकता है?",
        "options": [
            "No, compilation error: a structure cannot contain an instance of itself because its size would be infinite",
            "Yes, always",
            "Only if named Node",
            "Only in C99"
        ],
        "correctIndex": 0,
        "explanation": "A struct cannot contain itself by value (infinite size recursion); it must contain a POINTER to itself.",
        "explanationHindi": "नहीं, क्योंकि इससे अनंत आकार की पुनरावृत्ति होगी; केवल अपना पॉइंटर (*next) ही रखा जा सकता है।"
    },
    {
        "id": "udt-e16",
        "question": "What is a 'Self-Referential Structure' in C?",
        "questionHindi": "C भाषा में 'सेल्फ-रेफरेंशियल स्ट्रक्चर' (Self-Referential Structure) क्या होता है?",
        "options": [
            "A structure containing a pointer pointing to the same structure type (used for Linked Lists, Trees)",
            "A structure that prints itself",
            "A structure with no members",
            "A union"
        ],
        "correctIndex": 0,
        "explanation": "Structures with self-referencing pointers (struct Node *next;) form dynamic data structures like linked lists.",
        "explanationHindi": "वह स्ट्रक्चर जिसमें अपने ही प्रकार के स्ट्रक्चर का एक पॉइंटर सदस्य हो (जैसे लिंक्ड लिस्ट नोड)।"
    },
    {
        "id": "udt-e17",
        "question": "Can two structure variables of the same type be directly copied using '=' (e.g. s1 = s2;)?",
        "questionHindi": "क्या समान प्रकार के दो स्ट्रक्चर वेरिएबल्स को सीधे '=' से कॉपी किया जा सकता है (s1 = s2;)?",
        "options": [
            "Yes, C performs a shallow member-by-member bitwise copy of all fields",
            "No, compilation error",
            "Only with memcpy()",
            "Only if size is 4 bytes"
        ],
        "correctIndex": 0,
        "explanation": "Direct assignment s1 = s2 copies all member values from s2 to s1.",
        "explanationHindi": "हाँ, s1 = s2 लिखने से s2 के सभी सदस्यों के मान s1 में स्वतः कॉपी हो जाते हैं।"
    },
    {
        "id": "udt-e18",
        "question": "Can two structure variables be directly compared using '==' (e.g. if (s1 == s2))?",
        "questionHindi": "क्या दो स्ट्रक्चर वेरिएबल्स की सीधे '==' से तुलना की जा सकती है (if (s1 == s2))?",
        "options": [
            "No, C does NOT support '==' comparison on structures; you must compare members individually",
            "Yes, always works",
            "Only if typedef is used",
            "Only in Linux"
        ],
        "correctIndex": 0,
        "explanation": "Because of structure padding bytes containing garbage, direct bitwise equality is not allowed in C.",
        "explanationHindi": "नहीं, C स्ट्रक्चर्स पर '==' की अनुमति नहीं देता; सदस्यों की अलग-अलग तुलना करनी पड़ती है।"
    },
    {
        "id": "udt-e19",
        "question": "What must follow the closing curly brace of a structure or union definition?",
        "questionHindi": "स्ट्रक्चर या यूनियन की परिभाषा के बंद कर्ली ब्रेस '}' के तुरंत बाद क्या लगाना अनिवार्य है?",
        "options": ["A Semicolon (;)", "A Colon (:)", "A Period (.)", "Nothing"],
        "correctIndex": 0,
        "explanation": "struct MyStruct { ... }; strictly requires a closing semicolon.",
        "explanationHindi": "परिभाषा समाप्त करने के लिए सेमीकोलन (;) लगाना अनिवार्य होता है।"
    },
    {
        "id": "udt-e20",
        "question": "What is the memory size of an 'enum' variable in standard C?",
        "questionHindi": "C भाषा में एक 'enum' वेरिएबल का मेमोरी आकार कितना होता है?",
        "options": [
            "Same as sizeof(int) (typically 4 bytes)",
            "1 byte",
            "8 bytes",
            "Zero bytes"
        ],
        "correctIndex": 0,
        "explanation": "Enums in C are represented internally by the integer data type.",
        "explanationHindi": "सामान्यतः sizeof(int) के बराबर यानी 4 बाइट्स।"
    }
]

udt_hard = [
    {
        "id": "udt-h1",
        "question": "What is 'Structure Padding' and memory alignment in C?",
        "questionHindi": "C भाषा में 'स्ट्रक्चर पैडिंग' (Structure Padding) और मेमोरी अलाइनमेंट क्या होता है?",
        "options": [
            "Compilers insert unused padding bytes between structure members so fields align on 4 or 8-byte word boundaries for CPU efficiency",
            "Encrypting structure data",
            "Deleting unused structure variables",
            "Adding zeroes to strings"
        ],
        "correctIndex": 0,
        "explanation": "Processors fetch data faster on aligned memory addresses; compilers pad gaps between smaller and larger fields.",
        "explanationHindi": "सीपीयू की गति तेज करने के लिए कम्पाइलर सदस्यों के बीच खाली पैडिंग बाइट्स जोड़ देता है।"
    },
    {
        "id": "udt-h2",
        "question": "What is sizeof(struct Test) on a 32/64-bit architecture for: struct Test { char c; int i; };?",
        "questionHindi": "struct Test { char c; int i; }; का कुल आकार sizeof(struct Test) कितना होगा?",
        "options": [
            "8 bytes (1 byte for char + 3 padding bytes + 4 bytes for int)",
            "5 bytes",
            "4 bytes",
            "16 bytes"
        ],
        "correctIndex": 0,
        "explanation": "char takes 1 byte, but int requires a 4-byte boundary, so 3 padding bytes are added: 1+3+4 = 8 bytes.",
        "explanationHindi": "8 बाइट्स (char 1 बाइट + 3 बाइट पैडिंग + int 4 बाइट = कुल 8 बाइट्स)।"
    },
    {
        "id": "udt-h3",
        "question": "How can you tell the compiler to eliminate all structure padding bytes for packed network packets?",
        "questionHindi": "नेटवर्क पैकेट्स के लिए सभी पैडिंग बाइट्स हटाने हेतु कम्पाइलर को क्या निर्देश दिया जाता है?",
        "options": [
            "#pragma pack(1) or __attribute__((packed))",
            "#pragma nopadding",
            "typedef pack struct",
            "remove_padding()"
        ],
        "correctIndex": 0,
        "explanation": "#pragma pack(1) or GCC __attribute__((packed)) enforces 1-byte packing with zero padding.",
        "explanationHindi": "#pragma pack(1) या __attribute__((packed)) से पैडिंग समाप्त होकर ठीक 5 बाइट्स बनती है।"
    },
    {
        "id": "udt-h4",
        "question": "What is a 'Bit-field' in a C structure?",
        "questionHindi": "C स्ट्रक्चर में 'बिट-फील्ड' (Bit-field) क्या होती है?",
        "options": [
            "A structure member explicitly allocated a specific number of binary bits (e.g. unsigned int flag : 1;)",
            "A field containing bitwise operators",
            "A binary file pointer",
            "A float member"
        ],
        "correctIndex": 0,
        "explanation": "Bit-fields pack members tightly into exact bit counts to save memory in hardware registers and protocols.",
        "explanationHindi": "निश्चित संख्या में बिट्स आवंटित करने की सुविधा (जैसे unsigned int flag : 1; केवल 1 बिट लेता है)।"
    },
    {
        "id": "udt-h5",
        "question": "Can you take the memory address using '&' of a bit-field member (e.g. &my_struct.flag)?",
        "questionHindi": "क्या किसी बिट-फील्ड सदस्य का एड्रेस '&' ऑपरेटर से लिया जा सकता है?",
        "options": [
            "No, bit-fields do not have individual byte addresses in RAM; attempting &causes a compilation error",
            "Yes, always",
            "Only for 8-bit fields",
            "Only in C99"
        ],
        "correctIndex": 0,
        "explanation": "Memory addresses reference whole bytes, not sub-byte bit offsets; taking &bitfield is illegal.",
        "explanationHindi": "नहीं, क्योंकि मेमोरी एड्रेस बाइट्स के होते हैं, सिंगल बिट्स के नहीं; कम्पाइलर एरर देगा।"
    },
    {
        "id": "udt-h6",
        "question": "Why is passing a large structure by POINTER (const struct S *ptr) preferred over passing by VALUE (struct S s)?",
        "questionHindi": "बड़ा स्ट्रक्चर वैल्यू के बजाय पॉइंटर (const struct S *ptr) द्वारा पास करना क्यों बेहतर है?",
        "options": [
            "Passing by value copies the entire structure onto the call stack (wasting CPU cycles and stack space); passing a pointer copies only 8 bytes",
            "Pointers use zero memory",
            "Passing by value crashes the compiler",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Passing a pointer avoids copying hundreds of bytes on every function invocation.",
        "explanationHindi": "वैल्यू पास करने से पूरे स्ट्रक्चर की कॉपी स्टैक पर बनती है; पॉइंटर केवल 8 बाइट्स का पता कॉपी करता है।"
    },
    {
        "id": "udt-h7",
        "question": "What is a 'Flexible Array Member' introduced in C99 structures?",
        "questionHindi": "C99 में प्रस्तुत 'फ्लेक्सिबल ऐरे मेंबर' (Flexible Array Member) क्या होता है?",
        "options": [
            "An unsized array declared as the LAST member of a struct (e.g. char data[];) that can dynamically grow with malloc()",
            "An array with flexible data types",
            "A 2D array inside a union",
            "A pointer to an array"
        ],
        "correctIndex": 0,
        "explanation": "struct Packet { int len; char data[]; }; allows single-allocation dynamic payload buffers.",
        "explanationHindi": "स्ट्रक्चर के सबसे अंत में बिना आकार का ऐरे (char data[];) जो malloc के साथ गतिशील रूप से बढ़ता है।"
    },
    {
        "id": "udt-h8",
        "question": "What is a 'Tagged Union' (Discriminated Union) in C?",
        "questionHindi": "C प्रोग्रामिंग में 'टैग्ड यूनियन' (Tagged Union) क्या पैटर्न है?",
        "options": [
            "A structure containing an 'enum' tag that tracks which union member is currently valid and active",
            "A union with name tags",
            "An encrypted union",
            "A union with 5 members"
        ],
        "correctIndex": 0,
        "explanation": "Wrapping a union with an enum type tag ensures safe access by tracking the active field type.",
        "explanationHindi": "स्ट्रक्चर में एक enum टैग रखना जो बताता है कि इस समय यूनियन का कौन-सा सदस्य सक्रिय है।"
    },
    {
        "id": "udt-h9",
        "question": "What are 'Anonymous Structures and Unions' supported in C11?",
        "questionHindi": "C11 में 'अनाम स्ट्रक्चर और यूनियन' (Anonymous Structs/Unions) क्या सुविधा है?",
        "options": [
            "Nested structs or unions without a tag name whose members can be accessed directly as if they were outer members",
            "Unions without memory",
            "Hidden data structures",
            "Deleted structs"
        ],
        "correctIndex": 0,
        "explanation": "Anonymous unions let inner members be accessed directly without an intermediate member name.",
        "explanationHindi": "बिना नाम के नेस्टेड स्ट्रक्चर/यूनियन जिनके सदस्यों को सीधे बाहरी स्तर से एक्सेस किया जा सकता है।"
    },
    {
        "id": "udt-h10",
        "question": "What is a 'Forward Declaration' of a structure in C (e.g. struct Node;)?",
        "questionHindi": "C में स्ट्रक्चर का 'फॉरवर्ड डिक्लेरेशन' (struct Node;) क्यों किया जाता है?",
        "options": [
            "Declares a structure type name before its full definition to allow mutually recursive pointer declarations",
            "Deletes the structure",
            "Allocates heap memory early",
            "Imports a header"
        ],
        "correctIndex": 0,
        "explanation": "Forward declaration allows declaring pointers to incomplete types before full body definition.",
        "explanationHindi": "पूरी परिभाषा से पहले उसका नाम घोषित करना ताकि दो स्ट्रक्चर्स एक-दूसरे के पॉइंटर रख सकें।"
    },
    {
        "id": "udt-h11",
        "question": "What is the memory size of a union containing: union Data { int i; float f; char str[20]; }; on a 64-bit system?",
        "questionHindi": "union Data { int i; float f; char str[20]; }; का आकार कितना होगा?",
        "options": ["20 bytes (plus word padding up to 20 or 24 bytes)", "28 bytes (sum of all)", "4 bytes", "8 bytes"],
        "correctIndex": 0,
        "explanation": "Largest member is str[20] (20 bytes); total union size matches largest member (20 or 24 bytes with alignment).",
        "explanationHindi": "सबसे बड़ा सदस्य str[20] है (20 बाइट्स), इसलिए कुल आकार 20 (या अलाइनमेंट से 24) बाइट्स होगा।"
    },
    {
        "id": "udt-h12",
        "question": "Can a structure in C contain function code directly inside its body like a C++ class?",
        "questionHindi": "क्या C भाषा का स्ट्रक्चर C++ क्लास की तरह सीधे अपने अंदर फंक्शन का कोड रख सकता है?",
        "options": [
            "No, C structures can only contain data members and FUNCTION POINTERS, not function definitions",
            "Yes, always",
            "Only in C99",
            "Only with static methods"
        ],
        "correctIndex": 0,
        "explanation": "C structures hold data; object-oriented behavior in C is achieved using function pointers.",
        "explanationHindi": "नहीं, C स्ट्रक्चर केवल डेटा और फंक्शन पॉइंटर्स ही रख सकते हैं, फंक्शन की बॉडी नहीं।"
    },
    {
        "id": "udt-h13",
        "question": "How do you achieve Encapsulation / Opaque Data Types in C using incomplete structure pointers?",
        "questionHindi": "C में अपूर्ण स्ट्रक्चर पॉइंटर्स (Opaque Pointers) से डेटा एन्कैप्सुलेशन कैसे प्राप्त किया जाता है?",
        "options": [
            "Declare 'typedef struct Context Context;' in the public header file without body, and define the full body only in the private .c file",
            "Use private keyword",
            "Encrypt memory with password",
            "Use const structs"
        ],
        "correctIndex": 0,
        "explanation": "Clients only see pointer handle Context*; internal members cannot be inspected or modified directly.",
        "explanationHindi": "हेडर में केवल नाम देकर पूरी बॉडी को .c फाइल में छिपाकर रखना ताकि यूजर अंदरूनी डेटा न बदल सके।"
    },
    {
        "id": "udt-h14",
        "question": "What is the difference between a Shallow Copy and a Deep Copy of a structure that contains pointer members?",
        "questionHindi": "पॉइंटर सदस्य वाले स्ट्रक्चर की शैलो कॉपी और डीप कॉपी में क्या अंतर होता है?",
        "options": [
            "Shallow copy copies only the pointer addresses (both structs point to the same memory); Deep copy duplicates the pointed-to memory contents as well",
            "Shallow copy is 10x slower",
            "Deep copy deletes the original",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Default '=' copy is shallow; deep copy requires manually allocating new memory and copying data.",
        "explanationHindi": "शैलो कॉपी केवल पता कॉपी करती है (दोनों एक ही मेमोरी देखते हैं); डीप कॉपी नई मेमोरी बनाकर डेटा नकल करती है।"
    },
    {
        "id": "udt-h15",
        "question": "What is the result of using 'offsetof(struct S, member)' from <stddef.h>?",
        "questionHindi": "<stddef.h> का 'offsetof(struct S, member)' मैक्रो क्या लौटाता है?",
        "options": [
            "The offset in bytes of the member from the beginning of the structure",
            "The memory address of the member",
            "The size of the member in bits",
            "The count of members"
        ],
        "correctIndex": 0,
        "explanation": "offsetof yields byte offset of a field from struct start, used in kernels and serialization.",
        "explanationHindi": "स्ट्रक्चर की शुरुआत से उस सदस्य की दूरी (बाइट्स में ऑफसेट)।"
    },
    {
        "id": "udt-h16",
        "question": "Can an 'enum' constant be assigned a negative integer in C (e.g. enum Status { FAILED = -1, OK = 0 });?",
        "questionHindi": "क्या C भाषा में enum सदस्य को ऋणात्मक मान (-1) दिया जा सकता है?",
        "options": [
            "Yes, enum constants can take any signed integer value",
            "No, only positive integers are allowed",
            "Only in C11",
            "Causes compiler error"
        ],
        "correctIndex": 0,
        "explanation": "Enum constants are signed integers in standard C and can be negative.",
        "explanationHindi": "हाँ, enum के स्थिरांक ऋणात्मक (Negative) पूर्णांक मान भी ले सकते हैं।"
    },
    {
        "id": "udt-h17",
        "question": "What happens if two enum constants inside the same enum have the same integer value?",
        "questionHindi": "यदि एक ही enum के दो अलग-अलग सदस्यों का मान समान हो (A = 5, B = 5), तो क्या होगा?",
        "options": [
            "Completely valid in C; both constants simply evaluate to the same numerical integer value",
            "Compiler error: duplicate constant",
            "First constant is deleted",
            "Program crashes"
        ],
        "correctIndex": 0,
        "explanation": "Multiple enum names can share the same integer value as aliases.",
        "explanationHindi": "यह पूरी तरह मान्य है; दोनों नाम एक ही संख्यात्मक मान का प्रतिनिधित्व करेंगे।"
    },
    {
        "id": "udt-h18",
        "question": "Can you use 'typedef' to define a clean shorthand for a complex function pointer signature?",
        "questionHindi": "क्या जटिल फंक्शन पॉइंटर के लिए 'typedef' से सरल नाम बनाया जा सकता है?",
        "options": [
            "Yes: typedef int (*MathFunc)(int, int); simplifies function pointer usage",
            "No, typedef only works on structs",
            "Only in C++",
            "Syntax error"
        ],
        "correctIndex": 0,
        "explanation": "typedef int (*MathFunc)(int, int); makes declaring function pointers as simple as MathFunc fp = add;.",
        "explanationHindi": "हाँ: typedef int (*MathFunc)(int, int); से फंक्शन पॉइंटर को साधारण वेरिएबल जैसा लिखा जा सकता है।"
    },
    {
        "id": "udt-h19",
        "question": "In what order are structure members guaranteed to be arranged in memory in C?",
        "questionHindi": "C भाषा में स्ट्रक्चर के सदस्य मेमोरी में किस क्रम में व्यवस्थित होने की गारंटी है?",
        "options": [
            "In strictly the order of their declaration with non-decreasing memory addresses",
            "Alphabetical order",
            "Largest data type first",
            "Compiler can rearrange them randomly"
        ],
        "correctIndex": 0,
        "explanation": "C standard guarantees members appear in memory in exact declaration order (first declared is at lowest address).",
        "explanationHindi": "घोषणा के बिल्कुल उसी क्रम में; पहले लिखा गया सदस्य हमेशा सबसे निचले पते पर होता है।"
    },
    {
        "id": "udt-h20",
        "question": "How does casting a structure pointer to another structure pointer that shares the same initial members work in C?",
        "questionHindi": "समान प्रारंभिक सदस्यों वाले स्ट्रक्चर पॉइंटर्स की परस्पर कास्टिंग C में कैसे काम करती है?",
        "options": [
            "Guaranteed valid: if two structs share a common initial sequence of members, pointers can inspect that common sequence",
            "Always undefined behavior",
            "Compiler throws syntax error",
            "Memory leaks"
        ],
        "correctIndex": 0,
        "explanation": "Common Initial Sequence rule in C standard allows inspecting shared prefix members across structures.",
        "explanationHindi": "कॉमन इनिशियल सीक्वेंस नियम के तहत शुरूआती समान सदस्यों को सुरक्षित रूप से पढ़ा जा सकता है।"
    }
]

register("user-defined-data-type", udt_easy, udt_hard)
print("Registered Topic 11: user-defined-data-type")

# -------------------------------------------------------------
# TOPIC 12: error (Errors & Debugging in C)
# -------------------------------------------------------------
err_easy = [
    {
        "id": "err-e1",
        "question": "What is a 'Bug' or 'Error' in computer programming?",
        "questionHindi": "कंप्यूटर प्रोग्रामिंग में बग (Bug) या एरर (त्रुटि) क्या होती है?",
        "options": [
            "A flaw, fault, or failure in a computer program that causes it to produce incorrect results or behave unexpectedly",
            "A physical insect inside the keyboard",
            "A fast CPU feature",
            "A new programming language"
        ],
        "correctIndex": 0,
        "explanation": "A bug is an error in code that prevents correct compilation, execution, or results.",
        "explanationHindi": "प्रोग्राम में कोई गलती जिससे वह गलत परिणाम देता है या क्रैश हो जाता है।"
    },
    {
        "id": "err-e2",
        "question": "What is a 'Syntax Error' in C?",
        "questionHindi": "C भाषा में सिंटेक्स एरर (Syntax Error) क्या होता है?",
        "options": [
            "A violation of the formal grammar and syntax rules of the C language, caught at compile-time",
            "A wrong math calculation that runs fine",
            "A power cut during execution",
            "A broken monitor"
        ],
        "correctIndex": 0,
        "explanation": "Syntax errors violate language rules (missing semicolon, unmatched braces) and prevent compilation.",
        "explanationHindi": "C भाषा के व्याकरण के नियमों का उल्लंघन, जिसे कम्पाइलर कोडिंग के समय ही पकड़ लेता है।"
    },
    {
        "id": "err-e3",
        "question": "When are Syntax Errors detected in C?",
        "questionHindi": "C में सिंटेक्स एरर्स की पहचान कब होती है?",
        "options": [
            "At Compile-Time by the compiler before the program can run",
            "At Run-Time while user is using the program",
            "After 1 year",
            "Only when uploading to internet"
        ],
        "correctIndex": 0,
        "explanation": "Compiler detects syntax errors and halts compilation without producing an executable.",
        "explanationHindi": "कम्पाइल-टाइम पर, यानी प्रोग्राम चलने से पहले ही कम्पाइलर द्वारा।"
    },
    {
        "id": "err-e4",
        "question": "Which of the following is a classic example of a Syntax Error?",
        "questionHindi": "इनमें से कौन-सा एक सिंटेक्स एरर का क्लासिक उदाहरण है?",
        "options": [
            "Missing a semicolon ';' at the end of a statement (e.g. int a = 10)",
            "Dividing a number by zero",
            "Writing a + b instead of a * b",
            "Forgetting to save the file"
        ],
        "correctIndex": 0,
        "explanation": "Missing semicolon violates grammatical syntax; caught immediately by compiler.",
        "explanationHindi": "स्टेटमेंट के अंत में सेमीकोलन (;) भूल जाना (जैसे int a = 10)।"
    },
    {
        "id": "err-e5",
        "question": "What is a 'Run-Time Error' in C?",
        "questionHindi": "C भाषा में रन-टाइम एरर (Run-Time Error) क्या होता है?",
        "options": [
            "An error that occurs while the compiled program is actively executing, causing it to crash or abort",
            "A spelling mistake in comments",
            "A compiler warning",
            "A missing header file"
        ],
        "correctIndex": 0,
        "explanation": "Runtime errors happen during program execution (e.g. division by zero, null pointer crash).",
        "explanationHindi": "वह त्रुटि जो प्रोग्राम के चलने के दौरान उत्पन्न होती है और प्रोग्राम को क्रैश कर देती है।"
    },
    {
        "id": "err-e6",
        "question": "What happens at runtime if your C code attempts to divide an integer by ZERO (e.g. x = 10 / 0;)?",
        "questionHindi": "यदि C कोड में किसी संख्या को शून्य से भाग दिया जाए (10 / 0), तो क्या होगा?",
        "options": [
            "Runtime crash (Arithmetic Exception / Floating point exception SIGFPE)",
            "It quietly prints infinity",
            "The compiler replaces it with 0",
            "Computer restarts"
        ],
        "correctIndex": 0,
        "explanation": "Division by zero triggers a CPU hardware fault, terminating the process.",
        "explanationHindi": "रनटाइम क्रैश होगा (SIGFPE एरर) और प्रोग्राम तुरंत बंद हो जाएगा।"
    },
    {
        "id": "err-e7",
        "question": "What is a 'Logical Error' in C?",
        "questionHindi": "C भाषा में लॉजिकल एरर (Logical Error) क्या होता है?",
        "options": [
            "A bug where the code compiles and runs without crashing, but produces WRONG or unexpected output",
            "A syntax mistake with braces",
            "A missing library function",
            "A virus infection"
        ],
        "correctIndex": 0,
        "explanation": "Logical errors are flaws in programmer's reasoning; the program executes but gives incorrect answers.",
        "explanationHindi": "कोड बिना किसी एरर के चलता है लेकिन परिणाम (Output) गलत या अप्रत्याशित आता है।"
    },
    {
        "id": "err-e8",
        "question": "Which of the following is a classic example of a Logical Error?",
        "questionHindi": "इनमें से कौन-सा एक लॉजिकल एरर का उदाहरण है?",
        "options": [
            "Using '=' instead of '==' in an if statement: if (x = 5)",
            "Forgetting #include <stdio.h>",
            "Misspelling printf as prntf",
            "Unclosed curly brace"
        ],
        "correctIndex": 0,
        "explanation": "if (x = 5) assigns 5 to x and always evaluates to true, causing a subtle logical bug.",
        "explanationHindi": "if में तुलना '==' के बजाय गलती से '=' लिख देना: if (x = 5)।"
    },
    {
        "id": "err-e9",
        "question": "What is a 'Linker Error' in C?",
        "questionHindi": "C भाषा में लिंकर एरर (Linker Error) क्या होता है?",
        "options": [
            "An error that occurs during the linking phase when the linker cannot find the definition of a declared function or variable",
            "A broken internet connection",
            "A missing mouse",
            "A damaged RAM chip"
        ],
        "correctIndex": 0,
        "explanation": "Linker errors occur when referenced symbols cannot be resolved (e.g. undefined reference to main).",
        "explanationHindi": "लिंकिंग चरण में आने वाली त्रुटि जब किसी फंक्शन या वेरिएबल की परिभाषा नहीं मिल पाती।"
    },
    {
        "id": "err-e10",
        "question": "What causes the famous linker error: 'undefined reference to main'?",
        "questionHindi": "प्रसिद्ध लिंकर एरर 'undefined reference to main' किस कारण से आता है?",
        "options": [
            "The program does not contain a main() function, or main is misspelled (e.g. Main or mian)",
            "The computer has no RAM",
            "Missing semicolon after main",
            "Too many comments"
        ],
        "correctIndex": 0,
        "explanation": "Linker cannot find the entry point symbol 'main'.",
        "explanationHindi": "प्रोग्राम में main() फंक्शन नहीं मिलता या उसका नाम गलत (Main या mian) लिख दिया गया हो।"
    },
    {
        "id": "err-e11",
        "question": "What is the difference between a Compiler Warning and a Compiler Error?",
        "questionHindi": "कम्पाइलर वॉर्निंग (Warning) और कम्पाइलर एरर (Error) में क्या अंतर है?",
        "options": [
            "An Error halts compilation and produces NO executable; a Warning cautions the programmer about suspicious code but still creates the executable",
            "Warnings crash the program",
            "Errors are ignored",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "Errors prevent build completion; warnings highlight potentially risky code while allowing build.",
        "explanationHindi": "एरर आने पर प्रोग्राम नहीं बनता; वॉर्निंग केवल चेतावनी देती है लेकिन प्रोग्राम बन जाता है।"
    },
    {
        "id": "err-e12",
        "question": "What is a 'Semantic Error' in C?",
        "questionHindi": "C में सिमेंटिक एरर (Semantic Error) क्या होता है?",
        "options": [
            "Statements that follow grammatical syntax rules but make no logical or type sense (e.g. 5 = x; or incompatible pointer assignment)",
            "Missing comments",
            "Indentation errors",
            "File extension error"
        ],
        "correctIndex": 0,
        "explanation": "Semantic errors violate meaning and type rules, even if tokens are grammatically ordered.",
        "explanationHindi": "वाक्य विन्यास सही दिखने पर भी अर्थ और टाइप नियमों का उल्लंघन (जैसे 5 = x;)।"
    },
    {
        "id": "err-e13",
        "question": "What is 'Print Debugging' (printf tracing)?",
        "questionHindi": "प्रिंट डीबगिंग (printf Tracing) तकनीक क्या होती है?",
        "options": [
            "Strategically inserting printf() statements to print variable values and track execution flow to pinpoint bugs",
            "Printing code on a physical paper printer",
            "Taking screenshot of errors",
            "Using colored fonts"
        ],
        "correctIndex": 0,
        "explanation": "Inserting printf markers displays state changes and locates exactly where logic goes wrong.",
        "explanationHindi": "कोड में जगह-जगह printf लगाकर वेरिएबल्स के मान देखना ताकि पता चले कि गलती कहाँ हो रही है।"
    },
    {
        "id": "err-e14",
        "question": "What is a 'Segmentation Fault' (SIGSEGV) in C?",
        "questionHindi": "C भाषा में 'सेगमेंटेशन फॉल्ट' (Segmentation Fault) क्या होता है?",
        "options": [
            "A runtime crash occurring when a program tries to access an unauthorized or unmapped region of memory RAM",
            "A disk full error",
            "A syntax error with brackets",
            "A missing header"
        ],
        "correctIndex": 0,
        "explanation": "SIGSEGV happens when dereferencing NULL, wild pointers, or reading protected memory.",
        "explanationHindi": "अवैध या अनधिकृत मेमोरी पते को एक्सेस करने का प्रयास करने पर होने वाला रनटाइम क्रैश।"
    },
    {
        "id": "err-e15",
        "question": "Which of the following directly triggers a Segmentation Fault?",
        "questionHindi": "इनमें से कौन-सा कार्य सीधे सेगमेंटेशन फॉल्ट का कारण बनता है?",
        "options": [
            "Dereferencing a NULL pointer: int *p = NULL; *p = 50;",
            "Adding two integers: int a = 5 + 10;",
            "Printing a number: printf(\"%d\", 10);",
            "Using a while loop"
        ],
        "correctIndex": 0,
        "explanation": "Accessing address 0 (NULL) violates memory segmentation and crashes with SIGSEGV.",
        "explanationHindi": "NULL पॉइंटर को डिरिफ्रेंस करना (*p = 50;) तुरंत सेगमेंटेशन फॉल्ट देता है।"
    },
    {
        "id": "err-e16",
        "question": "What is an 'Off-by-One Error' (Fencepost Error)?",
        "questionHindi": "'ऑफ-बाई-वन एरर' (Off-by-One Error) क्या होता है?",
        "options": [
            "A boundary condition logical error where a loop iterates one time too many or one time too few (e.g. i <= 10 instead of i < 10)",
            "A computer clock error",
            "Adding 1 to every number",
            "Skipping main()"
        ],
        "correctIndex": 0,
        "explanation": "Iterating 1 too many times can access array out of bounds (arr[10] for array of size 10).",
        "explanationHindi": "लूप की सीमा में एक बार कम या एक बार अधिक चलने की गलती (जैसे < 10 के बजाय <= 10 लिखना)।"
    },
    {
        "id": "err-e17",
        "question": "What tool in the GNU toolchain is the standard interactive debugger for C?",
        "questionHindi": "C प्रोग्रामों की डीबगिंग के लिए GNU का मानक डीबगर टूल कौन-सा है?",
        "options": ["GDB (GNU Debugger)", "GCC", "Make", "Git"],
        "correctIndex": 0,
        "explanation": "GDB allows stepping through code line-by-line, setting breakpoints, and inspecting memory.",
        "explanationHindi": "GDB (GNU Debugger) कोड को लाइन-दर-लाइन चलाकर गलतियाँ खोजने का टूल है।"
    },
    {
        "id": "err-e18",
        "question": "What is a 'Breakpoint' in interactive debugging?",
        "questionHindi": "डीबगिंग में 'ब्रेकपॉइंट' (Breakpoint) क्या होता है?",
        "options": [
            "An intentional pausing place in a program set by the programmer to inspect variable values at that moment",
            "A hardware crash point",
            "A comment in code",
            "A break statement"
        ],
        "correctIndex": 0,
        "explanation": "Breakpoints pause execution so developers can inspect state before continuing.",
        "explanationHindi": "प्रोग्राम में एक ऐसा बिंदु जहाँ निष्पादन रुक जाता है ताकि उस समय के मानों की जांच की जा सके।"
    },
    {
        "id": "err-e19",
        "question": "What is a 'Memory Leak' in C?",
        "questionHindi": "C भाषा में 'मेमोरी लीक' (Memory Leak) क्या होता है?",
        "options": [
            "Allocating dynamic memory using malloc() but forgetting to release it using free(), consuming RAM indefinitely",
            "Liquid leaking from RAM chip",
            "Deleting files accidentally",
            "Slow keyboard typing"
        ],
        "correctIndex": 0,
        "explanation": "Memory leaks waste heap space because unused allocations are never returned to the OS.",
        "explanationHindi": "malloc से मेमोरी लेकर उसे free() न करना, जिससे रैम भरती चली जाती है।"
    },
    {
        "id": "err-e20",
        "question": "What tool is widely used on Linux to automatically detect memory leaks and invalid memory accesses in C?",
        "questionHindi": "लिनक्स पर मेमोरी लीक्स और अमान्य मेमोरी एक्सेस पकड़ने के लिए कौन-सा टूल प्रसिद्ध है?",
        "options": ["Valgrind", "Vim", "Nano", "Python"],
        "correctIndex": 0,
        "explanation": "Valgrind (Memcheck) detects memory leaks, buffer overruns, and use-after-free bugs.",
        "explanationHindi": "Valgrind टूल मेमोरी लीक्स और पॉइंटर गलतियों को पकड़ने के लिए उपयोग किया जाता है।"
    }
]

err_hard = [
    {
        "id": "err-h1",
        "question": "Which GCC/Clang compiler flag enables all standard compiler warnings to catch potential bugs early?",
        "questionHindi": "शुरू में ही गलतियाँ पकड़ने के लिए सभी मानक वॉर्निंग्स चालू करने वाला GCC फ्लैग कौन-सा है?",
        "options": ["-Wall -Wextra", "-O3", "-g", "-std=c89"],
        "correctIndex": 0,
        "explanation": "-Wall and -Wextra enable comprehensive diagnostic compiler warnings.",
        "explanationHindi": "-Wall -Wextra कम्पाइलर को सभी संदिग्ध कोड पर चेतावनी देने का निर्देश देता है।"
    },
    {
        "id": "err-h2",
        "question": "Which compiler flag treats all compiler warnings as fatal compilation errors?",
        "questionHindi": "सभी वॉर्निंग्स को अनिवार्य एरर में बदलने वाला कम्पाइलर फ्लैग कौन-सा है?",
        "options": ["-Werror", "-Wall", "-Wpedantic", "-Wfatal"],
        "correctIndex": 0,
        "explanation": "-Werror forces the build to halt on any warning, ensuring zero warning tolerance.",
        "explanationHindi": "-Werror कम्पाइलर को निर्देश देता है कि किसी भी चेतावनी पर कोड को कम्पाइल न करे।"
    },
    {
        "id": "err-h3",
        "question": "What is 'Undefined Behavior' (UB) in the ISO C standard?",
        "questionHindi": "ISO C मानक में 'अपरिभाषित व्यवहार' (Undefined Behavior - UB) क्या होता है?",
        "options": [
            "Code behavior for which the C standard imposes no requirements; the compiler is free to crash, produce garbage, or optimize assuming the condition never occurs",
            "A standard syntax error",
            "A standard warning",
            "A comment style"
        ],
        "correctIndex": 0,
        "explanation": "UB grants compilers freedom to optimize aggressively, which can delete security checks.",
        "explanationHindi": "वह स्थिति जिसके लिए C मानक में कोई नियम नहीं है; कम्पाइलर क्रैश कर सकता है या कोड हटा सकता है।"
    },
    {
        "id": "err-h4",
        "question": "What is the difference between Undefined Behavior (UB), Implementation-Defined Behavior, and Unspecified Behavior?",
        "questionHindi": "UB, इम्प्लीमेंटेशन-डिफाइंड, और अनस्पेसिफाइड व्यवहार में क्या अंतर है?",
        "options": [
            "Implementation-defined must be documented by compiler (e.g. sizeof int); Unspecified chooses among valid options; UB has zero rules or guarantees",
            "All three are identical",
            "Implementation-defined causes crashes",
            "Unspecified is a syntax error"
        ],
        "correctIndex": 0,
        "explanation": "Implementation-defined behavior must be documented (like endianness); UB is completely wild.",
        "explanationHindi": "इम्प्लीमेंटेशन-डिफाइंड को कम्पाइलर दस्तावेज में लिखता है; UB का कोई नियम नहीं होता।"
    },
    {
        "id": "err-h5",
        "question": "What causes a 'Stack Overflow' runtime error in C?",
        "questionHindi": "C भाषा में 'स्टैक ओवरफ्लो' (Stack Overflow) रनटाइम एरर किस कारण से आता है?",
        "options": [
            "Exhausting call stack memory, typically caused by infinite recursion without a valid base case or allocating huge arrays on stack",
            "Hard drive running out of space",
            "Division by zero",
            "Too many printf calls"
        ],
        "correctIndex": 0,
        "explanation": "Unbounded recursion pushes infinite stack frames until the stack limit is exceeded, crashing with SIGSEGV.",
        "explanationHindi": "अनंत रिकर्शन या स्टैक पर बहुत बड़े ऐरे बनाने से कॉल स्टैक की मेमोरी भर जाना।"
    },
    {
        "id": "err-h6",
        "question": "What does a 'Core Dump' file contain after a fatal program crash in Linux?",
        "questionHindi": "लिनक्स में प्रोग्राम क्रैश होने के बाद बनने वाली 'कोर डंप' (Core Dump) फाइल में क्या होता है?",
        "options": [
            "A snapshot recording the exact memory image and CPU registers of the process at the moment of crash, inspectable via GDB",
            "The program's source code",
            "A list of comments",
            "A backup executable"
        ],
        "correctIndex": 0,
        "explanation": "Core dump records RAM state and registers, loaded into gdb (gdb myprog core) to trace crash line.",
        "explanationHindi": "क्रैश के समय की पूरी रैम मेमोरी और सीपीयू रजिस्टर्स का स्नैपशॉट जिसे GDB में जांचा जा सकता है।"
    },
    {
        "id": "err-h7",
        "question": "What does the GDB command 'backtrace' (or 'bt') display during post-mortem debugging?",
        "questionHindi": "GDB में 'backtrace' (या 'bt') कमांड क्या दिखाती है?",
        "options": [
            "The call stack history of active function calls showing exactly what sequence led to the crash point",
            "The source code backwards",
            "The compile log",
            "Variable types"
        ],
        "correctIndex": 0,
        "explanation": "backtrace prints the active stack frames from current crash point back to main().",
        "explanationHindi": "फंक्शन कॉल्स का पूरा इतिहास (कॉल स्टैक) जो दिखाता है कि कौन-से फंक्शन से क्रैश हुआ।"
    },
    {
        "id": "err-h8",
        "question": "What does the 'assert()' macro from <assert.h> do?",
        "questionHindi": "<assert.h> में 'assert()' मैक्रो क्या कार्य करता है?",
        "options": [
            "Tests an assumption; if the condition is false (0), it prints file name, line number, and aborts the program immediately",
            "Fixes syntax errors automatically",
            "Replaces if statements",
            "Enables compiler optimizations"
        ],
        "correctIndex": 0,
        "explanation": "assert(ptr != NULL) verifies invariant assumptions during development and testing.",
        "explanationHindi": "यदि दी गई शर्त असत्य हो, तो फाइल का नाम और लाइन नंबर दिखाकर प्रोग्राम को तुरंत बंद कर देता है।"
    },
    {
        "id": "err-h9",
        "question": "How can all assert() checks be completely disabled for production release builds without deleting code?",
        "questionHindi": "कोड हटाए बिना प्रोडक्शन रिलीज के लिए सभी assert() जांचों को कैसे निष्क्रिय किया जाता है?",
        "options": [
            "Define the macro '#define NDEBUG' before including <assert.h> (or compile with -DNDEBUG)",
            "Remove stdio.h",
            "Use -O3 flag",
            "Replace assert with printf"
        ],
        "correctIndex": 0,
        "explanation": "NDEBUG turns all assert() statements into no-ops, eliminating runtime overhead in production.",
        "explanationHindi": "<assert.h> से पहले '#define NDEBUG' लिखकर या कम्पाइलर में -DNDEBUG फ्लैग लगाकर।"
    },
    {
        "id": "err-h10",
        "question": "What is a 'Buffer Overflow' (Buffer Overrun) error?",
        "questionHindi": "बफर ओवरफ्लो (Buffer Overflow) त्रुटि क्या होती है?",
        "options": [
            "Writing data past the allocated boundary of a buffer array, overwriting adjacent memory variables or return addresses on stack",
            "When output buffer prints too slowly",
            "A full hard disk",
            "A memory leak"
        ],
        "correctIndex": 0,
        "explanation": "Buffer overflow overwrites adjacent memory, causing corrupted state and security exploits.",
        "explanationHindi": "ऐरे की सीमा से बाहर डेटा लिख देना, जिससे पास की दूसरी मेमोरी या स्टैक एड्रेस बदल जाते हैं।"
    },
    {
        "id": "err-h11",
        "question": "What is a 'Use-After-Free' security vulnerability in C?",
        "questionHindi": "'यूज़-आफ्टर-फ्री' (Use-After-Free) सुरक्षा खामी क्या होती है?",
        "options": [
            "Accessing or modifying dynamic memory through a pointer after calling free() on that pointer",
            "Using free software",
            "Calling free() without malloc",
            "Calling malloc() with 0"
        ],
        "correctIndex": 0,
        "explanation": "Accessing deallocated memory can read malicious reallocated payload data, creating severe exploits.",
        "explanationHindi": "मेमोरी को free() करने के बाद भी पॉइंटर द्वारा उस पते को पढ़ना या बदलना।"
    },
    {
        "id": "err-h12",
        "question": "What compiler instrumentation flag in modern GCC/Clang detects memory errors (ASan)?",
        "questionHindi": "GCC/Clang में मेमोरी गलतियों को पकड़ने के लिए कौन-सा एड्रेस सैनिटाइज़र फ्लैग है?",
        "options": ["-fsanitize=address", "-fmem-check", "-g-debug-mem", "-Wall"],
        "correctIndex": 0,
        "explanation": "AddressSanitizer (-fsanitize=address) detects out-of-bounds, use-after-free, and leaks at runtime.",
        "explanationHindi": "-fsanitize=address (ASan) रनटाइम पर बफर ओवरफ्लो और डैंगलिंग पॉइंटर्स को तुरंत पकड़ता है।"
    },
    {
        "id": "err-h13",
        "question": "What is a 'Static Analysis Tool' (like Cppcheck, Clang-Tidy)?",
        "questionHindi": "स्टैटिक एनालिसिस टूल (Cppcheck, Clang-Tidy) क्या होता है?",
        "options": [
            "A tool that inspects source code without executing it, flagging potential bugs, style violations, and security flaws",
            "A compiler that runs code in simulation",
            "A hardware benchmark tool",
            "A disk cleanup utility"
        ],
        "correctIndex": 0,
        "explanation": "Static analyzers analyze AST and control flow paths without needing test execution.",
        "explanationHindi": "वह सॉफ्टवेयर जो कोड को बिना चलाए पढ़कर उसमें संभावित गलतियों और सुरक्षा खामियों को खोजता है।"
    },
    {
        "id": "err-h14",
        "question": "Why can compiler optimizations (like -O2 or -O3) sometimes make a hidden bug suddenly appear or disappear?",
        "questionHindi": "कम्पाइलर ऑप्टिमाइजेशन (-O2) चालू करने पर कोई छिपा हुआ बग अचानक क्यों सामने आ जाता है?",
        "options": [
            "Optimizers assume code contains zero Undefined Behavior; if UB exists, code reordering or dead-store elimination can break unwritten assumptions",
            "Optimizers add random code",
            "Optimizers change variable names",
            "Optimizers disable loops"
        ],
        "correctIndex": 0,
        "explanation": "Optimizers rely on language rules; existing UB allows the compiler to make transformations that expose bugs.",
        "explanationHindi": "ऑप्टिमाइज़र मानकर चलते हैं कि कोड में UB नहीं है; यदि गलती हो तो वे कोड का क्रम बदल देते हैं।"
    },
    {
        "id": "err-h15",
        "question": "What happens if a non-void function reaches its closing brace without an explicit 'return' statement in C?",
        "questionHindi": "यदि गैर-शून्य फंक्शन में 'return' स्टेटमेंट न हो और फंक्शन खत्म हो जाए तो क्या होगा?",
        "options": [
            "Undefined Behavior if the caller attempts to use the returned value (except for main in C99)",
            "Always returns 0",
            "Always returns -1",
            "Compiler error strictly required"
        ],
        "correctIndex": 0,
        "explanation": "Flowing off the end of a value-returning function causes UB when caller accesses result.",
        "explanationHindi": "यदि कॉलर लौटाए गए मान का उपयोग करता है तो अपरिभाषित व्यवहार (UB) होता है।"
    },
    {
        "id": "err-h16",
        "question": "What is a 'Race Condition' in multi-threaded C programming?",
        "questionHindi": "मल्टी-थ्रेडेड C प्रोग्रामिंग में 'रेस कंडीशन' (Race Condition) क्या होती है?",
        "options": [
            "When multiple threads concurrently access shared memory without synchronization and at least one access is a write",
            "A competition between two algorithms",
            "CPU clock overclocking",
            "Fastest loop execution"
        ],
        "correctIndex": 0,
        "explanation": "Unsynchronized concurrent access produces unpredictable output based on non-deterministic thread timing.",
        "explanationHindi": "जब दो थ्रेड्स बिना लॉक के एक ही मेमोरी को एक साथ बदलते हैं, जिससे परिणाम गलत हो जाता है।"
    },
    {
        "id": "err-h17",
        "question": "What is a 'Deadlock' in concurrent C programs?",
        "questionHindi": "कन्करेंट C प्रोग्राम्स में 'डेडलॉक' (Deadlock) क्या होता है?",
        "options": [
            "A situation where two or more threads are permanently blocked, each waiting for a mutex lock held by the other",
            "A crashed computer",
            "A deleted file",
            "An infinite loop in main"
        ],
        "correctIndex": 0,
        "explanation": "Circular wait on mutex locks freezes all involved threads permanently.",
        "explanationHindi": "ऐसी स्थिति जहाँ दो थ्रेड्स एक-दूसरे के ताले (Lock) खुलने का हमेशा इंतजार करते रहते हैं और अटक जाते हैं।"
    },
    {
        "id": "err-h18",
        "question": "What does GDB command 'step' ('s') do differently compared to 'next' ('n')?",
        "questionHindi": "GDB में 'step' ('s') और 'next' ('n') कमांड में क्या अंतर है?",
        "options": [
            "'step' steps INTO a function call to trace inside it; 'next' steps OVER the function call, executing it as a single line",
            "'step' runs backwards",
            "'next' terminates program",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "step enters into function definitions; next treats function calls as a single step.",
        "explanationHindi": "'step' फंक्शन के अंदर जाकर एक-एक लाइन दिखाता है; 'next' पूरे फंक्शन को एक साथ चलाकर अगली लाइन पर जाता है।"
    },
    {
        "id": "err-h19",
        "question": "What is 'Rubber Duck Debugging' in software engineering?",
        "questionHindi": "सॉफ्टवेयर इंजीनियरिंग में 'रबर डक डीबगिंग' (Rubber Duck Debugging) क्या तकनीक है?",
        "options": [
            "Explaining the code line-by-line in simple words to an inanimate object (like a rubber duck) to realize logical flaws",
            "Using yellow colored terminal",
            "Testing on water devices",
            "Automated AI testing"
        ],
        "correctIndex": 0,
        "explanation": "Verbalizing each line forces deliberate cognitive review, frequently exposing hidden logic assumptions.",
        "explanationHindi": "किसी वस्तु या खिलौने को बोलकर कोड का एक-एक कदम समझाने की तकनीक, जिससे अपनी गलती खुद समझ आ जाती है।"
    },
    {
        "id": "err-h20",
        "question": "What does errno and perror() in <errno.h> and <stdio.h> do?",
        "questionHindi": "<errno.h> में 'errno' और 'perror()' क्या करते हैं?",
        "options": [
            "errno stores integer error codes from failed system calls; perror() prints a human-readable English explanation of the error",
            "perror() reboots the computer",
            "errno counts syntax errors",
            "Both are obsolete"
        ],
        "correctIndex": 0,
        "explanation": "perror prints descriptive system error messages (e.g. \"File open error: No such file or directory\").",
        "explanationHindi": "errno सिस्टम एरर कोड रखता है और perror() उसका इंसानों के समझने योग्य विवरण प्रिंट करता है।"
    }
]

register("error", err_easy, err_hard)
print("Registered Topic 12: error")

# -------------------------------------------------------------
# TOPIC 13: file-handling (File Handling in C)
# -------------------------------------------------------------
fh_easy = [
    {
        "id": "fh-e1",
        "question": "Why is File Handling essential in C programming?",
        "questionHindi": "C प्रोग्रामिंग में फाइल हैंडलिंग (File Handling) क्यों जरूरी है?",
        "options": [
            "To permanently store data on secondary storage (hard drive/SSD) so data persists after the program terminates",
            "To speed up CPU clock",
            "Because RAM is permanent",
            "To avoid using variables"
        ],
        "correctIndex": 0,
        "explanation": "Variables in RAM disappear when a program terminates; files preserve data persistently on disk.",
        "explanationHindi": "हार्ड डिस्क पर डेटा को स्थायी रूप से सुरक्षित रखने के लिए ताकि प्रोग्राम बंद होने पर भी डेटा न मिटे।"
    },
    {
        "id": "fh-e2",
        "question": "Which standard header file must be included for File Handling functions in C?",
        "questionHindi": "C में फाइल हैंडलिंग फंक्शन्स के लिए कौन-सी हेडर फाइल शामिल करना जरूरी है?",
        "options": ["<stdio.h>", "<file.h>", "<stdlib.h>", "<io.h>"],
        "correctIndex": 0,
        "explanation": "FILE type and all file functions (fopen, fclose, etc.) are declared in <stdio.h>.",
        "explanationHindi": "<stdio.h> हेडर फाइल में फाइल हैंडलिंग के सभी मानक फंक्शन्स उपलब्ध होते हैं।"
    },
    {
        "id": "fh-e3",
        "question": "What is the data type of a File Pointer in C?",
        "questionHindi": "C भाषा में फाइल पॉइंटर का डेटा प्रकार क्या होता है?",
        "options": ["FILE *", "file *", "int *", "STREAM *"],
        "correctIndex": 0,
        "explanation": "FILE * is a pointer to the FILE structure defined in <stdio.h>.",
        "explanationHindi": "FILE * (कैपिटल अक्षरों में) फाइल पॉइंटर का प्रकार है।"
    },
    {
        "id": "fh-e4",
        "question": "Which function is used to Open an existing or new file in C?",
        "questionHindi": "C में किसी फाइल को खोलने के लिए कौन-सा फंक्शन उपयोग किया जाता है?",
        "options": ["fopen()", "open_file()", "file_open()", "read()"],
        "correctIndex": 0,
        "explanation": "fopen(filename, mode) opens a file and returns a FILE pointer.",
        "explanationHindi": "fopen(filename, mode) फंक्शन फाइल को खोलने के लिए उपयोग होता है।"
    },
    {
        "id": "fh-e5",
        "question": "Which function is used to Close an open file in C?",
        "questionHindi": "C में खुली हुई फाइल को बंद करने के लिए कौन-सा फंक्शन उपयोग किया जाता है?",
        "options": ["fclose()", "close_file()", "file_exit()", "terminate()"],
        "correctIndex": 0,
        "explanation": "fclose(fp) closes the file and flushes unwritten buffer data to disk.",
        "explanationHindi": "fclose(fp) फाइल को बंद करके बफर को डिस्क पर सुरक्षित करता है।"
    },
    {
        "id": "fh-e6",
        "question": "What does fopen() return if a file CANNOT be opened (e.g. file does not exist in read mode)?",
        "questionHindi": "यदि फाइल न खुले (जैसे फाइल मौजूद न हो), तो fopen() क्या मान लौटाता है?",
        "options": ["NULL", "0", "-1", "EOF"],
        "correctIndex": 0,
        "explanation": "fopen returns NULL on failure; code must always check 'if (fp == NULL)'.",
        "explanationHindi": "fopen विफल होने पर NULL लौटाता है; इसलिए 'if (fp == NULL)' जांचना अनिवार्य है।"
    },
    {
        "id": "fh-e7",
        "question": "What does file mode \"r\" (read mode) do?",
        "questionHindi": "फाइल मोड \"r\" (रीड मोड) क्या कार्य करता है?",
        "options": [
            "Opens an existing file for reading only; if the file does not exist, fopen() fails and returns NULL",
            "Creates a new file if not found",
            "Overwrites existing file",
            "Appends to end of file"
        ],
        "correctIndex": 0,
        "explanation": "Mode \"r\" opens existing file for input only; returns NULL if file is missing.",
        "explanationHindi": "केवल पढ़ने के लिए खोलता है; यदि फाइल नहीं मिलती तो NULL लौटाता है।"
    },
    {
        "id": "fh-e8",
        "question": "What does file mode \"w\" (write mode) do if the file ALREADY exists?",
        "questionHindi": "यदि फाइल पहले से मौजूद हो, तो मोड \"w\" (राइट मोड) क्या करता है?",
        "options": [
            "Completely overwrites/truncates the existing file to zero length, erasing all previous contents",
            "Appends to the end",
            "Throws an error",
            "Makes it read-only"
        ],
        "correctIndex": 0,
        "explanation": "Mode \"w\" creates a new file or completely wipes existing file content.",
        "explanationHindi": "पुराने सारे डेटा को मिटाकर (Overwrite) नई खाली फाइल बना देता है।"
    },
    {
        "id": "fh-e9",
        "question": "What does file mode \"a\" (append mode) do?",
        "questionHindi": "फाइल मोड \"a\" (अपेंड मोड) क्या कार्य करता है?",
        "options": [
            "Opens file to write data at the END of the file without erasing previous contents",
            "Overwrites from beginning",
            "Deletes all text",
            "Reads from bottom"
        ],
        "correctIndex": 0,
        "explanation": "Mode \"a\" writes new data exclusively at the end of the existing file.",
        "explanationHindi": "पुराने डेटा को मिटाए बिना फाइल के सबसे अंत में नया डेटा जोड़ता है।"
    },
    {
        "id": "fh-e10",
        "question": "Which function writes a single character to a file stream in C?",
        "questionHindi": "फाइल में एक सिंगल कैरेक्टर लिखने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": ["fputc()", "fgetc()", "fputs()", "putchar()"],
        "correctIndex": 0,
        "explanation": "fputc(ch, fp) writes one character to the file pointed by fp.",
        "explanationHindi": "fputc(ch, fp) फाइल में एक अक्षर लिखता है।"
    },
    {
        "id": "fh-e11",
        "question": "Which function reads a single character from an open file stream in C?",
        "questionHindi": "फाइल से एक सिंगल कैरेक्टर पढ़ने के लिए कौन-सा फंक्शन है?",
        "options": ["fgetc()", "fputc()", "fgets()", "getchar()"],
        "correctIndex": 0,
        "explanation": "fgetc(fp) reads the next character from the file.",
        "explanationHindi": "fgetc(fp) फाइल से अगला अक्षर पढ़ता है।"
    },
    {
        "id": "fh-e12",
        "question": "What does EOF stand for in file handling in C, and what integer value does it typically have?",
        "questionHindi": "फाइल हैंडलिंग में EOF का क्या अर्थ है और इसका संख्यात्मक मान क्या होता है?",
        "options": [
            "End Of File, constant value -1",
            "End Of Function, value 0",
            "Error On File, value 1",
            "Exit Open File, value 255"
        ],
        "correctIndex": 0,
        "explanation": "EOF indicates End of File sentinel, defined as integer -1 in <stdio.h>.",
        "explanationHindi": "End Of File (फाइल की समाप्ति), जिसका मानक मान -1 होता है।"
    },
    {
        "id": "fh-e13",
        "question": "Which function writes formatted text data to a file (like printf does for screen)?",
        "questionHindi": "फाइल में फॉर्मेटेड टेक्स्ट लिखने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": ["fprintf()", "fscanf()", "fputs()", "sprintf()"],
        "correctIndex": 0,
        "explanation": "fprintf(fp, \"format\", args...) writes formatted output to a file.",
        "explanationHindi": "fprintf(fp, ...) फाइल में फॉर्मेटेड डेटा लिखने के काम आता है।"
    },
    {
        "id": "fh-e14",
        "question": "Which function reads formatted data from a file (like scanf does for keyboard)?",
        "questionHindi": "फाइल से फॉर्मेटेड डेटा पढ़ने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": ["fscanf()", "fprintf()", "fgets()", "sscanf()"],
        "correctIndex": 0,
        "explanation": "fscanf(fp, \"format\", &args...) reads formatted input from a file stream.",
        "explanationHindi": "fscanf(fp, ...) फाइल से फॉर्मेटेड डेटा पढ़ता है।"
    },
    {
        "id": "fh-e15",
        "question": "Which function safely reads an entire string / line from a file including spaces?",
        "questionHindi": "फाइल से स्पेस सहित पूरी लाइन सुरक्षित रूप से पढ़ने वाला फंक्शन कौन-सा है?",
        "options": ["fgets(str, size, fp)", "fputs(str, fp)", "fscanf(fp, \"%s\", str)", "fgetc()"],
        "correctIndex": 0,
        "explanation": "fgets reads up to size-1 characters or newline from the file safely.",
        "explanationHindi": "fgets(str, size, fp) अधिकतम साइज की सीमा के साथ पूरी पंक्ति पढ़ता है।"
    },
    {
        "id": "fh-e16",
        "question": "Which function writes an entire string to a file without formatting?",
        "questionHindi": "फाइल में पूरी स्ट्रिंग लिखने वाला सरल फंक्शन कौन-सा है?",
        "options": ["fputs(str, fp)", "fgets(str, size, fp)", "puts()", "fwrite_line()"],
        "correctIndex": 0,
        "explanation": "fputs writes a null-terminated string to the file stream.",
        "explanationHindi": "fputs(str, fp) फाइल में स्ट्रिंग लिखने का कार्य करता है।"
    },
    {
        "id": "fh-e17",
        "question": "What happens if a program forgets to call fclose(fp) before terminating?",
        "questionHindi": "यदि प्रोग्राम बंद होने से पहले fclose(fp) कॉल करना भूल जाए तो क्या हो सकता है?",
        "options": [
            "Buffered data in RAM may not be written to disk (data loss) and OS file descriptors leak",
            "The computer crashes immediately",
            "The file is deleted",
            "No problem at all"
        ],
        "correctIndex": 0,
        "explanation": "Unclosed files risk data loss from unwritten output buffers and waste system descriptors.",
        "explanationHindi": "बफर में रुका हुआ डेटा गायब हो सकता है (डेटा नष्ट होना) और सिस्टम रिसोर्स लीक होते हैं।"
    },
    {
        "id": "fh-e18",
        "question": "What are the two primary categories of files handled in C?",
        "questionHindi": "C भाषा में मुख्य रूप से कौन-सी दो प्रकार की फाइलें हैंडल की जाती हैं?",
        "options": [
            "Text Files (ASCII/UTF plain text) and Binary Files (raw bytes)",
            "Audio files and video files",
            "C files and Java files",
            "Hard files and soft files"
        ],
        "correctIndex": 0,
        "explanation": "Text files store human-readable characters; Binary files store exact in-memory byte representations.",
        "explanationHindi": "टेक्स्ट फाइलें (अक्षरों वाली) और बाइनरी फाइलें (कच्ची 0 और 1 बाइट्स वाली)।"
    },
    {
        "id": "fh-e19",
        "question": "Which mode suffix indicates binary file mode on platforms like Windows?",
        "questionHindi": "बाइनरी फाइल मोड दर्शाने के लिए मोड में कौन-सा अक्षर जोड़ा जाता है?",
        "options": [
            "'b' (e.g. \"rb\", \"wb\", \"ab\")",
            "'bin'",
            "'x'",
            "'raw'"
        ],
        "correctIndex": 0,
        "explanation": "The 'b' flag prevents translation of carriage return newline characters \\r\\n.",
        "explanationHindi": "'b' अक्षर जोड़ा जाता है (जैसे \"rb\", \"wb\", \"ab\") ताकि न्यूलाइन ट्रांसलेशन न हो।"
    },
    {
        "id": "fh-e20",
        "question": "Which function resets the file position indicator to the very BEGINNING of the file?",
        "questionHindi": "फाइल पॉइंटर को वापस फाइल की शुरुआत (शून्य स्थान) पर ले जाने वाला फंक्शन कौन-सा है?",
        "options": ["rewind(fp)", "reset(fp)", "fstart(fp)", "seek_zero(fp)"],
        "correctIndex": 0,
        "explanation": "rewind(fp) resets the file pointer to the beginning of the file.",
        "explanationHindi": "rewind(fp) फाइल पॉइंटर को सीधे फाइल की शुरुआत में वापस ले आता है।"
    }
]

fh_hard = [
    {
        "id": "fh-h1",
        "question": "What does mode \"r+\" do in C fopen()?",
        "questionHindi": "C fopen() में \"r+\" मोड क्या कार्य करता है?",
        "options": [
            "Opens an existing file for BOTH Reading and Writing; file must exist (returns NULL if missing)",
            "Creates new file for reading",
            "Overwrites file completely",
            "Appends only"
        ],
        "correctIndex": 0,
        "explanation": "\"r+\" allows both reading and writing from an existing file without truncating it.",
        "explanationHindi": "पढ़ने और लिखने दोनों के लिए खोलता है; फाइल का पहले से मौजूद होना अनिवार्य है।"
    },
    {
        "id": "fh-h2",
        "question": "What is the crucial difference between \"w+\" and \"r+\" file modes?",
        "questionHindi": "\"w+\" और \"r+\" फाइल मोड में क्या महत्वपूर्ण अंतर है?",
        "options": [
            "\"w+\" TRUNCATES existing file to zero bytes (wiping previous data); \"r+\" preserves existing file contents",
            "\"w+\" cannot read",
            "\"r+\" cannot write",
            "There is no difference"
        ],
        "correctIndex": 0,
        "explanation": "\"w+\" wipes the file if it exists, while \"r+\" preserves existing content for update.",
        "explanationHindi": "\"w+\" पुराने डेटा को तुरंत मिटा देता है; जबकि \"r+\" पुराने डेटा को सुरक्षित रखता है।"
    },
    {
        "id": "fh-h3",
        "question": "What function is used for writing binary blocks of memory (e.g. structures) to disk in C?",
        "questionHindi": "डिस्क पर मेमोरी के बाइनरी ब्लॉक (जैसे स्ट्रक्चर) लिखने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": [
            "fwrite(buffer, size, count, fp)",
            "fread(buffer, size, count, fp)",
            "fprintf(fp, buffer)",
            "write_bytes(fp, buffer)"
        ],
        "correctIndex": 0,
        "explanation": "fwrite writes count items, each of 'size' bytes, from buffer into the file.",
        "explanationHindi": "fwrite(buffer, size, count, fp) बाइनरी डेटा लिखने का मानक फंक्शन है।"
    },
    {
        "id": "fh-h4",
        "question": "What function is used for reading binary blocks of data directly into a structure or array?",
        "questionHindi": "डिस्क से बाइनरी ब्लॉक सीधे स्ट्रक्चर या ऐरे में पढ़ने वाला फंक्शन कौन-सा है?",
        "options": [
            "fread(buffer, size, count, fp)",
            "fwrite(buffer, size, count, fp)",
            "fscanf()",
            "read_all()"
        ],
        "correctIndex": 0,
        "explanation": "fread reads count objects of size bytes into memory buffer.",
        "explanationHindi": "fread(buffer, size, count, fp) बाइनरी डेटा पढ़ने का फंक्शन है।"
    },
    {
        "id": "fh-h5",
        "question": "Why is the loop: 'while (!feof(fp)) { fscanf(fp, ...); }' a well-known critical bug in C?",
        "questionHindi": "'while (!feof(fp))' का उपयोग करके फाइल पढ़ना एक प्रसिद्ध बग क्यों माना जाता है?",
        "options": [
            "feof() returns true only AFTER a read attempt fails past the end; this causes the last line to be processed or printed TWICE",
            "feof() deletes files",
            "It loops only 1 time",
            "feof() is not standard"
        ],
        "correctIndex": 0,
        "explanation": "feof() flags EOF only after a failed read; checking read return status directly avoids duplicate last records.",
        "explanationHindi": "feof केवल फाइल खत्म होने के बाद पढ़ने की कोशिश पर सत्य होता है, जिससे आखिरी लाइन दो बार प्रोसेस हो जाती है।"
    },
    {
        "id": "fh-h6",
        "question": "What is the correct idiom to loop through a text file character-by-character until EOF?",
        "questionHindi": "टेक्स्ट फाइल को एक-एक अक्षर करके EOF तक पढ़ने का सही मानक कोड क्या है?",
        "options": [
            "int ch; while ((ch = fgetc(fp)) != EOF) { /* process ch */ }",
            "char ch; while (!feof(fp)) { ch = fgetc(fp); }",
            "while (fgetc(fp))",
            "while (1) { fgetc(fp); }"
        ],
        "correctIndex": 0,
        "explanation": "'ch' must be 'int' (not char) because EOF is -1, which an unsigned char cannot represent.",
        "explanationHindi": "int ch; while ((ch = fgetc(fp)) != EOF) सही तरीका है (ch का int होना जरूरी है)।"
    },
    {
        "id": "fh-h7",
        "question": "Why must the variable holding the result of fgetc() be declared as 'int' rather than 'char'?",
        "questionHindi": "fgetc() का परिणाम रखने वाले चर को 'char' के बजाय 'int' घोषित करना क्यों अनिवार्य है?",
        "options": [
            "EOF is an integer constant (-1); on platforms where char is unsigned, an unsigned char can NEVER equal -1, creating an infinite loop",
            "int is faster than char",
            "char cannot store letters",
            "fgetc only reads numbers"
        ],
        "correctIndex": 0,
        "explanation": "Unsigned char cannot represent negative -1; declaring as int prevents infinite EOF loop bugs.",
        "explanationHindi": "EOF का मान -1 होता है; यदि char अनसाइन्ड हो तो वह कभी -1 नहीं बनेगा और लूप कभी नहीं रुकेगा।"
    },
    {
        "id": "fh-h8",
        "question": "What function allows random access positioning within a file stream?",
        "questionHindi": "फाइल में किसी भी मनचाहे स्थान पर कर्सर ले जाने के लिए कौन-सा फंक्शन उपयोग होता है?",
        "options": [
            "fseek(fp, offset, origin)",
            "ftell(fp)",
            "rewind(fp)",
            "goto_file(fp, pos)"
        ],
        "correctIndex": 0,
        "explanation": "fseek sets file position indicator to offset relative to origin (SEEK_SET, SEEK_CUR, SEEK_END).",
        "explanationHindi": "fseek(fp, offset, origin) फाइल में कर्सर को मनचाहे स्थान पर ले जाता है।"
    },
    {
        "id": "fh-h9",
        "question": "What are the three standard origin constants used in fseek()?",
        "questionHindi": "fseek() में उपयोग होने वाले तीन मानक ओरिजिन स्थिरांक कौन-से हैं?",
        "options": [
            "SEEK_SET (beginning), SEEK_CUR (current position), SEEK_END (end of file)",
            "START, CURRENT, FINISH",
            "FILE_BEGIN, FILE_MID, FILE_END",
            "TOP, CENTER, BOTTOM"
        ],
        "correctIndex": 0,
        "explanation": "SEEK_SET = start, SEEK_CUR = current, SEEK_END = end of file.",
        "explanationHindi": "SEEK_SET (फाइल की शुरुआत), SEEK_CUR (वर्तमान स्थान), SEEK_END (फाइल का अंत)।"
    },
    {
        "id": "fh-h10",
        "question": "What function returns the CURRENT byte position indicator in a file stream?",
        "questionHindi": "फाइल में वर्तमान बाइट स्थान (कर्सर कहाँ है) बताने वाला फंक्शन कौन-सा है?",
        "options": ["ftell(fp)", "fseek(fp)", "fpos(fp)", "get_byte(fp)"],
        "correctIndex": 0,
        "explanation": "ftell(fp) returns the current offset in bytes from the start of the file.",
        "explanationHindi": "ftell(fp) शुरुआत से वर्तमान बाइट स्थिति (Offset) लौटाता है।"
    },
    {
        "id": "fh-h11",
        "question": "How do you find the total size of a file in bytes using fseek() and ftell() in C?",
        "questionHindi": "fseek और ftell की मदद से किसी फाइल का कुल आकार (Bytes में) कैसे ज्ञात किया जाता है?",
        "options": [
            "fseek(fp, 0, SEEK_END); long size = ftell(fp); rewind(fp);",
            "ftell(fp, SEEK_END);",
            "fseek(fp, 0, SEEK_SET);",
            "sizeof(fp)"
        ],
        "correctIndex": 0,
        "explanation": "Seek to end, tell the offset byte count, then rewind back to start.",
        "explanationHindi": "fseek(fp, 0, SEEK_END); फिर ftell(fp) से साइज पढ़ें, और rewind(fp) से वापस शुरुआत में आएं।"
    },
    {
        "id": "fh-h12",
        "question": "What does the function ferror(fp) check for?",
        "questionHindi": "ferror(fp) फंक्शन किस बात की जांच करता है?",
        "options": [
            "Checks whether an I/O read or write error has occurred on the file stream",
            "Checks if syntax errors exist",
            "Checks if file name is valid",
            "Checks if disk has virus"
        ],
        "correctIndex": 0,
        "explanation": "ferror returns non-zero if the error indicator for the stream is set.",
        "explanationHindi": "यह जांचता है कि क्या फाइल स्ट्रीम में पढ़ने या लिखने में कोई हार्डवेयर/सिस्टम त्रुटि हुई है।"
    },
    {
        "id": "fh-h13",
        "question": "What does clearerr(fp) do to a file stream?",
        "questionHindi": "clearerr(fp) फंक्शन फाइल स्ट्रीम पर क्या प्रभाव डालता है?",
        "options": [
            "Clears the end-of-file (EOF) and error indicators for the given file stream",
            "Deletes the file contents",
            "Closes the file",
            "Clears the terminal screen"
        ],
        "correctIndex": 0,
        "explanation": "clearerr resets both EOF and error flags on the stream.",
        "explanationHindi": "यह फाइल स्ट्रीम के EOF और एरर फ्लैग्स को रीसेट कर देता है।"
    },
    {
        "id": "fh-h14",
        "question": "Which function configures the internal buffer size and buffering mode of a file stream?",
        "questionHindi": "फाइल स्ट्रीम के आंतरिक बफर का आकार और मोड निर्धारित करने वाला फंक्शन कौन-सा है?",
        "options": ["setvbuf() or setbuf()", "buffer_alloc()", "fbuffer()", "make_buffer()"],
        "correctIndex": 0,
        "explanation": "setvbuf(fp, buf, mode, size) sets buffering (_IOFBF full, _IOLBF line, _IONBF none).",
        "explanationHindi": "setvbuf() या setbuf() द्वारा फाइल की बफरिंग रणनीति निर्धारित की जाती है।"
    },
    {
        "id": "fh-h15",
        "question": "What is the difference between Text Mode and Binary Mode carriage return handling on Windows?",
        "questionHindi": "विंडोज पर टेक्स्ट मोड और बाइनरी मोड में कैरिज रिटर्न handling में क्या अंतर होता है?",
        "options": [
            "In text mode, '\\n' is translated to/from '\\r\\n' on disk; in binary mode, bytes are written exactly as-is with zero translation",
            "Binary mode deletes newlines",
            "Text mode deletes letters",
            "There is no difference on Windows"
        ],
        "correctIndex": 0,
        "explanation": "Text mode translates \\n to \\r\\n on write and back on read; binary mode preserves raw bytes.",
        "explanationHindi": "टेक्स्ट मोड में '\\n' को '\\r\\n' में बदल दिया जाता है; बाइनरी मोड में बिना किसी बदलाव के सटीक बाइट्स लिखी जाती हैं।"
    },
    {
        "id": "fh-h16",
        "question": "How do you rename an existing file on disk in standard C (<stdio.h>)?",
        "questionHindi": "C भाषा में डिस्क पर किसी फाइल का नाम बदलने (Rename) के लिए कौन-सा फंक्शन है?",
        "options": ["rename(old_name, new_name)", "file_rename()", "mv()", "change_name()"],
        "correctIndex": 0,
        "explanation": "rename(old_path, new_path) renames or moves a file on disk.",
        "explanationHindi": "rename(old_name, new_name) फंक्शन फाइल का नाम बदलता है।"
    },
    {
        "id": "fh-h17",
        "question": "How do you delete/remove an existing file from disk in standard C (<stdio.h>)?",
        "questionHindi": "C भाषा में डिस्क से किसी फाइल को हमेशा के लिए हटाने (Delete) का फंक्शन कौन-सा है?",
        "options": ["remove(filename)", "delete(filename)", "unlink_all()", "rm_file()"],
        "correctIndex": 0,
        "explanation": "remove(filename) deletes the file from the filesystem.",
        "explanationHindi": "remove(filename) फंक्शन फाइल को डिस्क से मिटा देता है।"
    },
    {
        "id": "fh-h18",
        "question": "What does tmpfile() do in C file handling?",
        "questionHindi": "C भाषा में 'tmpfile()' फंक्शन क्या कार्य करता है?",
        "options": [
            "Creates a temporary binary file opened in \"wb+\" mode that is automatically deleted when closed or on program exit",
            "Deletes all temporary files",
            "Reads Windows temp folder",
            "Creates an empty text file"
        ],
        "correctIndex": 0,
        "explanation": "tmpfile generates a unique temporary file auto-deleted upon fclose.",
        "explanationHindi": "एक अस्थायी फाइल बनाता है जो फाइल बंद होते ही अपने आप डिस्क से मिट जाती है।"
    },
    {
        "id": "fh-h19",
        "question": "Why is storing raw pointer addresses inside a binary file on disk a major error?",
        "questionHindi": "डिस्क की बाइनरी फाइल में पॉइंटर एड्रेस सेव करना एक गंभीर गलती क्यों है?",
        "options": [
            "RAM addresses change every execution run (ASLR and new heap addresses); reading them back loads invalid dangling pointers",
            "Pointers cannot be written to files",
            "Pointers take 100 bytes",
            "File size doubles"
        ],
        "correctIndex": 0,
        "explanation": "Pointers only have meaning within the active memory space of that single run.",
        "explanationHindi": "क्योंकि अगली बार प्रोग्राम चलने पर रैम के पते बदल जाते हैं, जिससे डैंगलिंग पॉइंटर्स क्रैश करेंगे।"
    },
    {
        "id": "fh-h20",
        "question": "What is the recommended atomic pattern for safely updating a critical file without data loss during a power failure?",
        "questionHindi": "बिजली गुल होने पर भी डेटा सुरक्षित रखने के लिए फाइल अपडेट करने का सुरक्षित तरीका क्या है?",
        "options": [
            "Write new data to a temporary file (e.g. data.tmp), flush and close it, then call rename(\"data.tmp\", \"data.dat\")",
            "Directly overwrite with \"w\"",
            "Never close the file",
            "Use \"a+\" only"
        ],
        "correctIndex": 0,
        "explanation": "Writing to temp and atomic renaming prevents corrupting the original file if a crash occurs midway.",
        "explanationHindi": "पहले अस्थायी फाइल में लिखकर बंद करें, फिर rename द्वारा परमाणु (Atomic) रूप से बदलें।"
    }
]

register("file-handling", fh_easy, fh_hard)
print("Registered Topic 13: file-handling")
