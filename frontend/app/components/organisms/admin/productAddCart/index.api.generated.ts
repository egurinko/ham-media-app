import type * as Types from '@/app/utils/api/types';

export type GetProductQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product: {
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
  };
};
