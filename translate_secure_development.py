#!/usr/bin/env python3
import json
import os
import time
from translate import Translator

# Languages that are already fully translated (no *)
fully_translated = ["ar", "de", "es", "fr", "pt", "ru", "tr", "zh"]

# Language code mapping
lang_code_map = {
    "am": "am",  # Amharic
    "az": "az",  # Azerbaijani
    "bn": "bn",  # Bengali
    "bg": "bg",  # Bulgarian
    "my": "my",  # Burmese
    "hr": "hr",  # Croatian
    "cs": "cs",  # Czech
    "da": "da",  # Danish
    "nl": "nl",  # Dutch
    "et": "et",  # Estonian
    "ka": "ka",  # Georgian
    "el": "el",  # Greek
    "hu": "hu",  # Hungarian
    "is": "is",  # Icelandic
    "id": "id",  # Indonesian
    "it": "it",  # Italian
    "ja": "ja",  # Japanese
    "km": "km",  # Khmer
    "ko": "ko",  # Korean
    "lv": "lv",  # Latvian
    "lt": "lt",  # Lithuanian
    "ms": "ms",  # Malay
    "no": "no",  # Norwegian
    "fa": "fa",  # Persian
    "pl": "pl",  # Polish
    "ro": "ro",  # Romanian
    "sr": "sr",  # Serbian
    "sk": "sk",  # Slovak
    "sl": "sl",  # Slovene
    "th": "th",  # Thai
    "uk": "uk",  # Ukrainian
    "uz": "uz",  # Uzbek
    "vi": "vi",  # Vietnamese
    "ne": "ne",  # Nepali
}

def translate_text(text, to_lang):
    """Translate text to target language"""
    try:
        translator = Translator(to_lang=to_lang)
        translated = translator.translate(text)
        # Add delay to avoid rate limiting
        time.sleep(0.5)
        return translated
    except Exception as e:
        print(f"  Translation error for '{text[:50]}...': {e}")
        return text  # Return original text if translation fails

def translate_dict(data, lang_code):
    """Recursively translate dictionary values"""
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            print(f"    Translating key: {key}")
            result[key] = translate_dict(value, lang_code)
        return result
    elif isinstance(data, list):
        return [translate_dict(item, lang_code) for item in data]
    elif isinstance(data, str):
        # Skip translation if text is very short or looks like code/placeholder
        if len(data.strip()) < 2 or data.strip().startswith("{") or data.strip().endswith("}"):
            return data
        return translate_text(data, lang_code)
    else:
        return data

def main():
    # Get English secureDevelopment section
    with open("src/locales/en.json", "r", encoding="utf-8") as f:
        en_data = json.load(f)
    
    secure_dev_en = en_data.get("secureDevelopment", {})
    if not secure_dev_en:
        print("Error: Could not find secureDevelopment section in English file")
        return
    
    print(f"English secureDevelopment section has {len(str(secure_dev_en))} characters")
    
    # Process each language
    locales_dir = "src/locales"
    for filename in os.listdir(locales_dir):
        if not filename.endswith(".json"):
            continue
        
        lang_code = filename.replace(".json", "")
        
        # Skip English and already fully translated languages
        if lang_code == "en" or lang_code in fully_translated:
            print(f"Skipping {filename} - already fully translated")
            continue
        
        # Skip if language not in our map
        if lang_code not in lang_code_map:
            print(f"Skipping {filename} - language code not in map")
            continue
        
        filepath = os.path.join(locales_dir, filename)
        
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            print(f"\nProcessing {filename} ({lang_code})...")
            
            # Check if secureDevelopment exists and needs translation
            if "secureDevelopment" in data:
                current_sec_dev = data["secureDevelopment"]
                # Check if it's just English placeholder (compare structure)
                # For simplicity, we'll always retranslate
                pass
            
            # Translate the secureDevelopment section
            print(f"  Translating secureDevelopment section...")
            target_lang = lang_code_map[lang_code]
            translated_sec_dev = translate_dict(secure_dev_en, target_lang)
            
            # Update the file
            data["secureDevelopment"] = translated_sec_dev
            
            # Write back to file
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"  ✓ Translated and updated {filename}")
            
        except Exception as e:
            print(f"  ✗ Error processing {filename}: {e}")
    
    print("\nTranslation complete!")

if __name__ == "__main__":
    main()
