import { useState } from 'react';
import { Box, Text, Input, IconButton, Button, Select } from '@chakra-ui/react';
import { SmallCloseIcon, AddIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import {
  useInternalCreateStocksMutation,
  useInternalGetInternalUsersQuery,
} from '@/api/internal_api/types';
import type {
  InternalGetProductQuery,
  InternalGetStocksQueryVariables,
} from '@/api/internal_api/types';

type FetchStocksMoreArgs = { variables: InternalGetStocksQueryVariables };

interface Props {
  productId: InternalGetProductQuery['product']['id'];
  fetchStocksMore: (args: FetchStocksMoreArgs) => Promise<any>;
}

type AddingStock = {
  expired_at: string;
  amount: string;
  internal_user_id?: number;
};
const addingStockInitialState: AddingStock = {
  expired_at: '',
  amount: '1',
  internal_user_id: undefined,
};

const NewSection: React.FC<Props> = ({ productId, fetchStocksMore }) => {
  const { data: internalUsersData } = useInternalGetInternalUsersQuery();
  const [addingStocks, setAddingStocks] = useState([addingStockInitialState]);
  const [
    createStocks,
    {
      data: createStockData,
      error: createStocksError,
      loading: createStocksLoading,
    },
  ] = useInternalCreateStocksMutation();

  const handleInternalUserChange = (
    changingIndex: number,
    internalUserId: number
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, internal_user_id: internalUserId };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleExpiredAtChange = (
    changingIndex: number,
    changingDate: string
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, expired_at: changingDate };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleAmountChange = (
    changingIndex: number,
    changingAmount: string
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, amount: changingAmount };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleAddingStocksDelete = (deletingIndex: number) => {
    const newAddingStocks = addingStocks.filter(
      (_, index) => index !== deletingIndex
    );
    setAddingStocks(newAddingStocks);
  };

  const handleAddingStocksAdd = () => {
    setAddingStocks([...addingStocks, addingStockInitialState]);
  };

  const handleAddStocks = async () => {
    try {
      await createStocks({
        variables: {
          productId,
          stocks: addingStocks.map((stock) => ({
            amount: Number(stock.amount),
            expiredAt:
              stock.expired_at === ''
                ? dayjs('2100-12-00').toISOString()
                : dayjs(stock.expired_at).toISOString(),
            internalUserId: BigInt(stock.internal_user_id || 1),
          })),
        },
      });
      setAddingStocks([addingStockInitialState]);
      await fetchStocksMore({ variables: { productId } });
    } catch (_e) {}
  };

  return (
    <>
      <Text mt="6" mb="2" fontSize="lg" fontWeight="bold">
        在庫追加
      </Text>
      {createStocksError ? (
        <FlashMessage status="error" message={createStocksError.message} />
      ) : createStockData ? (
        <FlashMessage status="success" message="在庫を追加しました。" />
      ) : null}
      <Box>
        <Box display="flex" flexDir="row">
          <Text width="33%" fontSize="xs" mr="2">
            期限 (任意)
          </Text>
          <Text width="33%" fontSize="xs" mr="2">
            責任者 (必須)
          </Text>
          <Text width="33%" fontSize="xs">
            数量 (必須)
          </Text>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddStocks();
          }}
        >
          {addingStocks.map((addingStock, index) => {
            return (
              <Box
                key={index}
                display="flex"
                flexDir="row"
                alignItems="center"
                mb="2"
              >
                <Input
                  placeholder="2100/10/10"
                  type="date"
                  size="md"
                  min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
                  value={addingStock.expired_at}
                  onChange={(e) => handleExpiredAtChange(index, e.target.value)}
                  mr="2"
                  width="33%"
                />
                {internalUsersData ? (
                  <Select
                    placeholder="選択してください"
                    value={addingStock.internal_user_id}
                    onChange={(e) =>
                      handleInternalUserChange(index, Number(e.target.value))
                    }
                    mr="2"
                    width="30%"
                    required
                  >
                    {internalUsersData.internalUsers.map((internalUser) => (
                      <option
                        key={String(internalUser.id)}
                        value={String(internalUser.id)}
                      >
                        {internalUser.name}
                      </option>
                    ))}
                  </Select>
                ) : null}
                <Input
                  placeholder="10"
                  type="number"
                  size="md"
                  min="1"
                  value={addingStock.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  required
                  width="20%"
                />
                <IconButton
                  onClick={() => handleAddingStocksDelete(index)}
                  disabled={index === 0}
                  icon={<SmallCloseIcon color="black" />}
                  aria-label="delete"
                  ml="2"
                  textAlign="center"
                  size="xs"
                  borderRadius="50%"
                />
              </Box>
            );
          })}
          <Box textAlign="center" mb="6">
            <IconButton
              onClick={handleAddingStocksAdd}
              bgColor="primary.light"
              icon={<AddIcon color="primary.main" />}
              aria-label="add"
              ml="2"
              textAlign="center"
              borderRadius="50%"
            />
          </Box>
          <Box textAlign="center">
            <Button
              type="submit"
              bgColor="primary.main"
              aria-label="add"
              color="white"
              leftIcon={<AddIcon />}
              isLoading={createStocksLoading}
            >
              在庫追加
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export { NewSection };
