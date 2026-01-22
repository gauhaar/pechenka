#!/usr/bin/env python3
"""
Script to automatically fix English text in non-English translation files.
"""

import json
from pathlib import Path
from typing import Dict

class AutoTranslationFixer:
    def __init__(self, locales_dir: str = "src/locales"):
        self.locales_dir = Path(locales_dir)
        
        # Translations for common English text found in non-English files
        self.translations = {
            # pricing.subtitle: "Mobile-first plans built to scale with your product..."
            "pricing.subtitle": {
                "bn": "মোবাইল-প্রথম পরিকল্পনা আপনার পণ্যের সাথে বৃদ্ধি করার জন্য তৈরি...",  # Bengali
                "da": "Mobil-først planer bygget til at skala med dit produkt...",  # Danish
                "de": "Mobile-first Pläne, die mit Ihrem Produkt skalieren...",  # German
                "hr": "Planovi prilagođeni mobilnim uređajima, izgrađeni da rastu s vašim proizvodom...",  # Croatian
                "hu": "Mobilbarát tervek, amelyek a termékével együtt skálázódnak...",  # Hungarian
                "id": "Rencana mobile-first yang dibangun untuk berkembang dengan produk Anda...",  # Indonesian
                "is": "Farsímar fyrst áætlanir byggðar til að stækka með vörunni þinni...",  # Icelandic
                "ja": "モバイルファーストのプランは、あなたの製品とともに拡張するように構築されています...",  # Japanese
                "ka": "მობილური-პირველი გეგმები, რომლებიც შექმნილია თქვენი პროდუქტის მასშტაბირებისთვის...",  # Georgian
                "km": "ផែនការដែលផ្តោតលើទូរស័ព្ទចល័តត្រូវបានបង្កើតឡើងដើម្បីពង្រីកជាមួយផលិតផលរបស់អ្នក...",  # Khmer
                "ko": "모바일 우선 계획은 귀하의 제품과 함께 확장되도록 구축되었습니다...",  # Korean
                "lt": "Mobiliesiems pritaikyti planai, sukurti augti kartu su jūsų produktu...",  # Lithuanian
                "lv": "Mobilajām ierīcēm pielāgoti plāni, kas veidoti, lai augtu līdz ar jūsu produktu...",  # Latvian
                "ms": "Pelan mobile-first dibina untuk berkembang dengan produk anda...",  # Malay
                "my": "သင့်ထုတ်ကုန်နှင့်အတူ ချဲ့ထွင်ရန် တည်ဆောက်ထားသော မိုဘိုင်းဦးစားပေး အစီအစဉ်များ...",  # Burmese
                "ne": "मोबाइल-पहिलो योजनाहरू तपाईंको उत्पादनसँग मिलेर विस्तार गर्न निर्माण गरिएको...",  # Nepali
                "nl": "Mobile-first plannen gebouwd om mee te groeien met uw product...",  # Dutch
                "no": "Mobil-først planer bygget for å skaleres med produktet ditt...",  # Norwegian
                "pl": "Plany mobile-first zbudowane, aby skalować się z Twoim produktem...",  # Polish
                "ro": "Planuri mobile-first construite pentru a se extinde odată cu produsul dvs...",  # Romanian
                "sl": "Načrti, prilagojeni za mobilne naprave, zgrajeni za rast z vašim izdelkom...",  # Slovenian
                "th": "แผนการที่ออกแบบสำหรับมือถือเป็นหลัก สร้างมาเพื่อขยายขนาดพร้อมกับผลิตภัณฑ์ของคุณ...",  # Thai
                "uk": "Плани, орієнтовані на мобільні пристрої, створені для масштабування разом з вашим продуктом...",  # Ukrainian
                "uz": "Mobil-birinchi rejalar mahsulotingiz bilan birga o'sish uchun qurilgan...",  # Uzbek
            },
            
            # servicesBlock.description: "Premium UI, strong engineering, and fast delivery — everything you need to launch..."
            "servicesBlock.description": {
                "da": "Premium UI, stærk teknik og hurtig levering — alt hvad du behøver for at lancere...",
                "de": "Premium-UI, starke Technik und schnelle Lieferung — alles, was Sie brauchen, um zu starten...",
                "hr": "Vrhunski korisnički sučelje, snažno inženjerstvo i brza isporuka — sve što vam treba za pokretanje...",
                "no": "Premium UI, sterk ingeniørkunst og rask levering — alt du trenger for å lansere...",
                "ro": "Interfață premium, inginerie puternică și livrare rapidă — tot ce aveți nevoie pentru a lansa...",
                "sl": "Vrhunski uporabniški vmesnik, močno inženirstvo in hitra dostava — vse, kar potrebujete za zagon...",
            },
            
            # servicesBlock.learnMoreAria: "Learn more about this service..."
            "servicesBlock.learnMoreAria": {
                "hr": "Saznajte više o ovoj usluzi...",
                "ro": "Aflați mai multe despre acest serviciu...",
                "sl": "Izvedite več o tej storitvi...",
            },
            
            # footer.links.affiliateTerms: "Affiliate Terms of Service"
            "footer.links.affiliateTerms": {
                "da": "Vilkår for partnerprogram...",
            },
            
            # servicesBlock.badge: "What we offer..."
            "servicesBlock.badge": {
                "de": "Was wir bieten...",
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
                return True
            else:
                print(f"  ✗ Failed to save {lang_file.name}")
                return False
        
        return False
    
    def fix_all_languages(self):
        """Fix translations for all languages with issues."""
        print("Fixing English text in non-English translation files...")
        print("=" * 60)
        
        # Get all languages that need fixes
        languages_to_fix = set()
        for key_path, lang_translations in self.translations.items():
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
    fixer = AutoTranslationFixer()
    
    print("Services Page Translation Fixer")
    print("=" * 60)
    print("Automatically fixing English text in non-English files...")
    
    # Show which languages will be fixed
    print("\nLanguages that will be fixed:")
    for key_path, lang_translations in fixer.translations.items():
        if key_path == "pricing.subtitle":
            print(f"\n{key_path}: {len(lang_translations)} languages")
    
    print(f"\nTotal unique languages to fix: {len(set().union(*[set(v.keys()) for v in fixer.translations.values()]))}")
    
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
