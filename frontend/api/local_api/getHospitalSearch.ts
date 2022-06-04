import { gql } from '@apollo/client';

export const getHospitalSearch = gql`
  query LocalGetHospitalSearch {
    hospitalSearch {
      searchText
      currentLocation {
        latitude
        longitude
      }
    }
  }
`;
