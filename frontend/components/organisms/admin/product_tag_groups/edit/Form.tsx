import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { InternalUpdateProductTagGroupMutationVariables } from '@/services/api/internal_api/types';
import {
  useInternalUpdateProductTagGroupMutation,
  useInternalGetProductTagGroupQuery,
} from '@/services/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { goAdminProductTagGroups } from '@/utils/routes';
import validators from '@/validators/index';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  name: string;
}

interface Props {
  productTagGroupId: InternalUpdateProductTagGroupMutationVariables['id'];
}

const Form: FC<Props> = ({ productTagGroupId }) => {
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
    } catch {}
  };

  return productTagGroupData ? (
    <>
      <SuccessMessage data={data} message="更新に成功しました" />
      <ErrorMessage error={error} />
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
          <Box display="grid" justifyContent="center">
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

const Memoed = memo(Form);

export { Memoed as Form };
