import Link from 'next/link';
import { memo } from 'react';
import { SummaryRow } from './SummaryRow';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  url: string;
  openNewWindow?: boolean;
};

const SummaryLink: FC<PropsWithChildren<Props>> = ({
  url,
  openNewWindow = true,
  children,
}) => (
  <SummaryRow>
    <Link href={url} target={openNewWindow ? '_blank' : '_self'}>
      {children}
    </Link>
  </SummaryRow>
);

const Memoed = memo(SummaryLink);

export { Memoed as SummaryLink };
