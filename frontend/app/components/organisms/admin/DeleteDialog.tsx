'use client';

import { useTransition } from 'react';
import { Button } from '@/app/components/atoms/Button';
import {
  Dialog,
  DialogTrigger,
  DialogPositioner,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogCloseTrigger,
} from '@/app/components/atoms/Dialog';
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
    <Dialog>
      <DialogTrigger asChild>
        <IconButton visual="tonal" size="md" loading={isPending}>
          <Icon source={<TrashIcon />} width="20px" height="20px" />
        </IconButton>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent p="lg">
          <DialogTitle>ユーザの削除</DialogTitle>
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
            <DialogCloseTrigger asChild>
              <Button visual="text">キャンセル</Button>
            </DialogCloseTrigger>
            <DialogCloseTrigger asChild>
              <Button
                visual="primary"
                onClick={() =>
                  startTransition(async () => await handleDelete())
                }
              >
                削除する
              </Button>
            </DialogCloseTrigger>
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
};
