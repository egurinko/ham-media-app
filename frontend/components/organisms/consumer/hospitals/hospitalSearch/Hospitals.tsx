import { Box } from '@chakra-ui/react';
import Card from '@/components/atoms/Card';
import { PublicGetHospitalConnectionQuery } from '@/api/public_api/types';

type Props = {
  hospitalConnection?: PublicGetHospitalConnectionQuery['hospitalConnection'];
};

const Hospitals: React.FC<Props> = ({ hospitalConnection }) => {
  return (
    <>
      {hospitalConnection?.edges?.map((edge, edgeIndex) => {
        return edge?.node ? (
          <Box key={edgeIndex} my="2">
            <Card>{edge?.node?.name}</Card>
          </Box>
        ) : null;
      })}
    </>
  );
};

export default Hospitals;
