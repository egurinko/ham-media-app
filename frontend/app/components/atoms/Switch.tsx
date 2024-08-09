import { switchAnatomy } from '@ark-ui/anatomy';
import { Switch as ArkSwitch, type SwitchRootProps } from '@ark-ui/react';
import { forwardRef, type ReactNode } from 'react';
import type { RecipeVariantProps } from '@/styled/css';
import { css, cx, sva } from '@/styled/css';
import { splitCssProps } from '@/styled/jsx';
import type { Assign, JsxStyleProps } from '@/styled/types';

const switchStyle = sva({
  slots: switchAnatomy.keys(),
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
    },
    control: {
      alignItems: 'center',
      background: 'surface.container-highest',
      borderRadius: 'full',
      borderWidth: '2px',
      borderColor: 'outline.main',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: '0',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      _checked: {
        background: 'primary.main',
        borderColor: 'primary.main',
      },
    },
    label: {
      color: 'background.on-main',
    },
    thumb: {
      background: 'outline.main',
      borderRadius: 'full',
      boxShadow: 'xs',
      transitionDuration: 'normal',
      transitionProperty: 'transform, background',
      transitionTimingFunction: 'default',
      _checked: {
        transform: 'translateX(80%)',
        background: { base: 'primary.on-main' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: {
        root: {
          gap: 'sm',
        },
        control: {
          width: '52px',
          height: '32px',
          p: 'xs',
        },
        thumb: {
          width: '20px',
          height: '20px',
          _checked: {
            width: '24px',
            height: '24px',
          },
        },
        label: {
          textStyle: 'body1',
        },
      },
    },
  },
});

type SwitchVariantProps = RecipeVariantProps<typeof switchStyle>;

type SwitchProps = Assign<JsxStyleProps, SwitchRootProps> &
  SwitchVariantProps & {
    children?: ReactNode;
  };

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (props, ref) => {
    const [variantProps, switchProps] = switchStyle.splitVariantProps(props);
    const [cssProps, localProps] = splitCssProps(switchProps);
    const { children, className, ...rootProps } = localProps;
    const styles = switchStyle(variantProps);

    return (
      <ArkSwitch.Root
        ref={ref}
        className={cx(styles.root, css(cssProps), className)}
        {...rootProps}
      >
        <ArkSwitch.Control className={styles.control}>
          <ArkSwitch.Thumb className={styles.thumb} />
        </ArkSwitch.Control>
        {children && (
          <ArkSwitch.Label className={styles.label}>{children}</ArkSwitch.Label>
        )}
      </ArkSwitch.Root>
    );
  },
);

Switch.displayName = 'Switch';
