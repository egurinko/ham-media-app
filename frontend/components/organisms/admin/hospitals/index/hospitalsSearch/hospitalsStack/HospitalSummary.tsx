import { Text, Box, Badge } from '@chakra-ui/react';
import { memo } from 'react';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import type { Hospital } from '@/services/api/internal_api/types';
import { ADMIN_HOSPIALS_EDIT_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  hospital: Hospital;
};

const HospitalSummary: FC<Props> = ({ hospital }) => (
  <SummaryLink url={ADMIN_HOSPIALS_EDIT_PATH(hospital.id)}>
    <Box p="2">
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
          <Text fontSize="sm">{hospital.hospitalAddress?.phone_number}</Text>
        </Box>
      </Box>
    </Box>
  </SummaryLink>
);

const Memoed = memo(HospitalSummary);

export { Memoed as HospitalSummary };
