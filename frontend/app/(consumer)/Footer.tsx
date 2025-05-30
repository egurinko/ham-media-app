import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import { AbountInformationProvide } from '@/app/components/organisms/consumer/AboutInformationProvide';
import { AboutOfficialSNS } from '@/app/components/organisms/consumer/AboutOfficialSNS';
import RedirectSvg from '@/assets/redirect.svg';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const Footer: FC<NoProps> = () => (
  <footer className={css({ display: 'flex', flexDir: 'column', gap: 4 })}>
    <AbountInformationProvide />
    <AboutOfficialSNS />
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        my: 4,
      })}
    >
      <a
        href="https://ham-media.net"
        className={css({
          p: 2,
          borderWidth: '1px',
          borderRadius: 'lg',
          borderColor: 'gray.300',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <div
            className={css({
              fill: 'primary.main',
              color: 'primary.main',
              mr: '2',
            })}
          >
            <Icon
              source={<RedirectSvg width="20" height="20" />}
              width="20px"
              height="20px"
            />
          </div>
          ホームページに戻る
        </div>
      </a>
    </div>
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <Typography variant="caption">© 一般社団法人 ハムメディア</Typography>
    </div>
  </footer>
);
