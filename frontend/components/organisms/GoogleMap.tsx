import { Box } from '@chakra-ui/react';
import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Spinner } from '@/components/atoms/Spinner';
import { FlashMessage } from '@/components/molecules/FlashMessage';

type Props = {
  width?: number;
  height?: number;
  currentLat: number;
  currentLng: number;
};

const GoogleMap: React.FC<Props> = ({
  height,
  width,
  currentLat,
  currentLng,
  children,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-id',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
  });

  if (loadError) {
    return (
      <FlashMessage
        status="error"
        message="Google Map の読み込みに失敗しました。お手数ですがしばらく時間を置いてから再度お試しください。"
      />
    );
  }

  return isLoaded ? (
    <Map
      height={height}
      width={width}
      currentLat={currentLat}
      currentLng={currentLng}
    >
      {children}
    </Map>
  ) : (
    <Box textAlign="center">
      <Spinner loading={true} size="lg" />
    </Box>
  );
};

const Map: React.FC<Props> = ({
  height,
  width,
  currentLat,
  currentLng,
  children,
}) => (
  <ReactGoogleMap
    mapContainerStyle={{
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : '100%',
    }}
    center={{
      lat: currentLat,
      lng: currentLng,
    }}
    zoom={12}
  >
    {children}
  </ReactGoogleMap>
);

export { GoogleMap };
