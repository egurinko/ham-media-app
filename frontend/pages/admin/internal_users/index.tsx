import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { InternalUsersStack } from '@/components/organisms/admin/internal_users/index/InternalUsersStack';
import { goAdminInternalUserNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">ユーザ一覧</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
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
