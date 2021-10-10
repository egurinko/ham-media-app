import { memo, useState, useCallback } from 'react';
import { Spinner, Box, Text } from '@chakra-ui/react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
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
      hospitalLoations={hospitalLoations?.hospitals}
    />
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

type HospitalLocation = PublicGetHospitalLocationsQuery['hospitals'][number];

type MapProps = Props & {
  hospitalLoations?: HospitalLocation[];
};

const Map: React.FC<MapProps> = ({
  height,
  width,
  currentLat,
  currentLng,
  hospitalLoations,
}) => {
  const [currentHospital, setCurrentHospital] =
    useState<null | HospitalLocation>(null);
  const handleHospitalClick = useCallback((hospital: HospitalLocation) => {
    setCurrentHospital(hospital);
  }, []);
  const handleInfoWindoClose = useCallback(() => {
    setCurrentHospital(null);
  }, []);
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
      zoom={12}
    >
      <Marker
        position={{ lat: currentLat, lng: currentLng }}
        animation={google.maps.Animation.DROP}
        icon="https://user-images.githubusercontent.com/23233648/136685502-4bf03930-df2c-4194-8cc7-67f10699f5b8.png"
      />
      {hospitalLoations?.map((h) => {
        if (h.hospitalAddress && h.hospitalAddress.hospitalAddressGeoLocation) {
          return (
            <Marker
              key={String(h.id)}
              position={{
                lat: h.hospitalAddress.hospitalAddressGeoLocation.latitude,
                lng: h.hospitalAddress.hospitalAddressGeoLocation.longitude,
              }}
              onClick={() => handleHospitalClick(h)}
            />
          );
        }
      })}
      {currentHospital ? (
        <InfoWindow
          position={{
            lat:
              currentHospital.hospitalAddress!.hospitalAddressGeoLocation!
                .latitude + 0.012,
            lng: currentHospital.hospitalAddress!.hospitalAddressGeoLocation!
              .longitude,
          }}
          onCloseClick={handleInfoWindoClose}
        >
          <Box display="flex" flexDirection="column">
            <a href={currentHospital.url}>
              <Text fontSize="md" textDecoration="underline">
                {currentHospital.name}
              </Text>
            </a>
            <Text fontSize="xs">
              {currentHospital.hospitalAddress?.phone_number}
            </Text>
            <Text fontSize="xs">
              {currentHospital.hospitalAddress?.address}
            </Text>
          </Box>
        </InfoWindow>
      ) : (
        <></>
      )}
    </GoogleMap>
  );
};

export default memo(GoogleMapComponent);
