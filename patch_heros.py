import os
import re
import glob

pages_dir = 'src/pages'
pages = [f for f in glob.glob(os.path.join(pages_dir, '*.tsx')) if not f.endswith('Admin.tsx') and not f.endswith('Home.tsx')]

for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Inject import if not exists
    if "useHeroImage" not in content:
        # find the last import
        imports = re.findall(r'^import .*;', content, flags=re.MULTILINE)
        if imports:
            last_import = imports[-1]
            content = content.replace(last_import, last_import + "\nimport { useHeroImage } from '../hooks/useHeroImage';")
    
    # 2. Inject const heroImage = useHeroImage();
    if "const heroImage = useHeroImage();" not in content:
        # Match export const Component = ... {
        content = re.sub(r'(export const \w+:?.*?=\s*\([^)]*\)\s*=>\s*\{)', r'\1\n  const heroImage = useHeroImage();', content)
        
    # 3. Replace background image gradient
    # Look for backgroundImage: linear-gradient(...)
    # Replace with the new unified one
    unified_bg = "backgroundImage: linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('')"
    content = re.sub(r'backgroundImage:\s*linear-gradient[^]+', unified_bg, content)
    
    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched {page}")
