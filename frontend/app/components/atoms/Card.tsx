import { sva, cx } from '@/styled/css';
import type { RecipeVariantProps } from '@/styled/css';
import type { ark } from '@ark-ui/react';
import type { FC, PropsWithChildren, ComponentPropsWithoutRef } from 'react';

export const card = sva({
  slots: ['root'],
  base: {
    root: {
      shadow: 'none',
      borderRadius: 'md',
    },
  },
  variants: {
    visual: {
      'filled-primary': {
        root: {
          bgColor: 'surface.container-highest',
        },
      },
      'filled-tertiary': {
        root: {
          bgColor: 'surface.accent',
          color: 'surface.on-accent',
        },
      },
      outlined: {
        root: {
          bgColor: 'transparent',
          borderColor: 'outline.main',
          borderWidth: 'thin',
        },
      },
    },
  },
  defaultVariants: {
    visual: 'filled-primary',
  },
});

export type CardVariants = RecipeVariantProps<typeof card>;
export type CardProps = CardVariants & ComponentPropsWithoutRef<typeof ark.div>;

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
  ...props
}) => {
  const classes = card(props);

  return <div className={cx(classes.root, className)}>{children}</div>;
};
