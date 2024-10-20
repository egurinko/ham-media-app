import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import type { SystemStyleObject } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  _hover?: SystemStyleObject;
};

const Card: FC<PropsWithChildren<Props>> = ({ children, _hover }) => (
  <Box bg="white" shadow="md" width="full" p="6" _hover={_hover}>
    {children}
  </Box>
);

const Memoed = memo(Card);

export { Memoed as Card };
