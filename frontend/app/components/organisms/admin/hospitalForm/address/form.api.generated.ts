import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalAddressMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  address: Types.Scalars['String']['input'];
  phoneNumber: Types.Scalars['String']['input'];
  prefectureId: Types.Scalars['BigInt']['input'];
}>;

export type UpdateHospitalAddressMutation = {
  __typename?: 'Mutation';
  updateHospitalAddress: { __typename?: 'HospitalAddress'; address: string };
};
