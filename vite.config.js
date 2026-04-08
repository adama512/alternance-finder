import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oauth': {
        target: 'https://entreprise.francetravail.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth/, ''),
      },
      '/api-ft': {
        target: 'https://api.francetravail.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ft/, ''),
      },
    },
  },
})