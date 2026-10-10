#!/usr/bin/env python3
import json

MASTER_TOPICS = []

def count_words(text):
    return len(text.strip().split())

def register_topic(topic_dict):
    en_words = count_words(topic_dict.get('explanationEn', ''))
    hi_words = count_words(topic_dict.get('explanationHi', ''))
    print(f"Topic {topic_dict['id']}: EN words = {en_words}, HI words = {hi_words}")
    assert en_words >= 800, f"Topic {topic_dict['id']} explanationEn must have >= 800 words, got {en_words}"
    assert hi_words >= 800, f"Topic {topic_dict['id']} explanationHi must have >= 800 words, got {hi_words}"
    MASTER_TOPICS.append(topic_dict)
    print(f"Successfully registered topic: {topic_dict['id']} (Order: {topic_dict['order']})")
