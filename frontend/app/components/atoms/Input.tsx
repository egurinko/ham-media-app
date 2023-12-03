import { ark } from '@ark-ui/react';
import { cva, type RecipeVariantProps } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

const inputStyle = cva({
  base: {
    appearance: 'none',
    background: 'transparent',
    borderColor: 'outline.main',
    borderRadius: 'xs',
    borderWidth: 'thin',
    outline: 0,
    position: 'relative',
    transitionProperty: 'border',
    transitionDuration: 'short4',
    transitionTimingFunction: 'standard',
    transitionDelay: '0',
    px: 'sm',
    h: '2.5rem',
    fontSize: 'body1',
    caretColor: 'primary.main',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    _focus: {
      borderColor: 'primary.main',
      borderWidth: 'revert',
      boxShadow: 'none',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});

type InputVariants = RecipeVariantProps<typeof inputStyle>;

export type InputProps = InputVariants &
  ComponentPropsWithoutRef<typeof ark.input>;
export const Input = styled(ark.input, inputStyle);
