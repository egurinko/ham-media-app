import { gql } from '@apollo/client';

export const HOSPITAL_CERTIFICATION_OPTION_FIELDS = gql`
  fragment HospitalCertificationOptionFields on HospitalCertificationOption {
    id
    nichiju_registered
    jsava_registered
  }
`;
