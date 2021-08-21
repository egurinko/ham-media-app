import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const createHospital = gql`
  ${HOSPITAL_FIELDS}
  mutation InternalCreateHospital(
    $name: String!
    $url: String!
    $deleted: Boolean!
    $internal_memo: String!
  ) {
    createHospital(
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internal_memo
    ) {
      ...HospitalFields
    }
  }
`;
