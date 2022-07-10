import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import MercuriusGQLUpload from 'mercurius-upload';
import 'json-bigint-patch';
import { router } from './routes';
import { initSentry } from './services/sentry';
import { isProduction } from '@/services/environments';

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
// TODO: set cors after infrastructure change
app.register(cors, {
  origin: isProduction
    ? ['https://ham-media-app.net', 'https://ham-media-stg-app.link']
    : ['http://localhost:8080'],
  methods: ['POST', 'OPTIONS'],
});
app.register(MercuriusGQLUpload, {});

app.register(router);

export { app };
