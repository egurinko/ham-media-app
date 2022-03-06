import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { usePublicCreateSessionMutation } from '@/api/public_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { setCookie } from '@/utils/cookies';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';
import type { SubmitHandler } from 'react-hook-form';

export interface FormInput {
  email: string;
  password: string;
}

const Form: React.VFC<NoProps> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors: RHFErrors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [login, { data: loginData, error: loginError }] =
    usePublicCreateSessionMutation();

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
  }, [loginData, loginError, router]);

  return (
    <>
      <SuccessMessage data={loginData} message="ログインに成功しました。" />
      {loginError ? (
        <FlashMessage
          message="メールアドレスかパスワードが間違っています。"
          status="error"
        />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired isInvalid={!!RHFErrors.email}>
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
                    isInvalid={!!RHFErrors.email}
                    {...field}
                  />
                )}
              />
              {RHFErrors.email && (
                <FormErrorMessage>{RHFErrors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={!!RHFErrors.password}
            >
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
                    isInvalid={!!RHFErrors.password}
                    {...field}
                  />
                )}
              />
              {RHFErrors.password && (
                <FormErrorMessage>
                  {RHFErrors.password.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <Box d="grid" justifyContent="center">
            <PrimaryButton size="lg" mt="16" type="submit">
              ログイン
            </PrimaryButton>
          </Box>
        </form>
      </Card>
    </>
  );
};

export { Form };
