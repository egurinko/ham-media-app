import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './fragments/maker';

export const getMakers = gql`
  ${MAKER_FIELDS}
  query InternalGetMakers {
    makers {
      ...MakerFields
    }
  }
`;
