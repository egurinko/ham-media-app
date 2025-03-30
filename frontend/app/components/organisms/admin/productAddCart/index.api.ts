import { gql } from '@apollo/client';
import { PRODUCT_LIST_ITEM_FIELDS } from '@/app/components/organisms/admin/productListItem/index.api';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetProductQuery,
  GetProductQueryVariables,
} from './index.api.generated';

const getProductGql = gql`
  ${PRODUCT_LIST_ITEM_FIELDS}
  query GetProduct($id: Int!) {
    product(id: $id) {
      ...ProductListItemFields
    }
  }
`;

export const getProduct = async (
  variables: GetProductQueryVariables,
): Promise<GetProductQuery['product']> => {
  const { data } = await getInternalClient().query<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: getProductGql,
    variables,
  });
  return data.product;
};
