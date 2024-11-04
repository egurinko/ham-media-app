/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Types from '@/app/utils/api/types';

export type HospitalListItemFieldsFragment = {
  __typename?: 'Hospital';
  id: number;
  name: string;
  deleted: boolean;
  hospitalAddress?: {
    __typename?: 'HospitalAddress';
    address: string;
    phone_number: string;
    prefecture: { __typename?: 'Prefecture'; name: string };
  } | null;
};
