'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DetailCard } from '@/components/organisms/consumer/hospitals/detail/DetailCard';
import type { PublicGetHospitalQuery } from '@/services/api/public_api/types';
import { goAppHospitalsResult } from '@/utils/routes';

interface Props {
  hospital: PublicGetHospitalQuery['hospital'];
}

export default function Show({ hospital }: Props) {
  const router = useRouter();

  return (
    <>
      <Box display="flex" mb="4" mt="2">
        <Button
          aria-label="link"
          variant="link"
          onClick={() => goAppHospitalsResult(router)}
          leftIcon={<ChevronRightIcon />}
        >
          <Heading size="sm">検索結果に戻る</Heading>
        </Button>
      </Box>
      <Box>
        <DetailCard hospital={hospital} />
      </Box>
    </>
  );
}
