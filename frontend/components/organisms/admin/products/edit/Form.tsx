import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useCallback, memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Zoom } from '@/components/atoms/Zoom';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { FileUploader } from '@/components/molecules/FileUploader';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { InternalUpdateProductMutationVariables } from '@/services/api/internal_api/types';
import {
  useInternalUpdateProductMutation,
  useInternalGetMakersQuery,
  useInternalGetProductQuery,
} from '@/services/api/internal_api/types';
import { goAdminProducts } from '@/utils/routes';
import validators from '@/validators/index';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  makerId: string;
  name: string;
  remark: string;
}

interface Props {
  productId: InternalUpdateProductMutationVariables['id'];
}

const Form: FC<Props> = ({ productId }) => {
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
          file: image,
        },
      });
      setTimeout(() => {
        goAdminProducts(router);
      }, 2000);
    } catch {}
  };

  const [image, setImage] = useState<File | null>(null);
  const handleFileChange = useCallback((file: File) => {
    setImage(file);
  }, []);

  return (
    <>
      <ErrorMessage error={makerError} />
      {productData ? (
        <>
          <SuccessMessage data={data} message="更新に成功しました" />
          <ErrorMessage error={error} />
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {makerData ? (
                  <FormControl
                    id="makerId"
                    isRequired
                    isInvalid={!!errors.makerId}
                  >
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
                      <FormErrorMessage>
                        {errors.makerId.message}
                      </FormErrorMessage>
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
                      <Input
                        type="text"
                        isInvalid={!!errors.remark}
                        {...field}
                      />
                    )}
                  />
                  {errors.remark && (
                    <FormErrorMessage>{errors.remark.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id="image">
                  <FormLabel>商品画像</FormLabel>
                  <Box flexShrink={0} mr="1" mb="2">
                    <Zoom>
                      <img
                        src={productData.product.url}
                        alt={productData.product.name}
                        width="120"
                        height="120"
                        style={{
                          objectFit: 'contain',
                          width: '120px',
                          height: '120px',
                        }}
                      />
                    </Zoom>
                  </Box>
                  <FileUploader
                    handleFileChange={handleFileChange}
                    image={image}
                  />
                </FormControl>
              </Stack>
              <Box display="grid" justifyContent="center">
                <PrimaryButton
                  size="lg"
                  mt="6"
                  type="submit"
                  isLoading={loading}
                  disabled={
                    !!errors.name || !!errors.makerId || !!errors.remark
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
