import { join } from 'path';
import { FastifyPluginCallback } from 'fastify';
import mercurius from 'mercurius';
import { makeSchema } from 'nexus';
import * as types from './types';
import * as queryTypes from './queries';
import * as mutationTypes from './mutations';
import { context } from './context';

const schema = makeSchema({
  types: [types, queryTypes, mutationTypes],
  outputs: {
    typegen: join(__dirname, '__generated__', 'types.d.ts'),
    schema: join(
      __dirname,
      '../../../../graphql/internalApi',
      'schema.graphql'
    ),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
});

const internalApi: FastifyPluginCallback = async (app, _options) => {
  app.register(mercurius, {
    routes: true,
    schema,
    graphiql: true,
    context,
  });
};

export { internalApi };
