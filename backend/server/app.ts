import fastify from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import 'json-bigint-patch';
import { router } from './routes';

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(helmet, {
  contentSecurityPolicy: false,
});
app.register(cors);
app.register(router);

export { app };
