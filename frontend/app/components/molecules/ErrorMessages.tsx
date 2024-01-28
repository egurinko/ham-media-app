import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  messages: string[];
};

export const ErrorMessages: FC<Props> = ({ messages }) =>
  messages.map((message: string) => (
    <Typography
      variant="body2"
      key={message}
      className={css({
        color: 'error.main',
      })}
    >
      {message}
    </Typography>
  ));
