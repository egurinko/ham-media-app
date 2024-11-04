/* eslint-disable @typescript-eslint/no-explicit-any */
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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: JSON; output: JSON };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int']['output'];
};

/** A cart */
export type Cart = {
  __typename?: 'Cart';
  id: Scalars['Int']['output'];
  items: Scalars['JSONObject']['output'];
};

export type CreateProductTagsProductTagInputType = {
  name: Scalars['String']['input'];
};

export type CreateSessionType = {
  __typename?: 'CreateSessionType';
  token: Scalars['String']['output'];
};

export type CreateStockRequestRequestProductsInputType = {
  count: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};

export type CreateStocksStocksInputType = {
  amount: Scalars['Int']['input'];
  expiredAt: Scalars['DateTime']['input'];
  internalUserId: Scalars['BigInt']['input'];
};

export type Delete = {
  __typename?: 'Delete';
  deleted: Scalars['Boolean']['output'];
};

/** A hospital */
export type Hospital = {
  __typename?: 'Hospital';
  deleted: Scalars['Boolean']['output'];
  hospitalAddress?: Maybe<HospitalAddress>;
  hospitalBusinessForm?: Maybe<HospitalBusinessForm>;
  hospitalCertificationOption?: Maybe<HospitalCertificationOption>;
  hospitalInternalReputation?: Maybe<HospitalInternalReputation>;
  hospitalNightServiceOption?: Maybe<HospitalNightServiceOption>;
  hospitalNightUrgentActionOption?: Maybe<HospitalNightUrgentActionOption>;
  hospitalReservationStatus?: Maybe<HospitalReservationStatus>;
  id: Scalars['BigInt']['output'];
  internal_memo: Scalars['String']['output'];
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

export type HospitalAddressInputType = {
  address: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
  prefecture_id: Scalars['BigInt']['input'];
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

export type HospitalBusinessFormInputType = {
  business_hour: Scalars['String']['input'];
  closed_day: Scalars['String']['input'];
  insurance_enabled: Scalars['String']['input'];
  remark: Scalars['String']['input'];
};

/** A hospital certification option */
export type HospitalCertificationOption = {
  __typename?: 'HospitalCertificationOption';
  id: Scalars['BigInt']['output'];
  jsava_registered: Scalars['String']['output'];
  nichiju_registered: Scalars['String']['output'];
};

export type HospitalCertificationOptionInputType = {
  jsava_registered: Scalars['String']['input'];
  nichiju_registered: Scalars['String']['input'];
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

/** A hospital internal reputation */
export type HospitalInternalReputation = {
  __typename?: 'HospitalInternalReputation';
  id: Scalars['BigInt']['output'];
  remark: Scalars['String']['output'];
  star: Scalars['Int']['output'];
};

export type HospitalInternalReputationInputType = {
  remark: Scalars['String']['input'];
  star: Scalars['Int']['input'];
};

/** A hospital night service option */
export type HospitalNightServiceOption = {
  __typename?: 'HospitalNightServiceOption';
  id: Scalars['BigInt']['output'];
  remark: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type HospitalNightServiceOptionInputType = {
  remark: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

/** A hospital night urgent action option */
export type HospitalNightUrgentActionOption = {
  __typename?: 'HospitalNightUrgentActionOption';
  id: Scalars['BigInt']['output'];
  status: Scalars['String']['output'];
};

export type HospitalNightUrgentActionOptionInputType = {
  status: Scalars['String']['input'];
};

/** A hospital reservation status */
export type HospitalReservationStatus = {
  __typename?: 'HospitalReservationStatus';
  id: Scalars['BigInt']['output'];
  remark: Scalars['String']['output'];
  required: Scalars['String']['output'];
  reservable: Scalars['String']['output'];
};

export type HospitalReservationStatusInputType = {
  remark: Scalars['String']['input'];
  required: Scalars['String']['input'];
  reservable: Scalars['String']['input'];
};

/** A internal user */
export type InternalUser = {
  __typename?: 'InternalUser';
  cart: Cart;
  discord_user_id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

/** A maker */
export type Maker = {
  __typename?: 'Maker';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
  createSession: CreateSessionType;
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
  updateCart: Cart;
  updateHospital: Hospital;
  updateHospitalAddress: HospitalAddress;
  updateHospitalBase: Hospital;
  updateHospitalBusinessForm: HospitalBusinessForm;
  updateHospitalInternalReputation: HospitalInternalReputation;
  updateHospitalReservationStatus: HospitalReservationStatus;
  updateInternalUser: InternalUser;
  updateMaker: Maker;
  updateProduct: Product;
  updateProductTag: ProductTag;
  updateProductTagGroup: ProductTagGroup;
  updateStockInternalUser: Stock;
  updateStockRequest: StockRequest;
  upsertHospitalAddressGeoLocation: HospitalAddress;
};

export type MutationAllocateStockArgs = {
  id: Scalars['Int']['input'];
  internalUserId: Scalars['BigInt']['input'];
};

export type MutationApproveStockRequestArgs = {
  id: Scalars['Int']['input'];
  message: Scalars['String']['input'];
};

export type MutationCreateHospitalArgs = {
  deleted: Scalars['Boolean']['input'];
  internal_memo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateInternalUserArgs = {
  discord_user_id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
};

export type MutationCreateMakerArgs = {
  name: Scalars['String']['input'];
};

export type MutationCreateProductArgs = {
  file: Scalars['Upload']['input'];
  makerId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  productTagIds: Array<Scalars['Int']['input']>;
  remark: Scalars['String']['input'];
};

export type MutationCreateProductTagGroupArgs = {
  name: Scalars['String']['input'];
};

export type MutationCreateProductTaggingsArgs = {
  productId: Scalars['Int']['input'];
  productTagIds: Array<Scalars['Int']['input']>;
};

export type MutationCreateProductTagsArgs = {
  productTagGroupId: Scalars['Int']['input'];
  productTags: Array<CreateProductTagsProductTagInputType>;
};

export type MutationCreateSessionArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationCreateStockRequestArgs = {
  requestProducts: Array<CreateStockRequestRequestProductsInputType>;
};

export type MutationCreateStocksArgs = {
  productId: Scalars['Int']['input'];
  stocks: Array<CreateStocksStocksInputType>;
};

export type MutationDeleteInternalUserArgs = {
  id: Scalars['BigInt']['input'];
};

export type MutationDeleteMakerArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductTagArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductTaggingArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteStockArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteStockRequestArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRejectStockRequestArgs = {
  id: Scalars['Int']['input'];
  message: Scalars['String']['input'];
};

export type MutationReturnStockArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateCartArgs = {
  id: Scalars['Int']['input'];
  items: Scalars['JSONObject']['input'];
};

export type MutationUpdateHospitalArgs = {
  deleted: Scalars['Boolean']['input'];
  hospitalAddressInput: HospitalAddressInputType;
  hospitalBusinessFormInput: HospitalBusinessFormInputType;
  hospitalCertificationOptionInput: HospitalCertificationOptionInputType;
  hospitalInternalReputationInput: HospitalInternalReputationInputType;
  hospitalNightServiceOptionInput: HospitalNightServiceOptionInputType;
  hospitalNightUrgentActionOptionInput: HospitalNightUrgentActionOptionInputType;
  hospitalReservationStatusInput: HospitalReservationStatusInputType;
  id: Scalars['BigInt']['input'];
  internal_memo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type MutationUpdateHospitalAddressArgs = {
  address: Scalars['String']['input'];
  hospital_id: Scalars['BigInt']['input'];
  phone_number: Scalars['String']['input'];
  prefecture_id: Scalars['BigInt']['input'];
};

export type MutationUpdateHospitalBaseArgs = {
  deleted: Scalars['Boolean']['input'];
  id: Scalars['BigInt']['input'];
  internal_memo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type MutationUpdateHospitalBusinessFormArgs = {
  business_hour: Scalars['String']['input'];
  closed_day: Scalars['String']['input'];
  hospital_id: Scalars['BigInt']['input'];
  insurance_enabled: Scalars['String']['input'];
  remark: Scalars['String']['input'];
};

export type MutationUpdateHospitalInternalReputationArgs = {
  hospital_id: Scalars['BigInt']['input'];
  remark: Scalars['String']['input'];
  star: Scalars['Int']['input'];
};

export type MutationUpdateHospitalReservationStatusArgs = {
  hospital_id: Scalars['BigInt']['input'];
  remark: Scalars['String']['input'];
  required: Scalars['String']['input'];
  reservable: Scalars['String']['input'];
};

export type MutationUpdateInternalUserArgs = {
  discord_user_id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
};

export type MutationUpdateMakerArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdateProductArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  id: Scalars['Int']['input'];
  makerId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  remark: Scalars['String']['input'];
};

export type MutationUpdateProductTagArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdateProductTagGroupArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MutationUpdateStockInternalUserArgs = {
  id: Scalars['Int']['input'];
  internalUserId: Scalars['BigInt']['input'];
};

export type MutationUpdateStockRequestArgs = {
  id: Scalars['Int']['input'];
  requestProducts: Array<CreateStockRequestRequestProductsInputType>;
};

export type MutationUpsertHospitalAddressGeoLocationArgs = {
  hospitalAddressId: Scalars['BigInt']['input'];
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

/** A product */
export type Product = {
  __typename?: 'Product';
  allocatedStockAmount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  maker: Maker;
  name: Scalars['String']['output'];
  productTaggings: Array<ProductTagging>;
  remainingStockAmount: Scalars['Int']['output'];
  remark: Scalars['String']['output'];
  stocks: Array<Stock>;
  totalStockAmount: Scalars['Int']['output'];
  url: Scalars['String']['output'];
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
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Product>;
};

/** A product tag */
export type ProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productTagGroup: ProductTagGroup;
};

/** A product tag group */
export type ProductTagGroup = {
  __typename?: 'ProductTagGroup';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productTags: Array<ProductTag>;
};

/** A product tagging */
export type ProductTagging = {
  __typename?: 'ProductTagging';
  id: Scalars['Int']['output'];
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
  placeAutocomplete: PlaceAutocomplete;
  prefectures: Array<Prefecture>;
  product: Product;
  productConnection?: Maybe<ProductConnection>;
  productTagGroup: ProductTagGroup;
  productTagGroups: Array<ProductTagGroup>;
  products: Array<Product>;
  publicHospitalConnection?: Maybe<HospitalConnection>;
  roles: Array<Role>;
  session: Session;
  stockRequest: StockRequest;
  stockRequestConnection?: Maybe<StockRequestConnection>;
  stocks: Array<Stock>;
};

export type QueryHospitalArgs = {
  id: Scalars['BigInt']['input'];
};

export type QueryHospitalConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  deleted: Scalars['Boolean']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  internalReputationStar?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  prefectureId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type QueryInternalUserArgs = {
  id: Scalars['BigInt']['input'];
};

export type QueryMakerArgs = {
  id: Scalars['Int']['input'];
};

export type QueryPlaceAutocompleteArgs = {
  searchText: Scalars['String']['input'];
};

export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};

export type QueryProductConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  allocatedInternalUserId?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasStock?: InputMaybe<Scalars['Boolean']['input']>;
  internalUserId?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  makerId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productTagId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryProductTagGroupArgs = {
  id: Scalars['Int']['input'];
};

export type QueryProductsArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type QueryStockRequestArgs = {
  id: Scalars['Int']['input'];
};

export type QueryStockRequestConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  internalUserId?: InputMaybe<Scalars['BigInt']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryStocksArgs = {
  productId: Scalars['Int']['input'];
};

/** A region */
export type Region = {
  __typename?: 'Region';
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
};

/** A role */
export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Session = {
  __typename?: 'Session';
  internalUser: InternalUser;
  token: Scalars['String']['output'];
};

/** A stock */
export type Stock = {
  __typename?: 'Stock';
  created_at: Scalars['DateTime']['output'];
  expired_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  internalUser: InternalUser;
  product: Product;
  stockAllocation?: Maybe<StockAllocation>;
};

/** A stock allocation */
export type StockAllocation = {
  __typename?: 'StockAllocation';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  internalUser: InternalUser;
};

/** A stock request */
export type StockRequest = {
  __typename?: 'StockRequest';
  id: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<StockRequest>;
};

/** A stock request product registration */
export type StockRequestProductRegistration = {
  __typename?: 'StockRequestProductRegistration';
  id: Scalars['Int']['output'];
  product: Product;
};

export type CurrentLocation = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type GetRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
  __typename?: 'Query';
  roles: Array<{ __typename?: 'Role'; id: number; name: string }>;
};

export type GetInternalUserQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;

export type GetInternalUserQuery = {
  __typename?: 'Query';
  internalUser: {
    __typename?: 'InternalUser';
    id: number;
    name: string;
    email: string;
    discord_user_id: string;
    role: { __typename?: 'Role'; id: number };
  };
};

export type UpdateInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  discord_user_id: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
}>;

export type UpdateInternalUserMutation = {
  __typename?: 'Mutation';
  updateInternalUser: { __typename?: 'InternalUser'; id: number };
};

export type CreateInternalUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  discord_user_id: Scalars['String']['input'];
  roleId: Scalars['Int']['input'];
}>;

export type CreateInternalUserMutation = {
  __typename?: 'Mutation';
  createInternalUser: { __typename?: 'InternalUser'; id: number };
};

export type GetInternalUserProfileQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetInternalUserProfileQuery = {
  __typename?: 'Query';
  session: {
    __typename?: 'Session';
    internalUser: { __typename?: 'InternalUser'; name: string };
  };
};

export type GetInternalUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetInternalUsersQuery = {
  __typename?: 'Query';
  internalUsers: Array<{
    __typename?: 'InternalUser';
    id: number;
    email: string;
    name: string;
    role: { __typename?: 'Role'; name: string };
  }>;
};

export type InternalUserListItemFieldsFragment = {
  __typename?: 'InternalUser';
  id: number;
  email: string;
  name: string;
  role: { __typename?: 'Role'; name: string };
};

export type DeleteInternalUserMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;

export type DeleteInternalUserMutation = {
  __typename?: 'Mutation';
  deleteInternalUser: { __typename?: 'Delete'; deleted: boolean };
};

export type CreateSessionMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type CreateSessionMutation = {
  __typename?: 'Mutation';
  createSession: { __typename?: 'CreateSessionType'; token: string };
};
