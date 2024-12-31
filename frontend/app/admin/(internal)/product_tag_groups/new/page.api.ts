import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateProductTagGroupMutation,
  CreateProductTagGroupMutationVariables,
} from './page.api.generated';
import type { FetchResult } from '@apollo/client';

const createProductTagGroupGql = gql`
  mutation CreateProductTagGroup($name: String!) {
    createProductTagGroup(name: $name) {
      id
    }
  }
`;

export const createProductTagGroup = async (
  variables: CreateProductTagGroupMutationVariables,
): Promise<FetchResult<CreateProductTagGroupMutation>> =>
  await getInternalClient().mutate<
    CreateProductTagGroupMutation,
    CreateProductTagGroupMutationVariables
  >({
    mutation: createProductTagGroupGql,
    variables,
  });
