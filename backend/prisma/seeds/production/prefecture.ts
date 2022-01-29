import { client } from '../../../server/services/prisma';

export const seedPrefecture = async () => {
  const prefectures = [
    { name: '北海道', regionName: '北海道' },
    { name: '青森県', regionName: '東北' },
    { name: '岩手県', regionName: '東北' },
    { name: '宮城県', regionName: '東北' },
    { name: '秋田県', regionName: '東北' },
    { name: '山形県', regionName: '東北' },
    { name: '福島県', regionName: '東北' },
    { name: '茨城県', regionName: '関東' },
    { name: '栃木県', regionName: '関東' },
    { name: '群馬県', regionName: '関東' },
    { name: '埼玉県', regionName: '関東' },
    { name: '千葉県', regionName: '関東' },
    { name: '東京都', regionName: '関東' },
    { name: '神奈川県', regionName: '関東' },
    { name: '新潟県', regionName: '中部' },
    { name: '富山県', regionName: '中部' },
    { name: '石川県', regionName: '中部' },
    { name: '福井県', regionName: '中部' },
    { name: '山梨県', regionName: '中部' },
    { name: '長野県', regionName: '中部' },
    { name: '岐阜県', regionName: '中部' },
    { name: '静岡県', regionName: '中部' },
    { name: '愛知県', regionName: '中部' },
    { name: '三重県', regionName: '近畿' },
    { name: '滋賀県', regionName: '近畿' },
    { name: '京都府', regionName: '近畿' },
    { name: '大阪府', regionName: '近畿' },
    { name: '兵庫県', regionName: '近畿' },
    { name: '奈良県', regionName: '近畿' },
    { name: '和歌山県', regionName: '近畿' },
    { name: '鳥取県', regionName: '中国' },
    { name: '島根県', regionName: '中国' },
    { name: '岡山県', regionName: '中国' },
    { name: '広島県', regionName: '中国' },
    { name: '山口県', regionName: '中国' },
    { name: '徳島県', regionName: '四国' },
    { name: '香川県', regionName: '四国' },
    { name: '愛媛県', regionName: '四国' },
    { name: '高知県', regionName: '四国' },
    { name: '福岡県', regionName: '九州・沖縄' },
    { name: '佐賀県', regionName: '九州・沖縄' },
    { name: '長崎県', regionName: '九州・沖縄' },
    { name: '熊本県', regionName: '九州・沖縄' },
    { name: '大分県', regionName: '九州・沖縄' },
    { name: '宮崎県', regionName: '九州・沖縄' },
    { name: '鹿児島県', regionName: '九州・沖縄' },
    { name: '沖縄県', regionName: '九州・沖縄' },
  ];

  const promises = prefectures.map((prefecture) =>
    client.prefecture.upsert({
      where: { name: prefecture.name },
      update: {},
      create: {
        name: prefecture.name,
        region: { connect: { name: prefecture.regionName } },
      },
    })
  );

  await Promise.all(promises);
};
