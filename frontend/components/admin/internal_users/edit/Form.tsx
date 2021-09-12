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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Card from '@/components/base/Card';
import FlashMessage from '@/components/base/FlashMessage';
import { useInternalUpdateInternalUserMutation } from '@/api/internal_api/types';
import type { InternalGetInternalUserQuery } from '@/api/internal_api/types';
import { goAdminInternalUsers } from '@/utils/routes';

interface FormInput {
  name: string;
  email: string;
  password: string;
}

interface Props {
  internalUser: InternalGetInternalUserQuery['internalUser'];
}

const Edit: React.VFC<Props> = ({ internalUser }) => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [update, { data, loading, error }] =
    useInternalUpdateInternalUserMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    email,
    password,
  }) => {
    trigger();

    try {
      await update({
        variables: { id: internalUser.id, name, email, password },
      });
      setTimeout(() => {
        goAdminInternalUsers(router);
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      {data ? (
        <FlashMessage message="更新に成功しました" status="success" />
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
              更新する
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
};

export default Edit;
