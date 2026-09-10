import codecs

with codecs.open('src/index.css', 'r', 'utf-8') as f:
    content = f.read()

replacement = """@layer base {
  html {
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
  }
  body {
    overflow-x: clip;
    @apply bg-[#FBF9F5] text-[#171717] antialiased font-sans;
  }
  #root {
    overflow-x: clip;
  }"""

import re
pattern = re.compile(r"@layer base \{\s*html, body \{[^}]*\}\s*html \{[^}]*\}\s*body \{[^}]*\}", re.DOTALL)
content = pattern.sub(replacement, content)

with codecs.open('src/index.css', 'w', 'utf-8') as f:
    f.write(content)

print("index.css updated to use overflow-x: clip")
