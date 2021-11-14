import { gql } from '@apollo/client';

export const MAKER_FIELDS = gql`
  fragment MakerFields on Maker {
    id
    name
  }
`;
