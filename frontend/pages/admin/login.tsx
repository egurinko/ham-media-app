import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Card from '@/components/base/Card';
import { useInternalGetSessionQuery } from '@/api/internal_api/types';
import { usePublicCreateSessionMutation } from '@/api/public_api/types';
import { setCookie } from '@/utils/cookies';
import PublicLayout from '@/components/admin/PublicLayout';
import ClientOnly from '@/components/ClientOnly';
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
  const [login, { data: loginData, error: loginError }] =
    usePublicCreateSessionMutation();
  const router = useRouter();

  if (data?.session.token) {
    setCookie(data.session.token);
    goAdminInternalUsers(router);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loginData) {
      setCookie(loginData.createSession.token);
      goAdminInternalUsers(router);
    }
  }, [loginData, loginError]);

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
        {loginData ? (
          <Alert my="4" status="success">
            <AlertIcon />
            ログインに成功しました。
          </Alert>
        ) : loginError ? (
          <Alert my="4" status="error">
            <AlertIcon />
            {loginError.message}
          </Alert>
        ) : null}
        <Card>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              login({ variables: { email, password } });
            }}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  autoComplete="current-password"
                  autoCapitalize="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Box d="grid" justifyContent="center">
              <Button
                size="lg"
                mt="16"
                variant="solid"
                bgColor="primary.main"
                color="white"
                type="submit"
              >
                ログイン
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </PublicLayout>
  );
};

export default LoginMutation;
