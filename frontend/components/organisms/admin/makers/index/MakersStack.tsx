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
import { useCallback, useState, Fragment, memo } from 'react';
import {
  useInternalGetMakersQuery,
  useInternalDeleteMakerMutation,
} from '@/services/api/internal_api/types';
import type { InternalGetMakersQuery } from '@/services/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { MakerSummary } from './makersStack/MakerSummary';
import type { FC } from 'react';

type Maker = InternalGetMakersQuery['makers'][number];

const MakersStack: FC<NoProps> = () => {
  const { data, loading, error, fetchMore } = useInternalGetMakersQuery({
    fetchPolicy: 'network-only',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMaker, setSelectedMaker] = useState<null | Maker>(null);
  const [
    remove,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useInternalDeleteMakerMutation({});

  const handleDeleteOpen = useCallback(
    (e: React.MouseEvent, maker: Maker) => {
      e.preventDefault();
      setSelectedMaker(maker);
      onOpen();
    },
    [onOpen, setSelectedMaker]
  );

  const handleDelete = useCallback(async () => {
    if (selectedMaker) {
      try {
        await remove({ variables: { id: selectedMaker.id } });
        await fetchMore({});
      } catch {}
      onClose();
    }
  }, [remove, selectedMaker, onClose, fetchMore]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <VStack spacing="0" mt="4" alignItems="flex-start">
        <SuccessMessage data={mutationData} message="削除に成功しました" />
        <ErrorMessage error={mutationError} />
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
            <PrimaryButton isLoading={mutationLoading} onClick={handleDelete}>
              削除する
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Memoed = memo(MakersStack);

export { Memoed as MakersStack };
