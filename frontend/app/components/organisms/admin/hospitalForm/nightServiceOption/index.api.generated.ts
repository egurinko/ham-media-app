import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalNightServiceOptionQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalNightServiceOptionQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalNightServiceOption?: {
      __typename?: 'HospitalNightServiceOption';
      status: string;
      remark: string;
    } | null;
  };
};
