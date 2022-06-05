import { Box, Text } from '@chakra-ui/react';
import { useEffect, memo, useCallback } from 'react';
import { useLocalGetHospitalSearchQuery } from '@/api/local_api/types';
import { usePublicGetHospitalConnectionLazyQuery } from '@/api/public_api/types';
import { Card } from '@/components/atoms/Card';
import { TextSearch } from '@/components/organisms/consumer/hospitals/index/hospitalSearch/TextSearch';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import { LOCAL_STORAGE_HOSPITAL_SEARCH_KEY } from '@/utils/constant';
import { useLocalStorage } from '@/utils/hooks';
import { scrollTo } from '@/utils/scroll';
import { Filter } from './hospitalSearch/Filter';
import { HospitalGoogleMap } from './hospitalSearch/HospitalGoogleMap';
import { Hospitals } from './hospitalSearch/Hospitals';
import { SearchConditions } from './hospitalSearch/SearchConditions';
import type { PERSISTED, GetContinuousHospitalConnection } from '../types';
import type { FC } from 'react';

const HospitalSearch: FC<NoProps> = () => {
  const { data } = useLocalGetHospitalSearchQuery();
  const [getHospitalConnection, { data: hospitalData, loading, fetchMore }] =
    usePublicGetHospitalConnectionLazyQuery();
  const { setLocalStorage, getLocalStorage } = useLocalStorage<PERSISTED>(
    LOCAL_STORAGE_HOSPITAL_SEARCH_KEY
  );

  const persistPage = useCallback(() => {
    const hospitalSearch = data?.hospitalSearch;
    if (hospitalSearch) {
      const persisting: PERSISTED = {
        searchText: hospitalSearch.searchText || '',
        currentLocation: hospitalSearch.currentLocation,
        reservable: hospitalSearch.reservable,
        nightServiceOption: hospitalSearch.nightServiceOption,
        insuranceEnabled: hospitalSearch.insuranceEnabled,
        jsavaOption: hospitalSearch.jsavaOption,
        nichijuOption: hospitalSearch.nichijuOption,
        recommended: hospitalSearch.recommended,
      };
      setLocalStorage(persisting);
    }
  }, [data, setLocalStorage]);

  const restorePage = useCallback(() => {
    const persisted = getLocalStorage();
    if (persisted) {
      const {
        searchText,
        currentLocation,
        reservable,
        nightServiceOption,
        jsavaOption,
        nichijuOption,
        recommended,
      } = persisted;
      hospitalSearchVar({
        ...hospitalSearchVar(),
        searchText: searchText || '',
        currentLocation: currentLocation,
        reservable: reservable || false,
        nightServiceOption: nightServiceOption || false,
        jsavaOption: jsavaOption || false,
        nichijuOption: nichijuOption || false,
        recommended: recommended || false,
      });
    }
  }, [getLocalStorage]);

  useEffect(() => {
    restorePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hospitalSearch = data?.hospitalSearch;
    if (hospitalSearch) {
      const variables = {
        first: 20,
        searchText: hospitalSearch.searchText || '',
        currentLocation: hospitalSearch.currentLocation,
        reservable: hospitalSearch.reservable,
        nightServiceOption: hospitalSearch.nightServiceOption,
        insuranceEnabled: hospitalSearch.insuranceEnabled,
        jsavaOption: hospitalSearch.jsavaOption,
        nichijuOption: hospitalSearch.nichijuOption,
        recommended: hospitalSearch.recommended,
      };
      getHospitalConnection({ variables, fetchPolicy: 'network-only' });
      scrollTo();
    }
    persistPage();
  }, [getHospitalConnection, data, persistPage]);

  const getContinuousHospitalConnection: GetContinuousHospitalConnection =
    () => {
      if (fetchMore) {
        const pageInfo = hospitalData?.publicHospitalConnection?.pageInfo;
        const hospitalSearch = data?.hospitalSearch;
        if (pageInfo?.hasNextPage && !loading && hospitalSearch) {
          fetchMore({
            variables: {
              first: 10,
              after: pageInfo.endCursor,
              searchText: hospitalSearch.searchText || '',
              currentLocation: hospitalSearch.currentLocation,
              reservable: hospitalSearch.reservable,
              nightServiceOption: hospitalSearch.nightServiceOption,
              insuranceEnabled: hospitalSearch.insuranceEnabled,
              jsavaOption: hospitalSearch.jsavaOption,
              nichijuOption: hospitalSearch.nichijuOption,
              recommended: hospitalSearch.recommended,
            },
          });
          persistPage();
        }
      }
    };

  return (
    <>
      <Card>
        <TextSearch />
      </Card>
      {data?.hospitalSearch.currentLocation && (
        <Box my="2">
          <HospitalGoogleMap
            currentLat={data.hospitalSearch.currentLocation.latitude}
            currentLng={data.hospitalSearch.currentLocation.longitude}
            height={200}
          />
        </Box>
      )}

      <Box my="2">
        <SearchConditions />
      </Box>
      {data?.hospitalSearch.searchText ? (
        <>
          <Text fontSize="lg" fontWeight="bold" display="inline">
            {data.hospitalSearch.searchText}
          </Text>
          <Text display="inline">の病院</Text>
        </>
      ) : data?.hospitalSearch.currentLocation ? (
        <>
          <Text fontSize="lg" fontWeight="bold" display="inline">
            現在地
          </Text>
          <Text display="inline">に近い病院</Text>
        </>
      ) : null}
      <Box>
        <Hospitals
          hospitalConnection={hospitalData?.publicHospitalConnection}
          loading={loading}
          getContinuousHospitalConnection={getContinuousHospitalConnection}
        />
      </Box>
      <Filter />
    </>
  );
};

const Memoed = memo(HospitalSearch);

export { Memoed as HospitalSearch };
