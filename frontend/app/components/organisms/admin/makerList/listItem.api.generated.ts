import type * as Types from '@/app/utils/api/types';

export type MakerListItemFieldsFragment = {
  __typename?: 'Maker';
  id: number;
  name: string;
};

export type DeleteMakerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeleteMakerMutation = {
  __typename?: 'Mutation';
  deleteMaker: { __typename?: 'Delete'; deleted: boolean };
};
