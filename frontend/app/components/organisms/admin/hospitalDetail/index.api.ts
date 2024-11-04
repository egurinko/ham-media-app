import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetHospitalDetailQuery,
  GetHospitalDetailQueryVariables,
} from './index.api.generated';
import type { ApolloQueryResult } from '@apollo/client';

const getHospitalGql = gql`
  query GetHospitalDetail($id: BigInt!) {
    hospital(id: $id) {
      id
      name
      url
      deleted
      internal_memo
      hospitalAddress {
        id
        address
        phone_number
        prefecture {
          name
        }
        hospitalAddressGeoLocation {
          latitude
          longitude
        }
      }
      hospitalBusinessForm {
        business_hour
        closed_day
        insurance_enabled
        remark
      }
      hospitalCertificationOption {
        nichiju_registered
        jsava_registered
      }
      hospitalInternalReputation {
        star
        remark
      }
      hospitalNightServiceOption {
        status
        remark
      }
      hospitalNightUrgentActionOption {
        status
      }
      hospitalReservationStatus {
        required
        reservable
        remark
      }
    }
  }
`;

export const getHospital = async (
  variables: GetHospitalDetailQueryVariables,
): Promise<ApolloQueryResult<GetHospitalDetailQuery>> =>
  await getInternalClient().query<
    GetHospitalDetailQuery,
    GetHospitalDetailQueryVariables
  >({
    query: getHospitalGql,
    variables,
  });
