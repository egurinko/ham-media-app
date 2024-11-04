import type * as Types from '@/app/utils/api/types';

export type GetHospitalDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetHospitalDetailQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    name: string;
    url: string;
    deleted: boolean;
    internal_memo: string;
    hospitalAddress?: {
      __typename?: 'HospitalAddress';
      id: number;
      address: string;
      phone_number: string;
      prefecture: { __typename?: 'Prefecture'; name: string };
      hospitalAddressGeoLocation?: {
        __typename?: 'HospitalAddressGeoLocation';
        latitude: number;
        longitude: number;
      } | null;
    } | null;
    hospitalBusinessForm?: {
      __typename?: 'HospitalBusinessForm';
      business_hour: string;
      closed_day: string;
      insurance_enabled: string;
      remark: string;
    } | null;
    hospitalCertificationOption?: {
      __typename?: 'HospitalCertificationOption';
      nichiju_registered: string;
      jsava_registered: string;
    } | null;
    hospitalInternalReputation?: {
      __typename?: 'HospitalInternalReputation';
      star: number;
      remark: string;
    } | null;
    hospitalNightServiceOption?: {
      __typename?: 'HospitalNightServiceOption';
      status: string;
      remark: string;
    } | null;
    hospitalNightUrgentActionOption?: {
      __typename?: 'HospitalNightUrgentActionOption';
      status: string;
    } | null;
    hospitalReservationStatus?: {
      __typename?: 'HospitalReservationStatus';
      required: string;
      reservable: string;
      remark: string;
    } | null;
  };
};
