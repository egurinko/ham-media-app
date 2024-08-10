/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as Types from '@/app/utils/api/types';

export type CreateSessionMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type CreateSessionMutation = {
  __typename?: 'Mutation';
  createSession: { __typename?: 'CreateSessionType'; token: string };
};
