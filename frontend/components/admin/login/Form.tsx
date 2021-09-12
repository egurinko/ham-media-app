import { useEffect } from 'react';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Card from '@/components/base/Card';
import FlashMessage from '@/components/base/FlashMessage';
import { usePublicCreateSessionMutation } from '@/api/public_api/types';
import { setCookie } from '@/utils/cookies';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  email: string;
  password: string;
}

const Form: React.VFC<Record<string, never>> = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [login, { data: loginData, error: loginError }] =
    usePublicCreateSessionMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async ({ email, password }) => {
    trigger();

    try {
      await login({ variables: { email, password } });
    } catch (e) {}
  };

  useEffect(() => {
    if (loginData) {
      setCookie(loginData.createSession.token);
      goAdminInternalUsers(router);
    }
  }, [loginData, loginError]);

  return (
    <>
      {loginData ? (
        <FlashMessage message="ログインに成功しました。" status="success" />
      ) : loginError ? (
        <FlashMessage message={loginError.message} status="error" />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue=""
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
            >
              ログイン
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
};

export default Form;
