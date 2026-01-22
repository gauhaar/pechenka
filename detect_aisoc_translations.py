#!/usr/bin/env python3
"""
Specialized script to detect missing or incorrect translations in the /ai-soc/ page.
This script focuses specifically on the AI-SOC-related translation keys.
"""

import json
import re
import os
from pathlib import Path
from typing import Dict, List, Tuple, Set
import argparse

class AisocTranslationDetector:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        self.english_file = self.locales_dir / "en.json"
        
        # Define the specific AI-SOC-related keys we want to check
        self.aisoc_keys = [
            # AiSocLanding.jsx
            "solution.sectionTitle",
            "solution.sectionSubtitle",
            
            # Hero.jsx
            "hero.headline",
            "hero.playgroundHeading",
            "hero.tooltips.web.title",
            "hero.tooltips.web.content",
            "hero.tooltips.email.title",
            "hero.tooltips.email.content",
            "hero.subheading",
            "hero.bullets.web",
            "hero.bullets.email",
            "hero.buttons.connect",
            
            # Pricing.jsx
            "pricing.title",
            "pricing.plans.globalShield.title",
            "pricing.plans.globalShield.price",
            "pricing.plans.globalShield.description",
            "pricing.plans.globalShield.button",
            "pricing.plans.globalShield.features.webProtection",
            "pricing.plans.globalShield.features.ddosProtection",
            "pricing.plans.globalShield.features.cmc",
            "pricing.plans.globalShield.features.country",
            "pricing.plans.globalShield.features.port",
            "pricing.plans.emailProtector.title",
            "pricing.plans.emailProtector.price",
            "pricing.plans.emailProtector.description",
            "pricing.plans.emailProtector.button",
            "pricing.plans.emailProtector.features.cmcEmail",
            "pricing.plans.emailProtector.features.visibility",
            "pricing.plans.emailProtector.features.webClient",
            "pricing.plans.emailProtector.features.phishing",
            "pricing.plans.emailProtector.features.malware",
            "pricing.plans.emailProtector.features.links",
            "pricing.plans.emailProtector.features.spam",
            "pricing.plans.emailProtector.features.fakeSender",
            "pricing.tooltips.cmcGlobal.title",
            "pricing.tooltips.cmcGlobal.content",
            "pricing.tooltips.countryBlacklisting.title",
            "pricing.tooltips.countryBlacklisting.content",
            "pricing.tooltips.portManagement.title",
            "pricing.tooltips.portManagement.content",
            "pricing.tooltips.cmcEmail.title",
            "pricing.tooltips.cmcEmail.content",
            "pricingCta.requestSystem",
            
            # Insights.jsx
            "insights.items.0.title",
            "insights.items.0.description",
            "insights.items.1.title",
            "insights.items.1.description",
            "insights.items.2.title",
            "insights.items.2.description",
            
            # StickyScrollSolution.jsx
            "stickySolution.webSecurity.title",
            "stickySolution.webSecurity.description",
            "stickySolution.ciaMonitoring.title",
            "stickySolution.ciaMonitoring.description",
            "stickySolution.userGrowth.title",
            "stickySolution.userGrowth.description",
            "stickySolution.aiEmailProtection.title",
            "stickySolution.aiEmailProtection.description",
            "stickySolution.emailVisualization.title",
            "stickySolution.emailVisualization.description",
            "stickySolution.secureWebmail.title",
            "stickySolution.secureWebmail.description",
            
            # CybersecurityLamp.jsx
            "lamp.title",
            
            # FloatingText.jsx
            "floatingText.headline",
            "floatingText.description",
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
                return None
        return current
    
    def check_aisoc_translations(self, lang_code: str) -> Dict:
        """
        Check AI-SOC-related translations for a specific language.
        Returns dictionary with analysis results.
        """
        if lang_code == "en":
            return {}
        
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
            "total_checked": len(self.aisoc_keys),
            "found_keys": 0
        }
        
        # Check each AI-SOC key
        for key_path in self.aisoc_keys:
            value = self.get_nested_value(lang_data, key_path)
            
            if value is None:
                results["missing_keys"].append(key_path)
            else:
                results["found_keys"] += 1
                
                # Check for English text in non-English translations
                if lang_code != "en" and isinstance(value, str):
                    # Check for common English words
                    english_pattern = re.compile(
                        r'\b(the|and|for|with|this|that|have|has|was|were|will|would|could|should)\b',
                        re.IGNORECASE
                    )
                    if english_pattern.search(value):
                        results["english_text"].append((key_path, value[:80]))
                    
                    # Check for placeholder-like text
                    if '{{' in value or '}}' in value or value.startswith('[') or value.endswith(']'):
                        results["placeholder_text"].append((key_path, value[:80]))
        
        return results
    
    def analyze_all_languages(self) -> Dict[str, Dict]:
        """Analyze AI-SOC translations across all languages."""
        print("Analyzing AI-SOC page translations...")
        print("=" * 60)
        
        results = {}
        
        # Get all language files
        language_files = list(self.locales_dir.glob("*.json"))
        
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            print(f"\n{lang_code.upper()}:")
            
            lang_results = self.check_aisoc_translations(lang_code)
            
            if "error" in lang_results:
                print(f"  Error: {lang_results['error']}")
                continue
            
            results[lang_code] = lang_results
            
            # Print summary
            total_keys = lang_results["total_checked"]
            found_keys = lang_results["found_keys"]
            missing_keys = len(lang_results["missing_keys"])
            english_text = len(lang_results["english_text"])
            placeholders = len(lang_results["placeholder_text"])
            
            completeness = (found_keys / total_keys) * 100 if total_keys > 0 else 0
            
            print(f"  Completeness: {completeness:.1f}% ({found_keys}/{total_keys} keys)")
            print(f"  Missing keys: {missing_keys}")
            print(f"  English text: {english_text}")
            print(f"  Placeholders: {placeholders}")
            
            if missing_keys > 0:
                print(f"  Missing key examples:")
                for key in lang_results["missing_keys"][:3]:
                    print(f"    - {key}")
            
            if english_text > 0:
                print(f"  English text examples:")
                for key, text in lang_results["english_text"][:2]:
                    print(f"    - {key}: '{text}...'")
        
        return results
    
    def generate_aisoc_report(self, output_file: str = "aisoc_translation_report.md"):
        """Generate comprehensive AI-SOC translation report."""
        print(f"\nGenerating AI-SOC translation report...")
        
        results = self.analyze_all_languages()
        
        report = [
            "# AI-SOC Page Translation Analysis Report",
            f"Generated: {os.path.basename(__file__)}",
            "",
            "## Overview",
            f"Analyzed {len(results)} languages for AI-SOC page translations.",
            "",
            "## Key Metrics",
            "| Language | Completeness | Missing Keys | English Text | Placeholders |",
            "|----------|--------------|--------------|--------------|--------------|",
        ]
        
        # Calculate overall statistics
        total_languages = len(results)
        complete_languages = 0
        languages_with_issues = 0
        
        for lang_code, data in sorted(results.items()):
            if "error" in data:
                continue
            
            total_keys = data["total_checked"]
            found_keys = data["found_keys"]
            missing_keys = len(data["missing_keys"])
            english_text = len(data["english_text"])
            placeholders = len(data["placeholder_text"])
            
            completeness = (found_keys / total_keys) * 100 if total_keys > 0 else 0
            
            report.append(
                f"| {lang_code.upper()} | {completeness:.1f}% | {missing_keys} | {english_text} | {placeholders} |"
            )
            
            if missing_keys == 0 and english_text == 0 and placeholders == 0:
                complete_languages += 1
            else:
                languages_with_issues += 1
        
        # Add summary
        report.extend([
            "",
            "## Summary",
            f"- **Total languages analyzed**: {total_languages}",
            f"- **Fully complete languages**: {complete_languages}",
            f"- **Languages with issues**: {languages_with_issues}",
            "",
            "## Detailed Findings",
        ])
        
        # Add detailed findings for languages with issues
        for lang_code, data in sorted(results.items()):
            if "error" in data:
                continue
            
            missing_keys = len(data["missing_keys"])
            english_text = len(data["english_text"])
            placeholders = len(data["placeholder_text"])
            
            if missing_keys > 0 or english_text > 0 or placeholders > 0:
                report.append(f"\n### {lang_code.upper()}")
                
                if missing_keys > 0:
                    report.append(f"#### Missing Keys ({missing_keys}):")
                    for key in data["missing_keys"][:10]:  # Limit to first 10
                        report.append(f"- `{key}`")
                    if missing_keys > 10:
                        report.append(f"- ... and {missing_keys - 10} more")
                
                if english_text > 0:
                    report.append(f"\n#### English Text Found ({english_text}):")
                    for key, text in data["english_text"][:5]:  # Limit to first 5
                        report.append(f"- `{key}`: `{text}...`")
                    if english_text > 5:
                        report.append(f"- ... and {english_text - 5} more")
                
                if placeholders > 0:
                    report.append(f"\n#### Placeholder Text ({placeholders}):")
                    for key, text in data["placeholder_text"][:5]:  # Limit to first 5
                        report.append(f"- `{key}`: `{text}...`")
                    if placeholders > 5:
                        report.append(f"- ... and {placeholders - 5} more")
        
        # Add recommendations
        report.extend([
            "",
            "## Recommendations",
            "",
            "### Immediate Actions:",
            "1. **Add missing keys** identified in the report",
            "2. **Translate English text** found in non-English files",
            "3. **Replace placeholders** with actual translations",
            "",
            "### For AI-SOC Page Specifically:",
            "1. Ensure all cybersecurity terminology is properly translated",
            "2. Verify pricing and feature descriptions are culturally appropriate",
            "3. Check that technical terms are consistently translated",
            "",
            "### Quality Assurance:",
            "1. Test the /ai-soc/ page in each language",
            "2. Verify layout doesn't break with longer/shorter translations",
            "3. Check that all interactive elements work correctly",
            "",
            "## Next Steps",
            "1. Use this report to prioritize translation work",
            "2. Assign translations to native speakers",
            "3. Schedule review and testing sessions",
            "4. Update translations in the codebase",
            "5. Re-run this script to verify improvements",
        ])
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report))
        
        print(f"✅ Report generated: {output_file}")
        return output_file

def main():
    parser = argparse.ArgumentParser(description="Detect missing translations for /ai-soc/ page")
    parser.add_argument("--locales-dir", default="src/locales", help="Path to locales directory")
    parser.add_argument("--analyze", action="store_true", help="Analyze AI-SOC translations")
    parser.add_argument("--generate-report", action="store_true", help="Generate AI-SOC report")
    parser.add_argument("--check-language", help="Check specific language (e.g., 'fr')")
    parser.add_argument("--output", default="aisoc_translation_report.md", help="Output file")
    
    args = parser.parse_args()
    
    detector = AisocTranslationDetector(args.locales_dir)
    
    if not detector.locales_dir.exists():
        print(f"Error: Locales directory not found at {detector.locales_dir}")
        return
    
    if args.check_language:
        print(f"Checking AI-SOC translations for {args.check_language}...")
        results = detector.check_aisoc_translations(args.check_language)
        
        if "error" in results:
            print(f"Error: {results['error']}")
            return
        
        print(f"\nResults for {args.check_language.upper()}:")
        print(f"  Total keys checked: {results['total_checked']}")
        print(f"  Keys found: {results['found_keys']}")
        print(f"  Missing keys: {len(results['missing_keys'])}")
        print(f"  English text: {len(results['english_text'])}")
        print(f"  Placeholders: {len(results['placeholder_text'])}")
        
        if results['missing_keys']:
            print(f"\nMissing keys:")
            for key in results['missing_keys'][:10]:
                print(f"  - {key}")
        
        if results['english_text']:
            print(f"\nEnglish text found:")
            for key, text in results['english_text'][:5]:
                print(f"  - {key}: '{text}...'")
    
    elif args.generate_report or not any([args.analyze, args.check_language]):
        detector.generate_aisoc_report(args.output)
    
    if args.analyze:
        detector.analyze_all_languages()

if __name__ == "__main__":
    main()
