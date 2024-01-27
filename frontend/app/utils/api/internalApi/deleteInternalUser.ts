import { getInternalClient } from '@/app/utils/client';
import { deleteInternalUser as deleteInternalUserGql } from '@/services/api/internal_api/deleteInternalUser';
import type {
  InternalDeleteInternalUserMutation,
  InternalDeleteInternalUserMutationVariables,
} from '@/services/api/internal_api/types';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const deleteInternalUser = async (
  variables: InternalDeleteInternalUserMutationVariables,
): Promise<FetchResult<InternalDeleteInternalUserMutation>> =>
  await getInternalClient().mutate<
    InternalDeleteInternalUserMutation,
    InternalDeleteInternalUserMutationVariables
  >({
    mutation: deleteInternalUserGql,
    variables,
  });
