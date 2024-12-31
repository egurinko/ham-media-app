import type * as Types from '@/app/utils/api/types';

export type GetProductTagsQueryVariables = Types.Exact<{
  productTagGroupId: Types.Scalars['Int']['input'];
}>;

export type GetProductTagsQuery = {
  __typename?: 'Query';
  productTagGroup: {
    __typename?: 'ProductTagGroup';
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  };
};
