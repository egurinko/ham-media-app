import {
  RouteHandlerMethod,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
} from 'fastify';
import { handleEvent } from '@/services/line';
import type { WebhookRequestBody } from '@line/bot-sdk';

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

export const webhook = {
  post,
};
