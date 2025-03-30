import { radioGroupAnatomy } from '@ark-ui/anatomy';
import { RadioGroup } from '@ark-ui/react';
import { createStyleContext } from '@/app/utils/createStyleContext';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { HTMLStyledProps } from '@/styled/jsx';
import type { Assign } from '@ark-ui/react';
import type { ComponentProps } from 'react';

export type RadioGroupVariants = RecipeVariantProps<typeof radioGroup>;
export const radioGroup = sva({
  slots: radioGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: {
        _vertical: 'column',
        _horizontal: 'row',
      },
    },
    itemControl: {
      background: 'transparent',
      borderColor: 'outline.main',
      borderRadius: 'full',
      borderWidth: 'thin',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'background.main',
      },
      _checked: {
        background: 'primary.main',
        borderColor: 'primary.main',
        outlineColor: 'background.main',
        outlineStyle: 'solid',
        _hover: {
          background: 'primary.main',
        },
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    item: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    itemText: {
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
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
          gap: {
            _vertical: '3',
            _horizontal: '4',
          },
        },
        item: {
          gap: '2',
        },
        itemControl: {
          width: '16px',
          height: '16px',
          _checked: {
            outlineWidth: '3px',
            outlineOffset: '-4px',
          },
        },
        itemText: {
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          gap: {
            _vertical: '4',
            _horizontal: '6',
          },
        },
        item: {
          gap: '3',
        },
        itemControl: {
          width: '20px',
          height: '20px',
          _checked: {
            outlineWidth: '4px',
            outlineOffset: '-5px',
          },
        },
        itemText: {
          textStyle: 'md',
        },
      },
      lg: {
        root: {
          gap: {
            _vertical: '5',
            _horizontal: '8',
          },
        },
        item: {
          gap: '4',
        },
        itemControl: {
          width: '24px',
          height: '24px',
          _checked: {
            outlineWidth: '5px',
            outlineOffset: '-6px',
          },
        },
        itemText: {
          textStyle: 'lg',
        },
      },
    },
  },
});

const { withProvider, withContext } = createStyleContext(radioGroup);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, RadioGroup.RootProviderBaseProps>,
    RadioGroupVariants
  >
>(RadioGroup.RootProvider, 'root');

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, RadioGroup.RootBaseProps>,
    RadioGroupVariants
  >
>(styled(RadioGroup.Root), 'root');
export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, RadioGroup.IndicatorBaseProps>
>(RadioGroup.Indicator, 'indicator');
export const ItemControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, RadioGroup.ItemControlBaseProps>
>(RadioGroup.ItemControl, 'itemControl');
export const Item = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, RadioGroup.ItemBaseProps>
>(RadioGroup.Item, 'item');
export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, RadioGroup.ItemTextBaseProps>
>(RadioGroup.ItemText, 'itemText');
export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, RadioGroup.LabelBaseProps>
>(RadioGroup.Label, 'label');

export {
  RadioGroupContext as Context,
  RadioGroupItemHiddenInput as ItemHiddenInput,
} from '@ark-ui/react';
