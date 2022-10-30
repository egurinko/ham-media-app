import { Box, Text } from '@chakra-ui/react';
import { MarkerF, InfoWindowF } from '@react-google-maps/api';
import { memo, useState, useCallback } from 'react';
import { GoogleMap } from '@/components/organisms/GoogleMap';
import type { PublicGetHospitalLocationsQuery } from '@/services/api/public_api/types';
import { usePublicGetHospitalLocationsQuery } from '@/services/api/public_api/types';
import type { FC } from 'react';

type HospitalLocation = PublicGetHospitalLocationsQuery['hospitals'][number];

type Props = {
  width?: number;
  height?: number;
  currentLat: number;
  currentLng: number;
};

const HospitalGoogleMap: FC<Props> = ({
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
      <MarkerF
        position={{ lat: currentLat, lng: currentLng }}
        icon="https://user-images.githubusercontent.com/23233648/136685502-4bf03930-df2c-4194-8cc7-67f10699f5b8.png"
      />
      {hospitalLoations?.hospitals.map((h) => {
        if (h.hospitalAddress && h.hospitalAddress.hospitalAddressGeoLocation) {
          return (
            <MarkerF
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
        <InfoWindowF
          position={{
            lat:
              currentHospital.hospitalAddress?.hospitalAddressGeoLocation
                ?.latitude || 0 + 0.012,
            lng:
              currentHospital.hospitalAddress?.hospitalAddressGeoLocation
                ?.longitude || 0,
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
        </InfoWindowF>
      ) : (
        <></>
      )}
    </GoogleMap>
  );
};

const Memoed = memo(HospitalGoogleMap);

export { Memoed as HospitalGoogleMap };
