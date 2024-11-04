import type * as Types from '@/app/utils/api/types';

export type UpdateHospitalMutationVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
  name: Types.Scalars['String']['input'];
  url: Types.Scalars['String']['input'];
  deleted: Types.Scalars['Boolean']['input'];
  internalMemo: Types.Scalars['String']['input'];
}>;

export type UpdateHospitalMutation = {
  __typename?: 'Mutation';
  updateHospitalBase: { __typename?: 'Hospital'; id: number };
};

export type GetEditableHospitalQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetEditableHospitalQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    name: string;
    url: string;
    deleted: boolean;
    internal_memo: string;
  };
};
