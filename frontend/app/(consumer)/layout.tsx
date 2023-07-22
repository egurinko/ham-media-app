import { Layout as ConsumerLayout } from '@/components/layouts/consumer/Layout';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <ConsumerLayout>{children}</ConsumerLayout>;
}
