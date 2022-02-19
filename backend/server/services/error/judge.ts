import { Prisma } from '@prisma/client';
import { errorMessage } from './message';
import { MODELS } from '../constant';

type Result = {
  key?: string;
  message: string;
  statusCode: number;
};

const STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
} as const;

export const judgeError = (e: unknown): Result => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      // unique 制約エラー
      if (hasSingleTarget(e.meta)) {
        const { key, jaKey } = mapTarget(e.meta.target);
        return {
          key,
          message: errorMessage.unique(jaKey),
          statusCode: STATUS_CODES.BAD_REQUEST,
        };
      }
    } else if (e.code === 'P2003') {
      // 外部キーエラー
    }
  }

  return {
    message: errorMessage.internalServerError,
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
  };
};

const hasSingleTarget = (
  meta: Prisma.PrismaClientKnownRequestError['meta']
): meta is { target: string } =>
  !!meta && !!(meta as any).target && typeof (meta as any).target === 'string';

const mapTarget = (target: string) => {
  if (target.includes('products')) {
    if (target.includes('name')) {
      return { key: 'name', jaKey: MODELS.PRODUCT.NAME };
    } else if (target.includes('remark')) {
      return { key: 'remark', jaKey: MODELS.PRODUCT.REMARK };
    } else if (target.includes('url')) {
      return { key: 'url', jaKey: MODELS.PRODUCT.URL };
    }
  }

  return { key: target, jaKey: '不明なキー' };
};
