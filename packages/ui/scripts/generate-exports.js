import { readdirSync, existsSync } from 'fs';
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
      if (existsSync(indexPath)) {
        exports[`./${component}`] = {
          types: `./dist/components/${component}/index.d.ts`,
          import: `./dist/components/${component}/index.js`,
          require: `./dist/components/${component}/index.js`,
        };
      }
    });
  }
  return exports;
}

console.log(JSON.stringify(generateExports(), null, 2));
