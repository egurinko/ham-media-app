import { scalarType } from 'nexus';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLScalarType } from 'graphql';
import { BigIntResolver, DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

// export { BigInt, DateTime } from 'nexus-prisma/scalars';
// 本当は直接 import したいが、module 形式の違いなのか import できない
// ref: https://github.com/prisma/nexus-prisma/issues/137
// よって、元の実装をそのままコピーして使用
// ref https://github.com/prisma/nexus-prisma/tree/main/src/scalars
export const BigInt = asNexusMethod(
  new GraphQLScalarType({
    ...BigIntResolver,
    description: `The \`BigInt\` scalar type represents non-fractional signed whole numeric values.
@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt`,
  }),
  'bigInt'
);
export const DateTime = asNexusMethod(
  new GraphQLScalarType(DateTimeResolver),
  'dateTime'
);

export const Upload = scalarType({
  name: GraphQLUpload.name,
  asNexusMethod: 'upload', // We set this to be used as a method later as `t.upload()` if needed
  description: GraphQLUpload.description,
  serialize: GraphQLUpload.serialize,
  parseValue: GraphQLUpload.parseValue,
  // @ts-ignore
  parseLiteral: GraphQLUpload.parseLiteral,
});
