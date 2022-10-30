import {
  Text,
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
  Box,
} from '@chakra-ui/react';
import { useCallback, useState, Fragment, memo } from 'react';
import {
  useInternalGetInternalUsersQuery,
  useInternalDeleteInternalUserMutation,
} from '@/services/api/internal_api/types';
import type { InternalGetInternalUsersQuery } from '@/services/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { scrollTo } from '@/utils/scroll';
import { InternalUserSummary } from './internalUsersStack/InternalUserSummary';
import type { FC } from 'react';

type InternalUser = InternalGetInternalUsersQuery['internalUsers'][number];

const InternalUsersStack: FC<NoProps> = () => {
  const { data, loading, error, fetchMore } = useInternalGetInternalUsersQuery({
    fetchPolicy: 'network-only',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInternalUser, setSelectedInternalUser] =
    useState<null | InternalUser>(null);
  const [
    remove,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useInternalDeleteInternalUserMutation();

  const handleDeleteOpen = useCallback(
    (e: React.MouseEvent, internalUser: InternalUser) => {
      e.preventDefault();
      setSelectedInternalUser(internalUser);
      onOpen();
    },
    [setSelectedInternalUser, onOpen]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedInternalUser) return;
    try {
      await remove({ variables: { id: selectedInternalUser.id } });
      await fetchMore({});
    } catch {}
    onClose();
    scrollTo();
  }, [remove, selectedInternalUser, onClose, fetchMore]);

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
        {data?.internalUsers.map((internalUser) => (
          <Fragment key={internalUser.email}>
            <InternalUserSummary
              handleDeleteOpen={handleDeleteOpen}
              internalUser={internalUser}
            />
            <Divider />
          </Fragment>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザの削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedInternalUser?.name}を削除しますか？</ModalBody>
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

const Memoed = memo(InternalUsersStack);

export { Memoed as InternalUsersStack };
