import ClientOnly from '@/components/ClientOnly';
import InternalLayout from '@/components/admin/InternalLayout';
import Table from '@/components/admin/internal_users/Table';

const Index: React.VFC<{}> = () => {
  return (
    <InternalLayout>
      <p>ユーザ一覧</p>
      <ClientOnly>
        <Table />
      </ClientOnly>
    </InternalLayout>
  );
};

export default Index;
