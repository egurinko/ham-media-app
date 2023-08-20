import { getPublicClient } from '@/app/utils/client';
import { getHospital as getHospitalGql } from '@/services/api/public_api/getHospital';
import type {
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/services/api/public_api/types';
import 'server-only';

export const getHospital = async (
  id: string
): Promise<PublicGetHospitalQuery['hospital']> => {
  const { data } = await getPublicClient().query<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >({
    query: getHospitalGql,
    variables: { id: Number(id) },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return data.hospital;
};
