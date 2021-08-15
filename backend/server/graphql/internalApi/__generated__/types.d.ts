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
}

export interface NexusGenObjects {
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
  Query: {};
  Region: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Session: { // root type
    token: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
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
  }
  Mutation: { // field return type
    createInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    deleteInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    updateInternalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
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
  Query: { // field return type
    hospital: NexusGenRootTypes['Hospital']; // Hospital!
    hospitalConnection: NexusGenRootTypes['HospitalConnection'] | null; // HospitalConnection
    hospitals: NexusGenRootTypes['Hospital'][]; // [Hospital!]!
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    internalUsers: NexusGenRootTypes['InternalUser'][]; // [InternalUser!]!
    session: NexusGenRootTypes['Session']; // Session!
  }
  Region: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Session: { // field return type
    token: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
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
  }
  Mutation: { // field return type name
    createInternalUser: 'InternalUser'
    deleteInternalUser: 'InternalUser'
    updateInternalUser: 'InternalUser'
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
  Query: { // field return type name
    hospital: 'Hospital'
    hospitalConnection: 'HospitalConnection'
    hospitals: 'Hospital'
    internalUser: 'InternalUser'
    internalUsers: 'InternalUser'
    session: 'Session'
  }
  Region: { // field return type name
    id: 'BigInt'
    name: 'String'
  }
  Session: { // field return type name
    token: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createInternalUser: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    deleteInternalUser: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    updateInternalUser: { // args
      email: string; // String!
      id: NexusGenScalars['BigInt']; // BigInt!
      name: string; // String!
      password: string; // String!
    }
  }
  Query: {
    hospital: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    hospitalConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
    internalUser: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

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