import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Button, Text, Box } from '@chakra-ui/react';
import Card from '@/components/atoms/Card';
import GoogleMap from './GoogleMap';
import MapPinIcon from '@/components/atoms/assets/MapPinIcon';
import FlashMessage from '@/components/molecules/FlashMessage';
import { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';

type Props = {
  getInitialHospitalConnection: (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => void;
  setCurrentLocation: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['currentLocation']>
  >;
};

const MapSearch: React.FC<Props> = ({
  getInitialHospitalConnection,
  setCurrentLocation,
}) => {
  const [open, setOpen] = useState(false);
  const [currentLocationError, setCurrentLocationError] =
    useState<null | GeolocationPositionError>(null);
  const [currentLat, setCurrentLat] = useState(35.6602384);
  const [currentLng, setCurrentLng] = useState(139.727888);

  const handleMapSearch = useCallback(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  const success = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCurrentLat(latitude);
      setCurrentLng(longitude);
      setCurrentLocation({ latitude, longitude });
      getInitialHospitalConnection({
        currentLocation: { latitude, longitude },
        searchText: '',
      });
      setOpen(true);
    },
    [setCurrentLocation, getInitialHospitalConnection]
  );

  const error = useCallback((error: GeolocationPositionError) => {
    setCurrentLocationError(error);
  }, []);

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
      {open ? (
        <Box my="2">
          <GoogleMap
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

export default MapSearch;
