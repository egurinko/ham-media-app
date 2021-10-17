import type { TextEventMessage, Message } from '@line/bot-sdk';
import { getListOfferingHamstersReplyMessage } from './texts';

const TEXT_TYPES = {
  LIST_FOSTERED_HAMSTERS: '里親募集一覧',
  SEARCH_HOSPITALS: '受付病院検索',
  SEARCH_NIGHT_HOSPITALS: '夜間営業病院を検索',
} as const;

export const getTextEventReplyMessage = async (
  message: TextEventMessage
): Promise<Message | Message[]> => {
  switch (message.text) {
    case TEXT_TYPES.LIST_FOSTERED_HAMSTERS: {
      return getListOfferingHamstersReplyMessage();
    }
    default:
      return {
        type: 'text',
        text: message.text,
      };
  }
};
