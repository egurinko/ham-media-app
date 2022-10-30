import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospital = gql`
  ${HOSPITAL_FIELDS}
  query InternalGetHospital($id: BigInt!) {
    hospital(id: $id) {
      ...HospitalFields
    }
  }
`;
