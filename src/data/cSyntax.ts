import { SyntaxItem } from '../types';

export const C_SYNTAX_DATA: SyntaxItem[] = [
  {
    id: 'syn-var',
    title: 'Variable Declaration & Initialization',
    titleHindi: 'Variable Banane aur Value Dalne ka Syntax',
    category: 'Basics',
    syntaxTemplate: `data_type variable_name = initial_value;
const data_type CONSTANT_NAME = fixed_value;`,
    description: 'Declares memory location with a specific type and optional initial value.',
    descriptionHindi: 'Data type ke sath variable ka naam aur value assign karna.',
    exampleSnippet: `int age = 21;
float salary = 45000.50f;
char grade = 'A';
const float PI = 3.14159f;`,
    notes: 'Rule: Variable names cannot start with a number and cannot be a C keyword.'
  },
  {
    id: 'syn-format',
    title: 'Format Specifiers Cheat Sheet (printf / scanf)',
    titleHindi: 'Format Specifiers ki Complete List',
    category: 'Basics',
    syntaxTemplate: `%[flags][width][.precision]specifier`,
    description: 'Placeholder codes telling printf/scanf how to format and interpret data.',
    descriptionHindi: 'printf aur scanf me data type batane wale placeholders.',
    exampleSnippet: `printf("%d", 100);       // %d for int
printf("%.2f", 3.14159); // %.2f for 2 decimal places
printf("%c", 'Z');       // %c for char
printf("%s", "C-Guru");  // %s for string
printf("%p", &var);      // %p for memory pointer address
printf("%lf", 99.99999); // %lf for double`,
    notes: 'Important: Always use & in scanf for numbers (e.g. scanf("%d", &x)).'
  },
  {
    id: 'syn-if',
    title: 'Conditional Branching (if, else if, else)',
    titleHindi: 'If-Else Condition ka Syntax',
    category: 'Conditionals',
    syntaxTemplate: `if (condition_1) {
    // executes if condition_1 is TRUE
} else if (condition_2) {
    // executes if condition_2 is TRUE
} else {
    // executes if all conditions are FALSE
}`,
    description: 'Executes different blocks of code depending on Boolean conditions.',
    descriptionHindi: 'Shart sahi hone par alag-alag code block chalane ke liye.',
    exampleSnippet: `if (marks >= 90) {
    printf("Grade A\\n");
} else if (marks >= 75) {
    printf("Grade B\\n");
} else {
    printf("Need Improvement\\n");
}`,
    notes: 'In C, 0 is FALSE and any non-zero number (1, -5, 100) is TRUE.'
  },
  {
    id: 'syn-switch',
    title: 'Switch-Case Statement Syntax',
    titleHindi: 'Switch-Case Statement ka Syntax',
    category: 'Conditionals',
    syntaxTemplate: `switch (integral_expression) {
    case value1:
        // statements
        break;
    case value2:
        // statements
        break;
    default:
        // default statements
}`,
    description: 'Multi-way branch statement testing a single variable against constants.',
    descriptionHindi: 'Fixed values ke sath match karne ke liye switch use hota hai.',
    exampleSnippet: `switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    default: printf("Weekend!\\n");
}`,
    notes: 'Crucial: Never forget "break;" unless fallthrough is intentionally desired.'
  },
  {
    id: 'syn-for',
    title: 'For Loop Syntax',
    titleHindi: 'For Loop ka Syntax (Ginti wale loops)',
    category: 'Loops',
    syntaxTemplate: `for (initialization; condition; increment/decrement) {
    // loop body
}`,
    description: 'Entry-controlled loop ideal when iteration count is known beforehand.',
    descriptionHindi: 'Jab pata ho ki kitni baar loop chalana hai.',
    exampleSnippet: `for (int i = 0; i < 5; i++) {
    printf("Iteration %d\\n", i);
}`,
    notes: 'Notice: Semicolon separates the three clauses: init; cond; update.'
  },
  {
    id: 'syn-while',
    title: 'While & Do-While Loops Syntax',
    titleHindi: 'While aur Do-While Loop ka Syntax',
    category: 'Loops',
    syntaxTemplate: `// While Loop (Entry-controlled):
while (condition) {
    // code
}

// Do-While Loop (Exit-controlled, runs at least once!):
do {
    // code
} while (condition);`,
    description: 'while checks condition first. do-while executes body before checking.',
    descriptionHindi: 'do-while kam se kam 1 baar zaroor chalta hai.',
    exampleSnippet: `int count = 1;
while (count <= 3) {
    printf("%d ", count++);
}

int x = 10;
do {
    printf("Runs once!\\n");
} while (x < 5);`,
    notes: 'do-while is the only loop ending with a semicolon: while(cond);'
  },
  {
    id: 'syn-func',
    title: 'Function Declaration, Definition & Call',
    titleHindi: 'Function Banane aur Call Karne ka Syntax',
    category: 'Functions',
    syntaxTemplate: `// 1. Prototype Declaration:
return_type function_name(param_type1, param_type2);

// 2. Function Definition:
return_type function_name(type1 param1, type2 param2) {
    // logic
    return result;
}

// 3. Function Call:
return_type var = function_name(arg1, arg2);`,
    description: 'Reusable modular code blocks that take inputs and return an output.',
    descriptionHindi: 'Code ko functions me baant kar baar-baar use karna.',
    exampleSnippet: `int multiply(int a, int b) {
    return a * b;
}

int main() {
    int ans = multiply(4, 5); // ans = 20
    return 0;
}`,
    notes: 'Use "void" if the function does not return any value.'
  },
  {
    id: 'syn-pointer',
    title: 'Pointer Declaration, Address (&) & Dereference (*)',
    titleHindi: 'Pointers ka Asli Syntax (& aur *)',
    category: 'Pointers',
    syntaxTemplate: `data_type *pointer_name; // Declaration
pointer_name = &variable; // Store address
*pointer_name = new_val;  // Dereference & modify value`,
    description: 'Storing memory address of another variable and accessing values directly.',
    descriptionHindi: 'Memory address store karne ke liye * aur address lene ke liye &.',
    exampleSnippet: `int age = 25;
int *p = &age; // p holds address of age

printf("Address: %p\\n", p);
printf("Value: %d\\n", *p); // prints 25

*p = 30; // changes age to 30!`,
    notes: '& means "Address of". * means "Value at Address".'
  },
  {
    id: 'syn-struct',
    title: 'Structures (struct) & Arrow (->) Operator',
    titleHindi: 'Structure aur Arrow Operator ka Syntax',
    category: 'Structures',
    syntaxTemplate: `struct StructName {
    type1 member1;
    type2 member2;
};

// With pointer:
struct StructName *ptr = &my_struct;
ptr->member1; // Arrow operator`,
    description: 'Grouping diverse data types under a single unified record.',
    descriptionHindi: 'Alag-alag data types ko ek sath pack karne ke liye struct banate hain.',
    exampleSnippet: `struct Student {
    int roll;
    char name[50];
};

struct Student s1 = {101, "Kuldeep"};
struct Student *ptr = &s1;
printf("Roll: %d, Name: %s\\n", ptr->roll, ptr->name);`,
    notes: 'Use dot (.) for normal variables and arrow (->) for pointers.'
  },
  {
    id: 'syn-dma',
    title: 'Dynamic Memory (malloc, calloc, free)',
    titleHindi: 'Heap Memory Allocation ka Syntax',
    category: 'Memory & Files',
    syntaxTemplate: `// malloc (uninitialized):
type *ptr = (type*) malloc(num_elements * sizeof(type));

// calloc (zero-initialized):
type *ptr = (type*) calloc(num_elements, sizeof(type));

// free (prevent memory leak):
free(ptr);
ptr = NULL;`,
    description: 'Requesting runtime memory from heap and releasing it safely.',
    descriptionHindi: 'Heap memory lena aur kaam hone par free() karke NULL karna.',
    exampleSnippet: `int *arr = (int*) malloc(5 * sizeof(int));
if (arr != NULL) {
    arr[0] = 99;
    free(arr);
    arr = NULL;
}`,
    notes: 'Golden Rule: Always check if ptr == NULL after malloc/calloc!'
  },
  {
    id: 'syn-file',
    title: 'File Handling (fopen, fprintf, fscanf, fclose)',
    titleHindi: 'File Handling ka Complete Syntax',
    category: 'Memory & Files',
    syntaxTemplate: `FILE *fp = fopen("filename.txt", "mode"); // modes: "r", "w", "a"
if (fp == NULL) { /* handle error */ }

fprintf(fp, "Formatted text: %d\\n", val); // Write
fscanf(fp, "%d", &val);                    // Read

fclose(fp); // Always close!`,
    description: 'Interacting with storage disks to permanently persist application data.',
    descriptionHindi: 'Hard drive par file kholna, data likhna, padhna aur band karna.',
    exampleSnippet: `FILE *fp = fopen("data.txt", "w");
if (fp != NULL) {
    fprintf(fp, "C-Guru Student: Kuldeep\\n");
    fclose(fp);
}`,
    notes: 'Mode "w" wipes old file contents. Mode "a" appends without deleting.'
  }
];
