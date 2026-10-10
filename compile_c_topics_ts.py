#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Assembles all 13 topics from:
- topics_t1_t4.py
- topics_t5_t8.py
- topics_t9_t13.py
and writes out src/data/cTopics.ts
"""
import json
import os
from topics_master import MASTER_TOPICS
import topics_t1_t4
import topics_t5_t8
import topics_t9_t13

print(f"Total topics registered in MASTER_TOPICS: {len(MASTER_TOPICS)}")
assert len(MASTER_TOPICS) == 13, f"Expected 13 topics, got {len(MASTER_TOPICS)}"

# Sort by order
sorted_topics = sorted(MASTER_TOPICS, key=lambda x: x["order"])

output_lines = [
    "import { Topic, Milestone } from '../types';",
    "import { getTopicQuestionBank } from './topicQuestionBanks';",
    "",
    "/**",
    " * C-Mastery Complete 13 Topics Curriculum",
    " * Each topic includes textbook-grade theory (800+ words in both English & Hindi),",
    " * runnable C code examples, interactive practicals, key points, common pitfalls,",
    " * and a dedicated 40-question test (20 Easy + 20 Hard) for comprehensive mastery.",
    " */",
    "",
    "export const C_TOPICS: Topic[] = ["
]

for idx, topic in enumerate(sorted_topics):
    tid = topic["id"]
    t_order = topic["order"]
    t_title = topic["title"]
    t_title_hi = topic["titleHindi"]
    t_cat = topic["category"]
    t_sum = topic["summary"]
    t_sum_hi = topic["summaryHindi"]
    t_read_time = topic["readTimeMinutes"]
    t_exp_en = topic["explanationEn"]
    t_exp_hi = topic["explanationHi"]
    t_analogy = topic["realLifeAnalogy"]
    t_examples = topic["codeExamples"]
    t_practicals = topic["practicals"]
    t_key_points = topic["keyPoints"]
    t_pitfalls = topic["commonPitfalls"]

    obj = {
        "id": tid,
        "order": t_order,
        "title": t_title,
        "titleHindi": t_title_hi,
        "category": t_cat,
        "summary": t_sum,
        "summaryHindi": t_sum_hi,
        "readTimeMinutes": t_read_time,
        "explanationEn": t_exp_en,
        "explanationHi": t_exp_hi,
        "realLifeAnalogy": t_analogy,
        "codeExamples": t_examples,
        "practicals": t_practicals,
        "keyPoints": t_key_points,
        "commonPitfalls": t_pitfalls
    }

    raw_json = json.dumps(obj, ensure_ascii=False, indent=2)
    # Remove closing brace to insert quiz property
    trimmed_json = raw_json.rstrip().rstrip("}")
    topic_str = trimmed_json + f'  ,\n  "quiz": getTopicQuestionBank({json.dumps(tid)}, {json.dumps(t_title)})\n}}'
    
    comma = "," if idx < len(sorted_topics) - 1 else ""
    output_lines.append(topic_str + comma)

output_lines.append("];")
output_lines.append("")

# Milestones definition
milestones_code = '''
export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    title: 'C Fundamentals Pioneer',
    titleHindi: 'C भाषा के बुनियादी सिद्धांत (C Fundamentals)',
    description: 'Mastered Program Structure, Flowcharts, Data Types, and Logic',
    descriptionHindi: 'प्रोग्राम संरचना, फ्लोचार्ट, डेटा टाइप्स और 3-डिजिट लॉजिक में महारत',
    icon: '🌱',
    requiredProgress: 25,
    badgeName: 'Foundation Master'
  },
  {
    id: 'm2',
    title: 'Logic & Control Flow Expert',
    titleHindi: 'लॉजिक और कंट्रोल फ्लो विशेषज्ञ',
    description: 'Conquered Variables, Input/Output, Operators, and Control Statements',
    descriptionHindi: 'वेरिएबल्स, I/O, ऑपरेटर्स और कंट्रोल स्टेटमेंट्स में विशेषज्ञता',
    icon: '⚡',
    requiredProgress: 50,
    badgeName: 'Control Flow Pro'
  },
  {
    id: 'm3',
    title: 'Data Structures Craftsman',
    titleHindi: 'डेटा स्ट्रक्चर्स कारीगर',
    description: 'Mastered 1D/2D Arrays, Matrices, Strings, and Pointers',
    descriptionHindi: 'ऐरे, मैट्रिक्स, स्ट्रिंग्स और पॉइंटर्स को गहराई से समझा',
    icon: '🧩',
    requiredProgress: 75,
    badgeName: 'Memory & Pointer Ninja'
  },
  {
    id: 'm4',
    title: 'Systems & Types Architect',
    titleHindi: 'सिस्टम्स और डेटा टाइप्स आर्किटेक्ट',
    description: 'Mastered User-Defined Types (Struct, Union, Enum) and Debugging',
    descriptionHindi: 'स्ट्रक्चर्स, यूनियन्स, इनम्स और एरर डिबगिंग का संपूर्ण अध्ययन',
    icon: '🎯',
    requiredProgress: 90,
    badgeName: 'Systems Architect'
  },
  {
    id: 'm5',
    title: 'C Guru (File Handling Champion)',
    titleHindi: 'C गुरु (फाइल हैंडलिंग चैंपियन)',
    description: 'Completed 100% curriculum from Program Structure to File Handling',
    descriptionHindi: 'प्रोग्राम स्ट्रक्चर से फाइल हैंडलिंग तक सभी 13 टॉपिक्स व टेस्ट्स पूर्ण किए',
    icon: '🏆',
    requiredProgress: 100,
    badgeName: 'Certified C-Guru'
  }
];
'''
output_lines.append(milestones_code.strip())
output_lines.append("")

with open("src/data/cTopics.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Successfully generated src/data/cTopics.ts!")
