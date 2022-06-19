import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import MercuriusGQLUpload from 'mercurius-upload';
import 'json-bigint-patch';
import { router } from './routes';
import { initSentry } from './services/sentry';

initSentry();

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { destination: 1 },
    },
  },
});

app.register(helmet, {
  contentSecurityPolicy: false,
});
app.register(cors);
app.register(MercuriusGQLUpload, {});

app.register(router);

export { app };
