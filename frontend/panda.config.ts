import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  include: ['./app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
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
            'container-highest': {
              value: {
                base: '#FAF0F4',
                _dark: '#2A2220',
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
        shadows: {
          none: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0px, rgba(0, 0, 0, 0.14) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 0px 0px 0px',
            },
          },
          xs: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
            },
          },
          sm: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
            },
          },
          md: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px',
            },
          },
          lg: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            },
          },
          xl: {
            value: {
              base: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
            },
          },
        },
        // https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-motion.scss
        easings: {
          emphasized: {
            value: {
              base: 'cubic-bezier(0.2, 0, 0, 1)',
            },
          },
          'emphasized-accelerate': {
            value: {
              base: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
            },
          },
          'emphasized-decelerate': {
            value: {
              base: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
            },
          },
          standard: {
            value: {
              base: 'cubic-bezier(0.2, 0, 0, 1)',
            },
          },
          'standard-accelerate': {
            value: {
              base: 'cubic-bezier(0.3, 0, 1, 1)',
            },
          },
          'standard-decelerate': {
            value: {
              base: 'cubic-bezier(0, 0, 0, 1)',
            },
          },
        },
        durations: {
          long1: {
            value: {
              base: '0.45s',
            },
          },
          long2: {
            value: {
              base: '0.5s',
            },
          },
          long3: {
            value: {
              base: '0.55s',
            },
          },
          long4: {
            value: {
              base: '0.6s',
            },
          },
          medium1: {
            value: {
              base: '0.25s',
            },
          },
          medium2: {
            value: {
              base: '0.3s',
            },
          },
          medium3: {
            value: {
              base: '0.35s',
            },
          },
          medium4: {
            value: {
              base: '0.4s',
            },
          },
          short1: {
            value: {
              base: '0.05s',
            },
          },
          short2: {
            value: {
              base: '0.1s',
            },
          },
          short3: {
            value: {
              base: '0.15s',
            },
          },
          short4: {
            value: {
              base: '0.2s',
            },
          },
        },
        radii: {
          none: {
            value: {
              base: '0px',
            },
          },
          xs: {
            value: {
              base: '4px',
            },
          },
          sm: {
            value: {
              base: '8px',
            },
          },
          md: {
            value: {
              base: '12px',
            },
          },
          lg: {
            value: {
              base: '16px',
            },
          },
          xl: {
            value: {
              base: '28px',
            },
          },
          full: {
            value: {
              base: '9999px',
            },
          },
        },
      },
    },
    textStyles: {
      // line-height is decided by accessiblity: https://www.w3.org/TR/WCAG21/#text-spacing
      minimal: { value: { fontSize: '0.5rem', lineHeight: '1.5' } },
      caption: { value: { fontSize: '0.733rem', lineHeight: '1.5' } },
      body2: { value: { fontSize: '0.866rem', lineHeight: '1.75' } },
      body1: { value: { fontSize: '1rem', lineHeight: '1.75' } },
      subhead: { value: { fontSize: '1.133rem', lineHeight: '1.75' } },
      headlineS: { value: { fontSize: '1.4rem', lineHeight: '1.5' } },
      headlineM: { value: { fontSize: '1.6rem', lineHeight: '1.5' } },
      headlineL: { value: { fontSize: '2rem', lineHeight: '1.5' } },
    },
  },
  outdir: 'styled-system',
  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },
});
