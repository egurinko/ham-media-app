import { css, cx } from '@/styled/css';
import type { ComponentPropsWithoutRef } from 'react';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}) => {
  const defaultStyle = css({
    borderRadius: 'md',
    width: '',
  });
  const variantStyle = css({
    bgColor: variant === 'primary' ? 'primary.main' : 'primary.light',
    color: variant === 'primary' ? 'white' : 'primary.main',
    fill: variant === 'primary' ? 'white' : 'primary.main',
    cursor: 'pointer',
  });
  const sizeStyle = css({
    width: fullWidth ? 'full' : '',
    px:
      size === 'xs'
        ? '2'
        : size === 'sm'
        ? '3'
        : size === 'md'
        ? '4'
        : size === 'lg'
        ? '5'
        : '3',
    height:
      size === 'xs'
        ? '24px'
        : size === 'sm'
        ? '32px'
        : size === 'md'
        ? '40px'
        : size === 'lg'
        ? '48px'
        : '32px',
  });

  return (
    <button
      className={cx(defaultStyle, variantStyle, sizeStyle, className)}
      {...rest}
    >
      {children}
    </button>
  );
};
