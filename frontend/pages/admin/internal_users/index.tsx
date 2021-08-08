import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import ClientOnly from '@/components/ClientOnly';
import InternalLayout from '@/components/admin/InternalLayout';
import InternalUserStacks from '@/components/admin/internal_users/InternalUserStacks';
import { goAdminInternalUserNew } from '@/utils/routes';

const Index: React.VFC<{}> = () => {
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
      <ClientOnly>
        <InternalUserStacks />
      </ClientOnly>
    </InternalLayout>
  );
};

export default Index;
