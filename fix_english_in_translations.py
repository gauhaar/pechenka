#!/usr/bin/env python3
"""
Script to detect and help fix English text in non-English translation files.
Generates a report with all English text found in translations.
"""

import json
import re
import os
from pathlib import Path
from typing import Dict, List, Tuple, Set
import argparse

class EnglishTextDetector:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        
        # Common English words that shouldn't appear in translations
        self.english_patterns = [
            r'\b(the|and|for|with|this|that|have|has|was|were|will|would|could|should)\b',
            r'\b(UI|AI|API|startup|stack|cloud|mobile|web|desktop)\b',
            r'\b(DDoS|SQLi|phishing|malware|spam|spoofing)\b',
            r'\b(CMC|SLA|OTT|RAG|IAM|CI/CD)\b',
        ]
        
        # Compile regex patterns
        self.patterns = [re.compile(pattern, re.IGNORECASE) for pattern in self.english_patterns]
    
    def contains_english(self, text: str, lang_code: str) -> bool:
        """Check if text contains English words (for non-English languages)."""
        if lang_code == "en":
            return False
        
        if not isinstance(text, str):
            return False
        
        # Check against all patterns
        for pattern in self.patterns:
            if pattern.search(text):
                return True
        
        return False
    
    def find_english_text_in_file(self, lang_code: str) -> List[Tuple[str, str]]:
        """Find all English text in a language file."""
        if lang_code == "en":
            return []
        
        lang_file = self.locales_dir / f"{lang_code}.json"
        if not lang_file.exists():
            return []
        
        with open(lang_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        results = []
        
        def traverse(obj, path=''):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    new_path = f"{path}.{key}" if path else key
                    traverse(value, new_path)
            elif isinstance(obj, list):
                for i, value in enumerate(obj):
                    new_path = f"{path}[{i}]"
                    traverse(value, new_path)
            elif isinstance(obj, str):
                if self.contains_english(obj, lang_code):
                    results.append((path, obj))
        
        traverse(data)
        return results
    
    def generate_report(self, output_file: str = "english_text_report.md"):
        """Generate report of English text found in all non-English files."""
        print("Generating English text detection report...")
        
        report = [
            "# English Text in Non-English Translations Report",
            f"Generated: {os.path.basename(__file__)}",
            "",
            "## Overview",
            "This report identifies English text found in non-English translation files.",
            "These should be translated to the target language.",
            "",
            "## Summary by Language",
            "| Language | English Text Found |",
            "|----------|-------------------|",
        ]
        
        # Get all language files
        language_files = list(self.locales_dir.glob("*.json"))
        total_english_text = 0
        
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            english_text = self.find_english_text_in_file(lang_code)
            count = len(english_text)
            total_english_text += count
            
            report.append(f"| {lang_code.upper()} | {count} |")
        
        report.extend([
            "",
            f"**Total English text found across all languages: {total_english_text}**",
            "",
            "## Detailed Findings",
        ])
        
        # Add detailed findings
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            english_text = self.find_english_text_in_file(lang_code)
            if english_text:
                report.append(f"\n### {lang_code.upper()} ({len(english_text)} occurrences)")
                
                # Group by first part of path (section)
                sections = {}
                for path, text in english_text:
                    section = path.split('.')[0] if '.' in path else path
                    if section not in sections:
                        sections[section] = []
                    sections[section].append((path, text))
                
                for section, items in sorted(sections.items()):
                    report.append(f"\n#### {section}")
                    for path, text in items[:10]:  # Limit to 10 per section
                        # Truncate long text
                        display_text = text[:100] + "..." if len(text) > 100 else text
                        report.append(f"- `{path}`: `{display_text}`")
                    if len(items) > 10:
                        report.append(f"- ... and {len(items) - 10} more")
        
        # Add recommendations
        report.extend([
            "",
            "## Recommendations",
            "",
            "### Immediate Actions:",
            "1. **Prioritize high-frequency languages** (based on your user base)",
            "2. **Focus on critical UI text** (buttons, headings, error messages)",
            "3. **Use professional translators** for accurate technical terminology",
            "",
            "### Technical Terms:",
            "Some English technical terms (AI, API, DDoS, etc.) may be acceptable in certain contexts.",
            "Consult with native speakers to determine which terms should be translated.",
            "",
            "### Process:",
            "1. Use this report to identify what needs translation",
            "2. Assign translations to native speakers or professional services",
            "3. Update the translation files",
            "4. Re-run this script to verify improvements",
            "",
            "## Next Steps",
            "1. Export this data for translation management systems",
            "2. Set up a translation workflow",
            "3. Schedule regular translation audits",
            "4. Consider implementing translation memory",
        ])
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report))
        
        print(f"✅ Report generated: {output_file}")
        return output_file
    
    def generate_translation_template(self, lang_code: str, output_file: str = None):
        """Generate a translation template for a specific language."""
        if lang_code == "en":
            print("Cannot generate template for English (source language)")
            return
        
        lang_file = self.locales_dir / f"{lang_code}.json"
        if not lang_file.exists():
            print(f"Language file not found: {lang_file}")
            return
        
        english_text = self.find_english_text_in_file(lang_code)
        if not english_text:
            print(f"No English text found in {lang_code.upper()}")
            return
        
        if output_file is None:
            output_file = f"{lang_code}_translation_template.txt"
        
        template = [
            f"# Translation Template for {lang_code.upper()}",
            f"Generated: {os.path.basename(__file__)}",
            "",
            "## Instructions",
            "1. Translate the English text below to the target language",
            "2. Maintain the same format and structure",
            "3. Keep technical terms consistent",
            "4. Preserve any variables or placeholders (e.g., {variable})",
            "",
            "## Text to Translate",
            "",
        ]
        
        for path, text in english_text:
            template.append(f"### {path}")
            template.append(f"**Current (English):** {text}")
            template.append(f"**Translation ({lang_code.upper()}):** ")
            template.append("")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(template))
        
        print(f"✅ Translation template generated: {output_file}")
        return output_file

def main():
    parser = argparse.ArgumentParser(description="Detect English text in non-English translations")
    parser.add_argument("--locales-dir", default="src/locales", help="Path to locales directory")
    parser.add_argument("--generate-report", action="store_true", help="Generate comprehensive report")
    parser.add_argument("--check-language", help="Check specific language (e.g., 'fr')")
    parser.add_argument("--generate-template", help="Generate translation template for language")
    parser.add_argument("--output", default="english_text_report.md", help="Output file for report")
    
    args = parser.parse_args()
    
    detector = EnglishTextDetector(args.locales_dir)
    
    if not detector.locales_dir.exists():
        print(f"Error: Locales directory not found at {detector.locales_dir}")
        return
    
    if args.generate_template:
        detector.generate_translation_template(args.generate_template)
    elif args.check_language:
        english_text = detector.find_english_text_in_file(args.check_language)
        print(f"English text found in {args.check_language.upper()}: {len(english_text)}")
        for path, text in english_text[:20]:  # Limit to first 20
            print(f"  - {path}: {text[:80]}...")
    else:
        # Default: generate report
        detector.generate_report(args.output)

if __name__ == "__main__":
    main()
