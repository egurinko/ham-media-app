import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalInternalReputationQuery,
  GetEditableHospitalInternalReputationQueryVariables,
} from './index.api.generated';

const getHospitalInternalReputationGql = gql`
  query GetEditableHospitalInternalReputation($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalInternalReputation {
        star
        remark
      }
    }
  }
`;

export const getHospitalInternalReputation = async (
  variables: GetEditableHospitalInternalReputationQueryVariables,
): Promise<GetEditableHospitalInternalReputationQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalInternalReputationQuery,
    GetEditableHospitalInternalReputationQueryVariables
  >({
    query: getHospitalInternalReputationGql,
    variables,
  });

  return data.hospital;
};
