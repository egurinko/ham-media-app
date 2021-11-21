import { Fragment, useState } from 'react';
import {
  Box,
  Spinner,
  Text,
  Divider,
  Input,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { SmallCloseIcon, AddIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { Card } from '@/components/atoms/Card';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import {
  useInternalGetStocksQuery,
  useInternalCreateStocksMutation,
} from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

type AddingStock = {
  expired_at: string;
  amount: string;
};
const addingStockInitialState: AddingStock = {
  expired_at: '',
  amount: '1',
};

const Stocks: React.FC<Props> = ({ productId }) => {
  const { data, error, loading, fetchMore } = useInternalGetStocksQuery({
    variables: { productId: productId },
  });
  const [addingStocks, setAddingStocks] = useState([addingStockInitialState]);
  const [
    createStocks,
    {
      data: createStockData,
      error: createStocksError,
      loading: createStocksLoading,
    },
  ] = useInternalCreateStocksMutation();

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
          })),
        },
      });
      setAddingStocks([addingStockInitialState]);
      await fetchMore({ variables: { productId } });
    } catch (_e) {}
  };

  return (
    <Card>
      <Text mb="2" fontSize="lg" fontWeight="bold">
        在庫情報
      </Text>
      {loading ? <Spinner size="lg" color="main.primary" /> : null}
      {error ? (
        <FlashMessage status="error" message="在庫情報の取得に失敗しました。" />
      ) : null}
      {data
        ? data.stocks.map((stock) => (
            <Fragment key={stock.id}>
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
              >
                <Box flex="1">
                  <Text fontSize="xs">id：{stock.id}</Text>
                  <Text fontSize="8" fontWeight="bold">
                    在庫期限：
                    {dayjs(stock.expired_at).isBefore('2100-00-00')
                      ? dayjs(stock.expired_at).format('YYYY年MM月DD日')
                      : 'なし'}
                  </Text>
                </Box>
                <Box>
                  {stock.stockAllocation ? (
                    <Text fontSize="sm">
                      {stock.stockAllocation.internalUser.name}
                    </Text>
                  ) : (
                    '未割り当て'
                  )}
                </Box>
              </Box>
              <Divider />
            </Fragment>
          ))
        : null}
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
          <Text width="50%" fontSize="sm">
            在庫期限 (任意)
          </Text>
          <Text width="50%" fontSize="sm">
            追加数量 (必須)
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
                />
                <Input
                  placeholder="10"
                  type="number"
                  size="md"
                  min="1"
                  value={addingStock.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  required
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
    </Card>
  );
};

export { Stocks };
