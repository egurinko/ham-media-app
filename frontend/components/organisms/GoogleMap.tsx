'use client';

import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { memo } from 'react';
import { SkeletonText } from '@/app/components/atoms/SkeletonText';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  width?: number;
  height?: number;
  currentLat: number;
  currentLng: number;
};

const GoogleMap: FC<PropsWithChildren<Props>> = ({
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
    <div>
      <SkeletonText noOfLines={4} />
    </div>
  );
};

const Map: FC<PropsWithChildren<Props>> = ({
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

const Memoed = memo(GoogleMap);

export { Memoed as GoogleMap };
