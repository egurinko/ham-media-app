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
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CurrentLocation = {
  __typename?: 'CurrentLocation';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type HospitalSearch = {
  __typename?: 'HospitalSearch';
  currentLocation?: Maybe<CurrentLocation>;
  insuranceEnabled: Scalars['Boolean']['output'];
  jsavaOption: Scalars['Boolean']['output'];
  nichijuOption: Scalars['Boolean']['output'];
  nightServiceOption: Scalars['Boolean']['output'];
  recommended: Scalars['Boolean']['output'];
  reservable: Scalars['Boolean']['output'];
  searchText?: Maybe<Scalars['String']['output']>;
};

export type ProductCartItem = {
  __typename?: 'ProductCartItem';
  count: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
};

export type ProductSearch = {
  __typename?: 'ProductSearch';
  allocatedInternalUserId?: Maybe<Scalars['Int']['output']>;
  hasStock?: Maybe<Scalars['Boolean']['output']>;
  internalUserId?: Maybe<Scalars['Int']['output']>;
  makerId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  productTagId?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  hospitalSearch: HospitalSearch;
  productCartItems: Array<ProductCartItem>;
  productSearch: ProductSearch;
  readIsAdmin: ReadIsAdmin;
};

export type ReadIsAdmin = {
  __typename?: 'ReadIsAdmin';
  isAdmin: Scalars['Boolean']['output'];
};

export type LocalGetHospitalSearchQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LocalGetHospitalSearchQuery = {
  __typename?: 'Query';
  hospitalSearch: {
    __typename?: 'HospitalSearch';
    searchText?: string | null;
    reservable: boolean;
    nightServiceOption: boolean;
    insuranceEnabled: boolean;
    jsavaOption: boolean;
    nichijuOption: boolean;
    recommended: boolean;
    currentLocation?: {
      __typename?: 'CurrentLocation';
      latitude: number;
      longitude: number;
    } | null;
  };
};

export type LocalGetProductCartItemsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LocalGetProductCartItemsQuery = {
  __typename?: 'Query';
  productCartItems: Array<{
    __typename?: 'ProductCartItem';
    count: number;
    productId: number;
  }>;
};

export type LocalReadIsAdminQueryVariables = Exact<{ [key: string]: never }>;

export type LocalReadIsAdminQuery = {
  __typename?: 'Query';
  readIsAdmin: { __typename?: 'ReadIsAdmin'; isAdmin: boolean };
};

export const LocalGetHospitalSearchDocument = gql`
  query LocalGetHospitalSearch {
    hospitalSearch @client {
      searchText
      currentLocation {
        latitude
        longitude
      }
      reservable
      nightServiceOption
      insuranceEnabled
      jsavaOption
      nichijuOption
      recommended
    }
  }
`;

/**
 * __useLocalGetHospitalSearchQuery__
 *
 * To run a query within a React component, call `useLocalGetHospitalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalGetHospitalSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalGetHospitalSearchQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocalGetHospitalSearchQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LocalGetHospitalSearchQuery,
    LocalGetHospitalSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LocalGetHospitalSearchQuery,
    LocalGetHospitalSearchQueryVariables
  >(LocalGetHospitalSearchDocument, options);
}
export function useLocalGetHospitalSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LocalGetHospitalSearchQuery,
    LocalGetHospitalSearchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LocalGetHospitalSearchQuery,
    LocalGetHospitalSearchQueryVariables
  >(LocalGetHospitalSearchDocument, options);
}
export type LocalGetHospitalSearchQueryHookResult = ReturnType<
  typeof useLocalGetHospitalSearchQuery
>;
export type LocalGetHospitalSearchLazyQueryHookResult = ReturnType<
  typeof useLocalGetHospitalSearchLazyQuery
>;
export type LocalGetHospitalSearchQueryResult = Apollo.QueryResult<
  LocalGetHospitalSearchQuery,
  LocalGetHospitalSearchQueryVariables
>;
export const LocalGetProductCartItemsDocument = gql`
  query LocalGetProductCartItems {
    productCartItems {
      count
      productId
    }
  }
`;

/**
 * __useLocalGetProductCartItemsQuery__
 *
 * To run a query within a React component, call `useLocalGetProductCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalGetProductCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalGetProductCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocalGetProductCartItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LocalGetProductCartItemsQuery,
    LocalGetProductCartItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LocalGetProductCartItemsQuery,
    LocalGetProductCartItemsQueryVariables
  >(LocalGetProductCartItemsDocument, options);
}
export function useLocalGetProductCartItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LocalGetProductCartItemsQuery,
    LocalGetProductCartItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LocalGetProductCartItemsQuery,
    LocalGetProductCartItemsQueryVariables
  >(LocalGetProductCartItemsDocument, options);
}
export type LocalGetProductCartItemsQueryHookResult = ReturnType<
  typeof useLocalGetProductCartItemsQuery
>;
export type LocalGetProductCartItemsLazyQueryHookResult = ReturnType<
  typeof useLocalGetProductCartItemsLazyQuery
>;
export type LocalGetProductCartItemsQueryResult = Apollo.QueryResult<
  LocalGetProductCartItemsQuery,
  LocalGetProductCartItemsQueryVariables
>;
export const LocalReadIsAdminDocument = gql`
  query LocalReadIsAdmin {
    readIsAdmin {
      isAdmin
    }
  }
`;

/**
 * __useLocalReadIsAdminQuery__
 *
 * To run a query within a React component, call `useLocalReadIsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalReadIsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalReadIsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocalReadIsAdminQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LocalReadIsAdminQuery,
    LocalReadIsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>(
    LocalReadIsAdminDocument,
    options
  );
}
export function useLocalReadIsAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LocalReadIsAdminQuery,
    LocalReadIsAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LocalReadIsAdminQuery,
    LocalReadIsAdminQueryVariables
  >(LocalReadIsAdminDocument, options);
}
export type LocalReadIsAdminQueryHookResult = ReturnType<
  typeof useLocalReadIsAdminQuery
>;
export type LocalReadIsAdminLazyQueryHookResult = ReturnType<
  typeof useLocalReadIsAdminLazyQuery
>;
export type LocalReadIsAdminQueryResult = Apollo.QueryResult<
  LocalReadIsAdminQuery,
  LocalReadIsAdminQueryVariables
>;
