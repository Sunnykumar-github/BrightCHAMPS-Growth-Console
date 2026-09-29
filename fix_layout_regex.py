import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Approach 1: Add pl-72 and pt-16 to the wrapper div holding header and main.
# The layout structure is:
# <div className="flex w-full min-h-screen relative">
#   <Sidebar />
#   <div className="flex-1 flex flex-col min-h-screen">
#     <Header />
#     <main ...

# We inject padding-left (pl-72) and padding-top (pt-16) to the secondary flex wrapper:
content = re.sub(
    r'<div className="flex-1 flex flex-col min-h-screen([^"]*)">',
    r'<div className="flex-1 flex flex-col min-h-screen pl-72 pt-16\1">',
    content
)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected native Tailwind layout padding margins!")
