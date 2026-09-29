import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add the link explicitly into the layout
head_tag = """
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
"""

if '<head>' not in content:
    content = content.replace('<body', head_tag + '      <body')

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected Material Symbols into layout.tsx head!")
