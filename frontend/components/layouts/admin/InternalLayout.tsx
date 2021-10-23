import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery, Fade, HStack, Box } from '@chakra-ui/react';
import BaseLayout from './BaseLayout';
import Sidebar from '@/components/organisms/admin/Sidebar';
import Header from '@/components/ecosystems/admin/Header';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import { useInternalGetSessionQuery } from '@/api/internal_api/types';
import { goAdminLogin } from '@/utils/routes';
import { removeCookie } from '@/utils/cookies';

type Props = {
  title?: string;
};

const PublicLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => {
  const [isMobile] = useMediaQuery('(max-width: 30em)');
  const router = useRouter();
  const { data, error } = useInternalGetSessionQuery();
  const internalUser = data?.session.internalUser;

  const handleLogout = useCallback(() => {
    removeCookie();
    goAdminLogin(router);
  }, [router]);

  useEffect(() => {
    if (error) {
      handleLogout();
    }
  }, [error, handleLogout]);

  return (
    <ClientOnly>
      {internalUser ? (
        <BaseLayout title={title}>
          {isMobile ? (
            <Header internalUser={internalUser} handleLogout={handleLogout} />
          ) : null}
          <HStack
            minH="100vh"
            pt={[16, 0]}
            spacing="0"
            justify="flex-start"
            align="flex-start"
          >
            {isMobile ? null : (
              <Sidebar
                internalUser={internalUser}
                handleLogout={handleLogout}
              />
            )}
            <Box w="100%" pl={[0, 250]}>
              <Fade in={true}>
                <Box as="main" p={[4, 16]}>
                  {children}
                </Box>
              </Fade>
            </Box>
          </HStack>
        </BaseLayout>
      ) : null}
    </ClientOnly>
  );
};

export default PublicLayout;
