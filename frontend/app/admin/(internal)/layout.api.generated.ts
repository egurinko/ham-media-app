/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as Types from '@/app/utils/api/types';

export type GetInternalUserProfileQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetInternalUserProfileQuery = {
  __typename?: 'Query';
  session: {
    __typename?: 'Session';
    internalUser: { __typename?: 'InternalUser'; name: string };
  };
};
