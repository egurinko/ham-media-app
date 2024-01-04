'use client';

import { SearchIcon } from '@chakra-ui/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { IconButton } from '@/app/components/atoms/IconButton';
import { TextSearchInput } from '@/app/components/organisms/consumer/hospitals/TextSearchInput';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const TextSearch: FC<NoProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams?.get('searchText')?.toString() || '',
  );

  const reflectToURLParams = (): void => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (searchText) {
        searchParams?.forEach((_, key) => {
          if (key === 'latitude' || key === 'longitude') {
            params.delete(key);
          }
        });
        params.set('searchText', searchText);
      } else {
        params.delete('searchText');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSearchClick = () => {
    reflectToURLParams();
  };

  return (
    <Card className={css({ display: 'flex', width: '100%', p: 'lg' })}>
      <TextSearchInput searchText={searchText} setSearchText={setSearchText} />
      <IconButton
        onClick={handleSearchClick}
        disabled={searchText ? searchText.length === 0 : true}
        className={css({ width: 40 })}
      >
        <SearchIcon />
      </IconButton>
    </Card>
  );
};
