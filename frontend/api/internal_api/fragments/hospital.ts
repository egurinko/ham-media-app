import { gql } from '@apollo/client';
import { HOSPITAL_ADDRESS_FIELDS } from './hospital/address';
import { HOSPITAL_BUSINESS_FORM_FIELDS } from './hospital/businessForm';
import { HOSPITAL_CERTIFICATION_OPTION_FIELDS } from './hospital/certificationOption';
import { HOSPITAL_INTERNAL_REPUTATION_FIELDS } from './hospital/internalReputation';
import { HOSPITAL_NIGHT_SERVICE_OPTION_FIELDS } from './hospital/nightServiceOption';
import { HOSPITAL_NIGHT_URGENT_ACTION_OPTION_FIELDS } from './hospital/nightUrgentActionOption';
import { HOSPITAL_RESERVATION_STATUS_FIELDS } from './hospital/reservationStatus';

export const HOSPITAL_FIELDS = gql`
  ${HOSPITAL_ADDRESS_FIELDS}
  ${HOSPITAL_BUSINESS_FORM_FIELDS}
  ${HOSPITAL_CERTIFICATION_OPTION_FIELDS}
  ${HOSPITAL_INTERNAL_REPUTATION_FIELDS}
  ${HOSPITAL_NIGHT_SERVICE_OPTION_FIELDS}
  ${HOSPITAL_NIGHT_URGENT_ACTION_OPTION_FIELDS}
  ${HOSPITAL_RESERVATION_STATUS_FIELDS}
  fragment HospitalFields on Hospital {
    id
    name
    url
    deleted
    internal_memo
    hospitalAddress {
      ...HospitalAddressFields
    }
    hospitalBusinessForm {
      ...HospitalBusinessFormFields
    }
    hospitalCertificationOption {
      ...HospitalCertificationOptionFields
    }
    hospitalInternalReputation {
      ...HospitalInternalReputationFields
    }
    hospitalNightServiceOption {
      ...HospitalNightServiceOptionFields
    }
    hospitalNightUrgentActionOption {
      ...HospitalNightUrgentActionOptionFields
    }
    hospitalReservationStatus {
      ...HospitalReservationStatusFields
    }
  }
`;
