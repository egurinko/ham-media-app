import type * as Types from '@/app/utils/api/types';

export type GetStockRequestQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetStockRequestQuery = {
  __typename?: 'Query';
  stockRequest: {
    __typename?: 'StockRequest';
    id: number;
    internalUser: { __typename?: 'InternalUser'; name: string; id: number };
    productRegistrations: Array<{
      __typename?: 'StockRequestProductRegistration';
      id: number;
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
    }>;
  };
};
