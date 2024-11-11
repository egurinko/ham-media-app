import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  DeleteMakerMutation,
  DeleteMakerMutationVariables,
} from './listItem.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const MAKER_LIST_ITEM_FIELDS = gql`
  fragment MakerListItemFields on Maker {
    id
    name
  }
`;

const deleteMakerGql = gql`
  mutation DeleteMaker($id: Int!) {
    deleteMaker(id: $id) {
      deleted
    }
  }
`;

export const deleteMaker = async (
  variables: DeleteMakerMutationVariables,
): Promise<FetchResult<DeleteMakerMutation>> =>
  await getInternalClient().mutate<
    DeleteMakerMutation,
    DeleteMakerMutationVariables
  >({
    mutation: deleteMakerGql,
    variables,
  });
