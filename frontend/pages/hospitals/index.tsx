import { Layout } from '@/components/layouts/consumer/Layout';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';

const Index: React.VFC<NoProps> = () => {
  return (
    <Layout title="病院検索 - Ham ω Media">
      <TitleSection />
      <ClientOnly>
        <HospitalSearch />
      </ClientOnly>
    </Layout>
  );
};

export default Index;
