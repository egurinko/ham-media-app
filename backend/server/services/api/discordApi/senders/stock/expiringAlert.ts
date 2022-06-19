import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';

export const postStockExpiringAlert = (
  variables: PostStockAlertVariables
): void => {
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
