import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLocalReadIsAdminQuery } from '@/api/local_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { ProductTagGroupsStack } from '@/components/organisms/admin/product_tag_groups/index/ProductTagGroupsStack';
import { goAdminProductTagGroupsNew } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">タグ管理</Heading>
        <PrimaryButton
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminProductTagGroupsNew(router)}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
        >
          新規登録
        </PrimaryButton>
      </Box>
      <ProductTagGroupsStack />
    </>
  );
};

Index.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

export default Index;
