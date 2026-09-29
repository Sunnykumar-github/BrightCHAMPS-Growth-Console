with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('export default function Sidebar() {', 'export default function Sidebar({ className }: { className?: string }) {')
c = c.replace('<aside className="', '<aside className={`${className || ""} ` + "')
c = c.replace('<aside className={`', '<aside className={`${className || ""} ` + `')

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("Sidebar TS fixed")
