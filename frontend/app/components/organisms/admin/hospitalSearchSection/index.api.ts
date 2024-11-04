import { gql } from '@apollo/client';
import { getPublicClient } from '@/app/utils/client';
import type {
  GetPrefecturesQuery,
  GetPrefecturesQueryVariables,
} from './index.api.generated';
import type { ApolloQueryResult } from '@apollo/client';
import 'server-only';

const getPrefecturesGql = gql`
  query GetPrefectures {
    prefectures {
      id
      name
    }
  }
`;

export const getPrefectures = async (): Promise<
  ApolloQueryResult<GetPrefecturesQuery>
> =>
  await getPublicClient().query<
    GetPrefecturesQuery,
    GetPrefecturesQueryVariables
  >({
    query: getPrefecturesGql,
  });
