import { Box } from '@chakra-ui/react';
import { useState, useEffect, useCallback, memo } from 'react';
import { usePublicGetHospitalConnectionLazyQuery } from '@/api/public_api/types';
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
  Recommended,
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
  recommended?: Recommended;
};

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(null);
  const [reservable, setReservable] = useState(false);
  const [nightServiceOption, setNightServiceOption] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [jsavaOption, setJsavaOption] = useState(false);
  const [nichijuOption, setNichijuOption] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [getHospitalConnection, { data: hospitalData, loading, fetchMore }] =
    usePublicGetHospitalConnectionLazyQuery();
  const { setLocalStorage, getLocalStorage } =
    useLocalStorage<PERSISTED>(PAGE_STORED_KEY);

  const persistPage = useCallback(() => {
    const persisting: PERSISTED = {
      searchText,
      currentLocation,
      reservable,
      nightServiceOption,
      insuranceEnabled,
      jsavaOption,
      nichijuOption,
      recommended,
    };
    setLocalStorage(persisting);
  }, [
    currentLocation,
    insuranceEnabled,
    jsavaOption,
    nichijuOption,
    nightServiceOption,
    recommended,
    reservable,
    searchText,
    setLocalStorage,
  ]);

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
      setSearchText(searchText || '');
      setCurrentLocation(currentLocation);
      setReservable(reservable || false);
      setNightServiceOption(nightServiceOption || false);
      setJsavaOption(jsavaOption || false);
      setNichijuOption(nichijuOption || false);
      setRecommended(recommended || false);
    }
  }, [getLocalStorage]);

  useEffect(() => {
    restorePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const variables = {
      first: 20,
      searchText,
      currentLocation,
      reservable,
      nightServiceOption,
      insuranceEnabled,
      jsavaOption,
      nichijuOption,
      recommended,
    };
    getHospitalConnection({ variables, fetchPolicy: 'network-only' });
    scrollTo();
    persistPage();
  }, [
    searchText,
    currentLocation,
    reservable,
    nightServiceOption,
    insuranceEnabled,
    jsavaOption,
    nichijuOption,
    recommended,
    getHospitalConnection,
    persistPage,
  ]);

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
              recommended,
            },
          });
          persistPage();
        }
      }
    };

  return (
    <>
      <Box>
        <TextSearch
          searchText={searchText}
          setSearchText={setSearchText}
          setCurrentLocation={setCurrentLocation}
        />
      </Box>
      <Box my="2">
        <MapSearch
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          setSearchText={setSearchText}
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
          recommended={recommended}
          setRecommended={setRecommended}
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
        recommended={recommended}
        setRecommended={setRecommended}
      />
    </>
  );
};

const Memoed = memo(HospitalSearch);

export { Memoed as HospitalSearch };
