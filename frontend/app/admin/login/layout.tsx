import { PublicLayout } from '@/app/admin/PublicLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
