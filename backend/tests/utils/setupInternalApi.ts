import fastify from 'fastify';
import mercurius from 'mercurius';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { context, schema } from '@/graphql/internalApi/index';
import { sign } from '@/services/authentication';

export const setup = async () => {
  const app = await fastify();
  await app.register(mercurius, {
    routes: true,
    schema,
    graphiql: true,
    context,
    prefix: 'internal_api',
  });

  const TEST_INTERNAL_USER_EMAIL = 'test@example.com';
  const token = sign({ email: TEST_INTERNAL_USER_EMAIL });
  return createMercuriusTestClient(app, {
    url: '/internal_api/graphql',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
