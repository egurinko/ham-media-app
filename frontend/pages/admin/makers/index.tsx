import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { MakersStack } from '@/components/organisms/admin/makers/index/MakersStack';
import { goAdminMakersNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="sm">メーカー管理</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminMakersNew(router)}
        >
          新規登録
        </Button>
      </Box>
      <MakersStack />
    </InternalLayout>
  );
};

export default Index;
