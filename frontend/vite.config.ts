import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/info301/TailorWrite/TailorWrite/pages/",
  build: {
    outDir: '../docs',
    emptyOutDir: true, // also necessary
  }
})