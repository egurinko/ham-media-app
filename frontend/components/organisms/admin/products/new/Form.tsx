import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { FileUploader } from '@/components/molecules/FileUploader';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import {
  useInternalGetMakersQuery,
  useInternalCreateProductMutation,
  useInternalGetProductTagGroupsQuery,
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

interface AutoCompleteItem {
  label: string;
  value: string;
}

const Form: FC<NoProps> = () => {
  const router = useRouter();
  const { data: makerData } = useInternalGetMakersQuery();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [image, setImage] = useState<File | null>(null);
  const [create, { data, loading, error }] = useInternalCreateProductMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    makerId,
    remark,
  }) => {
    trigger();

    const productTagIds = selectedItems.map((productTag) =>
      Number(productTag.value),
    );

    try {
      await create({
        variables: {
          makerId: Number(makerId),
          name,
          remark,
          file: image,
          productTagIds,
        },
      });
      setTimeout(() => {
        goAdminProducts(router);
      }, 2000);
    } catch {}
  };

  const handleFileChange = useCallback((file: File) => {
    setImage(file);
  }, []);

  const { data: productTagGroupData } = useInternalGetProductTagGroupsQuery();
  const [productTags, setProductTags] = useState<AutoCompleteItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<AutoCompleteItem[]>([]);

  useEffect(() => {
    if (productTagGroupData) {
      const tags = productTagGroupData.productTagGroups
        .map((productTagGroup) => productTagGroup.productTags.flat())
        .flat()
        .map((productTag) => ({
          label: productTag.name,
          value: String(productTag.id),
        }));
      setProductTags(tags);
    }
  }, [productTagGroupData]);

  const handleSelectedItemsChange = (selectedItems?: AutoCompleteItem[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <>
      <SuccessMessage data={data} message="登録に成功しました。" />
      <ErrorMessage error={error} />
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

            <FormControl id="image" isRequired>
              <FormLabel>商品画像</FormLabel>
              <FileUploader handleFileChange={handleFileChange} image={image} />
            </FormControl>

            {productTagGroupData ? (
              <FormControl id="productTag">
                <CUIAutoComplete
                  label="タグ"
                  placeholder="タグを選択"
                  items={productTags}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                  disableCreateItem={true}
                />
              </FormControl>
            ) : null}
          </Stack>
          <Box display="grid" justifyContent="center">
            <PrimaryButton
              size="lg"
              mt="16"
              type="submit"
              isLoading={loading}
              disabled={!!errors.name || !!errors.makerId || !!errors.remark}
            >
              新規登録する
            </PrimaryButton>
          </Box>
        </form>
      </Card>
    </>
  );
};

const Memoed = memo(Form);

export { Memoed as Form };
