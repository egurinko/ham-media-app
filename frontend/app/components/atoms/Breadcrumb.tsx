import Link from 'next/link';
import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  href?: string;
  text: string;
};

export const Breadcrumb: FC<Props> = ({ href, text }) =>
  href ? (
    <Link href={href}>
      <Typography
        bold={false}
        variant="body1"
        className={css({ textDecorationLine: 'underline' })}
      >
        {text}
      </Typography>
    </Link>
  ) : (
    <Typography bold={true} variant="body1">
      {text}
    </Typography>
  );
