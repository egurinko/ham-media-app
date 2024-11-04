import type * as Types from '@/app/utils/api/types';

export type GetEditableHospitalAddressQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalAddressQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    hospitalAddress?: {
      __typename?: 'HospitalAddress';
      address: string;
      phone_number: string;
      prefecture: { __typename?: 'Prefecture'; id: number; name: string };
    } | null;
  };
};

export type GetPrefecturesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetPrefecturesQuery = {
  __typename?: 'Query';
  prefectures: Array<{ __typename?: 'Prefecture'; id: number; name: string }>;
};
