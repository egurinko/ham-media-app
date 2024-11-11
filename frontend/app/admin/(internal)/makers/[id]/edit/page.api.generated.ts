import type * as Types from '@/app/utils/api/types';

export type GetMakerQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetMakerQuery = {
  __typename?: 'Query';
  maker: { __typename?: 'Maker'; id: number; name: string };
};

export type UpdateMakerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;

export type UpdateMakerMutation = {
  __typename?: 'Mutation';
  updateMaker: { __typename?: 'Maker'; id: number };
};
