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
  currentLocation: { // input type
    latitude: number; // Float!
    longitude: number; // Float!
  }
}

export interface NexusGenEnums {
  PlaceAutocompleteStatus: "INVALID_REQUEST" | "OK" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "UNKNOWN_ERROR" | "ZERO_RESULTS"
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
  CreateSessionType: { // root type
    token: string; // String!
  }
  Hospital: { // root type
    id: NexusGenScalars['BigInt']; // BigInt!
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
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  PlaceAutocomplete: { // root type
    error_message?: string | null; // String
    info_messages?: string[] | null; // [String!]
    predictions: NexusGenRootTypes['PlaceAutocompletePrediction'][]; // [PlaceAutocompletePrediction!]!
    status: NexusGenEnums['PlaceAutocompleteStatus']; // PlaceAutocompleteStatus!
  }
  PlaceAutocompletePrediction: { // root type
    description: string; // String!
    matched_substrings: NexusGenRootTypes['PlaceAutocompletePredictionMatchedSubstring'][]; // [PlaceAutocompletePredictionMatchedSubstring!]!
    place_id: string; // String!
    reference: string; // String!
    structured_formatting: NexusGenRootTypes['PlaceAutocompletePredictionStructuredFormatting']; // PlaceAutocompletePredictionStructuredFormatting!
    terms: NexusGenRootTypes['PlaceAutocompletePredictionTerm'][]; // [PlaceAutocompletePredictionTerm!]!
    types: string[]; // [String!]!
  }
  PlaceAutocompletePredictionMatchedSubstring: { // root type
    length: number; // Int!
    offset: number; // Int!
  }
  PlaceAutocompletePredictionStructuredFormatting: { // root type
    main_text: string; // String!
    main_text_matched_substrings: NexusGenRootTypes['PlaceAutocompletePredictionMatchedSubstring'][]; // [PlaceAutocompletePredictionMatchedSubstring!]!
    secondary_text: string; // String!
  }
  PlaceAutocompletePredictionTerm: { // root type
    offset: number; // Int!
    value: string; // String!
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
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  CreateSessionType: { // field return type
    token: string; // String!
  }
  Hospital: { // field return type
    hospitalAddress: NexusGenRootTypes['HospitalAddress'] | null; // HospitalAddress
    hospitalBusinessForm: NexusGenRootTypes['HospitalBusinessForm'] | null; // HospitalBusinessForm
    hospitalCertificationOption: NexusGenRootTypes['HospitalCertificationOption'] | null; // HospitalCertificationOption
    hospitalNightServiceOption: NexusGenRootTypes['HospitalNightServiceOption'] | null; // HospitalNightServiceOption
    hospitalNightUrgentActionOption: NexusGenRootTypes['HospitalNightUrgentActionOption'] | null; // HospitalNightUrgentActionOption
    hospitalReservationStatus: NexusGenRootTypes['HospitalReservationStatus'] | null; // HospitalReservationStatus
    id: NexusGenScalars['BigInt']; // BigInt!
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
  Mutation: { // field return type
    createSession: NexusGenRootTypes['CreateSessionType']; // CreateSessionType!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  PlaceAutocomplete: { // field return type
    error_message: string | null; // String
    info_messages: string[] | null; // [String!]
    predictions: NexusGenRootTypes['PlaceAutocompletePrediction'][]; // [PlaceAutocompletePrediction!]!
    status: NexusGenEnums['PlaceAutocompleteStatus']; // PlaceAutocompleteStatus!
  }
  PlaceAutocompletePrediction: { // field return type
    description: string; // String!
    matched_substrings: NexusGenRootTypes['PlaceAutocompletePredictionMatchedSubstring'][]; // [PlaceAutocompletePredictionMatchedSubstring!]!
    place_id: string; // String!
    reference: string; // String!
    structured_formatting: NexusGenRootTypes['PlaceAutocompletePredictionStructuredFormatting']; // PlaceAutocompletePredictionStructuredFormatting!
    terms: NexusGenRootTypes['PlaceAutocompletePredictionTerm'][]; // [PlaceAutocompletePredictionTerm!]!
    types: string[]; // [String!]!
  }
  PlaceAutocompletePredictionMatchedSubstring: { // field return type
    length: number; // Int!
    offset: number; // Int!
  }
  PlaceAutocompletePredictionStructuredFormatting: { // field return type
    main_text: string; // String!
    main_text_matched_substrings: NexusGenRootTypes['PlaceAutocompletePredictionMatchedSubstring'][]; // [PlaceAutocompletePredictionMatchedSubstring!]!
    secondary_text: string; // String!
  }
  PlaceAutocompletePredictionTerm: { // field return type
    offset: number; // Int!
    value: string; // String!
  }
  Prefecture: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
    region: NexusGenRootTypes['Region']; // Region!
  }
  Query: { // field return type
    hospital: NexusGenRootTypes['Hospital']; // Hospital!
    hospitals: NexusGenRootTypes['Hospital'][]; // [Hospital!]!
    placeAutocomplete: NexusGenRootTypes['PlaceAutocomplete']; // PlaceAutocomplete!
    prefectures: NexusGenRootTypes['Prefecture'][]; // [Prefecture!]!
    publicHospitalConnection: NexusGenRootTypes['HospitalConnection'] | null; // HospitalConnection
  }
  Region: { // field return type
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  CreateSessionType: { // field return type name
    token: 'String'
  }
  Hospital: { // field return type name
    hospitalAddress: 'HospitalAddress'
    hospitalBusinessForm: 'HospitalBusinessForm'
    hospitalCertificationOption: 'HospitalCertificationOption'
    hospitalNightServiceOption: 'HospitalNightServiceOption'
    hospitalNightUrgentActionOption: 'HospitalNightUrgentActionOption'
    hospitalReservationStatus: 'HospitalReservationStatus'
    id: 'BigInt'
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
  Mutation: { // field return type name
    createSession: 'CreateSessionType'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  PlaceAutocomplete: { // field return type name
    error_message: 'String'
    info_messages: 'String'
    predictions: 'PlaceAutocompletePrediction'
    status: 'PlaceAutocompleteStatus'
  }
  PlaceAutocompletePrediction: { // field return type name
    description: 'String'
    matched_substrings: 'PlaceAutocompletePredictionMatchedSubstring'
    place_id: 'String'
    reference: 'String'
    structured_formatting: 'PlaceAutocompletePredictionStructuredFormatting'
    terms: 'PlaceAutocompletePredictionTerm'
    types: 'String'
  }
  PlaceAutocompletePredictionMatchedSubstring: { // field return type name
    length: 'Int'
    offset: 'Int'
  }
  PlaceAutocompletePredictionStructuredFormatting: { // field return type name
    main_text: 'String'
    main_text_matched_substrings: 'PlaceAutocompletePredictionMatchedSubstring'
    secondary_text: 'String'
  }
  PlaceAutocompletePredictionTerm: { // field return type name
    offset: 'Int'
    value: 'String'
  }
  Prefecture: { // field return type name
    id: 'BigInt'
    name: 'String'
    region: 'Region'
  }
  Query: { // field return type name
    hospital: 'Hospital'
    hospitals: 'Hospital'
    placeAutocomplete: 'PlaceAutocomplete'
    prefectures: 'Prefecture'
    publicHospitalConnection: 'HospitalConnection'
  }
  Region: { // field return type name
    id: 'BigInt'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createSession: { // args
      email: string; // String!
      password: string; // String!
    }
  }
  Query: {
    hospital: { // args
      id: NexusGenScalars['BigInt']; // BigInt!
    }
    placeAutocomplete: { // args
      searchText: string; // String!
    }
    publicHospitalConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      currentLocation?: NexusGenInputs['currentLocation'] | null; // currentLocation
      first?: number | null; // Int
      insuranceEnabled: boolean; // Boolean!
      jsavaOption: boolean; // Boolean!
      last?: number | null; // Int
      nichijuOption: boolean; // Boolean!
      nightServiceOption: boolean; // Boolean!
      reservable: boolean; // Boolean!
      searchText: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

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