import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type CreateStocksStocksInputType = {
  amount: Scalars['Int'];
  expiredAt: Scalars['DateTime'];
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
  role: Role;
};

/** A maker */
export type Maker = {
  __typename?: 'Maker';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHospital: Hospital;
  createInternalUser: InternalUser;
  createMaker: Maker;
  createProduct: Product;
  createStocks: Array<Stock>;
  deleteInternalUser: InternalUser;
  deleteMaker: Maker;
  updateHospital: Hospital;
  updateInternalUser: InternalUser;
  updateMaker: Maker;
  updateProduct: Product;
};


export type MutationCreateHospitalArgs = {
  deleted: Scalars['Boolean'];
  internal_memo: Scalars['String'];
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationCreateInternalUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['Int'];
};


export type MutationCreateMakerArgs = {
  name: Scalars['String'];
};


export type MutationCreateProductArgs = {
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
};


export type MutationCreateStocksArgs = {
  productId: Scalars['Int'];
  stocks: Array<CreateStocksStocksInputType>;
};


export type MutationDeleteInternalUserArgs = {
  id: Scalars['BigInt'];
};


export type MutationDeleteMakerArgs = {
  id: Scalars['Int'];
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
  roleId: Scalars['Int'];
};


export type MutationUpdateMakerArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int'];
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
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

/** A product */
export type Product = {
  __typename?: 'Product';
  allocatedStockAmount: Scalars['Int'];
  id: Scalars['Int'];
  maker: Maker;
  name: Scalars['String'];
  remainingStockAmount: Scalars['Int'];
  remark: Scalars['String'];
  stocks: Array<Stock>;
  totalStockAmount: Scalars['Int'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  hospital: Hospital;
  hospitalConnection?: Maybe<HospitalConnection>;
  hospitals: Array<Hospital>;
  internalUser: InternalUser;
  internalUsers: Array<InternalUser>;
  maker: Maker;
  makers: Array<Maker>;
  product: Product;
  productConnection?: Maybe<ProductConnection>;
  products: Array<Product>;
  roles: Array<Role>;
  session: Session;
  stocks: Array<Stock>;
};


export type QueryHospitalArgs = {
  id: Scalars['BigInt'];
};


export type QueryHospitalConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  prefectureId?: InputMaybe<Scalars['BigInt']>;
};


export type QueryInternalUserArgs = {
  id: Scalars['BigInt'];
};


export type QueryMakerArgs = {
  id: Scalars['Int'];
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryProductConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryStocksArgs = {
  productId: Scalars['Int'];
};

/** A region */
export type Region = {
  __typename?: 'Region';
  id: Scalars['BigInt'];
  name: Scalars['String'];
};

/** A role */
export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  internalUser: InternalUser;
  token: Scalars['String'];
};

/** A stock */
export type Stock = {
  __typename?: 'Stock';
  expired_at: Scalars['DateTime'];
  id: Scalars['Int'];
  stockAllocation?: Maybe<StockAllocation>;
};

/** A stock allocation */
export type StockAllocation = {
  __typename?: 'StockAllocation';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  internalUser: InternalUser;
};

export type InternalCreateHospitalMutationVariables = Exact<{
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
  internal_memo: Scalars['String'];
}>;


export type InternalCreateHospitalMutation = { __typename?: 'Mutation', createHospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt } } | null | undefined, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null | undefined, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null | undefined, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null | undefined, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null | undefined, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null | undefined, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null | undefined } };

export type InternalCreateInternalUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['Int'];
}>;


export type InternalCreateInternalUserMutation = { __typename?: 'Mutation', createInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } };

export type InternalCreateMakerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type InternalCreateMakerMutation = { __typename?: 'Mutation', createMaker: { __typename?: 'Maker', id: number, name: string } };

export type InternalCreateProductMutationVariables = Exact<{
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
}>;


export type InternalCreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number, name: string, remark: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> } };

export type InternalCreateStocksMutationVariables = Exact<{
  productId: Scalars['Int'];
  stocks: Array<CreateStocksStocksInputType> | CreateStocksStocksInputType;
}>;


export type InternalCreateStocksMutation = { __typename?: 'Mutation', createStocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> };

export type InternalDeleteInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalDeleteInternalUserMutation = { __typename?: 'Mutation', deleteInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string } };

export type InternalDeleteMakerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteMakerMutation = { __typename?: 'Mutation', deleteMaker: { __typename?: 'Maker', id: number, name: string } };

export type HospitalFieldsFragment = { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt } } | null | undefined, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null | undefined, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null | undefined, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null | undefined, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null | undefined, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null | undefined, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null | undefined };

export type InternalUserFieldsFragment = { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } };

export type MakerFieldsFragment = { __typename?: 'Maker', id: number, name: string };

export type ProductFieldsFragment = { __typename?: 'Product', id: number, name: string, remark: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> };

export type StockFieldsFragment = { __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined };

export type RoleFieldsFragment = { __typename?: 'Role', id: number, name: string };

export type InternalGetHospitalQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetHospitalQuery = { __typename?: 'Query', hospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt } } | null | undefined, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null | undefined, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null | undefined, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null | undefined, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null | undefined, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null | undefined, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null | undefined } };

export type InternalGetHospitalConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  prefectureId?: InputMaybe<Scalars['BigInt']>;
}>;


export type InternalGetHospitalConnectionQuery = { __typename?: 'Query', hospitalConnection?: { __typename?: 'HospitalConnection', edges?: Array<{ __typename?: 'HospitalEdge', node?: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt } } | null | undefined, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null | undefined, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null | undefined, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null | undefined, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null | undefined, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null | undefined, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null | undefined } | null | undefined } | null | undefined> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined, endCursor?: string | null | undefined } } | null | undefined };

export type InternalGetHospitalIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetHospitalIdsQuery = { __typename?: 'Query', hospitals: Array<{ __typename?: 'Hospital', id: BigInt }> };

export type InternalGetInternalUserQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetInternalUserQuery = { __typename?: 'Query', internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } };

export type InternalGetInternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetInternalUsersQuery = { __typename?: 'Query', internalUsers: Array<{ __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } }> };

export type InternalGetMakerQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetMakerQuery = { __typename?: 'Query', maker: { __typename?: 'Maker', id: number, name: string } };

export type InternalGetMakersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetMakersQuery = { __typename?: 'Query', makers: Array<{ __typename?: 'Maker', id: number, name: string }> };

export type InternalGetProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, remark: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> } };

export type InternalGetProductConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type InternalGetProductConnectionQuery = { __typename?: 'Query', productConnection?: { __typename?: 'ProductConnection', edges?: Array<{ __typename?: 'ProductEdge', node?: { __typename?: 'Product', id: number, name: string, remark: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> } | null | undefined } | null | undefined> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null | undefined, endCursor?: string | null | undefined } } | null | undefined };

export type InternalGetProductIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetProductIdsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number }> };

export type InternalGetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: number, name: string }> };

export type InternalGetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetSessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', token: string, internalUser: { __typename?: 'InternalUser', id: BigInt, name: string, email: string } } };

export type InternalGetStocksQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type InternalGetStocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> };

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
  roleId: Scalars['Int'];
}>;


export type InternalUpdateInternalUserMutation = { __typename?: 'Mutation', updateInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } };

export type InternalUpdateMakerMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type InternalUpdateMakerMutation = { __typename?: 'Mutation', updateMaker: { __typename?: 'Maker', id: number, name: string } };

export type InternalUpdateProductMutationVariables = Exact<{
  id: Scalars['Int'];
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
}>;


export type InternalUpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: number, name: string, remark: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, role: { __typename?: 'Role', id: number, name: string } } } | null | undefined }> } };

export const HospitalFieldsFragmentDoc = gql`
    fragment HospitalFields on Hospital {
  id
  name
  url
  deleted
  internal_memo
  hospitalAddress {
    id
    address
    phone_number
    prefecture {
      name
      id
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
  hospitalInternalReputation {
    id
    star
    remark
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
export const MakerFieldsFragmentDoc = gql`
    fragment MakerFields on Maker {
  id
  name
}
    `;
export const RoleFieldsFragmentDoc = gql`
    fragment RoleFields on Role {
  id
  name
}
    `;
export const InternalUserFieldsFragmentDoc = gql`
    fragment InternalUserFields on InternalUser {
  id
  email
  name
  role {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;
export const StockFieldsFragmentDoc = gql`
    fragment StockFields on Stock {
  id
  expired_at
  stockAllocation {
    created_at
    id
    internalUser {
      ...InternalUserFields
    }
  }
}
    ${InternalUserFieldsFragmentDoc}`;
export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  id
  name
  remark
  maker {
    ...MakerFields
  }
  stocks {
    ...StockFields
  }
  totalStockAmount
  allocatedStockAmount
  remainingStockAmount
}
    ${MakerFieldsFragmentDoc}
${StockFieldsFragmentDoc}`;
export const InternalCreateHospitalDocument = gql`
    mutation InternalCreateHospital($name: String!, $url: String, $deleted: Boolean!, $internal_memo: String!) {
  createHospital(
    name: $name
    url: $url
    deleted: $deleted
    internal_memo: $internal_memo
  ) {
    ...HospitalFields
  }
}
    ${HospitalFieldsFragmentDoc}`;
export type InternalCreateHospitalMutationFn = Apollo.MutationFunction<InternalCreateHospitalMutation, InternalCreateHospitalMutationVariables>;

/**
 * __useInternalCreateHospitalMutation__
 *
 * To run a mutation, you first call `useInternalCreateHospitalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateHospitalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateHospitalMutation, { data, loading, error }] = useInternalCreateHospitalMutation({
 *   variables: {
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      deleted: // value for 'deleted'
 *      internal_memo: // value for 'internal_memo'
 *   },
 * });
 */
export function useInternalCreateHospitalMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateHospitalMutation, InternalCreateHospitalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateHospitalMutation, InternalCreateHospitalMutationVariables>(InternalCreateHospitalDocument, options);
      }
export type InternalCreateHospitalMutationHookResult = ReturnType<typeof useInternalCreateHospitalMutation>;
export type InternalCreateHospitalMutationResult = Apollo.MutationResult<InternalCreateHospitalMutation>;
export type InternalCreateHospitalMutationOptions = Apollo.BaseMutationOptions<InternalCreateHospitalMutation, InternalCreateHospitalMutationVariables>;
export const InternalCreateInternalUserDocument = gql`
    mutation InternalCreateInternalUser($name: String!, $email: String!, $password: String!, $roleId: Int!) {
  createInternalUser(
    name: $name
    email: $email
    password: $password
    roleId: $roleId
  ) {
    ...InternalUserFields
  }
}
    ${InternalUserFieldsFragmentDoc}`;
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
 *      roleId: // value for 'roleId'
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
export const InternalCreateMakerDocument = gql`
    mutation InternalCreateMaker($name: String!) {
  createMaker(name: $name) {
    ...MakerFields
  }
}
    ${MakerFieldsFragmentDoc}`;
export type InternalCreateMakerMutationFn = Apollo.MutationFunction<InternalCreateMakerMutation, InternalCreateMakerMutationVariables>;

/**
 * __useInternalCreateMakerMutation__
 *
 * To run a mutation, you first call `useInternalCreateMakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateMakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateMakerMutation, { data, loading, error }] = useInternalCreateMakerMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInternalCreateMakerMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateMakerMutation, InternalCreateMakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateMakerMutation, InternalCreateMakerMutationVariables>(InternalCreateMakerDocument, options);
      }
export type InternalCreateMakerMutationHookResult = ReturnType<typeof useInternalCreateMakerMutation>;
export type InternalCreateMakerMutationResult = Apollo.MutationResult<InternalCreateMakerMutation>;
export type InternalCreateMakerMutationOptions = Apollo.BaseMutationOptions<InternalCreateMakerMutation, InternalCreateMakerMutationVariables>;
export const InternalCreateProductDocument = gql`
    mutation InternalCreateProduct($makerId: Int!, $name: String!, $remark: String!) {
  createProduct(makerId: $makerId, name: $name, remark: $remark) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type InternalCreateProductMutationFn = Apollo.MutationFunction<InternalCreateProductMutation, InternalCreateProductMutationVariables>;

/**
 * __useInternalCreateProductMutation__
 *
 * To run a mutation, you first call `useInternalCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateProductMutation, { data, loading, error }] = useInternalCreateProductMutation({
 *   variables: {
 *      makerId: // value for 'makerId'
 *      name: // value for 'name'
 *      remark: // value for 'remark'
 *   },
 * });
 */
export function useInternalCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateProductMutation, InternalCreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateProductMutation, InternalCreateProductMutationVariables>(InternalCreateProductDocument, options);
      }
export type InternalCreateProductMutationHookResult = ReturnType<typeof useInternalCreateProductMutation>;
export type InternalCreateProductMutationResult = Apollo.MutationResult<InternalCreateProductMutation>;
export type InternalCreateProductMutationOptions = Apollo.BaseMutationOptions<InternalCreateProductMutation, InternalCreateProductMutationVariables>;
export const InternalCreateStocksDocument = gql`
    mutation InternalCreateStocks($productId: Int!, $stocks: [CreateStocksStocksInputType!]!) {
  createStocks(productId: $productId, stocks: $stocks) {
    ...StockFields
  }
}
    ${StockFieldsFragmentDoc}`;
export type InternalCreateStocksMutationFn = Apollo.MutationFunction<InternalCreateStocksMutation, InternalCreateStocksMutationVariables>;

/**
 * __useInternalCreateStocksMutation__
 *
 * To run a mutation, you first call `useInternalCreateStocksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateStocksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateStocksMutation, { data, loading, error }] = useInternalCreateStocksMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      stocks: // value for 'stocks'
 *   },
 * });
 */
export function useInternalCreateStocksMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateStocksMutation, InternalCreateStocksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateStocksMutation, InternalCreateStocksMutationVariables>(InternalCreateStocksDocument, options);
      }
export type InternalCreateStocksMutationHookResult = ReturnType<typeof useInternalCreateStocksMutation>;
export type InternalCreateStocksMutationResult = Apollo.MutationResult<InternalCreateStocksMutation>;
export type InternalCreateStocksMutationOptions = Apollo.BaseMutationOptions<InternalCreateStocksMutation, InternalCreateStocksMutationVariables>;
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
export const InternalDeleteMakerDocument = gql`
    mutation InternalDeleteMaker($id: Int!) {
  deleteMaker(id: $id) {
    id
    name
  }
}
    `;
export type InternalDeleteMakerMutationFn = Apollo.MutationFunction<InternalDeleteMakerMutation, InternalDeleteMakerMutationVariables>;

/**
 * __useInternalDeleteMakerMutation__
 *
 * To run a mutation, you first call `useInternalDeleteMakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteMakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteMakerMutation, { data, loading, error }] = useInternalDeleteMakerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteMakerMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteMakerMutation, InternalDeleteMakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteMakerMutation, InternalDeleteMakerMutationVariables>(InternalDeleteMakerDocument, options);
      }
export type InternalDeleteMakerMutationHookResult = ReturnType<typeof useInternalDeleteMakerMutation>;
export type InternalDeleteMakerMutationResult = Apollo.MutationResult<InternalDeleteMakerMutation>;
export type InternalDeleteMakerMutationOptions = Apollo.BaseMutationOptions<InternalDeleteMakerMutation, InternalDeleteMakerMutationVariables>;
export const InternalGetHospitalDocument = gql`
    query InternalGetHospital($id: BigInt!) {
  hospital(id: $id) {
    ...HospitalFields
  }
}
    ${HospitalFieldsFragmentDoc}`;

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
    query InternalGetHospitalConnection($first: Int, $after: String, $name: String, $deleted: Boolean, $prefectureId: BigInt) {
  hospitalConnection(
    first: $first
    after: $after
    name: $name
    deleted: $deleted
    prefectureId: $prefectureId
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
 *      name: // value for 'name'
 *      deleted: // value for 'deleted'
 *      prefectureId: // value for 'prefectureId'
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
    ...InternalUserFields
  }
}
    ${InternalUserFieldsFragmentDoc}`;

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
    ...InternalUserFields
  }
}
    ${InternalUserFieldsFragmentDoc}`;

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
export const InternalGetMakerDocument = gql`
    query InternalGetMaker($id: Int!) {
  maker(id: $id) {
    ...MakerFields
  }
}
    ${MakerFieldsFragmentDoc}`;

/**
 * __useInternalGetMakerQuery__
 *
 * To run a query within a React component, call `useInternalGetMakerQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetMakerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetMakerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetMakerQuery(baseOptions: Apollo.QueryHookOptions<InternalGetMakerQuery, InternalGetMakerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetMakerQuery, InternalGetMakerQueryVariables>(InternalGetMakerDocument, options);
      }
export function useInternalGetMakerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetMakerQuery, InternalGetMakerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetMakerQuery, InternalGetMakerQueryVariables>(InternalGetMakerDocument, options);
        }
export type InternalGetMakerQueryHookResult = ReturnType<typeof useInternalGetMakerQuery>;
export type InternalGetMakerLazyQueryHookResult = ReturnType<typeof useInternalGetMakerLazyQuery>;
export type InternalGetMakerQueryResult = Apollo.QueryResult<InternalGetMakerQuery, InternalGetMakerQueryVariables>;
export const InternalGetMakersDocument = gql`
    query InternalGetMakers {
  makers {
    ...MakerFields
  }
}
    ${MakerFieldsFragmentDoc}`;

/**
 * __useInternalGetMakersQuery__
 *
 * To run a query within a React component, call `useInternalGetMakersQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetMakersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetMakersQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetMakersQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetMakersQuery, InternalGetMakersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetMakersQuery, InternalGetMakersQueryVariables>(InternalGetMakersDocument, options);
      }
export function useInternalGetMakersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetMakersQuery, InternalGetMakersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetMakersQuery, InternalGetMakersQueryVariables>(InternalGetMakersDocument, options);
        }
export type InternalGetMakersQueryHookResult = ReturnType<typeof useInternalGetMakersQuery>;
export type InternalGetMakersLazyQueryHookResult = ReturnType<typeof useInternalGetMakersLazyQuery>;
export type InternalGetMakersQueryResult = Apollo.QueryResult<InternalGetMakersQuery, InternalGetMakersQueryVariables>;
export const InternalGetProductDocument = gql`
    query InternalGetProduct($id: Int!) {
  product(id: $id) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useInternalGetProductQuery__
 *
 * To run a query within a React component, call `useInternalGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetProductQuery(baseOptions: Apollo.QueryHookOptions<InternalGetProductQuery, InternalGetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductQuery, InternalGetProductQueryVariables>(InternalGetProductDocument, options);
      }
export function useInternalGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductQuery, InternalGetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductQuery, InternalGetProductQueryVariables>(InternalGetProductDocument, options);
        }
export type InternalGetProductQueryHookResult = ReturnType<typeof useInternalGetProductQuery>;
export type InternalGetProductLazyQueryHookResult = ReturnType<typeof useInternalGetProductLazyQuery>;
export type InternalGetProductQueryResult = Apollo.QueryResult<InternalGetProductQuery, InternalGetProductQueryVariables>;
export const InternalGetProductConnectionDocument = gql`
    query InternalGetProductConnection($first: Int, $after: String) {
  productConnection(first: $first, after: $after) {
    edges {
      node {
        ...ProductFields
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
    ${ProductFieldsFragmentDoc}`;

/**
 * __useInternalGetProductConnectionQuery__
 *
 * To run a query within a React component, call `useInternalGetProductConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useInternalGetProductConnectionQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetProductConnectionQuery, InternalGetProductConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductConnectionQuery, InternalGetProductConnectionQueryVariables>(InternalGetProductConnectionDocument, options);
      }
export function useInternalGetProductConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductConnectionQuery, InternalGetProductConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductConnectionQuery, InternalGetProductConnectionQueryVariables>(InternalGetProductConnectionDocument, options);
        }
export type InternalGetProductConnectionQueryHookResult = ReturnType<typeof useInternalGetProductConnectionQuery>;
export type InternalGetProductConnectionLazyQueryHookResult = ReturnType<typeof useInternalGetProductConnectionLazyQuery>;
export type InternalGetProductConnectionQueryResult = Apollo.QueryResult<InternalGetProductConnectionQuery, InternalGetProductConnectionQueryVariables>;
export const InternalGetProductIdsDocument = gql`
    query InternalGetProductIds {
  products {
    id
  }
}
    `;

/**
 * __useInternalGetProductIdsQuery__
 *
 * To run a query within a React component, call `useInternalGetProductIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetProductIdsQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetProductIdsQuery, InternalGetProductIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductIdsQuery, InternalGetProductIdsQueryVariables>(InternalGetProductIdsDocument, options);
      }
export function useInternalGetProductIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductIdsQuery, InternalGetProductIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductIdsQuery, InternalGetProductIdsQueryVariables>(InternalGetProductIdsDocument, options);
        }
export type InternalGetProductIdsQueryHookResult = ReturnType<typeof useInternalGetProductIdsQuery>;
export type InternalGetProductIdsLazyQueryHookResult = ReturnType<typeof useInternalGetProductIdsLazyQuery>;
export type InternalGetProductIdsQueryResult = Apollo.QueryResult<InternalGetProductIdsQuery, InternalGetProductIdsQueryVariables>;
export const InternalGetRolesDocument = gql`
    query InternalGetRoles {
  roles {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;

/**
 * __useInternalGetRolesQuery__
 *
 * To run a query within a React component, call `useInternalGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetRolesQuery, InternalGetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetRolesQuery, InternalGetRolesQueryVariables>(InternalGetRolesDocument, options);
      }
export function useInternalGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetRolesQuery, InternalGetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetRolesQuery, InternalGetRolesQueryVariables>(InternalGetRolesDocument, options);
        }
export type InternalGetRolesQueryHookResult = ReturnType<typeof useInternalGetRolesQuery>;
export type InternalGetRolesLazyQueryHookResult = ReturnType<typeof useInternalGetRolesLazyQuery>;
export type InternalGetRolesQueryResult = Apollo.QueryResult<InternalGetRolesQuery, InternalGetRolesQueryVariables>;
export const InternalGetSessionDocument = gql`
    query InternalGetSession {
  session {
    token
    internalUser {
      id
      name
      email
    }
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
export const InternalGetStocksDocument = gql`
    query InternalGetStocks($productId: Int!) {
  stocks(productId: $productId) {
    ...StockFields
  }
}
    ${StockFieldsFragmentDoc}`;

/**
 * __useInternalGetStocksQuery__
 *
 * To run a query within a React component, call `useInternalGetStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetStocksQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useInternalGetStocksQuery(baseOptions: Apollo.QueryHookOptions<InternalGetStocksQuery, InternalGetStocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetStocksQuery, InternalGetStocksQueryVariables>(InternalGetStocksDocument, options);
      }
export function useInternalGetStocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetStocksQuery, InternalGetStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetStocksQuery, InternalGetStocksQueryVariables>(InternalGetStocksDocument, options);
        }
export type InternalGetStocksQueryHookResult = ReturnType<typeof useInternalGetStocksQuery>;
export type InternalGetStocksLazyQueryHookResult = ReturnType<typeof useInternalGetStocksLazyQuery>;
export type InternalGetStocksQueryResult = Apollo.QueryResult<InternalGetStocksQuery, InternalGetStocksQueryVariables>;
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
    mutation InternalUpdateInternalUser($id: BigInt!, $name: String!, $email: String!, $password: String!, $roleId: Int!) {
  updateInternalUser(
    id: $id
    name: $name
    email: $email
    password: $password
    roleId: $roleId
  ) {
    ...InternalUserFields
  }
}
    ${InternalUserFieldsFragmentDoc}`;
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
 *      roleId: // value for 'roleId'
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
export const InternalUpdateMakerDocument = gql`
    mutation InternalUpdateMaker($id: Int!, $name: String!) {
  updateMaker(id: $id, name: $name) {
    ...MakerFields
  }
}
    ${MakerFieldsFragmentDoc}`;
export type InternalUpdateMakerMutationFn = Apollo.MutationFunction<InternalUpdateMakerMutation, InternalUpdateMakerMutationVariables>;

/**
 * __useInternalUpdateMakerMutation__
 *
 * To run a mutation, you first call `useInternalUpdateMakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateMakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateMakerMutation, { data, loading, error }] = useInternalUpdateMakerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInternalUpdateMakerMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateMakerMutation, InternalUpdateMakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateMakerMutation, InternalUpdateMakerMutationVariables>(InternalUpdateMakerDocument, options);
      }
export type InternalUpdateMakerMutationHookResult = ReturnType<typeof useInternalUpdateMakerMutation>;
export type InternalUpdateMakerMutationResult = Apollo.MutationResult<InternalUpdateMakerMutation>;
export type InternalUpdateMakerMutationOptions = Apollo.BaseMutationOptions<InternalUpdateMakerMutation, InternalUpdateMakerMutationVariables>;
export const InternalUpdateProductDocument = gql`
    mutation InternalUpdateProduct($id: Int!, $makerId: Int!, $name: String!, $remark: String!) {
  updateProduct(id: $id, makerId: $makerId, name: $name, remark: $remark) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export type InternalUpdateProductMutationFn = Apollo.MutationFunction<InternalUpdateProductMutation, InternalUpdateProductMutationVariables>;

/**
 * __useInternalUpdateProductMutation__
 *
 * To run a mutation, you first call `useInternalUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateProductMutation, { data, loading, error }] = useInternalUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      makerId: // value for 'makerId'
 *      name: // value for 'name'
 *      remark: // value for 'remark'
 *   },
 * });
 */
export function useInternalUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateProductMutation, InternalUpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateProductMutation, InternalUpdateProductMutationVariables>(InternalUpdateProductDocument, options);
      }
export type InternalUpdateProductMutationHookResult = ReturnType<typeof useInternalUpdateProductMutation>;
export type InternalUpdateProductMutationResult = Apollo.MutationResult<InternalUpdateProductMutation>;
export type InternalUpdateProductMutationOptions = Apollo.BaseMutationOptions<InternalUpdateProductMutation, InternalUpdateProductMutationVariables>;