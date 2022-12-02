import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import MercuriusGQLUpload from 'mercurius-upload';
import fastifyHealthcheck from 'fastify-healthcheck';
import 'json-bigint-patch';
import { router } from './routes';
import { initSentry } from './services/sentry';
// import { isProduction } from '@/services/environments';

initSentry();

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { destination: 1 },
    },
  },
});

app.register(fastifyHealthcheck);
app.register(helmet, {
  contentSecurityPolicy: false,
});

app.register(cors, {
  origin: '*',
//  origin: isProduction
//    ? [
//        'https://www.ham-media-app.net',
//        'https://ham-media-app.net',
//        /\.vercel\.app$/,
//      ]
//    : ['http://localhost:8080'],
  methods: ['POST', 'OPTIONS'],
});
app.register(MercuriusGQLUpload, {});

app.register(router);

export { app };
