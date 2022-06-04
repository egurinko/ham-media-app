import { SearchIcon } from '@chakra-ui/icons';
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import type { FC } from 'react';

const TitleSection: FC<NoProps> = () => {
  const imageWidth = useBreakpointValue({ base: 105, md: 210 });
  const imageHeight = useBreakpointValue({ base: 60, md: 120 });

  return (
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
  );
};

const Memoed = memo(TitleSection);

export { Memoed as TitleSection };
