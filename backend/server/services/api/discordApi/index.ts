import axios from 'axios';
import type { Product, Stock } from '@prisma/client';

const DISCORD_STOCK_WEBHOOK_URL = process.env['DISCORD_STOCK_WEBHOOK_URL'];

const instance = axios.create({});

type PostStockAlertVariables = (Stock & {
  product: Product;
})[];

const postStockExpirationAlert = (variables: PostStockAlertVariables): void => {
  const lines = variables
    .map(
      (v) =>
        `\r${v.product.name}の在庫id:${v.id} =>  https://ham-media-app.net/admin/products/${v.product_id}`
    )
    .join();
  postStockAlert(
    `===== 以下の在庫の期限が切れているよ <:shock:844862291215122432> ===== ${lines}\r`
  );
};

const postStockExpiringAlert = (variables: PostStockAlertVariables): void => {
  const lines = variables
    .map(
      (v) =>
        `\r${v.product.name}の在庫id:${v.id} =>  https://ham-media-app.net/admin/products/${v.product_id}`
    )
    .join();

  postStockAlert(
    `===== 今週はこの在庫の期限が切れちゃうよ <:doyouebest:844132000788643860> ===== ${lines}\r`
  );
};

const postStockAlert = (content: string): void => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;

  instance.post(DISCORD_STOCK_WEBHOOK_URL, {
    username: '在庫管理大臣',
    avatar_url:
      'https://user-images.githubusercontent.com/23233648/155275175-7c3d9f01-8030-4ab4-b6d3-29bde6545a2b.jpeg',
    content,
  });
};

export { postStockExpirationAlert, postStockExpiringAlert };
