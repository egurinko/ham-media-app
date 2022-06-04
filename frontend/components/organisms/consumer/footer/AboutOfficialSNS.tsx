import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import { TitleCard } from '@/components/molecules/TitleCard';

type Props = Record<string, never>;

const AboutOfficialSNS: FC<Props> = () => (
  <TitleCard title="公式SNS">
    <Box display="flex" justifyContent="center">
      <Box m="2">
        <a href="https://twitter.com/ham_edia">
          <Image
            src="/twitter_icon.png"
            alt="Twitterロゴ"
            width={30}
            height={30}
          />
        </a>
      </Box>
      <Box m="2">
        <a href="https://ham-media.net/haminfo/line/">
          <Image src="/line_icon.png" alt="LINEロゴ" width={30} height={30} />
        </a>
      </Box>
      <Box m="2">
        <a href="https://www.instagram.com/ham_edia/">
          <Image
            src="/instagram_icon.png"
            alt="Instagramロゴ"
            width={30}
            height={30}
          />
        </a>
      </Box>
      <Box m="2">
        <a href="https://www.facebook.com/hamwmedia/">
          <Image
            src="/facebook_icon.png"
            alt="Facebookロゴ"
            width={30}
            height={30}
          />
        </a>
      </Box>
    </Box>
  </TitleCard>
);

const Memoed = memo(AboutOfficialSNS);

export { Memoed as AboutOfficialSNS };
