'use server';

import {
  returnStock,
  allocateStock,
  updateStockInternalUser,
  deleteStock,
} from './stockTableRow.api';

export async function allocateStockAction(id: number, internalUserId: number) {
  try {
    await allocateStock({
      id,
      internalUserId,
    });
    return {
      message: `在庫id:${id}を割り当てました。`,
    };
  } catch {
    return {
      message: `在庫id:${id}の割り当てに失敗しました。`,
    };
  }
}

export async function returnStockAction(id: number) {
  try {
    await returnStock({
      id,
    });
    return {
      message: `在庫id:${id}を返却しました。`,
    };
  } catch {
    return {
      message: `在庫id:${id}の返却に失敗しました。`,
    };
  }
}

export async function updateStockInternalUserAction(
  id: number,
  internalUserId: number,
) {
  try {
    await updateStockInternalUser({
      id,
      internalUserId,
    });
    return {
      message: `在庫id:${id}の責任者を変更しました。`,
    };
  } catch {
    return {
      message: `在庫id:${id}の責任者を変更できませんでした。`,
    };
  }
}

export async function deleteStockAction(id: number) {
  try {
    await deleteStock({
      id,
    });
    return {
      message: `在庫id:${id}を削除しました。`,
    };
  } catch {
    return {
      message: `在庫id:${id}は削除できませんでした。`,
    };
  }
}
