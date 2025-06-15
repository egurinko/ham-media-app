'use client';

import { useState, useActionState } from 'react';
import { Dialog } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { Tag } from '@/app/components/atoms/Tag';
import { Textarea } from '@/app/components/atoms/Textarea';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { State } from '@/app/utils/formSchema/stockRequest';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import {
  rejectStockRequestAction,
  approveStockRequestAction,
} from './index.action';
import type { FC } from 'react';

type Props = {
  id: number;
  submitType: 'approve' | 'reject';
};

export const StockRequestReview: FC<Props> = ({ id, submitType }) => {
  const isApproval = submitType === 'approve';
  const [message, setMessage] = useState('');
  const initialState: State = { message: '', errors: { _errors: [] } };
  const [state, dispatch, isPending] = useActionState(
    isApproval ? approveStockRequestAction : rejectStockRequestAction,
    initialState,
  );

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button visual={isApproval ? 'primary' : 'tonal'} size="md">
            {isApproval ? '承認' : '棄却'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="lg">
            <Dialog.Title>{isApproval ? '承認' : '棄却'}</Dialog.Title>
            <form action={dispatch}>
              <input hidden value={id} id="id" name="id" readOnly />
              <div className={stack({ mt: 'md' })}>
                <InputLabel htmlFor="message">
                  メッセージ <Tag>必須</Tag>
                </InputLabel>
                <Textarea
                  id="message"
                  name="message"
                  required={true}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-describedby="message-error"
                />
                <div id="message-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.message?._errors && (
                    <ErrorMessages messages={state.errors.message._errors} />
                  )}
                </div>
              </div>
              <div className={css({ mt: 'lg', textAlign: 'right' })}>
                <Dialog.CloseTrigger asChild>
                  <Button type="button" visual="text">
                    キャンセル
                  </Button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <Button visual="primary" type="submit" disabled={isPending}>
                    {isApproval ? '承認' : '棄却'}
                  </Button>
                </Dialog.CloseTrigger>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};
