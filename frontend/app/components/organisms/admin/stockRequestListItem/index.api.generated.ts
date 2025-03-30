import type * as Types from '@/app/utils/api/types';

export type StockRequestListItemFieldsFragment = {
  __typename?: 'StockRequest';
  id: number;
  internalUser: { __typename?: 'InternalUser'; id: number; name: string };
  productRegistrations: Array<{
    __typename?: 'StockRequestProductRegistration';
    id: number;
    product: { __typename?: 'Product'; id: number; name: string; url: string };
  }>;
};

export type DeleteStockRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteStockRequestMutation = {
  __typename?: 'Mutation';
  deleteStockRequest: { __typename?: 'Delete'; deleted: boolean };
};
