import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useInternalCreateMakerMutation } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { goAdminMakers } from '@/utils/routes';
import validators from '@/validators/index';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  name: string;
}

const Form: React.VFC<NoProps> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [create, { data, loading, error }] = useInternalCreateMakerMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    trigger();

    try {
      await create({
        variables: { name },
      });
      setTimeout(() => {
        goAdminMakers(router);
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      <SuccessMessage data={data} message="登録に成功しました。" />
      <ErrorMessage error={error} />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>メーカー名</FormLabel>
              <Controller
                name="name"
                control={control}
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
            <PrimaryButton
              size="lg"
              mt="16"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name}
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
