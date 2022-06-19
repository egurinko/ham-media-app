import { CronJob } from 'cron';
import { client } from '@/services/prisma';
import { discordApi } from '@/services/api';

export const stockExpirationAlertJob = new CronJob(
  '0 0 * * 1', // 日本時間毎週月曜9時（heroku設定UTC）,
  // '25 17 * * *', // ローカル設定(JST),
  async () => {
    console.log('在庫期限アラートを開始します。');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const alertDate = new Date();
    alertDate.setDate(today.getDate() + 7);
    alertDate.setUTCHours(23, 59, 59, 999);
    const monthAlertDate = new Date();
    monthAlertDate.setMonth(today.getMonth() + 3);
    monthAlertDate.setUTCHours(23, 59, 59, 999);

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
    discordApi.postStockExpiringInWeekAlert(expiringStocks);

    // 3 ヶ月以内に期限が切れる在庫
    const expiringStocksInMonthTerm = await client.stock.findMany({
      where: { expired_at: { gte: alertDate, lte: monthAlertDate } },
      include: { product: true },
    });
    console.log({ expiringStocksInMonthTerm });
    discordApi.postStockExpiringInMonthAlert(expiringStocksInMonthTerm);

    console.log('在庫期限アラートが終了です。');
  }
);
