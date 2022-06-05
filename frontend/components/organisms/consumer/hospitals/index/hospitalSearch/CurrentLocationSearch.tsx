import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, memo } from 'react';
import { useLocalGetHospitalSearchQuery } from '@/api/local_api/types';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import { goHospitalsResult } from '@/utils/routes';
import type { FC } from 'react';

const CurrentLocationSearch: FC<NoProps> = () => {
  const router = useRouter();
  const [currentLocationError, setCurrentLocationError] =
    useState<null | GeolocationPositionError>(null);
  const [currentLat, setCurrentLat] = useState(35.6602384);
  const [currentLng, setCurrentLng] = useState(139.727888);
  const { data: hospitalSearchData } = useLocalGetHospitalSearchQuery();

  const copyApplied = useCallback(() => {
    const currentLocation = hospitalSearchData?.hospitalSearch.currentLocation;
    if (currentLocation) {
      setCurrentLat(currentLocation.latitude);
      setCurrentLng(currentLocation.longitude);
    }
  }, [hospitalSearchData]);

  const copyLocal = useCallback(() => {
    hospitalSearchVar({
      currentLocation: { latitude: currentLat, longitude: currentLng },
      searchText: null,
    });
  }, [currentLat, currentLng]);

  useEffect(() => {
    copyApplied();
  }, [copyApplied]);

  const success = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCurrentLat(latitude);
      setCurrentLng(longitude);
      copyLocal();
      setCurrentLocationError(null);
      goHospitalsResult(router);
    },
    [copyLocal, router]
  );

  const error = useCallback((error: GeolocationPositionError) => {
    setCurrentLocationError(error);
  }, []);

  const handleMapSearch = useCallback(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, [success, error]);

  return (
    <>
      <Button
        onClick={handleMapSearch}
        variant="outline"
        mr="auto"
        fill="primary.main"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MapPinIcon width={20} height={20} />
        <Text ml={1} fontSize="xs">
          現在地から探す
        </Text>
      </Button>
      {currentLocationError ? (
        <FlashMessage
          status="error"
          message="現在地の取得に失敗しました。もう一度お試しください。"
        />
      ) : null}
    </>
  );
};

const Memoed = memo(CurrentLocationSearch);

export { Memoed as CurrentLocationSearch };
