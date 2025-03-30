import type * as Types from '@/app/utils/api/types';

export type GetStockRequestConnectionQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  internalUserId?: Types.InputMaybe<Types.Scalars['BigInt']['input']>;
}>;

export type GetStockRequestConnectionQuery = {
  __typename?: 'Query';
  stockRequestConnection?: {
    __typename?: 'StockRequestConnection';
    edges?: Array<{
      __typename?: 'StockRequestEdge';
      node?: {
        __typename?: 'StockRequest';
        id: number;
        internalUser: { __typename?: 'InternalUser'; id: number; name: string };
        productRegistrations: Array<{
          __typename?: 'StockRequestProductRegistration';
          id: number;
          product: {
            __typename?: 'Product';
            id: number;
            name: string;
            url: string;
          };
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
