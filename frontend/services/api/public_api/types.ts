import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type CreateSessionType = {
  __typename?: 'CreateSessionType';
  token: Scalars['String']['output'];
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
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  recommended: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

/** A hospital address */
export type HospitalAddress = {
  __typename?: 'HospitalAddress';
  address: Scalars['String']['output'];
  hospitalAddressGeoLocation?: Maybe<HospitalAddressGeoLocation>;
  id: Scalars['BigInt']['output'];
  phone_number: Scalars['String']['output'];
  prefecture: Prefecture;
};

/** A hospital address geo location */
export type HospitalAddressGeoLocation = {
  __typename?: 'HospitalAddressGeoLocation';
  id: Scalars['BigInt']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

/** A hospital business form */
export type HospitalBusinessForm = {
  __typename?: 'HospitalBusinessForm';
  business_hour: Scalars['String']['output'];
  closed_day: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  insurance_enabled: Scalars['String']['output'];
  remark: Scalars['String']['output'];
};

/** A hospital certification option */
export type HospitalCertificationOption = {
  __typename?: 'HospitalCertificationOption';
  id: Scalars['BigInt']['output'];
  jsava_registered: Scalars['String']['output'];
  nichiju_registered: Scalars['String']['output'];
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
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Hospital>;
};

/** A hospital night service option */
export type HospitalNightServiceOption = {
  __typename?: 'HospitalNightServiceOption';
  id: Scalars['BigInt']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

/** A hospital night urgent action option */
export type HospitalNightUrgentActionOption = {
  __typename?: 'HospitalNightUrgentActionOption';
  id: Scalars['BigInt']['output'];
  status: Scalars['String']['output'];
};

/** A hospital reservation status */
export type HospitalReservationStatus = {
  __typename?: 'HospitalReservationStatus';
  id: Scalars['BigInt']['output'];
  remark: Scalars['String']['output'];
  required: Scalars['String']['output'];
  reservable: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession: CreateSessionType;
};

export type MutationCreateSessionArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Google Place Autocomplete api response */
export type PlaceAutocomplete = {
  __typename?: 'PlaceAutocomplete';
  error_message?: Maybe<Scalars['String']['output']>;
  info_messages?: Maybe<Array<Scalars['String']['output']>>;
  predictions: Array<PlaceAutocompletePrediction>;
  status: PlaceAutocompleteStatus;
};

/** Google Place Autocomplete api response prediction */
export type PlaceAutocompletePrediction = {
  __typename?: 'PlaceAutocompletePrediction';
  description: Scalars['String']['output'];
  matched_substrings: Array<PlaceAutocompletePredictionMatchedSubstring>;
  place_id: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  structured_formatting: PlaceAutocompletePredictionStructuredFormatting;
  terms: Array<PlaceAutocompletePredictionTerm>;
  types: Array<Scalars['String']['output']>;
};

/** Google Place Autocomplete api response prediction matched substring */
export type PlaceAutocompletePredictionMatchedSubstring = {
  __typename?: 'PlaceAutocompletePredictionMatchedSubstring';
  length: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

/** Google Place Autocomplete api response prediction structured formatting */
export type PlaceAutocompletePredictionStructuredFormatting = {
  __typename?: 'PlaceAutocompletePredictionStructuredFormatting';
  main_text: Scalars['String']['output'];
  main_text_matched_substrings: Array<PlaceAutocompletePredictionMatchedSubstring>;
  secondary_text: Scalars['String']['output'];
};

/** Google Place Autocomplete api response prediction term */
export type PlaceAutocompletePredictionTerm = {
  __typename?: 'PlaceAutocompletePredictionTerm';
  offset: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

/** Google Place Autocomplete api response status */
export enum PlaceAutocompleteStatus {
  InvalidRequest = 'INVALID_REQUEST',
  Ok = 'OK',
  OverQueryLimit = 'OVER_QUERY_LIMIT',
  RequestDenied = 'REQUEST_DENIED',
  UnknownError = 'UNKNOWN_ERROR',
  ZeroResults = 'ZERO_RESULTS',
}

/** A prefecture */
export type Prefecture = {
  __typename?: 'Prefecture';
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
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
  id: Scalars['BigInt']['input'];
};

export type QueryPlaceAutocompleteArgs = {
  searchText: Scalars['String']['input'];
};

export type QueryPublicHospitalConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  currentLocation?: InputMaybe<CurrentLocation>;
  first?: InputMaybe<Scalars['Int']['input']>;
  insuranceEnabled: Scalars['Boolean']['input'];
  jsavaOption: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  nichijuOption: Scalars['Boolean']['input'];
  nightServiceOption: Scalars['Boolean']['input'];
  recommended: Scalars['Boolean']['input'];
  reservable: Scalars['Boolean']['input'];
  searchText: Scalars['String']['input'];
};

/** A region */
export type Region = {
  __typename?: 'Region';
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
};

export type CurrentLocation = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type PublicCreateSessionMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type PublicCreateSessionMutation = {
  __typename?: 'Mutation';
  createSession: { __typename?: 'CreateSessionType'; token: string };
};

export type PublicApiHospitalFieldsFragment = {
  __typename?: 'Hospital';
  id: number;
  name: string;
  url: string;
  recommended: boolean;
  hospitalAddress?: {
    __typename?: 'HospitalAddress';
    id: number;
    address: string;
    phone_number: string;
    prefecture: { __typename?: 'Prefecture'; name: string; id: number };
    hospitalAddressGeoLocation?: {
      __typename?: 'HospitalAddressGeoLocation';
      latitude: number;
      longitude: number;
    } | null;
  } | null;
  hospitalBusinessForm?: {
    __typename?: 'HospitalBusinessForm';
    id: number;
    business_hour: string;
    closed_day: string;
    insurance_enabled: string;
    remark: string;
  } | null;
  hospitalCertificationOption?: {
    __typename?: 'HospitalCertificationOption';
    id: number;
    nichiju_registered: string;
    jsava_registered: string;
  } | null;
  hospitalNightServiceOption?: {
    __typename?: 'HospitalNightServiceOption';
    id: number;
    status: string;
    remark: string;
  } | null;
  hospitalNightUrgentActionOption?: {
    __typename?: 'HospitalNightUrgentActionOption';
    id: number;
    status: string;
  } | null;
  hospitalReservationStatus?: {
    __typename?: 'HospitalReservationStatus';
    id: number;
    required: string;
    reservable: string;
    remark: string;
  } | null;
};

export type PublicGetHospitalQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;

export type PublicGetHospitalQuery = {
  __typename?: 'Query';
  hospital: {
    __typename?: 'Hospital';
    id: number;
    name: string;
    url: string;
    recommended: boolean;
    hospitalAddress?: {
      __typename?: 'HospitalAddress';
      id: number;
      address: string;
      phone_number: string;
      prefecture: { __typename?: 'Prefecture'; name: string; id: number };
      hospitalAddressGeoLocation?: {
        __typename?: 'HospitalAddressGeoLocation';
        latitude: number;
        longitude: number;
      } | null;
    } | null;
    hospitalBusinessForm?: {
      __typename?: 'HospitalBusinessForm';
      id: number;
      business_hour: string;
      closed_day: string;
      insurance_enabled: string;
      remark: string;
    } | null;
    hospitalCertificationOption?: {
      __typename?: 'HospitalCertificationOption';
      id: number;
      nichiju_registered: string;
      jsava_registered: string;
    } | null;
    hospitalNightServiceOption?: {
      __typename?: 'HospitalNightServiceOption';
      id: number;
      status: string;
      remark: string;
    } | null;
    hospitalNightUrgentActionOption?: {
      __typename?: 'HospitalNightUrgentActionOption';
      id: number;
      status: string;
    } | null;
    hospitalReservationStatus?: {
      __typename?: 'HospitalReservationStatus';
      id: number;
      required: string;
      reservable: string;
      remark: string;
    } | null;
  };
};

export type PublicGetHospitalConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  searchText: Scalars['String']['input'];
  currentLocation?: InputMaybe<CurrentLocation>;
  reservable: Scalars['Boolean']['input'];
  nightServiceOption: Scalars['Boolean']['input'];
  insuranceEnabled: Scalars['Boolean']['input'];
  jsavaOption: Scalars['Boolean']['input'];
  nichijuOption: Scalars['Boolean']['input'];
  recommended: Scalars['Boolean']['input'];
}>;

export type PublicGetHospitalConnectionQuery = {
  __typename?: 'Query';
  publicHospitalConnection?: {
    __typename?: 'HospitalConnection';
    edges?: Array<{
      __typename?: 'HospitalEdge';
      node?: {
        __typename?: 'Hospital';
        id: number;
        name: string;
        url: string;
        recommended: boolean;
        hospitalAddress?: {
          __typename?: 'HospitalAddress';
          id: number;
          address: string;
          phone_number: string;
          prefecture: { __typename?: 'Prefecture'; name: string; id: number };
          hospitalAddressGeoLocation?: {
            __typename?: 'HospitalAddressGeoLocation';
            latitude: number;
            longitude: number;
          } | null;
        } | null;
        hospitalBusinessForm?: {
          __typename?: 'HospitalBusinessForm';
          id: number;
          business_hour: string;
          closed_day: string;
          insurance_enabled: string;
          remark: string;
        } | null;
        hospitalCertificationOption?: {
          __typename?: 'HospitalCertificationOption';
          id: number;
          nichiju_registered: string;
          jsava_registered: string;
        } | null;
        hospitalNightServiceOption?: {
          __typename?: 'HospitalNightServiceOption';
          id: number;
          status: string;
          remark: string;
        } | null;
        hospitalNightUrgentActionOption?: {
          __typename?: 'HospitalNightUrgentActionOption';
          id: number;
          status: string;
        } | null;
        hospitalReservationStatus?: {
          __typename?: 'HospitalReservationStatus';
          id: number;
          required: string;
          reservable: string;
          remark: string;
        } | null;
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};

export type PublicGetHospitalIdsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PublicGetHospitalIdsQuery = {
  __typename?: 'Query';
  hospitals: Array<{ __typename?: 'Hospital'; id: number }>;
};

export type PublicGetHospitalLocationsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PublicGetHospitalLocationsQuery = {
  __typename?: 'Query';
  hospitals: Array<{
    __typename?: 'Hospital';
    id: number;
    name: string;
    url: string;
    hospitalAddress?: {
      __typename?: 'HospitalAddress';
      id: number;
      address: string;
      phone_number: string;
      hospitalAddressGeoLocation?: {
        __typename?: 'HospitalAddressGeoLocation';
        latitude: number;
        longitude: number;
      } | null;
    } | null;
  }>;
};

export type PublicGetPlaceAutocompleteQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
}>;

export type PublicGetPlaceAutocompleteQuery = {
  __typename?: 'Query';
  placeAutocomplete: {
    __typename?: 'PlaceAutocomplete';
    predictions: Array<{
      __typename?: 'PlaceAutocompletePrediction';
      place_id: string;
      structured_formatting: {
        __typename?: 'PlaceAutocompletePredictionStructuredFormatting';
        main_text: string;
      };
    }>;
  };
};

export type PublicGetPrefecturesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PublicGetPrefecturesQuery = {
  __typename?: 'Query';
  prefectures: Array<{ __typename?: 'Prefecture'; id: number; name: string }>;
};

export const PublicApiHospitalFieldsFragmentDoc = gql`
  fragment PublicApiHospitalFields on Hospital {
    id
    name
    url
    recommended
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
export type PublicCreateSessionMutationFn = Apollo.MutationFunction<
  PublicCreateSessionMutation,
  PublicCreateSessionMutationVariables
>;

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
export function usePublicCreateSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PublicCreateSessionMutation,
    PublicCreateSessionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PublicCreateSessionMutation,
    PublicCreateSessionMutationVariables
  >(PublicCreateSessionDocument, options);
}
export type PublicCreateSessionMutationHookResult = ReturnType<
  typeof usePublicCreateSessionMutation
>;
export type PublicCreateSessionMutationResult =
  Apollo.MutationResult<PublicCreateSessionMutation>;
export type PublicCreateSessionMutationOptions = Apollo.BaseMutationOptions<
  PublicCreateSessionMutation,
  PublicCreateSessionMutationVariables
>;
export const PublicGetHospitalDocument = gql`
  query PublicGetHospital($id: BigInt!) {
    hospital(id: $id) {
      ...PublicApiHospitalFields
    }
  }
  ${PublicApiHospitalFieldsFragmentDoc}
`;

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
export function usePublicGetHospitalQuery(
  baseOptions: Apollo.QueryHookOptions<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >(PublicGetHospitalDocument, options);
}
export function usePublicGetHospitalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >(PublicGetHospitalDocument, options);
}
export type PublicGetHospitalQueryHookResult = ReturnType<
  typeof usePublicGetHospitalQuery
>;
export type PublicGetHospitalLazyQueryHookResult = ReturnType<
  typeof usePublicGetHospitalLazyQuery
>;
export type PublicGetHospitalQueryResult = Apollo.QueryResult<
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables
>;
export const PublicGetHospitalConnectionDocument = gql`
  query PublicGetHospitalConnection(
    $first: Int
    $after: String
    $searchText: String!
    $currentLocation: currentLocation
    $reservable: Boolean!
    $nightServiceOption: Boolean!
    $insuranceEnabled: Boolean!
    $jsavaOption: Boolean!
    $nichijuOption: Boolean!
    $recommended: Boolean!
  ) {
    publicHospitalConnection(
      first: $first
      after: $after
      searchText: $searchText
      currentLocation: $currentLocation
      reservable: $reservable
      nightServiceOption: $nightServiceOption
      insuranceEnabled: $insuranceEnabled
      jsavaOption: $jsavaOption
      nichijuOption: $nichijuOption
      recommended: $recommended
    ) {
      edges {
        node {
          ...PublicApiHospitalFields
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
  ${PublicApiHospitalFieldsFragmentDoc}
`;

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
 *      currentLocation: // value for 'currentLocation'
 *      reservable: // value for 'reservable'
 *      nightServiceOption: // value for 'nightServiceOption'
 *      insuranceEnabled: // value for 'insuranceEnabled'
 *      jsavaOption: // value for 'jsavaOption'
 *      nichijuOption: // value for 'nichijuOption'
 *      recommended: // value for 'recommended'
 *   },
 * });
 */
export function usePublicGetHospitalConnectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    PublicGetHospitalConnectionQuery,
    PublicGetHospitalConnectionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetHospitalConnectionQuery,
    PublicGetHospitalConnectionQueryVariables
  >(PublicGetHospitalConnectionDocument, options);
}
export function usePublicGetHospitalConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetHospitalConnectionQuery,
    PublicGetHospitalConnectionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetHospitalConnectionQuery,
    PublicGetHospitalConnectionQueryVariables
  >(PublicGetHospitalConnectionDocument, options);
}
export type PublicGetHospitalConnectionQueryHookResult = ReturnType<
  typeof usePublicGetHospitalConnectionQuery
>;
export type PublicGetHospitalConnectionLazyQueryHookResult = ReturnType<
  typeof usePublicGetHospitalConnectionLazyQuery
>;
export type PublicGetHospitalConnectionQueryResult = Apollo.QueryResult<
  PublicGetHospitalConnectionQuery,
  PublicGetHospitalConnectionQueryVariables
>;
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
export function usePublicGetHospitalIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >(PublicGetHospitalIdsDocument, options);
}
export function usePublicGetHospitalIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetHospitalIdsQuery,
    PublicGetHospitalIdsQueryVariables
  >(PublicGetHospitalIdsDocument, options);
}
export type PublicGetHospitalIdsQueryHookResult = ReturnType<
  typeof usePublicGetHospitalIdsQuery
>;
export type PublicGetHospitalIdsLazyQueryHookResult = ReturnType<
  typeof usePublicGetHospitalIdsLazyQuery
>;
export type PublicGetHospitalIdsQueryResult = Apollo.QueryResult<
  PublicGetHospitalIdsQuery,
  PublicGetHospitalIdsQueryVariables
>;
export const PublicGetHospitalLocationsDocument = gql`
  query PublicGetHospitalLocations {
    hospitals {
      id
      name
      url
      hospitalAddress {
        id
        address
        phone_number
        hospitalAddressGeoLocation {
          latitude
          longitude
        }
      }
    }
  }
`;

/**
 * __usePublicGetHospitalLocationsQuery__
 *
 * To run a query within a React component, call `usePublicGetHospitalLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGetHospitalLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGetHospitalLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicGetHospitalLocationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicGetHospitalLocationsQuery,
    PublicGetHospitalLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetHospitalLocationsQuery,
    PublicGetHospitalLocationsQueryVariables
  >(PublicGetHospitalLocationsDocument, options);
}
export function usePublicGetHospitalLocationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetHospitalLocationsQuery,
    PublicGetHospitalLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetHospitalLocationsQuery,
    PublicGetHospitalLocationsQueryVariables
  >(PublicGetHospitalLocationsDocument, options);
}
export type PublicGetHospitalLocationsQueryHookResult = ReturnType<
  typeof usePublicGetHospitalLocationsQuery
>;
export type PublicGetHospitalLocationsLazyQueryHookResult = ReturnType<
  typeof usePublicGetHospitalLocationsLazyQuery
>;
export type PublicGetHospitalLocationsQueryResult = Apollo.QueryResult<
  PublicGetHospitalLocationsQuery,
  PublicGetHospitalLocationsQueryVariables
>;
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
export function usePublicGetPlaceAutocompleteQuery(
  baseOptions: Apollo.QueryHookOptions<
    PublicGetPlaceAutocompleteQuery,
    PublicGetPlaceAutocompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetPlaceAutocompleteQuery,
    PublicGetPlaceAutocompleteQueryVariables
  >(PublicGetPlaceAutocompleteDocument, options);
}
export function usePublicGetPlaceAutocompleteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetPlaceAutocompleteQuery,
    PublicGetPlaceAutocompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetPlaceAutocompleteQuery,
    PublicGetPlaceAutocompleteQueryVariables
  >(PublicGetPlaceAutocompleteDocument, options);
}
export type PublicGetPlaceAutocompleteQueryHookResult = ReturnType<
  typeof usePublicGetPlaceAutocompleteQuery
>;
export type PublicGetPlaceAutocompleteLazyQueryHookResult = ReturnType<
  typeof usePublicGetPlaceAutocompleteLazyQuery
>;
export type PublicGetPlaceAutocompleteQueryResult = Apollo.QueryResult<
  PublicGetPlaceAutocompleteQuery,
  PublicGetPlaceAutocompleteQueryVariables
>;
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
export function usePublicGetPrefecturesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicGetPrefecturesQuery,
    PublicGetPrefecturesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PublicGetPrefecturesQuery,
    PublicGetPrefecturesQueryVariables
  >(PublicGetPrefecturesDocument, options);
}
export function usePublicGetPrefecturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGetPrefecturesQuery,
    PublicGetPrefecturesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGetPrefecturesQuery,
    PublicGetPrefecturesQueryVariables
  >(PublicGetPrefecturesDocument, options);
}
export type PublicGetPrefecturesQueryHookResult = ReturnType<
  typeof usePublicGetPrefecturesQuery
>;
export type PublicGetPrefecturesLazyQueryHookResult = ReturnType<
  typeof usePublicGetPrefecturesLazyQuery
>;
export type PublicGetPrefecturesQueryResult = Apollo.QueryResult<
  PublicGetPrefecturesQuery,
  PublicGetPrefecturesQueryVariables
>;
