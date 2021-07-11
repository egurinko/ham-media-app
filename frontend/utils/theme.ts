import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  colors: {
    primary: {
      main: '#FF6C4A',
      light: '#FFF0EE',
    },
    background: {
      main: '#F9FAFB',
    },
  },
  fonts,
});

export { theme };
