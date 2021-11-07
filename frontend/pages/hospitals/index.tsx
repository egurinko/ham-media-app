import ConsumerLayout from '@/components/layouts/consumer/Layout';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';

const Index: React.VFC<NoProps> = () => {
  return (
    <ConsumerLayout title="病院検索 - Ham ω Media">
      <TitleSection />
      <ClientOnly>
        <HospitalSearch />
      </ClientOnly>
    </ConsumerLayout>
  );
};

export default Index;
