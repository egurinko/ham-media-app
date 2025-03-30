import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  ApproveStockRequestMutationVariables,
  ApproveStockRequestMutation,
  RejectStockRequestMutation,
  RejectStockRequestMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';

const approveStockRequestGql = gql`
  mutation ApproveStockRequest($id: Int!, $message: String!) {
    approveStockRequest(id: $id, message: $message) {
      deleted
    }
  }
`;

export const approveStockRequest = async (
  variables: ApproveStockRequestMutationVariables,
): Promise<FetchResult<ApproveStockRequestMutation>> =>
  await getInternalClient().mutate<
    ApproveStockRequestMutation,
    ApproveStockRequestMutationVariables
  >({
    mutation: approveStockRequestGql,
    variables,
  });

const rejectStockRequestGql = gql`
  mutation RejectStockRequest($id: Int!, $message: String!) {
    rejectStockRequest(id: $id, message: $message) {
      deleted
    }
  }
`;

export const rejectStockRequest = async (
  variables: RejectStockRequestMutationVariables,
): Promise<FetchResult<RejectStockRequestMutation>> =>
  await getInternalClient().mutate<
    RejectStockRequestMutation,
    RejectStockRequestMutationVariables
  >({
    mutation: rejectStockRequestGql,
    variables,
  });
