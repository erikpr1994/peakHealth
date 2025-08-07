import { readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamically discover all components
function getComponentEntries() {
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
        entries[`components/${component}`] = indexPath;
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
        assetFileNames: 'components/[name][extname]',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
