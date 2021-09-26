import { Box } from '@chakra-ui/react';
import Head from '@/components/molecules/Head';
import Header from '@/components/organisms/consumer/Header';
import Footer from '@/components/organisms/consumer/Footer';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    <Head title={title} />
    <Header />
    <Box p="2" maxW="800" mx="auto">
      <main>{children}</main>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
