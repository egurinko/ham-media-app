/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteInternalUser
// ====================================================

export interface DeleteInternalUser_deleteInternalUser {
  __typename: "InternalUser";
  id: number;
  email: string;
  name: string;
}

export interface DeleteInternalUser {
  deleteInternalUser: DeleteInternalUser_deleteInternalUser;
}

export interface DeleteInternalUserVariables {
  id: number;
}
