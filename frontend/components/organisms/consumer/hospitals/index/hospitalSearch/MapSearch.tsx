import { Button, Text, Box } from '@chakra-ui/react';
import { useState, useCallback, useEffect, memo } from 'react';
import { Card } from '@/components/atoms/Card';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { HospitalGoogleMap } from './HospitalGoogleMap';
import type {
  SetCurrentLocation,
  SetSearchText,
  CurrentLocation,
} from '../types';
import type { FC } from 'react';

type Props = {
  currentLocation: CurrentLocation;
  setCurrentLocation: SetCurrentLocation;
  setSearchText: SetSearchText;
};

const MapSearch: FC<Props> = ({
  currentLocation,
  setCurrentLocation,
  setSearchText,
}) => {
  const [open, setOpen] = useState(false);
  const [currentLocationError, setCurrentLocationError] =
    useState<null | GeolocationPositionError>(null);
  const [currentLat, setCurrentLat] = useState(35.6602384);
  const [currentLng, setCurrentLng] = useState(139.727888);

  const copyApplied = useCallback(() => {
    if (currentLocation) {
      setCurrentLat(currentLocation.latitude);
      setCurrentLng(currentLocation.longitude);
      setOpen(true);
    }
  }, [currentLocation]);
  const copyLocal = useCallback(() => {
    setCurrentLocation({ latitude: currentLat, longitude: currentLng });
  }, [currentLat, currentLng, setCurrentLocation]);

  useEffect(() => {
    copyApplied();
  }, [copyApplied]);

  const success = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCurrentLat(latitude);
      setCurrentLng(longitude);
      copyLocal();
      setSearchText('');
      setCurrentLocationError(null);
      setOpen(true);
    },
    [setSearchText, copyLocal]
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
      <Card>
        <Button
          onClick={handleMapSearch}
          variant="outline"
          mr="auto"
          fill="primary.main"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          width="100px"
          height="80px"
        >
          <MapPinIcon width={20} height={20} />
          <Text fontSize="xs">現在地から探す</Text>
        </Button>
      </Card>
      {!!currentLocation && open ? (
        <Box my="2">
          <HospitalGoogleMap
            height={200}
            currentLat={currentLat}
            currentLng={currentLng}
          />
        </Box>
      ) : null}
      {currentLocationError ? (
        <FlashMessage
          status="error"
          message="現在地の取得に失敗しました。もう一度お試しください。"
        />
      ) : null}
    </>
  );
};

const Memoed = memo(MapSearch);

export { Memoed as MapSearch };
