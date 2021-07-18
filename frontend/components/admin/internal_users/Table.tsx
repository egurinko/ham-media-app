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
import { useQuery } from '@apollo/client';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import { GetInternalUsers } from '@/api/internal_api/__generated__/GetInternalUsers';

const Index: React.VFC<{}> = () => {
  const { data, loading, error } = useQuery<GetInternalUsers>(getInternalUsers);

  if (error) return <Text>エラーです</Text>;

  return (
    <Skeleton isLoaded={!loading}>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>ユーザ名</Th>
            <Th>メールアドレス</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.internalUsers.map((internalUser) => (
            <Tr key={internalUser.id}>
              <Td>{internalUser.id}</Td>
              <Td>{internalUser.name}</Td>
              <Td>{internalUser.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Skeleton>
  );
};

export default Index;
