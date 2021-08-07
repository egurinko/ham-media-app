import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Skeleton,
  Box,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import UserProfile from '../../../assets/user_profile.svg';
import { useQuery } from '@apollo/client';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import { GetInternalUsers } from '@/api/internal_api/__generated__/GetInternalUsers';

const InternalUserStacks: React.VFC<{}> = () => {
  const { data, loading, error } = useQuery<GetInternalUsers>(getInternalUsers);
  const router = useRouter();

  const handleClick = useCallback(
    (id: number) => {
      router.push(`/admin/internal_users/${id}/edit`);
    },
    [router]
  );

  if (error) return <Text>エラーです</Text>;

  return (
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
            </Box>
            <Divider />
          </>
        ))}
      </VStack>
      {/* <Table>
          <Thead>
            <Tr>
              <Th>
                <Text fontSize="lg">ID</Text>
              </Th>
              <Th>
                <Text fontSize="lg">ユーザ名</Text>
              </Th>
              <Th>
                <Text fontSize="lg">メールアドレス</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.internalUsers.map((internalUser) => (
              <Tr
                key={internalUser.id}
                _hover={{
                  background: 'background.hover',
                  color: 'primary.main',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(internalUser.id)}
              >
                <Td>{internalUser.id}</Td>
                <Td>{internalUser.name}</Td>
                <Td>{internalUser.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}
    </Skeleton>
  );
};

export default InternalUserStacks;
