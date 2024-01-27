import { getInternalClient } from '@/app/utils/client';
import { getInternalUsers as getInternalUsersGql } from '@/services/api/internal_api/getInternalUsers';
import type {
  InternalGetInternalUsersQuery,
  InternalGetInternalUsersQueryVariables,
} from '@/services/api/internal_api/types';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

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
