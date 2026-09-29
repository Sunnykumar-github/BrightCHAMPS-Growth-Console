import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # fix colSpan="5" to colSpan={5}
    content = re.sub(r'colSpan="(\d+)"', r'colSpan={\1}', content)
    content = re.sub(r'rowSpan="(\d+)"', r'rowSpan={\1}', content)
    content = re.sub(r'tabIndex="(-?\d+)"', r'tabIndex={\1}', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Numeric JSX props fixed!")
