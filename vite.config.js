import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'LibreriaFrontend';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    port: 5174,
  },
});