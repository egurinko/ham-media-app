import type * as Types from '@/app/utils/api/types';

export type GetProductTagGroupsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetProductTagGroupsQuery = {
  __typename?: 'Query';
  productTagGroups: Array<{
    __typename?: 'ProductTagGroup';
    id: number;
    name: string;
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  }>;
};
