export const MODELS = {
  PRODUCT: {
    TABLE_NAME: '商品',
    NAME: '商品名',
    REMARK: '備考',
    URL: 'URL',
  },
  INTERNAL_USER: {
    TABLE_NAME: 'ユーザ',
    NAME: 'ユーザ名',
    EMAIL: 'メールアドレス',
    PASSWORD_DIGEST: 'パスワード',
  },
  MAKER: {
    TABLE_NAME: 'メーカー',
    NAME: 'メーカー名',
  },
} as const;
