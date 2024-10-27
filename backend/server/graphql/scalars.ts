import { scalarType } from 'nexus';
import { GraphQLUpload } from 'graphql-upload-minimal';
import {
  BigIntResolver,
  DateTimeResolver,
  JSONObjectResolver,
} from 'graphql-scalars';

export const BigInt = scalarType({
  ...BigIntResolver,
  asNexusMethod: 'bigInt',
  description: `The \`BigInt\` scalar type represents non-fractional signed whole numeric values.
@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt`,
});
export const DateTime = scalarType({
  ...DateTimeResolver,
  asNexusMethod: 'dateTime',
});

export const Upload = scalarType({
  name: GraphQLUpload.name,
  asNexusMethod: 'upload', // We set this to be used as a method later as `t.upload()` if needed
  description: GraphQLUpload.description,
  serialize: GraphQLUpload.serialize,
  parseValue: GraphQLUpload.parseValue,
  parseLiteral: GraphQLUpload.parseLiteral,
});

export const Json = scalarType({
  ...JSONObjectResolver,
  asNexusMethod: 'json',
});
