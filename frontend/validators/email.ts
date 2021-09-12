export const rules = {
  required: 'メールアドレスを入力してください',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: '有効なメールアドレスを入力してください',
  },
};
