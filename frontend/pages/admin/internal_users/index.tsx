import { Heading, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { InternalUsersStack } from '@/components/organisms/admin/internal_users/index/InternalUsersStack';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { goAdminInternalUserNew } from '@/utils/routes';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">ユーザ一覧</Heading>
        <PrimaryButton
          size="md"
          leftIcon={<AddIcon />}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
          onClick={() => goAdminInternalUserNew(router)}
        >
          新規登録
        </PrimaryButton>
      </Box>
      <InternalUsersStack />
    </InternalLayout>
  );
};

export default Index;
