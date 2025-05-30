import { Header } from '@/app/components/organisms/admin/Header';
import { Sidebar } from '@/app/components/organisms/admin/Sidebar';
import { css } from '@/styled/css';
import { getInternalUserProfile } from './layout.api';

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';
export default async function Layout({ children }: Props) {
  const { data } = await getInternalUserProfile({});

  return (
    <div
      className={css({
        bgColor: 'background.main',
        minH: '100vh',
        color: 'background.on-main',
        display: 'flex',
      })}
    >
      <Header
        internalUserName={data.session.internalUser.name}
        internalUserRoleName={data.session.internalUser.role.name}
      />
      <Sidebar
        internalUserName={data.session.internalUser.name}
        internalUserRoleName={data.session.internalUser.role.name}
      />
      <main
        className={css({
          px: {
            base: 'md',
            sm: 'xl',
          },
          pt: {
            base: '80px',
            sm: 'xl',
          },
          flexGrow: 1,
        })}
      >
        {children}
      </main>
    </div>
  );
}
