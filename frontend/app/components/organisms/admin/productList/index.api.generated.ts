import type * as Types from '@/app/utils/api/types';

export type GetProductConnectionQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  makerId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  productTagId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  allocatedInternalUserId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  internalUserId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  hasStock?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;

export type GetProductConnectionQuery = {
  __typename?: 'Query';
  productConnection?: {
    __typename?: 'ProductConnection';
    edges?: Array<{
      __typename?: 'ProductEdge';
      node?: {
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
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};
