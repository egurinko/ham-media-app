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

/** A hospital */
export type Hospital = {
  __typename?: 'Hospital';
  hospitalAddress?: Maybe<HospitalAddress>;
  hospitalBusinessForm?: Maybe<HospitalBusinessForm>;
  hospitalCertificationOption?: Maybe<HospitalCertificationOption>;
  hospitalNightServiceOption?: Maybe<HospitalNightServiceOption>;
  hospitalNightUrgentActionOption?: Maybe<HospitalNightUrgentActionOption>;
  hospitalReservationStatus?: Maybe<HospitalReservationStatus>;
  id: Scalars['BigInt'];
  name: Scalars['String'];
  url: Scalars['String'];
};

/** A hospital address */
export type HospitalAddress = {
  __typename?: 'HospitalAddress';
  address: Scalars['String'];
  hospitalAddressGeoLocation?: Maybe<HospitalAddressGeoLocation>;
  id: Scalars['BigInt'];
  phone_number: Scalars['String'];
  prefecture: Prefecture;
};

/** A hospital address geo location */
export type HospitalAddressGeoLocation = {
  __typename?: 'HospitalAddressGeoLocation';
  id: Scalars['BigInt'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** A hospital business form */
export type HospitalBusinessForm = {
  __typename?: 'HospitalBusinessForm';
  business_hour: Scalars['String'];
  closed_day: Scalars['String'];
  id: Scalars['BigInt'];
  insurance_enabled: Scalars['String'];
  remark: Scalars['String'];
};

/** A hospital certification option */
export type HospitalCertificationOption = {
  __typename?: 'HospitalCertificationOption';
  id: Scalars['BigInt'];
  jsava_registered: Scalars['String'];
  nichiju_registered: Scalars['String'];
};

export type HospitalConnection = {
  __typename?: 'HospitalConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<HospitalEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type HospitalEdge = {
  __typename?: 'HospitalEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Hospital>;
};

/** A hospital night service option */
export type HospitalNightServiceOption = {
  __typename?: 'HospitalNightServiceOption';
  id: Scalars['BigInt'];
  remark: Scalars['String'];
  status: Scalars['String'];
};

/** A hospital night urgent action option */
export type HospitalNightUrgentActionOption = {
  __typename?: 'HospitalNightUrgentActionOption';
  id: Scalars['BigInt'];
  status: Scalars['String'];
};

/** A hospital reservation status */
export type HospitalReservationStatus = {
  __typename?: 'HospitalReservationStatus';
  id: Scalars['BigInt'];
  remark: Scalars['String'];
  required: Scalars['String'];
  reservable: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession: CreateSessionType;
};


export type MutationCreateSessionArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
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
  hospital: Hospital;
  hospitals: Array<Hospital>;
  placeAutocomplete: PlaceAutocomplete;
  prefectures: Array<Prefecture>;
  publicHospitalConnection?: Maybe<HospitalConnection>;
};


export type QueryHospitalArgs = {
  id: Scalars['BigInt'];
};


export type QueryPlaceAutocompleteArgs = {
  searchText: Scalars['String'];
};


export type QueryPublicHospitalConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  insuranceEnabled: Scalars['Boolean'];
  jsavaOption: Scalars['Boolean'];
  last?: Maybe<Scalars['Int']>;
  nichijuOption: Scalars['Boolean'];
  nightServiceOption: Scalars['Boolean'];
  reservable: Scalars['Boolean'];
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

export type HospitalFieldsFragment = { __typename?: 'Hospital', id: BigInt, name: string, url: string, hospitalAddress?: Maybe<{ __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: Maybe<{ __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number }> }>, hospitalBusinessForm?: Maybe<{ __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string }>, hospitalCertificationOption?: Maybe<{ __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string }>, hospitalNightServiceOption?: Maybe<{ __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string }>, hospitalNightUrgentActionOption?: Maybe<{ __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string }>, hospitalReservationStatus?: Maybe<{ __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string }> };

export type PublicGetHospitalQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type PublicGetHospitalQuery = { __typename?: 'Query', hospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, hospitalAddress?: Maybe<{ __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: Maybe<{ __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number }> }>, hospitalBusinessForm?: Maybe<{ __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string }>, hospitalCertificationOption?: Maybe<{ __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string }>, hospitalNightServiceOption?: Maybe<{ __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string }>, hospitalNightUrgentActionOption?: Maybe<{ __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string }>, hospitalReservationStatus?: Maybe<{ __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string }> } };

export type PublicGetHospitalConnectionQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  searchText: Scalars['String'];
  reservable: Scalars['Boolean'];
  nightServiceOption: Scalars['Boolean'];
  insuranceEnabled: Scalars['Boolean'];
  jsavaOption: Scalars['Boolean'];
  nichijuOption: Scalars['Boolean'];
}>;


export type PublicGetHospitalConnectionQuery = { __typename?: 'Query', publicHospitalConnection?: Maybe<{ __typename?: 'HospitalConnection', edges?: Maybe<Array<Maybe<{ __typename?: 'HospitalEdge', node?: Maybe<{ __typename?: 'Hospital', id: BigInt, name: string, url: string, hospitalAddress?: Maybe<{ __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: Maybe<{ __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number }> }>, hospitalBusinessForm?: Maybe<{ __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string }>, hospitalCertificationOption?: Maybe<{ __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string }>, hospitalNightServiceOption?: Maybe<{ __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string }>, hospitalNightUrgentActionOption?: Maybe<{ __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string }>, hospitalReservationStatus?: Maybe<{ __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string }> }> }>>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> } }> };

export type PublicGetHospitalIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicGetHospitalIdsQuery = { __typename?: 'Query', hospitals: Array<{ __typename?: 'Hospital', id: BigInt }> };

export type PublicGetPlaceAutocompleteQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type PublicGetPlaceAutocompleteQuery = { __typename?: 'Query', placeAutocomplete: { __typename?: 'PlaceAutocomplete', predictions: Array<{ __typename?: 'PlaceAutocompletePrediction', place_id: string, structured_formatting: { __typename?: 'PlaceAutocompletePredictionStructuredFormatting', main_text: string } }> } };

export type PublicGetPrefecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicGetPrefecturesQuery = { __typename?: 'Query', prefectures: Array<{ __typename?: 'Prefecture', id: BigInt, name: string }> };

export const HospitalFieldsFragmentDoc = gql`
    fragment HospitalFields on Hospital {
  id
  name
  url
  hospitalAddress {
    id
    address
    phone_number
    prefecture {
      name
      id
    }
    hospitalAddressGeoLocation {
      latitude
      longitude
    }
  }
  hospitalBusinessForm {
    id
    business_hour
    closed_day
    insurance_enabled
    remark
  }
  hospitalCertificationOption {
    id
    nichiju_registered
    jsava_registered
  }
  hospitalNightServiceOption {
    id
    status
    remark
  }
  hospitalNightUrgentActionOption {
    id
    status
  }
  hospitalReservationStatus {
    id
    required
    reservable
    remark
  }
}
    `;
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
export const PublicGetHospitalDocument = gql`
    query PublicGetHospital($id: BigInt!) {
  hospital(id: $id) {
    ...HospitalFields
  }
}
    ${HospitalFieldsFragmentDoc}`;

/**
 * __usePublicGetHospitalQuery__
 *
 * To run a query within a React component, call `usePublicGetHospitalQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetHospitalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetHospitalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublicGetHospitalQuery(baseOptions: Apollo.QueryHookOptions<PublicGetHospitalQuery, PublicGetHospitalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGetHospitalQuery, PublicGetHospitalQueryVariables>(PublicGetHospitalDocument, options);
      }
export function usePublicGetHospitalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGetHospitalQuery, PublicGetHospitalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGetHospitalQuery, PublicGetHospitalQueryVariables>(PublicGetHospitalDocument, options);
        }
export type PublicGetHospitalQueryHookResult = ReturnType<typeof usePublicGetHospitalQuery>;
export type PublicGetHospitalLazyQueryHookResult = ReturnType<typeof usePublicGetHospitalLazyQuery>;
export type PublicGetHospitalQueryResult = Apollo.QueryResult<PublicGetHospitalQuery, PublicGetHospitalQueryVariables>;
export const PublicGetHospitalConnectionDocument = gql`
    query PublicGetHospitalConnection($first: Int, $after: String, $searchText: String!, $reservable: Boolean!, $nightServiceOption: Boolean!, $insuranceEnabled: Boolean!, $jsavaOption: Boolean!, $nichijuOption: Boolean!) {
  publicHospitalConnection(
    first: $first
    after: $after
    searchText: $searchText
    reservable: $reservable
    nightServiceOption: $nightServiceOption
    insuranceEnabled: $insuranceEnabled
    jsavaOption: $jsavaOption
    nichijuOption: $nichijuOption
  ) {
    edges {
      node {
        ...HospitalFields
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    ${HospitalFieldsFragmentDoc}`;

/**
 * __usePublicGetHospitalConnectionQuery__
 *
 * To run a query within a React component, call `usePublicGetHospitalConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetHospitalConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetHospitalConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      searchText: // value for 'searchText'
 *      reservable: // value for 'reservable'
 *      nightServiceOption: // value for 'nightServiceOption'
 *      insuranceEnabled: // value for 'insuranceEnabled'
 *      jsavaOption: // value for 'jsavaOption'
 *      nichijuOption: // value for 'nichijuOption'
 *   },
 * });
 */
export function usePublicGetHospitalConnectionQuery(baseOptions: Apollo.QueryHookOptions<PublicGetHospitalConnectionQuery, PublicGetHospitalConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGetHospitalConnectionQuery, PublicGetHospitalConnectionQueryVariables>(PublicGetHospitalConnectionDocument, options);
      }
export function usePublicGetHospitalConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGetHospitalConnectionQuery, PublicGetHospitalConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGetHospitalConnectionQuery, PublicGetHospitalConnectionQueryVariables>(PublicGetHospitalConnectionDocument, options);
        }
export type PublicGetHospitalConnectionQueryHookResult = ReturnType<typeof usePublicGetHospitalConnectionQuery>;
export type PublicGetHospitalConnectionLazyQueryHookResult = ReturnType<typeof usePublicGetHospitalConnectionLazyQuery>;
export type PublicGetHospitalConnectionQueryResult = Apollo.QueryResult<PublicGetHospitalConnectionQuery, PublicGetHospitalConnectionQueryVariables>;
export const PublicGetHospitalIdsDocument = gql`
    query PublicGetHospitalIds {
  hospitals {
    id
  }
}
    `;

/**
 * __usePublicGetHospitalIdsQuery__
 *
 * To run a query within a React component, call `usePublicGetHospitalIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetHospitalIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetHospitalIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicGetHospitalIdsQuery(baseOptions?: Apollo.QueryHookOptions<PublicGetHospitalIdsQuery, PublicGetHospitalIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicGetHospitalIdsQuery, PublicGetHospitalIdsQueryVariables>(PublicGetHospitalIdsDocument, options);
      }
export function usePublicGetHospitalIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicGetHospitalIdsQuery, PublicGetHospitalIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicGetHospitalIdsQuery, PublicGetHospitalIdsQueryVariables>(PublicGetHospitalIdsDocument, options);
        }
export type PublicGetHospitalIdsQueryHookResult = ReturnType<typeof usePublicGetHospitalIdsQuery>;
export type PublicGetHospitalIdsLazyQueryHookResult = ReturnType<typeof usePublicGetHospitalIdsLazyQuery>;
export type PublicGetHospitalIdsQueryResult = Apollo.QueryResult<PublicGetHospitalIdsQuery, PublicGetHospitalIdsQueryVariables>;
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