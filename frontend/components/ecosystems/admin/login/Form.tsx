import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import OrganismForm, {
  FormInput,
} from '@/components/organisms/admin/login/Form';
import { usePublicCreateSessionMutation } from '@/api/public_api/types';
import { setCookie } from '@/utils/cookies';
import { goAdminInternalUsers } from '@/utils/routes';

const Form: React.VFC<Record<string, never>> = () => {
  const router = useRouter();
  const {
    control: RHFControl,
    handleSubmit: RHFHandleSubmit,
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
  }, [loginData, loginError]);

  return (
    <OrganismForm
      isLoginSucceeded={!!loginData}
      isLoginFailure={!!loginError}
      loginErrorMessage={loginError?.message}
      onSubmit={RHFHandleSubmit(onSubmit)}
      control={RHFControl}
      formErrors={RHFErrors}
    />
  );
};

export default Form;
