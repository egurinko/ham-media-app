import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type CreateProductTagsProductTagInputType = {
  name: Scalars['String'];
};

export type CreateStockRequestRequestProductsInputType = {
  count: Scalars['Int'];
  productId: Scalars['Int'];
};

export type CreateStocksStocksInputType = {
  amount: Scalars['Int'];
  expiredAt: Scalars['DateTime'];
  internalUserId: Scalars['BigInt'];
};

export type Delete = {
  __typename?: 'Delete';
  deleted: Scalars['Boolean'];
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
  discord_user_id: Scalars['String'];
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
  allocateStock: Stock;
  approveStockRequest: Delete;
  createHospital: Hospital;
  createInternalUser: InternalUser;
  createMaker: Maker;
  createProduct: Product;
  createProductTagGroup: ProductTagGroup;
  createProductTaggings: Product;
  createProductTags: BatchPayload;
  createStockRequest: StockRequest;
  createStocks: Array<Stock>;
  deleteInternalUser: Delete;
  deleteMaker: Delete;
  deleteProductTag: Delete;
  deleteProductTagging: Delete;
  deleteStock: Delete;
  deleteStockRequest: Delete;
  rejectStockRequest: Delete;
  returnStock: Stock;
  updateHospital: Hospital;
  updateInternalUser: InternalUser;
  updateMaker: Maker;
  updateProduct: Product;
  updateProductTag: ProductTag;
  updateProductTagGroup: ProductTagGroup;
  updateStockInternalUser: Stock;
  updateStockRequest: StockRequest;
};


export type MutationAllocateStockArgs = {
  id: Scalars['Int'];
  internalUserId: Scalars['BigInt'];
};


export type MutationApproveStockRequestArgs = {
  id: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationCreateHospitalArgs = {
  deleted: Scalars['Boolean'];
  internal_memo: Scalars['String'];
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationCreateInternalUserArgs = {
  discord_user_id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['Int'];
};


export type MutationCreateMakerArgs = {
  name: Scalars['String'];
};


export type MutationCreateProductArgs = {
  file: Scalars['Upload'];
  makerId: Scalars['Int'];
  name: Scalars['String'];
  productTagIds: Array<Scalars['Int']>;
  remark: Scalars['String'];
};


export type MutationCreateProductTagGroupArgs = {
  name: Scalars['String'];
};


export type MutationCreateProductTaggingsArgs = {
  productId: Scalars['Int'];
  productTagIds: Array<Scalars['Int']>;
};


export type MutationCreateProductTagsArgs = {
  productTagGroupId: Scalars['Int'];
  productTags: Array<CreateProductTagsProductTagInputType>;
};


export type MutationCreateStockRequestArgs = {
  requestProducts: Array<CreateStockRequestRequestProductsInputType>;
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


export type MutationDeleteProductTagArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProductTaggingArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStockArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStockRequestArgs = {
  id: Scalars['Int'];
};


export type MutationRejectStockRequestArgs = {
  id: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationReturnStockArgs = {
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
  discord_user_id: Scalars['String'];
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
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['Int'];
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
};


export type MutationUpdateProductTagArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateProductTagGroupArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateStockInternalUserArgs = {
  id: Scalars['Int'];
  internalUserId: Scalars['BigInt'];
};


export type MutationUpdateStockRequestArgs = {
  id: Scalars['Int'];
  requestProducts: Array<CreateStockRequestRequestProductsInputType>;
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
  productTaggings: Array<ProductTagging>;
  remainingStockAmount: Scalars['Int'];
  remark: Scalars['String'];
  stocks: Array<Stock>;
  totalStockAmount: Scalars['Int'];
  url: Scalars['String'];
};

export type ProductCartItem = {
  __typename?: 'ProductCartItem';
  count: Scalars['Int'];
  productId: Scalars['Int'];
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

/** A product tag */
export type ProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['Int'];
  name: Scalars['String'];
  productTagGroup: ProductTagGroup;
};

/** A product tag group */
export type ProductTagGroup = {
  __typename?: 'ProductTagGroup';
  id: Scalars['Int'];
  name: Scalars['String'];
  productTags: Array<ProductTag>;
};

/** A product tagging */
export type ProductTagging = {
  __typename?: 'ProductTagging';
  id: Scalars['Int'];
  productTag: ProductTag;
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
  productCartItems: Array<ProductCartItem>;
  productConnection?: Maybe<ProductConnection>;
  productTagGroup: ProductTagGroup;
  productTagGroups: Array<ProductTagGroup>;
  products: Array<Product>;
  readIsAdmin: ReadIsAdmin;
  roles: Array<Role>;
  session: Session;
  stockRequest: StockRequest;
  stockRequestConnection?: Maybe<StockRequestConnection>;
  stocks: Array<Stock>;
};


export type QueryHospitalArgs = {
  id: Scalars['BigInt'];
};


export type QueryHospitalConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
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
  allocatedInternalUserId?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hasStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  makerId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  productTagId?: InputMaybe<Scalars['Int']>;
};


export type QueryProductTagGroupArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  ids?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryStockRequestArgs = {
  id: Scalars['Int'];
};


export type QueryStockRequestConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  internalUserId?: InputMaybe<Scalars['BigInt']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryStocksArgs = {
  productId: Scalars['Int'];
};

export type ReadIsAdmin = {
  __typename?: 'ReadIsAdmin';
  isAdmin: Scalars['Boolean'];
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
  internalUser: InternalUser;
  product: Product;
  stockAllocation?: Maybe<StockAllocation>;
};

/** A stock allocation */
export type StockAllocation = {
  __typename?: 'StockAllocation';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  internalUser: InternalUser;
};

/** A stock request */
export type StockRequest = {
  __typename?: 'StockRequest';
  id: Scalars['Int'];
  internalUser: InternalUser;
  productRegistrations: Array<StockRequestProductRegistration>;
};

export type StockRequestConnection = {
  __typename?: 'StockRequestConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<StockRequestEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type StockRequestEdge = {
  __typename?: 'StockRequestEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<StockRequest>;
};

/** A stock request product registration */
export type StockRequestProductRegistration = {
  __typename?: 'StockRequestProductRegistration';
  id: Scalars['Int'];
  product: Product;
};

export type InternalAllocateStockMutationVariables = Exact<{
  id: Scalars['Int'];
  internalUserId: Scalars['BigInt'];
}>;


export type InternalAllocateStockMutation = { __typename?: 'Mutation', allocateStock: { __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null } };

export type InternalApproveStockRequestMutationVariables = Exact<{
  id: Scalars['Int'];
  message: Scalars['String'];
}>;


export type InternalApproveStockRequestMutation = { __typename?: 'Mutation', approveStockRequest: { __typename?: 'Delete', deleted: boolean } };

export type InternalCreateHospitalMutationVariables = Exact<{
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
  internal_memo: Scalars['String'];
}>;


export type InternalCreateHospitalMutation = { __typename?: 'Mutation', createHospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: { __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number } | null } | null, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null } };

export type InternalCreateInternalUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  discord_user_id: Scalars['String'];
  roleId: Scalars['Int'];
}>;


export type InternalCreateInternalUserMutation = { __typename?: 'Mutation', createInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } };

export type InternalCreateMakerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type InternalCreateMakerMutation = { __typename?: 'Mutation', createMaker: { __typename?: 'Maker', id: number, name: string } };

export type InternalCreateProductMutationVariables = Exact<{
  makerId: Scalars['Int'];
  name: Scalars['String'];
  remark: Scalars['String'];
  file: Scalars['Upload'];
  productTagIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type InternalCreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } };

export type InternalCreateProductTagGroupMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type InternalCreateProductTagGroupMutation = { __typename?: 'Mutation', createProductTagGroup: { __typename?: 'ProductTagGroup', id: number, name: string, productTags: Array<{ __typename?: 'ProductTag', id: number, name: string }> } };

export type InternalCreateProductTaggingsMutationVariables = Exact<{
  productId: Scalars['Int'];
  productTagIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type InternalCreateProductTaggingsMutation = { __typename?: 'Mutation', createProductTaggings: { __typename?: 'Product', id: number } };

export type InternalCreateProductTagsMutationVariables = Exact<{
  productTagGroupId: Scalars['Int'];
  productTags: Array<CreateProductTagsProductTagInputType> | CreateProductTagsProductTagInputType;
}>;


export type InternalCreateProductTagsMutation = { __typename?: 'Mutation', createProductTags: { __typename?: 'BatchPayload', count: number } };

export type InternalCreateStockRequestMutationVariables = Exact<{
  requestProducts: Array<CreateStockRequestRequestProductsInputType> | CreateStockRequestRequestProductsInputType;
}>;


export type InternalCreateStockRequestMutation = { __typename?: 'Mutation', createStockRequest: { __typename?: 'StockRequest', id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, productRegistrations: Array<{ __typename?: 'StockRequestProductRegistration', id: number, product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } }> } };

export type InternalCreateStocksMutationVariables = Exact<{
  productId: Scalars['Int'];
  stocks: Array<CreateStocksStocksInputType> | CreateStocksStocksInputType;
}>;


export type InternalCreateStocksMutation = { __typename?: 'Mutation', createStocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> };

export type InternalDeleteInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalDeleteInternalUserMutation = { __typename?: 'Mutation', deleteInternalUser: { __typename?: 'Delete', deleted: boolean } };

export type InternalDeleteMakerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteMakerMutation = { __typename?: 'Mutation', deleteMaker: { __typename?: 'Delete', deleted: boolean } };

export type InternalDeleteProductTagMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteProductTagMutation = { __typename?: 'Mutation', deleteProductTag: { __typename?: 'Delete', deleted: boolean } };

export type InternalDeleteProductTaggingMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteProductTaggingMutation = { __typename?: 'Mutation', deleteProductTagging: { __typename?: 'Delete', deleted: boolean } };

export type InternalDeleteStockMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteStockMutation = { __typename?: 'Mutation', deleteStock: { __typename?: 'Delete', deleted: boolean } };

export type InternalDeleteStockRequestMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalDeleteStockRequestMutation = { __typename?: 'Mutation', deleteStockRequest: { __typename?: 'Delete', deleted: boolean } };

export type HospitalFieldsFragment = { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: { __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number } | null } | null, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null };

export type InternalUserFieldsFragment = { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } };

export type MakerFieldsFragment = { __typename?: 'Maker', id: number, name: string };

export type ProductFieldsFragment = { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> };

export type StockFieldsFragment = { __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null };

export type ProductTaggingFieldsFragment = { __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } };

export type ProductTagFieldsFragment = { __typename?: 'ProductTag', id: number, name: string };

export type ProductTagGroupFieldsFragment = { __typename?: 'ProductTagGroup', id: number, name: string, productTags: Array<{ __typename?: 'ProductTag', id: number, name: string }> };

export type RoleFieldsFragment = { __typename?: 'Role', id: number, name: string };

export type StockRequestFieldsFragment = { __typename?: 'StockRequest', id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, productRegistrations: Array<{ __typename?: 'StockRequestProductRegistration', id: number, product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } }> };

export type InternalGetHospitalQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetHospitalQuery = { __typename?: 'Query', hospital: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: { __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number } | null } | null, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null } };

export type InternalGetHospitalConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
  prefectureId?: InputMaybe<Scalars['BigInt']>;
}>;


export type InternalGetHospitalConnectionQuery = { __typename?: 'Query', hospitalConnection?: { __typename?: 'HospitalConnection', edges?: Array<{ __typename?: 'HospitalEdge', node?: { __typename?: 'Hospital', id: BigInt, name: string, url: string, deleted: boolean, internal_memo: string, hospitalAddress?: { __typename?: 'HospitalAddress', id: BigInt, address: string, phone_number: string, prefecture: { __typename?: 'Prefecture', name: string, id: BigInt }, hospitalAddressGeoLocation?: { __typename?: 'HospitalAddressGeoLocation', latitude: number, longitude: number } | null } | null, hospitalBusinessForm?: { __typename?: 'HospitalBusinessForm', id: BigInt, business_hour: string, closed_day: string, insurance_enabled: string, remark: string } | null, hospitalCertificationOption?: { __typename?: 'HospitalCertificationOption', id: BigInt, nichiju_registered: string, jsava_registered: string } | null, hospitalInternalReputation?: { __typename?: 'HospitalInternalReputation', id: BigInt, star: number, remark: string } | null, hospitalNightServiceOption?: { __typename?: 'HospitalNightServiceOption', id: BigInt, status: string, remark: string } | null, hospitalNightUrgentActionOption?: { __typename?: 'HospitalNightUrgentActionOption', id: BigInt, status: string } | null, hospitalReservationStatus?: { __typename?: 'HospitalReservationStatus', id: BigInt, required: string, reservable: string, remark: string } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type InternalGetHospitalIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetHospitalIdsQuery = { __typename?: 'Query', hospitals: Array<{ __typename?: 'Hospital', id: BigInt }> };

export type InternalGetInternalUserQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type InternalGetInternalUserQuery = { __typename?: 'Query', internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } };

export type InternalGetInternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetInternalUsersQuery = { __typename?: 'Query', internalUsers: Array<{ __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }> };

export type InternalGetMakerQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetMakerQuery = { __typename?: 'Query', maker: { __typename?: 'Maker', id: number, name: string } };

export type InternalGetMakersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetMakersQuery = { __typename?: 'Query', makers: Array<{ __typename?: 'Maker', id: number, name: string }> };

export type InternalGetProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } };

export type LocalGetProductCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocalGetProductCartItemsQuery = { __typename?: 'Query', productCartItems: Array<{ __typename?: 'ProductCartItem', count: number, productId: number }> };

export type InternalGetProductConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  makerId?: InputMaybe<Scalars['Int']>;
  productTagId?: InputMaybe<Scalars['Int']>;
  allocatedInternalUserId?: InputMaybe<Scalars['Int']>;
  hasStock?: InputMaybe<Scalars['Boolean']>;
}>;


export type InternalGetProductConnectionQuery = { __typename?: 'Query', productConnection?: { __typename?: 'ProductConnection', edges?: Array<{ __typename?: 'ProductEdge', node?: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type InternalGetProductIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetProductIdsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number }> };

export type InternalGetProductTagGroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetProductTagGroupQuery = { __typename?: 'Query', productTagGroup: { __typename?: 'ProductTagGroup', id: number, name: string, productTags: Array<{ __typename?: 'ProductTag', id: number, name: string }> } };

export type InternalGetProductTagGroupIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetProductTagGroupIdsQuery = { __typename?: 'Query', productTagGroups: Array<{ __typename?: 'ProductTagGroup', id: number }> };

export type InternalGetProductTagGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetProductTagGroupsQuery = { __typename?: 'Query', productTagGroups: Array<{ __typename?: 'ProductTagGroup', id: number, name: string, productTags: Array<{ __typename?: 'ProductTag', id: number, name: string }> }> };

export type InternalGetProductsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type InternalGetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> }> };

export type InternalGetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: number, name: string }> };

export type InternalGetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalGetSessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', token: string, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } };

export type InternalGetStockRequestQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalGetStockRequestQuery = { __typename?: 'Query', stockRequest: { __typename?: 'StockRequest', id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, productRegistrations: Array<{ __typename?: 'StockRequestProductRegistration', id: number, product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } }> } };

export type InternalGetStockRequestConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  internalUserId?: InputMaybe<Scalars['BigInt']>;
}>;


export type InternalGetStockRequestConnectionQuery = { __typename?: 'Query', stockRequestConnection?: { __typename?: 'StockRequestConnection', edges?: Array<{ __typename?: 'StockRequestEdge', node?: { __typename?: 'StockRequest', id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, productRegistrations: Array<{ __typename?: 'StockRequestProductRegistration', id: number, product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type InternalGetStocksQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type InternalGetStocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> };

export type LocalReadIsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type LocalReadIsAdminQuery = { __typename?: 'Query', readIsAdmin: { __typename?: 'ReadIsAdmin', isAdmin: boolean } };

export type InternalRejectStockRequestMutationVariables = Exact<{
  id: Scalars['Int'];
  message: Scalars['String'];
}>;


export type InternalRejectStockRequestMutation = { __typename?: 'Mutation', rejectStockRequest: { __typename?: 'Delete', deleted: boolean } };

export type InternalReturnStockMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InternalReturnStockMutation = { __typename?: 'Mutation', returnStock: { __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null } };

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
  discord_user_id: Scalars['String'];
  roleId: Scalars['Int'];
}>;


export type InternalUpdateInternalUserMutation = { __typename?: 'Mutation', updateInternalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } };

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
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type InternalUpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } };

export type InternalUpdateProductTagMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type InternalUpdateProductTagMutation = { __typename?: 'Mutation', updateProductTag: { __typename?: 'ProductTag', id: number, name: string } };

export type InternalUpdateProductTagGroupMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type InternalUpdateProductTagGroupMutation = { __typename?: 'Mutation', updateProductTagGroup: { __typename?: 'ProductTagGroup', id: number, name: string, productTags: Array<{ __typename?: 'ProductTag', id: number, name: string }> } };

export type InternalUpdateStockInternalUserMutationVariables = Exact<{
  id: Scalars['Int'];
  internalUserId: Scalars['BigInt'];
}>;


export type InternalUpdateStockInternalUserMutation = { __typename?: 'Mutation', updateStockInternalUser: { __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null } };

export type InternalUpdateStockRequestMutationVariables = Exact<{
  id: Scalars['Int'];
  requestProducts: Array<CreateStockRequestRequestProductsInputType> | CreateStockRequestRequestProductsInputType;
}>;


export type InternalUpdateStockRequestMutation = { __typename?: 'Mutation', updateStockRequest: { __typename?: 'StockRequest', id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, productRegistrations: Array<{ __typename?: 'StockRequestProductRegistration', id: number, product: { __typename?: 'Product', id: number, name: string, remark: string, url: string, totalStockAmount: number, allocatedStockAmount: number, remainingStockAmount: number, productTaggings: Array<{ __typename?: 'ProductTagging', id: number, productTag: { __typename?: 'ProductTag', id: number, name: string } }>, maker: { __typename?: 'Maker', id: number, name: string }, stocks: Array<{ __typename?: 'Stock', id: number, expired_at: any, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } }, stockAllocation?: { __typename?: 'StockAllocation', created_at: any, id: number, internalUser: { __typename?: 'InternalUser', id: BigInt, email: string, name: string, discord_user_id: string, role: { __typename?: 'Role', id: number, name: string } } } | null }> } }> } };

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
export const ProductTagFieldsFragmentDoc = gql`
    fragment ProductTagFields on ProductTag {
  id
  name
}
    `;
export const ProductTagGroupFieldsFragmentDoc = gql`
    fragment ProductTagGroupFields on ProductTagGroup {
  id
  name
  productTags {
    ...ProductTagFields
  }
}
    ${ProductTagFieldsFragmentDoc}`;
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
  discord_user_id
  role {
    ...RoleFields
  }
}
    ${RoleFieldsFragmentDoc}`;
export const ProductTaggingFieldsFragmentDoc = gql`
    fragment ProductTaggingFields on ProductTagging {
  id
  productTag {
    ...ProductTagFields
  }
}
    ${ProductTagFieldsFragmentDoc}`;
export const MakerFieldsFragmentDoc = gql`
    fragment MakerFields on Maker {
  id
  name
}
    `;
export const StockFieldsFragmentDoc = gql`
    fragment StockFields on Stock {
  id
  expired_at
  internalUser {
    ...InternalUserFields
  }
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
  url
  productTaggings {
    ...ProductTaggingFields
  }
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
    ${ProductTaggingFieldsFragmentDoc}
${MakerFieldsFragmentDoc}
${StockFieldsFragmentDoc}`;
export const StockRequestFieldsFragmentDoc = gql`
    fragment StockRequestFields on StockRequest {
  id
  internalUser {
    ...InternalUserFields
  }
  productRegistrations {
    id
    product {
      ...ProductFields
    }
  }
}
    ${InternalUserFieldsFragmentDoc}
${ProductFieldsFragmentDoc}`;
export const InternalAllocateStockDocument = gql`
    mutation InternalAllocateStock($id: Int!, $internalUserId: BigInt!) {
  allocateStock(id: $id, internalUserId: $internalUserId) {
    ...StockFields
  }
}
    ${StockFieldsFragmentDoc}`;
export type InternalAllocateStockMutationFn = Apollo.MutationFunction<InternalAllocateStockMutation, InternalAllocateStockMutationVariables>;

/**
 * __useInternalAllocateStockMutation__
 *
 * To run a mutation, you first call `useInternalAllocateStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalAllocateStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalAllocateStockMutation, { data, loading, error }] = useInternalAllocateStockMutation({
 *   variables: {
 *      id: // value for 'id'
 *      internalUserId: // value for 'internalUserId'
 *   },
 * });
 */
export function useInternalAllocateStockMutation(baseOptions?: Apollo.MutationHookOptions<InternalAllocateStockMutation, InternalAllocateStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalAllocateStockMutation, InternalAllocateStockMutationVariables>(InternalAllocateStockDocument, options);
      }
export type InternalAllocateStockMutationHookResult = ReturnType<typeof useInternalAllocateStockMutation>;
export type InternalAllocateStockMutationResult = Apollo.MutationResult<InternalAllocateStockMutation>;
export type InternalAllocateStockMutationOptions = Apollo.BaseMutationOptions<InternalAllocateStockMutation, InternalAllocateStockMutationVariables>;
export const InternalApproveStockRequestDocument = gql`
    mutation InternalApproveStockRequest($id: Int!, $message: String!) {
  approveStockRequest(id: $id, message: $message) {
    deleted
  }
}
    `;
export type InternalApproveStockRequestMutationFn = Apollo.MutationFunction<InternalApproveStockRequestMutation, InternalApproveStockRequestMutationVariables>;

/**
 * __useInternalApproveStockRequestMutation__
 *
 * To run a mutation, you first call `useInternalApproveStockRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalApproveStockRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalApproveStockRequestMutation, { data, loading, error }] = useInternalApproveStockRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInternalApproveStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<InternalApproveStockRequestMutation, InternalApproveStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalApproveStockRequestMutation, InternalApproveStockRequestMutationVariables>(InternalApproveStockRequestDocument, options);
      }
export type InternalApproveStockRequestMutationHookResult = ReturnType<typeof useInternalApproveStockRequestMutation>;
export type InternalApproveStockRequestMutationResult = Apollo.MutationResult<InternalApproveStockRequestMutation>;
export type InternalApproveStockRequestMutationOptions = Apollo.BaseMutationOptions<InternalApproveStockRequestMutation, InternalApproveStockRequestMutationVariables>;
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
    mutation InternalCreateInternalUser($name: String!, $email: String!, $password: String!, $discord_user_id: String!, $roleId: Int!) {
  createInternalUser(
    name: $name
    email: $email
    password: $password
    discord_user_id: $discord_user_id
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
 *      discord_user_id: // value for 'discord_user_id'
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
    mutation InternalCreateProduct($makerId: Int!, $name: String!, $remark: String!, $file: Upload!, $productTagIds: [Int!]!) {
  createProduct(
    makerId: $makerId
    name: $name
    remark: $remark
    file: $file
    productTagIds: $productTagIds
  ) {
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
 *      file: // value for 'file'
 *      productTagIds: // value for 'productTagIds'
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
export const InternalCreateProductTagGroupDocument = gql`
    mutation InternalCreateProductTagGroup($name: String!) {
  createProductTagGroup(name: $name) {
    ...ProductTagGroupFields
  }
}
    ${ProductTagGroupFieldsFragmentDoc}`;
export type InternalCreateProductTagGroupMutationFn = Apollo.MutationFunction<InternalCreateProductTagGroupMutation, InternalCreateProductTagGroupMutationVariables>;

/**
 * __useInternalCreateProductTagGroupMutation__
 *
 * To run a mutation, you first call `useInternalCreateProductTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateProductTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateProductTagGroupMutation, { data, loading, error }] = useInternalCreateProductTagGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInternalCreateProductTagGroupMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateProductTagGroupMutation, InternalCreateProductTagGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateProductTagGroupMutation, InternalCreateProductTagGroupMutationVariables>(InternalCreateProductTagGroupDocument, options);
      }
export type InternalCreateProductTagGroupMutationHookResult = ReturnType<typeof useInternalCreateProductTagGroupMutation>;
export type InternalCreateProductTagGroupMutationResult = Apollo.MutationResult<InternalCreateProductTagGroupMutation>;
export type InternalCreateProductTagGroupMutationOptions = Apollo.BaseMutationOptions<InternalCreateProductTagGroupMutation, InternalCreateProductTagGroupMutationVariables>;
export const InternalCreateProductTaggingsDocument = gql`
    mutation InternalCreateProductTaggings($productId: Int!, $productTagIds: [Int!]!) {
  createProductTaggings(productId: $productId, productTagIds: $productTagIds) {
    id
  }
}
    `;
export type InternalCreateProductTaggingsMutationFn = Apollo.MutationFunction<InternalCreateProductTaggingsMutation, InternalCreateProductTaggingsMutationVariables>;

/**
 * __useInternalCreateProductTaggingsMutation__
 *
 * To run a mutation, you first call `useInternalCreateProductTaggingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateProductTaggingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateProductTaggingsMutation, { data, loading, error }] = useInternalCreateProductTaggingsMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      productTagIds: // value for 'productTagIds'
 *   },
 * });
 */
export function useInternalCreateProductTaggingsMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateProductTaggingsMutation, InternalCreateProductTaggingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateProductTaggingsMutation, InternalCreateProductTaggingsMutationVariables>(InternalCreateProductTaggingsDocument, options);
      }
export type InternalCreateProductTaggingsMutationHookResult = ReturnType<typeof useInternalCreateProductTaggingsMutation>;
export type InternalCreateProductTaggingsMutationResult = Apollo.MutationResult<InternalCreateProductTaggingsMutation>;
export type InternalCreateProductTaggingsMutationOptions = Apollo.BaseMutationOptions<InternalCreateProductTaggingsMutation, InternalCreateProductTaggingsMutationVariables>;
export const InternalCreateProductTagsDocument = gql`
    mutation InternalCreateProductTags($productTagGroupId: Int!, $productTags: [CreateProductTagsProductTagInputType!]!) {
  createProductTags(
    productTagGroupId: $productTagGroupId
    productTags: $productTags
  ) {
    count
  }
}
    `;
export type InternalCreateProductTagsMutationFn = Apollo.MutationFunction<InternalCreateProductTagsMutation, InternalCreateProductTagsMutationVariables>;

/**
 * __useInternalCreateProductTagsMutation__
 *
 * To run a mutation, you first call `useInternalCreateProductTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateProductTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateProductTagsMutation, { data, loading, error }] = useInternalCreateProductTagsMutation({
 *   variables: {
 *      productTagGroupId: // value for 'productTagGroupId'
 *      productTags: // value for 'productTags'
 *   },
 * });
 */
export function useInternalCreateProductTagsMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateProductTagsMutation, InternalCreateProductTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateProductTagsMutation, InternalCreateProductTagsMutationVariables>(InternalCreateProductTagsDocument, options);
      }
export type InternalCreateProductTagsMutationHookResult = ReturnType<typeof useInternalCreateProductTagsMutation>;
export type InternalCreateProductTagsMutationResult = Apollo.MutationResult<InternalCreateProductTagsMutation>;
export type InternalCreateProductTagsMutationOptions = Apollo.BaseMutationOptions<InternalCreateProductTagsMutation, InternalCreateProductTagsMutationVariables>;
export const InternalCreateStockRequestDocument = gql`
    mutation InternalCreateStockRequest($requestProducts: [CreateStockRequestRequestProductsInputType!]!) {
  createStockRequest(requestProducts: $requestProducts) {
    ...StockRequestFields
  }
}
    ${StockRequestFieldsFragmentDoc}`;
export type InternalCreateStockRequestMutationFn = Apollo.MutationFunction<InternalCreateStockRequestMutation, InternalCreateStockRequestMutationVariables>;

/**
 * __useInternalCreateStockRequestMutation__
 *
 * To run a mutation, you first call `useInternalCreateStockRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalCreateStockRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalCreateStockRequestMutation, { data, loading, error }] = useInternalCreateStockRequestMutation({
 *   variables: {
 *      requestProducts: // value for 'requestProducts'
 *   },
 * });
 */
export function useInternalCreateStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<InternalCreateStockRequestMutation, InternalCreateStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalCreateStockRequestMutation, InternalCreateStockRequestMutationVariables>(InternalCreateStockRequestDocument, options);
      }
export type InternalCreateStockRequestMutationHookResult = ReturnType<typeof useInternalCreateStockRequestMutation>;
export type InternalCreateStockRequestMutationResult = Apollo.MutationResult<InternalCreateStockRequestMutation>;
export type InternalCreateStockRequestMutationOptions = Apollo.BaseMutationOptions<InternalCreateStockRequestMutation, InternalCreateStockRequestMutationVariables>;
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
    deleted
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
    deleted
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
export const InternalDeleteProductTagDocument = gql`
    mutation InternalDeleteProductTag($id: Int!) {
  deleteProductTag(id: $id) {
    deleted
  }
}
    `;
export type InternalDeleteProductTagMutationFn = Apollo.MutationFunction<InternalDeleteProductTagMutation, InternalDeleteProductTagMutationVariables>;

/**
 * __useInternalDeleteProductTagMutation__
 *
 * To run a mutation, you first call `useInternalDeleteProductTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteProductTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteProductTagMutation, { data, loading, error }] = useInternalDeleteProductTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteProductTagMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteProductTagMutation, InternalDeleteProductTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteProductTagMutation, InternalDeleteProductTagMutationVariables>(InternalDeleteProductTagDocument, options);
      }
export type InternalDeleteProductTagMutationHookResult = ReturnType<typeof useInternalDeleteProductTagMutation>;
export type InternalDeleteProductTagMutationResult = Apollo.MutationResult<InternalDeleteProductTagMutation>;
export type InternalDeleteProductTagMutationOptions = Apollo.BaseMutationOptions<InternalDeleteProductTagMutation, InternalDeleteProductTagMutationVariables>;
export const InternalDeleteProductTaggingDocument = gql`
    mutation InternalDeleteProductTagging($id: Int!) {
  deleteProductTagging(id: $id) {
    deleted
  }
}
    `;
export type InternalDeleteProductTaggingMutationFn = Apollo.MutationFunction<InternalDeleteProductTaggingMutation, InternalDeleteProductTaggingMutationVariables>;

/**
 * __useInternalDeleteProductTaggingMutation__
 *
 * To run a mutation, you first call `useInternalDeleteProductTaggingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteProductTaggingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteProductTaggingMutation, { data, loading, error }] = useInternalDeleteProductTaggingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteProductTaggingMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteProductTaggingMutation, InternalDeleteProductTaggingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteProductTaggingMutation, InternalDeleteProductTaggingMutationVariables>(InternalDeleteProductTaggingDocument, options);
      }
export type InternalDeleteProductTaggingMutationHookResult = ReturnType<typeof useInternalDeleteProductTaggingMutation>;
export type InternalDeleteProductTaggingMutationResult = Apollo.MutationResult<InternalDeleteProductTaggingMutation>;
export type InternalDeleteProductTaggingMutationOptions = Apollo.BaseMutationOptions<InternalDeleteProductTaggingMutation, InternalDeleteProductTaggingMutationVariables>;
export const InternalDeleteStockDocument = gql`
    mutation InternalDeleteStock($id: Int!) {
  deleteStock(id: $id) {
    deleted
  }
}
    `;
export type InternalDeleteStockMutationFn = Apollo.MutationFunction<InternalDeleteStockMutation, InternalDeleteStockMutationVariables>;

/**
 * __useInternalDeleteStockMutation__
 *
 * To run a mutation, you first call `useInternalDeleteStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteStockMutation, { data, loading, error }] = useInternalDeleteStockMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteStockMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteStockMutation, InternalDeleteStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteStockMutation, InternalDeleteStockMutationVariables>(InternalDeleteStockDocument, options);
      }
export type InternalDeleteStockMutationHookResult = ReturnType<typeof useInternalDeleteStockMutation>;
export type InternalDeleteStockMutationResult = Apollo.MutationResult<InternalDeleteStockMutation>;
export type InternalDeleteStockMutationOptions = Apollo.BaseMutationOptions<InternalDeleteStockMutation, InternalDeleteStockMutationVariables>;
export const InternalDeleteStockRequestDocument = gql`
    mutation InternalDeleteStockRequest($id: Int!) {
  deleteStockRequest(id: $id) {
    deleted
  }
}
    `;
export type InternalDeleteStockRequestMutationFn = Apollo.MutationFunction<InternalDeleteStockRequestMutation, InternalDeleteStockRequestMutationVariables>;

/**
 * __useInternalDeleteStockRequestMutation__
 *
 * To run a mutation, you first call `useInternalDeleteStockRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalDeleteStockRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalDeleteStockRequestMutation, { data, loading, error }] = useInternalDeleteStockRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalDeleteStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<InternalDeleteStockRequestMutation, InternalDeleteStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalDeleteStockRequestMutation, InternalDeleteStockRequestMutationVariables>(InternalDeleteStockRequestDocument, options);
      }
export type InternalDeleteStockRequestMutationHookResult = ReturnType<typeof useInternalDeleteStockRequestMutation>;
export type InternalDeleteStockRequestMutationResult = Apollo.MutationResult<InternalDeleteStockRequestMutation>;
export type InternalDeleteStockRequestMutationOptions = Apollo.BaseMutationOptions<InternalDeleteStockRequestMutation, InternalDeleteStockRequestMutationVariables>;
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
    query InternalGetHospitalConnection($first: Int, $after: String, $name: String, $deleted: Boolean!, $prefectureId: BigInt) {
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
export function useInternalGetHospitalConnectionQuery(baseOptions: Apollo.QueryHookOptions<InternalGetHospitalConnectionQuery, InternalGetHospitalConnectionQueryVariables>) {
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
export function useLocalGetProductCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<LocalGetProductCartItemsQuery, LocalGetProductCartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocalGetProductCartItemsQuery, LocalGetProductCartItemsQueryVariables>(LocalGetProductCartItemsDocument, options);
      }
export function useLocalGetProductCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocalGetProductCartItemsQuery, LocalGetProductCartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocalGetProductCartItemsQuery, LocalGetProductCartItemsQueryVariables>(LocalGetProductCartItemsDocument, options);
        }
export type LocalGetProductCartItemsQueryHookResult = ReturnType<typeof useLocalGetProductCartItemsQuery>;
export type LocalGetProductCartItemsLazyQueryHookResult = ReturnType<typeof useLocalGetProductCartItemsLazyQuery>;
export type LocalGetProductCartItemsQueryResult = Apollo.QueryResult<LocalGetProductCartItemsQuery, LocalGetProductCartItemsQueryVariables>;
export const InternalGetProductConnectionDocument = gql`
    query InternalGetProductConnection($first: Int, $after: String, $name: String, $makerId: Int, $productTagId: Int, $allocatedInternalUserId: Int, $hasStock: Boolean) {
  productConnection(
    first: $first
    after: $after
    name: $name
    makerId: $makerId
    productTagId: $productTagId
    allocatedInternalUserId: $allocatedInternalUserId
    hasStock: $hasStock
  ) {
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
 *      name: // value for 'name'
 *      makerId: // value for 'makerId'
 *      productTagId: // value for 'productTagId'
 *      allocatedInternalUserId: // value for 'allocatedInternalUserId'
 *      hasStock: // value for 'hasStock'
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
export const InternalGetProductTagGroupDocument = gql`
    query InternalGetProductTagGroup($id: Int!) {
  productTagGroup(id: $id) {
    ...ProductTagGroupFields
  }
}
    ${ProductTagGroupFieldsFragmentDoc}`;

/**
 * __useInternalGetProductTagGroupQuery__
 *
 * To run a query within a React component, call `useInternalGetProductTagGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductTagGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductTagGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetProductTagGroupQuery(baseOptions: Apollo.QueryHookOptions<InternalGetProductTagGroupQuery, InternalGetProductTagGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductTagGroupQuery, InternalGetProductTagGroupQueryVariables>(InternalGetProductTagGroupDocument, options);
      }
export function useInternalGetProductTagGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductTagGroupQuery, InternalGetProductTagGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductTagGroupQuery, InternalGetProductTagGroupQueryVariables>(InternalGetProductTagGroupDocument, options);
        }
export type InternalGetProductTagGroupQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupQuery>;
export type InternalGetProductTagGroupLazyQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupLazyQuery>;
export type InternalGetProductTagGroupQueryResult = Apollo.QueryResult<InternalGetProductTagGroupQuery, InternalGetProductTagGroupQueryVariables>;
export const InternalGetProductTagGroupIdsDocument = gql`
    query InternalGetProductTagGroupIds {
  productTagGroups {
    id
  }
}
    `;

/**
 * __useInternalGetProductTagGroupIdsQuery__
 *
 * To run a query within a React component, call `useInternalGetProductTagGroupIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductTagGroupIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductTagGroupIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetProductTagGroupIdsQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetProductTagGroupIdsQuery, InternalGetProductTagGroupIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductTagGroupIdsQuery, InternalGetProductTagGroupIdsQueryVariables>(InternalGetProductTagGroupIdsDocument, options);
      }
export function useInternalGetProductTagGroupIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductTagGroupIdsQuery, InternalGetProductTagGroupIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductTagGroupIdsQuery, InternalGetProductTagGroupIdsQueryVariables>(InternalGetProductTagGroupIdsDocument, options);
        }
export type InternalGetProductTagGroupIdsQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupIdsQuery>;
export type InternalGetProductTagGroupIdsLazyQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupIdsLazyQuery>;
export type InternalGetProductTagGroupIdsQueryResult = Apollo.QueryResult<InternalGetProductTagGroupIdsQuery, InternalGetProductTagGroupIdsQueryVariables>;
export const InternalGetProductTagGroupsDocument = gql`
    query InternalGetProductTagGroups {
  productTagGroups {
    ...ProductTagGroupFields
  }
}
    ${ProductTagGroupFieldsFragmentDoc}`;

/**
 * __useInternalGetProductTagGroupsQuery__
 *
 * To run a query within a React component, call `useInternalGetProductTagGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductTagGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductTagGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInternalGetProductTagGroupsQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetProductTagGroupsQuery, InternalGetProductTagGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductTagGroupsQuery, InternalGetProductTagGroupsQueryVariables>(InternalGetProductTagGroupsDocument, options);
      }
export function useInternalGetProductTagGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductTagGroupsQuery, InternalGetProductTagGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductTagGroupsQuery, InternalGetProductTagGroupsQueryVariables>(InternalGetProductTagGroupsDocument, options);
        }
export type InternalGetProductTagGroupsQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupsQuery>;
export type InternalGetProductTagGroupsLazyQueryHookResult = ReturnType<typeof useInternalGetProductTagGroupsLazyQuery>;
export type InternalGetProductTagGroupsQueryResult = Apollo.QueryResult<InternalGetProductTagGroupsQuery, InternalGetProductTagGroupsQueryVariables>;
export const InternalGetProductsDocument = gql`
    query InternalGetProducts($ids: [Int!]) {
  products(ids: $ids) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

/**
 * __useInternalGetProductsQuery__
 *
 * To run a query within a React component, call `useInternalGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetProductsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useInternalGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetProductsQuery, InternalGetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetProductsQuery, InternalGetProductsQueryVariables>(InternalGetProductsDocument, options);
      }
export function useInternalGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetProductsQuery, InternalGetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetProductsQuery, InternalGetProductsQueryVariables>(InternalGetProductsDocument, options);
        }
export type InternalGetProductsQueryHookResult = ReturnType<typeof useInternalGetProductsQuery>;
export type InternalGetProductsLazyQueryHookResult = ReturnType<typeof useInternalGetProductsLazyQuery>;
export type InternalGetProductsQueryResult = Apollo.QueryResult<InternalGetProductsQuery, InternalGetProductsQueryVariables>;
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
      ...InternalUserFields
    }
  }
}
    ${InternalUserFieldsFragmentDoc}`;

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
export const InternalGetStockRequestDocument = gql`
    query InternalGetStockRequest($id: Int!) {
  stockRequest(id: $id) {
    ...StockRequestFields
  }
}
    ${StockRequestFieldsFragmentDoc}`;

/**
 * __useInternalGetStockRequestQuery__
 *
 * To run a query within a React component, call `useInternalGetStockRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetStockRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetStockRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalGetStockRequestQuery(baseOptions: Apollo.QueryHookOptions<InternalGetStockRequestQuery, InternalGetStockRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetStockRequestQuery, InternalGetStockRequestQueryVariables>(InternalGetStockRequestDocument, options);
      }
export function useInternalGetStockRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetStockRequestQuery, InternalGetStockRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetStockRequestQuery, InternalGetStockRequestQueryVariables>(InternalGetStockRequestDocument, options);
        }
export type InternalGetStockRequestQueryHookResult = ReturnType<typeof useInternalGetStockRequestQuery>;
export type InternalGetStockRequestLazyQueryHookResult = ReturnType<typeof useInternalGetStockRequestLazyQuery>;
export type InternalGetStockRequestQueryResult = Apollo.QueryResult<InternalGetStockRequestQuery, InternalGetStockRequestQueryVariables>;
export const InternalGetStockRequestConnectionDocument = gql`
    query InternalGetStockRequestConnection($first: Int, $after: String, $internalUserId: BigInt) {
  stockRequestConnection(
    first: $first
    after: $after
    internalUserId: $internalUserId
  ) {
    edges {
      node {
        ...StockRequestFields
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
    ${StockRequestFieldsFragmentDoc}`;

/**
 * __useInternalGetStockRequestConnectionQuery__
 *
 * To run a query within a React component, call `useInternalGetStockRequestConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInternalGetStockRequestConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInternalGetStockRequestConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      internalUserId: // value for 'internalUserId'
 *   },
 * });
 */
export function useInternalGetStockRequestConnectionQuery(baseOptions?: Apollo.QueryHookOptions<InternalGetStockRequestConnectionQuery, InternalGetStockRequestConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InternalGetStockRequestConnectionQuery, InternalGetStockRequestConnectionQueryVariables>(InternalGetStockRequestConnectionDocument, options);
      }
export function useInternalGetStockRequestConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InternalGetStockRequestConnectionQuery, InternalGetStockRequestConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InternalGetStockRequestConnectionQuery, InternalGetStockRequestConnectionQueryVariables>(InternalGetStockRequestConnectionDocument, options);
        }
export type InternalGetStockRequestConnectionQueryHookResult = ReturnType<typeof useInternalGetStockRequestConnectionQuery>;
export type InternalGetStockRequestConnectionLazyQueryHookResult = ReturnType<typeof useInternalGetStockRequestConnectionLazyQuery>;
export type InternalGetStockRequestConnectionQueryResult = Apollo.QueryResult<InternalGetStockRequestConnectionQuery, InternalGetStockRequestConnectionQueryVariables>;
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
export function useLocalReadIsAdminQuery(baseOptions?: Apollo.QueryHookOptions<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>(LocalReadIsAdminDocument, options);
      }
export function useLocalReadIsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>(LocalReadIsAdminDocument, options);
        }
export type LocalReadIsAdminQueryHookResult = ReturnType<typeof useLocalReadIsAdminQuery>;
export type LocalReadIsAdminLazyQueryHookResult = ReturnType<typeof useLocalReadIsAdminLazyQuery>;
export type LocalReadIsAdminQueryResult = Apollo.QueryResult<LocalReadIsAdminQuery, LocalReadIsAdminQueryVariables>;
export const InternalRejectStockRequestDocument = gql`
    mutation InternalRejectStockRequest($id: Int!, $message: String!) {
  rejectStockRequest(id: $id, message: $message) {
    deleted
  }
}
    `;
export type InternalRejectStockRequestMutationFn = Apollo.MutationFunction<InternalRejectStockRequestMutation, InternalRejectStockRequestMutationVariables>;

/**
 * __useInternalRejectStockRequestMutation__
 *
 * To run a mutation, you first call `useInternalRejectStockRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalRejectStockRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalRejectStockRequestMutation, { data, loading, error }] = useInternalRejectStockRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInternalRejectStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<InternalRejectStockRequestMutation, InternalRejectStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalRejectStockRequestMutation, InternalRejectStockRequestMutationVariables>(InternalRejectStockRequestDocument, options);
      }
export type InternalRejectStockRequestMutationHookResult = ReturnType<typeof useInternalRejectStockRequestMutation>;
export type InternalRejectStockRequestMutationResult = Apollo.MutationResult<InternalRejectStockRequestMutation>;
export type InternalRejectStockRequestMutationOptions = Apollo.BaseMutationOptions<InternalRejectStockRequestMutation, InternalRejectStockRequestMutationVariables>;
export const InternalReturnStockDocument = gql`
    mutation InternalReturnStock($id: Int!) {
  returnStock(id: $id) {
    ...StockFields
  }
}
    ${StockFieldsFragmentDoc}`;
export type InternalReturnStockMutationFn = Apollo.MutationFunction<InternalReturnStockMutation, InternalReturnStockMutationVariables>;

/**
 * __useInternalReturnStockMutation__
 *
 * To run a mutation, you first call `useInternalReturnStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalReturnStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalReturnStockMutation, { data, loading, error }] = useInternalReturnStockMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInternalReturnStockMutation(baseOptions?: Apollo.MutationHookOptions<InternalReturnStockMutation, InternalReturnStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalReturnStockMutation, InternalReturnStockMutationVariables>(InternalReturnStockDocument, options);
      }
export type InternalReturnStockMutationHookResult = ReturnType<typeof useInternalReturnStockMutation>;
export type InternalReturnStockMutationResult = Apollo.MutationResult<InternalReturnStockMutation>;
export type InternalReturnStockMutationOptions = Apollo.BaseMutationOptions<InternalReturnStockMutation, InternalReturnStockMutationVariables>;
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
    mutation InternalUpdateInternalUser($id: BigInt!, $name: String!, $email: String!, $password: String!, $discord_user_id: String!, $roleId: Int!) {
  updateInternalUser(
    id: $id
    name: $name
    email: $email
    password: $password
    discord_user_id: $discord_user_id
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
 *      discord_user_id: // value for 'discord_user_id'
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
    mutation InternalUpdateProduct($id: Int!, $makerId: Int!, $name: String!, $remark: String!, $file: Upload) {
  updateProduct(
    id: $id
    makerId: $makerId
    name: $name
    remark: $remark
    file: $file
  ) {
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
 *      file: // value for 'file'
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
export const InternalUpdateProductTagDocument = gql`
    mutation InternalUpdateProductTag($id: Int!, $name: String!) {
  updateProductTag(id: $id, name: $name) {
    ...ProductTagFields
  }
}
    ${ProductTagFieldsFragmentDoc}`;
export type InternalUpdateProductTagMutationFn = Apollo.MutationFunction<InternalUpdateProductTagMutation, InternalUpdateProductTagMutationVariables>;

/**
 * __useInternalUpdateProductTagMutation__
 *
 * To run a mutation, you first call `useInternalUpdateProductTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateProductTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateProductTagMutation, { data, loading, error }] = useInternalUpdateProductTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInternalUpdateProductTagMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateProductTagMutation, InternalUpdateProductTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateProductTagMutation, InternalUpdateProductTagMutationVariables>(InternalUpdateProductTagDocument, options);
      }
export type InternalUpdateProductTagMutationHookResult = ReturnType<typeof useInternalUpdateProductTagMutation>;
export type InternalUpdateProductTagMutationResult = Apollo.MutationResult<InternalUpdateProductTagMutation>;
export type InternalUpdateProductTagMutationOptions = Apollo.BaseMutationOptions<InternalUpdateProductTagMutation, InternalUpdateProductTagMutationVariables>;
export const InternalUpdateProductTagGroupDocument = gql`
    mutation InternalUpdateProductTagGroup($id: Int!, $name: String!) {
  updateProductTagGroup(id: $id, name: $name) {
    ...ProductTagGroupFields
  }
}
    ${ProductTagGroupFieldsFragmentDoc}`;
export type InternalUpdateProductTagGroupMutationFn = Apollo.MutationFunction<InternalUpdateProductTagGroupMutation, InternalUpdateProductTagGroupMutationVariables>;

/**
 * __useInternalUpdateProductTagGroupMutation__
 *
 * To run a mutation, you first call `useInternalUpdateProductTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateProductTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateProductTagGroupMutation, { data, loading, error }] = useInternalUpdateProductTagGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInternalUpdateProductTagGroupMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateProductTagGroupMutation, InternalUpdateProductTagGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateProductTagGroupMutation, InternalUpdateProductTagGroupMutationVariables>(InternalUpdateProductTagGroupDocument, options);
      }
export type InternalUpdateProductTagGroupMutationHookResult = ReturnType<typeof useInternalUpdateProductTagGroupMutation>;
export type InternalUpdateProductTagGroupMutationResult = Apollo.MutationResult<InternalUpdateProductTagGroupMutation>;
export type InternalUpdateProductTagGroupMutationOptions = Apollo.BaseMutationOptions<InternalUpdateProductTagGroupMutation, InternalUpdateProductTagGroupMutationVariables>;
export const InternalUpdateStockInternalUserDocument = gql`
    mutation InternalUpdateStockInternalUser($id: Int!, $internalUserId: BigInt!) {
  updateStockInternalUser(id: $id, internalUserId: $internalUserId) {
    ...StockFields
  }
}
    ${StockFieldsFragmentDoc}`;
export type InternalUpdateStockInternalUserMutationFn = Apollo.MutationFunction<InternalUpdateStockInternalUserMutation, InternalUpdateStockInternalUserMutationVariables>;

/**
 * __useInternalUpdateStockInternalUserMutation__
 *
 * To run a mutation, you first call `useInternalUpdateStockInternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateStockInternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateStockInternalUserMutation, { data, loading, error }] = useInternalUpdateStockInternalUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      internalUserId: // value for 'internalUserId'
 *   },
 * });
 */
export function useInternalUpdateStockInternalUserMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateStockInternalUserMutation, InternalUpdateStockInternalUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateStockInternalUserMutation, InternalUpdateStockInternalUserMutationVariables>(InternalUpdateStockInternalUserDocument, options);
      }
export type InternalUpdateStockInternalUserMutationHookResult = ReturnType<typeof useInternalUpdateStockInternalUserMutation>;
export type InternalUpdateStockInternalUserMutationResult = Apollo.MutationResult<InternalUpdateStockInternalUserMutation>;
export type InternalUpdateStockInternalUserMutationOptions = Apollo.BaseMutationOptions<InternalUpdateStockInternalUserMutation, InternalUpdateStockInternalUserMutationVariables>;
export const InternalUpdateStockRequestDocument = gql`
    mutation InternalUpdateStockRequest($id: Int!, $requestProducts: [CreateStockRequestRequestProductsInputType!]!) {
  updateStockRequest(id: $id, requestProducts: $requestProducts) {
    ...StockRequestFields
  }
}
    ${StockRequestFieldsFragmentDoc}`;
export type InternalUpdateStockRequestMutationFn = Apollo.MutationFunction<InternalUpdateStockRequestMutation, InternalUpdateStockRequestMutationVariables>;

/**
 * __useInternalUpdateStockRequestMutation__
 *
 * To run a mutation, you first call `useInternalUpdateStockRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInternalUpdateStockRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [internalUpdateStockRequestMutation, { data, loading, error }] = useInternalUpdateStockRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      requestProducts: // value for 'requestProducts'
 *   },
 * });
 */
export function useInternalUpdateStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<InternalUpdateStockRequestMutation, InternalUpdateStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InternalUpdateStockRequestMutation, InternalUpdateStockRequestMutationVariables>(InternalUpdateStockRequestDocument, options);
      }
export type InternalUpdateStockRequestMutationHookResult = ReturnType<typeof useInternalUpdateStockRequestMutation>;
export type InternalUpdateStockRequestMutationResult = Apollo.MutationResult<InternalUpdateStockRequestMutation>;
export type InternalUpdateStockRequestMutationOptions = Apollo.BaseMutationOptions<InternalUpdateStockRequestMutation, InternalUpdateStockRequestMutationVariables>;