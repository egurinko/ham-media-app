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
import { useCallback, useState, Fragment } from 'react';
import {
  useInternalGetInternalUsersQuery,
  useInternalDeleteInternalUserMutation,
} from '@/api/internal_api/types';
import type { InternalGetInternalUsersQuery } from '@/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { Spinner } from '@/components/atoms/Spinner';
import { InternalUserSummary } from './internalUsersStack/InternalUserSummary';
import { scrollTo } from '@/utils/scroll';

type InternalUser = InternalGetInternalUsersQuery['internalUsers'][number];

const InternalUsersStack: React.VFC<NoProps> = () => {
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
    try {
      await remove({ variables: { id: selectedInternalUser!.id } });
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
        {mutationData ? (
          <FlashMessage message="削除に成功しました" status="success" />
        ) : mutationError ? (
          <ErrorMessage error={mutationError} />
        ) : null}
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

export { InternalUsersStack };
