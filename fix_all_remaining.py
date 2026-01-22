#!/usr/bin/env python3
"""
Final comprehensive fix for all remaining English text.
"""

import json
from pathlib import Path
from typing import Dict

class ComprehensiveFixer:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        
        # Comprehensive translations for all remaining English text
        self.translations = {
            # DA (Danish)
            "servicesBlock.description": {
                "da": "Premium UI, stærk teknik og hurtig levering — alt hvad du behøver for at lancere et produkt, der ser ud og fungerer som et stort brand...",
            },
            "footer.links.affiliateTerms": {
                "da": "Vilkår for partnerprogram...",
            },
            
            # DE (German)
            "servicesBlock.badge": {
                "de": "Was wir bieten...",
            },
            "servicesBlock.description": {
                "de": "Premium-UI, starke Technik und schnelle Lieferung — alles, was Sie brauchen, um ein Produkt zu starten, das aussieht und funktioniert wie eine große Marke...",
            },
            
            # HR (Croatian)
            "whyChooseUs.subtitleTail": {
                "hr": "— i isporučeno brzinom startupa...",
            },
            "caseStudies.buildCta": {
                "hr": "Izgradite nešto slično →",
            },
            
            # NO (Norwegian)
            "servicesBlock.description": {
                "no": "Premium UI, sterk ingeniørkunst og rask levering — alt du trenger for å lansere et produkt som ser ut og fungerer som et stort merke...",
            },
            "servicesBlock.services.aiAgents.description": {
                "no": "Skreddersydde samtale- og autonome agenter for support, drift og analyse...",
            },
            
            # RO (Romanian)
            "whyChooseUs.subtitleTail": {
                "ro": "— și livrat cu viteza unui startup...",
            },
            "caseStudies.buildCta": {
                "ro": "Construiți ceva similar →",
            },
            "howWeWork.subtitle": {
                "ro": "Pipeline de livrare ultra-rapid — optimizat pentru viteză...",
            },
            
            # SL (Slovenian)
            "caseStudies.buildCta": {
                "sl": "Zgradite nekaj podobnega →",
            },
            "howWeWork.subtitle": {
                "sl": "Ultrahiter cevovod za dostavo — optimiziran za hitrost...",
            },
            "heroSection.description": {
                "sl": "Gradimo pripravljene AI agente in prilagojeno programsko opremo za produkcijo...",
            },
        }
    
    def load_translation_file(self, filepath: Path) -> Dict:
        """Load a JSON translation file."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError) as e:
            print(f"Error loading {filepath}: {e}")
            return {}
    
    def save_translation_file(self, filepath: Path, data: Dict):
        """Save a JSON translation file with proper formatting."""
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"Error saving {filepath}: {e}")
            return False
    
    def set_nested_value(self, data: Dict, key_path: str, value: str):
        """Set a nested value in dictionary using dot notation."""
        keys = key_path.split('.')
        current = data
        
        # Navigate to the parent
        for i, key in enumerate(keys[:-1]):
            if key not in current:
                current[key] = {}
            current = current[key]
        
        # Set the value
        current[keys[-1]] = value
    
    def fix_all(self):
        """Fix all remaining translations."""
        print("Comprehensive Translation Fixer")
        print("=" * 60)
        print("Fixing ALL remaining English text in translations...")
        
        # Get all languages that need fixes
        languages_to_fix = set()
        for key_path, lang_translations in self.translations.items():
            languages_to_fix.update(lang_translations.keys())
        
        total_fixed = 0
        
        for lang_code in sorted(languages_to_fix):
            lang_file = self.locales_dir / f"{lang_code}.json"
            if not lang_file.exists():
                print(f"  ✗ File not found: {lang_file.name}")
                continue
            
            # Load the language file
            lang_data = self.load_translation_file(lang_file)
            if not lang_data:
                print(f"  ✗ Failed to load {lang_file.name}")
                continue
            
            changes_made = 0
            
            # Apply fixes for each translation key
            for key_path, lang_translations in self.translations.items():
                if lang_code in lang_translations:
                    translation = lang_translations[lang_code]
                    
                    # Set the value in the data structure
                    self.set_nested_value(lang_data, key_path, translation)
                    changes_made += 1
            
            if changes_made > 0:
                # Save the updated file
                if self.save_translation_file(lang_file, lang_data):
                    print(f"  ✓ Fixed {changes_made} issues in {lang_file.name}")
                    total_fixed += changes_made
                else:
                    print(f"  ✗ Failed to save {lang_file.name}")
        
        print(f"\n✅ Fixed {total_fixed} issues across {len(languages_to_fix)} languages")
        return total_fixed

def main():
    fixer = ComprehensiveFixer()
    fixer.fix_all()
    
    print("\n✅ All fixes applied!")
    print("\nRun verification:")
    print("  python detect_services_translations.py")

if __name__ == "__main__":
    main()
