import { type FC } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { flex } from '@/styled/patterns';
import { SearchForm } from './SearchForm';
import { getSearchMaster } from './index.api';

export const ProductSearchSection: FC<NoProps> = async () => {
  const { makers, internalUsers, productTags } = await getSearchMaster();

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
      <SearchForm
        makers={makers}
        internalUsers={internalUsers}
        productTags={productTags}
      />
    </Card>
  );
};
