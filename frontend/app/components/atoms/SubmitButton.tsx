'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/app/components/atoms/Button';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  text: string;
  className?: string;
};

export const SubmitButton: FC<Props> = ({ text, className }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={
        !!className
          ? className
          : css({
              mt: 'lg',
            })
      }
      disabled={pending}
      loading={pending}
    >
      {text}
    </Button>
  );
};
