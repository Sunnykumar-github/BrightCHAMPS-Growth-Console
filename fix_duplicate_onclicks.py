import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find elements with multiple onClick attributes and remove all but the first one
    def deduper(match):
        tag = match.group(0)
        chunks = tag.split('onClick=')
        if len(chunks) > 2: # means it found at least 2 onClick=
            # Keep the first part and the FIRST onClick=... 
            # Actually, `chunks[0]` is before the first onClick.
            # `chunks[1]` is between first onClick and second onClick...
            # The safest way is regex substitution within the tag:
            new_tag = re.sub(r'(onClick=\{[^\}]*\})\s*onClick=\{[^\}]*\}', r'\1', tag)
            return new_tag
        return tag
        
    content = re.sub(r'<button[^>]*>', deduper, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Duplicates wiped!")
