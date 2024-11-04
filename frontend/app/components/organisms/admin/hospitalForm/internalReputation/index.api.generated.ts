import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalInternalReputationQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalInternalReputationQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalInternalReputation?: {
      __typename?: 'HospitalInternalReputation';
      star: number;
      remark: string;
    } | null;
  };
};
