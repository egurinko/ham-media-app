import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  AllocateStockMutation,
  AllocateStockMutationVariables,
  ReturnStockMutation,
  ReturnStockMutationVariables,
  UpdateStockInternalUserMutation,
  UpdateStockInternalUserMutationVariables,
  DeleteStockMutation,
  DeleteStockMutationVariables,
} from './stockTableRow.api.generated';

const allocateStockGql = gql`
  mutation AllocateStock($id: Int!, $internalUserId: BigInt!) {
    allocateStock(id: $id, internalUserId: $internalUserId) {
      id
      stockAllocation {
        created_at
        id
        internalUser {
          id
          name
        }
      }
    }
  }
`;

export const allocateStock = async (
  variables: AllocateStockMutationVariables,
): Promise<AllocateStockMutation['allocateStock']> => {
  const { data } = await getInternalClient().mutate<
    AllocateStockMutation,
    AllocateStockMutationVariables
  >({
    mutation: allocateStockGql,
    variables,
  });
  return data!.allocateStock;
};

const returnStockGql = gql`
  mutation ReturnStock($id: Int!) {
    returnStock(id: $id) {
      id
    }
  }
`;

export const returnStock = async (
  variables: ReturnStockMutationVariables,
): Promise<ReturnStockMutation['returnStock']> => {
  const { data } = await getInternalClient().mutate<
    ReturnStockMutation,
    ReturnStockMutationVariables
  >({
    mutation: returnStockGql,
    variables,
  });
  return data!.returnStock;
};

const updateStockInternalUserGql = gql`
  mutation UpdateStockInternalUser($id: Int!, $internalUserId: BigInt!) {
    updateStockInternalUser(id: $id, internalUserId: $internalUserId) {
      id
    }
  }
`;

export const updateStockInternalUser = async (
  variables: UpdateStockInternalUserMutationVariables,
): Promise<UpdateStockInternalUserMutation['updateStockInternalUser']> => {
  const { data } = await getInternalClient().mutate<
    UpdateStockInternalUserMutation,
    UpdateStockInternalUserMutationVariables
  >({
    mutation: updateStockInternalUserGql,
    variables,
  });
  return data!.updateStockInternalUser;
};

const deleteStockGql = gql`
  mutation DeleteStock($id: Int!) {
    deleteStock(id: $id) {
      deleted
    }
  }
`;

export const deleteStock = async (
  variables: DeleteStockMutationVariables,
): Promise<DeleteStockMutation['deleteStock']> => {
  const { data } = await getInternalClient().mutate<
    DeleteStockMutation,
    DeleteStockMutationVariables
  >({
    mutation: deleteStockGql,
    variables,
  });
  return data!.deleteStock;
};
