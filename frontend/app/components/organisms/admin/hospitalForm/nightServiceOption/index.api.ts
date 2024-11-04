import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalNightServiceOptionQuery,
  GetEditableHospitalNightServiceOptionQueryVariables,
} from './index.api.generated';

const getHospitalNightServiceOptionGql = gql`
  query GetEditableHospitalNightServiceOption($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalNightServiceOption {
        status
        remark
      }
    }
  }
`;

export const getHospitalNightServiceOption = async (
  variables: GetEditableHospitalNightServiceOptionQueryVariables,
): Promise<GetEditableHospitalNightServiceOptionQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalNightServiceOptionQuery,
    GetEditableHospitalNightServiceOptionQueryVariables
  >({
    query: getHospitalNightServiceOptionGql,
    variables,
  });

  return data.hospital;
};
