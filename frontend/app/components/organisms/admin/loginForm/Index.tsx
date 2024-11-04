'use client';

import { useActionState } from 'react';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Typography } from '@/app/components/atoms/Typography';
import AlertIcon from '@/assets/alert.svg';
import { css } from '@/styled/css';
import { createSessionAction } from './index.actions';
import type { FC } from 'react';

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const LoginForm: FC<NoProps> = () => {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createSessionAction, initialState);
  return (
    <form
      action={dispatch}
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'lg',
      })}
    >
      <div
        id="login-error"
        aria-live="polite"
        aria-atomic="true"
        className={css({
          color: 'error.main',
          fill: 'error.main',
          display: 'flex',
          gap: 'xs',
          alignItems: 'center',
        })}
      >
        {state.message && (
          <>
            <Icon source={<AlertIcon />} width={15} height={15} />
            <Typography variant="body2">{state.message}</Typography>
          </>
        )}
      </div>
      <div>
        <InputLabel htmlFor="email">メールアドレス</InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          fullWidth
        />
      </div>
      <div>
        <InputLabel htmlFor="password">パスワード</InputLabel>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          fullWidth
        />
      </div>
      <SubmitButton text="ログイン" />
    </form>
  );
};
