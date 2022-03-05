import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/node';
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
    // console.log('CODE: ', e.code);
    // console.log('MESSAGE: ', e.message);
    // console.log('META: ', e.meta);
    // console.log('NAME: ', e.name);
    // console.log('STACK: ', e.stack);
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
      if (hasFieldName(e.meta)) {
        const { key, jaKey } = mapFieldName(e.meta.field_name);
        return {
          key,
          message: errorMessage.foreignKey(jaKey),
          statusCode: STATUS_CODES.BAD_REQUEST,
        };
      }
    }
  }

  Sentry.captureException(e);
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
  } else if (target.includes('internal_users')) {
    if (target.includes('name')) {
      return { key: 'name', jaKey: MODELS.INTERNAL_USER.NAME };
    } else if (target.includes('email')) {
      return { key: 'email', jaKey: MODELS.INTERNAL_USER.EMAIL };
    } else if (target.includes('password_digest')) {
      return {
        key: 'password_digest',
        jaKey: MODELS.INTERNAL_USER.PASSWORD_DIGEST,
      };
    }
  } else if (target.includes('makers')) {
    if (target.includes('name')) {
      return { key: 'name', jaKey: MODELS.MAKER.NAME };
    }
  } else if (target.includes('product_tags')) {
    if (target.includes('name')) {
      return { key: 'name', jaKey: MODELS.PRODUCT_TAGS.NAME };
    }
  } else if (target.includes('product_tag_groups')) {
    if (target.includes('name')) {
      return { key: 'name', jaKey: MODELS.PRODUCT_TAG_GROUPS.NAME };
    }
  }

  Sentry.captureException(target);
  return { key: target, jaKey: '不明なキー' };
};

const hasFieldName = (
  meta: Prisma.PrismaClientKnownRequestError['meta']
): meta is { field_name: string } =>
  !!meta &&
  !!(meta as any).field_name &&
  typeof (meta as any).field_name === 'string';

const mapFieldName = (fieldName: string) => {
  if (fieldName.includes('internal_user_id')) {
    return { key: 'internal_user_id', jaKey: MODELS.INTERNAL_USER.TABLE_NAME };
  } else if (fieldName.includes('maker_id')) {
    return { key: 'maker_id', jaKey: MODELS.MAKER.TABLE_NAME };
  } else if (fieldName.includes('product_tag_id')) {
    return { key: 'product_tag_id', jaKey: MODELS.PRODUCT_TAGS.TABLE_NAME };
  } else if (fieldName.includes('stock_id')) {
    return { key: 'stock_id', jaKey: MODELS.STOCK.TABLE_NAME };
  }

  Sentry.captureException(fieldName);
  return { key: fieldName, jaKey: '不明なキー' };
};
