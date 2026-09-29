import re

# 1. Fix layout.tsx
path_layout = 'src/app/layout.tsx'
with open(path_layout, 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace(
    'export default function RootLayout({\n  useEffect(() => { useKpiStore.getState().loadFromSupabase(); }, []);\n',
    'export default function RootLayout({'
)
# Re-inject useEffect inside the function body
layout = layout.replace(
    'export default function RootLayout({\n  children,\n}: {',
    'export default function RootLayout({\n  children,\n}: {\nchildren: React.ReactNode;\n}) {\n  useEffect(() => { useKpiStore.getState().loadFromSupabase(); }, []);\n'
)
# Wait, let's just make it simple.
with open(path_layout, 'w', encoding='utf-8') as f:
    # Actually it's easier to just do it via exact replacement
    new_layout = layout
    if 'children: React.ReactNode;' not in new_layout:
        pass # Handle carefully
    f.write(layout) # Wait, this python logic might fail, let me write exact.

# I'll just write a cleaner fix for layout:
