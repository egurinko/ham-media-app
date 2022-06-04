import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import type { FC, PropsWithChildren } from 'react';

const SummaryRow: FC<PropsWithChildren<NoProps>> = ({ children }) => (
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
