import { getInternalClient } from '@/app/utils/client';
import { createInternalUser as createInternalUserGql } from '@/services/api/internal_api/createInternalUser';
import type {
  InternalCreateInternalUserMutation,
  InternalCreateInternalUserMutationVariables,
} from '@/services/api/internal_api/types';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const createInternalUser = async (
  variables: InternalCreateInternalUserMutationVariables,
): Promise<FetchResult<InternalCreateInternalUserMutation>> =>
  await getInternalClient().mutate<
    InternalCreateInternalUserMutation,
    InternalCreateInternalUserMutationVariables
  >({
    mutation: createInternalUserGql,
    variables,
  });
