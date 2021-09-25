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

/** Google Place Autocomplete api response */
export type PlaceAutocomplete = {
  __typename?: 'PlaceAutocomplete';
  error_message?: Maybe<Scalars['String']>;
  info_messages?: Maybe<Array<Scalars['String']>>;
  predictions: Array<PlaceAutocompletePrediction>;
  status: PlaceAutocompleteStatus;
};

/** Google Place Autocomplete api response prediction */
export type PlaceAutocompletePrediction = {
  __typename?: 'PlaceAutocompletePrediction';
  description: Scalars['String'];
  matched_substrings: Array<PlaceAutocompletePredictionMatchedSubstring>;
  place_id: Scalars['String'];
  reference: Scalars['String'];
  structured_formatting: PlaceAutocompletePredictionStructuredFormatting;
  terms: Array<PlaceAutocompletePredictionTerm>;
  types: Array<Scalars['String']>;
};

/** Google Place Autocomplete api response prediction matched substring */
export type PlaceAutocompletePredictionMatchedSubstring = {
  __typename?: 'PlaceAutocompletePredictionMatchedSubstring';
  length: Scalars['Int'];
  offset: Scalars['Int'];
};

/** Google Place Autocomplete api response prediction structured formatting */
export type PlaceAutocompletePredictionStructuredFormatting = {
  __typename?: 'PlaceAutocompletePredictionStructuredFormatting';
  main_text: Scalars['String'];
  main_text_matched_substrings: Array<PlaceAutocompletePredictionMatchedSubstring>;
  secondary_text: Scalars['String'];
};

/** Google Place Autocomplete api response prediction term */
export type PlaceAutocompletePredictionTerm = {
  __typename?: 'PlaceAutocompletePredictionTerm';
  offset: Scalars['Int'];
  value: Scalars['String'];
};

/** Google Place Autocomplete api response status */
export enum PlaceAutocompleteStatus {
  InvalidRequest = 'INVALID_REQUEST',
  Ok = 'OK',
  OverQueryLimit = 'OVER_QUERY_LIMIT',
  RequestDenied = 'REQUEST_DENIED',
  UnknownError = 'UNKNOWN_ERROR',
  ZeroResults = 'ZERO_RESULTS'
}

/** A prefecture */
export type Prefecture = {
  __typename?: 'Prefecture';
  id: Scalars['BigInt'];
  name: Scalars['String'];
  region: Region;
};

export type Query = {
  __typename?: 'Query';
  placeAutocomplete: PlaceAutocomplete;
  prefectures: Array<Prefecture>;
};


export type QueryPlaceAutocompleteArgs = {
  searchText: Scalars['String'];
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

export type PublicGetPlaceAutocompleteQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type PublicGetPlaceAutocompleteQuery = { __typename?: 'Query', placeAutocomplete: { __typename?: 'PlaceAutocomplete', predictions: Array<{ __typename?: 'PlaceAutocompletePrediction', place_id: string, structured_formatting: { __typename?: 'PlaceAutocompletePredictionStructuredFormatting', main_text: string } }> } };

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
export const PublicGetPlaceAutocompleteDocument = gql`
    query PublicGetPlaceAutocomplete($searchText: String!) {
  placeAutocomplete(searchText: $searchText) {
    predictions {
      place_id
      structured_formatting {
        main_text
      }
    }
  }
}
    `;

/**
 * __usePublicGetPlaceAutocompleteQuery__
 *
 * To run a query within a React component, call `usePublicGetPlaceAutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetPlaceAutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetPlaceAutocompleteQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function usePublicGetPlaceAutocompleteQuery(baseOptions: Apollo.QueryHookOptions<PublicGetPlaceAutocompleteQuery, PublicGetPlaceAutocompleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGetPlaceAutocompleteQuery, PublicGetPlaceAutocompleteQueryVariables>(PublicGetPlaceAutocompleteDocument, options);
      }
export function usePublicGetPlaceAutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGetPlaceAutocompleteQuery, PublicGetPlaceAutocompleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGetPlaceAutocompleteQuery, PublicGetPlaceAutocompleteQueryVariables>(PublicGetPlaceAutocompleteDocument, options);
        }
export type PublicGetPlaceAutocompleteQueryHookResult = ReturnType<typeof usePublicGetPlaceAutocompleteQuery>;
export type PublicGetPlaceAutocompleteLazyQueryHookResult = ReturnType<typeof usePublicGetPlaceAutocompleteLazyQuery>;
export type PublicGetPlaceAutocompleteQueryResult = Apollo.QueryResult<PublicGetPlaceAutocompleteQuery, PublicGetPlaceAutocompleteQueryVariables>;
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