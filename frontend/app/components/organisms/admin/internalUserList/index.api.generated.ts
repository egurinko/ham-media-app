/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as Types from '@/app/utils/api/types';

export type GetInternalUsersQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetInternalUsersQuery = {
  __typename?: 'Query';
  internalUsers: Array<{
    __typename?: 'InternalUser';
    id: number;
    email: string;
    name: string;
    role: { __typename?: 'Role'; name: string };
  }>;
};
