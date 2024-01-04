import { Card } from '@/app/components/atoms/Card';
import { css } from '@/styled/css';
import { LocationSearch } from './location-search';
import { TextSearch } from './text-search';
import type { FC } from 'react';

export const SearchSection: FC<NoProps> = () => (
  <Card
    className={css({
      width: '100%',
      p: 'lg',
    })}
  >
    <TextSearch />
    <div
      className={css({
        mt: 4,
      })}
    >
      <LocationSearch />
    </div>
  </Card>
);
