import { type FC } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { flex } from '@/styled/patterns';
import { SearchForm } from './SearchForm';
import { getStockRequestInternalUsers } from './index.api';

export const StockRequestSearchSection: FC<NoProps> = async () => {
  const internalUsers = await getStockRequestInternalUsers();

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
      <SearchForm internalUsers={internalUsers} />
    </Card>
  );
};
