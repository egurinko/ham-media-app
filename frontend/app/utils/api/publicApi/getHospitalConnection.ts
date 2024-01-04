import { getPublicClient } from '@/app/utils/client';
import { getHospitalConnection as getHospitalConnectionGql } from '@/services/api/public_api/getHospitalConnection';
import type {
  PublicGetHospitalConnectionQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/services/api/public_api/types';
import type { ApolloQueryResult, DefaultContext } from '@apollo/client';
import 'server-only';

export const getHospitalConnection = async (
  variables: PublicGetHospitalConnectionQueryVariables,
  context?: DefaultContext,
): Promise<ApolloQueryResult<PublicGetHospitalConnectionQuery>> =>
  await getPublicClient().query<
    PublicGetHospitalConnectionQuery,
    PublicGetHospitalConnectionQueryVariables
  >({
    query: getHospitalConnectionGql,
    variables,
    context,
  });
