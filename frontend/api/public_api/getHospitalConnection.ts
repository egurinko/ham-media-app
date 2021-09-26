import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospitalConnection = gql`
  ${HOSPITAL_FIELDS}
  query PublicGetHospitalConnection(
    $first: Int
    $after: String
    $searchText: String!
    $reservable: Boolean!
    $nightServiceOption: Boolean!
    $insuranceEnabled: Boolean!
    $jsavaOption: Boolean!
    $nichijuOption: Boolean!
  ) {
    publicHospitalConnection(
      first: $first
      after: $after
      searchText: $searchText
      reservable: $reservable
      nightServiceOption: $nightServiceOption
      insuranceEnabled: $insuranceEnabled
      jsavaOption: $jsavaOption
      nichijuOption: $nichijuOption
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
