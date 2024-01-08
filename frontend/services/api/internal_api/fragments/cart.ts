import { gql } from '@apollo/client';

export const CART_FIELDS = gql`
  fragment CartFields on Cart {
    id
    items
  }
`;
