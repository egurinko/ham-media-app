import { gql } from '@apollo/client';

export const getHospitalSearch = gql`
  query LocalGetHospitalSearch {
    hospitalSearch @client {
      searchText
      currentLocation {
        latitude
        longitude
      }
    }
  }
`;
