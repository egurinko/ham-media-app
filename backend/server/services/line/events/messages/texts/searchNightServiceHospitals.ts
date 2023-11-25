import type { TextMessage } from '@line/bot-sdk';
import { client } from '@/services/prisma';
import { createSearchNightServiceHospitalsReplyMessage } from '@/services/line/views';

export const getSearchNightServiceHospitalsReplyMessage =
  async (): Promise<TextMessage[]> => {
    const regions = await client.region.findMany();
    return [createSearchNightServiceHospitalsReplyMessage(regions)];
  };
