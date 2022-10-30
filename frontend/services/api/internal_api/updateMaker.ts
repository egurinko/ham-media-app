import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './fragments/maker';

export const updateMaker = gql`
  ${MAKER_FIELDS}
  mutation InternalUpdateMaker($id: Int!, $name: String!) {
    updateMaker(id: $id, name: $name) {
      ...MakerFields
    }
  }
`;
