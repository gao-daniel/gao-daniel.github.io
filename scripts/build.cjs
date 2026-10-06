const fs = require('node:fs');
const path = require('node:path');
const files = ['index.html', 'styles.css', 'battle/index.html'];
for (const file of files) {
  const target = path.join('dist', file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(file, target);
}
console.log(`Built ${files.length} static files for GitHub Pages and Sites.`);
