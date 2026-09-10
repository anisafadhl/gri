import codecs

with codecs.open('src/index.css', 'r', 'utf-8') as f:
    content = f.read()

replacement = """@layer base {
  html, body {
    overflow-x: hidden;
    position: relative;
    width: 100%;
  }
  html {
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
  }
  body {
    @apply bg-[#FBF9F5] text-[#171717] antialiased font-sans;
  }"""

# Need to replace the old html and body blocks
import re
pattern = re.compile(r"@layer base \{\s*html \{[^}]*\}\s*body \{[^}]*\}", re.DOTALL)
content = pattern.sub(replacement, content)

with codecs.open('src/index.css', 'w', 'utf-8') as f:
    f.write(content)

print("index.css updated with proper iOS horizontal overflow fix")
