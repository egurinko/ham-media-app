import type * as Types from '@/app/utils/api/types';

export type UpsertHospitalAddressGeoLocationMutationVariables = Types.Exact<{
  hospitalAddressId: Types.Scalars['BigInt']['input'];
}>;

export type UpsertHospitalAddressGeoLocationMutation = {
  __typename?: 'Mutation';
  upsertHospitalAddressGeoLocation: {
    __typename?: 'HospitalAddress';
    id: number;
  };
};
