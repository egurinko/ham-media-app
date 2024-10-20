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
  handleDelete: () => Promise<void>;
};

export const DeleteDialog: FC<Props> = ({ handleDelete }) => {
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
          <Dialog.Title>ユーザの削除</Dialog.Title>
          <div
            className={css({
              mt: 'md',
              display: 'flex',
              flexDirection: 'column',
              gap: 'lg',
            })}
          >
            ユーザを削除してもよろしいですか？
          </div>
          <div className={css({ mt: 'lg', textAlign: 'right' })}>
            <Dialog.CloseTrigger asChild>
              <Button visual="text">キャンセル</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild>
              <Button
                visual="primary"
                onClick={() =>
                  startTransition(async () => await handleDelete())
                }
              >
                削除する
              </Button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
