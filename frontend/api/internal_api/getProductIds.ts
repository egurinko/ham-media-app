import { gql } from '@apollo/client';

export const getProductIds = gql`
  query InternalGetProductIds {
    products {
      id
    }
  }
`;
