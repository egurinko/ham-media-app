import { gql } from '@apollo/client';

export const getPrefectures = gql`
  query PublicGetPrefectures {
    prefectures {
      id
      name
    }
  }
`;
