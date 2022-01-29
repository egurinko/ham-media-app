import fastify from 'fastify';
import mercurius from 'mercurius';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { context, schema } from '@/graphql/publicApi/index';

export const setup = async () => {
  const app = await fastify();
  await app.register(mercurius, {
    routes: true,
    schema,
    graphiql: true,
    context,
    prefix: 'public_api',
  });

  return createMercuriusTestClient(app, {
    url: '/public_api/graphql',
  });
};
