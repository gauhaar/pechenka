#!/usr/bin/env python3
"""
Specialized script to detect missing or incorrect translations in the /services/ page.
This script focuses specifically on the services-related translation keys.
"""

import json
import re
import os
from pathlib import Path
from typing import Dict, List, Tuple, Set
import argparse

class ServicesTranslationDetector:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        self.english_file = self.locales_dir / "en.json"
        
        # Define the specific services-related keys we want to check
        self.services_keys = [
            # ServicesBlock component keys
            "servicesBlock.badge",
            "servicesBlock.title", 
            "servicesBlock.description",
            "servicesBlock.learnMore",
            "servicesBlock.learnMoreAria",
            
            # Services within ServicesBlock
            "servicesBlock.services.aiAgents.title",
            "servicesBlock.services.aiAgents.description",
            "servicesBlock.services.aiAgents.tag",
            
            "servicesBlock.services.customSoftware.title",
            "servicesBlock.services.customSoftware.description",
            "servicesBlock.services.customSoftware.tag",
            
            "servicesBlock.services.cybersecurity.title",
            "servicesBlock.services.cybersecurity.description",
            "servicesBlock.services.cybersecurity.tag",
            
            "servicesBlock.services.backend.title",
            "servicesBlock.services.backend.description",
            "servicesBlock.services.backend.tag",
            
            "servicesBlock.services.mobile.title",
            "servicesBlock.services.mobile.description",
            "servicesBlock.services.mobile.tag",
            
            # Other components that might appear on /services/ page
            "heroSection.badge",
            "heroSection.title",
            "heroSection.description",
            "heroSection.country",
            "heroSection.market",
            "heroSection.startProject",
            "heroSection.liveDemo",
            
            "whyChooseUs.badge",
            "whyChooseUs.title",
            "whyChooseUs.subtitle",
            "whyChooseUs.subtitleHighlight",
            "whyChooseUs.subtitleTail",
            "whyChooseUs.learnMore",
            
            "pricing.title",
            "pricing.subtitle",
            "pricing.percentMaintenance",
            "pricing.planEstimate",
            "pricing.perYear",
            
            "caseStudies.badge",
            "caseStudies.title",
            "caseStudies.subtitle",
            "caseStudies.problem",
            "caseStudies.solution",
            "caseStudies.liveImpact",
            "caseStudies.before",
            "caseStudies.after",
            "caseStudies.buildCta",
            "caseStudies.caseStudy",
            
            "howWeWork.title",
            "howWeWork.subtitle",
            
            "technologyStack.title",
            "technologyStack.subtitle",
            
            # Header and navigation
            "header.nav.services",
            "header.nav.home",
            "header.nav.systems",
            "header.nav.systemsAiSoc",
            "header.nav.systemsSlncEnv",
            "header.cta.requestDemo",
            
            # Footer
            "footer.contactLabel",
            "footer.contactValue",
            "footer.addressLabel",
            "footer.addressValue",
            "footer.links.termsUse",
            "footer.links.termsService",
            "footer.links.privacy",
            "footer.links.cookies",
            "footer.links.affiliateTerms",
            "footer.copyright",
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
    
    def check_services_translations(self, lang_code: str) -> Dict:
        """
        Check services-related translations for a specific language.
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
            "total_checked": len(self.services_keys),
            "found_keys": 0
        }
        
        # Check each services key
        for key_path in self.services_keys:
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
        """Analyze services translations across all languages."""
        print("Analyzing services page translations...")
        print("=" * 60)
        
        results = {}
        
        # Get all language files
        language_files = list(self.locales_dir.glob("*.json"))
        
        for lang_file in sorted(language_files):
            lang_code = lang_file.stem
            
            if lang_code == "en":
                continue
            
            print(f"\n{lang_code.upper()}:")
            
            lang_results = self.check_services_translations(lang_code)
            
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
    
    def generate_services_report(self, output_file: str = "services_translation_report.md"):
        """Generate comprehensive services translation report."""
        print(f"\nGenerating services translation report...")
        
        results = self.analyze_all_languages()
        
        report = [
            "# Services Page Translation Analysis Report",
            f"Generated: {os.path.basename(__file__)}",
            "",
            "## Overview",
            f"Analyzed {len(results)} languages for services page translations.",
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
            "### For Services Page Specifically:",
            "1. Ensure all service descriptions are properly translated",
            "2. Verify service tags (Automation, Build, Protect, Scale, Ship) are culturally appropriate",
            "3. Check that technical terms are consistently translated",
            "",
            "### Quality Assurance:",
            "1. Test the /services/ page in each language",
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
    
    def update_missing_translations(self, lang_code: str, source_lang: str = "en"):
        """
        Update missing translations by copying from source language.
        This creates a backup and shows what would be updated.
        """
        if lang_code == source_lang:
            print("Cannot copy from the same language!")
            return
        
        source_file = self.locales_dir / f"{source_lang}.json"
        target_file = self.locales_dir / f"{lang_code}.json"
        
        if not source_file.exists():
            print(f"Source file not found: {source_file}")
            return
        
        if not target_file.exists():
            print(f"Target file not found: {target_file}")
            return
        
        # Load files
        source_data = self.load_translation_file(source_file)
        target_data = self.load_translation_file(target_file)
        
        # Find missing keys
        missing_updates = []
        
        for key_path in self.services_keys:
            source_value = self.get_nested_value(source_data, key_path)
            target_value = self.get_nested_value(target_data, key_path)
            
            if source_value is not None and target_value is None:
                missing_updates.append((key_path, source_value))
        
        if not missing_updates:
            print(f"No missing services translations found for {lang_code}")
            return
        
        print(f"\nFound {len(missing_updates)} missing services translations for {lang_code}:")
        for key_path, value in missing_updates[:5]:  # Show first 5
            print(f"  - {key_path}: '{value[:60]}...'")
        
        if len(missing_updates) > 5:
            print(f"  ... and {len(missing_updates) - 5} more")
        
        print(f"\nTo update, you would need to add these keys to {lang_code}.json")
        print("Note: This script only shows what's missing. Manual translation is recommended.")

def main():
    parser = argparse.ArgumentParser(description="Detect missing translations for /services/ page")
    parser.add_argument("--locales-dir", default="src/locales", help="Path to locales directory")
    parser.add_argument("--analyze", action="store_true", help="Analyze services translations")
    parser.add_argument("--generate-report", action="store_true", help="Generate services report")
    parser.add_argument("--check-language", help="Check specific language (e.g., 'fr')")
    parser.add_argument("--update-missing", help="Show missing translations for specific language")
    parser.add_argument("--output", default="services_translation_report.md", help="Output file")
    
    args = parser.parse_args()
    
    detector = ServicesTranslationDetector(args.locales_dir)
    
    if not detector.locales_dir.exists():
        print(f"Error: Locales directory not found at {detector.locales_dir}")
        return
    
    if args.check_language:
        print(f"Checking services translations for {args.check_language}...")
        results = detector.check_services_translations(args.check_language)
        
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
    
    elif args.update_missing:
        detector.update_missing_translations(args.update_missing)
    
    elif args.generate_report or not any([args.analyze, args.check_language, args.update_missing]):
        detector.generate_services_report(args.output)
    
    if args.analyze:
        detector.analyze_all_languages()

if __name__ == "__main__":
    main()
