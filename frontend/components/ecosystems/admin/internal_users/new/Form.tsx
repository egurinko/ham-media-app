import { useRouter } from 'next/router';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Card from '@/components/atoms/Card';
import FlashMessage from '@/components/molecules/FlashMessage';
import {
  useInternalCreateInternalUserMutation,
  InternalUserFieldsFragment,
} from '@/api/internal_api/types';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  name: string;
  email: string;
  password: string;
}

const Form: React.VFC<Record<string, never>> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [create, { data, loading, error }] =
    useInternalCreateInternalUserMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    email,
    password,
  }) => {
    trigger();

    try {
      await create({
        variables: { name, email, password },
        update(cache, { data }) {
          cache.modify({
            fields: {
              internalUsers(
                currents: InternalUserFieldsFragment[] = [],
                { readField }
              ) {
                const adding = cache.writeFragment({
                  data: data?.createInternalUser,
                  fragment: gql`
                    fragment NewInternalUser on InternalUser {
                      id
                      name
                      email
                    }
                  `,
                });

                if (
                  currents.some(
                    (ref) =>
                      readField('id', ref) === data?.createInternalUser.id
                  )
                ) {
                  return currents;
                }

                return [...currents, adding];
              },
            },
          });
        },
      });
      setTimeout(() => {
        goAdminInternalUsers(router);
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      {data ? (
        <FlashMessage message="登録に成功しました。" status="success" />
      ) : error ? (
        <FlashMessage message={error.message} status="error" />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>ユーザ名</FormLabel>
              <Controller
                name="name"
                control={control}
                rules={validators.username.rules}
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
                rules={validators.email.rules}
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
                rules={validators.password.rules}
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
    </>
  );
};

export default Form;
