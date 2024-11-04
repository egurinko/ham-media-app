import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalCertificationOptionQuery,
  GetEditableHospitalCertificationOptionQueryVariables,
} from './index.api.generated';

const getHospitalCertificationOptionGql = gql`
  query GetEditableHospitalCertificationOption($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalCertificationOption {
        nichiju_registered
        jsava_registered
      }
    }
  }
`;

export const getHospitalCertificationOption = async (
  variables: GetEditableHospitalCertificationOptionQueryVariables,
): Promise<GetEditableHospitalCertificationOptionQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalCertificationOptionQuery,
    GetEditableHospitalCertificationOptionQueryVariables
  >({
    query: getHospitalCertificationOptionGql,
    variables,
  });

  return data.hospital;
};
