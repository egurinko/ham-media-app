import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalInternalReputationMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  star: Types.Scalars['Int']['input'];
  remark: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalInternalReputationMutation = {
  __typename?: 'Mutation';
  updateHospitalInternalReputation: {
    __typename?: 'HospitalInternalReputation';
    star: number;
  };
};
