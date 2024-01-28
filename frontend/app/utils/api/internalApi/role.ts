import { getInternalClient } from '@/app/utils/client';
import { getRoles as getRolesGql } from '@/services/api/internal_api/getRoles';
import type {
  InternalGetRolesQuery,
  InternalGetRolesQueryVariables,
} from '@/services/api/internal_api/types';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getRoles = async (
  variables: InternalGetRolesQueryVariables,
): Promise<ApolloQueryResult<InternalGetRolesQuery>> =>
  await getInternalClient().query<
    InternalGetRolesQuery,
    InternalGetRolesQueryVariables
  >({
    query: getRolesGql,
    variables,
  });
