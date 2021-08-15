import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospitalConnection = gql`
  ${HOSPITAL_FIELDS}
  query InternalGetHospitalConnection($first: Int, $after: String) {
    hospitalConnection(first: $first, after: $after) {
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
