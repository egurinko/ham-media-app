'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Head } from '@/components/molecules/Head';
import { DetailCard } from '@/components/organisms/consumer/hospitals/detail/DetailCard';
import type { PublicGetHospitalQuery } from '@/services/api/public_api/types';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { HOSPITALS_DETAIL_PATH, goAppHospitalsResult } from '@/utils/routes';

interface Props {
  hospital: PublicGetHospitalQuery['hospital'];
}

export default function Show({ hospital }: Props) {
  const router = useRouter();

  return (
    <>
      <Head
        title={`${hospital.name} - ${SERVICE_NAME}：ハムスター受付病院検索`}
        description={`【${SERVICE_NAME}公式病院検索】${hospital.name}（${hospital.hospitalAddress?.prefecture.name}${hospital.hospitalAddress?.address}）の診療時間や予約情報などを確認できます。${SERVICE_NAME}が厳選したハムスター受付病院になります。`}
        ogpUrl={`${ORIGIN_URL}${HOSPITALS_DETAIL_PATH(hospital.id)}`}
        keywords={`${hospital.name},${hospital.hospitalAddress?.prefecture.name},ハムスター受付病院,動物病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
      />
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
