import { useMediaQuery, Fade, HStack, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { useInternalGetSessionQuery } from '@/services/api/internal_api/types';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { Header } from '@/components/organisms/admin/Header';
import { Sidebar } from '@/components/organisms/admin/Sidebar';
import { removeCookie } from '@/utils/cookies';
import { goAdminLogin } from '@/utils/routes';
import { BaseLayout } from './BaseLayout';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title?: string;
};

const InternalLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
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

export { InternalLayout };
