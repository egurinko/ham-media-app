import type { FlexMessage } from '@line/bot-sdk';
import { createCarouselContent } from './index';
import type { RegionalHospitals } from '@/services/line/views';

export const createLocationReplyMessage = (
  hospitals: RegionalHospitals
): FlexMessage => ({
  type: 'flex',
  altText: '病院の検索結果',
  contents: {
    type: 'carousel',
    contents: hospitals.map((hospital) => createCarouselContent(hospital)),
  },
});
