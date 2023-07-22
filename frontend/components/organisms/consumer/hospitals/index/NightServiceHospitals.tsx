import { MoonIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo, useMemo, useCallback } from 'react';
import { Card } from '@/components/atoms/Card';
import type { PublicGetHospitalConnectionQuery } from '@/services/api/public_api/types';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import { LOCAL_STORAGE_HOSPITAL_SEARCH_KEY } from '@/utils/constant';
import { useLocalStorage } from '@/utils/hooks';
import { goHospitalsResult } from '@/utils/routes';
import { HospitalMiniBox } from './HospitalMiniBox';
import type { PERSISTED } from '../types';
import type { FC } from 'react';

type Props = {
  nightServiceHospitalConnection: PublicGetHospitalConnectionQuery['publicHospitalConnection'];
};

const NightServiceHospitals: FC<Props> = ({
  nightServiceHospitalConnection,
}) => {
  const edges = useMemo(
    () => nightServiceHospitalConnection?.edges,
    [nightServiceHospitalConnection],
  );

  const router = useRouter();
  const { setLocalStorage } = useLocalStorage<PERSISTED>(
    LOCAL_STORAGE_HOSPITAL_SEARCH_KEY,
  );
  const copyLocal = useCallback(async () => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      recommended: true,
    });
    setLocalStorage({
      searchText: '',
      currentLocation: null,
      reservable: false,
      nightServiceOption: true,
      insuranceEnabled: false,
      jsavaOption: false,
      nichijuOption: false,
      recommended: false,
    });
  }, [setLocalStorage]);

  const handleReadMore = useCallback(() => {
    copyLocal();
    goHospitalsResult(router);
  }, [copyLocal, router]);

  return edges ? (
    <Card>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Heading as="h4" size="sm">
          <MoonIcon mb="1" mr="1" fontSize="md" color="blue.700" />
          夜間営業病院
        </Heading>
        <Text
          onClick={handleReadMore}
          fontSize="xs"
          sx={{ _hover: { cursor: 'pointer' } }}
        >
          詳しくみる <ChevronRightIcon mb="1" />
        </Text>
      </Box>

      <Box mt="3" display="flex" overflowX="scroll">
        {edges
          .filter((edge) => !!edge?.node)
          .map((edge) => {
            if (!edge?.node) return null;
            const hospital = edge.node;
            return (
              <HospitalMiniBox hospital={hospital} key={Number(hospital.id)} />
            );
          })}
      </Box>
    </Card>
  ) : null;
};

const Memoed = memo(NightServiceHospitals);

export { Memoed as NightServiceHospitals };
