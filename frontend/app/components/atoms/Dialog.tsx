import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog as ArkDialog } from '@ark-ui/react/dialog';
import { createStyleContext } from '@/app/utils/createStyleContext';
import { sva } from '@/styled/css';
import type { HTMLStyledProps } from '@/styled/jsx';
import { styled } from '@/styled/jsx';

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

const { withProvider, withContext } = createStyleContext(dialog);
const Dialog = withProvider(ArkDialog.Root);
const DialogBackdrop = withContext(styled(ArkDialog.Backdrop), 'backdrop');
const DialogCloseTrigger = withContext(
  styled(ArkDialog.CloseTrigger),
  'closeTrigger',
);
const DialogContent = withContext(styled(ArkDialog.Content), 'content');
const DialogDescription = withContext(
  styled(ArkDialog.Description),
  'description',
);
const DialogPositioner = withContext(
  styled(ArkDialog.Positioner),
  'positioner',
);
const DialogTitle = withContext(styled(ArkDialog.Title), 'title');
const DialogTrigger = withContext(styled(ArkDialog.Trigger), 'trigger');

export {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogPositioner,
  DialogTrigger,
  DialogCloseTrigger,
};

export interface DialogProps extends HTMLStyledProps<typeof Dialog> {}
export interface DialogBackdropProps
  extends HTMLStyledProps<typeof DialogBackdrop> {}
export interface DialogContentProps
  extends HTMLStyledProps<typeof DialogContent> {}
export interface DialogTitleProps extends HTMLStyledProps<typeof DialogTitle> {}
export interface DialogDescriptionProps
  extends HTMLStyledProps<typeof DialogDescription> {}
export interface DialogPositionerProps
  extends HTMLStyledProps<typeof DialogPositioner> {}
export interface DialogTriggerProps
  extends HTMLStyledProps<typeof DialogTrigger> {}
export interface DialogCloseTriggerProps
  extends HTMLStyledProps<typeof DialogCloseTrigger> {}
