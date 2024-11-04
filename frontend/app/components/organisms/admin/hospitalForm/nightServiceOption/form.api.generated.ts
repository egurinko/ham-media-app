import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalNightServiceOptionMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  status: Types.Scalars['String']['input'];
  remark: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalNightServiceOptionMutation = {
  __typename?: 'Mutation';
  updateHospitalNightServiceOption: {
    __typename?: 'HospitalNightServiceOption';
    status: string;
    remark: string;
  };
};
