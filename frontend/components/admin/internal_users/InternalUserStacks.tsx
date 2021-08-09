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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useCallback, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import UserProfile from '../../../assets/user_profile.svg';
import {
  useGetInternalUsersQuery,
  useDeleteInternalUserMutation,
} from '@/api/internal_api/types';
import type { GetInternalUsersQuery } from '@/api/internal_api/types';

const InternalUserStacks: React.VFC<Record<string, never>> = () => {
  const { data, loading, error } = useGetInternalUsersQuery();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInternalUser, setSelectedInternalUser] = useState<
    null | GetInternalUsersQuery['internalUsers'][number]
  >(null);
  const [
    remove,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useDeleteInternalUserMutation({
    update(cache) {
      cache.modify({
        fields: {
          internalUsers(_ = [], { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const handleClick = useCallback(
    (id: bigint) => {
      router.push(`/admin/internal_users/${id}/edit`);
    },
    [router]
  );

  const handleDelete = useCallback(() => {
    remove({ variables: { id: selectedInternalUser!.id } });
    onClose();
  }, [remove, selectedInternalUser, onClose]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          {mutationData ? (
            <Alert my="4" status="success">
              <AlertIcon />
              削除に成功しました
            </Alert>
          ) : mutationError ? (
            <Alert my="4" status="error">
              <AlertIcon />
              {mutationError.message}
            </Alert>
          ) : null}
          <Divider />
          {data?.internalUsers.map((internalUser) => (
            <Fragment key={internalUser.name}>
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
                  <UserProfile width={35} height={35} />
                </Box>
                <Box flex="1">
                  <Text fontSize="xl" fontWeight="bold">
                    {internalUser.name}
                  </Text>
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

export default InternalUserStacks;
