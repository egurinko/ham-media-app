import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  DeleteInternalUserMutation,
  DeleteInternalUserMutationVariables,
} from './listItem.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const INTERNAL_USER_LISTE_ITEM_FIELDS = gql`
  fragment InternalUserListItemFields on InternalUser {
    id
    email
    name
    role {
      name
    }
  }
`;

const deleteInternalUserGql = gql`
  mutation DeleteInternalUser($id: BigInt!) {
    deleteInternalUser(id: $id) {
      deleted
    }
  }
`;

export const deleteInternalUser = async (
  variables: DeleteInternalUserMutationVariables,
): Promise<FetchResult<DeleteInternalUserMutation>> =>
  await getInternalClient().mutate<
    DeleteInternalUserMutation,
    DeleteInternalUserMutationVariables
  >({
    mutation: deleteInternalUserGql,
    variables,
  });
