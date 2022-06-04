import { gql } from '@apollo/client';

export const getProductCartItems = gql`
  query LocalGetProductCartItems {
    productCartItems {
      count
      productId
    }
  }
`;
