import type * as Types from '@/app/utils/api/types';

export type ApproveStockRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  message: Types.Scalars['String']['input'];
}>;

export type ApproveStockRequestMutation = {
  __typename?: 'Mutation';
  approveStockRequest: { __typename?: 'Delete'; deleted: boolean };
};

export type RejectStockRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  message: Types.Scalars['String']['input'];
}>;

export type RejectStockRequestMutation = {
  __typename?: 'Mutation';
  rejectStockRequest: { __typename?: 'Delete'; deleted: boolean };
};
