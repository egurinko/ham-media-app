import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  include: ['./app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
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
            0: { value: '#000000' },
            10: { value: '#3d0600' },
            20: { value: '#631000' },
            25: { value: '#761500' },
            30: { value: '#8b1a00' },
            35: { value: '#9c2609' },
            40: { value: '#ad3215' },
            50: { value: '#d04a2b' },
            60: { value: '#f26342' },
            70: { value: '#ff8b6f' },
            80: { value: '#ffb4a3' },
            90: { value: '#ffdad2' },
            95: { value: '#ffede9' },
            98: { value: '#fff8f6' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
          brown: {
            0: { value: '#000000' },
            10: { value: '#2c1510' },
            20: { value: '#442a23' },
            25: { value: '#51342e' },
            30: { value: '#5d3f39' },
            35: { value: '#6a4b44' },
            40: { value: '#77574f' },
            50: { value: '#926f67' },
            60: { value: '#ae887f' },
            70: { value: '#caa299' },
            80: { value: '#e7bdb3' },
            90: { value: '#ffdad2' },
            95: { value: '#ffede9' },
            98: { value: '#fff8f6' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
          yellow: {
            0: { value: '#000000' },
            10: { value: '#241a00' },
            20: { value: '#3c2f04' },
            25: { value: '#483a0e' },
            30: { value: '#544519' },
            35: { value: '#605124' },
            40: { value: '#6d5d2e' },
            50: { value: '#877544' },
            60: { value: '#a28f5b' },
            70: { value: '#bea974' },
            80: { value: '#dbc58c' },
            90: { value: '#f8e1a6' },
            95: { value: '#ffefcd' },
            98: { value: '#fff8f1' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
          gray: {
            0: { value: '#000000' },
            10: { value: '#201a19' },
            20: { value: '#362f2d' },
            25: { value: '#413a38' },
            30: { value: '#4d4543' },
            35: { value: '#59504f' },
            40: { value: '#655c5a' },
            50: { value: '#7f7573' },
            60: { value: '#998e8c' },
            70: { value: '#b4a9a6' },
            80: { value: '#d0c4c1' },
            90: { value: '#ede0dd' },
            95: { value: '#fbeeeb' },
            98: { value: '#fff8f6' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
          'gray-variant': {
            0: { value: '#000000' },
            10: { value: '#251916' },
            20: { value: '#3b2d2a' },
            25: { value: '#473835' },
            30: { value: '#534340' },
            35: { value: '#5f4f4b' },
            40: { value: '#6c5b57' },
            50: { value: '#85736f' },
            60: { value: '#a08c88' },
            70: { value: '#bca7a2' },
            80: { value: '#d8c2bd' },
            90: { value: '#f5ddd8' },
            95: { value: '#ffede9' },
            98: { value: '#fff8f6' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
          red: {
            0: { value: '#000000' },
            10: { value: '#410002' },
            20: { value: '#690005' },
            25: { value: '#7e0007' },
            30: { value: '#93000a' },
            35: { value: '#a80710' },
            40: { value: '#ba1a1a' },
            50: { value: '#de3730' },
            60: { value: '#ff5449' },
            70: { value: '#ff897d' },
            80: { value: '#ffb4ab' },
            90: { value: '#ffdad6' },
            95: { value: '#ffedea' },
            98: { value: '#fff8f7' },
            99: { value: '#fffbff' },
            100: { value: '#ffffff' },
          },
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
                base: '{colors.orange.40}',
                _dark: '{colors.orange.80}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.orange.100}',
                _dark: '{colors.orange.20}',
              },
            },
            container: {
              value: {
                base: '{colors.orange.90}',
                _dark: '{colors.orange.30}',
              },
            },
            'on-container': {
              value: {
                base: '{colors.orange.10}',
                _dark: '{colors.orange.90}',
              },
            },
          },
          secondary: {
            main: {
              value: {
                base: '{colors.brown.40}',
                _dark: '{colors.brown.80}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.brown.100}',
                _dark: '{colors.brown.20}',
              },
            },
            container: {
              value: {
                base: '{colors.brown.90}',
                _dark: '{colors.brown.30}',
              },
            },
            'on-container': {
              value: {
                base: '{colors.brown.10}',
                _dark: '{colors.brown.90}',
              },
            },
          },
          tertiary: {
            main: {
              value: {
                base: '{colors.yellow.40}',
                _dark: '{colors.yellow.80}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.yellow.100}',
                _dark: '{colors.yellow.20}',
              },
            },
            container: {
              value: {
                base: '{colors.yellow.90}',
                _dark: '{colors.yellow.30}',
              },
            },
            'on-container': {
              value: {
                base: '{colors.yellow.10}',
                _dark: '{colors.yellow.90}',
              },
            },
          },
          error: {
            main: {
              value: {
                base: '{colors.red.40}',
                _dark: '{colors.red.80}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.red.100}',
                _dark: '{colors.red.20}',
              },
            },
            container: {
              value: {
                base: '{colors.red.90}',
                _dark: '{colors.red.30}',
              },
            },
            'on-container': {
              value: {
                base: '{colors.red.10}',
                _dark: '{colors.red.90}',
              },
            },
          },
          background: {
            main: {
              value: {
                base: '{colors.gray.99}',
                _dark: '{colors.gray.10}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.gray.10}',
                _dark: '{colors.gray.90}',
              },
            },
          },
          surface: {
            main: {
              value: {
                base: '{colors.gray.99}',
                _dark: '{colors.gray.10}',
              },
            },
            'on-main': {
              value: {
                base: '{colors.gray.10}',
                _dark: '{colors.gray.90}',
              },
            },
            variant: {
              value: {
                base: '{colors.gray-variant.90}',
                _dark: '{colors.gray-variant.30}',
              },
            },
            'on-variant': {
              value: {
                base: '{colors.gray-variant.30}',
                _dark: '{colors.gray-variant.80}',
              },
            },
          },
          outline: {
            main: {
              value: {
                base: '{colors.gray-variant.50}',
                _dark: '{colors.gray-variant.60}',
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
      headlineL: { value: { fontSize: '6xl', lineHeight: '3rem' } },
    },
  },
  outdir: 'styled-system',
});
