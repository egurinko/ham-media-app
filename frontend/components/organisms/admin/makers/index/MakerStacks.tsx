import {
  Text,
  Skeleton,
  Box,
  VStack,
  Divider,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useCallback, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import {
  useInternalGetMakersQuery,
  useInternalDeleteMakerMutation,
} from '@/api/internal_api/types';
import type { InternalGetMakersQuery } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminMakersEdit } from '@/utils/routes';

const MakerStacks: React.VFC<NoProps> = () => {
  const { data, loading, error } = useInternalGetMakersQuery();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMaker, setSelectedMaker] = useState<
    null | InternalGetMakersQuery['makers'][number]
  >(null);
  const [
    remove,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useInternalDeleteMakerMutation({
    update(cache) {
      cache.modify({
        fields: {
          makers(_ = [], { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const handleMakerClick = useCallback(
    (id: number) => {
      goAdminMakersEdit(router, { id });
    },
    [router]
  );

  const handleDelete = useCallback(() => {
    console.log({ selectedMaker });
    if (selectedMaker) {
      remove({ variables: { id: selectedMaker.id } });
      onClose();
    }
  }, [remove, selectedMaker, onClose]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          {mutationData ? (
            <FlashMessage message="削除に成功しました" status="success" />
          ) : mutationError ? (
            <FlashMessage message={mutationError.message} status="error" />
          ) : null}
          <Divider />
          {data?.makers.map((maker) => (
            <Fragment key={maker.id}>
              <Box
                w="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                _hover={{
                  background: 'background.hover',
                  color: 'primary.main',
                  cursor: 'pointer',
                }}
                p="2"
                onClick={() => handleMakerClick(maker.id)}
              >
                <Box flex="1">
                  <Text fontSize="xl" fontWeight="bold">
                    {maker.name}
                  </Text>
                </Box>
                <Box>
                  <IconButton
                    aria-label="delete user"
                    icon={<DeleteIcon />}
                    color="gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMaker(maker);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
              <Divider />
            </Fragment>
          ))}
        </VStack>
      </Skeleton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メーカーの削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedMaker?.name}を削除しますか？</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              bgColor="primary.main"
              color="white"
              isLoading={mutationLoading}
              onClick={handleDelete}
            >
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { MakerStacks };
