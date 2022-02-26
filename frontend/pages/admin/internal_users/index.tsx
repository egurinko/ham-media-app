import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { InternalUsersStack } from '@/components/organisms/admin/internal_users/index/InternalUsersStack';
import { goAdminInternalUserNew } from '@/utils/routes';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">ユーザ一覧</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
          onClick={() => goAdminInternalUserNew(router)}
        >
          新規登録
        </Button>
      </Box>
      <InternalUsersStack />
    </InternalLayout>
  );
};

export default Index;
