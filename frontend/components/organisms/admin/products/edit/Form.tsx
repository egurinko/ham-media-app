import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useForm, Controller } from 'react-hook-form';
import {
  useInternalUpdateProductMutation,
  useInternalGetMakersQuery,
  useInternalGetProductQuery,
} from '@/api/internal_api/types';
import type { InternalUpdateProductMutationVariables } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Zoom } from '@/components/atoms/Zoom';
import { ImageIcon } from '@/components/atoms/assets/ImageIcon';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { goAdminProducts } from '@/utils/routes';
import validators from '@/validators/index';
import type { SubmitHandler } from 'react-hook-form';

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
          file: image,
        },
      });
      setTimeout(() => {
        goAdminProducts(router);
      }, 2000);
    } catch (e) {}
  };

  const [image, setImage] = useState<File | null>(null);
  const handleFileChange = (file: File) => {
    setImage(file);
  };

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
                    handleChange={handleFileChange}
                    hoverTitle="ドロップしてください"
                    types={['JPG', 'JPEG', 'PNG', 'GIF']}
                  >
                    <Box
                      sx={{
                        borderColor: 'border.gray',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius: 4,
                        p: 4,
                      }}
                      _hover={{
                        opacity: 0.7,
                        cursor: 'pointer',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'background.gray',
                          p: 4,
                          borderRadius: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ImageIcon width={90} height={70} />
                        <Text fontSize="xl">
                          ファイルを選択するかドロップしてください
                        </Text>
                        <Text fontSize="md">
                          フォーマットはJPG/JPEG/PNG/GIF
                        </Text>
                      </Box>
                    </Box>
                  </FileUploader>
                  <Text mt={2}>
                    {image ? (
                      <>
                        ファイル名: {image.name}
                        <img
                          src={URL.createObjectURL(image)}
                          alt="アップロードするファイル"
                        />
                      </>
                    ) : (
                      'ファイルは選択されていません'
                    )}
                  </Text>
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

export { Form };
