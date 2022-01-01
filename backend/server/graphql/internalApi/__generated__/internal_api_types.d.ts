/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
     */
    bigInt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
     */
    bigInt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateProductTagsProductTagInputType: { // input type
    name: string; // String!
  }
  CreateStockRequestrequestProductsInputType: { // input type
    count: number; // Int!
    productId: number; // Int!
  }
  CreateStocksStocksInputType: { // input type
    amount: number; // Int!
    expiredAt: NexusGenScalars['DateTime']; // DateTime!
  }
  HospitalAddressInputType: { // input type
    address: string; // String!
    phone_number: string; // String!
    prefecture_id: NexusGenScalars['BigInt']; // BigInt!
  }
  HospitalBusinessFormInputType: { // input type
    business_hour: string; // String!
    closed_day: string; // String!
    insurance_enabled: string; // String!
    remark: string; // String!
  }
  HospitalCertificationOptionInputType: { // input type
    jsava_registered: string; // String!
    nichiju_registered: string; // String!
  }
  HospitalInternalReputationInputType: { // input type
    remark: string; // String!
    star: number; // Int!
  }
  HospitalNightServiceOptionInputType: { // input type
    remark: string; // String!
    status: string; // String!
  }
  HospitalNightUrgentActionOptionInputType: { // input type
    status: string; // String!
  }
  HospitalReservationStatusInputType: { // input type
    remark: string; // String!
    required: string; // String!
    reservable: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: any
  DateTime: any
  Upload: any
}

export interface NexusGenObjects {
  BatchPayload: { // root type
    count: number; // Int!
  }
  Delete: { // root type
    deleted: boolean; // Boolean!
  }
  Hospital: { // root type
    deleted: boolean; // Boolean!
    id: NexusGenScalars['BigInt']; // BigInt!
    internal_memo: string; // String!
    name: string; // String!
    url: string; // String!
  }
  HospitalAddress: { // root type
    address: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    phone_number: string; // String!
  }
  HospitalAddressGeoLocation: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  HospitalBusinessForm: { // root type
    business_hour: string; // String!
    closed_day: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    insurance_enabled: string; // String!
    remark: string; // String!
  }
  HospitalCertificationOption: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    jsava_registered: string; // String!
    nichiju_registered: string; // String!
  }
  HospitalConnection: { // root type
    edges?: Array<NexusGenRootTypes['HospitalEdge'] | null> | null; // [HospitalEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  HospitalEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Hospital'] | null; // Hospital
  }
  HospitalInternalReputation: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    star: number; // Int!
  }
  HospitalNightServiceOption: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    status: string; // String!
  }
  HospitalNightUrgentActionOption: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    status: string; // String!
  }
  HospitalReservationStatus: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    required: string; // String!
    reservable: string; // String!
  }
  InternalUser: { // root type
    email: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Maker: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Prefecture: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Product: { // root type
    id: number; // Int!
    name: string; // String!
    remark: string; // String!
    url: string; // String!
  }
  ProductConnection: { // root type
    edges?: Array<NexusGenRootTypes['ProductEdge'] | null> | null; // [ProductEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  ProductEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Product'] | null; // Product
  }
  ProductTag: { // root type
    id: number; // Int!
    name: string; // String!
  }
  ProductTagGroup: { // root type
    id: number; // Int!
    name: string; // String!
  }
  ProductTagging: { // root type
    id: number; // Int!
  }
  Query: {};
  Region: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Role: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Session: { // root type
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    token: string; // String!
  }
  Stock: { // root type
    expired_at: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  StockAllocation: { // root type
    created_at: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  StockRequest: { // root type
    id: number; // Int!
  }
  StockRequestApproval: { // root type
    id: number; // Int!
  }
  StockRequestConnection: { // root type
    edges?: Array<NexusGenRootTypes['StockRequestEdge'] | null> | null; // [StockRequestEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  StockRequestEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['StockRequest'] | null; // StockRequest
  }
  StockRequestStockRegistration: { // root type
    id: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  BatchPayload: { // field return type
    count: number; // Int!
  }
  Delete: { // field return type
    deleted: boolean; // Boolean!
  }
  Hospital: { // field return type
    deleted: boolean; // Boolean!
    hospitalAddress: NexusGenRootTypes['HospitalAddress'] | null; // HospitalAddress
    hospitalBusinessForm: NexusGenRootTypes['HospitalBusinessForm'] | null; // HospitalBusinessForm
    hospitalCertificationOption: NexusGenRootTypes['HospitalCertificationOption'] | null; // HospitalCertificationOption
    hospitalInternalReputation: NexusGenRootTypes['HospitalInternalReputation'] | null; // HospitalInternalReputation
    hospitalNightServiceOption: NexusGenRootTypes['HospitalNightServiceOption'] | null; // HospitalNightServiceOption
    hospitalNightUrgentActionOption: NexusGenRootTypes['HospitalNightUrgentActionOption'] | null; // HospitalNightUrgentActionOption
    hospitalReservationStatus: NexusGenRootTypes['HospitalReservationStatus'] | null; // HospitalReservationStatus
    id: NexusGenScalars['BigInt']; // BigInt!
    internal_memo: string; // String!
    name: string; // String!
    url: string; // String!
  }
  HospitalAddress: { // field return type
    address: string; // String!
    hospitalAddressGeoLocation: NexusGenRootTypes['HospitalAddressGeoLocation'] | null; // HospitalAddressGeoLocation
    id: NexusGenScalars['BigInt']; // BigInt!
    phone_number: string; // String!
    prefecture: NexusGenRootTypes['Prefecture']; // Prefecture!
  }
  HospitalAddressGeoLocation: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  HospitalBusinessForm: { // field return type
    business_hour: string; // String!
    closed_day: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    insurance_enabled: string; // String!
    remark: string; // String!
  }
  HospitalCertificationOption: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    jsava_registered: string; // String!
    nichiju_registered: string; // String!
  }
  HospitalConnection: { // field return type
    edges: Array<NexusGenRootTypes['HospitalEdge'] | null> | null; // [HospitalEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  HospitalEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Hospital'] | null; // Hospital
  }
  HospitalInternalReputation: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    star: number; // Int!
  }
  HospitalNightServiceOption: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    status: string; // String!
  }
  HospitalNightUrgentActionOption: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    status: string; // String!
  }
  HospitalReservationStatus: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    remark: string; // String!
    required: string; // String!
    reservable: string; // String!
  }
  InternalUser: { // field return type
    email: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    role: NexusGenRootTypes['Role']; // Role!
  }
  Maker: { // field return type
    id: number; // Int!
    name: string; // String!
  }
  Mutation: { // field return type
    allocateStock: NexusGenRootTypes['Stock']; // Stock!
    createHospital: NexusGenRootTypes['Hospital']; // Hospital!
    createInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    createMaker: NexusGenRootTypes['Maker']; // Maker!
    createProduct: NexusGenRootTypes['Product']; // Product!
    createProductTagGroup: NexusGenRootTypes['ProductTagGroup']; // ProductTagGroup!
    createProductTaggings: NexusGenRootTypes['Product']; // Product!
    createProductTags: NexusGenRootTypes['BatchPayload']; // BatchPayload!
    createStockRequest: NexusGenRootTypes['StockRequest']; // StockRequest!
    createStocks: NexusGenRootTypes['Stock'][]; // [Stock!]!
    deleteInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    deleteMaker: NexusGenRootTypes['Maker']; // Maker!
    deleteProductTag: NexusGenRootTypes['ProductTag']; // ProductTag!
    deleteProductTagging: NexusGenRootTypes['Delete']; // Delete!
    deleteStock: NexusGenRootTypes['Stock']; // Stock!
    returnStock: NexusGenRootTypes['Stock']; // Stock!
    updateHospital: NexusGenRootTypes['Hospital']; // Hospital!
    updateInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    updateMaker: NexusGenRootTypes['Maker']; // Maker!
    updateProduct: NexusGenRootTypes['Product']; // Product!
    updateProductTag: NexusGenRootTypes['ProductTag']; // ProductTag!
    updateProductTagGroup: NexusGenRootTypes['ProductTagGroup']; // ProductTagGroup!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Prefecture: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    region: NexusGenRootTypes['Region']; // Region!
  }
  Product: { // field return type
    allocatedStockAmount: number; // Int!
    id: number; // Int!
    maker: NexusGenRootTypes['Maker']; // Maker!
    name: string; // String!
    productTaggings: NexusGenRootTypes['ProductTagging'][]; // [ProductTagging!]!
    remainingStockAmount: number; // Int!
    remark: string; // String!
    stocks: NexusGenRootTypes['Stock'][]; // [Stock!]!
    totalStockAmount: number; // Int!
    url: string; // String!
  }
  ProductConnection: { // field return type
    edges: Array<NexusGenRootTypes['ProductEdge'] | null> | null; // [ProductEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  ProductEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Product'] | null; // Product
  }
  ProductTag: { // field return type
    id: number; // Int!
    name: string; // String!
    productTagGroup: NexusGenRootTypes['ProductTagGroup']; // ProductTagGroup!
  }
  ProductTagGroup: { // field return type
    id: number; // Int!
    name: string; // String!
    productTags: NexusGenRootTypes['ProductTag'][]; // [ProductTag!]!
  }
  ProductTagging: { // field return type
    id: number; // Int!
    productTag: NexusGenRootTypes['ProductTag']; // ProductTag!
  }
  Query: { // field return type
    hospital: NexusGenRootTypes['Hospital']; // Hospital!
    hospitalConnection: NexusGenRootTypes['HospitalConnection'] | null; // HospitalConnection
    hospitals: NexusGenRootTypes['Hospital'][]; // [Hospital!]!
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    internalUsers: NexusGenRootTypes['InternalUser'][]; // [InternalUser!]!
    maker: NexusGenRootTypes['Maker']; // Maker!
    makers: NexusGenRootTypes['Maker'][]; // [Maker!]!
    product: NexusGenRootTypes['Product']; // Product!
    productConnection: NexusGenRootTypes['ProductConnection'] | null; // ProductConnection
    productTagGroup: NexusGenRootTypes['ProductTagGroup']; // ProductTagGroup!
    productTagGroups: NexusGenRootTypes['ProductTagGroup'][]; // [ProductTagGroup!]!
    products: NexusGenRootTypes['Product'][]; // [Product!]!
    roles: NexusGenRootTypes['Role'][]; // [Role!]!
    session: NexusGenRootTypes['Session']; // Session!
    stockRequestConnection: NexusGenRootTypes['StockRequestConnection'] | null; // StockRequestConnection
    stocks: NexusGenRootTypes['Stock'][]; // [Stock!]!
  }
  Region: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Role: { // field return type
    id: number; // Int!
    name: string; // String!
  }
  Session: { // field return type
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    token: string; // String!
  }
  Stock: { // field return type
    expired_at: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    stockAllocation: NexusGenRootTypes['StockAllocation'] | null; // StockAllocation
  }
  StockAllocation: { // field return type
    created_at: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
  }
  StockRequest: { // field return type
    approval: NexusGenRootTypes['StockRequestApproval'] | null; // StockRequestApproval
    id: number; // Int!
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    stockRegistrations: NexusGenRootTypes['StockRequestStockRegistration'][]; // [StockRequestStockRegistration!]!
  }
  StockRequestApproval: { // field return type
    id: number; // Int!
  }
  StockRequestConnection: { // field return type
    edges: Array<NexusGenRootTypes['StockRequestEdge'] | null> | null; // [StockRequestEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  StockRequestEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['StockRequest'] | null; // StockRequest
  }
  StockRequestStockRegistration: { // field return type
    id: number; // Int!
    stock: NexusGenRootTypes['Stock']; // Stock!
  }
}

export interface NexusGenFieldTypeNames {
  BatchPayload: { // field return type name
    count: 'Int'
  }
  Delete: { // field return type name
    deleted: 'Boolean'
  }
  Hospital: { // field return type name
    deleted: 'Boolean'
    hospitalAddress: 'HospitalAddress'
    hospitalBusinessForm: 'HospitalBusinessForm'
    hospitalCertificationOption: 'HospitalCertificationOption'
    hospitalInternalReputation: 'HospitalInternalReputation'
    hospitalNightServiceOption: 'HospitalNightServiceOption'
    hospitalNightUrgentActionOption: 'HospitalNightUrgentActionOption'
    hospitalReservationStatus: 'HospitalReservationStatus'
    id: 'BigInt'
    internal_memo: 'String'
    name: 'String'
    url: 'String'
  }
  HospitalAddress: { // field return type name
    address: 'String'
    hospitalAddressGeoLocation: 'HospitalAddressGeoLocation'
    id: 'BigInt'
    phone_number: 'String'
    prefecture: 'Prefecture'
  }
  HospitalAddressGeoLocation: { // field return type name
    id: 'BigInt'
    latitude: 'Float'
    longitude: 'Float'
  }
  HospitalBusinessForm: { // field return type name
    business_hour: 'String'
    closed_day: 'String'
    id: 'BigInt'
    insurance_enabled: 'String'
    remark: 'String'
  }
  HospitalCertificationOption: { // field return type name
    id: 'BigInt'
    jsava_registered: 'String'
    nichiju_registered: 'String'
  }
  HospitalConnection: { // field return type name
    edges: 'HospitalEdge'
    pageInfo: 'PageInfo'
  }
  HospitalEdge: { // field return type name
    cursor: 'String'
    node: 'Hospital'
  }
  HospitalInternalReputation: { // field return type name
    id: 'BigInt'
    remark: 'String'
    star: 'Int'
  }
  HospitalNightServiceOption: { // field return type name
    id: 'BigInt'
    remark: 'String'
    status: 'String'
  }
  HospitalNightUrgentActionOption: { // field return type name
    id: 'BigInt'
    status: 'String'
  }
  HospitalReservationStatus: { // field return type name
    id: 'BigInt'
    remark: 'String'
    required: 'String'
    reservable: 'String'
  }
  InternalUser: { // field return type name
    email: 'String'
    id: 'BigInt'
    name: 'String'
    role: 'Role'
  }
  Maker: { // field return type name
    id: 'Int'
    name: 'String'
  }
  Mutation: { // field return type name
    allocateStock: 'Stock'
    createHospital: 'Hospital'
    createInternalUser: 'InternalUser'
    createMaker: 'Maker'
    createProduct: 'Product'
    createProductTagGroup: 'ProductTagGroup'
    createProductTaggings: 'Product'
    createProductTags: 'BatchPayload'
    createStockRequest: 'StockRequest'
    createStocks: 'Stock'
    deleteInternalUser: 'InternalUser'
    deleteMaker: 'Maker'
    deleteProductTag: 'ProductTag'
    deleteProductTagging: 'Delete'
    deleteStock: 'Stock'
    returnStock: 'Stock'
    updateHospital: 'Hospital'
    updateInternalUser: 'InternalUser'
    updateMaker: 'Maker'
    updateProduct: 'Product'
    updateProductTag: 'ProductTag'
    updateProductTagGroup: 'ProductTagGroup'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Prefecture: { // field return type name
    id: 'BigInt'
    name: 'String'
    region: 'Region'
  }
  Product: { // field return type name
    allocatedStockAmount: 'Int'
    id: 'Int'
    maker: 'Maker'
    name: 'String'
    productTaggings: 'ProductTagging'
    remainingStockAmount: 'Int'
    remark: 'String'
    stocks: 'Stock'
    totalStockAmount: 'Int'
    url: 'String'
  }
  ProductConnection: { // field return type name
    edges: 'ProductEdge'
    pageInfo: 'PageInfo'
  }
  ProductEdge: { // field return type name
    cursor: 'String'
    node: 'Product'
  }
  ProductTag: { // field return type name
    id: 'Int'
    name: 'String'
    productTagGroup: 'ProductTagGroup'
  }
  ProductTagGroup: { // field return type name
    id: 'Int'
    name: 'String'
    productTags: 'ProductTag'
  }
  ProductTagging: { // field return type name
    id: 'Int'
    productTag: 'ProductTag'
  }
  Query: { // field return type name
    hospital: 'Hospital'
    hospitalConnection: 'HospitalConnection'
    hospitals: 'Hospital'
    internalUser: 'InternalUser'
    internalUsers: 'InternalUser'
    maker: 'Maker'
    makers: 'Maker'
    product: 'Product'
    productConnection: 'ProductConnection'
    productTagGroup: 'ProductTagGroup'
    productTagGroups: 'ProductTagGroup'
    products: 'Product'
    roles: 'Role'
    session: 'Session'
    stockRequestConnection: 'StockRequestConnection'
    stocks: 'Stock'
  }
  Region: { // field return type name
    id: 'BigInt'
    name: 'String'
  }
  Role: { // field return type name
    id: 'Int'
    name: 'String'
  }
  Session: { // field return type name
    internalUser: 'InternalUser'
    token: 'String'
  }
  Stock: { // field return type name
    expired_at: 'DateTime'
    id: 'Int'
    stockAllocation: 'StockAllocation'
  }
  StockAllocation: { // field return type name
    created_at: 'DateTime'
    id: 'Int'
    internalUser: 'InternalUser'
  }
  StockRequest: { // field return type name
    approval: 'StockRequestApproval'
    id: 'Int'
    internalUser: 'InternalUser'
    stockRegistrations: 'StockRequestStockRegistration'
  }
  StockRequestApproval: { // field return type name
    id: 'Int'
  }
  StockRequestConnection: { // field return type name
    edges: 'StockRequestEdge'
    pageInfo: 'PageInfo'
  }
  StockRequestEdge: { // field return type name
    cursor: 'String'
    node: 'StockRequest'
  }
  StockRequestStockRegistration: { // field return type name
    id: 'Int'
    stock: 'Stock'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    allocateStock: { // args
      id: number; // Int!
      internalUserId: NexusGenScalars['BigInt']; // BigInt!
    }
    createHospital: { // args
      deleted: boolean; // Boolean!
      internal_memo: string; // String!
      name: string; // String!
      url?: string | null; // String
    }
    createInternalUser: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
      roleId: number; // Int!
    }
    createMaker: { // args
      name: string; // String!
    }
    createProduct: { // args
      file: NexusGenScalars['Upload']; // Upload!
      makerId: number; // Int!
      name: string; // String!
      productTagIds: number[]; // [Int!]!
      remark: string; // String!
    }
    createProductTagGroup: { // args
      name: string; // String!
    }
    createProductTaggings: { // args
      productId: number; // Int!
      productTagIds: number[]; // [Int!]!
    }
    createProductTags: { // args
      productTagGroupId: number; // Int!
      productTags: NexusGenInputs['CreateProductTagsProductTagInputType'][]; // [CreateProductTagsProductTagInputType!]!
    }
    createStockRequest: { // args
      internalUserId: number; // Int!
      requestProducts: NexusGenInputs['CreateStockRequestrequestProductsInputType'][]; // [CreateStockRequestrequestProductsInputType!]!
    }
    createStocks: { // args
      productId: number; // Int!
      stocks: NexusGenInputs['CreateStocksStocksInputType'][]; // [CreateStocksStocksInputType!]!
    }
    deleteInternalUser: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    deleteMaker: { // args
      id: number; // Int!
    }
    deleteProductTag: { // args
      id: number; // Int!
    }
    deleteProductTagging: { // args
      id: number; // Int!
    }
    deleteStock: { // args
      id: number; // Int!
    }
    returnStock: { // args
      id: number; // Int!
    }
    updateHospital: { // args
      deleted: boolean; // Boolean!
      hospitalAddressInput: NexusGenInputs['HospitalAddressInputType']; // HospitalAddressInputType!
      hospitalBusinessFormInput: NexusGenInputs['HospitalBusinessFormInputType']; // HospitalBusinessFormInputType!
      hospitalCertificationOptionInput: NexusGenInputs['HospitalCertificationOptionInputType']; // HospitalCertificationOptionInputType!
      hospitalInternalReputationInput: NexusGenInputs['HospitalInternalReputationInputType']; // HospitalInternalReputationInputType!
      hospitalNightServiceOptionInput: NexusGenInputs['HospitalNightServiceOptionInputType']; // HospitalNightServiceOptionInputType!
      hospitalNightUrgentActionOptionInput: NexusGenInputs['HospitalNightUrgentActionOptionInputType']; // HospitalNightUrgentActionOptionInputType!
      hospitalReservationStatusInput: NexusGenInputs['HospitalReservationStatusInputType']; // HospitalReservationStatusInputType!
      id: NexusGenScalars['BigInt']; // BigInt!
      internal_memo: string; // String!
      name: string; // String!
      url: string; // String!
    }
    updateInternalUser: { // args
      email: string; // String!
      id: NexusGenScalars['BigInt']; // BigInt!
      name: string; // String!
      password: string; // String!
      roleId: number; // Int!
    }
    updateMaker: { // args
      id: number; // Int!
      name: string; // String!
    }
    updateProduct: { // args
      file?: NexusGenScalars['Upload'] | null; // Upload
      id: number; // Int!
      makerId: number; // Int!
      name: string; // String!
      remark: string; // String!
    }
    updateProductTag: { // args
      id: number; // Int!
      name: string; // String!
    }
    updateProductTagGroup: { // args
      id: number; // Int!
      name: string; // String!
    }
  }
  Query: {
    hospital: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    hospitalConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      deleted?: boolean | null; // Boolean
      first?: number | null; // Int
      last?: number | null; // Int
      name?: string | null; // String
      prefectureId?: NexusGenScalars['BigInt'] | null; // BigInt
    }
    internalUser: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    maker: { // args
      id: number; // Int!
    }
    product: { // args
      id: number; // Int!
    }
    productConnection: { // args
      after?: string | null; // String
      allocatedInternalUserId?: number | null; // Int
      before?: string | null; // String
      first?: number | null; // Int
      hasStock?: boolean | null; // Boolean
      last?: number | null; // Int
      makerId?: number | null; // Int
      name?: string | null; // String
      productTagId?: number | null; // Int
    }
    productTagGroup: { // args
      id: number; // Int!
    }
    stockRequestConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      internalUserId?: NexusGenScalars['BigInt'] | null; // BigInt
      last?: number | null; // Int
    }
    stocks: { // args
      productId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}