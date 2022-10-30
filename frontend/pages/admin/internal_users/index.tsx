import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { InternalUsersStack } from '@/components/organisms/admin/internal_users/index/InternalUsersStack';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { goAdminInternalUserNew } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <>
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
    </>
  );
};

Index.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

export default Index;
