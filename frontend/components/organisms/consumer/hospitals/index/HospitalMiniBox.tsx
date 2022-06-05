import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import type { PublicGetHospitalConnectionQuery } from '@/api/public_api/types';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  hospital: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          PublicGetHospitalConnectionQuery['publicHospitalConnection']
        >['edges']
      >[number]
    >['node']
  >;
};

const HospitalMiniBox: FC<Props> = ({ hospital }) => (
  <Link key={Number(hospital.id)} href={HOSPITALS_DETAIL_PATH(hospital.id)}>
    <a target="_blank" rel="noreferrer">
      <Box
        borderStyle="solid"
        borderWidth={1}
        borderColor="border.gray"
        borderRadius="md"
        width="32"
        height="28"
        mr="3"
        p="2"
        cursor="pointer"
        _hover={{
          opacity: 0.7,
        }}
      >
        <Box height="12" position="relative">
          <Text
            position="absolute"
            top="50%"
            transform="translate(0, -50%)"
            overflow="hidden"
            noOfLines={2}
            fontSize="sm"
          >
            {hospital.name}
          </Text>
        </Box>
        <Box mt="2" fill="primary.main">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box flexShrink={0}>
              <MapPinIcon width={12} height={12} />
            </Box>
            <Text noOfLines={1} fontSize="xs" color="text.secondary" ml="1">
              {hospital.hospitalAddress?.prefecture.name}
              {hospital.hospitalAddress?.address}
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box flexShrink={0}>
              <PhoneIcon width={12} height={12} />
            </Box>
            <Text noOfLines={1} fontSize="xs" color="text.secondary" ml="1">
              {hospital.hospitalAddress?.phone_number}
            </Text>
          </Box>
        </Box>
      </Box>
    </a>
  </Link>
);

const Memoed = memo(HospitalMiniBox);

export { Memoed as HospitalMiniBox };
