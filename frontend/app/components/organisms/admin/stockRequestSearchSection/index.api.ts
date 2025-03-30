import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetStockRequestInternalUsersQuery,
  GetStockRequestInternalUsersQueryVariables,
} from './index.api.generated';
import 'server-only';

const getStockRequestInternalUsersGql = gql`
  query GetStockRequestInternalUsers {
    internalUsers {
      value: id
      label: name
    }
  }
`;

export const getStockRequestInternalUsers = async (): Promise<
  { value: string; label: string }[]
> => {
  const { data } = await getInternalClient().query<
    GetStockRequestInternalUsersQuery,
    GetStockRequestInternalUsersQueryVariables
  >({
    query: getStockRequestInternalUsersGql,
  });
  return data.internalUsers.map((internalUser) => ({
    value: String(internalUser.value),
    label: internalUser.label,
  }));
};
