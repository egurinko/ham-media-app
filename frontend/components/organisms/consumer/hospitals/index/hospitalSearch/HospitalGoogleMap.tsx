import { memo, useState, useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { usePublicGetHospitalLocationsQuery } from '@/api/public_api/types';
import type { PublicGetHospitalLocationsQuery } from '@/api/public_api/types';
import { GoogleMap } from '@/components/organisms/GoogleMap';

type HospitalLocation = PublicGetHospitalLocationsQuery['hospitals'][number];

type Props = {
  width?: number;
  height?: number;
  currentLat: number;
  currentLng: number;
};

const HospitalGoogleMapComponent: React.FC<Props> = ({
  height,
  width,
  currentLat,
  currentLng,
}) => {
  const { data: hospitalLoations } = usePublicGetHospitalLocationsQuery();

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
      width={width}
      height={height}
      currentLat={currentLat}
      currentLng={currentLng}
    >
      <Marker
        position={{ lat: currentLat, lng: currentLng }}
        icon="https://user-images.githubusercontent.com/23233648/136685502-4bf03930-df2c-4194-8cc7-67f10699f5b8.png"
      />
      {hospitalLoations?.hospitals.map((h) => {
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
            <a href={currentHospital.url} target="_blank" rel="noreferrer">
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

const HospitalGoogleMap = memo(HospitalGoogleMapComponent);
export { HospitalGoogleMap };
