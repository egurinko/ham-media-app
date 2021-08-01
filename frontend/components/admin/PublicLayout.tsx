import BaseLayout from './BaseLayout';

type Props = {
  title?: string;
};

const PublicLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <BaseLayout title={title}>
    <main>{children}</main>
  </BaseLayout>
);

export default PublicLayout;
