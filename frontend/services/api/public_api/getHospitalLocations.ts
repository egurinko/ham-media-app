import { gql } from '@apollo/client';

export const getHospitalIds = gql`
  query PublicGetHospitalLocations {
    hospitals {
      id
      name
      url
      hospitalAddress {
        id
        address
        phone_number
        hospitalAddressGeoLocation {
          latitude
          longitude
        }
      }
    }
  }
`;
