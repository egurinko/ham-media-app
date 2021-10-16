import {
  RouteHandlerMethod,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
} from 'fastify';
import { lineClient } from '@/services/line';
import type { WebhookRequestBody, WebhookEvent } from '@line/bot-sdk';

const post: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  { Body: WebhookRequestBody }
> = (request, reply) => {
  Promise.all(request.body.events.map(handleEvent)).then((result) =>
    reply.send(result)
  );
};

const handleEvent = (event: WebhookEvent) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return lineClient.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text,
  });
};

export const webhook = {
  post,
};
