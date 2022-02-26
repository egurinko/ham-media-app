import { useRouter } from 'next/router';
import {
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import {
  useInternalUpdateMakerMutation,
  useInternalGetMakerQuery,
  useLocalReadIsAdminQuery,
} from '@/api/internal_api/types';
import type { InternalUpdateMakerMutation } from '@/api/internal_api/types';
import { goAdminMakers } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  name: string;
}

interface Props {
  makerId: InternalUpdateMakerMutation['updateMaker']['id'];
}

const Form: React.VFC<Props> = ({ makerId }) => {
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

  return makerError ? (
    <FlashMessage message={makerError.message} status="error" />
  ) : maker ? (
    <>
      {data ? (
        <FlashMessage message="更新に成功しました" status="success" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : null}
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
          <Box d="grid" justifyContent="center">
            <Button
              size="lg"
              mt="16"
              variant="solid"
              bgColor="primary.main"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name || !isAdminData?.readIsAdmin.isAdmin}
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
