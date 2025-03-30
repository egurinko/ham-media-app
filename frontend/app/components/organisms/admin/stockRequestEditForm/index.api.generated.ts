import type * as Types from '@/app/utils/api/types';

export type UpdateStockRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  requestProducts:
    | Array<Types.CreateStockRequestRequestProductsInputType>
    | Types.CreateStockRequestRequestProductsInputType;
}>;

export type UpdateStockRequestMutation = {
  __typename?: 'Mutation';
  updateStockRequest: { __typename?: 'StockRequest'; id: number };
};
