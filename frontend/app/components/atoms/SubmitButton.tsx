'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/app/components/atoms/Button';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  text: string;
};

export const SubmitButton: FC<Props> = ({ text }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={css({
        mt: 'lg',
      })}
      disabled={pending}
      loading={pending}
    >
      {text}
    </Button>
  );
};
