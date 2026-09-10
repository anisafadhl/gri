import codecs

with codecs.open('src/pages/Home.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Import BottomBanners
if "import { BottomBanners }" not in content:
    content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { BottomBanners } from '../components/BottomBanners';")

# Add BottomBanners at the end
replacement = """      </section>

      {/* 8. Giving Section (Persembahan) */}
      <BottomBanners />
    </div>
"""
content = content.replace("      </section>\n    </div>", replacement)

with codecs.open('src/pages/Home.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Home.tsx updated with BottomBanners")
