export const errorMessage = {
  unique: (key: string) => `${key}が重複しています`,
  foreignKey: (key: string) =>
    `${key}に紐づいているデータが存在するため削除できません`,
  internalServerError: 'システムエラーが発生しました',
};
