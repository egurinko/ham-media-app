import { Layout } from '@/components/layouts/consumer/Layout';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';

const Index: React.VFC<NoProps> = () => (
    <Layout title="病院検索 - Ham ω Media">
      <TitleSection />
      <ClientOnly>
        <HospitalSearch />
      </ClientOnly>
    </Layout>
  );

export default Index;
