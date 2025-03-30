import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateStockRequestMutation,
  UpdateStockRequestMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';

const updateStockRequestGql = gql`
  mutation UpdateStockRequest(
    $id: Int!
    $requestProducts: [CreateStockRequestRequestProductsInputType!]!
  ) {
    updateStockRequest(id: $id, requestProducts: $requestProducts) {
      id
    }
  }
`;

export const updateStockRequest = async (
  variables: UpdateStockRequestMutationVariables,
): Promise<FetchResult<UpdateStockRequestMutation>> =>
  await getInternalClient().mutate<
    UpdateStockRequestMutation,
    UpdateStockRequestMutationVariables
  >({
    mutation: updateStockRequestGql,
    variables,
  });
