import { useMediaQuery, Fade, HStack, Box } from '@chakra-ui/react';
import BaseLayout from './BaseLayout';
import Sidebar from '@/components/admin/templates/Sidebar';
import Header from '@/components/admin/templates/Header';

type Props = {
  title?: string;
};

const PublicLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => {
  const [isMobile] = useMediaQuery('(max-width: 30em)');

  return (
    <BaseLayout title={title}>
      {isMobile ? <Header /> : null}
      <HStack
        minH="100vh"
        pt={[16, 0]}
        spacing="0"
        justify="flex-start"
        align="flex-start"
      >
        {isMobile ? null : <Sidebar />}
        <Box w="100%" pl={[0, 250]}>
          <Fade in={true}>
            <Box as="main" p={[4, 16]}>
              {children}
            </Box>
          </Fade>
        </Box>
      </HStack>
    </BaseLayout>
  );
};

export default PublicLayout;
