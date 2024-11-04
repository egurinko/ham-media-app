import type * as Types from '@/app/utils/api/types';

export type GetBreadcrumbsHospitalQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetBreadcrumbsHospitalQuery = {
  __typename?: 'Query';
  hospital: { __typename?: 'Hospital'; id: number; name: string };
};
