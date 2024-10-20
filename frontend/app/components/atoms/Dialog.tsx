import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog } from '@ark-ui/react';
import { createStyleContext } from '@/app/utils/createStyleContext';
import type { RecipeVariantProps } from '@/styled/css';
import { sva } from '@/styled/css';
import type { HTMLStyledProps } from '@/styled/jsx';
import { styled } from '@/styled/jsx';
import type { ComponentProps } from '@/styled/types';
import type { Assign } from '@ark-ui/react';

export type DialogVariants = RecipeVariantProps<typeof dialog>;
export const dialog = sva({
  slots: dialogAnatomy.keys(),
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
        animation: 'ease-in',
      },
      _closed: {
        animation: 'ease-out',
      },
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      left: '0',
      overflow: 'auto',
      position: 'fixed',
      top: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: '100',
    },
    content: {
      background: 'background.main',
      borderRadius: 'md',
      boxShadow: 'md',
      minW: '1/2',
      position: 'relative',
      _open: {
        animation: 'ease-in',
      },
      _closed: {
        animation: 'ease-out',
      },
    },
    title: {
      fontWeight: 'bold',
      textStyle: 'headlineM',
    },
    description: {
      textStyle: 'body1',
    },
  },
});

const { withRootProvider, withContext } = createStyleContext(dialog);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
  Assign<Dialog.RootProviderProps, DialogVariants>
>(Dialog.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<Assign<Dialog.RootProps, DialogVariants>>(
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

export { DialogContext as Context } from '@ark-ui/react';
