import {
  Checkbox as ArkCheckbox,
  type CheckboxProps as ArkCheckboxProps,
} from '@ark-ui/react/checkbox';
import { forwardRef, type ReactNode } from 'react';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';

export const checkbox = sva({
  slots: ['root', 'label', 'control'],
  base: {
    root: {
      alignItems: 'center',
      colorPalette: 'primary',
      display: 'flex',
    },
    label: {},
    control: {
      alignItems: 'center',
      borderColor: 'outline.main',
      borderWidth: '1px',
      color: 'background.main',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      transitionDuration: 'short4',
      transitionProperty: 'border-color, background',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'background.main',
      },
      _checked: {
        background: 'primary.main',
        borderColor: 'border.outline',
        _hover: {
          background: 'primary.main',
        },
      },
      _indeterminate: {
        background: 'primary.main',
        borderColor: 'border.outline',
        _hover: {
          background: 'primary.main',
        },
      },
      '&:has(+ :focus-visible)': {
        outlineOffset: '2px',
        outline: '2px solid',
        outlineColor: 'border.outline',
        _checked: {
          outlineColor: 'primary.main',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: 'xs',
        },
        control: {
          width: '16px',
          height: '16px',
          borderRadius: 'xs',
          '& svg': {
            width: '14px',
            height: '14px',
          },
        },
        label: {
          textStyle: 'body2',
        },
      },
      md: {
        root: {
          gap: 'xs',
        },
        control: {
          width: '20px',
          height: '20px',
          borderRadius: 'xs',
          '& svg': {
            width: '18px',
            height: '18px',
          },
        },
        label: {
          textStyle: 'body1',
        },
      },
      lg: {
        root: {
          gap: 'sm',
        },
        control: {
          width: '24px',
          height: '24px',
          borderRadius: 'xs',
          '& svg': {
            width: '22px',
            height: '22px',
          },
        },
        label: {
          textStyle: 'subhead',
        },
      },
    },
  },
});

type CheckboxVariantProps = RecipeVariantProps<typeof checkbox>;

type CheckboxProps = ArkCheckboxProps &
  CheckboxVariantProps & {
    children?: ReactNode;
  };

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (props, ref) => {
    const [variantProps, localProps] = checkbox.splitVariantProps(props);
    const { children, ...rootProps } = localProps;
    const styles = checkbox(variantProps);

    return (
      <ArkCheckbox.Root ref={ref} className={styles.root} {...rootProps}>
        {(state) => (
          <>
            <ArkCheckbox.Control className={styles.control}>
              {state.isChecked && <CheckIcon />}
              {state.isIndeterminate && <MinusIcon />}
            </ArkCheckbox.Control>
            {children && (
              <ArkCheckbox.Label className={styles.label}>
                {children}
              </ArkCheckbox.Label>
            )}
          </>
        )}
      </ArkCheckbox.Root>
    );
  },
);

Checkbox.displayName = 'Checkbox';

const CheckIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.91675 7H11.0834"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
