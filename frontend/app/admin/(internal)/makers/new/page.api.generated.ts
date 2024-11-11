import type * as Types from '@/app/utils/api/types';

export type CreateMakerMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;

export type CreateMakerMutation = {
  __typename?: 'Mutation';
  createMaker: { __typename?: 'Maker'; id: number };
};
