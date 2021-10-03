import { useState } from 'react';
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
import { scrollToTop } from '@/utils/scroll';

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [reservable, setReservable] = useState(false);
  const [nightServiceOption, setNightServiceOption] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [jsavaOption, setJsavaOption] = useState(false);
  const [nichijuOption, setNichijuOption] = useState(false);
  const [getHospitalConnection, { data: hospitalData, loading, fetchMore }] =
    usePublicGetHospitalConnectionLazyQuery();

  const getInitialHospitalConnection = (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ): void => {
    getHospitalConnection({
      variables: {
        first: 20,
        searchText,
        reservable,
        nightServiceOption,
        insuranceEnabled,
        jsavaOption,
        nichijuOption,
        ...variables,
      },
    });
    scrollToTop();
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
            reservable,
            nightServiceOption,
            insuranceEnabled,
            jsavaOption,
            nichijuOption,
          },
        });
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
        />
      </Box>
      <Box>
        <SearchConditions
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
