import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MutationResult, useQuery } from '@apollo/client';
import { Mutation } from '@apollo/client/react/components';
import { createSession } from '@/api/public_api/createSession';
import type { CreateSession } from '@/api/public_api/__generated__/CreateSession';
import { getSession } from '@/api/internal_api/getSession';
import type { GetSession } from '@/api/internal_api/__generated__/GetSession';
import { publicApiClient } from '@/utils/apollo';
import { setCookie } from '@/utils/cookies';
import Layout from '@/components/admin/Layout';
import ClientOnly from '@/components/ClientOnly';

const LoginMutation: React.VFC<{}> = () => {
  return (
    <ClientOnly>
      <Mutation client={publicApiClient} mutation={createSession}>
        {(login, result: MutationResult<CreateSession>) => (
          <Login login={login} result={result} />
        )}
      </Mutation>
    </ClientOnly>
  );
};

type OwnProps = {
  login: any;
  result: MutationResult<CreateSession>;
};

const Login: React.VFC<OwnProps> = ({ login, result }) => {
  const { data } = useQuery<GetSession>(getSession);
  const router = useRouter();

  if (data?.session.token) {
    setCookie(data.session.token);
    router.push('/admin/internal_users');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (result.data) {
      setCookie(result.data.createSession.token);
    }
  }, [result.data, result.error]);

  return (
    <Layout>
      <Box
        p="2"
        d="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box m="12">
          <Image
            src="/ham_media_logo.png"
            alt="ハムメディアロゴ"
            width={250}
            height={55}
          />
        </Box>
        <Box
          bgColor="white"
          shadow="md"
          borderWidth="1px"
          maxWidth="400px"
          width="full"
          p="6"
        >
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
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginMutation;
