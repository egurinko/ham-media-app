import axios from 'axios';
import type {
  Product,
  Stock,
  StockRequest,
  StockRequestProductRegistration,
  InternalUser,
} from '@prisma/client';

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

const postStockRequestAlert = (
  stockRequest: StockRequest & {
    productRegistrations: (StockRequestProductRegistration & {
      product: Product;
    })[];
  },
  internalUser: InternalUser
): void => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;
  const lines = stockRequest.productRegistrations
    .map((productRegistration) => `\r・${productRegistration.product.name}`)
    .join();
  const content = `${internalUser.name}さんが在庫リクエストをしたよ <:yeah:913316943921033247> https://ham-media-app.net/admin/stock_requests/${stockRequest.id}/edit ${lines}`;
  postStockAlert(content);
};

const postStockRequestRejectionAlert = (
  stockRequest: StockRequest & {
    productRegistrations: (StockRequestProductRegistration & {
      product: Product;
    })[];
  },
  internalUser: InternalUser,
  message: string
) => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;
  const lines = stockRequest.productRegistrations
    .map((productRegistration) => `\r・${productRegistration.product.name}`)
    .join();
  const content = `${internalUser.name}さんの以下の在庫リクエストが棄却されたよ <:jii:913298500861698058> ${lines} \r[棄却メッセージ]\r${message}`;
  postStockAlert(content);
};

const postStockAlert = (content: string): void => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;

  instance.post(DISCORD_STOCK_WEBHOOK_URL, {
    username: '在庫管理大臣',
    avatar_url:
      'https://user-images.githubusercontent.com/23233648/155543196-5043b4d5-58c9-4552-8a33-43784596c06b.png',
    content,
  });
};

export {
  postStockExpirationAlert,
  postStockExpiringAlert,
  postStockRequestAlert,
  postStockRequestRejectionAlert,
};
