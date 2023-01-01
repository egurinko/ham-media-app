import { SERVICE_NAME } from '@/utils/constant';

export default function Head() {
  return (
    <>
      <title>{SERVICE_NAME}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="description"
        content="１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。"
      />
      <meta property="og:url" content="https://ham-media.net/hospitals" />
      <meta property="og:title" content={SERVICE_NAME} />
      <meta property="og:site_name" content={SERVICE_NAME} />
      <meta
        property="og:description"
        content="１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/23233648/138548265-89dbff65-9737-42db-8d4e-591168374f88.jpeg"
      />
      <meta
        name="keywords"
        content={`動物病院,ハムスター受付病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
      />
      <link rel="canonical" href="https://ham-media.net/hospitals" />
      <meta
        name="keywords"
        content={`動物病院,ハムスター受付病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
      />
      <link rel="icon" href="/favicon.png" />
    </>
  );
}
