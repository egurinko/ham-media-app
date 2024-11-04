import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalReservationStatusQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalReservationStatusQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalReservationStatus?: {
      __typename?: 'HospitalReservationStatus';
      required: string;
      reservable: string;
      remark: string;
    } | null;
  };
};
