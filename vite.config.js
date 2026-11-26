import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' membuat hasil build bisa dibuka dari sub-folder (mis. GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: { output: { manualChunks: { three: ['three'] } } },
    chunkSizeWarningLimit: 700,
  },
})
