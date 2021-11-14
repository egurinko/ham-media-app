import { gql } from '@apollo/client';

export const deleteMaker = gql`
  mutation InternalDeleteMaker($id: Int!) {
    deleteMaker(id: $id) {
      id
      name
    }
  }
`;
