import { ClientOnly } from '@/components/organisms/ClientOnly';
import { BaseLayout } from './BaseLayout';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title?: string;
};

const PublicLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <BaseLayout title={title}>
    <ClientOnly>
      <main>{children}</main>
    </ClientOnly>
  </BaseLayout>
);

export { PublicLayout };
