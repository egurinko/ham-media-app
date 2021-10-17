import type { TextMessage } from '@line/bot-sdk';
import type { Region } from '@prisma/client';

export const createSearchNightServiceHospitalsReplyMessage = (
  regions: Region[]
): TextMessage => ({
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
});
