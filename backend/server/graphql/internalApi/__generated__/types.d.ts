/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
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
  InternalUser: { // root type
    email: string; // String!
    id: NexusGenScalars['BigInt']; // BigInt!
    name: string; // String!
  }
  Mutation: {};
  Query: {};
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
  Query: { // field return type
    internalUser: NexusGenRootTypes['InternalUser']; // InternalUser!
    internalUsers: NexusGenRootTypes['InternalUser'][]; // [InternalUser!]!
    session: NexusGenRootTypes['Session']; // Session!
  }
  Session: { // field return type
    token: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
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
  Query: { // field return type name
    internalUser: 'InternalUser'
    internalUsers: 'InternalUser'
    session: 'Session'
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