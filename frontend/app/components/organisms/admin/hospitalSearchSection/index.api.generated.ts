import type * as Types from '@/app/utils/api/types';

export type GetPrefecturesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetPrefecturesQuery = {
  __typename?: 'Query';
  prefectures: Array<{ __typename?: 'Prefecture'; id: number; name: string }>;
};
