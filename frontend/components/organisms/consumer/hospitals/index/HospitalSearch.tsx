import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import { Card } from '@/components/atoms/Card';
import { CurrentLocationSearch } from './hospitalSearch/CurrentLocationSearch';
import { TextSearch } from './hospitalSearch/TextSearch';
import type { FC } from 'react';

const HospitalSearch: FC<NoProps> = () => (
  <>
    <Card>
      <TextSearch />

      <Box mt="4">
        <CurrentLocationSearch />
      </Box>
    </Card>
  </>
);

const Memoed = memo(HospitalSearch);

export { Memoed as HospitalSearch };
