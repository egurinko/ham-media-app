import { css, cx } from '@/styled/css';
import type { PropertyValue } from '@/styled/types/prop-type.d.ts';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  variant?: PropertyValue<'textStyle'>;
  className?: string | undefined;
  display?: 'inline' | 'block' | '-webkit-box';
  bold?: boolean;
};

export const Typography: FC<PropsWithChildren<Props>> = ({
  children,
  variant = 'md',
  className,
  display,
  bold = false,
}) => {
  const CustomTag =
    variant === 'minimal' || variant === 'caption'
      ? 'span'
      : variant === 'body1' || variant === 'body2'
        ? 'p'
        : variant === 'subhead'
          ? 'h4'
          : variant === 'headlineS'
            ? 'h3'
            : variant === 'headlineM'
              ? 'h2'
              : variant === 'headlineL'
                ? 'h1'
                : 'p';

  const variantStyle = css({
    display: display
      ? display
      : variant === 'minimal' || variant === 'caption'
        ? 'inline'
        : 'block',
    textStyle:
      variant === 'minimal'
        ? 'minimal'
        : variant === 'caption'
          ? 'caption'
          : variant === 'body1'
            ? 'body1'
            : variant === 'body2'
              ? 'body2'
              : variant === 'subhead'
                ? 'subhead'
                : variant === 'headlineS'
                  ? 'headlineS'
                  : variant === 'headlineM'
                    ? 'headlineM'
                    : variant === 'headlineL'
                      ? 'headlineL'
                      : 'headlineL',
    fontWeight: bold ? 'bold' : 'normal',
  });

  return (
    <CustomTag className={cx(variantStyle, className)}>{children}</CustomTag>
  );
};
