'use client';

import { Box } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

const BaseLayout: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    {children}
  </Box>
);

export { BaseLayout };
