import { useRouter } from 'next/router';
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
import type {
  CreateInternalUser,
  CreateInternalUserVariables,
} from '@/api/internal_api/__generated__/CreateInternalUser';
import { createInternalUser } from '@/api/internal_api/createInternalUser';

interface FormInput {
  name: string;
  email: string;
  password: string;
}

const New: React.VFC<Record<string, never>> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [create, { data, loading, error }] = useMutation<
    CreateInternalUser,
    CreateInternalUserVariables
  >(createInternalUser);

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    email,
    password,
  }) => {
    trigger();

    try {
      await create({
        variables: { name, email, password },
      });
      setTimeout(() => {
        router.push('/admin/internal_users');
      }, 2000);
    } catch (e) {}
  };

  return (
    <InternalLayout>
      <Heading mb="4">ユーザ登録</Heading>
      {data ? (
        <Alert my="4" status="success">
          <AlertIcon />
          登録に成功しました
        </Alert>
      ) : error ? (
        <Alert my="4" status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>ユーザ名</FormLabel>
              <Controller
                name="name"
                control={control}
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
              新規登録する
            </Button>
          </Box>
        </form>
      </Card>
    </InternalLayout>
  );
};

export default New;
