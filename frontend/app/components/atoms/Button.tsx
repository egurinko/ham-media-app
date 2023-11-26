import { ark } from '@ark-ui/react';
import type { RecipeVariantProps } from '@/styled/css';
import { cva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

const buttonStyle = cva({
  base: {
    cursor: 'pointer',
    borderRadius: 'full',
    boxShadow: 'none',
    transitionProperty: 'box-shadow',
    transitionDuration: 'short4',
    transitionTimingFunction: 'standard',
    transitionDelay: '0',
    _hover: {
      boxShadow: 'xs',
    },
    _focusVisible: {
      boxShadow: 'xs',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
  defaultVariants: {
    visual: 'primary',
    fullWidth: false,
  },
  variants: {
    visual: {
      primary: {
        bgColor: 'primary.main',
        color: 'primary.on-main',
        fill: 'primary.on-main',
      },
      outlined: {
        borderColor: 'outline.main',
        borderWidth: 'thin',
        bgColor: 'transparent',
        color: 'primary.main',
        fill: 'primary.main',
      },
      text: {
        bgColor: 'transparent',
        color: 'primary.main',
        fill: 'primary.main',
      },
      tonal: {
        bgColor: 'primary.container',
        color: 'primary.on-container',
        fill: 'primary.on-container',
      },
    },
    fullWidth: {
      true: {
        width: 'full',
      },
    },
    size: {
      xs: { px: '2', h: '24px' },
      sm: { px: '3', h: '32px' },
      md: { px: '4', h: '40px' },
      lg: { px: '5', h: '48px' },
    },
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;

export type ButtonProps = ButtonVariants &
  ComponentPropsWithoutRef<typeof ark.button>;
export const Button = styled(ark.button, buttonStyle);
