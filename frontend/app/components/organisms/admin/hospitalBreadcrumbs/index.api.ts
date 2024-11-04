import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetBreadcrumbsHospitalQuery,
  GetBreadcrumbsHospitalQueryVariables,
} from './index.api.generated';
import type { ApolloQueryResult } from '@apollo/client';

const getHospitalGql = gql`
  query GetBreadcrumbsHospital($id: BigInt!) {
    hospital(id: $id) {
      id
      name
    }
  }
`;

export const getHospital = async (
  variables: GetBreadcrumbsHospitalQueryVariables,
): Promise<ApolloQueryResult<GetBreadcrumbsHospitalQuery>> =>
  await getInternalClient().query<
    GetBreadcrumbsHospitalQuery,
    GetBreadcrumbsHospitalQueryVariables
  >({
    query: getHospitalGql,
    variables,
  });
