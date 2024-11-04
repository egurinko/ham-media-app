import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalCertificationOptionMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  nichijuRegistered: Types.Scalars['String']['input'];
  jsavaRegistered: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalCertificationOptionMutation = {
  __typename?: 'Mutation';
  updateHospitalCertificationOption: {
    __typename?: 'HospitalCertificationOption';
    nichiju_registered: string;
    jsava_registered: string;
  };
};
