import { Params } from 'fastify-cron';
import { client } from '@/services/prisma';
import { discordApi } from '@/services/api';

export const createStockExpirationAlert: Params = {
  cronTime: '0 9 * * *', // heroku設定(UTC),
  // cronTime: '25 17 * * *', // ローカル設定(JST),
  onTick: async () => {
    console.log('在庫期限アラートを開始します。');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const alertDate = new Date();
    alertDate.setDate(today.getDate() + 7);
    alertDate.setUTCHours(23, 59, 59, 999);

    // すでに期限切れの在庫
    const expiredStocks = await client.stock.findMany({
      where: { expired_at: { lt: today } },
      include: { product: true },
    });
    discordApi.postStockExpirationAlert(expiredStocks);

    // 一週間以内に期限が切れる在庫
    const expiringStocks = await client.stock.findMany({
      where: { expired_at: { gte: today, lte: alertDate } },
      include: { product: true },
    });
    discordApi.postStockExpiringAlert(expiringStocks);

    console.log('在庫期限アラートが終了です。');
  },
};
