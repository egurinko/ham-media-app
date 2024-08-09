import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetInternalUserProfileQuery,
  GetInternalUserProfileQueryVariables,
} from './layout.api.generated';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getInternalUserProfileGql = gql`
  query GetInternalUserProfile {
    session {
      internalUser {
        name
      }
    }
  }
`;

export const getInternalUserProfile = async (
  variables: GetInternalUserProfileQueryVariables,
): Promise<ApolloQueryResult<GetInternalUserProfileQuery>> =>
  await getInternalClient().query<
    GetInternalUserProfileQuery,
    GetInternalUserProfileQueryVariables
  >({
    query: getInternalUserProfileGql,
    variables,
  });
