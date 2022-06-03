import { Box } from '@chakra-ui/react';
import { Footer } from '@/components/organisms/consumer/Footer';
import { Header } from '@/components/organisms/consumer/Header';
import type { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    <Header />
    <Box p="2" maxW="800" mx="auto">
      <main>{children}</main>
      <Footer />
    </Box>
  </Box>
);

export { Layout };
