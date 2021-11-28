import {
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useInternalGetProductTagGroupsQuery } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminProductTagGroupsEdit } from '@/utils/routes';

const ProductTagGroupsStacks: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data, loading, error } = useInternalGetProductTagGroupsQuery({
    fetchPolicy: 'network-only',
  });

  const handleProductTagGroupClick = useCallback(
    (id: number) => {
      goAdminProductTagGroupsEdit(router, { id });
    },
    [router]
  );

  return (
    <>
      {loading ? <Spinner /> : null}
      {error ? (
        <FlashMessage message="エラーが発生しました。" status="error" />
      ) : null}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>カテゴリー</Th>
            <Th>所属タグ一覧</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.productTagGroups.map((productTagGroup) => (
            <Tr
              key={productTagGroup.id}
              onClick={() => handleProductTagGroupClick(productTagGroup.id)}
              _hover={{
                background: 'background.hover',
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              <Td fontSize="md">{productTagGroup.name}</Td>
              <Td>
                <UnorderedList>
                  {productTagGroup.productTags.map((productTag) => (
                    <ListItem key={productTag.id}>
                      <Text size="sm">{productTag.name}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export { ProductTagGroupsStacks };
