import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog, ark } from '@ark-ui/react';
import { createStyleContext } from '@/app/utils/createStyleContext';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { HTMLStyledProps } from '@/styled/jsx';
import type { Assign, PolymorphicProps } from '@ark-ui/react';
import type { ComponentProps } from 'react';

const anatomy = dialogAnatomy.extendWith('header', 'body', 'footer');

export type DrawerVariants = RecipeVariantProps<typeof drawer>;
export const drawer = sva({
  slots: [...anatomy.keys()],
  base: {
    backdrop: {
      backdropFilter: 'blur(1px)',
      height: '100vh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100vw',
      zIndex: '100',
      _open: {
        animation: 'backdrop-in',
      },
      _closed: {
        animation: 'backdrop-out',
      },
    },
    positioner: {
      bgColor: 'background.main',
      alignItems: 'center',
      display: 'flex',
      height: '100dvh',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      zIndex: '100',
    },
    content: {
      boxShadow: 'lg',
      display: 'grid',
      divideY: '1px',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `
        'header'
        'body'
        'footer'
      `,
      height: 'inherit',
      width: '100%',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      gridArea: 'header',
      pt: { base: '4', md: '6' },
      pb: '4',
      px: { base: '4', md: '6' },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gridArea: 'body',
      overflow: 'auto',
      p: { base: '4', md: '6' },
    },
    footer: {
      display: 'flex',
      gridArea: 'footer',
      justifyContent: 'flex-end',
      py: '4',
      px: { base: '4', md: '6' },
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      textStyle: 'xl',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
  },
  defaultVariants: {
    variant: 'right',
  },
  variants: {
    variant: {
      left: {
        positioner: {
          left: 0,
        },
        content: {
          _open: {
            animation: 'drawer-in-left',
          },
          _closed: {
            animation: 'drawer-out-left',
          },
        },
      },
      right: {
        positioner: {
          right: 0,
        },
        content: {
          _open: {
            animation: 'drawer-in-right',
          },
          _closed: {
            animation: 'drawer-out-right',
          },
        },
      },
    },
  },
});

const { withRootProvider, withContext } = createStyleContext(drawer);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
  Assign<Dialog.RootProviderProps, DrawerVariants>
>(Dialog.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<Assign<Dialog.RootProps, DrawerVariants>>(
  Dialog.Root,
);
export const Backdrop = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.BackdropBaseProps>
>(styled(Dialog.Backdrop), 'backdrop');
export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Dialog.CloseTriggerBaseProps>
>(styled(Dialog.CloseTrigger), 'closeTrigger');
export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.ContentBaseProps>
>(styled(Dialog.Content), 'content');
export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.DescriptionBaseProps>
>(styled(Dialog.Description), 'description');
export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Dialog.PositionerBaseProps>
>(styled(Dialog.Positioner), 'positioner');
export const Title = withContext<
  HTMLHeadingElement,
  Assign<HTMLStyledProps<'h2'>, Dialog.TitleBaseProps>
>(styled(Dialog.Title), 'title');
export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Dialog.TriggerBaseProps>
>(styled(Dialog.Trigger), 'trigger');
export const Header = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, PolymorphicProps>
>(styled(ark.div), 'header');
export const Body = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, PolymorphicProps>
>(styled(ark.div), 'body');
export const Footer = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, PolymorphicProps>
>(styled(ark.div), 'footer');

export { DialogContext as Context } from '@ark-ui/react';
