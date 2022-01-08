import Link from 'next/link';
import { SummaryRow } from './SummaryRow';

type Props = {
  url: string;
};

const SummaryLink: React.FC<Props> = ({ url, children }) => (
  <SummaryRow>
    <Link href={url}>
      <a>{children}</a>
    </Link>
  </SummaryRow>
);

export { SummaryLink };
