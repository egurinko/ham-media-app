import { Box } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { usePublicGetHospitalConnectionLazyQuery } from '@/api/public_api/types';
import type { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';
import { useLocalStorage } from '@/utils/hooks';
import { scrollTo } from '@/utils/scroll';
import { Filter } from './hospitalSearch/Filter';
import { Hospitals } from './hospitalSearch/Hospitals';
import { MapSearch } from './hospitalSearch/MapSearch';
import { SearchConditions } from './hospitalSearch/SearchConditions';
import { TextSearch } from './hospitalSearch/TextSearch';
import type {
  SearchText,
  CurrentLocation,
  Reservable,
  NightServiceOption,
  InsuranceEnabled,
  JsavaOption,
  NichijuOption,
  GetContinuousHospitalConnection,
} from './types';

const PAGE_STORED_KEY = 'hospitalsPage';
type PERSISTED = {
  searchText?: SearchText;
  currentLocation?: CurrentLocation;
  reservable?: Reservable;
  nightServiceOption?: NightServiceOption;
  insuranceEnabled?: InsuranceEnabled;
  jsavaOption?: JsavaOption;
  nichijuOption?: NichijuOption;
};

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(null);
  const [reservable, setReservable] = useState(false);
  const [nightServiceOption, setNightServiceOption] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [jsavaOption, setJsavaOption] = useState(false);
  const [nichijuOption, setNichijuOption] = useState(false);
  const [getHospitalConnection, { data: hospitalData, loading, fetchMore }] =
    usePublicGetHospitalConnectionLazyQuery();
  const { setLocalStorage, getLocalStorage } =
    useLocalStorage<PERSISTED>(PAGE_STORED_KEY);

  const persistPage = useCallback(
    (variables: Partial<PublicGetHospitalConnectionQueryVariables>) => {
      const persisting: PERSISTED = {
        after: hospitalData?.publicHospitalConnection?.pageInfo.endCursor,
        searchText,
        currentLocation,
        reservable,
        nightServiceOption,
        insuranceEnabled,
        jsavaOption,
        nichijuOption,
        ...variables,
      };
      setLocalStorage(persisting);
    },
    [
      currentLocation,
      hospitalData?.publicHospitalConnection?.pageInfo.endCursor,
      insuranceEnabled,
      jsavaOption,
      nichijuOption,
      nightServiceOption,
      reservable,
      searchText,
      setLocalStorage,
    ]
  );

  const getInitialHospitalConnection = useCallback(
    (variables) => {
      getHospitalConnection({
        variables: {
          first: 20,
          searchText,
          currentLocation,
          reservable,
          nightServiceOption,
          insuranceEnabled,
          jsavaOption,
          nichijuOption,
          ...variables,
        },
      });
      scrollTo();
      persistPage(variables);
    },
    [
      currentLocation,
      getHospitalConnection,
      insuranceEnabled,
      jsavaOption,
      nichijuOption,
      nightServiceOption,
      persistPage,
      reservable,
      searchText,
    ]
  );

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
      } = persisted;
      setSearchText(searchText || '');
      setCurrentLocation(currentLocation);
      setReservable(reservable || false);
      setNightServiceOption(nightServiceOption || false);
      setJsavaOption(jsavaOption || false);
      setNichijuOption(nichijuOption || false);
      getInitialHospitalConnection({
        searchText: searchText || '',
        currentLocation,
        reservable: reservable || false,
        nightServiceOption: nightServiceOption || false,
        jsavaOption: jsavaOption || false,
        nichijuOption: nichijuOption || false,
      });
    }
  }, [getInitialHospitalConnection, getLocalStorage]);

  useEffect(() => {
    restorePage();
  }, [restorePage]);

  const getContinuousHospitalConnection: GetContinuousHospitalConnection =
    () => {
      if (fetchMore) {
        const pageInfo = hospitalData?.publicHospitalConnection?.pageInfo;
        if (pageInfo?.hasNextPage && !loading) {
          fetchMore({
            variables: {
              first: 10,
              after: pageInfo.endCursor,
              searchText,
              currentLocation,
              reservable,
              nightServiceOption,
              insuranceEnabled,
              jsavaOption,
              nichijuOption,
            },
          });
          persistPage({});
        }
      }
    };

  return (
    <>
      <Box>
        <TextSearch
          searchText={searchText}
          setSearchText={setSearchText}
          getInitialHospitalConnection={getInitialHospitalConnection}
        />
      </Box>
      <Box my="2">
        <MapSearch
          getInitialHospitalConnection={getInitialHospitalConnection}
          setCurrentLocation={setCurrentLocation}
        />
      </Box>
      <Box>
        <SearchConditions
          setSearchText={setSearchText}
          setCurrentLocation={setCurrentLocation}
          reservable={reservable}
          setReservable={setReservable}
          nightServiceOption={nightServiceOption}
          setNightServiceOption={setNightServiceOption}
          insuranceEnabled={insuranceEnabled}
          setInsuranceEnabled={setInsuranceEnabled}
          jsavaOption={jsavaOption}
          setJsavaOption={setJsavaOption}
          nichijuOption={nichijuOption}
          setNichijuOption={setNichijuOption}
          getInitialHospitalConnection={getInitialHospitalConnection}
        />
      </Box>
      <Box>
        <Hospitals
          hospitalConnection={hospitalData?.publicHospitalConnection}
          loading={loading}
          getContinuousHospitalConnection={getContinuousHospitalConnection}
        />
      </Box>
      <Filter
        reservable={reservable}
        setReservable={setReservable}
        nightServiceOption={nightServiceOption}
        setNightServiceOption={setNightServiceOption}
        insuranceEnabled={insuranceEnabled}
        setInsuranceEnabled={setInsuranceEnabled}
        jsavaOption={jsavaOption}
        setJsavaOption={setJsavaOption}
        nichijuOption={nichijuOption}
        setNichijuOption={setNichijuOption}
        getInitialHospitalConnection={getInitialHospitalConnection}
      />
    </>
  );
};

export { HospitalSearch };
