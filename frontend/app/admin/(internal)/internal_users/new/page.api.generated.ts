import type * as Types from '@/app/utils/api/types';

export type GetRolesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
  __typename?: 'Query';
  roles: Array<{ __typename?: 'Role'; id: number; name: string }>;
};

export type CreateInternalUserMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  discord_user_id: Types.Scalars['String']['input'];
  roleId: Types.Scalars['Int']['input'];
}>;

export type CreateInternalUserMutation = {
  __typename?: 'Mutation';
  createInternalUser: { __typename?: 'InternalUser'; id: number };
};
