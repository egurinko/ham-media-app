import { gql } from '@apollo/client';

export const updateHospital = gql`
  mutation InternalUpdateHospital(
    $id: BigInt!
    $name: String!
    $url: String!
    $deleted: Boolean!
    $internal_memo: String!
    $hospitalAddressInput: HospitalAddressInputType!
    $hospitalBusinessFormInput: HospitalBusinessFormInputType!
    $hospitalCertificationOptionInput: HospitalCertificationOptionInputType!
    $hospitalInternalReputationInput: HospitalInternalReputationInputType!
    $hospitalNightServiceOptionInput: HospitalNightServiceOptionInputType!
    $hospitalNightUrgentActionOptionInput: HospitalNightUrgentActionOptionInputType!
    $hospitalReservationStatusInput: HospitalReservationStatusInputType!
  ) {
    updateHospital(
      id: $id
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internal_memo
      hospitalAddressInput: $hospitalAddressInput
      hospitalBusinessFormInput: $hospitalBusinessFormInput
      hospitalCertificationOptionInput: $hospitalCertificationOptionInput
      hospitalInternalReputationInput: $hospitalInternalReputationInput
      hospitalNightServiceOptionInput: $hospitalNightServiceOptionInput
      hospitalNightUrgentActionOptionInput: $hospitalNightUrgentActionOptionInput
      hospitalReservationStatusInput: $hospitalReservationStatusInput
    ) {
      name
    }
  }
`;
