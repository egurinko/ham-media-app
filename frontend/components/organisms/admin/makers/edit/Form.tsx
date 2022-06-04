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
import {
  useInternalUpdateMakerMutation,
  useInternalGetMakerQuery,
} from '@/api/internal_api/types';
import type { InternalUpdateMakerMutation } from '@/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/api/local_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { goAdminMakers } from '@/utils/routes';
import validators from '@/validators/index';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  name: string;
}

interface Props {
  makerId: InternalUpdateMakerMutation['updateMaker']['id'];
}

const Form: FC<Props> = ({ makerId }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
  const { data: makerData, error: makerError } = useInternalGetMakerQuery({
    variables: { id: makerId },
  });
  const maker = makerData?.maker;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [update, { data, loading, error }] = useInternalUpdateMakerMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    if (maker) {
      trigger();

      try {
        await update({
          variables: {
            id: makerId,
            name,
          },
        });
        setTimeout(() => {
          goAdminMakers(router);
        }, 2000);
      } catch (e) {}
    }
  };

  return (
    <>
      <ErrorMessage error={makerError} />
      {maker ? (
        <>
          <SuccessMessage data={data} message="更新に成功しました" />
          <ErrorMessage error={error} />
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired isInvalid={!!errors.name}>
                  <FormLabel>メーカー名</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={maker.name}
                    rules={validators.maker.rules}
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
                  mt="16"
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
      ) : null}
    </>
  );
};

const Memoed = memo(Form);

export { Memoed as Form };
