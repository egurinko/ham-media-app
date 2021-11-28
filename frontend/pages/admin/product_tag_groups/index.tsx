import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { ProductTagGroupsStacks } from '@/components/organisms/admin/product_tag_groups/index/ProductTagGroupStacks';
import { goAdminProductTagGroupsNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">タグ管理</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminProductTagGroupsNew(router)}
        >
          新規登録
        </Button>
      </Box>
      <ProductTagGroupsStacks />
    </InternalLayout>
  );
};

export default Index;
