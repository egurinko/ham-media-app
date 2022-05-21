import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  colors: {
    primary: {
      main: '#FF6C4A',
      500: '#FF6C4A',
      light: '#FFF0EE',
    },
    background: {
      main: '#F9FAFB',
      hover: '#FFF0EE',
      gray: defaultTheme.colors.gray[200],
    },
    text: {
      main: '#6F6F6F',
      secondary: '#979DAA',
    },
    border: {
      gray: defaultTheme.colors.gray[300],
    },
  },
  fonts,
  components: {
    Checkbox: {
      baseStyle: {
        label: {
          touchAction: 'none',
        },
      },
    },
  },
});

export { theme };
