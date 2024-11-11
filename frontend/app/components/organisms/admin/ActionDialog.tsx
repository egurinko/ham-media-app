'use client';

import { useTransition } from 'react';
import { Dialog } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import TrashIcon from '@/assets/trash.svg';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  handleClick: () => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
};

export const ActionDialog: FC<Props> = ({
  handleClick,
  title,
  description,
  submitLabel,
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton visual="tonal" size="md" loading={isPending}>
          <Icon source={<TrashIcon />} width="20px" height="20px" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p="lg">
          <Dialog.Title>{title}</Dialog.Title>
          <div
            className={css({
              mt: 'md',
              display: 'flex',
              flexDirection: 'column',
              gap: 'lg',
            })}
          >
            {description}
          </div>
          <div className={css({ mt: 'lg', textAlign: 'right' })}>
            <Dialog.CloseTrigger asChild>
              <Button visual="text">キャンセル</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild>
              <Button
                visual="primary"
                onClick={() => startTransition(async () => await handleClick())}
              >
                {submitLabel}
              </Button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
