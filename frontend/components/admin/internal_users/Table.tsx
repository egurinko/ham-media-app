import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Card from '../../base/Card';
import { useQuery } from '@apollo/client';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import { GetInternalUsers } from '@/api/internal_api/__generated__/GetInternalUsers';

const Index: React.VFC<{}> = () => {
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
    <Card>
      <Skeleton isLoaded={!loading}>
        <Table>
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
                }}
                onClick={() => handleClick(internalUser.id)}
              >
                <Td>{internalUser.id}</Td>
                <Td>{internalUser.name}</Td>
                <Td>{internalUser.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Skeleton>
    </Card>
  );
};

export default Index;
