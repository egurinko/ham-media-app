import { useMediaQuery, Fade, HStack, Box } from '@chakra-ui/react';
import BaseLayout from './BaseLayout';
import Sidebar from './Sidebar';

type Props = {
  title?: string;
};

const PublicLayout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => {
  const [isMobile] = useMediaQuery('(max-width: 30em)');

  return (
    <BaseLayout title={title}>
      <HStack spacing="0" justify="flex-start" align="flex-start">
        <Box>{isMobile ? null : <Sidebar />}</Box>
        <Box w="100%" p={[4, 16]}>
          <Fade in={true}>
            <main>{children}</main>
          </Fade>
        </Box>
      </HStack>
    </BaseLayout>
  );
};

export default PublicLayout;
