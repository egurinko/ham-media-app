import { getPublicClient } from '@/app/utils/client';
import { getPrefectures as getPrefecturesGql } from '@/services/api/public_api/getPrefectures';
import type {
  PublicGetPrefecturesQuery,
  PublicGetPrefecturesQueryVariables,
} from '@/services/api/public_api/types';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getPrefectures = async (): Promise<
  ApolloQueryResult<PublicGetPrefecturesQuery>
> =>
  await getPublicClient().query<
    PublicGetPrefecturesQuery,
    PublicGetPrefecturesQueryVariables
  >({
    query: getPrefecturesGql,
  });
