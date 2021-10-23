import BaseLayout from './BaseLayout';
import ClientOnly from '@/components/ecosystems/ClientOnly';

type Props = {
  title?: string;
};

const PublicLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <BaseLayout title={title}>
    <ClientOnly>
      <main>{children}</main>
    </ClientOnly>
  </BaseLayout>
);

export default PublicLayout;
