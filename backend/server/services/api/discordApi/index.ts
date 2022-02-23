import axios, { AxiosResponse } from 'axios';
import type { Product, Stock } from '@prisma/client';

const DISCORD_STOCK_WEBHOOK_URL =
  process.env['DISCORD_STOCK_WEBHOOK_URL'] || '';

const instance = axios.create({});

type PostStockAlertVariables = {
  productId: Product['id'];
  stockId: Stock['id'];
}[];

const postStockExpirationAlert = (
  variables: PostStockAlertVariables
): Promise<AxiosResponse> => {
  const lines = variables
    .map(
      (v) =>
        `\r在庫id:${v.stockId} =>  https://ham-media-app.net/admin/products/${v.productId}`
    )
    .join();
  return postStockAlert(
    `以下の在庫の期限が切れているよ <:shock:844862291215122432> ${lines}\r`
  );
};

const postStockExpiringAlert = (
  variables: PostStockAlertVariables
): Promise<AxiosResponse> => {
  const lines = variables
    .map(
      (v) =>
        `\r在庫id:${v.stockId} =>  https://ham-media-app.net/admin/products/${v.productId}`
    )
    .join();

  return postStockAlert(
    `以下の在庫が一週間で期限切れちゃうよ <:doyouebest:844132000788643860> ${lines}\r`
  );
};

const postStockAlert = (content: string): Promise<AxiosResponse> =>
  instance.post(DISCORD_STOCK_WEBHOOK_URL, {
    username: '在庫管理大臣',
    avatar_url:
      'https://user-images.githubusercontent.com/23233648/155275175-7c3d9f01-8030-4ab4-b6d3-29bde6545a2b.jpeg',
    content,
  });

export { postStockExpirationAlert, postStockExpiringAlert };
