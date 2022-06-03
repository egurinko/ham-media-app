import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Layout } from '@/components/layouts/consumer/Layout';
import { SERVICE_NAME } from '@/utils/constant';

const NotFound: React.FC<NoProps> = () => (
  <Layout
    title={`ページが見つかりませんでした - ${SERVICE_NAME}`}
    description=""
  >
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      my={{ base: 16, md: 32 }}
    >
      <Box textAlign="center">
        <Text
          as="h1"
          fontSize={{ base: '5xl', md: '9xl' }}
          color="primary.main"
        >
          404
        </Text>
        <Text mb="2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
          お探しのページが見つかりません
        </Text>
        <Text fontSize="sm">
          URLに誤りがあるか、ページが移動または削除された可能性がございます。
        </Text>
      </Box>
      <Box my="auto">
        <Image
          src="/hamster_sleep.png"
          alt="NotFoundロゴ"
          width={300}
          height={170}
        />
      </Box>
    </Box>
  </Layout>
);

export default NotFound;
