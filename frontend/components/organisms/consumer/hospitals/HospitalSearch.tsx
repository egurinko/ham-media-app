import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import TextSearch from './hospitalSearch/TextSearch';
import MapSearch from './hospitalSearch/MapSearch';
import SearchConditions from './hospitalSearch/SearchConditions';
import Hospitals from './hospitalSearch/Hospitals';
import Filter from './hospitalSearch/Filter';
import {
  usePublicGetHospitalConnectionLazyQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/api/public_api/types';
import { scrollTo } from '@/utils/scroll';
import { useLocalStorage } from '@/utils/hooks';

const PAGE_STORED_KEY = 'hospitalsPage';
type PERSISTED = {
  input: {
    searchText: PublicGetHospitalConnectionQueryVariables['searchText'];
    currentLocation: PublicGetHospitalConnectionQueryVariables['currentLocation'];
    reservable: PublicGetHospitalConnectionQueryVariables['reservable'];
    nightServiceOption: PublicGetHospitalConnectionQueryVariables['nightServiceOption'];
    insuranceEnabled: PublicGetHospitalConnectionQueryVariables['insuranceEnabled'];
    jsavaOption: PublicGetHospitalConnectionQueryVariables['jsavaOption'];
    nichijuOption: PublicGetHospitalConnectionQueryVariables['nichijuOption'];
  };
};

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] =
    useState<PublicGetHospitalConnectionQueryVariables['currentLocation']>(
      null
    );
  const [reservable, setReservable] = useState(false);
  const [nightServiceOption, setNightServiceOption] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [jsavaOption, setJsavaOption] = useState(false);
  const [nichijuOption, setNichijuOption] = useState(false);
  const [getHospitalConnection, { data: hospitalData, loading, fetchMore }] =
    usePublicGetHospitalConnectionLazyQuery();
  const { setLocalStorage, getLocalStorage } =
    useLocalStorage<PERSISTED>(PAGE_STORED_KEY);

  useEffect(() => {
    restorePage();
  }, []);

  const restorePage = () => {
    const persisted = getLocalStorage();
    if (persisted) {
      const {
        searchText,
        currentLocation,
        reservable,
        nightServiceOption,
        jsavaOption,
        nichijuOption,
      } = persisted.input;
      setSearchText(searchText);
      setCurrentLocation(currentLocation);
      setReservable(reservable);
      setNightServiceOption(nightServiceOption);
      setJsavaOption(jsavaOption);
      setNichijuOption(nichijuOption);
      getInitialHospitalConnection({
        searchText,
        currentLocation,
        reservable,
        nightServiceOption,
        jsavaOption,
        nichijuOption,
      });
    }
  };

  const persistPage = (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => {
    const persisting: PERSISTED = {
      input: {
        after: hospitalData?.publicHospitalConnection?.pageInfo.endCursor,
        searchText,
        currentLocation,
        reservable,
        nightServiceOption,
        insuranceEnabled,
        jsavaOption,
        nichijuOption,
        ...variables,
      },
    };
    setLocalStorage(persisting);
  };

  const getInitialHospitalConnection = (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ): void => {
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
  };

  const getContinuousHospitalConnection = () => {
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

export default HospitalSearch;
