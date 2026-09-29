import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Current layout structure might be:
# <div className="flex w-full min-h-screen relative">
#   <Sidebar />
#   <div className="flex-1 flex flex-col min-h-screen">
#      <Header />
#      <main className="flex-1 overflow-y-auto px-10 py-6">

# Or something similar. I will replace the main wrapper div!
content = content.replace(
    '<div className="flex-1 flex flex-col min-h-screen">',
    '<div className="flex-1 flex flex-col min-h-screen ml-[288px] pt-[64px]">'  # 288px = 72 tailwind, 64px = 16 tailwind
)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected offsets into layout.tsx!")
