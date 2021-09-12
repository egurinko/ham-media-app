import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useInternalGetSessionQuery } from '@/api/internal_api/types';
import { setCookie } from '@/utils/cookies';
import PublicLayout from '@/components/admin/templates/PublicLayout';
import ClientOnly from '@/components/ClientOnly';
import Form from '@/components/admin/login/Form';
import { goAdminInternalUsers } from '@/utils/routes';

const LoginMutation: React.VFC<{}> = () => {
  return (
    <ClientOnly>
      <Login />
    </ClientOnly>
  );
};

const Login: React.VFC<Record<string, never>> = () => {
  const { data } = useInternalGetSessionQuery();
  const router = useRouter();

  if (data?.session.token) {
    setCookie(data.session.token);
    goAdminInternalUsers(router);
  }

  return (
    <PublicLayout>
      <Box
        p="2"
        d="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxW="400"
        m="auto"
      >
        <Box m="12">
          <Image
            src="/ham_media_logo.png"
            alt="ハムメディアロゴ"
            width={250}
            height={55}
          />
        </Box>
        <Form />
      </Box>
    </PublicLayout>
  );
};

export default LoginMutation;
