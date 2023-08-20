import { Card } from '@/app/components/atoms/Card';
import { getHospital } from '@/app/utils/api/publicApi/getHospital';
import { HospitalMap } from './HospitalMap';
import type { FC } from 'react';

type Props = {
  hospitalId: string;
};

export const HospitalMapCard: FC<Props> = async ({ hospitalId }) => {
  const hospital = await getHospital(hospitalId);

  return hospital.hospitalAddress?.hospitalAddressGeoLocation ? (
    <Card>
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
