import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
