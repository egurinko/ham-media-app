import { gql } from '@apollo/client';

export const getHospitalIds = gql`
  query PublicGetHospitalIds {
    hospitals {
      id
    }
  }
`;
