import { Box } from '@chakra-ui/react';
import Head from '@/components/molecules/Head';

type Props = {
  title?: string;
  description?: string;
  ogpUrl?: string;
  ogpImageUrl?: string;
};

const BaseLayout: React.FC<Props> = ({
  title = 'Ham ω Media',
  description = '１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。',
  ogpUrl = 'https://ham-media.net/hospitals',
  ogpImageUrl = 'https://user-images.githubusercontent.com/23233648/138548265-89dbff65-9737-42db-8d4e-591168374f88.jpeg',
  children,
}) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    <Head
      title={title}
      description={description}
      ogpUrl={ogpUrl}
      ogpImageUrl={ogpImageUrl}
    />
    {children}
  </Box>
);

export default BaseLayout;
