import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import {
  useInternalCreateInternalUserMutation,
  useInternalGetRolesQuery,
} from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  name: string;
  email: string;
  password: string;
  discordUserId: string;
  roleId: string;
}

const Form: React.VFC<NoProps> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const { data: rolesData } = useInternalGetRolesQuery();
  const adminRole = rolesData?.roles.find((role) => role.name === 'admin');
  const [create, { data, loading, error }] =
    useInternalCreateInternalUserMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    email,
    password,
    discordUserId,
    roleId,
  }) => {
    trigger();

    try {
      await create({
        variables: {
          name,
          email,
          password,
          roleId: Number(roleId),
          discord_user_id: discordUserId,
        },
      });
      setTimeout(() => {
        goAdminInternalUsers(router);
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      <SuccessMessage message="登録に成功しました。" data={data} />
      <ErrorMessage error={error} />
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
            <FormControl
              id="discordUserId"
              isRequired
              isInvalid={!!errors.discordUserId}
            >
              <FormLabel>discord user id</FormLabel>
              <Controller
                name="discordUserId"
                control={control}
                rules={validators.discordUserId.rules}
                render={({ field }) => (
                  <Input
                    type="text"
                    isInvalid={!!errors.discordUserId}
                    {...field}
                  />
                )}
              />
              <FormHelperText>
                通知のメンションに必要です。18桁の数字が有効です
              </FormHelperText>
              {errors.discordUserId && (
                <FormErrorMessage>
                  {errors.discordUserId.message}
                </FormErrorMessage>
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
            {adminRole ? (
              <FormControl id="roleId" isRequired isInvalid={!!errors.roleId}>
                <FormLabel>ロール</FormLabel>
                <Controller
                  name="roleId"
                  defaultValue={String(adminRole.id)}
                  control={control}
                  rules={{ required: 'ロールを入力してください' }}
                  render={({ field }) => (
                    <Select isInvalid={!!errors.roleId} {...field}>
                      {rolesData?.roles.map((role) => (
                        <option key={String(role.id)} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.roleId && (
                  <FormErrorMessage>{errors.roleId.message}</FormErrorMessage>
                )}
              </FormControl>
            ) : null}
          </Stack>
          <Box display="grid" justifyContent="center">
            <PrimaryButton
              size="lg"
              mt="16"
              type="submit"
              isLoading={loading}
              disabled={
                !!errors.name ||
                !!errors.email ||
                !!errors.password ||
                !!errors.discordUserId
              }
            >
              新規登録する
            </PrimaryButton>
          </Box>
        </form>
      </Card>
    </>
  );
};

export { Form };
