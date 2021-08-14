import { gql } from '@apollo/client';

export const getHospitalConnection = gql`
  query InternalGetHospitalConnection($first: Int, $after: String) {
    hospitalConnection(first: $first, after: $after) {
      edges {
        node {
          id
          name
          url
          deleted
          hospitalAddress {
            address
            phone_number
            prefecture {
              name
            }
          }
          hospitalInternalReputation {
            star
          }
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
