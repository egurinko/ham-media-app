'use server';

import { getHospitalConnection } from '@/app/utils/api/publicApi/getHospitalConnection';
import type { PublicGetHospitalConnectionQueryVariables } from '@/services/api/public_api/types';

export async function getHospitalsMore(
  variables: PublicGetHospitalConnectionQueryVariables,
) {
  const { data } = await getHospitalConnection(variables);

  return data;
}
