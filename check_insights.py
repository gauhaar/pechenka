#!/usr/bin/env python3
"""
Quick script to check which languages have insights translations.
"""

import json
import os
from pathlib import Path

def check_insights():
    locales_dir = Path("src/locales")
    
    print("Checking insights translations in all languages...")
    print("=" * 60)
    
    for lang_file in sorted(locales_dir.glob("*.json")):
        lang_code = lang_file.stem
        
        with open(lang_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check if insights exists
        if "insights" not in data:
            print(f"{lang_code.upper()}: NO 'insights' key found")
            continue
        
        insights = data.get("insights", {})
        
        # Check if items array exists
        if "items" not in insights:
            print(f"{lang_code.upper()}: NO 'insights.items' array found")
            continue
        
        items = insights.get("items", [])
        
        if len(items) < 3:
            print(f"{lang_code.upper()}: Only {len(items)} items in insights.items (expected 3)")
            continue
        
        # Check each item
        missing_items = []
        for i, item in enumerate(items):
            if not isinstance(item, dict):
                missing_items.append(f"item {i} not a dict")
                continue
            
            if "title" not in item or not item["title"]:
                missing_items.append(f"item {i} missing title")
            
            if "description" not in item or not item["description"]:
                missing_items.append(f"item {i} missing description")
        
        if missing_items:
            print(f"{lang_code.upper()}: Issues: {', '.join(missing_items)}")
        else:
            # Check if translations are in English
            english_words = 0
            for i, item in enumerate(items):
                title = item.get("title", "")
                desc = item.get("description", "")
                
                # Simple English word check
                english_indicators = ["seconds", "DDoS", "websites", "hacked", "attack", "every"]
                for word in english_indicators:
                    if word.lower() in title.lower() or word.lower() in desc.lower():
                        english_words += 1
                        break
            
            if english_words > 0:
                print(f"{lang_code.upper()}: OK but has {english_words} English items")
            else:
                print(f"{lang_code.upper()}: OK (fully translated)")

if __name__ == "__main__":
    check_insights()
