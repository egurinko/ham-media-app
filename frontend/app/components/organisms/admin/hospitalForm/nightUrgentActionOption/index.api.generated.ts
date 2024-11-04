import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalNightUrgentActionOptionQueryVariables =
  Types.Exact<{
    id: Types.Scalars['BigInt']['input'];
  }>;

export type GetEditableHospitalNightUrgentActionOptionQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalNightUrgentActionOption?: {
      __typename?: 'HospitalNightUrgentActionOption';
      status: string;
    } | null;
  };
};
