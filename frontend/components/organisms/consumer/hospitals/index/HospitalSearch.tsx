import { Box } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import { Card } from '@/components/atoms/Card';
import { LOCAL_STORAGE_HOSPITAL_SEARCH_KEY } from '@/utils/constant';
import { useLocalStorage } from '@/utils/hooks';
import { CurrentLocationSearch } from './hospitalSearch/CurrentLocationSearch';
import { TextSearch } from './hospitalSearch/TextSearch';
import type { PERSISTED } from '../types';
import type { FC } from 'react';

const HospitalSearch: FC<NoProps> = () => {
  const { setLocalStorage } = useLocalStorage<PERSISTED>(
    LOCAL_STORAGE_HOSPITAL_SEARCH_KEY,
  );

  useEffect(() => {
    setLocalStorage({
      searchText: '',
      currentLocation: null,
      reservable: false,
      nightServiceOption: false,
      insuranceEnabled: false,
      jsavaOption: false,
      nichijuOption: false,
      recommended: false,
    });
  }, [setLocalStorage]);

  return (
    <>
      <Card>
        <TextSearch />

        <Box mt="4">
          <CurrentLocationSearch />
        </Box>
      </Card>
    </>
  );
};

const Memoed = memo(HospitalSearch);

export { Memoed as HospitalSearch };
