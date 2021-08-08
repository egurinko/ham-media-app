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
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import UserProfile from '../../../assets/user_profile.svg';
import { useQuery } from '@apollo/client';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import type { GetInternalUsers } from '@/api/internal_api/__generated__/GetInternalUsers';

const InternalUserStacks: React.VFC<Record<string, never>> = () => {
  const { data, loading, error } = useQuery<GetInternalUsers>(getInternalUsers);
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInternalUser, setSelectedInternalUser] = useState<
    null | GetInternalUsers['internalUsers'][number]
  >(null);

  const handleClick = useCallback(
    (id: number) => {
      router.push(`/admin/internal_users/${id}/edit`);
    },
    [router]
  );

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          <Divider />
          {data?.internalUsers.map((internalUser) => (
            <>
              <Box
                w="100%"
                key={internalUser.name}
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
            </>
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
            <Button bgColor="primary.main" color="white">
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InternalUserStacks;
