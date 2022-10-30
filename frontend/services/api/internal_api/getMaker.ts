import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './fragments/maker';

export const getMaker = gql`
  ${MAKER_FIELDS}
  query InternalGetMaker($id: Int!) {
    maker(id: $id) {
      ...MakerFields
    }
  }
`;
