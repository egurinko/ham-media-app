import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PublicLayout } from '@/components/layouts/admin/PublicLayout';
import { Form } from '@/components/organisms/admin/login/Form';
import { useInternalGetSessionQuery } from '@/services/api/internal_api/types';
import { setCookie } from '@/utils/cookies';
import { goAdminProducts } from '@/utils/routes';
import type { ReactElement } from 'react';

const Login = () => {
  const { data } = useInternalGetSessionQuery({ fetchPolicy: 'network-only' });
  const router = useRouter();

  if (data?.session.token) {
    setCookie(data.session.token);
    goAdminProducts(router);
  }

  return (
    <Box
      p="2"
      display="flex"
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
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: 150, height: 'auto' }}
          priority={true}
        />
      </Box>
      <Form />
    </Box>
  );
};

Login.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>;

export default Login;
