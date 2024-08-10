import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetRolesQuery,
  GetRolesQueryVariables,
  GetInternalUserQuery,
  GetInternalUserQueryVariables,
  UpdateInternalUserMutation,
  UpdateInternalUserMutationVariables,
} from './page.api.generated';
import type { ApolloQueryResult, FetchResult } from '@apollo/client';
import 'server-only';

const getRolesGql = gql`
  query GetRoles {
    roles {
      id
      name
    }
  }
`;

export const getRoles = async (
  variables: GetRolesQueryVariables,
): Promise<ApolloQueryResult<GetRolesQuery>> =>
  await getInternalClient().query<GetRolesQuery, GetRolesQueryVariables>({
    query: getRolesGql,
    variables,
  });

const getInternalUserGql = gql`
  query GetInternalUser($id: BigInt!) {
    internalUser(id: $id) {
      id
      name
      email
      discord_user_id
      role {
        id
      }
    }
  }
`;

export const getInternalUser = async (
  variables: GetInternalUserQueryVariables,
): Promise<ApolloQueryResult<GetInternalUserQuery>> =>
  await getInternalClient().query<
    GetInternalUserQuery,
    GetInternalUserQueryVariables
  >({
    query: getInternalUserGql,
    variables,
  });

const updateInternalUserGql = gql`
  mutation UpdateInternalUser(
    $id: BigInt!
    $name: String!
    $email: String!
    $password: String!
    $discord_user_id: String!
    $roleId: Int!
  ) {
    updateInternalUser(
      id: $id
      name: $name
      email: $email
      password: $password
      discord_user_id: $discord_user_id
      roleId: $roleId
    ) {
      id
    }
  }
`;

export const updateInternalUser = async (
  variables: UpdateInternalUserMutationVariables,
): Promise<FetchResult<UpdateInternalUserMutation>> =>
  await getInternalClient().mutate<
    UpdateInternalUserMutation,
    UpdateInternalUserMutationVariables
  >({
    mutation: updateInternalUserGql,
    variables,
  });
