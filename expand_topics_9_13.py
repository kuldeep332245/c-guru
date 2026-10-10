#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reads topics_t9_t13.py and adds deep sections to each of the 5 topics
so they all have 900+ words in both English and Hindi.
"""
import re

with open("topics_t9_t13.py", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Enlarge Topic 9: array
extra_array_en = """

7. VARIABLE LENGTH ARRAYS (VLAs) VS DYNAMIC HEAP ALLOCATION:
Introduced in ISO C99, Variable Length Arrays allow array dimensions to be determined dynamically at runtime based on an integer expression (e.g., int n; scanf("%d", &n); int arr[n];).
- The Architectural Hazard of VLAs:
VLAs are allocated on the program's Call Stack rather than the Heap. Because the thread call stack has a very limited default size (typically 1MB to 8MB depending on the operating system), requesting a large VLA (e.g., n = 2,000,000 integers) triggers an unrecoverable Stack Overflow crash with no error return! Consequently, the C11 standard made VLA support optional for compilers (signaled by __STDC_NO_VLA__).
- The Production Heap Alternative:
In robust enterprise and systems code, dynamic arrays whose sizes depend on user input or file contents should always be allocated on the heap via malloc() or calloc():
```c
int *arr = (int*)malloc(n * sizeof(int));
if (arr == NULL) { /* handle out-of-memory error */ }
// ... perform computations ...
free(arr);
arr = NULL;
```
For two-dimensional dynamic matrices, allocating a single contiguous 1D block of (rows * cols * sizeof(element)) provides optimal cache line locality and avoids the multiple pointer-dereference overhead associated with array-of-pointer (int**) representations."""

extra_array_hi = """

७. वेरिएबल लेंथ ऐरे (VLA) बनाम डायनेमिक हीप एलोकेशन:
C99 मानक में वेरिएबल लेंथ ऐरे (VLA) की सुविधा जोड़ी गई थी जिसके द्वारा ऐरे का साइज रनटाइम पर तय किया जा सकता है (जैसे 'int n; scanf("%d", &n); int arr[n];')।
- VLA का गंभीर खतरा:
VLA की मेमोरी स्टैक (Stack) पर आवंटित होती है। चूंकि ऑपरेटिंग सिस्टम में स्टैक मेमोरी का आकार बहुत छोटा होता है (सामान्यतः 1MB से 8MB), इसलिए यदि यूजर ने 10 लाख का इनपुट दे दिया, तो स्टैक तुरंत भर जाएगा और प्रोग्राम बिना किसी चेतावनी के स्टैक ओवरफ्लो से क्रैश हो जाएगा। इसी कारण C11 मानक ने VLA को अनिवार्य से ऐच्छिक बना दिया।
- उत्पादन स्तर का सुरक्षित तरीका (malloc):
वास्तविक सॉफ्टवेयर में जब ऐरे का आकार यूजर या फाइल पर निर्भर हो, तो मेमोरी हमेशा हीप (Heap) से malloc() द्वारा ली जानी चाहिए:
```c
int *arr = (int*)malloc(n * sizeof(int));
if (arr == NULL) { /* मेमोरी न मिलने पर सुरक्षित रूप से बाहर निकलें */ }
// कार्य समाप्त होने पर:
free(arr);
arr = NULL;
```
2D मैट्रिक्स के लिए भी अलग-अलग पॉइंटर्स बनाने के बजाय एक ही समतल (Flat) 1D ब्लॉक (rows * cols) आरक्षित करना सबसे तेज होता है क्योंकि इससे सीपीयू कैश का शत-प्रतिशत लाभ मिलता है।"""

# 2. Enlarge Topic 10: pointer
extra_ptr_en = """

7. FUNCTION POINTERS & CALLBACK SYSTEM ARCHITECTURE:
In compiled C architecture, functions are not abstract mathematical formulas; they compile into machine code instructions residing at fixed physical memory addresses inside the Text Segment of the process address space.
A Function Pointer is a pointer variable that stores the entry point memory address of a compiled function.
- Function Pointer Declaration Syntax:
```c
return_type (*pointer_name)(parameter_types);
```
Example:
```c
int add(int a, int b) { return a + b; }
int (*mathOp)(int, int) = add;
int result = mathOp(10, 20); // Calls add() indirectly through memory!
```
- Real-World Systems Applications:
1. Callback Functions: Passing a function pointer as an argument to another function enables dynamic behavior customization. The C standard library function qsort() takes a comparator callback function pointer (int (*cmp)(const void*, const void*)) to sort any arbitrary data type.
2. State Machines & Jump Tables: An array of function pointers (e.g., void (*eventHandlers[5])(void);) replaces large, slow switch-case statements with O(1) instantaneous direct dispatch!
3. Object-Oriented Simulation: Structures containing function pointers simulate C++ virtual method tables (vtables), forming the foundation of the Linux Kernel Virtual File System (VFS struct file_operations)."""

extra_ptr_hi = """

७. फंक्शन पॉइंटर्स और कॉलबैक सिस्टम आर्किटेक्चर (Function Pointers):
कंप्यूटर में कंपाइल होने के बाद फंक्शन्स कोई अमूर्त विचार नहीं रहते, बल्कि वे मेमोरी के टेक्स्ट सेगमेंट (Text Segment) में रखे मशीन कोड निर्देशों का एक समूह बन जाते हैं जिसका एक निश्चित हेक्साडेसिमल मेमोरी एड्रेस होता है।
फंक्शन पॉइंटर एक ऐसा पॉइंटर है जो किसी वेरिएबल के पते के बजाय सीधे किसी फंक्शन के शुरुआती मशीन कोड का पता स्टोर करता है।
- फंक्शन पॉइंटर का सिंटैक्स:
```c
int (*funcPtr)(int, int); // दो पूर्णांक लेने वाले और पूर्णांक लौटाने वाले फंक्शन का पॉइंटर
```
- वास्तविक सॉफ्टवेयर में इसका उपयोग:
१. कॉलबैक फंक्शन्स (Callbacks): किसी फंक्शन के अंदर दूसरे फंक्शन को तर्क के रूप में भेजना। उदाहरण के लिए C का मानक फंक्शन qsort() किसी भी ऐरे को सॉर्ट करने के लिए तुलना करने वाले कॉलबैक फंक्शन पॉइंटर का उपयोग करता है।
२. स्टेट मशीन और जंप टेबल: फंक्शन पॉइंटर्स का ऐरे बनाकर हम बड़े-बड़े switch-case को हटाकर O(1) समय में सीधे सही फंक्शन पर छलांग लगा सकते हैं।
३. लिनक्स कर्नल में ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग: स्ट्रक्चर के अंदर फंक्शन पॉइंटर्स रखकर लिनक्स कर्नल विभिन्न हार्डवेयर ड्राइवर्स के लिए एक समान इंटरफेस बनाता है (जैसे file_operations में read, write फंक्शन्स के पॉइंटर्स)।"""

# 3. Enlarge Topic 11: user-defined-data-type
extra_udt_en = """

7. NESTED STRUCTURES & SELF-REFERENTIAL DATA STRUCTURES:
- Nested Structures:
A structure can contain another structure as a member, enabling clean hierarchical modeling of real-world entities:
```c
struct Date { int day, month, year; };
struct Employee { int id; char name[40]; struct Date joinDate; };
```
Member access traverses through dot operators: emp.joinDate.year = 2026;
- Self-Referential Structures (The Backbone of Dynamic Data Structures):
A Self-Referential Structure contains a pointer member that points to an instance of the EXACT SAME structure type.
Syntax:
```c
struct Node {
    int data;
    struct Node *next; // Self-referential pointer!
};
```
Self-referential structures cannot contain an entire instance of themselves directly (which would require infinite recursive memory bytes!), but they CAN contain a pointer to themselves because all pointers have a fixed known size (8 bytes on 64-bit systems).
Self-referential structures are the universal building blocks for implementing non-contiguous dynamic data structures in C, including Singly Linked Lists, Doubly Linked Lists, Circular Lists, Binary Search Trees, AVL Trees, Heaps, and Graph adjacency lists.
- C99 Flexible Array Members:
A structure can declare an unsized array as its final member (e.g., struct Packet { int len; char data[]; };), enabling allocation of dynamic variable-sized payload packets with zero wasted memory overhead."""

extra_udt_hi = """

७. नेस्टेड स्ट्रक्चर्स और सेल्फ-रेफरेंशियल डेटा संरचनाएं (Self-Referential Structures):
- नेस्टेड स्ट्रक्चर (Nested Structures):
एक स्ट्रक्चर के अंदर किसी दूसरे स्ट्रक्चर को सदस्य बनाना नेस्टेड स्ट्रक्चर कहलाता है (जैसे Employee स्ट्रक्चर के अंदर Date of Birth का स्ट्रक्चर होना)। इसे 'emp.dob.year = 2000;' जैसे डॉट ऑपरेटर्स से एक्सेस किया जाता है।
- सेल्फ-रेफरेंशियल स्ट्रक्चर (Self-Referential Structure):
यह C भाषा की सबसे महत्वपूर्ण अवधारणाओं में से एक है। एक ऐसा स्ट्रक्चर जिसके अंदर एक पॉइंटर सदस्य होता है जो उसी के प्रकार के दूसरे स्ट्रक्चर को इंगित करता है:
```c
struct Node {
    int data;
    struct Node *next; // खुद के प्रकार का पॉइंटर!
};
```
कोई भी स्ट्रक्चर अपने अंदर खुद की पूरी नकल नहीं रख सकता (क्योंकि इसके लिए अनंत मेमोरी चाहिए होगी), लेकिन वह अपने ही प्रकार का पॉइंटर रख सकता है क्योंकि पॉइंटर का आकार हमेशा निश्चित (8 बाइट्स) होता है।
यही सेल्फ-रेफरेंशियल स्ट्रक्चर लिंक्ड लिस्ट (Linked List), बाइनरी ट्री (Binary Tree), स्टैक, क्यू और ग्राफ जैसी सभी जटिल डायनेमिक डेटा संरचनाओं का आधार है।
- C99 फ्लेक्सिबल ऐरे मेम्बर्स (Flexible Array Members):
स्ट्रक्चर के अंतिम सदस्य के रूप में बिना साइज का ऐरे घोषित करना (जैसे char data[];) ताकि नेटवर्क पैकेट्स के लिए रनटाइम पर मनचाही मेमोरी आरक्षित की जा सके।
- स्ट्रक्चर बनाम यूनियन का गहन अंतर और मेमोरी संरेखण नियम:
स्ट्रक्चर में प्रत्येक सदस्य को अलग-अलग स्वतंत्र मेमोरी मिलती है, इसलिए इसका कुल आकार सभी सदस्यों के आकारों के योग या पैडिंग के बराबर होता है। इसके विपरीत, यूनियन में सभी सदस्य एक ही मेमोरी लोकेशन को साझा करते हैं, और इसका आकार केवल सबसे बड़े सदस्य के बराबर होता है। यूनियन का उपयोग तब किया जाता है जब एक समय में केवल एक ही डेटा स्टोर करना हो (जैसे विभिन्न प्रकार के नेटवर्क पैकेट या वेरिएंट प्रकार)। टाइपडेफ (typedef) का मुख्य लाभ जटिल प्रकारों जैसे फंक्शन पॉइंटर्स और नेस्टेड स्ट्रक्चर्स को सरल और पठनीय उपनाम प्रदान करना है।"""

# 4. Enlarge Topic 12: error
extra_err_en = """

7. STATIC ANALYSIS, VALGRIND & ADDRESS SANITIZER (ASAN):
Diagnosing complex memory corruptions and segmentation faults purely by visual inspection is extremely difficult. Modern systems engineering utilizes automated diagnostic tooling:
1. Aggressive Compiler Diagnostics:
Always compile with comprehensive warning flags:
```bash
gcc -Wall -Wextra -Werror -pedantic -std=c11 program.c
```
This forces the compiler to treat all suspicious constructs (such as unused variables, implicit type conversions, and uninitialized reads) as fatal errors before binary generation.
2. AddressSanitizer (ASan) & UndefinedBehaviorSanitizer (UBSan):
Integrated directly into GCC and Clang, ASan instruments memory loads and stores with fast shadow memory checks:
```bash
gcc -fsanitize=address,undefined -g program.c -o program
```
When executed, ASan instantly catches out-of-bounds stack/heap accesses, use-after-free, double-free, and integer overflows at the exact instruction they occur, printing full source line stack traces!
3. Valgrind Memcheck:
An external CPU emulation suite that intercepts all heap allocations and deallocations, reporting the exact byte counts of memory leaks and uninitialized memory reads without requiring source recompilation."""

extra_err_hi = """

७. आधुनिक स्टेटिक एनालिसिस, Valgrind और AddressSanitizer (ASan):
C भाषा में मेमोरी की गलतियों और सेग्मेंटेशन फॉल्ट को केवल आँखों से कोड देखकर पकड़ना बहुत कठिन होता है। आधुनिक सॉफ्टवेयर इंजीनियरिंग में स्वचालित टूल्स का उपयोग किया जाता है:
१. कंपाइलर के सख्त वॉर्निंग फ्लैग्स:
कोड कंपाइल करते समय हमेशा सख्त फ्लैग्स का उपयोग करें:
'gcc -Wall -Wextra -Werror -pedantic program.c'
यह कंपाइलर को आदेश देता है कि वह किसी भी संदिग्ध कोड (जैसे बिना उपयोग किए गए वेरिएबल्स या टाइप मिसमैच) को एरर मानकर तुरंत कंपाइल रोक दे।
२. AddressSanitizer (ASan) और UBSan:
GCC और Clang कंपाइलर में शामिल ASan मेमोरी सुरक्षा का सबसे आधुनिक टूल है:
'gcc -fsanitize=address,undefined -g program.c'
जब इस प्रोग्राम को चलाया जाता है, तो ऐरे से बाहर निकलते ही (Buffer Overflow) या मेमोरी फ्री करने के बाद छूते ही (Use-After-Free) यह तुरंत सटीक लाइन नंबर के साथ एरर स्क्रीन पर दिखा देता है।
३. Valgrind Memcheck:
यह प्रोग्राम की हर मेमोरी मांग और रिलीज की निगरानी करता है और प्रोग्राम बंद होते ही बताता है कि कितनी बाइट्स मेमोरी लीक हुई और किस फंक्शन में free() लगाना छूट गया था।"""

# 5. Enlarge Topic 13: file-handling
extra_file_en = """

8. STREAM BUFFERING CONTROL, FLUSHING & TEMPORARY FILES:
- Controlling Stream Buffering (setvbuf):
Standard I/O performance can be fine-tuned by modifying stream buffer modes:
```c
int setvbuf(FILE *stream, char *buffer, int mode, size_t size);
```
Modes:
- _IOFBF: Full buffering (data written only when full buffer fills).
- _IOLBF: Line buffering (flushes on '\\n').
- _IONBF: No buffering (every byte written immediately).
- Forcing Disk Synchronization:
Calling fflush(fp) empties the user-space C runtime buffer into the OS kernel buffer. On POSIX systems, calling fsync(fileno(fp)) forces the kernel to physically write all dirty cache pages onto the magnetic platters or solid-state NAND cells of the disk.
- Secure Temporary Files:
Operating systems provide tmpfile() to create an anonymous binary file in the system temp directory. It automatically unlinks and destroys itself the instant fclose() is called or the process exits, eliminating the danger of sensitive temporary data remaining exposed on disk.
- File System Management Functions:
remove("old_log.txt") deletes a file from secondary storage, while rename("temp.dat", "final.dat") performs an atomic filename change."""

extra_file_hi = """

८. स्ट्रीम बफरिंग नियंत्रण, फ्लशिंग और सुरक्षित टेम्परेरी फाइल्स:
- बफरिंग को नियंत्रित करना (setvbuf):
C भाषा में I/O प्रदर्शन को बेहतर करने के लिए बफरिंग मोड को बदला जा सकता है:
'setvbuf(fp, buffer, _IOFBF, 8192);'
मोड्स:
- _IOFBF: फुल बफरिंग (पूरा बफर भरने पर ही डिस्क पर लिखा जाएगा)।
- _IOLBF: लाइन बफरिंग (न्यूलाइन आते ही फ्लश होगा)।
- _IONBF: बिना बफर (प्रत्येक बाइट तुरंत डिस्क पर जाएगा)।
- डिस्क सिंक्रोनाइजेशन और fflush:
'fflush(fp);' C लाइब्रेरी के बफर को तुरंत खाली करता है। ऑपरेटिंग सिस्टम स्तर पर डेटा को वास्तव में हार्ड डिस्क पर सुरक्षित करने के लिए fsync() का उपयोग किया जाता है।
- सुरक्षित अस्थायी फाइलें (tmpfile):
'tmpfile()' सिस्टम के टेम्परेरी फोल्डर में एक ऐसी गुप्त फाइल बनाता है जो प्रोग्राम बंद होते ही या fclose होते ही अपने आप डिस्क से हमेशा के लिए गायब (Delete) हो जाती है।
- फाइल हटाने और नाम बदलने के फंक्शन्स:
'remove("file.txt")' डिस्क से फाइल को हमेशा के लिए मिटा देता है, और 'rename("old.txt", "new.txt")' फाइल का नाम तुरंत बदल देता है।"""

# Apply insertions
# Topic 9
text = text.replace(
    '4. strcmp(str1, str2): Compares two strings lexicographically; returns 0 if equal, negative if str1 < str2, positive if str1 > str2."""',
    '4. strcmp(str1, str2): Compares two strings lexicographically; returns 0 if equal, negative if str1 < str2, positive if str1 > str2.' + extra_array_en + '"""'
)
text = text.replace(
    '४. strcmp(str1, str2): दो स्ट्रिंग्स की तुलना करता है; समान होने पर 0 लौटाता है।"""',
    '४. strcmp(str1, str2): दो स्ट्रिंग्स की तुलना करता है; समान होने पर 0 लौटाता है।' + extra_array_hi + '"""'
)

# Topic 10
text = text.replace(
    'perfectly simulating Pass-by-Reference (e.g., the classic swap(&a, &b) function)."""',
    'perfectly simulating Pass-by-Reference (e.g., the classic swap(&a, &b) function).' + extra_ptr_en + '"""'
)
text = text.replace(
    'सीधे मुख्य मेमोरी में बदलाव कर देता है (जैसे swap फंक्शन)।"""',
    'सीधे मुख्य मेमोरी में बदलाव कर देता है (जैसे swap फंक्शन)।' + extra_ptr_hi + '"""'
)

# Topic 11
text = text.replace(
    'unsigned int mode    : 3;  // Occupies exactly 3 bits (values 0-7)\n};\n```"""',
    'unsigned int mode    : 3;  // Occupies exactly 3 bits (values 0-7)\n};\n```' + extra_udt_en + '"""'
)
text = text.replace(
    'माइक्रोकंट्रोलर में मेमोरी की भारी बचत हो सके।"""',
    'माइक्रोकंट्रोलर में मेमोरी की भारी बचत हो सके।' + extra_udt_hi + '"""'
)

# Topic 12
text = text.replace(
    "compiling with '-DNDEBUG' completely disables all assert checks without runtime performance penalty!\"\"\"",
    "compiling with '-DNDEBUG' completely disables all assert checks without runtime performance penalty!" + extra_err_en + '"""'
)
text = text.replace(
    'जिससे बग को तुरंत पकड़ा जा सकता है।"""',
    'जिससे बग को तुरंत पकड़ा जा सकता है।' + extra_err_hi + '"""'
)

# Topic 13
text = text.replace(
    '- perror("Custom message"): Prints descriptive human-readable OS error string (such as "No such file or directory" or "Permission denied") to stderr."""',
    '- perror("Custom message"): Prints descriptive human-readable OS error string (such as "No such file or directory" or "Permission denied") to stderr.' + extra_file_en + '"""'
)
text = text.replace(
    '- perror("मैसेज"): सिस्टम में आई एरर का असली कारण स्क्रीन पर प्रिंट करता है।"""',
    '- perror("मैसेज"): सिस्टम में आई एरर का असली कारण स्क्रीन पर प्रिंट करता है।' + extra_file_hi + '"""'
)

with open("topics_t9_t13.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Expansion script complete.")
