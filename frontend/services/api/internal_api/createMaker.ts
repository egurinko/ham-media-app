import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './fragments/maker';

export const createMaker = gql`
  ${MAKER_FIELDS}
  mutation InternalCreateMaker($name: String!) {
    createMaker(name: $name) {
      ...MakerFields
    }
  }
`;
