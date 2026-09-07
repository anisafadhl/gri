const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const pages = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.tsx') && !f.endsWith('Admin.tsx') && !f.endsWith('Home.tsx'))
  .map(f => path.join(pagesDir, f));

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf8');
  
  if (!content.includes('useHeroImage')) {
    const imports = content.match(/^import .*;$/gm);
    if (imports) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, lastImport + "\nimport { useHeroImage } from '../hooks/useHeroImage';");
    }
  }
  
  if (!content.includes('const heroImage = useHeroImage();')) {
    content = content.replace(/(export const \w+:?.*?=\s*\([^)]*\)\s*=>\s*\{)/, "$1\n  const heroImage = useHeroImage();");
  }
  
  const unifiedBg = "backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`";
  content = content.replace(/backgroundImage:\s*`linear-gradient[^`]+`/, unifiedBg);
  
  fs.writeFileSync(page, content, 'utf8');
  console.log('Patched ' + page);
}
