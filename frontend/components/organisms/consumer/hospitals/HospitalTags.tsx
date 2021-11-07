import { Tag, HStack } from '@chakra-ui/react';
import type { HospitalFieldsFragment } from '@/api/public_api/types';

type Props = {
  hospital: HospitalFieldsFragment;
  spacing: number;
};

const HospitalTags: React.FC<Props> = ({ hospital, spacing }) => (
  <HStack spacing={spacing}>
    {hospital.hospitalNightServiceOption?.status === '○' ? (
      <Tag bgColor="primary.main" color="white">
        夜間営業可
      </Tag>
    ) : null}
    {hospital.hospitalReservationStatus?.required === '○' ? (
      <Tag bgColor="primary.main" color="white">
        予約必須
      </Tag>
    ) : null}
    {hospital.hospitalReservationStatus?.reservable === '○' ? (
      <Tag bgColor="primary.main" color="white">
        予約可
      </Tag>
    ) : null}
    {hospital.hospitalBusinessForm?.insurance_enabled === '○' ? (
      <Tag bgColor="primary.main" color="white">
        保険利用可
      </Tag>
    ) : null}
  </HStack>
);

export { HospitalTags };
