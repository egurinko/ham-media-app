import type * as Types from '@/app/utils/api/types';

export type GetProductsByIdsQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<
    Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']
  >;
}>;

export type GetProductsByIdsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    id: number;
    name: string;
    url: string;
    remark: string;
    totalStockAmount: number;
    allocatedStockAmount: number;
    remainingStockAmount: number;
    productTaggings: Array<{
      __typename?: 'ProductTagging';
      id: number;
      productTag: { __typename?: 'ProductTag'; id: number; name: string };
    }>;
    maker: { __typename?: 'Maker'; name: string };
    stocks: Array<{
      __typename?: 'Stock';
      id: number;
      internalUser: { __typename?: 'InternalUser'; name: string };
      stockAllocation?: {
        __typename?: 'StockAllocation';
        internalUser: { __typename?: 'InternalUser'; name: string };
      } | null;
    }>;
  }>;
};

export type CreateStockRequestMutationVariables = Types.Exact<{
  requestProducts:
    | Array<Types.CreateStockRequestRequestProductsInputType>
    | Types.CreateStockRequestRequestProductsInputType;
}>;

export type CreateStockRequestMutation = {
  __typename?: 'Mutation';
  createStockRequest: { __typename?: 'StockRequest'; id: number };
};
