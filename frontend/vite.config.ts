import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access (Docker)
    port: 5173,
  },
  // optional: base path when served from subpath
  // base: '/',
});
