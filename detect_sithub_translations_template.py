#!/usr/bin/env python3
"""
Template script for detecting translation issues in the /sithub page.
Customize the sithub_keys list based on your actual sithub page structure.
"""

import json
import re
import os
from pathlib import Path
from typing import List, Dict, Tuple

class SithubTranslationDetector:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        
        # TODO: Update these keys based on your actual sithub page structure
        # Check src/locales/en.json to find the correct key paths for sithub content
        self.sithub_keys = [
            # Example keys - REPLACE WITH ACTUAL KEYS FROM YOUR CODE
            "sithub.title",
            "sithub.subtitle", 
            "sithub.description",
            "sithub.features.title",
            "sithub.features.list.0",
            "sithub.features.list.1",
            "sithub.features.list.2",
            "sithub.features.list.3",
            "sithub.cta.button",
            "sithub.cta.text",
            # Add more keys as needed
        ]
    
    def load_translation_file(self, filepath: Path) -> Dict:
        """Load a JSON translation file."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError) as e:
            print(f"Error loading {filepath}: {e}")
            return {}
    
    def get_nested_value(self, data: Dict, key_path: str):
        """Get a nested value from dictionary using dot notation."""
        keys = key_path.split('.')
        current = data
        
        for key in keys:
            if isinstance(current, dict) and key in current:
                current = current[key]
            else:
                # Try to handle array indices
                if key.isdigit() and isinstance(current, list):
                    index = int(key)
                    if 0 <= index < len(current):
                        current = current[index]
                    else:
                        return None
                else:
                    return None
        return current
    
    def contains_english(self, text: str, lang_code: str) -> bool:
        """Check if text contains English words (for non-English languages)."""
        if lang_code == "en":
            return False
        
        if not isinstance(text, str):
            return False
        
        # Common English words that shouldn't appear in translations
        english_pattern = re.compile(
            r'\b(the|and|for|with|this|that|have|has|was|were|will|would|could|should)\b',
            re.IGNORECASE
        )
        
        return bool(english_pattern.search(text))
    
    def check_sithub_translations(self, lang_code: str) -> Dict:
        """Check sithub translations for a specific language."""
        if lang_code == "en":
            return {"status": "source_language"}
        
        lang_file = self.locales_dir / f"{lang_code}.json"
        if not lang_file.exists():
            return {"error": f"File not found: {lang_file}"}
        
        lang_data = self.load_translation_file(lang_file)
        if not lang_data:
            return {"error": f"Failed to load: {lang_file}"}
        
        results = {
            "missing_keys": [],
            "english_text": [],
            "placeholder_text": [],
            "total_checked": len(self.sithub_keys),
            "found_keys": 0
        }
        
        for key_path in self.sithub_keys:
            value = self.get_nested_value(lang_data, key_path)
            
            if value is None:
                results["missing_keys"].append(key_path)
            else:
                results["found_keys"] += 1
                
                # Check for English text in non-English translations
                if isinstance(value, str):
                    if self.contains_english(value, lang_code):
                        results["english_text"].append((key_path, value[:80]))
                    
                    # Check for placeholder-like text
                    if '{{' in value or '}}' in value or value.startswith('[') or value.endswith(']'):
                        results["placeholder_text"].append((key_path, value[:80]))
        
        return results
    
    def analyze_all_languages(self):
        """Analyze sithub translations across all languages."""
        print("Analyzing sithub page translations...")
        print("=" * 60)
        
        # Get all language files
        language_files = list(self.locales_dir.glob("*.json"))
        
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            print(f"\n{lang_code.upper()}:")
            
            results = self.check_sithub_translations(lang_code)
            
            if "error" in results:
                print(f"  Error: {results['error']}")
                continue
            
            # Print summary
            total_keys = results["total_checked"]
            found_keys = results["found_keys"]
            missing_keys = len(results["missing_keys"])
            english_text = len(results["english_text"])
            placeholders = len(results["placeholder_text"])
            
            completeness = (found_keys / total_keys) * 100 if total_keys > 0 else 0
            
            print(f"  Completeness: {completeness:.1f}% ({found_keys}/{total_keys} keys)")
            print(f"  Missing keys: {missing_keys}")
            print(f"  English text: {english_text}")
            print(f"  Placeholders: {placeholders}")
            
            if missing_keys > 0:
                print(f"  Missing key examples:")
                for key in results["missing_keys"][:3]:
                    print(f"    - {key}")
            
            if english_text > 0:
                print(f"  English text examples:")
                for key, text in results["english_text"][:2]:
                    print(f"    - {key}: '{text}...'")
    
    def generate_report(self, output_file: str = "sithub_translation_report.md"):
        """Generate comprehensive sithub translation report."""
        print(f"\nGenerating sithub translation report...")
        
        report = [
            "# Sithub Page Translation Analysis Report",
            f"Generated: {os.path.basename(__file__)}",
            "",
            "## Instructions",
            "1. First, update the `sithub_keys` list in this script with actual keys from your sithub page",
            "2. Check `src/locales/en.json` to find the correct key paths",
            "3. Run this script again to get accurate results",
            "",
            "## Analysis Results",
            "| Language | Completeness | Missing Keys | English Text | Placeholders |",
            "|----------|--------------|--------------|--------------|--------------|",
        ]
        
        # Get all language files
        language_files = list(self.locales_dir.glob("*.json"))
        
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            results = self.check_sithub_translations(lang_code)
            
            if "error" in results:
                report.append(f"| {lang_code.upper()} | ERROR | - | - | - |")
                continue
            
            total_keys = results["total_checked"]
            found_keys = results["found_keys"]
            missing_keys = len(results["missing_keys"])
            english_text = len(results["english_text"])
            placeholders = len(results["placeholder_text"])
            
            completeness = (found_keys / total_keys) * 100 if total_keys > 0 else 0
            
            report.append(
                f"| {lang_code.upper()} | {completeness:.1f}% | {missing_keys} | {english_text} | {placeholders} |"
            )
        
        # Add recommendations
        report.extend([
            "",
            "## Next Steps",
            "",
            "### 1. Identify Actual Sithub Keys",
            "```bash",
            "# Check English file for sithub-related keys",
            "grep -i 'sithub' src/locales/en.json",
            "```",
            "",
            "### 2. Update This Script",
            "Replace the `sithub_keys` list with actual keys from your codebase.",
            "",
            "### 3. Run Analysis",
            "```bash",
            "python detect_sithub_translations_template.py",
            "```",
            "",
            "### 4. Request Translations",
            "Use the prompt template in `translation_detection_instructions.md`",
            "",
            "## Support",
            "For help with this script, refer to the comprehensive guide in `translation_detection_instructions.md`",
        ])
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report))
        
        print(f"✅ Template report generated: {output_file}")
        print("\n⚠️  IMPORTANT: This is a template. You need to:")
        print("   1. Check your actual sithub page keys in src/locales/en.json")
        print("   2. Update the sithub_keys list in this script")
        print("   3. Run the script again for accurate results")
        
        return output_file

def main():
    detector = SithubTranslationDetector()
    
    print("Sithub Page Translation Detector (Template)")
    print("=" * 60)
    print("This is a template script. Before using it:")
    print("1. Check your sithub page structure")
    print("2. Update the sithub_keys list with actual keys")
    print("3. Then run this script for analysis")
    print("=" * 60)
    
    # Generate template report
    detector.generate_report()
    
    print("\n📋 Next steps:")
    print("1. Open src/locales/en.json and find sithub-related keys")
    print("2. Update the sithub_keys list in this script")
    print("3. Run: python detect_sithub_translations_template.py")
    print("\nFor detailed instructions, see: translation_detection_instructions.md")

if __name__ == "__main__":
    main()
