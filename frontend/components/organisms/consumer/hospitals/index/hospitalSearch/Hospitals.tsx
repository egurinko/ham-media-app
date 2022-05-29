import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import type { PublicGetHospitalConnectionQuery } from '@/api/public_api/types';
import { Card } from '@/components/atoms/Card';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { HospitalTags } from '@/components/organisms/consumer/hospitals/HospitalTags';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import type { GetContinuousHospitalConnection } from '../types';

type Props = {
  hospitalConnection?: PublicGetHospitalConnectionQuery['publicHospitalConnection'];
  loading: boolean;
  getContinuousHospitalConnection: GetContinuousHospitalConnection;
};

const Hospitals: React.FC<Props> = ({
  hospitalConnection,
  loading,
  getContinuousHospitalConnection,
}) => {
  const router = useRouter();

  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  useEffect(() => {
    if (isIntersect) {
      getContinuousHospitalConnection();
    }
  }, [isIntersect, getContinuousHospitalConnection]);

  return (
    <>
      {hospitalConnection?.edges?.length === 0 ? (
        <Box my={16} textAlign="center">
          <InfoOutlineIcon color="primary.main" fontSize="4xl" />
          <Text mt={4} fontSize="lg" color="primary.main" fontWeight="bold">
            条件に一致する病院はありませんでした。
          </Text>
          <Text mt={4} fontSize="md">
            検索条件を変更してください。
          </Text>
        </Box>
      ) : (
        hospitalConnection?.edges?.map((edge, edgeIndex) => {
          if (!edge?.node) return null;
          const { node: hospital } = edge;
          return (
            <Box key={edgeIndex} my={2}>
              <SummaryLink url={HOSPITALS_DETAIL_PATH(hospital.id)}>
                <Card
                  _hover={{
                    opacity: 0.7,
                    cursor: 'pointer',
                  }}
                >
                  <Box display="flex" flexDirection="column">
                    <Box mb="1">
                      <Text fontSize="xl">{hospital.name}</Text>
                    </Box>
                    <Box fill="primary.main" mb="2">
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <MapPinIcon width={15} height={15} />
                        <Text fontSize="sm" color="text.secondary" ml="1">
                          {hospital.hospitalAddress?.prefecture.name}
                          {hospital.hospitalAddress?.address}
                        </Text>
                      </Box>
                    </Box>
                    <Box mb="2">
                      <HospitalTags hospital={hospital} spacing={2} />
                    </Box>
                    <Box
                      bgColor="background.main"
                      p="2"
                      display="flex"
                      flexDirection="column"
                      whiteSpace="pre-line"
                      borderRadius="5"
                      mb="2"
                    >
                      <Box>
                        <Text fontSize="lg" borderBottom="1px" as="span">
                          診療時間
                        </Text>
                      </Box>
                      {hospital.hospitalBusinessForm?.business_hour}
                    </Box>
                    <Box
                      fill="primary.main"
                      color="primary.main"
                      bgColor="primary.light"
                      p="4"
                      borderRadius="5"
                      textAlign="center"
                    >
                      <a href={`tel:${hospital.hospitalAddress?.phone_number}`}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <PhoneIcon width={20} height={20} />
                          <Text fontSize="md" ml="2">
                            {hospital.hospitalAddress?.phone_number}
                          </Text>
                        </Box>
                      </a>
                    </Box>
                  </Box>
                </Card>
              </SummaryLink>
            </Box>
          );
        })
      )}
      {loading
        ? Array(5)
            .fill('')
            .map((_, index) => (
              <Box my="2" key={index}>
                <Card>
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Card>
              </Box>
            ))
        : null}
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
    </>
  );
};

export { Hospitals };
