import { useRouter } from 'next/router';
import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Card } from '@/components/atoms/Card';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import {
  useInternalUpdateProductTagGroupMutation,
  useInternalGetProductTagGroupQuery,
  useLocalReadIsAdminQuery,
} from '@/api/internal_api/types';
import type { InternalUpdateProductTagGroupMutationVariables } from '@/api/internal_api/types';
import { goAdminProductTagGroups } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  name: string;
}

interface Props {
  productTagGroupId: InternalUpdateProductTagGroupMutationVariables['id'];
}

const Form: React.VFC<Props> = ({ productTagGroupId }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
  const { data: productTagGroupData } = useInternalGetProductTagGroupQuery({
    variables: { id: productTagGroupId },
  });
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [update, { data, loading, error }] =
    useInternalUpdateProductTagGroupMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    trigger();

    try {
      await update({
        variables: {
          id: Number(productTagGroupId),
          name,
        },
      });
      setTimeout(() => {
        goAdminProductTagGroups(router);
      }, 2000);
    } catch (e) {}
  };

  return productTagGroupData ? (
    <>
      {data ? (
        <FlashMessage message="更新に成功しました" status="success" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>タグカテゴリー名</FormLabel>
              <Controller
                name="name"
                control={control}
                defaultValue={productTagGroupData.productTagGroup.name}
                rules={validators.productName.rules}
                render={({ field }) => (
                  <Input type="text" isInvalid={!!errors.name} {...field} />
                )}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <Box d="grid" justifyContent="center">
            <PrimaryButton
              size="lg"
              mt="6"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name || !isAdminData?.readIsAdmin.isAdmin}
            >
              更新する
            </PrimaryButton>
          </Box>
        </form>
      </Card>
    </>
  ) : null;
};

export { Form };
