import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  InternalGetInternalUsersQuery,
  InternalGetInternalUsersQueryVariables,
} from '@/services/api/internal_api/types';
import { INTERNAL_USER_LISTE_ITEM_FIELDS } from './listItem.api';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

const getInternalUsersGql = gql`
  ${INTERNAL_USER_LISTE_ITEM_FIELDS}
  query GetInternalUsers {
    internalUsers {
      ...InternalUserListItemFields
    }
  }
`;

export const getInternalUsers = async (
  variables: InternalGetInternalUsersQueryVariables,
): Promise<ApolloQueryResult<InternalGetInternalUsersQuery>> =>
  await getInternalClient().query<
    InternalGetInternalUsersQuery,
    InternalGetInternalUsersQueryVariables
  >({
    query: getInternalUsersGql,
    variables,
  });
