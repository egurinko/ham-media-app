'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import AlertIcon from '@/assets/alert.svg';
import MapPinIcon from '@/assets/map_pin.svg';
import { css } from '@/styled/css';
import { goAppHospitalsResult } from '@/utils/routes';
import type { FC } from 'react';

export const LocationSearch: FC<NoProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentLocationError, setCurrentLocationError] =
    useState<null | GeolocationPositionError>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const success = (position: GeolocationPosition) => {
    setLocationLoading(false);
    const { latitude, longitude } = position.coords;
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (latitude && longitude) {
        searchParams?.forEach((_, key) => params.delete(key));
        params.set('latitude', latitude.toString());
        params.set('longitude', longitude.toString());
      } else {
        params.delete('latitude');
        params.delete('longitude');
      }
      router.replace(`${pathname}?${params.toString()}`);
      goAppHospitalsResult(
        router,
        `latitude=${latitude.toString()}&longitude=${longitude.toString()}`,
      );
    }
    setCurrentLocationError(null);
  };

  const error = (error: GeolocationPositionError) => {
    setLocationLoading(false);
    setCurrentLocationError(error);
  };

  const handleMapSearch = () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  };

  return (
    <>
      <Button
        onClick={handleMapSearch}
        visual="outlined"
        loading={locationLoading}
      >
        <Icon source={<MapPinIcon />} width={20} height={20} />
        <Typography variant="body1" bold={true}>
          現在地から探す
        </Typography>
      </Button>
      {currentLocationError ? (
        <Alert visual="error" className={css({ mt: 'sm' })}>
          <Icon source={<AlertIcon />} width={20} height={20} />
          現在地の取得に失敗しました。もう一度お試しください。
        </Alert>
      ) : null}
    </>
  );
};
