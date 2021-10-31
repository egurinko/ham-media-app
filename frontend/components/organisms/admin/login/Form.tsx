import { FormEventHandler } from 'react';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import Card from '@/components/atoms/Card';
import FlashMessage from '@/components/molecules/FlashMessage';
import validators from '@/validators/index';

type Props = {
  isLoginSucceeded: boolean;
  isLoginFailure: boolean;
  loginErrorMessage?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<FormInput>;
  formErrors: FieldErrors<FormInput>;
};

export interface FormInput {
  email: string;
  password: string;
}

const Form: React.VFC<Props> = ({
  isLoginSucceeded,
  isLoginFailure,
  loginErrorMessage,
  onSubmit,
  control,
  formErrors,
}) => (
  <>
    {isLoginSucceeded ? (
      <FlashMessage message="ログインに成功しました。" status="success" />
    ) : isLoginFailure ? (
      <FlashMessage message={loginErrorMessage || ''} status="error" />
    ) : null}
    <Card>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired isInvalid={!!formErrors.email}>
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
                  isInvalid={!!formErrors.email}
                  {...field}
                />
              )}
            />
            {formErrors.email && (
              <FormErrorMessage>{formErrors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={!!formErrors.password}
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
                  isInvalid={!!formErrors.password}
                  {...field}
                />
              )}
            />
            {formErrors.password && (
              <FormErrorMessage>{formErrors.password.message}</FormErrorMessage>
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

export default Form;
