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
import { useInternalCreateProductTagGroupMutation } from '@/api/internal_api/types';
import { goAdminProductTagGroups } from '@/utils/routes';
import validators from '@/validators/index';

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
  const [create, { data, loading, error }] =
    useInternalCreateProductTagGroupMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({ name }) => {
    trigger();

    try {
      await create({ variables: { name } });
      setTimeout(() => {
        goAdminProductTagGroups(router);
      }, 2000);
    } catch (e) {}
  };

  return (
    <>
      {data ? (
        <FlashMessage message="登録に成功しました。" status="success" />
      ) : error ? (
        <FlashMessage message={error.message} status="error" />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>タグカテゴリー名</FormLabel>
              <Controller
                name="name"
                control={control}
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
            <Button
              size="lg"
              mt="16"
              variant="solid"
              bgColor="primary.main"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name}
            >
              新規登録する
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
};

export { Form };
