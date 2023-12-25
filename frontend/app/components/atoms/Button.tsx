import { ark } from '@ark-ui/react/factory';
import type { RecipeVariantProps } from '@/styled/css';
import { cva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

export const buttonStyle = cva({
  base: {
    cursor: 'pointer',
    borderRadius: 'full',
    boxShadow: 'none',
    transitionProperty: 'box-shadow',
    transitionDuration: 'short4',
    transitionTimingFunction: 'standard',
    transitionDelay: '0',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    size: 'md',
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
    loading: {
      true: {
        opacity: 0.4,
        cursor: 'progress',
        position: 'relative',
        _before: {
          content: '""',
          width: '20px',
          height: '20px',
          mr: 'sm',
          borderWidth: 'medium',
          borderStyle: 'solid',
          borderColor: 'outline.main',
          borderTopWidth: 'medium',
          borderTopStyle: 'solid',
          borderTopColor: 'background.main',
          borderRadius: 'full',
          animation: 'spin 0.8s linear infinite',
        },
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
