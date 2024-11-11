import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetMakerQuery,
  GetMakerQueryVariables,
  UpdateMakerMutation,
  UpdateMakerMutationVariables,
} from './page.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const getMakerGql = gql`
  query GetMaker($id: Int!) {
    maker(id: $id) {
      id
      name
    }
  }
`;

export const getMaker = async (
  variables: GetMakerQueryVariables,
): Promise<GetMakerQuery['maker']> => {
  const { data } = await getInternalClient().query<
    GetMakerQuery,
    GetMakerQueryVariables
  >({
    query: getMakerGql,
    variables,
  });
  return data.maker;
};

const updateMakerGql = gql`
  mutation UpdateMaker($id: Int!, $name: String!) {
    updateMaker(id: $id, name: $name) {
      id
    }
  }
`;

export const updateMaker = async (
  variables: UpdateMakerMutationVariables,
): Promise<FetchResult<UpdateMakerMutation>> =>
  await getInternalClient().mutate<
    UpdateMakerMutation,
    UpdateMakerMutationVariables
  >({
    mutation: updateMakerGql,
    variables,
  });
