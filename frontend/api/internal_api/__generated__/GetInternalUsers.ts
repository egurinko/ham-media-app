/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInternalUsers
// ====================================================

export interface GetInternalUsers_internalUsers {
  __typename: "InternalUser";
  id: number;
  email: string;
  name: string;
}

export interface GetInternalUsers {
  internalUsers: GetInternalUsers_internalUsers[];
}
