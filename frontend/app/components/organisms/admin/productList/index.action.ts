'use server';

import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import { getProductConnection } from './index.api';
import type { GetProductConnectionQueryVariables } from './index.api.generated';

export type GetProductsMoreActionResponse = ReturnType<
  typeof getProductsMoreAction
>;

export async function getProductsMoreAction(
  variables: GetProductConnectionQueryVariables,
) {
  const { data } = await getProductConnection(variables);

  return {
    pageInfo: data.productConnection?.pageInfo,
    products: getNodesFromConnectionEdges(data.productConnection?.edges),
  };
}
