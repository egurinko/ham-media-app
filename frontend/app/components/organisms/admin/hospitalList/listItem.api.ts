import { gql } from '@apollo/client';

export const HOSPITAL_LIST_ITEM_FIELDS = gql`
  fragment HospitalListItemFields on Hospital {
    id
    name
    deleted
    hospitalAddress {
      address
      phone_number
      prefecture {
        name
      }
    }
  }
`;
