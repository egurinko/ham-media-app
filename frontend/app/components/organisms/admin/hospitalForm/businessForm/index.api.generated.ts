import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalBusinessFormQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalBusinessFormQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalBusinessForm?: {
      __typename?: 'HospitalBusinessForm';
      id: number;
      business_hour: string;
      closed_day: string;
      insurance_enabled: string;
      remark: string;
    } | null;
  };
};
