import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalNightUrgentActionOptionQuery,
  GetEditableHospitalNightUrgentActionOptionQueryVariables,
} from './index.api.generated';

const getHospitalNightUrgentActionOptionGql = gql`
  query GetEditableHospitalNightUrgentActionOption($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalNightUrgentActionOption {
        status
      }
    }
  }
`;

export const getHospitalNightUrgentActionOption = async (
  variables: GetEditableHospitalNightUrgentActionOptionQueryVariables,
): Promise<GetEditableHospitalNightUrgentActionOptionQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalNightUrgentActionOptionQuery,
    GetEditableHospitalNightUrgentActionOptionQueryVariables
  >({
    query: getHospitalNightUrgentActionOptionGql,
    variables,
  });

  return data.hospital;
};
