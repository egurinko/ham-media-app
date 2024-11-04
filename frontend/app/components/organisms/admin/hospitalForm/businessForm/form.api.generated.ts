import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalBusinessFormMutationVariables = Types.Exact<{
  hospitalId: Types.Scalars['BigInt']['input'];
  businessHour: Types.Scalars['String']['input'];
  closedDay: Types.Scalars['String']['input'];
  insuranceEnabled: Types.Scalars['String']['input'];
  remark: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalBusinessFormMutation = {
  __typename?: 'Mutation';
  updateHospitalBusinessForm: {
    __typename?: 'HospitalBusinessForm';
    business_hour: string;
  };
};
