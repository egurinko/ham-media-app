import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospitalConnection = gql`
  ${HOSPITAL_FIELDS}
  query PublicGetHospitalConnection(
    $first: Int
    $after: String
    $searchText: String!
    $currentLocation: currentLocation
    $reservable: Boolean!
    $nightServiceOption: Boolean!
    $insuranceEnabled: Boolean!
    $jsavaOption: Boolean!
    $nichijuOption: Boolean!
    $recommended: Boolean!
  ) {
    publicHospitalConnection(
      first: $first
      after: $after
      searchText: $searchText
      currentLocation: $currentLocation
      reservable: $reservable
      nightServiceOption: $nightServiceOption
      insuranceEnabled: $insuranceEnabled
      jsavaOption: $jsavaOption
      nichijuOption: $nichijuOption
      recommended: $recommended
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
