import { Box } from '@chakra-ui/react';
import { memo } from 'react';

const SummaryRow: React.FC<NoProps> = ({ children }) => (
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

const Memoed = memo(SummaryRow);

export { Memoed as SummaryRow };
