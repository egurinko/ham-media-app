import ClientOnly from '@/components/ClientOnly';
import Layout from '@/components/admin/Layout';
import Table from '@/components/admin/internal_users/Table';

const Index: React.VFC<{}> = () => {
  return (
    <Layout>
      <p>ユーザ一覧</p>
      <ClientOnly>
        <Table />
      </ClientOnly>
    </Layout>
  );
};

export default Index;
