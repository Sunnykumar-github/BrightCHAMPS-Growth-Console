with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(c.replace('<Sidebar="', '<Sidebar className="'))
print("Fixed layout")
