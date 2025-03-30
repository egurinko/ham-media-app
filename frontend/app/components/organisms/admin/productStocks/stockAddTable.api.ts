import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateStocksMutation,
  CreateStocksMutationVariables,
} from './stockAddTable.api.generated';

const createStocksGql = gql`
  mutation CreateStocks(
    $productId: Int!
    $stocks: [CreateStocksStocksInputType!]!
  ) {
    createStocks(productId: $productId, stocks: $stocks) {
      id
    }
  }
`;

export const createStocks = async (
  variables: CreateStocksMutationVariables,
): Promise<CreateStocksMutation['createStocks']> => {
  const { data } = await getInternalClient().mutate<
    CreateStocksMutation,
    CreateStocksMutationVariables
  >({
    mutation: createStocksGql,
    variables,
  });
  return data!.createStocks;
};
