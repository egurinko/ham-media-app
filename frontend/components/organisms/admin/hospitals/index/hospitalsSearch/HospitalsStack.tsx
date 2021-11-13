import { useRouter } from 'next/router';
import { Text, Box, VStack, Divider, Badge } from '@chakra-ui/react';
import { Fragment, useCallback } from 'react';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';
import { goAdminHospitalsEdit } from '@/utils/routes';
import type { Hospitals } from '../types';

type Props = {
  hospitals: Hospitals;
};

const HospitalsStack: React.VFC<Props> = ({ hospitals }) => {
  const router = useRouter();
  const handleClick = useCallback(
    (id: BigInt) => {
      goAdminHospitalsEdit(router, { id });
    },
    [router]
  );

  return (
    <VStack spacing="0" mt="4" alignItems="flex-start">
      <Divider />
      {hospitals?.map((hospital) => {
        return hospital ? (
          <Fragment key={Number(hospital.id)}>
            <Box
              w="100%"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              _hover={{
                background: 'background.hover',
                color: 'primary.main',
                cursor: 'pointer',
              }}
              p="2"
              onClick={() => handleClick(hospital.id)}
            >
              <Box w="full">
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  pb="2"
                >
                  <Text fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold">
                    {hospital.name}
                  </Text>
                  <div>
                    {hospital.deleted ? (
                      <Badge colorScheme="red">非公開</Badge>
                    ) : (
                      <Badge colorScheme="green">公開</Badge>
                    )}
                  </div>
                </Box>
              </Box>
              <Box flexShrink={0}>
                <Box flexShrink={0} display="flex" alignItems="center">
                  <Box fill="primary.main" mr="1">
                    <MapPinIcon width={15} height={15} />
                  </Box>
                  <Text fontSize="sm">
                    {hospital.hospitalAddress?.prefecture.name}
                    {hospital.hospitalAddress?.address}
                  </Text>
                </Box>
                <Box flexShrink={0} display="flex" alignItems="center">
                  <Box fill="primary.main" mr="1">
                    <PhoneIcon width={15} height={15} />
                  </Box>
                  <Text fontSize="sm">
                    {hospital.hospitalAddress?.phone_number}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Fragment>
        ) : null;
      })}
    </VStack>
  );
};

export { HospitalsStack };
