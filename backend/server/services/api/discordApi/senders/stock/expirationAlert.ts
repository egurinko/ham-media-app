import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';

export const postStockExpirationAlert = (
  variables: PostStockAlertVariables
): void => {
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
