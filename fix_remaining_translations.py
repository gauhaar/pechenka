#!/usr/bin/env python3
"""
Script to fix remaining English text in service descriptions.
"""

import json
from pathlib import Path
from typing import Dict

class ServiceTranslationFixer:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        
        # Translations for service descriptions
        self.service_translations = {
            # AI Agents description
            "servicesBlock.services.aiAgents.description": {
                "hr": "Prilagođeni konverzacijski i autonomni agenti za podršku, operacije i analitiku...",
                "no": "Skreddersydde samtale- og autonome agenter for support, drift og analyse...",
                "ro": "Agenți de conversație și autonomi personalizați pentru suport, operațiuni și analiză...",
                "sl": "Prilagojeni pogovorni in avtonomni agenti za podporo, delovanje in analitiko...",
            },
            
            # Custom Software description
            "servicesBlock.services.customSoftware.description": {
                "hr": "Web i desktop aplikacije od početka do kraja prilagođene vašim radnim tokovima...",
                "no": "Komplette web- og skrivebordsapplikasjoner skreddersydd for arbeidsflytene dine...",
                "ro": "Aplicații web și de desktop de la început până la sfârșit adaptate fluxurilor dvs. de lucru...",
                "sl": "Spletne in namizne aplikacije od začetka do konca, prilagojene vašim delovnim procesom...",
            },
            
            # Cybersecurity description
            "servicesBlock.services.cybersecurity.description": {
                "hr": "Revizije, testovi prodora i kontinuirani nadzor...",
                "no": "Revisjoner, penetrasjonstesting og kontinuerlig overvåking...",
                "ro": "Audituri, teste de penetrare și monitorizare continuă...",
                "sl": "Revizije, testiranje vdorov in stalno spremljanje...",
            },
            
            # Backend/DevOps description
            "servicesBlock.services.backend.description": {
                "hr": "Skalabilni API-ji, CI/CD cjevovodi i cloud infrastruktura...",
                "no": "Skalerbare API-er, CI/CD-pipeliner og skyinfrastruktur...",
                "ro": "API-uri scalabile, pipeline-uri CI/CD și infrastructură cloud...",
                "sl": "Razširljivi API-ji, CI/CD cevovodi in oblačna infrastruktura...",
            },
            
            # Mobile description
            "servicesBlock.services.mobile.description": {
                "hr": "Višeplatformske aplikacije s izvornim performansama i dotjeranim UX-om...",
                "no": "Tverrplattform-applikasjoner med native ytelse og polert UX...",
                "ro": "Aplicații cross-platform cu performanță nativă și UX rafinat...",
                "sl": "Večplatformske aplikacije z izvorno zmogljivostjo in izpopolnjenim UX...",
            },
            
            # servicesBlock.description
            "servicesBlock.description": {
                "da": "Premium UI, stærk teknik og hurtig levering — alt hvad du behøver for at lancere et produkt, der ser ud og fungerer som et stort brand...",
                "de": "Premium-UI, starke Technik und schnelle Lieferung — alles, was Sie brauchen, um ein Produkt zu starten, das aussieht und funktioniert wie eine große Marke...",
                "no": "Premium UI, sterk ingeniørkunst og rask levering — alt du trenger for å lansere et produkt som ser ut og fungerer som et stort merke...",
            },
            
            # servicesBlock.badge
            "servicesBlock.badge": {
                "de": "Was wir bieten...",
            },
            
            # footer.links.affiliateTerms
            "footer.links.affiliateTerms": {
                "da": "Vilkår for partnerprogram...",
            },
            
            # servicesBlock.learnMoreAria
            "servicesBlock.learnMoreAria": {
                "hr": "Saznajte više o ovoj usluzi...",
                "ro": "Aflați mai multe despre acest serviciu...",
                "sl": "Izvedite več o tej storitvi...",
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
    
    def fix_translations_for_language(self, lang_code: str) -> bool:
        """Fix translations for a specific language. Returns True if changes were made."""
        if lang_code == "en":
            return False
        
        lang_file = self.locales_dir / f"{lang_code}.json"
        if not lang_file.exists():
            print(f"  ✗ File not found: {lang_file.name}")
            return False
        
        # Load the language file
        lang_data = self.load_translation_file(lang_file)
        if not lang_data:
            print(f"  ✗ Failed to load {lang_file.name}")
            return False
        
        changes_made = 0
        
        # Apply fixes for each translation key
        for key_path, lang_translations in self.service_translations.items():
            if lang_code in lang_translations:
                translation = lang_translations[lang_code]
                
                # Set the value in the data structure
                self.set_nested_value(lang_data, key_path, translation)
                changes_made += 1
        
        if changes_made > 0:
            # Save the updated file
            if self.save_translation_file(lang_file, lang_data):
                print(f"  ✓ Fixed {changes_made} issues in {lang_file.name}")
                return True
            else:
                print(f"  ✗ Failed to save {lang_file.name}")
                return False
        
        return False
    
    def fix_all_languages(self):
        """Fix translations for all languages with issues."""
        print("Fixing remaining English text in service descriptions...")
        print("=" * 60)
        
        # Get all languages that need fixes
        languages_to_fix = set()
        for key_path, lang_translations in self.service_translations.items():
            languages_to_fix.update(lang_translations.keys())
        
        total_fixed = 0
        total_languages = len(languages_to_fix)
        
        # Fix each language
        for lang_code in sorted(languages_to_fix):
            if self.fix_translations_for_language(lang_code):
                total_fixed += 1
        
        print(f"\n✅ Fixed translations for {total_fixed}/{total_languages} languages")
        return total_fixed

def main():
    fixer = ServiceTranslationFixer()
    
    print("Service Descriptions Translation Fixer")
    print("=" * 60)
    print("Fixing remaining English text in service descriptions...")
    
    # Show which languages will be fixed
    print("\nLanguages that will be fixed:")
    languages = set()
    for key_path, lang_translations in fixer.service_translations.items():
        languages.update(lang_translations.keys())
    
    for lang in sorted(languages):
        print(f"  - {lang}")
    
    print(f"\nTotal languages to fix: {len(languages)}")
    
    # Apply fixes
    total_fixed = fixer.fix_all_languages()
    
    if total_fixed > 0:
        print("\n✅ Fixes applied successfully!")
        print("\nYou can verify the fixes by running:")
        print("  python detect_services_translations.py")
    else:
        print("\n⚠️ No fixes were applied.")

if __name__ == "__main__":
    main()
