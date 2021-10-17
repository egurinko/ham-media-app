import type { TextEventMessage, Message } from '@line/bot-sdk';
import { client } from '@/services/prisma';
import {
  getListOfferingHamstersReplyMessage,
  SEARCH_HOSPITALS_REPLAY_MESSAGE,
  getSearchNightServiceHospitalsReplyMessage,
  getSearchNightServiceHospitalsRegionallyReplyMessage,
} from './texts';

const TEXT_TYPES = {
  LIST_FOSTERED_HAMSTERS: '里親募集一覧',
  SEARCH_HOSPITALS: '受付病院検索',
  SEARCH_NIGHT_HOSPITALS: '夜間営業病院を検索',
} as const;

export const getTextEventReplyMessage = async (
  message: TextEventMessage
): Promise<Message | Message[]> => {
  if (message.text === TEXT_TYPES.LIST_FOSTERED_HAMSTERS) {
    return getListOfferingHamstersReplyMessage();
  }
  if (message.text === TEXT_TYPES.SEARCH_HOSPITALS) {
    return SEARCH_HOSPITALS_REPLAY_MESSAGE;
  }
  if (message.text === TEXT_TYPES.SEARCH_NIGHT_HOSPITALS) {
    return getSearchNightServiceHospitalsReplyMessage();
  }

  if (await getIsNightRegionalHospitalText(message.text)) {
    return getSearchNightServiceHospitalsRegionallyReplyMessage(message.text);
  }

  return {
    type: 'text',
    text: message.text,
  };
};

const getIsNightRegionalHospitalText = async (
  text: string
): Promise<boolean> => {
  const regions = await client.region.findMany({ select: { name: true } });
  const regionsHospitalsRegex = new RegExp(
    regions.map((region) => region.name).join('|') + 'の夜間病院を検索$'
  );

  return regionsHospitalsRegex.test(text);
};
