import type * as Types from '@/app/utils/api/types';

export type GetProductTagGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetProductTagGroupQuery = {
  __typename?: 'Query';
  productTagGroup: {
    __typename?: 'ProductTagGroup';
    id: number;
    name: string;
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  };
};

export type UpdateProductTagGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;

export type UpdateProductTagGroupMutation = {
  __typename?: 'Mutation';
  updateProductTagGroup: { __typename?: 'ProductTagGroup'; id: number };
};
