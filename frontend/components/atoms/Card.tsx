import { Box } from '@chakra-ui/react';
import type { CSSObject } from '@chakra-ui/react';

type Props = {
  _hover?: CSSObject;
};

const Card: React.FC<Props> = ({ children, _hover }) => (
  <Box bg="white" shadow="md" width="full" p="6" _hover={_hover}>
    {children}
  </Box>
);

export { Card };
