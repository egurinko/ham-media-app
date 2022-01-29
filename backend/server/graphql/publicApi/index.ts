import { join } from 'path';
import { FastifyPluginCallback } from 'fastify';
import mercurius from 'mercurius';
import { makeSchema, connectionPlugin } from 'nexus';
import * as scalars from '../scalars';
import * as queryTypes from './queries';
import * as mutationTypes from './mutations';
import * as types from './types';
import { context } from './context';

const schema = makeSchema({
  types: [scalars, types, queryTypes, mutationTypes],
  outputs: {
    typegen: join(__dirname, '__generated__', 'public_api_types.d.ts'),
    schema: join(__dirname, '../../../../graphql/publicApi', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
  plugins: [connectionPlugin()],
});

const publicApi: FastifyPluginCallback = async (app, _options) => {
  app.register(mercurius, {
    routes: true,
    schema,
    graphiql: true,
    context,
  });
};

export { publicApi, schema, context };
