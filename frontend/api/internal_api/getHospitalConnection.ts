import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospitalConnection = gql`
  ${HOSPITAL_FIELDS}
  query InternalGetHospitalConnection(
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
          ...HospitalFields
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
