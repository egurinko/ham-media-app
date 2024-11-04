import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalCertificationOptionQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalCertificationOptionQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalCertificationOption?: {
      __typename?: 'HospitalCertificationOption';
      nichiju_registered: string;
      jsava_registered: string;
    } | null;
  };
};
