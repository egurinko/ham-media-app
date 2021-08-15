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


/** A hospital */
export type Hospital = {
  __typename?: 'Hospital';
  deleted: Scalars['Boolean'];
  hospitalAddress?: Maybe<HospitalAddress>;
  hospitalBusinessForm?: Maybe<HospitalBusinessForm>;
  hospitalCertificationOption?: Maybe<HospitalCertificationOption>;
  hospitalInternalReputation?: Maybe<HospitalInternalReputation>;
  hospitalNightServiceOption?: Maybe<HospitalNightServiceOption>;
  hospitalNightUrgentActionOption?: Maybe<HospitalNightUrgentActionOption>;
  hospitalReservationStatus?: Maybe<HospitalReservationStatus>;
  id: Scalars['BigInt'];
  internal_memo: Scalars['String'];
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

export type HospitalAddressInputType = {
  address: Scalars['String'];
  phone_number: Scalars['String'];
  prefecture_id: Scalars['BigInt'];
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

export type HospitalBusinessFormInputType = {
  business_hour: Scalars['String'];
  closed_day: Scalars['String'];
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

export type HospitalCertificationOptionInputType = {
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

/** A hospital internal reputation */
export type HospitalInternalReputation = {
  __typename?: 'HospitalInternalReputation';
  id: Scalars['BigInt'];
  remark: Scalars['String'];
  star: Scalars['Int'];
};

export type HospitalInternalReputationInputType = {
  remark: Scalars['String'];
  star: Scalars['Int'];
};

/** A hospital night service option */
export type HospitalNightServiceOption = {
  __typename?: 'HospitalNightServiceOption';
  id: Scalars['BigInt'];
  remark: Scalars['String'];
  status: Scalars['String'];
};

export type HospitalNightServiceOptionInputType = {
  remark: Scalars['String'];
  status: Scalars['String'];
};

/** A hospital night urgent action option */
export type HospitalNightUrgentActionOption = {
  __typename?: 'HospitalNightUrgentActionOption';
  id: Scalars['BigInt'];
  status: Scalars['String'];
};

export type HospitalNightUrgentActionOptionInputType = {
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

export type HospitalReservationStatusInputType = {
  remark: Scalars['String'];
  required: Scalars['String'];
  reservable: Scalars['String'];
};

/** A internal user */
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
  updateHospital: Hospital;
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


export type MutationUpdateHospitalArgs = {
  deleted: Scalars['Boolean'];
  hospitalAddressInput: HospitalAddressInputType;
  hospitalBusinessFormInput: HospitalBusinessFormInputType;
  hospitalCertificationOptionInput: HospitalCertificationOptionInputType;
  hospitalInternalReputationInput: HospitalInternalReputationInputType;
  hospitalNightServiceOptionInput: HospitalNightServiceOptionInputType;
  hospitalNightUrgentActionOptionInput: HospitalNightUrgentActionOptionInputType;
  hospitalReservationStatusInput: HospitalReservationStatusInputType;
  id: Scalars['BigInt'];
  internal_memo: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUpdateInternalUserArgs = {
  email: Scalars['String'];
  id: Scalars['BigInt'];
  name: Scalars['String'];
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
  hospitalConnection?: Maybe<HospitalConnection>;
  hospitals: Array<Hospital>;
  internalUser: InternalUser;
  internalUsers: Array<InternalUser>;
  session: Session;
};


export type QueryHospitalArgs = {
  id: Scalars['BigInt'];
};


export type QueryHospitalConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryInternalUserArgs = {
  id: Scalars['BigInt'];
};

/** A region */
export type Region = {
  __typename?: 'Region';
  id: Scalars['BigInt'];
  name: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  token: Scalars['String'];
};

export type InternalCreateInternalUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type InternalCreateInternalUserMutation = { __typename?: 'Mutation', createInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type InternalDeleteInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalDeleteInternalUserMutation = { __typename?: 'Mutation', deleteInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type InternalGetHospitalQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetHospitalQuery = { __typename?: 'Query', hospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: Maybe<{ __typename?: 'HospitalAddress', address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt } }>, hospitalBusinessForm?: Maybe<{ __typename?: 'HospitalBusinessForm', business_hour: string, closed_day: string, insurance_enabled: string, remark: string }>, hospitalCertificationOption?: Maybe<{ __typename?: 'HospitalCertificationOption', nichiju_registered: string, jsava_registered: string }>, hospitalInternalReputation?: Maybe<{ __typename?: 'HospitalInternalReputation', star: number, remark: string }>, hospitalNightServiceOption?: Maybe<{ __typename?: 'HospitalNightServiceOption', status: string, remark: string }>, hospitalNightUrgentActionOption?: Maybe<{ __typename?: 'HospitalNightUrgentActionOption', status: string }>, hospitalReservationStatus?: Maybe<{ __typename?: 'HospitalReservationStatus', required: string, reservable: string, remark: string }> } };

export type InternalGetHospitalConnectionQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type InternalGetHospitalConnectionQuery = { __typename?: 'Query', hospitalConnection?: Maybe<{ __typename?: 'HospitalConnection', edges?: Maybe<Array<Maybe<{ __typename?: 'HospitalEdge', node?: Maybe<{ __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, hospitalAddress?: Maybe<{ __typename?: 'HospitalAddress', address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string } }>, hospitalInternalReputation?: Maybe<{ __typename?: 'HospitalInternalReputation', star: number }> }> }>>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> } }> };

export type InternalGetHospitalIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetHospitalIdsQuery = { __typename?: 'Query', hospitals: Array<{ __typename?: 'Hospital', id: BigInt }> };

export type InternalGetInternalUserQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetInternalUserQuery = { __typename?: 'Query', internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type InternalGetInternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetInternalUsersQuery = { __typename?: 'Query', internalUsers: Array<{ __typename?: 'InternalUser', id: BigInt, email: string, name: string }> };

export type InternalGetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetSessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', token: string } };

export type InternalUpdateHospitalMutationVariables = Exact<{
  id: Scalars['BigInt'];
  name: Scalars['String'];
  url: Scalars['String'];
  deleted: Scalars['Boolean'];
  internal_memo: Scalars['String'];
  hospitalAddressInput: HospitalAddressInputType;
  hospitalBusinessFormInput: HospitalBusinessFormInputType;
  hospitalCertificationOptionInput: HospitalCertificationOptionInputType;
  hospitalInternalReputationInput: HospitalInternalReputationInputType;
  hospitalNightServiceOptionInput: HospitalNightServiceOptionInputType;
  hospitalNightUrgentActionOptionInput: HospitalNightUrgentActionOptionInputType;
  hospitalReservationStatusInput: HospitalReservationStatusInputType;
}>;


export type InternalUpdateHospitalMutation = { __typename?: 'Mutation', updateHospital: { __typename?: 'Hospital', name: string } };

export type InternalUpdateInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type InternalUpdateInternalUserMutation = { __typename?: 'Mutation', updateInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };


export const InternalCreateInternalUserDocument = gql`
    mutation InternalCreateInternalUser($name: String!, $email: String!, $password: String!) {
  createInternalUser(name: $name, email: $email, password: $password) {
    id
    email
    name
  }
}
    `;
export type InternalCreateInternalUserMutationFn = Apollo.MutationFunction<InternalCreateInternalUserMutation, InternalCreateInternalUserMutationVariables>;

/**
 * __useInternalCreateInternalUserMutation__
 *
 * To run a mutation, you first call `useInternalCreateInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateInternalUserMutation, { data, loading, error }] = useInternalCreateInternalUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useInternalCreateInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateInternalUserMutation, InternalCreateInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateInternalUserMutation, InternalCreateInternalUserMutationVariables>(InternalCreateInternalUserDocument, options);
      }
export type InternalCreateInternalUserMutationHookResult = ReturnType<typeof useInternalCreateInternalUserMutation>;
export type InternalCreateInternalUserMutationResult = Apollo.MutationResult<InternalCreateInternalUserMutation>;
export type InternalCreateInternalUserMutationOptions = Apollo.BaseMutationOptions<InternalCreateInternalUserMutation, InternalCreateInternalUserMutationVariables>;
export const InternalDeleteInternalUserDocument = gql`
    mutation InternalDeleteInternalUser($id: BigInt!) {
  deleteInternalUser(id: $id) {
    id
    email
    name
  }
}
    `;
export type InternalDeleteInternalUserMutationFn = Apollo.MutationFunction<InternalDeleteInternalUserMutation, InternalDeleteInternalUserMutationVariables>;

/**
 * __useInternalDeleteInternalUserMutation__
 *
 * To run a mutation, you first call `useInternalDeleteInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteInternalUserMutation, { data, loading, error }] = useInternalDeleteInternalUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteInternalUserMutation, InternalDeleteInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteInternalUserMutation, InternalDeleteInternalUserMutationVariables>(InternalDeleteInternalUserDocument, options);
      }
export type InternalDeleteInternalUserMutationHookResult = ReturnType<typeof useInternalDeleteInternalUserMutation>;
export type InternalDeleteInternalUserMutationResult = Apollo.MutationResult<InternalDeleteInternalUserMutation>;
export type InternalDeleteInternalUserMutationOptions = Apollo.BaseMutationOptions<InternalDeleteInternalUserMutation, InternalDeleteInternalUserMutationVariables>;
export const InternalGetHospitalDocument = gql`
    query InternalGetHospital($id: BigInt!) {
  hospital(id: $id) {
    id
    name
    url
    deleted
    internal_memo
    hospitalAddress {
      address
      phone_number
      prefecture {
        name
        id
      }
    }
    hospitalBusinessForm {
      business_hour
      closed_day
      insurance_enabled
      remark
    }
    hospitalCertificationOption {
      nichiju_registered
      jsava_registered
    }
    hospitalInternalReputation {
      star
      remark
    }
    hospitalNightServiceOption {
      status
      remark
    }
    hospitalNightUrgentActionOption {
      status
    }
    hospitalReservationStatus {
      required
      reservable
      remark
    }
  }
}
    `;

/**
 * __useInternalGetHospitalQuery__
 *
 * To run a query within a React component, call `useInternalGetHospitalQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetHospitalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetHospitalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetHospitalQuery(baseOptions: Apollo.QueryHookOptions<InternalGetHospitalQuery, InternalGetHospitalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetHospitalQuery, InternalGetHospitalQueryVariables>(InternalGetHospitalDocument, options);
      }
export function useInternalGetHospitalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetHospitalQuery, InternalGetHospitalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetHospitalQuery, InternalGetHospitalQueryVariables>(InternalGetHospitalDocument, options);
        }
export type InternalGetHospitalQueryHookResult = ReturnType<typeof useInternalGetHospitalQuery>;
export type InternalGetHospitalLazyQueryHookResult = ReturnType<typeof useInternalGetHospitalLazyQuery>;
export type InternalGetHospitalQueryResult = Apollo.QueryResult<InternalGetHospitalQuery, InternalGetHospitalQueryVariables>;
export const InternalGetHospitalConnectionDocument = gql`
    query InternalGetHospitalConnection($first: Int, $after: String) {
  hospitalConnection(first: $first, after: $after) {
    edges {
      node {
        id
        name
        url
        deleted
        hospitalAddress {
          address
          phone_number
          prefecture {
            name
          }
        }
        hospitalInternalReputation {
          star
        }
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
    `;

/**
 * __useInternalGetHospitalConnectionQuery__
 *
 * To run a query within a React component, call `useInternalGetHospitalConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetHospitalConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetHospitalConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useInternalGetHospitalConnectionQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>(InternalGetHospitalConnectionDocument, options);
      }
export function useInternalGetHospitalConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>(InternalGetHospitalConnectionDocument, options);
        }
export type InternalGetHospitalConnectionQueryHookResult = ReturnType<typeof useInternalGetHospitalConnectionQuery>;
export type InternalGetHospitalConnectionLazyQueryHookResult = ReturnType<typeof useInternalGetHospitalConnectionLazyQuery>;
export type InternalGetHospitalConnectionQueryResult = Apollo.QueryResult<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>;
export const InternalGetHospitalIdsDocument = gql`
    query InternalGetHospitalIds {
  hospitals {
    id
  }
}
    `;

/**
 * __useInternalGetHospitalIdsQuery__
 *
 * To run a query within a React component, call `useInternalGetHospitalIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetHospitalIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetHospitalIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetHospitalIdsQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetHospitalIdsQuery, InternalGetHospitalIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetHospitalIdsQuery, InternalGetHospitalIdsQueryVariables>(InternalGetHospitalIdsDocument, options);
      }
export function useInternalGetHospitalIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetHospitalIdsQuery, InternalGetHospitalIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetHospitalIdsQuery, InternalGetHospitalIdsQueryVariables>(InternalGetHospitalIdsDocument, options);
        }
export type InternalGetHospitalIdsQueryHookResult = ReturnType<typeof useInternalGetHospitalIdsQuery>;
export type InternalGetHospitalIdsLazyQueryHookResult = ReturnType<typeof useInternalGetHospitalIdsLazyQuery>;
export type InternalGetHospitalIdsQueryResult = Apollo.QueryResult<InternalGetHospitalIdsQuery, InternalGetHospitalIdsQueryVariables>;
export const InternalGetInternalUserDocument = gql`
    query InternalGetInternalUser($id: BigInt!) {
  internalUser(id: $id) {
    id
    email
    name
  }
}
    `;

/**
 * __useInternalGetInternalUserQuery__
 *
 * To run a query within a React component, call `useInternalGetInternalUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetInternalUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetInternalUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetInternalUserQuery(baseOptions: Apollo.QueryHookOptions<InternalGetInternalUserQuery, InternalGetInternalUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetInternalUserQuery, InternalGetInternalUserQueryVariables>(InternalGetInternalUserDocument, options);
      }
export function useInternalGetInternalUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetInternalUserQuery, InternalGetInternalUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetInternalUserQuery, InternalGetInternalUserQueryVariables>(InternalGetInternalUserDocument, options);
        }
export type InternalGetInternalUserQueryHookResult = ReturnType<typeof useInternalGetInternalUserQuery>;
export type InternalGetInternalUserLazyQueryHookResult = ReturnType<typeof useInternalGetInternalUserLazyQuery>;
export type InternalGetInternalUserQueryResult = Apollo.QueryResult<InternalGetInternalUserQuery, InternalGetInternalUserQueryVariables>;
export const InternalGetInternalUsersDocument = gql`
    query InternalGetInternalUsers {
  internalUsers {
    id
    email
    name
  }
}
    `;

/**
 * __useInternalGetInternalUsersQuery__
 *
 * To run a query within a React component, call `useInternalGetInternalUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetInternalUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetInternalUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetInternalUsersQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetInternalUsersQuery, InternalGetInternalUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetInternalUsersQuery, InternalGetInternalUsersQueryVariables>(InternalGetInternalUsersDocument, options);
      }
export function useInternalGetInternalUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetInternalUsersQuery, InternalGetInternalUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetInternalUsersQuery, InternalGetInternalUsersQueryVariables>(InternalGetInternalUsersDocument, options);
        }
export type InternalGetInternalUsersQueryHookResult = ReturnType<typeof useInternalGetInternalUsersQuery>;
export type InternalGetInternalUsersLazyQueryHookResult = ReturnType<typeof useInternalGetInternalUsersLazyQuery>;
export type InternalGetInternalUsersQueryResult = Apollo.QueryResult<InternalGetInternalUsersQuery, InternalGetInternalUsersQueryVariables>;
export const InternalGetSessionDocument = gql`
    query InternalGetSession {
  session {
    token
  }
}
    `;

/**
 * __useInternalGetSessionQuery__
 *
 * To run a query within a React component, call `useInternalGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetSessionQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetSessionQuery, InternalGetSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetSessionQuery, InternalGetSessionQueryVariables>(InternalGetSessionDocument, options);
      }
export function useInternalGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetSessionQuery, InternalGetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetSessionQuery, InternalGetSessionQueryVariables>(InternalGetSessionDocument, options);
        }
export type InternalGetSessionQueryHookResult = ReturnType<typeof useInternalGetSessionQuery>;
export type InternalGetSessionLazyQueryHookResult = ReturnType<typeof useInternalGetSessionLazyQuery>;
export type InternalGetSessionQueryResult = Apollo.QueryResult<InternalGetSessionQuery, InternalGetSessionQueryVariables>;
export const InternalUpdateHospitalDocument = gql`
    mutation InternalUpdateHospital($id: BigInt!, $name: String!, $url: String!, $deleted: Boolean!, $internal_memo: String!, $hospitalAddressInput: HospitalAddressInputType!, $hospitalBusinessFormInput: HospitalBusinessFormInputType!, $hospitalCertificationOptionInput: HospitalCertificationOptionInputType!, $hospitalInternalReputationInput: HospitalInternalReputationInputType!, $hospitalNightServiceOptionInput: HospitalNightServiceOptionInputType!, $hospitalNightUrgentActionOptionInput: HospitalNightUrgentActionOptionInputType!, $hospitalReservationStatusInput: HospitalReservationStatusInputType!) {
  updateHospital(
    id: $id
    name: $name
    url: $url
    deleted: $deleted
    internal_memo: $internal_memo
    hospitalAddressInput: $hospitalAddressInput
    hospitalBusinessFormInput: $hospitalBusinessFormInput
    hospitalCertificationOptionInput: $hospitalCertificationOptionInput
    hospitalInternalReputationInput: $hospitalInternalReputationInput
    hospitalNightServiceOptionInput: $hospitalNightServiceOptionInput
    hospitalNightUrgentActionOptionInput: $hospitalNightUrgentActionOptionInput
    hospitalReservationStatusInput: $hospitalReservationStatusInput
  ) {
    name
  }
}
    `;
export type InternalUpdateHospitalMutationFn = Apollo.MutationFunction<InternalUpdateHospitalMutation, InternalUpdateHospitalMutationVariables>;

/**
 * __useInternalUpdateHospitalMutation__
 *
 * To run a mutation, you first call `useInternalUpdateHospitalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateHospitalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateHospitalMutation, { data, loading, error }] = useInternalUpdateHospitalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      deleted: // value for 'deleted'
 *      internal_memo: // value for 'internal_memo'
 *      hospitalAddressInput: // value for 'hospitalAddressInput'
 *      hospitalBusinessFormInput: // value for 'hospitalBusinessFormInput'
 *      hospitalCertificationOptionInput: // value for 'hospitalCertificationOptionInput'
 *      hospitalInternalReputationInput: // value for 'hospitalInternalReputationInput'
 *      hospitalNightServiceOptionInput: // value for 'hospitalNightServiceOptionInput'
 *      hospitalNightUrgentActionOptionInput: // value for 'hospitalNightUrgentActionOptionInput'
 *      hospitalReservationStatusInput: // value for 'hospitalReservationStatusInput'
 *   },
 * });
 */
export function useInternalUpdateHospitalMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateHospitalMutation, InternalUpdateHospitalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateHospitalMutation, InternalUpdateHospitalMutationVariables>(InternalUpdateHospitalDocument, options);
      }
export type InternalUpdateHospitalMutationHookResult = ReturnType<typeof useInternalUpdateHospitalMutation>;
export type InternalUpdateHospitalMutationResult = Apollo.MutationResult<InternalUpdateHospitalMutation>;
export type InternalUpdateHospitalMutationOptions = Apollo.BaseMutationOptions<InternalUpdateHospitalMutation, InternalUpdateHospitalMutationVariables>;
export const InternalUpdateInternalUserDocument = gql`
    mutation InternalUpdateInternalUser($id: BigInt!, $name: String!, $email: String!, $password: String!) {
  updateInternalUser(id: $id, name: $name, email: $email, password: $password) {
    id
    email
    name
  }
}
    `;
export type InternalUpdateInternalUserMutationFn = Apollo.MutationFunction<InternalUpdateInternalUserMutation, InternalUpdateInternalUserMutationVariables>;

/**
 * __useInternalUpdateInternalUserMutation__
 *
 * To run a mutation, you first call `useInternalUpdateInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateInternalUserMutation, { data, loading, error }] = useInternalUpdateInternalUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useInternalUpdateInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateInternalUserMutation, InternalUpdateInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateInternalUserMutation, InternalUpdateInternalUserMutationVariables>(InternalUpdateInternalUserDocument, options);
      }
export type InternalUpdateInternalUserMutationHookResult = ReturnType<typeof useInternalUpdateInternalUserMutation>;
export type InternalUpdateInternalUserMutationResult = Apollo.MutationResult<InternalUpdateInternalUserMutation>;
export type InternalUpdateInternalUserMutationOptions = Apollo.BaseMutationOptions<InternalUpdateInternalUserMutation, InternalUpdateInternalUserMutationVariables>;