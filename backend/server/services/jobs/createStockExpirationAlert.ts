import cron from 'node-cron';
import { client } from '@/services/prisma';
import { discordApi } from '@/services/api';

export const createStockExpirationAlert = cron.schedule(
  '0 0 * * 1', // heroku設定(UTC),
  // '25 17 * * *', // ローカル設定(JST),
  async () => {
    console.log('在庫期限アラートを開始します。');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const weekAlertDate = new Date();
    weekAlertDate.setDate(today.getDate() + 7);
    weekAlertDate.setUTCHours(23, 59, 59, 999);

    // すでに期限切れの在庫
    const expiredStocks = await client.stock.findMany({
      where: { expired_at: { lt: today } },
      include: { product: true, internalUser: true },
    });
    await discordApi.postStockExpirationAlert(expiredStocks);

    // 一週間以内に期限が切れる在庫
    const expiringStocks = await client.stock.findMany({
      where: { expired_at: { gte: today, lte: weekAlertDate } },
      include: { product: true, internalUser: true },
    });
    await discordApi.postStockExpiringInWeekAlert(expiringStocks);

    // ３ヶ月以内に期限が切れる在庫
    const monthAlertDate = new Date();
    monthAlertDate.setMonth(today.getMonth() + 3);
    monthAlertDate.setUTCHours(23, 59, 59, 999);

    const expiringStocksInMonthTerm = await client.stock.findMany({
      where: { expired_at: { gte: weekAlertDate, lte: monthAlertDate } },
      include: { product: true, internalUser: true },
    });
    await discordApi.postStockExpiringInMonthAlert(expiringStocksInMonthTerm);

    console.log('在庫期限アラートが終了です。');
  },
);
