import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog as ArkDrawer } from '@ark-ui/react/dialog';
import { ark } from '@ark-ui/react/factory';
import { createStyleContext } from '@/app/utils/createStyleContext';
import { sva } from '@/styled/css';
import { styled } from '@/styled/jsx';
import type { ComponentProps } from 'react';

const anatomy = dialogAnatomy.extendWith('header', 'body', 'footer');

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

const { withProvider, withContext } = createStyleContext(drawer);

export const Root = withProvider(ArkDrawer.Root);
export const Backdrop = withContext(styled(ArkDrawer.Backdrop), 'backdrop');
export const Body = withContext(styled(ark.div), 'body');
export const CloseTrigger = withContext(
  styled(ArkDrawer.CloseTrigger),
  'closeTrigger',
);
export const Content = withContext(styled(ArkDrawer.Content), 'content');
export const Description = withContext(
  styled(ArkDrawer.Description),
  'description',
);
export const Footer = withContext(styled(ark.div), 'footer');
export const Header = withContext(styled(ark.div), 'header');
export const Positioner = withContext(
  styled(ArkDrawer.Positioner),
  'positioner',
);
export const Title = withContext(styled(ArkDrawer.Title), 'title');
export const Trigger = withContext(styled(ArkDrawer.Trigger), 'trigger');

export interface RootProps extends ComponentProps<typeof Root> {}
export interface BackdropProps extends ComponentProps<typeof Backdrop> {}
export interface BodyProps extends ComponentProps<typeof Body> {}
export interface CloseTriggerProps
  extends ComponentProps<typeof CloseTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface FooterProps extends ComponentProps<typeof Footer> {}
export interface HeaderProps extends ComponentProps<typeof Header> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
