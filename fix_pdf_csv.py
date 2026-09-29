import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to change exportToCSV() to window.print() ONLY for buttons that have "Export Brief"
    # Or buttons that have "PDF" in them.
    # The safest way is to use regex:
    # Match an entire <button ...> ... Export Brief ... </button>
    # And replace exportToCSV() inside it.
    def replacer(match):
        btn_tag = match.group(0)
        if 'Export Brief' in btn_tag:
            return btn_tag.replace('exportToCSV()', 'window.print()')
        return btn_tag

    # Use a non-greedy .*? to match the button content
    content = re.sub(r'<button[^>]*>.*?</button>', replacer, content, flags=re.DOTALL)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("PDF Export mapped accurately!")
