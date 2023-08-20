import Image from 'next/image';
import { TitleCard } from '@/app/components/molecules/TitleCard';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = Record<string, never>;

export const AboutOfficialSNS: FC<Props> = () => (
  <TitleCard title="公式SNS">
    <div
      className={css({ display: 'flex', justifyContent: 'center', gap: '4' })}
    >
      <a href="https://twitter.com/ham_edia">
        <Image
          src="/twitter_icon.png"
          alt="Twitterロゴ"
          width={30}
          height={30}
        />
      </a>
      <a href="https://ham-media.net/haminfo/line/">
        <Image src="/line_icon.png" alt="LINEロゴ" width={30} height={30} />
      </a>
      <a href="https://www.instagram.com/ham_edia/">
        <Image
          src="/instagram_icon.png"
          alt="Instagramロゴ"
          width={30}
          height={30}
        />
      </a>
      <a href="https://www.facebook.com/hamwmedia/">
        <Image
          src="/facebook_icon.png"
          alt="Facebookロゴ"
          width={30}
          height={30}
        />
      </a>
    </div>
  </TitleCard>
);
