# Translation Detection and Completion Guide

## Overview
This guide explains how to detect missing languages and incomplete translations in your web application, specifically for the /services and /sithub pages.

## 1. How to Detect Missing Languages

### Step 1: Check Available Language Files
List all language files in your `src/locales/` directory:
```bash
ls src/locales/*.json
```

### Step 2: Compare with Master Language List
Compare against your master language list (`docs/languages-list.txt`):
```python
import os

# Read master language list
with open('docs/languages-list.txt', 'r') as f:
    master_languages = [line.strip() for line in f if line.strip()]

# Get existing language files
locale_files = os.listdir('src/locales')
existing_languages = [f.replace('.json', '') for f in locale_files if f.endswith('.json')]

# Find missing languages
missing_languages = [lang for lang in master_languages if lang not in existing_languages]
print(f"Missing language files: {missing_languages}")
```

### Step 3: Create Missing Language Files
For each missing language, create a basic JSON file:
```python
import json
import shutil

# Copy structure from English file
with open('src/locales/en.json', 'r') as f:
    english_data = json.load(f)

for lang in missing_languages:
    # Create empty structure or copy English as placeholder
    with open(f'src/locales/{lang}.json', 'w') as f:
        json.dump(english_data, f, ensure_ascii=False, indent=2)
    print(f"Created: {lang}.json")
```

## 2. How to Detect Incomplete Translations

### Method 1: Using the Detection Script
Run the existing detection script:
```bash
# For services page
python detect_services_translations.py

# For sithub page (if available)
python detect_sithub_translations.py
```

### Method 2: Manual Key Comparison
Compare keys between English and target language:
```python
import json

def compare_translation_keys(source_lang='en', target_lang='fr'):
    with open(f'src/locales/{source_lang}.json', 'r') as f:
        source_data = json.load(f)
    
    with open(f'src/locales/{target_lang}.json', 'r') as f:
        target_data = json.load(f)
    
    def get_all_keys(data, prefix=''):
        keys = []
        for key, value in data.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                keys.extend(get_all_keys(value, full_key))
            else:
                keys.append(full_key)
        return keys
    
    source_keys = set(get_all_keys(source_data))
    target_keys = set(get_all_keys(target_data))
    
    missing_keys = source_keys - target_keys
    extra_keys = target_keys - source_keys
    
    return {
        'missing': sorted(missing_keys),
        'extra': sorted(extra_keys),
        'total_source': len(source_keys),
        'total_target': len(target_keys)
    }
```

### Method 3: Detect English Text in Non-English Files
Use regex patterns to find English words in translations:
```python
import re

def detect_english_text(text, lang_code):
    if lang_code == 'en':
        return False
    
    # Common English words pattern
    english_pattern = re.compile(r'\b(the|and|for|with|this|that|have|has|was|were|will|would|could|should|UI|AI|API|startup|stack)\b', re.IGNORECASE)
    
    return bool(english_pattern.search(text))
```

## 3. How to Create a Detection Script

### Basic Detection Script Template
```python
#!/usr/bin/env python3
"""
Template for detecting translation issues in any page.
"""

import json
import re
import os
from pathlib import Path

class TranslationDetector:
    def __init__(self, page_name, key_patterns, locales_dir="src/locales"):
        self.page_name = page_name
        self.key_patterns = key_patterns  # List of key patterns for this page
        self.locales_dir = Path(locales_dir)
    
    def analyze_language(self, lang_code):
        """Analyze a specific language for this page."""
        if lang_code == 'en':
            return {'status': 'source_language'}
        
        file_path = self.locales_dir / f"{lang_code}.json"
        if not file_path.exists():
            return {'error': 'file_not_found'}
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        results = {
            'missing_keys': [],
            'english_text': [],
            'placeholder_text': []
        }
        
        for key_pattern in self.key_patterns:
            # Navigate to the key
            keys = key_pattern.split('.')
            current = data
            
            for key in keys:
                if isinstance(current, dict) and key in current:
                    current = current[key]
                else:
                    results['missing_keys'].append(key_pattern)
                    break
            else:
                # Key found, check for issues
                if isinstance(current, str):
                    # Check for English text
                    if self._contains_english(current, lang_code):
                        results['english_text'].append((key_pattern, current[:80]))
                    
                    # Check for placeholders
                    if '{{' in current or '}}' in current:
                        results['placeholder_text'].append((key_pattern, current[:80]))
        
        return results
    
    def _contains_english(self, text, lang_code):
        """Check if text contains English words."""
        if lang_code == 'en':
            return False
        
        english_words = [
            'the', 'and', 'for', 'with', 'this', 'that', 'have', 'has',
            'was', 'were', 'will', 'would', 'could', 'should', 'UI', 'AI',
            'API', 'startup', 'stack', 'cloud', 'mobile', 'web', 'desktop'
        ]
        
        pattern = r'\b(' + '|'.join(english_words) + r')\b'
        return bool(re.search(pattern, text, re.IGNORECASE))
    
    def generate_report(self, output_file=None):
        """Generate analysis report for all languages."""
        report_lines = [f"# {self.page_name} Translation Analysis", ""]
        
        for lang_file in sorted(self.locales_dir.glob("*.json")):
            lang_code = lang_file.stem
            if lang_code == 'en':
                continue
            
            results = self.analyze_language(lang_code)
            
            if 'error' in results:
                report_lines.append(f"## {lang_code.upper()}: ERROR - {results['error']}")
                continue
            
            report_lines.append(f"## {lang_code.upper()}")
            report_lines.append(f"- Missing keys: {len(results['missing_keys'])}")
            report_lines.append(f"- English text: {len(results['english_text'])}")
            report_lines.append(f"- Placeholders: {len(results['placeholder_text'])}")
            
            if results['english_text']:
                report_lines.append("  English text found:")
                for key, text in results['english_text'][:3]:
                    report_lines.append(f"  - `{key}`: `{text}...`")
            
            report_lines.append("")
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write('\n'.join(report_lines))
            print(f"Report saved to: {output_file}")
        
        return '\n'.join(report_lines)

# Example usage for /sithub page
if __name__ == "__main__":
    # Define sithub page keys (you need to identify these from the sithub page)
    sithub_keys = [
        "sithub.title",
        "sithub.subtitle",
        "sithub.description",
        "sithub.features.title",
        "sithub.features.list",
        "sithub.cta.button",
        "sithub.cta.text"
    ]
    
    detector = TranslationDetector(
        page_name="/sithub Page",
        key_patterns=sithub_keys
    )
    
    report = detector.generate_report("sithub_translation_report.md")
    print(report)
```

## 4. Best Practices for Translation Management

### 1. **Regular Audits**
- Run detection scripts monthly
- Check new language additions against master list
- Verify translations after major updates

### 2. **Quality Control**
- Use native speakers for review
- Test UI with different text lengths
- Check for cultural appropriateness

### 3. **Automation**
- Integrate detection into CI/CD pipeline
- Set up alerts for missing translations
- Automate reporting

### 4. **Documentation**
- Maintain translation style guide
- Document technical term decisions
- Keep changelog of translation updates

## 5. Quick Commands Reference

```bash
# Check all languages for a page
python detect_services_translations.py --generate-report

# Check specific language
python detect_services_translations.py --check-language fr

# Create missing language files
python create_missing_languages.py

# Compare two languages
python compare_translations.py en fr
```

## 6. Troubleshooting

### Common Issues:
1. **False positives for English text**: Technical terms (UI, AI, API) may be flagged
2. **Missing keys**: New features added to English but not translated
3. **Format issues**: Special characters or line breaks causing display problems

### Solutions:
1. Adjust detection patterns for technical terms
2. Use key comparison scripts to identify gaps
3. Test translations in actual UI components

---

*Last Updated: [Current Date]*
*For questions: [Contact Information]*
