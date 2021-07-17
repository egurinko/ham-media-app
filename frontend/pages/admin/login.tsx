import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import Image from 'next/image';
import Layout from '../../components/admin/Layout';

const Login: React.VFC<{}> = () => (
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
        <form>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" autoComplete="email" autoCapitalize="off" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                autoComplete="current-password"
                autoCapitalize="off"
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
            >
              ログイン
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  </Layout>
);

export default Login;
