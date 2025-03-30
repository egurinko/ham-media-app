import { ark } from '@ark-ui/react';
import { createStyleContext } from '@/app/utils/createStyleContext';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';
import type { HTMLStyledProps } from '@/styled/jsx';
import type { Assign, PolymorphicProps } from '@ark-ui/react';

export type TableVariantProps = RecipeVariantProps<typeof table>;
export const table = sva({
  slots: ['root', 'body', 'cell', 'footer', 'head', 'header', 'row', 'caption'],
  base: {
    root: {
      captionSide: 'bottom',
      width: 'full',
    },
    body: {
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    caption: {
      color: 'primary.main',
    },
    cell: {
      verticalAlign: 'middle',
      p: 'sm',
    },
    footer: {
      fontWeight: 'normal',
      borderTopWidth: '1px',
      '& tr:last-child': {
        borderBottomWidth: '0',
      },
    },
    header: {
      fontWeight: 'normal',
      textAlign: 'left',
      verticalAlign: 'middle',
      p: 'xs',
    },
    row: {
      borderBottomWidth: '1px',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '11',
          p: 'xs',
        },
        header: {
          height: '11',
          px: '3',
        },
      },
      md: {
        root: {
          textStyle: 'sm',
        },
        caption: {
          mt: '4',
        },
        cell: {
          height: '14',
          p: 'sm',
        },
        header: {
          height: '11',
          px: '4',
        },
      },
    },
  },
});

const { withProvider, withContext } = createStyleContext(table);

export type RootProps = Assign<HTMLStyledProps<'table'>, PolymorphicProps> &
  TableVariantProps;
export const Root = withProvider<HTMLTableElement, RootProps>(
  ark.table,
  'root',
);

export const Body = withContext<
  HTMLTableSectionElement,
  Assign<HTMLStyledProps<'tbody'>, PolymorphicProps>
>(ark.tbody, 'body');

export const Caption = withContext<
  HTMLTableCaptionElement,
  Assign<HTMLStyledProps<'caption'>, PolymorphicProps>
>(ark.caption, 'caption');

export const Cell = withContext<
  HTMLTableCellElement,
  Assign<HTMLStyledProps<'td'>, PolymorphicProps>
>(ark.td, 'cell');

export const Foot = withContext<
  HTMLTableSectionElement,
  Assign<HTMLStyledProps<'tfoot'>, PolymorphicProps>
>(ark.tfoot, 'footer');

export const Head = withContext<
  HTMLTableSectionElement,
  Assign<HTMLStyledProps<'head'>, PolymorphicProps>
>(ark.thead, 'head');

export const Header = withContext<
  HTMLTableCellElement,
  Assign<HTMLStyledProps<'th'>, PolymorphicProps>
>(ark.th, 'header');

export const Row = withContext<
  HTMLTableRowElement,
  Assign<HTMLStyledProps<'tr'>, PolymorphicProps>
>(ark.tr, 'row');
