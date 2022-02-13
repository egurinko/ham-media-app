import {
  Box,
  Spinner,
  Text,
  IconButton,
  Button,
  Badge,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import {
  useInternalGetInternalUsersQuery,
  useInternalAllocateStockMutation,
  useInternalReturnStockMutation,
  useInternalDeleteStockMutation,
} from '@/api/internal_api/types';
import type {
  InternalGetProductQuery,
  InternalGetStocksQuery,
  InternalGetStocksQueryVariables,
} from '@/api/internal_api/types';

type FetchStocksMoreArgs = { variables: InternalGetStocksQueryVariables };

interface Props {
  productId: InternalGetProductQuery['product']['id'];
  stocks: InternalGetStocksQuery['stocks'];
  fetchStocksMore: (args: FetchStocksMoreArgs) => Promise<any>;
}

const AllocationSection: React.FC<Props> = ({
  productId,
  stocks,
  fetchStocksMore,
}) => {
  const { data: internalUserData } = useInternalGetInternalUsersQuery();
  const [
    allocateStock,
    {
      data: allocateStockData,
      error: allocateStockError,
      loading: allocateStockLoading,
    },
  ] = useInternalAllocateStockMutation();
  const [
    returnStock,
    {
      data: returnStockData,
      error: returnStockError,
      loading: returnStockLoading,
    },
  ] = useInternalReturnStockMutation();
  const [
    deleteStock,
    {
      data: deleteStockData,
      error: deleteStockError,
      loading: deleteStockLoading,
    },
  ] = useInternalDeleteStockMutation();

  const handleAllocate = async (id: number, internalUserId: BigInt) => {
    try {
      await allocateStock({
        variables: { id, internalUserId },
      });
      await fetchStocksMore({ variables: { productId } });
    } catch (error) {}
  };

  const handleReturnStock = async (id: number) => {
    try {
      await returnStock({
        variables: { id },
      });
      await fetchStocksMore({ variables: { productId } });
    } catch (error) {}
  };

  const handleDeleteStock = async (id: number) => {
    try {
      await deleteStock({ variables: { id } });
      await fetchStocksMore({ variables: { productId } });
    } catch (_) {}
  };

  return (
    <>
      <Text mb="2" fontSize="lg" fontWeight="bold">
        在庫情報
      </Text>

      {allocateStockLoading || returnStockLoading || deleteStockLoading ? (
        <Spinner size="lg" color="main.primary" />
      ) : null}
      {allocateStockError ? (
        <FlashMessage status="error" message={allocateStockError.message} />
      ) : allocateStockData ? (
        <FlashMessage status="success" message="在庫を割り当てました。" />
      ) : null}
      {returnStockError ? (
        <FlashMessage status="error" message={returnStockError.message} />
      ) : returnStockData ? (
        <FlashMessage
          status="success"
          message="在庫の割り当てを解除しました。"
        />
      ) : null}
      {deleteStockError ? (
        <FlashMessage status="error" message={deleteStockError.message} />
      ) : deleteStockData ? (
        <FlashMessage status="success" message="在庫を削除しました。" />
      ) : null}
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="2" p="1" fontSize="xs">
              id
            </Th>
            <Th p="1" fontSize="xs">
              期限
            </Th>
            <Th p="1" fontSize="xs">
              責任者
            </Th>
            <Th p="1" fontSize="xs">
              割当状況
            </Th>
            <Th p="1"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {stocks.map((stock) => (
            <Tr key={stock.id}>
              <Td w="2" px="1" py="3">
                <Text fontSize="8">{stock.id}</Text>
              </Td>
              <Td px="1" py="3">
                <Text fontSize="8">
                  {dayjs(stock.expired_at).isBefore('2100-00-00')
                    ? dayjs(stock.expired_at).format('YYYY年MM月DD日')
                    : 'なし'}
                </Text>
              </Td>
              <Td px="1" py="3">
                <Text fontSize="8">{stock.internalUser.name}</Text>
              </Td>
              <Td px="1" py="3">
                {stock.stockAllocation ? (
                  <Box display="flex" flexDir="row" alignItems="center">
                    <Text fontSize="sm">
                      {stock.stockAllocation.internalUser.name}
                    </Text>
                    <Button
                      size="xs"
                      ml="1"
                      onClick={() => handleReturnStock(stock.id)}
                    >
                      返却
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Badge size="xs" colorScheme="green" mb="1">
                      未割当
                    </Badge>
                    {internalUserData ? (
                      <Select
                        size="xs"
                        onChange={(e) => {
                          handleAllocate(stock.id, BigInt(e.target.value));
                        }}
                        placeholder="スタッフを選択"
                      >
                        {internalUserData.internalUsers.map((internalUser) => (
                          <option
                            key={internalUser.email}
                            value={Number(internalUser.id)}
                          >
                            {internalUser.name}
                          </option>
                        ))}
                      </Select>
                    ) : null}
                  </Box>
                )}
              </Td>
              <Td px="1" py="3">
                <IconButton
                  size="xs"
                  ml="1"
                  onClick={() => handleDeleteStock(stock.id)}
                  icon={<DeleteIcon size="sm" />}
                  aria-label="delete stock"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export { AllocationSection };
