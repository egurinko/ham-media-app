import { Card } from '@/app/components/atoms/Card';
import { HospitalMap } from '@/app/components/molecules/HospitalMap';
import { getHospital } from '@/app/utils/api/publicApi/getHospital';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  hospitalId: string;
};

export const HospitalMapCard: FC<Props> = async ({ hospitalId }) => {
  const { hospital } = (await getHospital(hospitalId)).data;

  return hospital.hospitalAddress?.hospitalAddressGeoLocation ? (
    <Card
      className={css({
        p: 'lg',
      })}
    >
      <HospitalMap
        latitude={hospital.hospitalAddress.hospitalAddressGeoLocation.latitude}
        longitude={
          hospital.hospitalAddress.hospitalAddressGeoLocation.longitude
        }
        name={hospital.name}
        url={hospital.url}
        address={hospital.hospitalAddress.address}
        phone_number={hospital.hospitalAddress.phone_number}
      />
    </Card>
  ) : null;
};
