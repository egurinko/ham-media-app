/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as Types from '@/app/utils/api/types';

export type AllocateStockMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  internalUserId: Types.Scalars['BigInt']['input'];
}>;

export type AllocateStockMutation = {
  __typename?: 'Mutation';
  allocateStock: {
    __typename?: 'Stock';
    id: number;
    stockAllocation?: {
      __typename?: 'StockAllocation';
      created_at: any;
      id: number;
      internalUser: { __typename?: 'InternalUser'; id: number; name: string };
    } | null;
  };
};

export type ReturnStockMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type ReturnStockMutation = {
  __typename?: 'Mutation';
  returnStock: { __typename?: 'Stock'; id: number };
};

export type UpdateStockInternalUserMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  internalUserId: Types.Scalars['BigInt']['input'];
}>;

export type UpdateStockInternalUserMutation = {
  __typename?: 'Mutation';
  updateStockInternalUser: { __typename?: 'Stock'; id: number };
};

export type DeleteStockMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteStockMutation = {
  __typename?: 'Mutation';
  deleteStock: { __typename?: 'Delete'; deleted: boolean };
};
