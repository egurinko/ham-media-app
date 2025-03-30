import type * as Types from '@/app/utils/api/types';

export type CreateStocksMutationVariables = Types.Exact<{
  productId: Types.Scalars['Int']['input'];
  stocks:
    | Array<Types.CreateStocksStocksInputType>
    | Types.CreateStocksStocksInputType;
}>;

export type CreateStocksMutation = {
  __typename?: 'Mutation';
  createStocks: Array<{ __typename?: 'Stock'; id: number }>;
};
