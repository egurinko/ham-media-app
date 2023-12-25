import { ark } from '@ark-ui/react/factory';
import deepmerge from 'deepmerge';
import type { RecipeVariantProps } from '@/styled/css';
import { cva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import { buttonStyle } from './Button';
import type { ComponentPropsWithoutRef } from 'react';

export const iconButtonStyle = cva(
  deepmerge(buttonStyle.config, {
    base: {
      borderRadius: 'xs',
    },
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        xs: { px: '2', h: '24px', w: '24px' },
        sm: { px: '3', h: '32px', w: '32px' },
        md: { px: '4', h: '40px', w: '40px' },
        lg: { px: '5', h: '48px', w: '48px' },
      },
    },
  }),
);

type IconButtonVariants = RecipeVariantProps<typeof iconButtonStyle>;

export type IconButtonProps = IconButtonVariants &
  ComponentPropsWithoutRef<typeof ark.button>;
export const IconButton = styled(ark.button, iconButtonStyle);
