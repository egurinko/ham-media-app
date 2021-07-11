import Head from './Head';
import { Box } from '@chakra-ui/react';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <Box bgColor="background.main" minH="100vh">
    <Head title={title} />
    <main>{children}</main>
  </Box>
);

export default Layout;
