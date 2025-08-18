import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.join(__dirname, '..', 'src/components');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Read existing package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get all component directories
const components = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Generate exports
const exports = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
    require: './dist/index.js',
  },
};

// Add exports for each component
components.forEach(component => {
  // Component export
  exports[`./${component}`] = {
    types: `./dist/${component}.d.ts`,
    import: `./dist/${component}.js`,
    require: `./dist/${component}.js`,
  };

  // CSS export - with CSS code splitting, files are in assets/components/component/component.css
  exports[`./${component}.css`] = {
    import: `./dist/assets/components/${component}/${component}.css`,
  };
});

// Add design system and styles exports
exports['./design-system'] = {
  import: './dist/design-system.css',
};

exports['./styles'] = {
  import: './dist/ui.css',
};

// Update package.json
packageJson.exports = exports;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
