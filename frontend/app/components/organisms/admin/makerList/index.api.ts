import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import { MAKER_LIST_ITEM_FIELDS } from './listItem.api';
import type {
  GetMakersQuery,
  GetMakersQueryVariables,
} from './index.api.generated';

const getMakersGql = gql`
  ${MAKER_LIST_ITEM_FIELDS}
  query GetMakers {
    makers {
      ...MakerListItemFields
    }
  }
`;

export const getMakers = async (
  variables: GetMakersQueryVariables,
): Promise<GetMakersQuery['makers']> => {
  const { data } = await getInternalClient().query<
    GetMakersQuery,
    GetMakersQueryVariables
  >({
    query: getMakersGql,
    variables,
  });
  return data.makers;
};
