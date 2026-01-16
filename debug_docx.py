import docx
import os
import sys

base_path = "/home/abuka/silence/pechenka/docs/ru"

print(f"Checking directory: {base_path}")
if os.path.exists(base_path):
    print("Directory exists.")
    print("Files in directory:")
    for f in os.listdir(base_path):
        print(f" - {f}")
else:
    print("Directory does not exist.")
    sys.exit(1)

files = [
    "Политика_конфиденциальности_Silence_environment.docx",
    "Условия_использования_Silence_environment.docx",
    "Условия_предоставления_услуг_Silence_environment.docx"
]

def read_docx(file_path):
    try:
        if not os.path.exists(file_path):
            return f"File not found: {file_path}"
        doc = docx.Document(file_path)
        full_text = []
        for para in doc.paragraphs:
            if para.text.strip():
                full_text.append(para.text)
        return '\n'.join(full_text)
    except Exception as e:
        return f"Error reading {file_path}: {str(e)}"

for f in files:
    path = os.path.join(base_path, f)
    print(f"\n--- START {f} ---\n")
    print(read_docx(path))
    print(f"\n--- END {f} ---\n")
