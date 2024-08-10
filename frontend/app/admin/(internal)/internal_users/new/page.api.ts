import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateInternalUserMutation,
  CreateInternalUserMutationVariables,
  GetRolesQuery,
  GetRolesQueryVariables,
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

const createInternalUserGql = gql`
  mutation CreateInternalUser(
    $name: String!
    $email: String!
    $password: String!
    $discord_user_id: String!
    $roleId: Int!
  ) {
    createInternalUser(
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

export const createInternalUser = async (
  variables: CreateInternalUserMutationVariables,
): Promise<FetchResult<CreateInternalUserMutation>> =>
  await getInternalClient().mutate<
    CreateInternalUserMutation,
    CreateInternalUserMutationVariables
  >({
    mutation: createInternalUserGql,
    variables,
  });
