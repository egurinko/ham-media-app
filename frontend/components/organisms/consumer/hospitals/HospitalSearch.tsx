import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import TextSearch from './hospitalSearch/TextSearch';
import Hospitals from './hospitalSearch/Hospitals';
import { usePublicGetHospitalConnectionLazyQuery } from '@/api/public_api/types';

const HospitalSearch: React.FC<NoProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [getHospitalConnection, { data: hospitalData }] =
    usePublicGetHospitalConnectionLazyQuery();

  return (
    <>
      <Box>
        <TextSearch
          searchText={searchText}
          setSearchText={setSearchText}
          getHospitalConnection={getHospitalConnection}
        />
      </Box>
      <Box>map search</Box>
      <Box>search conditions</Box>
      <Box>
        <Hospitals hospitalConnection={hospitalData?.hospitalConnection} />
      </Box>
    </>
  );
};

export default HospitalSearch;
