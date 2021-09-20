import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import InternalLayout from '@/components/admin/templates/InternalLayout';
import HospitalsStack from '@/components/admin/hospitals/hospitalsStack';
import { goAdminHospitalsNew } from '@/utils/routes';

const Index: React.VFC<{}> = () => {
  const router = useRouter();
  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">病院一覧</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminHospitalsNew(router)}
        >
          新規登録
        </Button>
      </Box>
      <ClientOnly>
        <HospitalsStack />
      </ClientOnly>
    </InternalLayout>
  );
};

export default Index;
