import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import ConsumerLayout from '@/components/layouts/consumer/Layout';
import HospitalSearch from '@/components/organisms/consumer/hospitals/HospitalSearch';

const Index: React.VFC<NoProps> = () => {
  const imageWidth = useBreakpointValue({ base: 80, md: 160 });
  const imageHeight = useBreakpointValue({ base: 60, md: 120 });

  return (
    <ConsumerLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={{ base: 2, md: 4 }}
        mb={{ base: 4, md: 8 }}
      >
        <Image
          src="/hamster_reading.png"
          alt="ハムスターの読書"
          width={imageWidth || 80}
          height={imageHeight || 60}
        />
        <Box>
          <Text fontWeight="bold" mb="1" fontSize={{ base: 'lg', md: '2xl' }}>
            ハムスター受付病院
          </Text>
          <Text
            fontWeight="bold"
            bgColor="primary.main"
            color="white"
            fontSize={{ base: 'lg', md: '2xl' }}
            as="span"
            p="1"
            borderRadius="md"
          >
            検索 <SearchIcon />
          </Text>
        </Box>
      </Box>
      <ClientOnly>
        <HospitalSearch />
      </ClientOnly>
    </ConsumerLayout>
  );
};

export default Index;
