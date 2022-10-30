import { gql } from '@apollo/client';
import { HOSPITAL_FIELDS } from './fragments/hospital';

export const getHospital = gql`
  ${HOSPITAL_FIELDS}
  query PublicGetHospital($id: BigInt!) {
    hospital(id: $id) {
      ...HospitalFields
    }
  }
`;
