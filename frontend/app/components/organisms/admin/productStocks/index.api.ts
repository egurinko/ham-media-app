import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetStocksQuery,
  GetStocksQueryVariables,
  GetInternalUsersForAllocationQuery,
  GetInternalUsersForAllocationQueryVariables,
} from './index.api.generated';

const getStocksGql = gql`
  query GetStocks($productId: Int!) {
    stocks(productId: $productId) {
      id
      expired_at
      created_at
      internalUser {
        id
        email
        name
      }
      stockAllocation {
        created_at
        id
        internalUser {
          id
          email
          name
        }
      }
    }
  }
`;

export const getProductStocks = async (
  variables: GetStocksQueryVariables,
): Promise<GetStocksQuery['stocks']> => {
  const { data } = await getInternalClient().query<
    GetStocksQuery,
    GetStocksQueryVariables
  >({
    query: getStocksGql,
    variables,
  });
  return data.stocks;
};

const getInternalUsersGql = gql`
  query GetInternalUsersForAllocation {
    internalUsers {
      id
      name
      role {
        id
        name
      }
    }
  }
`;

export const getInternalUsers = async (
  variables: GetInternalUsersForAllocationQueryVariables,
): Promise<{
  adminInternalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
  internalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
}> => {
  const { data } = await getInternalClient().query<
    GetInternalUsersForAllocationQuery,
    GetInternalUsersForAllocationQueryVariables
  >({
    query: getInternalUsersGql,
    variables,
  });
  const adminInternalUsers = data.internalUsers.filter(
    (internalUser) => internalUser.role.name === 'admin',
  );
  return {
    adminInternalUsers,
    internalUsers: data.internalUsers,
  };
};
