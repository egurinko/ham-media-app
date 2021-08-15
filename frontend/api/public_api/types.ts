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


export type CreateSessionType = {
  __typename?: 'CreateSessionType';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession: CreateSessionType;
};


export type MutationCreateSessionArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** A prefecture */
export type Prefecture = {
  __typename?: 'Prefecture';
  id: Scalars['BigInt'];
  name: Scalars['String'];
  region: Region;
};

export type Query = {
  __typename?: 'Query';
  prefectures: Array<Prefecture>;
};

/** A region */
export type Region = {
  __typename?: 'Region';
  id: Scalars['BigInt'];
  name: Scalars['String'];
};

export type PublicCreateSessionMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type PublicCreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'CreateSessionType', token: string } };

export type PublicGetPrefecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicGetPrefecturesQuery = { __typename?: 'Query', prefectures: Array<{ __typename?: 'Prefecture', id: BigInt, name: string }> };


export const PublicCreateSessionDocument = gql`
    mutation PublicCreateSession($email: String!, $password: String!) {
  createSession(email: $email, password: $password) {
    token
  }
}
    `;
export type PublicCreateSessionMutationFn = Apollo.MutationFunction<PublicCreateSessionMutation, PublicCreateSessionMutationVariables>;

/**
 * __usePublicCreateSessionMutation__
 *
 * To run a mutation, you first call `usePublicCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublicCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publicCreateSessionMutation, { data, loading, error }] = usePublicCreateSessionMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePublicCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<PublicCreateSessionMutation, PublicCreateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublicCreateSessionMutation, PublicCreateSessionMutationVariables>(PublicCreateSessionDocument, options);
      }
export type PublicCreateSessionMutationHookResult = ReturnType<typeof usePublicCreateSessionMutation>;
export type PublicCreateSessionMutationResult = Apollo.MutationResult<PublicCreateSessionMutation>;
export type PublicCreateSessionMutationOptions = Apollo.BaseMutationOptions<PublicCreateSessionMutation, PublicCreateSessionMutationVariables>;
export const PublicGetPrefecturesDocument = gql`
    query PublicGetPrefectures {
  prefectures {
    id
    name
  }
}
    `;

/**
 * __usePublicGetPrefecturesQuery__
 *
 * To run a query within a React component, call `usePublicGetPrefecturesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetPrefecturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetPrefecturesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicGetPrefecturesQuery(baseOptions?: Apollo.QueryHookOptions<PublicGetPrefecturesQuery, PublicGetPrefecturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGetPrefecturesQuery, PublicGetPrefecturesQueryVariables>(PublicGetPrefecturesDocument, options);
      }
export function usePublicGetPrefecturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGetPrefecturesQuery, PublicGetPrefecturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGetPrefecturesQuery, PublicGetPrefecturesQueryVariables>(PublicGetPrefecturesDocument, options);
        }
export type PublicGetPrefecturesQueryHookResult = ReturnType<typeof usePublicGetPrefecturesQuery>;
export type PublicGetPrefecturesLazyQueryHookResult = ReturnType<typeof usePublicGetPrefecturesLazyQuery>;
export type PublicGetPrefecturesQueryResult = Apollo.QueryResult<PublicGetPrefecturesQuery, PublicGetPrefecturesQueryVariables>;