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
  useInternalGetMakersQuery,
  useInternalCreateProductMutation,
} from '@/api/internal_api/types';
import { goAdminProducts } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  makerId: string;
  name: string;
  remark: string;
}

const Form: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: makerData } = useInternalGetMakersQuery();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [create, { data, loading, error }] = useInternalCreateProductMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    makerId,
    remark,
  }) => {
    trigger();

    try {
      await create({
        variables: { makerId: Number(makerId), name, remark },
      });
      setTimeout(() => {
        goAdminProducts(router);
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
            {makerData ? (
              <FormControl id="makerId" isRequired isInvalid={!!errors.makerId}>
                <FormLabel>メーカー</FormLabel>
                <Controller
                  name="makerId"
                  control={control}
                  defaultValue={String(makerData.makers[0].id)}
                  rules={{ required: 'メーカーを選択してください' }}
                  render={({ field }) => (
                    <Select isInvalid={!!errors.makerId} {...field}>
                      {makerData.makers.map((maker) => (
                        <option key={String(maker.id)} value={maker.id}>
                          {maker.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.makerId && (
                  <FormErrorMessage>{errors.makerId.message}</FormErrorMessage>
                )}
              </FormControl>
            ) : null}
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>商品名</FormLabel>
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
            <FormControl id="remark" isInvalid={!!errors.remark}>
              <FormLabel>備考</FormLabel>
              <Controller
                name="remark"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input type="text" isInvalid={!!errors.remark} {...field} />
                )}
              />
              {errors.remark && (
                <FormErrorMessage>{errors.remark.message}</FormErrorMessage>
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
              disabled={!!errors.name || !!errors.makerId || !!errors.remark}
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
