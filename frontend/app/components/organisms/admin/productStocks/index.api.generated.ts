/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as Types from '@/app/utils/api/types';

export type GetStocksQueryVariables = Types.Exact<{
  productId: Types.Scalars['Int']['input'];
}>;

export type GetStocksQuery = {
  __typename?: 'Query';
  stocks: Array<{
    __typename?: 'Stock';
    id: number;
    expired_at: any;
    created_at: any;
    internalUser: {
      __typename?: 'InternalUser';
      id: number;
      email: string;
      name: string;
    };
    stockAllocation?: {
      __typename?: 'StockAllocation';
      created_at: any;
      id: number;
      internalUser: {
        __typename?: 'InternalUser';
        id: number;
        email: string;
        name: string;
      };
    } | null;
  }>;
};

export type GetInternalUsersForAllocationQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetInternalUsersForAllocationQuery = {
  __typename?: 'Query';
  internalUsers: Array<{
    __typename?: 'InternalUser';
    id: number;
    name: string;
    role: { __typename?: 'Role'; id: number; name: string };
  }>;
};
