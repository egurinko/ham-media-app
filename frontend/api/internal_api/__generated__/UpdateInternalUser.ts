/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateInternalUser
// ====================================================

export interface UpdateInternalUser_updateInternalUser {
  __typename: "InternalUser";
  id: number;
  email: string;
  name: string;
}

export interface UpdateInternalUser {
  updateInternalUser: UpdateInternalUser_updateInternalUser;
}

export interface UpdateInternalUserVariables {
  id: number;
  name: string;
  email: string;
  password: string;
}
