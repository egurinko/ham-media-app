import { Card } from '@/app/components/atoms/Card';
import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title: string;
};

export const TitleCard: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => (
  <Card
    className={css({
      p: 'lg',
    })}
  >
    <div
      className={css({
        textAlign: 'center',
        mb: '6',
      })}
    >
      <Typography
        variant="headlineS"
        display="inline"
        className={css({
          p: '1',
          borderStyle: 'solid',
          borderBottomWidth: '2px',
          borderColor: 'primary.main',
        })}
      >
        {title}
      </Typography>
    </div>
    {children}
  </Card>
);
