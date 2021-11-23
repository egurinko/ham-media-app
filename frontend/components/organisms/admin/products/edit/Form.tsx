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
  useInternalUpdateProductMutation,
  useInternalGetMakersQuery,
  useInternalGetProductQuery,
} from '@/api/internal_api/types';
import type { InternalUpdateProductMutationVariables } from '@/api/internal_api/types';
import { goAdminProducts } from '@/utils/routes';
import validators from '@/validators/index';

interface FormInput {
  makerId: string;
  name: string;
  remark: string;
}

interface Props {
  productId: InternalUpdateProductMutationVariables['id'];
}

const Form: React.VFC<Props> = ({ productId }) => {
  const { data: makerData, error: makerError } = useInternalGetMakersQuery();
  const { data: productData } = useInternalGetProductQuery({
    variables: { id: productId },
  });
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [update, { data, loading, error }] = useInternalUpdateProductMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    makerId,
    remark,
  }) => {
    trigger();

    try {
      await update({
        variables: {
          id: Number(productId),
          makerId: Number(makerId),
          name,
          remark,
        },
      });
      setTimeout(() => {
        goAdminProducts(router);
      }, 2000);
    } catch (e) {}
  };

  return makerError ? (
    <FlashMessage message={makerError.message} status="error" />
  ) : productData ? (
    <>
      {data ? (
        <FlashMessage message="更新に成功しました" status="success" />
      ) : error ? (
        <FlashMessage message={error.message} status="error" />
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {makerData ? (
              <FormControl id="makerId" isRequired isInvalid={!!errors.makerId}>
                <FormLabel>メーカー</FormLabel>
                <Controller
                  name="makerId"
                  control={control}
                  defaultValue={String(productData.product.maker.id)}
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
                defaultValue={productData.product.name}
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
                defaultValue={productData.product.remark}
                control={control}
                render={({ field }) => (
                  <Input type="text" isInvalid={!!errors.remark} {...field} />
                )}
              />
              {errors.remark && (
                <FormErrorMessage>{errors.remark.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="image">
              <FormLabel>商品画像</FormLabel>
              <Box w="32" h="32" objectFit="contain">
                <img
                  src={productData.product.url}
                  alt={productData.product.name}
                />
              </Box>
            </FormControl>
          </Stack>
          <Box d="grid" justifyContent="center">
            <Button
              size="lg"
              mt="6"
              variant="solid"
              bgColor="primary.main"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name || !!errors.makerId || !!errors.remark}
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
