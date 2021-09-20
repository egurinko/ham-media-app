import { useRouter } from 'next/router';
import OrganismNavigation from '@/components/organisms/admin/Navigation';

type Props = Record<string, never>;

const Navigation: React.VFC<Props> = () => {
  const router = useRouter();

  return (
    <OrganismNavigation
      isAdminInternalUsersPath={router.pathname.includes(
        'admin/internal_users'
      )}
      isAdminHospitalsPath={router.pathname.includes('admin/hospitals')}
    />
  );
};

export default Navigation;
