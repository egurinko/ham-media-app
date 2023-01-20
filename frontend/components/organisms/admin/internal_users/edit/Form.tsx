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
import { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { FC } from 'react';
import type { InternalGetInternalUserQuery } from '@/services/api/internal_api/types';
import type { SubmitHandler } from 'react-hook-form';
import {
  useInternalUpdateInternalUserMutation,
  useInternalGetInternalUserQuery,
  useInternalGetRolesQuery,
} from '@/services/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  name: string;
  email: string;
  password: string;
  discordUserId: string;
  roleId: string;
}

interface Props {
  internalUserId: InternalGetInternalUserQuery['internalUser']['id'];
}

const Form: FC<Props> = ({ internalUserId }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
  const { data: internalUserData, error: internalUserError } =
    useInternalGetInternalUserQuery({
      variables: { id: internalUserId },
    });
  const internalUser = internalUserData?.internalUser;
  const { data: rolesData } = useInternalGetRolesQuery();
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
    discordUserId,
    roleId,
  }) => {
    if (internalUser) {
      trigger();

      try {
        await update({
          variables: {
            id: internalUser.id,
            name,
            email,
            discord_user_id: discordUserId,
            password,
            roleId: Number(roleId),
          },
        });
        setTimeout(() => {
          goAdminInternalUsers(router);
        }, 2000);
      } catch (e) {}
    }
  };

  return (
    <>
      <ErrorMessage error={internalUserError} />
      {internalUser ? (
        <>
          <SuccessMessage data={data} message="更新に成功しました" />
          <ErrorMessage error={error} />
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired isInvalid={!!errors.name}>
                  <FormLabel>ユーザ名</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={internalUser.name}
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
                    defaultValue={internalUser.email}
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
                    defaultValue={internalUser.discord_user_id}
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
                    通知のメンションに必要です。18~19桁の数字が有効です
                  </FormHelperText>
                  {errors.discordUserId && (
                    <FormErrorMessage>
                      {errors.discordUserId.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={!!errors.password}
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
                        isInvalid={!!errors.password}
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl id="roleId" isRequired isInvalid={!!errors.roleId}>
                  <FormLabel>ロール</FormLabel>
                  <Controller
                    name="roleId"
                    defaultValue={String(internalUser.role.id)}
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
                    !!errors.discordUserId ||
                    !isAdminData?.readIsAdmin.isAdmin
                  }
                >
                  更新する
                </PrimaryButton>
              </Box>
            </form>
          </Card>
        </>
      ) : null}
    </>
  );
};

const Memoed = memo(Form);

export { Memoed as Form };
