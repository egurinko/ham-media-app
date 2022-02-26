import { useState, useEffect, useCallback } from 'react';
import { Box, Text, Select, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Card } from '@/components/atoms/Card';
import { Spinner } from '@/components/atoms/Spinner';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import {
  useInternalGetStockRequestQuery,
  useInternalUpdateStockRequestMutation,
} from '@/api/internal_api/types';
import type { StockRequestFieldsFragment } from '@/api/internal_api/types';
import type { CreateStockRequestRequestProductsInputType } from '@/api/internal_api/types';

type Props = {
  stockRequestId: StockRequestFieldsFragment['id'];
};

type UpdatingStockRequest = {
  count: CreateStockRequestRequestProductsInputType['count'];
  product: StockRequestFieldsFragment['productRegistrations'][number]['product'];
}[];

const Form: React.VFC<Props> = ({ stockRequestId }) => {
  const {
    data: getStockRequestData,
    error: getStockRequestError,
    loading: getStockRequestLoading,
  } = useInternalGetStockRequestQuery({
    variables: { id: stockRequestId },
  });
  const [updatingStockRequest, setUpdatingStockRequest] =
    useState<UpdatingStockRequest>([]);

  useEffect(() => {
    if (getStockRequestData?.stockRequest) {
      const newUpdatingStockRequest: UpdatingStockRequest =
        getStockRequestData.stockRequest.productRegistrations.reduce(
          (acc, productRegistration) => {
            const has = acc.find(
              (acc) => acc.product.id === productRegistration.product.id
            );
            if (has) {
              return acc.map((productStock) => {
                if (
                  productStock.product.id === productRegistration.product.id
                ) {
                  return { ...productStock, count: productStock.count + 1 };
                }
                return productStock;
              });
            } else {
              return [
                ...acc,
                { count: 1, product: productRegistration.product },
              ];
            }
          },
          [] as UpdatingStockRequest
        );
      setUpdatingStockRequest(newUpdatingStockRequest);
    }
  }, [getStockRequestData]);

  const handleStockCountChange = useCallback(
    (productId: number, count: string) => {
      const newProductStock = updatingStockRequest.map((productStock) => {
        if (productStock.product.id === productId) {
          return { ...productStock, count: Number(count) };
        } else {
          return productStock;
        }
      });
      setUpdatingStockRequest(newProductStock);
    },
    [updatingStockRequest]
  );

  const handleDelete = useCallback(
    (productId: number) => {
      const newProductStock = updatingStockRequest.filter(
        (productStock) => productStock.product.id !== productId
      );
      setUpdatingStockRequest(newProductStock);
    },
    [updatingStockRequest]
  );

  const [update, { data, error, loading }] =
    useInternalUpdateStockRequestMutation();

  const handleSubmit = useCallback(async () => {
    const updateVariables = updatingStockRequest.map((stockProduct) => ({
      count: stockProduct.count,
      productId: stockProduct.product.id,
    }));
    try {
      await update({
        variables: { id: stockRequestId, requestProducts: updateVariables },
      });
    } catch {}
  }, [updatingStockRequest, stockRequestId, update]);

  return (
    <Card>
      <Spinner loading={getStockRequestLoading} />
      {getStockRequestError ? (
        <ErrorMessage error={getStockRequestError} />
      ) : null}
      {data ? (
        <FlashMessage message="在庫リクエストを更新しました" status="success" />
      ) : null}
      {error ? <ErrorMessage error={error} /> : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box textAlign="center">
          {updatingStockRequest.map((updatingProductStockRequest) => (
            <Box key={updatingProductStockRequest.product.id} mb="2">
              <ProductSummary product={updatingProductStockRequest.product} />
              <Box display="flex" alignItems="center">
                <Box flexShrink="0">
                  <Text>数量：</Text>
                </Box>
                <Select
                  value={updatingProductStockRequest.count}
                  onChange={(e) =>
                    handleStockCountChange(
                      updatingProductStockRequest.product.id,
                      e.target.value
                    )
                  }
                >
                  {Array(
                    updatingProductStockRequest.product.remainingStockAmount
                  )
                    .fill('')
                    .map((_, i) => (
                      <option key={String(i)} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </Select>
                <Button
                  ml="2"
                  onClick={() =>
                    handleDelete(updatingProductStockRequest.product.id)
                  }
                >
                  <DeleteIcon mr="1" />
                  削除
                </Button>
              </Box>
            </Box>
          ))}
          <PrimaryButton
            type="submit"
            isLoading={loading}
            mt="8"
            disabled={updatingStockRequest.length === 0}
          >
            在庫リクエストを更新
          </PrimaryButton>
        </Box>
      </form>
    </Card>
  );
};

export { Form };
