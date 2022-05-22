import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import type { ReactElement } from 'react';

const Index = () => (
  <>
    <Head title="病院検索 - Ham ω Media" />
    <TitleSection />
    <ClientOnly>
      <HospitalSearch />
    </ClientOnly>
  </>
);

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
