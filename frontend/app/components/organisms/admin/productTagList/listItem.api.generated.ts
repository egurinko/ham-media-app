import type * as Types from '@/app/utils/api/types';

export type ProductTagListItemFieldsFragment = {
  __typename?: 'ProductTag';
  id: number;
  name: string;
};

export type DeleteProductTagMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteProductTagMutation = {
  __typename?: 'Mutation';
  deleteProductTag: { __typename?: 'Delete'; deleted: boolean };
};

export type UpdateProductTagMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;

export type UpdateProductTagMutation = {
  __typename?: 'Mutation';
  updateProductTag: { __typename?: 'ProductTag'; id: number; name: string };
};
