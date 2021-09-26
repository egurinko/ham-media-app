import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import TextSearch from './hospitalSearch/TextSearch';
import Hospitals from './hospitalSearch/Hospitals';
import Filter from './hospitalSearch/Filter';
import {
  usePublicGetHospitalConnectionLazyQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/api/public_api/types';

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [reservable, setReservable] = useState(false);
  const [nightServiceOption, setNightServiceOption] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);
  const [jsavaOption, setJsavaOption] = useState(false);
  const [nichijuOption, setNichijuOption] = useState(false);
  const [getHospitalConnection, { data: hospitalData }] =
    usePublicGetHospitalConnectionLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

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
      <Box>map search{`${reservable}`}</Box>
      <Box>search conditions</Box>
      <Box>
        <Hospitals
          hospitalConnection={hospitalData?.publicHospitalConnection}
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
