import json
import os

with open(r'C:/Users/onepl/.gemini/antigravity/brain/a0a8a27b-97c7-4590-a256-850097dd1cd6/.system_generated/steps/6/output.txt', 'r') as f:
    data = json.load(f)

theme = data['designTheme']
named_colors = theme['namedColors']

# In Stitch project, the designTheme object has colors, spacing, typography
css_lines = [
    "@import \"tailwindcss\";",
    "",
    "@theme {",
    "  --font-sans: 'IBM Plex Sans', sans-serif;",
    "  --font-serif: 'Source Serif 4', serif;"
]

for k, v in named_colors.items():
    css_lines.append(f"  --color-{k.replace('_', '-')}: {v};")

spacing = theme['spacing']
for k, v in spacing.items():
    css_lines.append(f"  --spacing-{k}: {v};")

typography = theme['typography']
for k, v in typography.items():
    size = v['fontSize']
    line_height = v['lineHeight']
    font_weight = v['fontWeight']
    css_lines.append(f"  --text-{k}: {size};")
    css_lines.append(f"  --text-{k}-line-height: {line_height};")
    css_lines.append(f"  --text-{k}-font-weight: {font_weight};")

css_lines.append("  --radius-sm: 0.125rem;")
css_lines.append("  --radius: 0.25rem;")
css_lines.append("  --radius-md: 0.375rem;")
css_lines.append("  --radius-lg: 0.5rem;")
css_lines.append("  --radius-xl: 0.75rem;")
css_lines.append("  --radius-full: 9999px;")
css_lines.append("}")
css_lines.append('''
html, body {
  margin: 0;
  padding: 0;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
}
body {
  overscroll-behavior: none;
}
main > :first-child {
  margin-top: 0 !important;
}
main > :last-child {
  margin-bottom: 0 !important;
}
::-webkit-scrollbar {
  display: none;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
''')

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write("\n".join(css_lines))
    
print("globals.css generated successfully from project JSON.")
