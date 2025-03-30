import type * as Types from '@/app/utils/api/types';

export type GetProductEditMasterQueryVariables = Types.Exact<{
  productId: Types.Scalars['Int']['input'];
}>;

export type GetProductEditMasterQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'Product';
    id: number;
    name: string;
    remark: string;
    url: string;
    totalStockAmount: number;
    allocatedStockAmount: number;
    remainingStockAmount: number;
    maker: { __typename?: 'Maker'; id: number; name: string };
    productTaggings: Array<{
      __typename?: 'ProductTagging';
      id: number;
      productTag: { __typename?: 'ProductTag'; id: number; name: string };
    }>;
  };
  makers: Array<{ __typename?: 'Maker'; id: number; name: string }>;
  productTagGroups: Array<{
    __typename?: 'ProductTagGroup';
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  }>;
};

export type UpdateProductMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  makerId: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  remark: Types.Scalars['String']['input'];
  file?: Types.InputMaybe<Types.Scalars['Upload']['input']>;
  productTagIds:
    | Array<Types.Scalars['Int']['input']>
    | Types.Scalars['Int']['input'];
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: { __typename?: 'Product'; id: number };
};
