import { selectAnatomy } from '@ark-ui/anatomy';
import { Select as ArkSelect } from '@ark-ui/react/select';
import { createStyleContext } from '@/app/utils/createStyleContext';
import { sva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentProps } from 'react';

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
const Select = withProvider(styled(ArkSelect.Root), 'root');
const ClearTrigger = withContext(
  styled(ArkSelect.ClearTrigger),
  'clearTrigger',
);
const Content = withContext(styled(ArkSelect.Content), 'content');
const Control = withContext(styled(ArkSelect.Control), 'control');
const Indicator = withContext(styled(ArkSelect.Indicator), 'indicator');
const Item = withContext(styled(ArkSelect.Item), 'item');
const ItemGroup = withContext(styled(ArkSelect.ItemGroup), 'itemGroup');
const ItemGroupLabel = withContext(
  styled(ArkSelect.ItemGroupLabel),
  'itemGroupLabel',
);
const ItemIndicator = withContext(
  styled(ArkSelect.ItemIndicator),
  'itemIndicator',
);
const ItemText = withContext(styled(ArkSelect.ItemText), 'itemText');
const Label = withContext(styled(ArkSelect.Label), 'label');
const Positioner = withContext(styled(ArkSelect.Positioner), 'positioner');
const Trigger = withContext(styled(ArkSelect.Trigger), 'trigger');
const ValueText = withContext(styled(ArkSelect.ValueText), 'valueText');

export {
  Select,
  ClearTrigger,
  Content,
  Control,
  Indicator,
  Item,
  ItemGroup,
  ItemGroupLabel,
  ItemIndicator,
  ItemText,
  Label,
  Positioner,
  Trigger,
  ValueText,
};

export interface SelectProps extends ComponentProps<typeof Select> {}
export interface ClearTriggerProps
  extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemGroupLabelProps
  extends ComponentProps<typeof ItemGroupLabel> {}
export interface ItemIndicatorProps
  extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ValueTextProps extends ComponentProps<typeof ValueText> {}
