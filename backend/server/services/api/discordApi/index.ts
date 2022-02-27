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
        `\n${v.product.name}の在庫id:${v.id} =>  https://ham-media-app.net/admin/products/${v.product_id}`
    )
    .join();
  postStockAlert(
    `===== 以下の在庫の期限が切れているよ <:shock:844862291215122432> ===== ${lines}\n`
  );
};

const postStockExpiringAlert = (variables: PostStockAlertVariables): void => {
  const lines = variables
    .map(
      (v) =>
        `\n${v.product.name}の在庫id:${v.id} =>  https://ham-media-app.net/admin/products/${v.product_id}`
    )
    .join();

  postStockAlert(
    `===== 今週はこの在庫の期限が切れちゃうよ <:doyouebest:844132000788643860> ===== ${lines}\n`
  );
};

const postStockRequestAlert = (
  stockRequest: StockRequest & {
    internalUser: InternalUser;
    productRegistrations: (StockRequestProductRegistration & {
      product: Product;
    })[];
  }
): void => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;
  const lines = stockRequest.productRegistrations
    .map((productRegistration) => `\n・${productRegistration.product.name}`)
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんが在庫リクエストをしたよ <:yeah:913316943921033247> \n https://ham-media-app.net/admin/stock_requests/${stockRequest.id}/edit ${lines}`;
  postStockAlert(content);
};

const postStockRequestRejectionAlert = (
  stockRequest: StockRequest & {
    internalUser: InternalUser;
    productRegistrations: (StockRequestProductRegistration & {
      product: Product;
    })[];
  },
  rejectInternalUser: InternalUser,
  message: string
) => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;
  const lines = stockRequest.productRegistrations
    .map((productRegistration) => `\n・${productRegistration.product.name}`)
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんの在庫リクエストが <@${rejectInternalUser.discord_user_id}> さんに棄却されたよ <:jii:913298500861698058> ${lines} \n[棄却メッセージ]\n${message}`;
  postStockAlert(content);
};

const postStockRequestApprovalAlert = (
  stockRequest: StockRequest & {
    internalUser: InternalUser;
    productRegistrations: (StockRequestProductRegistration & {
      product: Product;
    })[];
  },
  approvingInternalUser: InternalUser,
  message: string
) => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;
  const lines = stockRequest.productRegistrations
    .map(
      (productRegistration) =>
        `\n・${productRegistration.product.name} https://ham-media-app.net/admin/products/${productRegistration.product.id}`
    )
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんの在庫リクエストが <@${approvingInternalUser.discord_user_id}> さんに承認されたよ <:ok:776668642976071730> \n <@${approvingInternalUser.discord_user_id}> さんは在庫の割り当てをやってね🙊 ${lines} \n[承認メッセージ]\n${message}\n`;
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
  postStockRequestApprovalAlert,
};
