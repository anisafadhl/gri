import codecs

with codecs.open('src/App.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Replace overflow-x-hidden with overflow-x-clip
content = content.replace("overflow-x-hidden w-full relative", "overflow-x-clip w-full relative")

with codecs.open('src/App.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("App.tsx overflow changed to clip")
