import { getPublicClient } from '@/app/utils/client';
import { getHospitalIds as getHospitalIdsGql } from '@/services/api/public_api/getHospitalIds';
import type {
  PublicGetHospitalIdsQueryVariables,
  PublicGetHospitalIdsQuery,
} from '@/services/api/public_api/types';
import 'server-only';

export const getHospitalIds = async (): Promise<number[]> => {
  const { data } = await getPublicClient().query<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >({
    query: getHospitalIdsGql,
  });

  return data.hospitals.map((h) => h.id);
};
