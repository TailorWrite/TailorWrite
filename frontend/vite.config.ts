import { defineConfig } from 'vitest/config' // 'vite'
import react from '@vitejs/plugin-react'

import PathConstants from './src/pathConstants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: PathConstants.BASENAME,
  build: {
    // outDir: './build',  // Outputs the build to the docs folder (necessary for gitbucket pages)
    emptyOutDir: true,  // also necessary
  }, 
  test: {
    environment: 'jsdom',
  }
})