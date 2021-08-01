import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  Heading,
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import InternalLayout from '@/components/admin/InternalLayout';
import Card from '@/components/base/Card';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import type { GetInternalUsers } from '@/api/internal_api/__generated__/GetInternalUsers';
import { getInternalUser } from '@/api/internal_api/getInternalUser';
import type {
  UpdateInternalUser,
  UpdateInternalUserVariables,
} from '@/api/internal_api/__generated__/UpdateInternalUser';
import { updateInternalUser } from '@/api/internal_api/updateInternalUser';
import type {
  GetInternalUser,
  GetInternalUserVariables,
} from '@/api/internal_api/__generated__/GetInternalUser';
import { internalApiClient } from '@/utils/apollo';

const Edit: React.VFC<Props> = ({ internalUser }) => {
  const [name, setName] = useState(internalUser.name);
  const [email, setEmail] = useState(internalUser.email);
  const [password, setPassword] = useState('');

  const [update, { data, loading }] = useMutation<
    UpdateInternalUser,
    UpdateInternalUserVariables
  >(updateInternalUser);

  return (
    <InternalLayout>
      <Heading mb="4">ユーザ編集</Heading>
      {data ? (
        <>
          <Alert my="4" status="success">
            <AlertIcon />
            更新に成功しました
          </Alert>
        </>
      ) : null}
      <Card>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            update({
              variables: { id: internalUser.id, name, email, password },
            });
          }}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>ユーザ名</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
            <FormControl id="password">
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
              isLoading={loading}
            >
              更新
            </Button>
          </Box>
        </form>
      </Card>
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  internalUser: GetInternalUser['internalUser'];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await internalApiClient.query<GetInternalUsers>({
    query: getInternalUsers,
  });

  const paths = data.internalUsers.map((internalUser) => ({
    params: { id: String(internalUser.id) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await internalApiClient.query<
    GetInternalUser,
    GetInternalUserVariables
  >({
    query: getInternalUser,
    variables: {
      id: Number(params!.id),
    },
  });

  return { props: { internalUser: data.internalUser } };
};

export default Edit;
