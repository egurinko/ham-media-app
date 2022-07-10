import cron from 'node-cron';
import { client } from '@/services/prisma';

export const createGeoLocationJob = cron.schedule('0 */1 * * *', async () => {
  await client.hospitalAddress.findMany({
    where: {
      hospitalAddressGeoLocation: null,
    },
    include: {
      hospitalAddressGeoLocation: true,
      prefecture: true,
    },
  });

  // TODO: notify
});
