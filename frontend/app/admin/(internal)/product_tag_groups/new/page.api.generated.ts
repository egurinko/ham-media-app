import type * as Types from '@/app/utils/api/types';

export type CreateProductTagGroupMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;

export type CreateProductTagGroupMutation = {
  __typename?: 'Mutation';
  createProductTagGroup: { __typename?: 'ProductTagGroup'; id: number };
};
