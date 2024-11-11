import Link from 'next/link';
import { Button } from '@/app/components/atoms/Button';
import { getCurrentUserRole } from './index.api';
import type { FC } from 'react';

type Props = {
  href: string;
  label: string;
};

export const AuthorizedButton: FC<Props> = async ({ href, label }) => {
  const role = await getCurrentUserRole({});
  const isAdmin = role.name === 'admin';

  return (
    <Link href={href}>
      <Button visual="tonal" disabled={!isAdmin}>
        {label}
      </Button>
    </Link>
  );
};
