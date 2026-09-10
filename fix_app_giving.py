import codecs

with codecs.open('src/App.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Remove BottomBanners from App.tsx
content = content.replace("import { BottomBanners } from './components/BottomBanners';\n", "")
content = content.replace("{!isAdminRoute && <BottomBanners />}\n      ", "")

with codecs.open('src/App.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("App.tsx cleaned from BottomBanners")
