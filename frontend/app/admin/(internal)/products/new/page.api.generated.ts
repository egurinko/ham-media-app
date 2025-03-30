import type * as Types from '@/app/utils/api/types';

export type GetProductNewMasterQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetProductNewMasterQuery = {
  __typename?: 'Query';
  makers: Array<{ __typename?: 'Maker'; id: number; name: string }>;
  productTagGroups: Array<{
    __typename?: 'ProductTagGroup';
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  }>;
};

export type CreateProductMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  remark: Types.Scalars['String']['input'];
  makerId: Types.Scalars['Int']['input'];
  file: Types.Scalars['Upload']['input'];
  productTagIds:
    | Array<Types.Scalars['Int']['input']>
    | Types.Scalars['Int']['input'];
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: { __typename?: 'Product'; id: number };
};
