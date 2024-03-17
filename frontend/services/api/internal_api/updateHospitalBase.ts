import { gql } from '@apollo/client';

export const updateHospitalBase = gql`
  mutation InternalUpdateHospitalBase(
    $id: BigInt!
    $name: String!
    $url: String!
    $deleted: Boolean!
    $internalMemo: String!
  ) {
    updateHospitalBase(
      id: $id
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internalMemo
    ) {
      name
      url
      deleted
      internal_memo
    }
  }
`;
