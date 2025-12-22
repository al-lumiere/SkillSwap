import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@ui': path.resolve(__dirname, '../src/shared/ui'),
          '@icons': path.resolve(__dirname, '../src/shared/assets/icons'),
          '@eicons': path.resolve(__dirname, '../src/shared/assets/icons'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@features': path.resolve(__dirname, '../src/features'),
          '@layouts': path.resolve(__dirname, '../src/layouts'),
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@slices': path.resolve(__dirname, '../src/store/slices'),
          '@store': path.resolve(__dirname, '../src/store'),
          '@api': path.resolve(__dirname, '../src/api'),
          '@styles': path.resolve(__dirname, '../src/styles'),
          '@images': path.resolve(__dirname, '../src/shared/assets/images'),
        },
      },
    });
  },
};

export default config;
