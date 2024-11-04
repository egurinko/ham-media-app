import { ark } from '@ark-ui/react';
import { cva, type RecipeVariantProps } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

const textareaStyle = cva({
  base: {
    appearance: 'none',
    background: 'transparent',
    borderColor: 'outline.main',
    borderRadius: 'xs',
    borderWidth: 'thin',
    minWidth: 0,
    outline: 0,
    transitionProperty: 'border',
    transitionDuration: 'short4',
    transitionTimingFunction: 'standard',
    transitionDelay: '0',
    width: 'full',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    _focus: {
      borderColor: 'primary.main',
      borderWidth: 'revert',
      boxShadow: 'none',
    },
    _invalid: {
      borderColor: 'fg.error',
      _focus: {
        borderColor: 'fg.error',
        boxShadow: '0 0 0 1px var(--colors-border-error)',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: { p: '2.5', fontSize: 'sm' },
      md: { p: '3', fontSize: 'md' },
      lg: { p: '3.5', fontSize: 'md' },
      xl: { p: '4', fontSize: 'md' },
    },
  },
});

type TextareaVariants = RecipeVariantProps<typeof textareaStyle>;

export type TextareaProps = TextareaVariants &
  ComponentPropsWithoutRef<typeof ark.textarea>;
export const Textarea = styled(ark.textarea, textareaStyle);
