// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'https://lockated.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, ''), // Correctly forward to /api
      },
      '/api': {
        target: 'https://staging.lockated.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Forward to /api
      },
    },
  },
});
