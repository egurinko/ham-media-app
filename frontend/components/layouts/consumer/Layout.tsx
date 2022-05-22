import { Box } from '@chakra-ui/react';
import { Head } from '@/components/molecules/Head';
import { Footer } from '@/components/organisms/consumer/Footer';
import { Header } from '@/components/organisms/consumer/Header';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title?: string;
  description?: string;
  ogpUrl?: string;
  ogpImageUrl?: string;
};

const Layout: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  ogpUrl,
  ogpImageUrl,
  children,
}) => (
  <Box bgColor="background.main" minH="100vh" color="text.main">
    <Head
      title={title}
      description={description}
      ogpUrl={ogpUrl}
      ogpImageUrl={ogpImageUrl}
    />
    <Header />
    <Box p="2" maxW="800" mx="auto">
      <main>{children}</main>
      <Footer />
    </Box>
  </Box>
);

export { Layout };
