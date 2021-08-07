import { Heading, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ClientOnly from '@/components/ClientOnly';
import InternalLayout from '@/components/admin/InternalLayout';
import InternalUserStacks from '@/components/admin/internal_users/InternalUserStacks';

const Index: React.VFC<{}> = () => {
  const router = useRouter();
  return (
    <InternalLayout>
      <Box display="flex" justifyContent="space-between">
        <Heading mb="4">ユーザ一覧</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="lg"
          onClick={() => router.push('/admin/internal_users/new')}
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
