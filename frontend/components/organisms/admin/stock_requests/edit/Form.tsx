import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Text, Select, Button } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import {
  useInternalGetStockRequestQuery,
  useInternalUpdateStockRequestMutation,
} from '@/api/internal_api/types';
import type {
  StockRequestFieldsFragment,
  CreateStockRequestRequestProductsInputType,
} from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import { ADMIN_PRODUCTS_DETAIL_PATH } from '@/utils/routes';
import { Note } from '../shared/Note';

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
      <ErrorMessage error={getStockRequestError} />
      <SuccessMessage data={data} message="在庫リクエストを更新しました" />
      <ErrorMessage error={error} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box textAlign="center">
          {updatingStockRequest.map((updatingProductStockRequest) => (
            <Box key={updatingProductStockRequest.product.id} mb="2">
              <SummaryLink
                url={ADMIN_PRODUCTS_DETAIL_PATH(
                  updatingProductStockRequest.product.id
                )}
              >
                <ProductSummary product={updatingProductStockRequest.product} />
              </SummaryLink>
              <Box display="flex" alignItems="center">
                <Box flexShrink={0}>
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
          <Note />
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
