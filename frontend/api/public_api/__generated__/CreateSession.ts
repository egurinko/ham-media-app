/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSession
// ====================================================

export interface CreateSession_createSession {
  __typename: "CreateSessionType";
  token: string;
}

export interface CreateSession {
  createSession: CreateSession_createSession;
}

export interface CreateSessionVariables {
  email: string;
  password: string;
}
