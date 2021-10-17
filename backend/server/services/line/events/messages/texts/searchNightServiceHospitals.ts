import type { TextMessage } from '@line/bot-sdk';
import { client } from '@/services/prisma';

export const getSearchNightServiceHospitalsReplyMessage =
  async (): Promise<TextMessage> => {
    const regions = await client.region.findMany();
    return {
      type: 'text',
      text: '地域を選択してください。',
      quickReply: {
        items: regions.map((region) => ({
          type: 'action',
          action: {
            type: 'message',
            label: region.name,
            text: `${region.name}の夜間病院を検索`,
          },
        })),
      },
    };
  };
