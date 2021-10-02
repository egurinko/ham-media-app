import { useRouter } from 'next/router';
import { Box, Text, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import Card from '@/components/atoms/Card';
import MapPinIcon from '@/components/atoms/assets/MapPinIcon';
import PhoneIcon from '@/components/atoms/assets/PhoneIcon';
import HospitalTags from '../HospitalTags';
import { PublicGetHospitalConnectionQuery } from '@/api/public_api/types';
import { goHospitalDetail } from '@/utils/routes';

type Props = {
  hospitalConnection?: PublicGetHospitalConnectionQuery['publicHospitalConnection'];
  loading: boolean;
};

const Hospitals: React.FC<Props> = ({ hospitalConnection, loading }) => {
  const router = useRouter();

  return (
    <>
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
        : hospitalConnection?.edges?.map((edge, edgeIndex) => {
            if (!edge?.node) return null;
            const { node: hospital } = edge;
            return (
              <Box
                key={edgeIndex}
                my="2"
                onClick={() => goHospitalDetail(router, { id: hospital.id })}
              >
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
              </Box>
            );
          })}
    </>
  );
};

export default Hospitals;
