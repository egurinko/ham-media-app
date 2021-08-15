import { gql } from '@apollo/client';

export const getHospitalIds = gql`
  query InternalGetHospitalIds {
    hospitals {
      id
    }
  }
`;
