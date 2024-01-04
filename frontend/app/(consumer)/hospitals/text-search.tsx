'use client';

import { SearchIcon } from '@chakra-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton } from '@/app/components/atoms/IconButton';
import { css } from '@/styled/css';
import { goAppHospitalsResult } from '@/utils/routes';
import { TextSearchInput } from './text-search-input';
import type { FC } from 'react';

export const TextSearch: FC<NoProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const text = searchParams?.get('searchText');

  const handleSearchClick = () => {
    goAppHospitalsResult(router, `searchText=${text}`);
  };

  return (
    <div className={css({ display: 'flex' })}>
      <TextSearchInput />
      <IconButton
        onClick={handleSearchClick}
        disabled={text ? text.length === 0 : true}
        className={css({ width: 40 })}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
