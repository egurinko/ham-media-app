/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInternalUser
// ====================================================

export interface GetInternalUser_internalUser {
  __typename: "InternalUser";
  id: number;
  email: string;
  name: string;
}

export interface GetInternalUser {
  internalUser: GetInternalUser_internalUser;
}

export interface GetInternalUserVariables {
  id: number;
}
