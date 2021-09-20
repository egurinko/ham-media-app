import { Box } from '@chakra-ui/react';
import Head from '@/components/admin/templates/Head';

type Props = {
  title?: string;
};

const BaseLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    <Head title={title} />
    {children}
  </Box>
);

export default BaseLayout;
