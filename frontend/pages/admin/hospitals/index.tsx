import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import InternalLayout from '@/components/layouts/admin/InternalLayout';
import HospitalsStack from '@/components/ecosystems/admin/hospitals/index/hospitalsStack';
import { goAdminHospitalsNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
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
      <HospitalsStack />
    </InternalLayout>
  );
};

export default Index;
