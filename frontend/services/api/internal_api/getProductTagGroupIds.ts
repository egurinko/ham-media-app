import { gql } from '@apollo/client';

export const getProductTagGroupIds = gql`
  query InternalGetProductTagGroupIds {
    productTagGroups {
      id
    }
  }
`;
