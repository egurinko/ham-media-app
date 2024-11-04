import type * as Types from '@/app/utils/api/types';

export type CreateHospitalMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  deleted: Types.Scalars['Boolean']['input'];
  internal_memo: Types.Scalars['String']['input'];
}>;

export type CreateHospitalMutation = {
  __typename?: 'Mutation';
  createHospital: { __typename?: 'Hospital'; id: number };
};
