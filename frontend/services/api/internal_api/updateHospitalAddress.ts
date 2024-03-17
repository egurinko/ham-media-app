import { gql } from '@apollo/client';

export const updateHospitalAddress = gql`
  mutation InternalUpdateHospitalAddress(
    $hospitalId: BigInt!
    $address: String!
    $phoneNumber: String!
    $prefectureId: BigInt!
  ) {
    updateHospitalAddress(
      hospital_id: $hospitalId
      address: $address
      phone_number: $phoneNumber
      prefecture_id: $prefectureId
    ) {
      address
    }
  }
`;
