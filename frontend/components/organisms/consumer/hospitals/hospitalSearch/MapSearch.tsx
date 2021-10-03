import { useState } from 'react';
import { Button, Text, Box } from '@chakra-ui/react';
import Card from '@/components/atoms/Card';
import GoogleMap from '@/components/ecosystems/GoogleMap';
import MapPinIcon from '@/components/atoms/assets/MapPinIcon';
import { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';

type Props = {
  getInitialHospitalConnection: (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => void;
};

const MapSearch: React.FC<Props> = ({ getInitialHospitalConnection }) => {
  const [open, setOpen] = useState(false);
  const handleMapSearch = () => {
    setOpen(true);
  };
  return (
    <>
      <Card>
        <Button
          onClick={handleMapSearch}
          variant="outline"
          mr="auto"
          fill="primary.main"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          width="100px"
          height="80px"
        >
          <MapPinIcon width={20} height={20} />
          <Text fontSize="xs">現在地から探す</Text>
        </Button>
      </Card>
      {open ? (
        <Box my="2">
          <GoogleMap height={200} />
        </Box>
      ) : null}
    </>
  );
};

export default MapSearch;
