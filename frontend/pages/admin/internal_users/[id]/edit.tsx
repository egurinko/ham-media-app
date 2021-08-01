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
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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

interface FormInput {
  name: string;
  email: string;
  password: string;
}

const Edit: React.VFC<Props> = ({ internalUser }) => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [update, { data, loading }] = useMutation<
    UpdateInternalUser,
    UpdateInternalUserVariables
  >(updateInternalUser);

  const onSubmit: SubmitHandler<FormInput> = ({ name, email, password }) => {
    trigger();
    update({
      variables: { id: internalUser.id, name, email, password },
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>ユーザ名</FormLabel>
              <Controller
                name="name"
                control={control}
                defaultValue={internalUser.name}
                rules={{ required: 'ユーザ名を入力してください' }}
                render={({ field }) => (
                  <Input type="text" isInvalid={!!errors.name} {...field} />
                )}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue={internalUser.email}
                rules={{
                  required: 'メールアドレスを入力してください',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: '有効なメールアドレスを入力してください',
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="email"
                    autoComplete="email"
                    autoCapitalize="off"
                    isInvalid={!!errors.email}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!!errors.password}>
              <FormLabel>パスワード</FormLabel>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 8,
                    message: '8文字以上で入力してください',
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="password"
                    autoComplete="current-password"
                    autoCapitalize="off"
                    isInvalid={!!errors.password}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
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
              disabled={!!errors.name || !!errors.email || !!errors.password}
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
