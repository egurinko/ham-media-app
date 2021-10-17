import type { MessageEvent } from '@line/bot-sdk';
import { client } from '../client';
import { getTextEventReplyMessage } from './messages';
import { createUnprocessableReplyMessage } from '@/services/line/views';

const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  LOCATION: 'location',
  FILE: 'file',
  STICKER: 'sticker',
} as const;

export const handleMessageEvent = async (event: MessageEvent) => {
  switch (event.message.type) {
    case MESSAGE_TYPES.TEXT: {
      const reply = await getTextEventReplyMessage(event.message);
      return client.replyMessage(event.replyToken, reply);
    }
    default:
      return client.replyMessage(
        event.replyToken,
        createUnprocessableReplyMessage
      );
  }
};
