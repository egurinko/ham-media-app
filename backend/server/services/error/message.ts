export const errorMessage = {
  unique: (key: string) => `${key}が重複しています`,
  foreignKey: (key: string) =>
    `${key}に紐づいているデータが存在するため削除できません`,
  notFound: (key: string) => `お探しの${key}は見つかりません。`,
  internalServerError: 'システムエラーが発生しました',
};
