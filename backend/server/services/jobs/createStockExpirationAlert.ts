import { Params } from 'fastify-cron';
import { client } from '@/services/prisma';
import { discordApi } from '@/services/api';

export const createStockExpirationAlert: Params = {
  cronTime: '0 17 * * *', // 毎日 17 時
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
      select: { product_id: true, id: true },
    });
    discordApi.postStockExpirationAlert(
      expiredStocks.map((s) => ({ productId: s.product_id, stockId: s.id }))
    );

    // 一週間以内に期限が切れる在庫
    const expiringStocks = await client.stock.findMany({
      where: { expired_at: { gte: today, lte: alertDate } },
    });
    discordApi.postStockExpiringAlert(
      expiringStocks.map((s) => ({ productId: s.product_id, stockId: s.id }))
    );

    console.log('在庫期限アラートが終了です。');
  },
};
