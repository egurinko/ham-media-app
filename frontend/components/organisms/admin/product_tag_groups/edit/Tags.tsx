import { DeleteIcon, SmallCloseIcon, AddIcon } from '@chakra-ui/icons';
import {
  Text,
  VStack,
  Divider,
  Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from '@chakra-ui/react';
import { Fragment, useEffect, useState, useCallback, memo } from 'react';
import {
  useInternalDeleteProductTagMutation,
  useInternalGetProductTagGroupQuery,
  useInternalCreateProductTagsMutation,
  useInternalUpdateProductTagMutation,
} from '@/services/api/internal_api/types';
import type {
  InternalUpdateProductTagGroupMutationVariables,
  InternalGetProductTagGroupQuery,
} from '@/services/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { FC } from 'react';

interface Props {
  productTagGroupId: InternalUpdateProductTagGroupMutationVariables['id'];
}

type AddingTag = {
  name: string;
};
const addingTagInitialState: AddingTag = {
  name: '',
};

type ProductTag =
  InternalGetProductTagGroupQuery['productTagGroup']['productTags'][number];

const Tags: FC<Props> = ({ productTagGroupId }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
  const [addingTags, setAddingTags] = useState([addingTagInitialState]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProductTag, setSelectedProductTag] =
    useState<null | ProductTag>(null);
  const { data, error, loading, fetchMore } =
    useInternalGetProductTagGroupQuery({
      variables: { id: productTagGroupId },
      fetchPolicy: 'network-only',
    });
  const [
    deleteProductTag,
    {
      data: deleteProductTagData,
      loading: deleteProductTagLoading,
      error: deleteProductTagError,
    },
  ] = useInternalDeleteProductTagMutation();
  const [
    createProductTags,
    {
      data: createProductTagsData,
      error: createProductTagsError,
      loading: createProductTagsLoading,
    },
  ] = useInternalCreateProductTagsMutation();

  const handleOpenDelete = (productTag: ProductTag) => {
    setSelectedProductTag(productTag);
    onOpen();
  };

  const handleDelete = async () => {
    if (selectedProductTag) {
      try {
        onClose();
        await deleteProductTag({ variables: { id: selectedProductTag.id } });
        await fetchMore({ variables: { id: productTagGroupId } });
      } catch {}
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newAddingTags = addingTags.map((addingTag, addingTagIndex) => {
      if (index === addingTagIndex) {
        return { ...addingTag, name };
      }
      return addingTag;
    });
    setAddingTags(newAddingTags);
  };

  const handleAddingTagsDelete = (index: number) => {
    const newAddingTags = addingTags.filter(
      (_, addingTagIndex) => addingTagIndex !== index
    );
    setAddingTags(newAddingTags);
  };

  const handleAddingTagsAdd = () => {
    setAddingTags([...addingTags, addingTagInitialState]);
  };

  const handleAddTags = async () => {
    try {
      await createProductTags({
        variables: { productTagGroupId, productTags: addingTags },
      });
      await fetchMore({ variables: { id: productTagGroupId } });
      setAddingTags([addingTagInitialState]);
    } catch {}
  };

  const [productTags, setProductTags] = useState<ProductTag[]>([]);
  const [
    updateProductTag,
    { data: updateProductTagData, error: updateProductTagError },
  ] = useInternalUpdateProductTagMutation();
  useEffect(() => {
    if (data) {
      setProductTags(data.productTagGroup.productTags);
    }
  }, [data]);
  const handleProductTagNameChange = useCallback(
    (newTagName: string, updateProductTagId: number) => {
      const newTagNames = productTags.map((productTag) => {
        if (updateProductTagId === productTag.id) {
          return { ...productTag, name: newTagName };
        }
        return productTag;
      });
      setProductTags(newTagNames);
    },
    [productTags]
  );
  const handleUpdateProductTag = useCallback(
    async (productTag: ProductTag) => {
      try {
        updateProductTag({
          variables: { id: productTag.id, name: productTag.name },
        });
        await fetchMore({ variables: { id: productTagGroupId } });
      } catch {}
    },
    [updateProductTag, fetchMore, productTagGroupId]
  );

  return (
    <>
      <Card>
        <Spinner size="lg" loading={loading} />
        <ErrorMessage error={error} />
        <>
          <Text mb="2" fontSize="lg" fontWeight="bold">
            タグ情報
          </Text>
          <SuccessMessage
            data={deleteProductTagData}
            message="タグの削除に成功しました。"
          />
          <ErrorMessage error={deleteProductTagError} />
          <SuccessMessage
            data={updateProductTagData}
            message="タグの更新に成功しました。"
          />
          <ErrorMessage error={updateProductTagError} />
          <VStack spacing="0" mt="4" alignItems="flex-start">
            <Divider />
            {productTags.map((productTag) => (
              <Fragment key={productTag.id}>
                <Box
                  w="100%"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  p="2"
                >
                  <Box
                    flex="1"
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                  >
                    <Input
                      value={productTag.name}
                      onChange={(e) =>
                        handleProductTagNameChange(
                          e.target.value,
                          productTag.id
                        )
                      }
                    />
                    <Button
                      ml="2"
                      onClick={() => handleUpdateProductTag(productTag)}
                      disabled={!isAdminData?.readIsAdmin.isAdmin}
                    >
                      更新する
                    </Button>
                  </Box>
                  <Box
                    ml="2"
                    _hover={{
                      background: 'background.hover',
                      cursor: 'pointer',
                    }}
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="delete"
                      onClick={() => handleOpenDelete(productTag)}
                      disabled={!isAdminData?.readIsAdmin.isAdmin}
                    />
                  </Box>
                </Box>
                <Divider />
              </Fragment>
            ))}
          </VStack>
        </>
        <>
          <Text mb="2" mt="8" fontSize="lg" fontWeight="bold">
            タグ追加
          </Text>
          <SuccessMessage
            data={createProductTagsData}
            message="タグの追加に成功しました。"
          />
          {createProductTagsError ? (
            <ErrorMessage error={createProductTagsError} />
          ) : null}
          <Box>
            <Text fontSize="sm">タグ名</Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTags();
              }}
            >
              {addingTags.map((addingTag, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  mb="2"
                >
                  <Input
                    type="text"
                    required
                    value={addingTag.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    mr="2"
                  />
                  <IconButton
                    onClick={() => handleAddingTagsDelete(index)}
                    disabled={index === 0}
                    icon={<SmallCloseIcon color="black" />}
                    aria-label="delete"
                    ml="2"
                    textAlign="center"
                    size="xs"
                    borderRadius="50%"
                  />
                </Box>
              ))}
              <Box textAlign="center" mb="6">
                <IconButton
                  onClick={handleAddingTagsAdd}
                  bgColor="primary.light"
                  icon={<AddIcon color="primary.main" />}
                  aria-label="add"
                  ml="2"
                  textAlign="center"
                  borderRadius="50%"
                />
              </Box>
              <Box textAlign="center">
                <PrimaryButton
                  type="submit"
                  aria-label="add"
                  leftIcon={<AddIcon />}
                  isLoading={createProductTagsLoading}
                  disabled={!isAdminData?.readIsAdmin.isAdmin}
                >
                  タグ追加
                </PrimaryButton>
              </Box>
            </form>
          </Box>
        </>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タグの削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedProductTag?.name}を削除しますか？</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <PrimaryButton
              isLoading={deleteProductTagLoading}
              onClick={handleDelete}
            >
              削除する
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Memoed = memo(Tags);

export { Memoed as Tags };
