import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Convert colSpan="2" to colSpan={2}
    content = re.sub(r'colSpan="([^"]*)"', r'colSpan={\1}', content)
    content = re.sub(r'rowSpan="([^"]*)"', r'rowSpan={\1}', content)
    
    # tabIndex
    content = content.replace('tabindex=', 'tabIndex=')
    content = re.sub(r'tabIndex="([^"]*)"', r'tabIndex={\1}', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Numbers fixed!")
