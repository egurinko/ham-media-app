import fastify from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import fastifyCron from 'fastify-cron';
import 'json-bigint-patch';
import { router } from './routes';
import { jobs } from './services/jobs';

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

app.register(router);

export { app };
