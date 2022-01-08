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
import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { useCallback, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import {
  useInternalGetInternalUsersQuery,
  useInternalDeleteInternalUserMutation,
} from '@/api/internal_api/types';
import type { InternalGetInternalUsersQuery } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminInternalUserEdit } from '@/utils/routes';
import { scrollTo } from '@/utils/scroll';

const InternalUserStacks: React.VFC<NoProps> = () => {
  const { data, loading, error, fetchMore } = useInternalGetInternalUsersQuery({
    fetchPolicy: 'network-only',
  });
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInternalUser, setSelectedInternalUser] = useState<
    null | InternalGetInternalUsersQuery['internalUsers'][number]
  >(null);
  const [
    remove,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useInternalDeleteInternalUserMutation();

  const handleClick = useCallback(
    (id: BigInt) => goAdminInternalUserEdit(router, { id }),
    [router]
  );

  const handleDelete = useCallback(async () => {
    await remove({ variables: { id: selectedInternalUser!.id } });
    onClose();
    scrollTo();
    await fetchMore({});
  }, [remove, selectedInternalUser, onClose, fetchMore]);

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
          {data?.internalUsers.map((internalUser) => (
            <Fragment key={internalUser.email}>
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
                onClick={() => handleClick(internalUser.id)}
              >
                <Box mr="4" fill="primary.main">
                  <UserProfileIcon width={35} height={35} />
                </Box>
                <Box flex="1">
                  <Box display="flex" alignItems="center">
                    <Text fontSize="xl" fontWeight="bold">
                      {internalUser.name}
                    </Text>
                    <Box p="0" ml="2">
                      {internalUser.role.name === 'admin' ? (
                        <StarIcon color="primary.main" />
                      ) : null}
                    </Box>
                  </Box>
                  <Text fontSize="md">{internalUser.email}</Text>
                </Box>
                <Box>
                  <IconButton
                    aria-label="delete user"
                    icon={<DeleteIcon />}
                    color="gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInternalUser(internalUser);
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
          <ModalHeader>ユーザの削除</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedInternalUser?.name}を削除しますか？</ModalBody>
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

export { InternalUserStacks };
