'use client';

import { Button } from '@/app/components/atoms/Button';
import { upsertHospitalAddressGeoLocationAction } from './addressUpdate.actions';
import type { FC } from 'react';

type Props = {
  hospitalAddressId: number;
};

export const AddressUpdate: FC<Props> = ({ hospitalAddressId }) => (
  <Button
    visual="tonal"
    onClick={async () => {
      await upsertHospitalAddressGeoLocationAction({
        hospitalAddressId,
      });
    }}
  >
    更新
  </Button>
);
