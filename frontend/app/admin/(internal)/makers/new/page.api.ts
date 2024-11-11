import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateMakerMutation,
  CreateMakerMutationVariables,
} from './page.api.generated';
import type { FetchResult } from '@apollo/client';

const createMakerGql = gql`
  mutation CreateMaker($name: String!) {
    createMaker(name: $name) {
      id
    }
  }
`;

export const createMaker = async (
  variables: CreateMakerMutationVariables,
): Promise<FetchResult<CreateMakerMutation>> =>
  await getInternalClient().mutate<
    CreateMakerMutation,
    CreateMakerMutationVariables
  >({
    mutation: createMakerGql,
    variables,
  });
