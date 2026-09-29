import os
import glob

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    pairs = [
        ('onChange="{', 'onChange={'),
        ('onClick="{', 'onClick={'),
        ('value="{', 'value={'),
        ('defaultChecked="{', 'defaultChecked={'),
        ('}"', '}'),
    ]
    for k, v in pairs:
        content = content.replace(k, v)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Quotes stripped!")
