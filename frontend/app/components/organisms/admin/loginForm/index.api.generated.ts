import type * as Types from '@/app/utils/api/types';

export type CreateSessionMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type CreateSessionMutation = {
  __typename?: 'Mutation';
  createSession: { __typename?: 'CreateSessionType'; token: string };
};
