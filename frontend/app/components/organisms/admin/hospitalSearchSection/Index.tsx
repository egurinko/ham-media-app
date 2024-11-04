import { type FC } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { flex } from '@/styled/patterns';
import { SearchForm } from './SearchForm';
import { getPrefectures } from './index.api';

export const HopistalSearchSection: FC<NoProps> = async () => {
  const { data } = await getPrefectures();
  const prefectures = data.prefectures.map((prefecture) => ({
    value: String(prefecture.id),
    label: prefecture.name,
  }));
  return (
    <Card
      className={flex({
        p: {
          base: 'md',
          sm: 'lg',
        },
        width: '100%',
      })}
    >
      <SearchForm prefectures={prefectures} />
    </Card>
  );
};
