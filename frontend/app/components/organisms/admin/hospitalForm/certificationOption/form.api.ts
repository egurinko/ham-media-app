import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalCertificationOptionMutation,
  UpdateHospitalCertificationOptionMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const updateHospitalCertificationOptionGql = gql`
  mutation UpdateHospitalCertificationOption(
    $hospitalId: BigInt!
    $nichijuRegistered: String!
    $jsavaRegistered: String!
  ) {
    updateHospitalCertificationOption(
      hospital_id: $hospitalId
      nichiju_registered: $nichijuRegistered
      jsava_registered: $jsavaRegistered
    ) {
      nichiju_registered
      jsava_registered
    }
  }
`;

export const updateHospitalCertificationOption = async (
  variables: UpdateHospitalCertificationOptionMutationVariables,
): Promise<FetchResult<UpdateHospitalCertificationOptionMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalCertificationOptionMutation,
    UpdateHospitalCertificationOptionMutationVariables
  >({
    mutation: updateHospitalCertificationOptionGql,
    variables,
  });
