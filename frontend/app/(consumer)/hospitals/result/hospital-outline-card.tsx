import Link from 'next/link';
import { HospitalTags } from '@/app/(consumer)/hospitals/HospitalTags';
import { Button } from '@/app/components/atoms/Button';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import MapPinIcon from '@/assets/map_pin.svg';
import PhoneIcon from '@/assets/phone.svg';
import type { PublicApiHospitalFieldsFragment } from '@/services/api/public_api/types';
import { css } from '@/styled/css';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  hospital: PublicApiHospitalFieldsFragment;
};

export const HospitalOutlineCard: FC<Props> = ({ hospital }) => (
  <Link key={hospital.id} href={HOSPITALS_DETAIL_PATH(hospital.id)}>
    <Card
      className={css({
        width: '100%',
        p: 'lg',
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm',
        _hover: {
          boxShadow: 'sm',
        },
      })}
    >
      <div>
        <Typography variant="headlineS" bold={true}>
          {hospital.name}
        </Typography>
        <div
          className={css({
            fill: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
          })}
        >
          <Icon source={<MapPinIcon />} width={15} height={15} />
          <Typography variant="body2">
            {hospital.hospitalAddress?.prefecture.name}
            {hospital.hospitalAddress?.address}
          </Typography>
        </div>
      </div>
      <HospitalTags hospital={hospital} />
      <div
        className={css({
          whiteSpace: 'pre-line',
        })}
      >
        <Typography variant="subhead">診療時間</Typography>
        {hospital.hospitalBusinessForm?.business_hour}
      </div>
      <Button
        visual="tonal"
        fullWidth
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        })}
      >
        <Icon source={<PhoneIcon />} width={20} height={20} />
        {hospital.hospitalAddress?.phone_number}
      </Button>
    </Card>
  </Link>
);
