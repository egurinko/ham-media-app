import { ark } from '@ark-ui/react/factory';
import type { RecipeVariantProps } from '@/styled/css';
import { cva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

export const alertStyle = cva({
  base: {
    borderRadius: 'sm',
    display: 'flex',
    alignItems: 'center',
    gap: 'md',
    p: 'md',
    width: 'full',
  },
  defaultVariants: {
    visual: 'success',
  },
  variants: {
    visual: {
      success: {
        borderColor: 'surface.variant',
        borderWidth: 'thin',
        bgColor: 'surface.variant',
        color: 'surface.on-variant',
        fill: 'surface.on-variant',
      },
      error: {
        borderColor: 'error.container',
        borderWidth: 'thin',
        bgColor: 'error.container',
        color: 'error.on-container',
        fill: 'error.on-container',
      },
    },
  },
});

type AlertVariants = RecipeVariantProps<typeof alertStyle>;

export type AlertProps = AlertVariants &
  ComponentPropsWithoutRef<typeof ark.div>;
export const Alert = styled(ark.div, alertStyle);
