import { gql } from '@apollo/client';
import { PRODUCT_LIST_ITEM_FIELDS } from '@/app/components/organisms/admin/productListItem/index.api';
import type { ProductListItemFieldsFragment } from '@/app/components/organisms/admin/productListItem/index.api.generated';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetStockRequestQuery,
  GetStockRequestQueryVariables,
} from './page.api.generated';

const getStockRequestGql = gql`
  ${PRODUCT_LIST_ITEM_FIELDS}
  query GetStockRequest($id: Int!) {
    stockRequest(id: $id) {
      id
      internalUser {
        name
        id
      }
      productRegistrations {
        id
        product {
          ...ProductListItemFields
        }
      }
    }
  }
`;

type CartProducts = {
  productId: number;
  count: number;
  product: ProductListItemFieldsFragment;
}[];

export const getStockRequest = async (
  variables: GetStockRequestQueryVariables,
): Promise<{
  id: GetStockRequestQuery['stockRequest']['id'];
  internalUser: GetStockRequestQuery['stockRequest']['internalUser'];
  cartProducts: CartProducts;
}> => {
  const { data } = await getInternalClient().query<
    GetStockRequestQuery,
    GetStockRequestQueryVariables
  >({
    query: getStockRequestGql,
    variables,
  });
  return {
    id: data.stockRequest.id,
    internalUser: data.stockRequest.internalUser,
    cartProducts: data.stockRequest.productRegistrations.reduce(
      (acc, productRegistration) => {
        const cartProduct = acc.find(
          (cartProduct) =>
            cartProduct.productId === productRegistration.product.id,
        );
        if (cartProduct) {
          return acc.map((cartProduct) => {
            if (cartProduct.productId === productRegistration.product.id) {
              return { ...cartProduct, count: cartProduct.count + 1 };
            }
            return cartProduct;
          });
        }
        return [
          ...acc,
          {
            productId: productRegistration.product.id,
            count: 1,
            product: productRegistration.product,
          },
        ];
      },
      [] as CartProducts,
    ),
  };
};
