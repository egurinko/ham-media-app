import { HStack } from '@chakra-ui/react';
import type { HospitalFieldsFragment } from '@/api/public_api/types';
import { PrimaryTag } from '@/components/atoms/PrimaryTag';
import { HOSPITAL_STATUSES } from '@/utils/constant';

type Props = {
  hospital: HospitalFieldsFragment;
  spacing: number;
};

const HospitalTags: React.FC<Props> = ({ hospital, spacing }) => (
  <HStack spacing={spacing}>
    {hospital.recommended ? <PrimaryTag>おすすめ</PrimaryTag> : null}
    {hospital.hospitalNightServiceOption?.status === HOSPITAL_STATUSES.YES ? (
      <PrimaryTag>夜間営業可</PrimaryTag>
    ) : null}
    {hospital.hospitalReservationStatus?.required === HOSPITAL_STATUSES.YES ? (
      <PrimaryTag>予約必須</PrimaryTag>
    ) : null}
    {hospital.hospitalReservationStatus?.reservable ===
    HOSPITAL_STATUSES.YES ? (
      <PrimaryTag>予約可</PrimaryTag>
    ) : null}
    {hospital.hospitalBusinessForm?.insurance_enabled ===
    HOSPITAL_STATUSES.YES ? (
      <PrimaryTag>保険利用可</PrimaryTag>
    ) : null}
  </HStack>
);

export { HospitalTags };
