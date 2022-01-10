import {
  Text,
  Box,
  VStack,
  Divider,
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
import { useCallback, useState, Fragment } from 'react';
import {
  useInternalGetMakersQuery,
  useInternalDeleteMakerMutation,
} from '@/api/internal_api/types';
import type { InternalGetMakersQuery } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { Spinner } from '@/components/atoms/Spinner';
import { MakerSummary } from './makersStack/MakerSummary';

type Maker = InternalGetMakersQuery['makers'][number];

const MakersStack: React.VFC<NoProps> = () => {
  const { data, loading, error } = useInternalGetMakersQuery({
    fetchPolicy: 'network-only',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMaker, setSelectedMaker] = useState<null | Maker>(null);
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

  const handleDeleteOpen = useCallback(
    (e: React.MouseEvent, maker: Maker) => {
      e.preventDefault();
      setSelectedMaker(maker);
      onOpen();
    },
    [onOpen, setSelectedMaker]
  );

  const handleDelete = useCallback(() => {
    if (selectedMaker) {
      remove({ variables: { id: selectedMaker.id } });
      onClose();
    }
  }, [remove, selectedMaker, onClose]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <VStack spacing="0" mt="4" alignItems="flex-start">
        {mutationData ? (
          <FlashMessage message="削除に成功しました" status="success" />
        ) : mutationError ? (
          <FlashMessage message={mutationError.message} status="error" />
        ) : null}
        <Divider />
        {data?.makers.map((maker) => (
          <Fragment key={maker.id}>
            <MakerSummary maker={maker} handleDeleteOpen={handleDeleteOpen} />
            <Divider />
          </Fragment>
        ))}
      </VStack>
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

export { MakersStack };
