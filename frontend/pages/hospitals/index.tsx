import { Heading, Box } from '@chakra-ui/react';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import ConsumerLayout from '@/components/layouts/consumer/Layout';
import HospitalSearch from '@/components/organisms/consumer/hospitals/HospitalSearch';

const Index: React.VFC<NoProps> = () => (
  <ConsumerLayout>
    <Box display="flex" justifyContent="center" alignItems="center" m="2">
      <Heading size="md">ハムスター受付病院を探す</Heading>
    </Box>
    <ClientOnly>
      <HospitalSearch />
    </ClientOnly>
  </ConsumerLayout>
);

export default Index;
