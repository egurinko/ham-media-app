import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { MakersStack } from '@/components/organisms/admin/makers/index/MakersStack';
import { goAdminMakersNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">メーカー管理</Heading>
        <PrimaryButton
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminMakersNew(router)}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
        >
          新規登録
        </PrimaryButton>
      </Box>
      <MakersStack />
    </InternalLayout>
  );
};

export default Index;
