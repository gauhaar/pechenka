# Translation Detection Playbook
## How to Detect Missing or Incorrect Translations in a Webpage

This playbook provides a systematic approach to identifying missing, incomplete, or incorrect translations in multilingual web applications.

## 1. Understanding the Translation Architecture

### Common Translation Patterns
1. **JSON-based localization** (most common in modern web apps)
   - Files: `locales/en.json`, `locales/fr.json`, etc.
   - Structure: Key-value pairs organized by sections
   - Framework examples: React-i18next, Vue I18n, Angular i18n

2. **Gettext-based systems** (older PHP/Python apps)
   - Files: `.po` and `.mo` files
   - Tools: `gettext`, `msgfmt`

3. **Database-driven translations**
   - Translations stored in database tables
   - Usually with admin interfaces for management

4. **Hybrid approaches**
   - Static content in JSON files
   - Dynamic content from APIs/database

## 2. Detection Methodology

### Phase 1: Initial Assessment
```bash
# 1. Identify translation framework
grep -r "i18n\|i18next\|react-intl\|vue-i18n" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# 2. Locate translation files
find . -name "*.json" -path "*/locales/*" -o -name "*.po" -o -name "*.mo"

# 3. Check for translation configuration
find . -name "i18n*" -type f -o -name "*translation*" -type f
```

### Phase 2: Structural Analysis

#### For JSON-based systems:
```python
#!/usr/bin/env python3
import json
import os
from pathlib import Path

def analyze_translation_structure(base_dir="src/locales"):
    """Analyze translation file structure and identify missing keys."""
    
    # Get all language files
    locale_dir = Path(base_dir)
    language_files = list(locale_dir.glob("*.json"))
    
    if not language_files:
        print("No translation files found!")
        return
    
    # Load English as reference
    english_file = locale_dir / "en.json"
    if not english_file.exists():
        print("English reference file not found!")
        return
    
    with open(english_file, 'r', encoding='utf-8') as f:
        english_data = json.load(f)
    
    # Get all keys from English
    def get_all_keys(data, prefix=""):
        keys = []
        for key, value in data.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                keys.extend(get_all_keys(value, full_key))
            else:
                keys.append(full_key)
        return keys
    
    english_keys = get_all_keys(english_data)
    
    print(f"English reference has {len(english_keys)} keys")
    print("\nLanguage Analysis:")
    print("=" * 60)
    
    for lang_file in language_files:
        if lang_file.name == "en.json":
            continue
            
        with open(lang_file, 'r', encoding='utf-8') as f:
            lang_data = json.load(f)
        
        lang_keys = get_all_keys(lang_data)
        missing_keys = [k for k in english_keys if k not in lang_keys]
        
        print(f"\n{lang_file.stem}:")
        print(f"  Total keys: {len(lang_keys)}")
        print(f"  Missing keys: {len(missing_keys)}")
        
        if missing_keys:
            print(f"  Missing key examples: {missing_keys[:5]}")
```

#### For Gettext systems:
```bash
# Extract all translatable strings
xgettext -L Python -o messages.pot *.py
xgettext -L JavaScript -o messages.pot *.js

# Compare with existing translations
msgcmp existing.po messages.pot
```

### Phase 3: Content Analysis

#### Detect English text in non-English files:
```python
#!/usr/bin/env python3
import json
import re

def detect_english_in_translations(base_dir="src/locales"):
    """Detect English text remaining in translation files."""
    
    # Common English words that shouldn't appear in translations
    english_indicators = [
        r'\bthe\b', r'\band\b', r'\bfor\b', r'\bwith\b', r'\bthis\b',
        r'\bthat\b', r'\bhave\b', r'\bhas\b', r'\bwas\b', r'\bwere\b',
        r'\bwill\b', r'\bwould\b', r'\bcould\b', r'\bshould\b'
    ]
    
    english_pattern = re.compile('|'.join(english_indicators), re.IGNORECASE)
    
    for lang_file in Path(base_dir).glob("*.json"):
        if lang_file.name == "en.json":
            continue
            
        with open(lang_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        english_matches = []
        
        def check_dict(d, path=""):
            for key, value in d.items():
                current_path = f"{path}.{key}" if path else key
                if isinstance(value, dict):
                    check_dict(value, current_path)
                elif isinstance(value, str):
                    if english_pattern.search(value):
                        english_matches.append((current_path, value))
        
        check_dict(data)
        
        if english_matches:
            print(f"\n{lang_file.stem} has English text:")
            for path, text in english_matches[:5]:
                print(f"  {path}: {text[:50]}...")
```

### Phase 4: Runtime Detection

#### Browser Console Script:
```javascript
// Paste this in browser console to detect missing translations
function detectMissingTranslations() {
    const missing = [];
    
    // Method 1: Check for translation keys in DOM
    document.querySelectorAll('[data-i18n], [data-translate]').forEach(el => {
        const key = el.getAttribute('data-i18n') || el.getAttribute('data-translate');
        const text = el.textContent.trim();
        
        // If text contains square brackets or the key itself, it's likely missing
        if (text.includes('[') && text.includes(']') || text === key) {
            missing.push({
                element: el,
                key: key,
                currentText: text
            });
        }
    });
    
    // Method 2: Check for English text in non-English pages
    const englishWords = ['the', 'and', 'for', 'with', 'this', 'that'];
    const pageLang = document.documentElement.lang || 'en';
    
    if (pageLang !== 'en') {
        const allText = document.body.innerText;
        englishWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            if (regex.test(allText)) {
                console.warn(`English word "${word}" found in ${pageLang} page`);
            }
        });
    }
    
    return missing;
}

// Run detection
const issues = detectMissingTranslations();
console.log(`Found ${issues.length} potential translation issues`);
issues.forEach(issue => console.log(issue));
```

## 3. Automated Testing Strategies

### Unit Tests for Translations:
```javascript
// Example using Jest and i18next
import i18n from './i18n';

describe('Translation completeness', () => {
  const languages = ['en', 'fr', 'de', 'es', 'ru'];
  
  languages.forEach(lang => {
    test(`${lang} has all keys`, () => {
      i18n.changeLanguage(lang);
      
      // Get all keys from English
      const englishKeys = Object.keys(i18n.getResourceBundle('en', 'translation'));
      
      // Check each language
      const langKeys = Object.keys(i18n.getResourceBundle(lang, 'translation'));
      
      englishKeys.forEach(key => {
        expect(langKeys).toContain(key);
      });
    });
  });
});
```

### Integration Tests:
```python
# Selenium/Puppeteer test to verify translations
def test_translation_completeness():
    languages = ['fr', 'de', 'es', 'ru', 'zh']
    
    for lang in languages:
        # Navigate to page in language
        driver.get(f"https://example.com/{lang}/")
        
        # Check for placeholder text
        elements = driver.find_elements_by_xpath("//*[contains(text(), '{{')]")
        assert len(elements) == 0, f"Placeholders found in {lang} version"
        
        # Check for English text
        english_pattern = re.compile(r'\b(the|and|for|with)\b', re.IGNORECASE)
        page_text = driver.find_element_by_tag_name('body').text
        english_matches = english_pattern.findall(page_text)
        
        if english_matches:
            print(f"Warning: English words found in {lang}: {set(english_matches)}")
```

## 4. Tooling Recommendations

### Static Analysis Tools:
1. **i18n-ally** (VSCode extension)
   - Real-time translation detection
   - Missing key highlighting
   - In-editor translation management

2. **eslint-plugin-i18n**
   - ESLint rules for i18n best practices
   - Detects hardcoded strings
   - Validates translation keys

3. **Custom scripts** (like the ones in this playbook)

### CI/CD Integration:
```yaml
# GitHub Actions workflow example
name: Translation Checks

on: [push, pull_request]

jobs:
  check-translations:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: pip install -r requirements.txt
    
    - name: Run translation checks
      run: python scripts/check_translations.py
    
    - name: Run i18n tests
      run: npm test -- --testPathPattern="i18n"
```

## 5. Common Issues and Solutions

### Issue 1: Missing Keys
**Symptoms**: Placeholders like `{{key}}` or `[key]` appear in UI
**Solution**:
```bash
# Generate missing keys report
python scripts/find_missing_keys.py > missing_keys_report.md
```

### Issue 2: Incorrect Translations
**Symptoms**: English text in non-English pages, grammatical errors
**Solution**:
```python
# Use language detection library
from langdetect import detect

def validate_translation(lang_code, text):
    detected = detect(text)
    if detected == 'en' and lang_code != 'en':
        return False, f"English text in {lang_code} translation"
    return True, "OK"
```

### Issue 3: Inconsistent Structure
**Symptoms**: Different nesting levels across language files
**Solution**:
```python
def normalize_structure(files):
    """Ensure all translation files have same structure."""
    # Implementation depends on your framework
    pass
```

## 6. Maintenance Best Practices

### Regular Checks:
1. **Weekly**: Run automated translation checks
2. **Monthly**: Manual review of key pages in all languages
3. **Quarterly**: Full translation audit

### Documentation:
1. Keep a `TRANSLATION_STATUS.md` file updated
2. Document translation conventions
3. Maintain a glossary of technical terms

### Collaboration:
1. Use translation management platforms (Crowdin, Transifex)
2. Establish review workflows
3. Train team members on i18n best practices

## 7. Quick Start Checklist

- [ ] Identify translation framework
- [ ] Locate all translation files
- [ ] Create English reference file with all keys
- [ ] Run structural analysis to find missing keys
- [ ] Run content analysis to find English text
- [ ] Set up automated tests
- [ ] Integrate checks into CI/CD
- [ ] Document findings and create maintenance plan

## 8. Page-Specific Detection

### For /services/ Page:
The services page has specific translation keys that need special attention. Use the specialized script:

```bash
# Generate services page report
python detect_services_translations.py --generate-report

# Check specific language
python detect_services_translations.py --check-language fr

# Show missing translations for a language
python detect_services_translations.py --update-missing de
```

**Key services translation keys:**
- `servicesBlock.badge`, `servicesBlock.title`, `servicesBlock.description`
- Service-specific keys: `servicesBlock.services.aiAgents.title`, etc.
- Pricing section keys: `pricing.subtitle`, `pricing.percentMaintenance`
- Component keys: `heroSection.*`, `whyChooseUs.*`, `caseStudies.*`

### For /home/ Page:
Use the general methodology described in this playbook with focus on home section keys.

## 9. Example Script

See the companion script in this directory:
- `detect_services_translations.py` - Services page specific detection

## Conclusion

Effective translation detection requires a multi-layered approach combining static analysis, runtime checks, and automated testing. By implementing the strategies in this playbook, you can ensure your multilingual web application maintains translation completeness and quality across all supported languages.

Remember: Translation is not a one-time task but an ongoing process that requires regular maintenance and monitoring.
