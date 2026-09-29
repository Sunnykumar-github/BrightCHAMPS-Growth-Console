with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '<aside className={`${className || ""} ` + `${className || ""} ` + "fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto">',
    '<aside className={`\\${className || ""} fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto`}>'
)

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Sidebar patched!')
