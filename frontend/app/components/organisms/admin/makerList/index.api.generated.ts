import type * as Types from '@/app/utils/api/types';

export type GetMakersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMakersQuery = {
  __typename?: 'Query';
  makers: Array<{ __typename?: 'Maker'; id: number; name: string }>;
};
