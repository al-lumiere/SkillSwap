import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/.storybook/**', '**/storybook-static/**'],
    }),
  ],
  resolve: {
    alias: [
      { find: '@ui', replacement: '/src/shared/ui' },
      { find: '@styles', replacement: '/src/shared/assets/styles' },
    ],
  },
});
