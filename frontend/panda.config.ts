import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],
  globalCss: {
    'html, body': {
      color: '#6F6F6F',
      fontSize: '16px',
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          orange: {
            main: { value: '#FF6C4A' },
            light: { value: '#FFF0EE' },
          },
          white: { value: '#FFFFFF' },
          borderColor: { value: '#EDF1F6' },
        },
        fonts: {
          body: { value: 'system-ui, sans-serif' },
        },
        borders: {
          gray: {
            value: {
              width: '1px',
              color: '#EDF1F6',
              style: 'solid',
            },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            main: {
              value: {
                base: '{colors.orange.main}',
              },
            },
            light: {
              value: {
                base: '{colors.orange.light}',
              },
            },
          },
          background: {
            main: {
              value: {
                base: '{colors.gray.50}',
              },
            },
            hover: {
              value: {
                base: '{colors.orange.light}',
              },
            },
            white: {
              value: {
                base: '{colors.white}',
              },
            },
          },
          text: {
            main: {
              value: {
                base: '#6F6F6F',
              },
            },
            secondary: {
              value: {
                base: '#979DAA',
              },
            },
          },
          borders: {
            main: {
              value: {
                base: '{colors.borderColor}',
              },
            },
          },
        },
      },
    },
    textStyles: {
      minimal: { value: { fontSize: '8px', lineHeight: '1rem' } },
      caption: { value: { fontSize: 'xs', lineHeight: '1.125rem' } },
      body2: { value: { fontSize: 'sm', lineHeight: '1.25rem' } },
      body1: { value: { fontSize: 'md', lineHeight: '1.5rem' } },
      subhead: { value: { fontSize: 'lg', lineHeight: '1.875rem' } },
      headlineS: { value: { fontSize: 'xl', lineHeight: '1.875rem' } },
      headlineM: { value: { fontSize: '2xl', lineHeight: '2rem' } },
      headlineL: { value: { fontSize: '3xl', lineHeight: '2.375rem' } },
    },
  },
  outdir: 'styled-system',
});
