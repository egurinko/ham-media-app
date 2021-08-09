import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: BigInt;
};


export type InternalUser = {
  __typename?: 'InternalUser';
  email: Scalars['String'];
  id: Scalars['BigInt'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInternalUser: InternalUser;
  deleteInternalUser: InternalUser;
  updateInternalUser: InternalUser;
};


export type MutationCreateInternalUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteInternalUserArgs = {
  id: Scalars['BigInt'];
};


export type MutationUpdateInternalUserArgs = {
  email: Scalars['String'];
  id: Scalars['BigInt'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  internalUser: InternalUser;
  internalUsers: Array<InternalUser>;
  session: Session;
};


export type QueryInternalUserArgs = {
  id: Scalars['BigInt'];
};

export type Session = {
  __typename?: 'Session';
  token: Scalars['String'];
};

export type CreateInternalUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateInternalUserMutation = { __typename?: 'Mutation', createInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type DeleteInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type DeleteInternalUserMutation = { __typename?: 'Mutation', deleteInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type GetInternalUserQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type GetInternalUserQuery = { __typename?: 'Query', internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type GetInternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInternalUsersQuery = { __typename?: 'Query', internalUsers: Array<{ __typename?: 'InternalUser', id: BigInt, email: string, name: string }> };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', token: string } };

export type UpdateInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdateInternalUserMutation = { __typename?: 'Mutation', updateInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };


export const CreateInternalUserDocument = gql`
    mutation CreateInternalUser($name: String!, $email: String!, $password: String!) {
  createInternalUser(name: $name, email: $email, password: $password) {
    id
    email
    name
  }
}
    `;
export type CreateInternalUserMutationFn = Apollo.MutationFunction<CreateInternalUserMutation, CreateInternalUserMutationVariables>;

/**
 * __useCreateInternalUserMutation__
 *
 * To run a mutation, you first call `useCreateInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInternalUserMutation, { data, loading, error }] = useCreateInternalUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateInternalUserMutation, CreateInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInternalUserMutation, CreateInternalUserMutationVariables>(CreateInternalUserDocument, options);
      }
export type CreateInternalUserMutationHookResult = ReturnType<typeof useCreateInternalUserMutation>;
export type CreateInternalUserMutationResult = Apollo.MutationResult<CreateInternalUserMutation>;
export type CreateInternalUserMutationOptions = Apollo.BaseMutationOptions<CreateInternalUserMutation, CreateInternalUserMutationVariables>;
export const DeleteInternalUserDocument = gql`
    mutation DeleteInternalUser($id: BigInt!) {
  deleteInternalUser(id: $id) {
    id
    email
    name
  }
}
    `;
export type DeleteInternalUserMutationFn = Apollo.MutationFunction<DeleteInternalUserMutation, DeleteInternalUserMutationVariables>;

/**
 * __useDeleteInternalUserMutation__
 *
 * To run a mutation, you first call `useDeleteInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInternalUserMutation, { data, loading, error }] = useDeleteInternalUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInternalUserMutation, DeleteInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInternalUserMutation, DeleteInternalUserMutationVariables>(DeleteInternalUserDocument, options);
      }
export type DeleteInternalUserMutationHookResult = ReturnType<typeof useDeleteInternalUserMutation>;
export type DeleteInternalUserMutationResult = Apollo.MutationResult<DeleteInternalUserMutation>;
export type DeleteInternalUserMutationOptions = Apollo.BaseMutationOptions<DeleteInternalUserMutation, DeleteInternalUserMutationVariables>;
export const GetInternalUserDocument = gql`
    query GetInternalUser($id: BigInt!) {
  internalUser(id: $id) {
    id
    email
    name
  }
}
    `;

/**
 * __useGetInternalUserQuery__
 *
 * To run a query within a React component, call `useGetInternalUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInternalUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInternalUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInternalUserQuery(baseOptions: Apollo.QueryHookOptions<GetInternalUserQuery, GetInternalUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInternalUserQuery, GetInternalUserQueryVariables>(GetInternalUserDocument, options);
      }
export function useGetInternalUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInternalUserQuery, GetInternalUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInternalUserQuery, GetInternalUserQueryVariables>(GetInternalUserDocument, options);
        }
export type GetInternalUserQueryHookResult = ReturnType<typeof useGetInternalUserQuery>;
export type GetInternalUserLazyQueryHookResult = ReturnType<typeof useGetInternalUserLazyQuery>;
export type GetInternalUserQueryResult = Apollo.QueryResult<GetInternalUserQuery, GetInternalUserQueryVariables>;
export const GetInternalUsersDocument = gql`
    query GetInternalUsers {
  internalUsers {
    id
    email
    name
  }
}
    `;

/**
 * __useGetInternalUsersQuery__
 *
 * To run a query within a React component, call `useGetInternalUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInternalUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInternalUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInternalUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetInternalUsersQuery, GetInternalUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInternalUsersQuery, GetInternalUsersQueryVariables>(GetInternalUsersDocument, options);
      }
export function useGetInternalUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInternalUsersQuery, GetInternalUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInternalUsersQuery, GetInternalUsersQueryVariables>(GetInternalUsersDocument, options);
        }
export type GetInternalUsersQueryHookResult = ReturnType<typeof useGetInternalUsersQuery>;
export type GetInternalUsersLazyQueryHookResult = ReturnType<typeof useGetInternalUsersLazyQuery>;
export type GetInternalUsersQueryResult = Apollo.QueryResult<GetInternalUsersQuery, GetInternalUsersQueryVariables>;
export const GetSessionDocument = gql`
    query GetSession {
  session {
    token
  }
}
    `;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const UpdateInternalUserDocument = gql`
    mutation UpdateInternalUser($id: BigInt!, $name: String!, $email: String!, $password: String!) {
  updateInternalUser(id: $id, name: $name, email: $email, password: $password) {
    id
    email
    name
  }
}
    `;
export type UpdateInternalUserMutationFn = Apollo.MutationFunction<UpdateInternalUserMutation, UpdateInternalUserMutationVariables>;

/**
 * __useUpdateInternalUserMutation__
 *
 * To run a mutation, you first call `useUpdateInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInternalUserMutation, { data, loading, error }] = useUpdateInternalUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInternalUserMutation, UpdateInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInternalUserMutation, UpdateInternalUserMutationVariables>(UpdateInternalUserDocument, options);
      }
export type UpdateInternalUserMutationHookResult = ReturnType<typeof useUpdateInternalUserMutation>;
export type UpdateInternalUserMutationResult = Apollo.MutationResult<UpdateInternalUserMutation>;
export type UpdateInternalUserMutationOptions = Apollo.BaseMutationOptions<UpdateInternalUserMutation, UpdateInternalUserMutationVariables>;