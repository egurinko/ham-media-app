import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalNightUrgentActionOptionMutationVariables =
  Types.Exact<{
    hospitalId: Types.Scalars['BigInt']['input'];
    status: Types.Scalars['String']['input'];
  }>;

export type UpdateHospitalNightUrgentActionOptionMutation = {
  __typename?: 'Mutation';
  updateHospitalNightUrgentActionOption: {
    __typename?: 'HospitalNightUrgentActionOption';
    status: string;
  };
};
