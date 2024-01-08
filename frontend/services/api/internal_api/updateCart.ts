import { gql } from '@apollo/client';
import { CART_FIELDS } from './fragments/cart';

export const updateCart = gql`
  ${CART_FIELDS}
  mutation InternalUpdateCart($id: Int!, $items: JSONObject!) {
    updateCart(id: $id, items: $items) {
      ...CartFields
    }
  }
`;
