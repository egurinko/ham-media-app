/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as Types from '@/app/utils/api/types';

export type GetRolesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
  __typename?: 'Query';
  roles: Array<{ __typename?: 'Role'; id: number; name: string }>;
};

export type GetInternalUserQueryVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
}>;

export type GetInternalUserQuery = {
  __typename?: 'Query';
  internalUser: {
    __typename?: 'InternalUser';
    id: number;
    name: string;
    email: string;
    discord_user_id: string;
    role: { __typename?: 'Role'; id: number };
  };
};

export type UpdateInternalUserMutationVariables = Types.Exact<{
  id: Types.Scalars['BigInt']['input'];
  name: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  discord_user_id: Types.Scalars['String']['input'];
  roleId: Types.Scalars['Int']['input'];
}>;

export type UpdateInternalUserMutation = {
  __typename?: 'Mutation';
  updateInternalUser: { __typename?: 'InternalUser'; id: number };
};
