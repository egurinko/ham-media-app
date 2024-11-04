import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import { HOSPITAL_LIST_ITEM_FIELDS } from './listItem.api';
import type {
  GetHospitalConnectionQuery,
  GetHospitalConnectionQueryVariables,
} from './index.api.generated';
import type { ApolloQueryResult } from '@apollo/client';

const getHospitalConnectionGql = gql`
  ${HOSPITAL_LIST_ITEM_FIELDS}
  query GetHospitalConnection(
    $first: Int
    $after: String
    $name: String
    $deleted: Boolean!
    $prefectureId: BigInt
    $internalReputationStar: Int
  ) {
    hospitalConnection(
      first: $first
      after: $after
      name: $name
      deleted: $deleted
      prefectureId: $prefectureId
      internalReputationStar: $internalReputationStar
    ) {
      edges {
        node {
          ...HospitalListItemFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const getHospitalConnection = async (
  variables: GetHospitalConnectionQueryVariables,
): Promise<ApolloQueryResult<GetHospitalConnectionQuery>> =>
  await getInternalClient().query<
    GetHospitalConnectionQuery,
    GetHospitalConnectionQueryVariables
  >({
    query: getHospitalConnectionGql,
    variables,
  });
