import { Box } from '@chakra-ui/react';
import TextSearch from './hospitalSearch/TextSearch';

const HospitalSearch: React.FC<NoProps> = () => (
  <>
    <Box>
      <TextSearch />
    </Box>
    <Box>map search</Box>
    <Box>search conditions</Box>
    <Box>result</Box>
  </>
);

export default HospitalSearch;
