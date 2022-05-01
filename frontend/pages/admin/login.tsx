import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useInternalGetSessionQuery } from '@/api/internal_api/types';
import { PublicLayout } from '@/components/layouts/admin/PublicLayout';
import { Form } from '@/components/organisms/admin/login/Form';
import { setCookie } from '@/utils/cookies';
import { goAdminProducts } from '@/utils/routes';

const Login: React.VFC<NoProps> = () => {
  const { data } = useInternalGetSessionQuery({ fetchPolicy: 'network-only' });
  const router = useRouter();

  if (data?.session.token) {
    setCookie(data.session.token);
    goAdminProducts(router);
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

export default Login;
