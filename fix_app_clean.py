import codecs

with codecs.open('src/App.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Remove the wrapper constraints
content = content.replace("className=\"font-sans text-neutral-900 bg-[#fbf9f5] min-h-screen flex flex-col overflow-x-clip w-full relative\"", "className=\"font-sans text-neutral-900 bg-[#fbf9f5] min-h-screen flex flex-col\"")
content = content.replace("className=\"font-sans text-neutral-900 bg-[#fbf9f5] min-h-screen flex flex-col overflow-x-hidden w-full relative\"", "className=\"font-sans text-neutral-900 bg-[#fbf9f5] min-h-screen flex flex-col\"")

with codecs.open('src/App.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("App.tsx cleaned wrapper")
