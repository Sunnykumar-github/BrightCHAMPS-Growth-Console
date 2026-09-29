import os
import glob

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Append optional chaining to native JS DOM operations embedded in TSX string fields
    content = content.replace(").scrollIntoView", ")?.scrollIntoView")
    content = content.replace(").classList", ")?.classList")
    content = content.replace(").style", ")?.style")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Null errors fixed!")
