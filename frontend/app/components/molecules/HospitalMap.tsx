'use client';

import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { Typography } from '@/app/components/atoms/Typography';
import { GoogleMap } from '@/app/components/molecules/GoogleMap';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  latitude: number;
  longitude: number;
  name: string;
  url: string;
  phone_number: string;
  address: string;
};

export const HospitalMap: FC<Props> = ({
  latitude,
  longitude,
  name,
  url,
  phone_number,
  address,
}) => (
  <GoogleMap height={400} currentLat={latitude} currentLng={longitude}>
    <MarkerF
      position={{
        lat: latitude,
        lng: longitude,
      }}
    />
    <InfoWindowF
      position={{
        lat: latitude + 0.012,
        lng: longitude,
      }}
    >
      <div className={css({ display: 'flex', flexDirection: 'column' })}>
        <a href={url} target="_blank" rel="noreferrer">
          <Typography
            variant="body1"
            className={css({ textDecorationLine: 'underline' })}
          >
            {name}
          </Typography>
        </a>
        <Typography variant="caption">{phone_number}</Typography>
        <Typography variant="caption">{address}</Typography>
      </div>
    </InfoWindowF>
  </GoogleMap>
);
