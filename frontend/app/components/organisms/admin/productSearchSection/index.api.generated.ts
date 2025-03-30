import type * as Types from '@/app/utils/api/types';

export type GetSearchMasterQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetSearchMasterQuery = {
  __typename?: 'Query';
  makers: Array<{ __typename?: 'Maker'; id: number; name: string }>;
  productTagGroups: Array<{
    __typename?: 'ProductTagGroup';
    id: number;
    name: string;
    productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
  }>;
  internalUsers: Array<{
    __typename?: 'InternalUser';
    id: number;
    name: string;
  }>;
};
