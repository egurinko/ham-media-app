import { useRouter } from 'next/router';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import {
  useInternalUpdateInternalUserMutation,
  useInternalGetInternalUserQuery,
  useInternalGetRolesQuery,
} from '@/api/internal_api/types';
import type { InternalGetInternalUserQuery } from '@/api/internal_api/types';
import { goAdminInternalUsers } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

interface Props {
  internalUserId: InternalGetInternalUserQuery['internalUser']['id'];
}

const Form: React.VFC<Props> = ({ internalUserId }) => {
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

  return internalUserError ? (
    <FlashMessage message={internalUserError.message} status="error" />
  ) : internalUser ? (
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
  ) : null;
};

export { Form };
