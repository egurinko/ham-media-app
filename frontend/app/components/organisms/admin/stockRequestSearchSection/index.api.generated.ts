import type * as Types from '@/app/utils/api/types';

export type GetStockRequestInternalUsersQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetStockRequestInternalUsersQuery = {
  __typename?: 'Query';
  internalUsers: Array<{
    __typename?: 'InternalUser';
    value: number;
    label: string;
  }>;
};
