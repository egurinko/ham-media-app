import type * as Types from '@/app/utils/api/types';

export type InternalUserListItemFieldsFragment = {
  __typename?: 'InternalUser';
  id: number;
  email: string;
  name: string;
  role: { __typename?: 'Role'; name: string };
};

export type DeleteInternalUserMutationVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type DeleteInternalUserMutation = {
  __typename?: 'Mutation';
  deleteInternalUser: { __typename?: 'Delete'; deleted: boolean };
};
