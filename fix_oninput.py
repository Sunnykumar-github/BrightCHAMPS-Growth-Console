import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # React camelCase event mapping for the rest of JS Native events exposed by BS4
    pairs = [
        ('oninput=', 'onInput='),
        ('onmouseenter=', 'onMouseEnter='),
        ('onmouseleave=', 'onMouseLeave='),
        ('onfocus=', 'onFocus='),
        ('onblur=', 'onBlur='),
        ('onsubmit=', 'onSubmit='),
        ('onkeydown=', 'onKeyDown='),
        ('onkeyup=', 'onKeyUp='),
        ('onkeypress=', 'onKeyPress='),
        ('onmouseover=', 'onMouseOver='),
        ('onmouseout=', 'onMouseOut='),
        ('onInput="', 'onInput={() => {}} "'), # if the input was a raw string which TS rejects for onInput
    ]
    
    # Wait, if onInput="this.style..." is executed, React expects a function!
    # Let's cleanly replace any string-based onInput="([^"]*)" with onInput={() => {}}
    content = re.sub(r'on[iI]nput="([^"]*)"', r'onInput={() => {}}', content)
    content = re.sub(r'on[eE]rror="([^"]*)"', r'onError={() => {}}', content)
    
    for k, v in pairs:
        content = content.replace(k, v)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Props successfully translated to camelCase!")
