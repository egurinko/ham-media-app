import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';
import { sliceByNumber } from '@/services/functions';
import { PostStockAlertResponse } from '@/services/api/discordApi/senders/stock/types';

type Products = {
  [id: number]: {
    id: number;
    name: string;
    stocks: { id: number; internalUserName: string }[];
  };
};

const getStockAlertLinesByProduct = (
  stocks: PostStockAlertVariables,
): string[] => {
  const products = stocks.reduce((products, currentStock) => {
    const product = products[currentStock.product_id];
    if (product) {
      return {
        ...products,
        [product.id]: {
          ...product,
          stocks: [
            ...product.stocks,
            {
              id: currentStock.id,
              internalUserName: currentStock.internalUser.name,
            },
          ],
        },
      };
    }
    return {
      ...products,
      [currentStock.product_id]: {
        id: currentStock.product_id,
        name: currentStock.product.name,
        stocks: [
          {
            id: currentStock.id,
            internalUserName: currentStock.internalUser.name,
          },
        ],
      },
    };
  }, {} as Products);

  return Object.values(products).map(
    (product) =>
      `\n${product.name}の在庫id: ${product.stocks
        .map((stock) => `${stock.id}(${stock.internalUserName})`)
        .join(',')} =>  https://ham-media-app.net/admin/products/${product.id}`,
  );
};

const getStockAlertContents = (stocks: PostStockAlertVariables): string[] => {
  const stockAlertLines = getStockAlertLinesByProduct(stocks);

  // discord の文字制限に引っかからないようにメッセージを分割する
  return sliceByNumber<string>(stockAlertLines, 10).map((lines) =>
    lines.join(),
  );
};

export const postStockAlertContents = (
  stocks: PostStockAlertVariables,
): Promise<PostStockAlertResponse> => {
  const stockAlertContents = getStockAlertContents(stocks);
  return Promise.all(
    stockAlertContents.map((content) => postStockAlert(content)),
  );
};

export const postStockExpiringInWeekAlert = async (
  stocks: PostStockAlertVariables,
): Promise<PostStockAlertResponse> => {
  await postStockAlert(
    `===== 今週はこの在庫の期限が切れちゃうよ <:doyouebest:844132000788643860> =====`,
  );

  return postStockAlertContents(stocks);
};

export const postStockExpiringInMonthAlert = async (
  stocks: PostStockAlertVariables,
): Promise<PostStockAlertResponse> => {
  await postStockAlert(
    `===== 3ヶ月以内にこの在庫の期限が切れちゃうよ <:__:990474403185836062> =====`,
  );
  return postStockAlertContents(stocks);
};
