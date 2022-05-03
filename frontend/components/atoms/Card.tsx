import { Box } from '@chakra-ui/react';
import type { CSSObject } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  _hover?: CSSObject;
};

const Card: FC<PropsWithChildren<Props>> = ({ children, _hover }) => (
  <Box bg="white" shadow="md" width="full" p="6" _hover={_hover}>
    {children}
  </Box>
);

export { Card };
