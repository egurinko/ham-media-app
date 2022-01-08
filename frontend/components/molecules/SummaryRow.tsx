import { Box } from '@chakra-ui/react';

const SummaryRow: React.FC<{}> = ({ children }) => (
  <Box
    w="100%"
    _hover={{
      background: 'background.hover',
      color: 'primary.main',
      cursor: 'pointer',
    }}
  >
    {children}
  </Box>
);

export { SummaryRow };
