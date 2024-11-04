'use server';

import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import { getHospitalConnection } from './index.api';
import type { GetHospitalConnectionQueryVariables } from './index.api.generated';

export type GetHospitalsMoreActionResponse = ReturnType<
  typeof getHospitalsMoreAction
>;

export async function getHospitalsMoreAction(
  variables: GetHospitalConnectionQueryVariables,
) {
  const { data } = await getHospitalConnection(variables);

  return {
    pageInfo: data.hospitalConnection?.pageInfo,
    hospitals: getNodesFromConnectionEdges(data.hospitalConnection?.edges),
  };
}
