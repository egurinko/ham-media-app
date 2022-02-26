import { useRouter } from 'next/router';
import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Card } from '@/components/atoms/Card';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import {
  useInternalGetMakersQuery,
  useInternalCreateProductMutation,
  useInternalGetProductTagGroupsQuery,
} from '@/api/internal_api/types';
import { goAdminProducts } from '@/utils/routes';
import validators from '@/validators/index';
import { useEffect, useState } from 'react';

interface FormInput {
  makerId: string;
  name: string;
  remark: string;
}

interface AutoCompleteItem {
  label: string;
  value: string;
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
  const [image, setImage] = useState<File | null>(null);
  const [create, { data, loading, error }] = useInternalCreateProductMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    makerId,
    remark,
  }) => {
    trigger();

    const productTagIds = selectedItems.map((productTag) =>
      Number(productTag.value)
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
    } catch (e) {}
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

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
      {error ? <ErrorMessage error={error} /> : null}
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
              <input
                name="image"
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                required
              />
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
          <Box d="grid" justifyContent="center">
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

export { Form };
