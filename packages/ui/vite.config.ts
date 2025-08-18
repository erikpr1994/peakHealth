import { readdirSync, existsSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';

import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import-x/default
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamically discover all components
function getComponentEntries(): Record<string, string> {
  const componentsDir = resolve(__dirname, 'src/components');
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
  };

  if (existsSync(componentsDir)) {
    const components = readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    components.forEach(component => {
      const indexPath = resolve(componentsDir, component, 'index.ts');
      if (existsSync(indexPath)) {
        entries[component] = indexPath;
      }
    });
  }

  return entries;
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    {
      name: 'copy-design-system-css',
      writeBundle(): void {
        // Copy design system CSS to dist
        const sourcePath = resolve(__dirname, 'src/design-system.css');
        const destPath = resolve(__dirname, 'dist/design-system.css');
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
        }
      },
    },
  ],
  build: {
    lib: {
      entry: getComponentEntries(),
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: assetInfo => {
          // Ensure CSS files get predictable names
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'ui.css';
          }
          return '[name][extname]';
        },
      },
    },
    cssCodeSplit: false, // Bundle all CSS into a single file
    sourcemap: true,
  },
  css: {
    modules: false, // Disable CSS modules since we're using regular CSS
  },
});
