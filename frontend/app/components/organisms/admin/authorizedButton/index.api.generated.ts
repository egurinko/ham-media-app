import type * as Types from '@/app/utils/api/types';

export type GetSessonQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetSessonQuery = {
  __typename?: 'Query';
  session: {
    __typename?: 'Session';
    internalUser: {
      __typename?: 'InternalUser';
      role: { __typename?: 'Role'; name: string };
    };
  };
};
