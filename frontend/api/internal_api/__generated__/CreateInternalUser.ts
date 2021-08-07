/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateInternalUser
// ====================================================

export interface CreateInternalUser_createInternalUser {
  __typename: "InternalUser";
  id: number;
  email: string;
  name: string;
}

export interface CreateInternalUser {
  createInternalUser: CreateInternalUser_createInternalUser;
}

export interface CreateInternalUserVariables {
  name: string;
  email: string;
  password: string;
}
