import { HStack } from '@chakra-ui/react';
import type { HospitalFieldsFragment } from '@/api/public_api/types';
import { PrimaryTag } from '@/components/atoms/PrimaryTag';

type Props = {
  hospital: HospitalFieldsFragment;
  spacing: number;
};

const HospitalTags: React.FC<Props> = ({ hospital, spacing }) => (
  <HStack spacing={spacing}>
    {hospital.hospitalNightServiceOption?.status === '○' ? (
      <PrimaryTag>夜間営業可</PrimaryTag>
    ) : null}
    {hospital.hospitalReservationStatus?.required === '○' ? (
      <PrimaryTag>予約必須</PrimaryTag>
    ) : null}
    {hospital.hospitalReservationStatus?.reservable === '○' ? (
      <PrimaryTag>予約可</PrimaryTag>
    ) : null}
    {hospital.hospitalBusinessForm?.insurance_enabled === '○' ? (
      <PrimaryTag>保険利用可</PrimaryTag>
    ) : null}
  </HStack>
);

export { HospitalTags };
