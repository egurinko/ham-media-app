import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
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
import dayjs from 'dayjs';
import { memo } from 'react';
import {
  useInternalGetInternalUsersQuery,
  useInternalAllocateStockMutation,
  useInternalReturnStockMutation,
  useInternalDeleteStockMutation,
  useInternalUpdateStockInternalUserMutation,
} from '@/api/internal_api/types';
import type {
  InternalGetProductQuery,
  InternalGetStocksQuery,
  InternalGetStocksQueryVariables,
} from '@/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/api/local_api/types';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { FC } from 'react';

type FetchStocksMoreArgs = { variables: InternalGetStocksQueryVariables };

interface Props {
  productId: InternalGetProductQuery['product']['id'];
  stocks: InternalGetStocksQuery['stocks'];
  fetchStocksMore: (args: FetchStocksMoreArgs) => Promise<unknown>;
}

const AllocationSection: FC<Props> = ({
  productId,
  stocks,
  fetchStocksMore,
}) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
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
  const [
    updateStockInternalUser,
    {
      data: updateStockInternalUserData,
      error: updateStockInternalUserError,
      loading: updateStockInternalUserLoading,
    },
  ] = useInternalUpdateStockInternalUserMutation();

  const handleAllocate = async (id: number, internalUserId: bigint) => {
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
        ????????????
      </Text>

      <Spinner
        size="lg"
        loading={
          allocateStockLoading ||
          returnStockLoading ||
          deleteStockLoading ||
          updateStockInternalUserLoading
        }
      />

      <SuccessMessage
        data={allocateStockData}
        message="?????????????????????????????????"
      />
      <ErrorMessage error={allocateStockError} />

      <SuccessMessage
        data={returnStockData}
        message="?????????????????????????????????????????????"
      />
      <ErrorMessage error={returnStockError} />

      <SuccessMessage data={deleteStockData} message="??????????????????????????????" />
      <ErrorMessage error={deleteStockError} />

      <SuccessMessage
        data={updateStockInternalUserData}
        message="?????????????????????????????????"
      />
      <ErrorMessage error={updateStockInternalUserError} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="2" p="1" fontSize="xs">
              id
            </Th>
            <Th p="1" fontSize="xs">
              ??????
            </Th>
            <Th p="1" fontSize="xs">
              ?????????
            </Th>
            <Th p="1" fontSize="xs">
              ????????????
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
                    ? dayjs(stock.expired_at).format('YYYY???MM???DD???')
                    : '??????'}
                </Text>
              </Td>
              <Td px="1" py="3">
                {internalUserData ? (
                  <Select
                    size="sm"
                    placeholder="????????????????????????"
                    defaultValue={Number(stock.internalUser.id)}
                    disabled={!isAdminData?.readIsAdmin.isAdmin}
                    onChange={async (e) => {
                      await updateStockInternalUser({
                        variables: {
                          id: stock.id,
                          internalUserId: BigInt(e.target.value),
                        },
                      });
                      await fetchStocksMore({ variables: { productId } });
                    }}
                    mr="2"
                  >
                    {internalUserData.internalUsers.map((internalUser) => (
                      <option
                        key={String(internalUser.id)}
                        value={String(internalUser.id)}
                      >
                        {internalUser.name}
                      </option>
                    ))}
                  </Select>
                ) : null}
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
                      disabled={!isAdminData?.readIsAdmin.isAdmin}
                      onClick={() => handleReturnStock(stock.id)}
                    >
                      ??????
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Badge size="xs" colorScheme="green" mb="1">
                      ?????????
                    </Badge>
                    {internalUserData ? (
                      <Select
                        size="xs"
                        onChange={(e) => {
                          handleAllocate(stock.id, BigInt(e.target.value));
                        }}
                        disabled={!isAdminData?.readIsAdmin.isAdmin}
                        placeholder="?????????????????????"
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
                  icon={<DeleteIcon />}
                  aria-label="delete stock"
                  disabled={!isAdminData?.readIsAdmin.isAdmin}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

const Memoed = memo(AllocationSection);

export { Memoed as AllocationSection };
