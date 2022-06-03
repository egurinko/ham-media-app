import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import { HOSPITALS_PATH } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => (
  <>
    <Head
      title="ハムスター受付病院検索 | Ham ω Media"
      description={`Ham ω Mediaが厳選したハムスター受付病院の検索。場所のキーワードや現在地を利用してお近くのハムスター受付病院を検索できます。詳細検索により予約形態/夜間営業/保険適用状態などを指定して病院を絞り込めます。`}
      ogpUrl={`https://ham-media-app.net${HOSPITALS_PATH}`}
      keywords={`ハムスター受付病院,動物病院,ハムスター,ハムメディア,Ham ω Media`}
    />
    <TitleSection />
    <ClientOnly>
      <HospitalSearch />
    </ClientOnly>
  </>
);

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
