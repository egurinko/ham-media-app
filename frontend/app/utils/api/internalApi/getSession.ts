import { getInternalClient } from '@/app/utils/client';
import { getSession as getSessionGql } from '@/services/api/internal_api/getSession';
import type {
  InternalGetSessionQuery,
  InternalGetSessionQueryVariables,
} from '@/services/api/internal_api/types';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getSession = async (
  variables: InternalGetSessionQueryVariables,
): Promise<ApolloQueryResult<InternalGetSessionQuery>> =>
  await getInternalClient().query<
    InternalGetSessionQuery,
    InternalGetSessionQueryVariables
  >({
    query: getSessionGql,
    variables,
  });
