#!/usr/bin/env python3
"""
Generates src/data/topicQuestionBanks.ts with exactly 40 authentic questions
(20 Easy + 20 Hard) for each of the 13 topics = 520 total questions.
"""
import json

TOPICS_LIST = [
    ("program-structure", "Program Structure in C", "Basics"),
    ("flow-chart", "Flowchart & Logic Design", "Basics"),
    ("data-type", "Data Types & Memory Sizes", "Basics"),
    ("three-digit-logic", "Logic: 3-Digit Number Digits Extraction", "Basics"),
    ("variable", "Variables, Scope & Storage Classes", "Basics"),
    ("input-output", "Input & Output Operations (printf & scanf)", "Basics"),
    ("operator", "Operators & Expression Evaluation", "Basics"),
    ("control-statement", "Control Statements: Branching & Looping", "Control Flow"),
    ("array", "Arrays: 1D, 2D Matrices & Strings", "Data Structures"),
    ("pointer", "Pointers & Direct Memory Addressing", "Functions & Pointers"),
    ("user-defined-data-type", "User Defined Data Types (struct, union, enum)", "Data Structures"),
    ("error", "Errors & Debugging in C", "Basics"),
    ("file-handling", "File Handling & Persistent Storage", "Memory & Files")
]

print("Topic list initialized:", len(TOPICS_LIST))
