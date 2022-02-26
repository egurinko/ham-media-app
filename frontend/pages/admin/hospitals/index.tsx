import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { HospitalsSearch } from '@/components/organisms/admin/hospitals/index/HospitalsSearch';
import { goAdminHospitalsNew } from '@/utils/routes';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

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
          disabled={!isAdminData?.readIsAdmin.isAdmin}
        >
          新規登録
        </Button>
      </Box>
      <HospitalsSearch />
    </InternalLayout>
  );
};

export default Index;
