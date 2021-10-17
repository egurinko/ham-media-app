import type { MessageEvent } from '@line/bot-sdk';
import { client } from '../client';
import { getTextEventReplyMessage } from './messages';

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
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '大変申し訳ありません。入力内容を処理できませんでした。\n\nメニューから「受付病院検索」や「里親募集中一覧」、「お問い合わせ」をタップしてください！',
      });
  }
};
