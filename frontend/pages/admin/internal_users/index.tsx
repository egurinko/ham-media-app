import { Heading } from '@chakra-ui/react';
import ClientOnly from '@/components/ClientOnly';
import InternalLayout from '@/components/admin/InternalLayout';
import Table from '@/components/admin/internal_users/Table';

const Index: React.VFC<{}> = () => {
  return (
    <InternalLayout>
      <Heading mb="4">ユーザ一覧</Heading>
      <ClientOnly>
        <Table />
      </ClientOnly>
    </InternalLayout>
  );
};

export default Index;
