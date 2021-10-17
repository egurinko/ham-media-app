import { handleMessageEvent } from './events';
import type { WebhookEvent } from '@line/bot-sdk';

const EVENT_TYPES = {
  MESSAGE: 'message',
  UNSEND: 'unsend',
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  JOIN: 'join',
  LEAVE: 'leave',
  MEMBER_JOINED: 'memberJoined',
  MEMBER_LEFT: 'memberLeft',
  POST_BACK: 'postback',
  VIDEO_PLAY_COMPLETE: 'videoPlayComplete',
  BEACON: 'beacon',
  ACCOUNT_LINK: 'accountLink',
  THINGS: 'things',
} as const;

export const handleEvent = (event: WebhookEvent) => {
  console.log({ event });
  switch (event.type) {
    case EVENT_TYPES.MESSAGE:
      return handleMessageEvent(event);
    default:
      return Promise.resolve(null);
  }
};
