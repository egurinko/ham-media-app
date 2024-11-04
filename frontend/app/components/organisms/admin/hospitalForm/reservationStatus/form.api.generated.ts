import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalReservationStatusMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  required: Types.Scalars['String']['input'];
  reservable: Types.Scalars['String']['input'];
  remark: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalReservationStatusMutation = {
  __typename?: 'Mutation';
  updateHospitalReservationStatus: {
    __typename?: 'HospitalReservationStatus';
    required: string;
    reservable: string;
    remark: string;
  };
};
