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
      { find: '@icons', replacement: '/src/shared/assets/icons' },
      { find: '@slices', replacement: '/src/store/slices' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@store', replacement: '/src/store' },
      { find: '@api', replacement: '/src/api' },
    ],
  },
});
