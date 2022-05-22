import { Box } from '@chakra-ui/react';
import { Head } from '@/components/molecules/Head';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title?: string;
  description?: string;
  ogpUrl?: string;
  ogpImageUrl?: string;
};

const BaseLayout: FC<PropsWithChildren<Props>> = ({
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
    {children}
  </Box>
);

export { BaseLayout };
