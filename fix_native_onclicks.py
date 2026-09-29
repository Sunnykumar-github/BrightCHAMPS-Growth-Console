import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find raw string onclicks that React rejects (e.g. onClick="window.print()")
    # and safely convert to JSX lambdas. Skip if empty.
    def replacer(match):
        script = match.group(1).strip()
        if not script:
            return ''  # completely remove empty onClick=""
        return f'onClick={{() => {{{script}}}}}'
        
    content = re.sub(r'onClick="([^"]*)"', replacer, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Native onClicks fixed!")
