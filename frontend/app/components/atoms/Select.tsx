import { selectAnatomy } from '@ark-ui/anatomy';
import { Select } from '@ark-ui/react';
import { createStyleContext } from '@/app/utils/createStyleContext';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { HTMLStyledProps } from '@/styled/jsx';
import type { Assign } from '@ark-ui/react';
import type { ComponentProps } from 'react';

export type SelectVariants = RecipeVariantProps<typeof select>;
export const select = sva({
  slots: selectAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
      width: '100%',
    },
    content: {
      background: 'background.main',
      borderRadius: 'xs',
      boxShadow: 'md',
      display: 'flex',
      flexDirection: 'column',
      zIndex: '100',
      _open: {
        animation: 'fadeIn 0.25s ease-out',
      },
      _closed: {
        animation: 'fadeOut 0.2s ease-out',
        display: 'none',
      },
      _focusVisible: {
        outlineOffset: '2px',
        outline: '2px solid',
        outlineColor: 'border.outline',
      },
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'space-between',
      p: 'md',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'surface.container-highest',
      },
      _highlighted: {
        background: 'gray.a3',
        color: 'fg.default',
      },
      _selected: {
        fontWeight: 'bold',
      },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          color: 'fg.disabled',
        },
      },
    },
    itemGroupLabel: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    itemIndicator: {
      color: 'background.on-main',
    },
    label: {
      color: 'background.on-main',
    },
    trigger: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      appearance: 'none',
      background: 'transparent',
      borderColor: 'outline.main',
      borderRadius: 'xs',
      borderWidth: 'thin',
      outline: 0,
      transitionProperty: 'border',
      transitionDuration: 'short4',
      transitionTimingFunction: 'standard',
      transitionDelay: '0',
      px: 'sm',
      h: '2.5rem',
      fontSize: 'body1',
      caretColor: 'primary.main',
      alignItems: 'center',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _focus: {
        borderColor: 'primary.main',
        borderWidth: 'revert',
        boxShadow: 'none',
      },
      _placeholderShown: {
        color: 'surface.on-variant',
      },
      '& :where(svg)': {
        color: 'surface.on-variant',
      },
    },
  },
});

const { withProvider, withContext } = createStyleContext(select);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<
    Assign<
      HTMLStyledProps<'div'>,
      Select.RootProviderBaseProps<Select.CollectionItem>
    >,
    SelectVariants
  >
>(Select.RootProvider, 'root');

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, Select.RootBaseProps<Select.CollectionItem>>,
    SelectVariants
  >
>(styled(Select.Root), 'root');

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Select.ClearTriggerBaseProps>
>(styled(Select.ClearTrigger), 'clearTrigger');
export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ContentBaseProps>
>(styled(Select.Content), 'content');
export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ControlBaseProps>
>(styled(Select.Control), 'control');
export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.IndicatorBaseProps>
>(styled(Select.Indicator), 'indicator');
export const ItemGroupLabel = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ItemGroupLabelBaseProps>
>(styled(Select.ItemGroupLabel), 'itemGroupLabel');
export const ItemGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ItemGroupBaseProps>
>(styled(Select.ItemGroup), 'itemGroup');
export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ItemIndicatorBaseProps>
>(styled(Select.ItemIndicator), 'itemIndicator');
export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ItemBaseProps>
>(styled(Select.Item), 'item');
export const ItemText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'span'>, Select.ItemTextBaseProps>
>(styled(Select.ItemText), 'itemText');
export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Select.LabelBaseProps>
>(styled(Select.Label), 'label');

export const List = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.ListBaseProps>
>(styled(Select.List), 'list');

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Select.PositionerBaseProps>
>(styled(Select.Positioner), 'positioner');

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Select.TriggerBaseProps>
>(styled(Select.Trigger), 'trigger');
export const ValueText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Select.ValueTextBaseProps>
>(styled(Select.ValueText), 'valueText');

export { SelectContext as Context } from '@ark-ui/react';
