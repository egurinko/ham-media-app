import type { TextMessage, FlexMessage } from '@line/bot-sdk';
import { wordPressApi } from '@/services/api';
import {
  createNoOfferingHamstersReplyMessage,
  createWordpressErrorReplyMessage,
  createOfferingHamstersReplyMessage,
} from '@/services/line/views';

export const getListOfferingHamstersReplyMessage = async (): Promise<
  TextMessage | FlexMessage
> => {
  try {
    const response = await wordPressApi.getOfferingHamsters();
    if (response.data.length === 0) {
      return createNoOfferingHamstersReplyMessage;
    } else {
      const sliced = response.data.slice(0, 10);
      return createOfferingHamstersReplyMessage(sliced);
    }
  } catch (_e) {
    return createWordpressErrorReplyMessage;
  }
};
