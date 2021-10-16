import { FastifyPluginCallback } from 'fastify';
import { controller } from '@/controllers';
import type { WebhookRequestBody } from '@line/bot-sdk';

const webhook: FastifyPluginCallback = async (app, _options) => {
  app.post<{ Body: WebhookRequestBody }>('/', controller.webhook.post);
};

export { webhook };
