import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyCron from 'fastify-cron';
import MercuriusGQLUpload from 'mercurius-upload';
import 'json-bigint-patch';
import { router } from './routes';
import { jobs } from './services/jobs';
import { initSentry } from './services/sentry';

initSentry();

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(helmet, {
  contentSecurityPolicy: false,
});
app.register(cors);
app.register(fastifyCron, {
  jobs,
});
app.register(MercuriusGQLUpload, {});

app.register(router);

export { app };
