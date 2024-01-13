import { ark } from '@ark-ui/react/factory';
import { cva, type RecipeVariantProps } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentPropsWithoutRef } from 'react';

const inputLabelStyle = cva({
  base: {
    color: 'background.on-main',
  },
});

type InputLabelVariants = RecipeVariantProps<typeof inputLabelStyle>;

export type InputLabelProps = InputLabelVariants &
  ComponentPropsWithoutRef<typeof ark.label>;
export const InputLabel = styled(ark.label, inputLabelStyle);
