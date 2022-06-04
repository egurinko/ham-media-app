import Link from 'next/link';
import { memo } from 'react';
import { SummaryRow } from './SummaryRow';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  url: string;
};

const SummaryLink: FC<PropsWithChildren<Props>> = ({ url, children }) => (
  <SummaryRow>
    <Link href={url}>
      <a target="_blank" rel="noreferrer">
        {children}
      </a>
    </Link>
  </SummaryRow>
);

const Memoed = memo(SummaryLink);

export { Memoed as SummaryLink };
