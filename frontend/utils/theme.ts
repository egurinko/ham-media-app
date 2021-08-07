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
      hover: '#FFF0EE',
    },
    text: {
      main: '#6F6F6F',
    },
  },
  fonts,
});

export { theme };
