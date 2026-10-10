#!/usr/bin/env python3
import json

# Modules will register topics into this master dictionary
MASTER_QUESTIONS = {}

def register(topic_id, easy_list, hard_list):
    assert len(easy_list) == 20, f"{topic_id} easy must have 20 Qs, got {len(easy_list)}"
    assert len(hard_list) == 20, f"{topic_id} hard must have 20 Qs, got {len(hard_list)}"
    MASTER_QUESTIONS[topic_id] = {
        "easy": easy_list,
        "hard": hard_list
    }
    print(f"Registered {topic_id}: 40 questions (20 easy, 20 hard)")
