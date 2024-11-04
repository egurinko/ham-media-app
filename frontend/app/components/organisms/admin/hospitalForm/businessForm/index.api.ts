import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalBusinessFormQuery,
  GetEditableHospitalBusinessFormQueryVariables,
} from './index.api.generated';

const getHospitalBusinessFormGql = gql`
  query GetEditableHospitalBusinessForm($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalBusinessForm {
        id
        business_hour
        closed_day
        insurance_enabled
        remark
      }
    }
  }
`;

export const getHospitalBusinessForm = async (
  variables: GetEditableHospitalBusinessFormQueryVariables,
): Promise<GetEditableHospitalBusinessFormQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalBusinessFormQuery,
    GetEditableHospitalBusinessFormQueryVariables
  >({
    query: getHospitalBusinessFormGql,
    variables,
  });

  return data.hospital;
};
