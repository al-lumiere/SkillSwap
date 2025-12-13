import type { Preview } from '@storybook/react-vite';
import '@styles/variables.css';
import '@styles/fonts.css';
import '@styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
