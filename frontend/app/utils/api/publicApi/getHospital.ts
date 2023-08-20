import { getPublicClient } from '@/app/utils/client';
import { getHospital as getHospitalGql } from '@/services/api/public_api/getHospital';
import type {
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/services/api/public_api/types';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getHospital = async (
  id: string
): Promise<ApolloQueryResult<PublicGetHospitalQuery>> =>
  await getPublicClient().query<
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
