import { Tag } from '@/app/components/atoms/Tag';
import type { PublicApiHospitalFieldsFragment } from '@/services/api/public_api/types';
import { css } from '@/styled/css';
import { HOSPITAL_STATUSES } from '@/utils/constant';
import type { FC } from 'react';

type Props = {
  hospital: PublicApiHospitalFieldsFragment;
};

export const HospitalTags: FC<Props> = ({ hospital }) => (
  <div className={css({ display: 'flex', flexDir: 'row', gap: '2' })}>
    {hospital.recommended ? <Tag>おすすめ</Tag> : null}
    {hospital.hospitalNightServiceOption?.status === HOSPITAL_STATUSES.YES ? (
      <Tag>夜間営業可</Tag>
    ) : null}
    {hospital.hospitalReservationStatus?.required === HOSPITAL_STATUSES.YES ? (
      <Tag>予約必須</Tag>
    ) : null}
    {hospital.hospitalReservationStatus?.reservable ===
    HOSPITAL_STATUSES.YES ? (
      <Tag>予約可</Tag>
    ) : null}
    {hospital.hospitalBusinessForm?.insurance_enabled ===
    HOSPITAL_STATUSES.YES ? (
      <Tag>保険利用可</Tag>
    ) : null}
  </div>
);
