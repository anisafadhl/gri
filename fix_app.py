import codecs

with codecs.open('src/App.tsx', 'r', 'utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line not in new_lines or line.strip() == "" or not (
        "import { BottomBanners }" in line or 
        "import { Yayasan }" in line or 
        '<Route path="/yayasan" element={<Yayasan />} />' in line
    ):
        new_lines.append(line)
    elif "import { BottomBanners }" in line and not any("import { BottomBanners }" in l for l in new_lines):
        new_lines.append(line)
    elif "import { Yayasan }" in line and not any("import { Yayasan }" in l for l in new_lines):
        new_lines.append(line)
    elif '<Route path="/yayasan" element={<Yayasan />} />' in line and not any('<Route path="/yayasan" element={<Yayasan />} />' in l for l in new_lines):
        new_lines.append(line)

with codecs.open('src/App.tsx', 'w', 'utf-8') as f:
    f.writelines(new_lines)

print("App.tsx cleaned")
