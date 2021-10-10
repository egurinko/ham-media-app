import { memo } from 'react';
import { Spinner, Box } from '@chakra-ui/react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import FlashMessage from '@/components/molecules/FlashMessage';
import {
  PublicGetHospitalLocationsQuery,
  usePublicGetHospitalLocationsQuery,
} from '@/api/public_api/types';

type Props = {
  width?: number;
  height?: number;
  currentLat: number;
  currentLng: number;
};

const GoogleMapComponent: React.FC<Props> = ({
  height,
  width,
  currentLat,
  currentLng,
}) => {
  const { data: hospitalLoations } = usePublicGetHospitalLocationsQuery();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-id',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
  });

  const renderMap = () => {
    const onLoad = (map: google.maps.Map) => {};
    return (
      <GoogleMap
        mapContainerStyle={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
        }}
        center={{
          lat: currentLat,
          lng: currentLng,
        }}
        zoom={10}
        onLoad={onLoad}
      >
        <Marker
          position={{ lat: currentLat, lng: currentLng }}
          animation={google.maps.Animation.DROP}
          icon="https://user-images.githubusercontent.com/23233648/136685502-4bf03930-df2c-4194-8cc7-67f10699f5b8.png"
        />
      </GoogleMap>
    );
  };

  if (loadError) {
    return (
      <FlashMessage
        status="error"
        message="Google Map の読み込みに失敗しました。お手数ですがしばらく時間を置いてから再度お試しください。"
      />
    );
  }

  return isLoaded ? (
    renderMap()
  ) : (
    <Box textAlign="center">
      <Spinner
        thickness="4px"
        emptyColor="gray.200"
        color="primary.main"
        size="lg"
      />
    </Box>
  );
};

export default memo(GoogleMapComponent);
