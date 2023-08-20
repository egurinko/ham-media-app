import { getPublicClient } from '@/app/utils/client';
import { getHospitalIds as getHospitalIdsGql } from '@/services/api/public_api/getHospitalIds';
import type {
  PublicGetHospitalIdsQueryVariables,
  PublicGetHospitalIdsQuery,
} from '@/services/api/public_api/types';
import 'server-only';
import type { ApolloQueryResult } from '@apollo/client';

export const getHospitalIds = async (): Promise<
  ApolloQueryResult<PublicGetHospitalIdsQuery>
> =>
  await getPublicClient().query<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >({
    query: getHospitalIdsGql,
  });
