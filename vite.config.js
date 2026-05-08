import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './frontend/index.html',
        admin: './frontend/admin.html'
      }
    }
  }
});
