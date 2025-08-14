import { readdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(__dirname, '../src/components');

function generateExports() {
  const exports = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      require: './dist/index.js',
    },
  };

  if (existsSync(componentsDir)) {
    const components = readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    components.forEach(component => {
      const indexPath = resolve(componentsDir, component, 'index.ts');
      const cssPath = resolve(componentsDir, component, `${component}.css`);

      if (existsSync(indexPath)) {
        exports[`./${component}`] = {
          types: `./dist/components/${component}/index.d.ts`,
          import: `./dist/components/${component}/index.js`,
          require: `./dist/components/${component}/index.js`,
        };

        // Add CSS export only if CSS file exists
        if (existsSync(cssPath)) {
          exports[`./${component}/styles`] = {
            import: `./dist/components/${component}/${component}.css`,
          };
        }
      }
    });

    // Add main styles export
    exports['./styles'] = {
      import: './dist/components/ui.css',
    };
  }
  return exports;
}

// Generate exports and write to exports.json
const exports = generateExports();
writeFileSync(
  resolve(__dirname, '../exports.json'),
  JSON.stringify(exports, null, 2)
);

// Update package.json exports field
const packageJsonPath = resolve(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
packageJson.exports = exports;
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

// eslint-disable-next-line no-console
console.log('Exports generated and package.json updated successfully');
