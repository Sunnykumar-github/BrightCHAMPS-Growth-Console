import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the double slash / /> issue
    content = content.replace('/ />', '/>')
    
    # Fix oninput attribute to onChange (standard React way)
    content = re.sub(r'oninput=', 'onChange=', content)
    
    # Fix onchange attribute
    content = re.sub(r'onchange=', 'onChange=', content)
    
    # Fix onclick attribute
    content = re.sub(r'onclick=', 'onClick=', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("JSX fixed!")
