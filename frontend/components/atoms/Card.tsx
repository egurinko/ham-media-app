import { Box } from '@chakra-ui/react';

const Card: React.FC<NoProps> = ({ children }) => {
  return (
    <Box bg="white" shadow="md" width="full" p="6">
      {children}
    </Box>
  );
};

export default Card;
